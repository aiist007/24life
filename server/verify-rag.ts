import path from 'path';
import { fileURLToPath } from 'url';
import { indexDocuments, searchDocuments } from './rag.js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runVerification() {
    console.log("=== 🚀 RAG 系统效果验证开始 ===\n");

    const masterniPath = path.resolve(__dirname, '..', 'masterni');

    console.log("1. 正在对本地资料库进行索引 (这可能需要一点时间，因为文档较多)...");
    await indexDocuments(masterniPath);
    console.log("\n2. 索引完成！即将开始测试查询。");

    const testQueries = [
        "感冒的中医治疗原则",
        "什么是阳气？如何保护阳气？",
        "倪海厦关于针灸的论述",
        "虚劳的辨证施治"
    ];

    for (const query of testQueries) {
        console.log(`\n\n>>> 🔍 测试查询: "${query}"`);
        const result = searchDocuments(query, 3); // 获取前3个最相关的片段

        if (result === "暂无相关参考资料。" || result === "暂无高度相关的本地资料。") {
            console.log("❌ 未命中任何资料。");
        } else {
            console.log("✅ 命中资料结果摘要:");
            console.log(result);
        }
    }

    console.log("\n=== ✅ RAG 系统效果验证结束 ===");
}

runVerification().catch(err => {
    console.error("验证过程中出错:", err);
});
