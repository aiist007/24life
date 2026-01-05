import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

async function testGemini() {
    console.log("Testing API Connection...");
    console.log("URL:", process.env.GEMINI_API_URL);
    console.log("Model:", process.env.GEMINI_MODEL);

    try {
        const response = await axios.post(
            process.env.GEMINI_API_URL || "https://llm.ai-nebula.com/v1/chat/completions",
            {
                model: process.env.GEMINI_MODEL || "gemini-3-flash-preview",
                messages: [
                    { role: "user", content: "Hello, are you working?" }
                ],
                temperature: 0.7,
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`,
                    "Content-Type": "application/json",
                },
                timeout: 30000
            }
        );
        console.log("✅ Success!");
        console.log("Reply:", response.data.choices[0].message.content);
    } catch (error: any) {
        console.error("❌ API Failed!");
        console.error("Status:", error.response?.status);
        console.error("Data:", JSON.stringify(error.response?.data, null, 2));
        console.error("Message:", error.message);
    }
}

testGemini();
