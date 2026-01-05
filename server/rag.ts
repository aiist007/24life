import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import axios from 'axios';
import * as cheerio from 'cheerio';

const require = createRequire(import.meta.url);
const pdfLib = require('pdf-parse');
const mammoth = require('mammoth');
// @ts-ignore
const epubParser = require('epub-parser');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface DocumentChunk {
    title: string;
    content: string;
    path: string;
    score?: number;
}

// Store chunks instead of full docs
let indexedChunks: DocumentChunk[] = [];

// Chunking configuration
const CHUNK_SIZE = 800;
const CHUNK_OVERLAP = 200;

function chunkText(text: string, title: string, filePath: string): DocumentChunk[] {
    const chunks: DocumentChunk[] = [];
    if (!text) return chunks;

    // Normalize whitespace
    const normalizedText = text.replace(/\s+/g, ' ').trim();

    let start = 0;
    while (start < normalizedText.length) {
        const end = Math.min(start + CHUNK_SIZE, normalizedText.length);
        const content = normalizedText.slice(start, end);

        chunks.push({
            title,
            content,
            path: filePath
        });

        // Move forward by stride (size - overlap)
        start += (CHUNK_SIZE - CHUNK_OVERLAP);
    }
    return chunks;
}

export async function indexDocuments(docsPath: string) {
    console.log(`Indexing documents from: ${docsPath}`);
    // Clear previous index if re-indexing (naive check to avoid duplicates on hot reload if called multiple times)
    // For a real server, we might want to check if files changed.
    // Here we just append or reset if we want. Let's reset for simplicity if called with root.
    if (docsPath.endsWith('masterni')) {
        indexedChunks = [];
    }

    let files: string[] = [];
    try {
        files = fs.readdirSync(docsPath);
    } catch (e) {
        console.error(`Error reading directory ${docsPath}:`, e);
        return;
    }

    for (const file of files) {
        const filePath = path.join(docsPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            await indexDocuments(filePath);
            continue;
        }

        const ext = path.extname(file).toLowerCase();
        let content = '';

        try {
            if (ext === '.pdf') {
                const dataBuffer = fs.readFileSync(filePath);
                try {
                    const data = await pdfLib(dataBuffer);
                    content = data.text;
                } catch (e) {
                    console.error(`PDF parsing failed for ${file}:`, e);
                }
            } else if (ext === '.docx') {
                const result = await mammoth.extractRawText({ path: filePath });
                content = result.value;
            } else if (ext === '.epub') {
                try {
                    // Extract text from EPUB using epub-parser
                    const epubData = await new Promise<any>((resolve, reject) => {
                        epubParser.open(filePath, (err: any, data: any) => {
                            if (err) reject(err);
                            else resolve(data);
                        });
                    });

                    if (epubData && epubData.sections) {
                        content = epubData.sections
                            .map((s: any) => s.htmlString || '')
                            .join('\n')
                            .replace(/<[^>]*>/g, ' ');
                    }
                } catch (e) {
                    console.error(`EPUB parsing failed for ${file}:`, e);
                    // content = `[EPUB Document: ${file}]`; // Don't index empty if failed
                }
            }

            if (content) {
                const newChunks = chunkText(content, file, filePath);
                indexedChunks.push(...newChunks);
                console.log(`Indexed: ${file} (${newChunks.length} chunks)`);
            }
        } catch (error) {
            console.error(`Failed to index ${file}:`, error);
        }
    }
    // Only log total at the top level call ideally, but this is recursive.
    if (docsPath.endsWith('masterni')) {
        console.log(`Total indexed chunks: ${indexedChunks.length}`);
    }
}

export function searchDocuments(query: string, limit = 5): string {
    if (indexedChunks.length === 0) return "暂无相关参考资料。";

    // Improved keyword extraction for Chinese: split by spaces, or treat as individual characters if no spaces and mostly CJK
    let keywords = query.split(/\s+/).filter(k => k.length > 0);

    // If it's a single long string of Chinese characters, split it into 2-character bi-grams or meaningful chunks
    // For now, let's just make sure we capture phrases by also allowing the full query if it's short, 
    // or splitting by common Chinese punctuation.
    if (keywords.length === 1 && keywords[0].length > 3) {
        // Simple heuristic: if no spaces, split into characters or 2-char chunks for better matching
        const singleQuery = keywords[0];
        // If it looks like Chinese (no a-z), let's split into characters to increase recall
        if (!/[a-zA-Z]/.test(singleQuery)) {
            // Split into 2-char sliding window for better Chinese search
            const bigrams = [];
            for (let i = 0; i < singleQuery.length - 1; i++) {
                bigrams.push(singleQuery.slice(i, i + 2));
            }
            keywords = [...keywords, ...bigrams];
        }
    }

    keywords = keywords.filter(k => k.length >= 2); // Still require at least 2 chars for meaningful match
    if (keywords.length === 0 && query.length > 0) keywords = [query]; // Fallback if query is short

    // Score chunks
    const scoredChunks = indexedChunks.map(chunk => {
        let score = 0;
        const lowerContent = chunk.content.toLowerCase();
        keywords.forEach(kw => {
            const lowerKw = kw.toLowerCase();
            // Simple frequency count, escaping regex special chars
            const safeKw = lowerKw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(safeKw, 'gi');
            const matches = lowerContent.match(regex);
            if (matches) score += matches.length;
        });
        return { ...chunk, score };
    });

    // Sort and take top N
    const results = scoredChunks
        .filter(c => c.score && c.score > 0)
        .sort((a, b) => (b.score || 0) - (a.score || 0))
        .slice(0, limit);

    // 🔍 Enhanced Logging for Verification (增加日志以验证 RAG 工作状态)
    if (results.length > 0) {
        console.log("\n-------- 🔍 RAG 检索系统命中结果 --------");
        results.forEach((r, i) => {
            console.log(`[${i + 1}] 匹配分: ${r.score} | 来源: ${r.title}`);
        });
        console.log("------------------------------------------\n");
    } else {
        console.log("\n⚠️ RAG 提示: 本地资料库中未找到相关关键词匹配\n");
    }

    if (results.length === 0) return "暂无高度相关的本地资料。";

    return results.map((r, i) => `[资料${i + 1} - ${r.title}]:\n${r.content}`).join('\n\n');
}

export async function webSearch(query: string): Promise<string> {
    try {
        console.log(`Performing web search for: ${query}`);
        // Use DuckDuckGo HTML version which is easier to scrape without JS
        // Adding "倪海厦" or "中医" context to the search to make it relevant
        const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query + " 中医")}`;

        const response = await axios.get(searchUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            timeout: 10000 // Increased to 10s
        });

        const $ = cheerio.load(response.data);
        const results: string[] = [];

        $('.result__body').each((i, element) => {
            if (i >= 3) return false; // Limit to 3 results
            const title = $(element).find('.result__title').text().trim();
            const snippet = $(element).find('.result__snippet').text().trim();
            const url = $(element).find('.result__url').text().trim();

            if (title && snippet) {
                results.push(`[网络搜索结果 ${i + 1}]:\n标题: ${title}\n来源: ${url}\n摘要: ${snippet}`);
            }
        });

        if (results.length === 0) return "网络搜索未返回相关结果。";
        return results.join('\n\n');

    } catch (error: any) {
        console.error("Web search failed:", error.message);
        return "网络搜索暂时不可用 (Connection failed or blocked).";
    }
}
