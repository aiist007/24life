import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import axios from "axios";
import fs from "fs";
import { indexDocuments, searchDocuments, webSearch } from "./rag.js";
import { getSolarTerm, formatChineseDate, isTimeSensitive, extractLocation } from "./utils.js";

dotenv.config();

// Prevent process crash on unhandled errors
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.json());
  app.use(express.static(staticPath));

  // Initialize RAG indexing
  const masterniPath = path.resolve(__dirname, "..", "masterni");
  indexDocuments(masterniPath).catch(err => console.error("RAG Indexing error:", err));

  // Chat API
  app.post("/api/chat", async (req, res) => {
    let webContext = ""; // Define outside to use in catch block

    try {
      let { message, location = "北京" } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      // Detect location from message if not provided or to override
      location = extractLocation(message, location);

      const now = new Date();
      const chineseDate = formatChineseDate(now);
      const solarTerm = getSolarTerm(now);
      const isTimeQuery = isTimeSensitive(message);

      console.log(`Received chat message: ${message}`);
      console.log(`Context: Date=${chineseDate}, Term=${solarTerm}, Location=${location}, TimeSensitive=${isTimeQuery}`);

      // 1. Enrich query for search if time-sensitive
      let searchQuery = message;
      if (isTimeQuery) {
        searchQuery = `${solarTerm} ${location} ${message}`;
        console.log(`Enriched search query: ${searchQuery}`);
      }

      // 2. Get context from Master Ni documents
      const localContext = searchDocuments(searchQuery);

      // 3. Get web search context (parallel attempt)
      try {
        // Don't let web search fail the whole request
        webContext = await webSearch(searchQuery);
      } catch (e) {
        console.error("Web search execution failed:", e);
        webContext = "网络搜索暂不可用。";
      }

      // Combine context
      const combinedContext = `
【当前时空背景】：
- 时间：${chineseDate}
- 地点：${location}
- 节气：${solarTerm}

【本地资料库（倪海厦著作）】：
${localContext}

【网络搜索结果】：
${webContext}
`;

      console.log("Combined Context Length:", combinedContext.length);

      console.log("3. Calling Gemini API...");
      
      // Determine which system prompt to use
      let systemPrompt = `你是一位精通倪海厦养生智慧、中医经典以及五行八卦知识的中医师。你以倪师的 AI 分身身份与用户交流，任务是根据提供的参考资料和你的专业知识回答用户的问题。
              
              参考资料：
              ${combinedContext}
              
              回答要求：
              1. **优先考虑时令与地域**：如果资料库或网络搜索中有关于当前节气（${solarTerm}）和地点（${location}）的养生建议，请务必优先结合这些信息进行回答。
              2. **优先引用本地资料库（倪海厦著作）中的论述**，这是最权威的来源。
              3. 参考网络搜索结果来补充最新的食谱或生活建议，但需甄别信息是否符合中医原则。
              4. **食疗建议**：针对时令推荐食物、菜谱时，应结合倪师强调的“阳气”、“阴阳平衡”等理念。
              5. 使用 Markdown 格式进行排版，确保清晰易读。
              6. 语气要谦和且具有倪师的风格（例如：“经方”、“阳气”、“阴阳平衡”等术语的恰当使用）。`;

      // Special handling for "What to eat today"
      if (message.includes("今天吃什么")) {
        try {
          const foodPromptPath = path.resolve(__dirname, "prompts", "food_therapy.md");
          if (fs.existsSync(foodPromptPath)) {
            const foodPrompt = fs.readFileSync(foodPromptPath, "utf-8");
            systemPrompt = `${foodPrompt}\n\n【补充上下文信息】：\n${combinedContext}\n\n【当前日期】：${chineseDate}\n【当前节气】：${solarTerm}\n【当前地点】：${location}`;
            console.log("Using specialized Food Therapy prompt from local file.");
          }
        } catch (err) {
          console.error("Failed to read food therapy prompt:", err);
        }
      }

      const response = await axios.post(
        process.env.GEMINI_API_URL || "https://llm.ai-nebula.com/v1/chat/completions",
        {
          model: process.env.GEMINI_MODEL || "gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            { role: "user", content: message }
          ],
          temperature: 0.7,
        },
        {
          headers: {
            "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 60000 // 60s timeout to avoid premature connection drop
        }
      );

      console.log("✅ Gemini API call successful.");
      const reply = response.data.choices[0].message.content;
      res.json({ reply });
    } catch (error: any) {
      console.error("Chat API error:", error.response?.data || error.message);

      // FALLBACK: If AI call failed but we have web search results, return them.
      // Check if webContext has meaningful content (not just empty or error msg)
      if (webContext && !webContext.includes("暂不可用") && !webContext.includes("未返回相关结果")) {
        console.log("Using Web Search fallback due to LLM failure.");
        const fallbackReply = `⚠️ **温馨提示**：由于 AI 思考服务暂时连接不稳定，无法为您生成完整的智能回答。
          
但我在互联网上为您找到了以下相关信息，供您参考：

${webContext}

*（请稍后重试以获取倪师的完整解读）*`;
        return res.json({ reply: fallbackReply });
      }

      res.status(500).json({ error: "Failed to communicate with Master Ni Agent" });
    }
  });

  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 5001;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
