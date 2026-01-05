import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import axios from "axios";
import { indexDocuments, searchDocuments, webSearch } from "./rag.js";

dotenv.config();

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
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      console.log(`Received chat message: ${message}`);

      // 1. Get context from Master Ni documents
      const localContext = searchDocuments(message);

      // 2. Get web search context (parallel attempt)
      try {
        // Don't let web search fail the whole request
        webContext = await webSearch(message);
      } catch (e) {
        console.error("Web search execution failed:", e);
        webContext = "网络搜索暂不可用。";
      }

      // Combine context
      const combinedContext = `
【本地资料库（倪海厦著作）】：
${localContext}

【网络搜索结果】：
${webContext}
`;

      console.log("Combined Context Length:", combinedContext.length);

      console.log("3. Calling Gemini API...");

      const response = await axios.post(
        process.env.GEMINI_API_URL || "https://llm.ai-nebula.com/v1/chat/completions",
        {
          model: process.env.GEMINI_MODEL || "gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: `你是一位精通倪海厦养生智慧、中医经典以及五行八卦知识的中医师。你以倪师的 AI 分身身份与用户交流，任务是根据提供的参考资料和你的专业知识回答用户的问题。
              
              参考资料：
              ${combinedContext}
              
              回答要求：
              1. **优先引用本地资料库（倪海厦著作）中的论述**，这是最权威的来源。
              2. 参考网络搜索结果来补充最新的信息或解释某些概念，但需甄别信息准确性。
              3. 经过反复思考，确保信息准确。如果本地资料和网络资料有冲突，以倪师的本地资料为准。
              4. 使用 Markdown 格式进行排版，确保清晰易读。
              5. 语气要谦和且具有倪师的风格（例如：“经方”、“阳气”、“阴阳平衡”等术语的恰当使用）。
              6. 如果参考资料中没有相关内容，请如实告知，但仍基于你的中医知识库给出建议。`
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
