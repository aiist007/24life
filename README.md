# 倪海厦二十四节气养生历 | Ni Haixia's 24 Solar Terms Wellness Calendar

一个基于倪海厦中西医养生理论的交互式网站，提供2026年完整的二十四节气养生指导。该项目深度集成了 **RAG (检索增强生成)** 技术，允许用户与“倪师 AI 分身”进行实时对话，获取基于原始文献的专业养生建议。

**[在线访问](https://life.fflo.ai)** | **[Manus平台（带有推荐码）](https://manus.im/invitation/TMQKZ8MZCVVJZYN)**

---

## 📋 项目概述

本项目是一个现代化的养生指导平台，基于著名中医大师倪海厦的养生理论。除了提供全方位的节气建议外，网站还内置了一个具备**时空感知能力**的“倪师 AI 分身”，能够精准引用倪师著作并结合实时节气回答用户的健康疑问。

### 核心特性

- **AI 对话分身 ("对话倪师")**：基于 RAG 技术的智能助手，能够检索本地 30+ 份倪师著作文献。
- **时空感知逻辑**：自动计算当前二十四节气，并能从对话中识别用户所在地，提供因时因地的精准养生建议。
- **本地 RAG 知识库**：深度索引了包括《人纪》、《天纪》在内的 PDF/EPUB/DOCX 原始资料。
- **对话持久化与导出**：聊天记录自动保存至本地，并支持一键导出为 `.txt` 文件。
- **网络搜索增强**：当本地库匹配度不足或 AI 响应异常时，自动回退至实时网络搜索以保障信息供给。
- **完整的节气数据**：涵盖 2026 年全年 24 个节气的精详养生指导。
- **五行养生智慧**：可视化中医养生原理，展示五行相生相克关系。
- **响应式设计**：完美适配移动端和桌面端，支持流畅的触控交互。

---

## 📖 使用手册

关于系统的详细功能说明、版本更新历史及常见问题，请参阅：
👉 **[点击查看使用手册 (USER_MANUAL.md)](./USER_MANUAL.md)**

---

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm / pnpm
- Gemini API Key (用于 AI 对话功能)

### 安装与运行

1. **克隆仓库并安装依赖**

   ```bash
   git clone https://github.com/aiist007/24life.git
   cd 24life
   pnpm install  # 或 npm install
   ```

2. **配置环境变量**
   在项目根目录创建 `.env` 文件，填入你的 API 信息：

   ```env
   GEMINI_API_KEY=你的API密钥
   GEMINI_API_URL=https://llm.ai-nebula.com/v1/chat/completions
   GEMINI_MODEL=gemini-3-flash-preview  # 或你选择的模型
   ```

3. **启动开发服务器**
   现已整合前后端启动逻辑，只需运行：

   ```bash
   npm run dev
   ```

   - **Frontend**: <http://localhost:3000>
   - **Backend (API + RAG)**: <http://localhost:5001>

---

## 📂 项目结构

```
24life/
├── client/                          # 前端应用 (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   └── ChatBox.tsx          # AI 对话框组件 (支持拖拽与原声滚动)
│   │   └── data/
│   │       └── solarTerms.ts        # 节气静态数据
├── server/                           # 后端服务
│   ├── index.ts                     # Express 服务入口
│   ├── rag.ts                       # RAG 核心逻辑 (文件分词、向量匹配)
│   └── verify-rag.ts                # RAG 效果验证脚本
├── masterni/                        # 本地知识库文件 (.pdf, .epub, .docx)
├── package.json                      # 项目配置 (集成 concurrently 启动)
└── .env                              # 环境变量 (Git已忽略)
```

---

## 🧠 AI 智能问答系统 (RAG)

本项目不仅仅是展示信息，更是一个**活的知识库**。

1. **本地索引**：系统启动时会自动扫描 `masterni/` 目录下的所有文献。
2. **多模式检索**：结合了关键词匹配与中文二元分词 (Bigram) 优化，确保中医术语检索的精准度。
3. **上下文增强**：当用户提问时，系统会先在本地文献中“捞取”相关片段，连同网络搜索结果一起提交给 Gemini 模型。
4. **倪师风格**：Prompt 经过专门调校，使 AI 的回答口吻更接近倪海厦老师的教学风格。

---

## 💻 技术栈

| 类别 | 技术 | 备注 |
|-----|------|------|
| **AI/LLM** | Gemini 3 Flash Preview | 极速响应与逻辑推理 |
| **Backend** | Node.js (Express) + tsx | 高性能 TypeScript 后端运行时 |
| **RAG** | Custom Implementation | PDF/Word/Epub 智能分块检索 |
| **Web Search** | Cheerio + DuckDuckGo | 实时网络信息补全 |
| **Frontend** | React + Vite + Tailwind | 现代响应式 UI |
| **Persistence** | Browser LocalStorage | 无后端数据库的轻量级记录保存 |

---

## 🔍 SEO 与 响应式

网站针对搜索引擎进行了深度优化，并采用自适应布局。特别是在最新的更新中，我们修复了移动端浏览器底部的 UI 遮挡问题，并禁用了滚动穿透，确保在小屏幕上也有完美的交互体验。

---

## 📄 许可证

本项目采用 MIT 许可证。

---

## 🙏 致谢

- 感谢倪海厦先生留下的宝贵医学遗产。
- 感谢开源社区提供的 RAG 解析工具库。

---

**最后更新**：2026年1月5日  
**版本**：1.2.0  
**维护者**：Aiist007
