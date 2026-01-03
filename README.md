# 倪海厦二十四节气养生历 | Ni Haixia's 24 Solar Terms Wellness Calendar

一个基于倪海厦中西医养生理论的交互式网站，提供2026年完整的二十四节气养生指导。该项目融合了中医经典理论、五行八卦智慧和现代Web技术，为用户呈现图文并茂的节气养生方案。

**[在线访问](https://life.fflo.ai)** | **[Manus平台](https://manus.im)**

---

## 📋 项目概述

本项目是一个现代化的养生指导平台，基于著名中医大师倪海厦的养生理论，为每个节气提供全方位的养生建议。网站采用响应式设计，支持多种节气展示视图，包括卡片视图、月历视图和轮盘视图。

### 核心特性

- **完整的节气数据**：涵盖2026年全年24个节气的精详养生指导
- **多维度养生方案**：包含食疗、起居作息、运动导引、穴位按摩、六字诀吐纳等内容
- **五行养生智慧**：展示五行相生相克关系，帮助用户理解中医养生原理
- **倪海厦六大健康标准**：科学的健康评估体系
- **交互式日历**：支持按月份、季节筛选节气信息
- **响应式设计**：完美适配桌面、平板和手机设备
- **SEO优化**：完整的元标签和结构化数据支持

---

## 🎨 设计理念

网站采用**"四时流转 - 自然意象美学"**设计风格，特点包括：

| 设计元素 | 实现方式 |
|---------|---------|
| **色彩系统** | 春绿、夏红、秋金、冬蓝，随季节自动变化 |
| **背景艺术** | 中国水墨画风格，展现四季自然意象 |
| **布局结构** | 有机曲线和自然形态，模拟纸张和木纹材质 |
| **动画效果** | 流畅的过渡动画，模拟气的流动 |
| **排版系统** | 传统书法风格与现代无衬线字体的结合 |

---

## 🚀 快速开始

### 环境要求

- Node.js 18+ 
- pnpm 10+
- 现代浏览器（Chrome、Firefox、Safari、Edge）

### 安装与运行

```bash
# 克隆仓库
git clone https://github.com/yourusername/yangsheng-calendar.git
cd yangsheng-calendar

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 访问应用
# 打开浏览器访问 http://localhost:3000
```

### 构建生产版本

```bash
# 构建静态文件
pnpm build

# 预览生产构建
pnpm preview
```

---

## 📁 项目结构

```
yangsheng-calendar/
├── client/                          # 前端应用
│   ├── public/
│   │   └── images/                  # 静态图片资源
│   │       ├── hero-spring.png      # 春季背景
│   │       ├── hero-summer.png      # 夏季背景
│   │       ├── hero-autumn.png      # 秋季背景
│   │       ├── hero-winter.png      # 冬季背景
│   │       └── bagua-pattern.png    # 八卦图案
│   └── src/
│       ├── components/              # React组件
│       │   ├── Navigation.tsx        # 导航栏
│       │   ├── HeroSection.tsx       # 英雄区
│       │   ├── CalendarView.tsx      # 日历组件
│       │   ├── SolarTermCard.tsx     # 节气卡片
│       │   ├── FiveElements.tsx      # 五行展示
│       │   └── ui/                   # shadcn/ui组件库
│       ├── data/
│       │   └── solarTerms.ts         # 节气数据和工具函数
│       ├── pages/
│       │   ├── Home.tsx              # 主页
│       │   └── NotFound.tsx          # 404页面
│       ├── contexts/                 # React Context
│       ├── App.tsx                   # 应用入口
│       ├── main.tsx                  # React DOM挂载
│       └── index.css                 # 全局样式和设计令牌
├── server/                           # 服务器占位符（静态项目）
├── package.json                      # 项目配置
├── tailwind.config.ts                # Tailwind CSS配置
├── tsconfig.json                     # TypeScript配置
└── vite.config.ts                    # Vite构建配置
```

---

## 💻 技术栈

| 类别 | 技术 | 版本 |
|-----|------|------|
| **框架** | React | 19.2+ |
| **样式** | Tailwind CSS | 4.1+ |
| **UI组件** | shadcn/ui | 最新 |
| **动画** | Framer Motion | 12.23+ |
| **路由** | Wouter | 3.3+ |
| **构建** | Vite | 7.1+ |
| **语言** | TypeScript | 5.6+ |
| **包管理** | pnpm | 10.4+ |

---

## 📊 核心功能详解

### 1. 二十四节气数据

每个节气包含以下信息：

```typescript
interface SolarTerm {
  id: string;                    // 节气ID
  name: string;                  // 节气名称
  emoji: string;                 // 季节emoji
  date: string;                  // 公历日期
  time: string;                  // 具体时间
  season: "春" | "夏" | "秋" | "冬";  // 季节
  element: string;               // 五行属性
  organ: string;                 // 对应脏腑
  theme: string;                 // 养生主题
  description: string;           // 节气描述
  diet: string[];                // 食疗建议
  lifestyle: string[];           // 起居建议
  exercise: string;              // 运动导引
  acupoint: string;              // 穴位按摩
  sixCharacters: string;         // 六字诀
}
```

### 2. 五行养生系统

展示五行（木火土金水）与五脏（肝心脾肺肾）的对应关系，包括：

- **五行相生**：木生火、火生土、土生金、金生水、水生木
- **五行相克**：木克土、土克水、水克火、火克金、金克木
- **季节对应**：春木、夏火、长夏土、秋金、冬水
- **情志调理**：怒喜思忧恐的平衡

### 3. 倪海厦六大健康标准

用于快速判断身体健康状态的科学标准：

1. **头凉足热** - 头部清凉，脚部温热
2. **手足温热** - 四肢末梢温度正常
3. **食欲正常** - 消化功能良好
4. **睡眠安稳** - 睡眠质量高
5. **二便规律** - 大小便正常
6. **精神饱满** - 精气神充足

---

## 🎯 使用指南

### 浏览节气信息

1. 访问首页，查看当前节气的养生指导
2. 在"节气日历"区域点击具体日期，查看该月节气
3. 在"二十四节气"区域选择不同视图：
   - **卡片视图**：逐个展示节气详情
   - **月历视图**：按月份组织节气
   - **轮盘视图**：展示四季循环

### 筛选节气

使用季节筛选器快速查看特定季节的养生方案：

- **春季**（立春-谷雨）：重点养肝
- **夏季**（立夏-大暑）：重点养心
- **秋季**（立秋-霜降）：重点养肺
- **冬季**（立冬-大寒）：重点养肾

### 查看详细养生方案

点击任意节气卡片，弹窗展示该节气的完整养生指导，包括：

- 食疗推荐及其功效
- 起居作息建议
- 运动导引方法
- 穴位按摩位置
- 六字诀吐纳要点

---

## 🔍 SEO优化

网站已完成以下SEO优化：

- ✅ 优化的页面标题（58字符）
- ✅ 完整的meta描述（158字符）
- ✅ 关键词标签：二十四节气、养生指导、倪海厦等
- ✅ 所有图片的alt属性
- ✅ Open Graph社交分享标签
- ✅ 语义化HTML结构
- ✅ 响应式设计
- ✅ 快速页面加载

---

## 📱 响应式设计

网站支持多种设备尺寸：

| 设备 | 断点 | 优化 |
|-----|------|------|
| 手机 | < 640px | 单列布局、大字体、触摸友好 |
| 平板 | 640px - 1024px | 两列布局、适中字体 |
| 桌面 | > 1024px | 三列布局、完整功能展示 |

---

## 🎓 倪海厦理论基础

本项目基于倪海厦先生的以下著作和理论：

- 《黄帝内经》讲解与注解
- 《伤寒论》临床应用
- 《金匮要略》养生方法
- 《神农本草经》食疗指导
- 五行八卦养生体系
- 六字诀吐纳功法

倪海厦先生融汇中西医学精髓，提出了独特的养生理念，强调顺应自然、调和阴阳，对现代人的健康养生具有重要指导意义。

---

## 🛠️ 开发指南

### 添加新的节气信息

编辑 `client/src/data/solarTerms.ts` 文件，按照 `SolarTerm` 接口添加新数据：

```typescript
{
  id: "spring-equinox",
  name: "春分",
  emoji: "🌸",
  date: "03-20",
  time: "22:41",
  season: "春",
  element: "木",
  organ: "肝",
  theme: "阴阳平衡、调神养气",
  description: "春分日，昼夜平分，阴阳相半...",
  diet: ["香菜", "绿豆芽", "豆腐"],
  lifestyle: ["午休", "早睡早起", "保持心情愉悦"],
  exercise: "太极拳，调和阴阳",
  acupoint: "内关穴",
  sixCharacters: "嘘"
}
```

### 自定义样式

全局样式和设计令牌定义在 `client/src/index.css` 中，使用Tailwind CSS的 `@theme` 指令：

```css
@theme inline {
  --color-primary: oklch(0.623 0.214 259.815);
  --radius: 0.65rem;
  /* 更多设计令牌... */
}
```

### 添加新组件

在 `client/src/components/` 目录创建新组件，遵循以下模式：

```typescript
import { motion } from "framer-motion";

export function MyComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* 组件内容 */}
    </motion.div>
  );
}
```

---

## 📈 性能优化

- 图片懒加载和优化
- 代码分割和动态导入
- CSS-in-JS优化
- 动画性能优化（使用GPU加速）
- 字体加载优化

---

## 🤝 贡献指南

欢迎提交Issue和Pull Request！请遵循以下步骤：

1. Fork本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

---

## 📄 许可证

本项目采用MIT许可证。详见 [LICENSE](LICENSE) 文件。

---

## 📞 联系方式

- **项目主页**：[life.fflo.ai](https://life.fflo.ai)
- **GitHub**：[yangsheng-calendar](https://github.com/yourusername/yangsheng-calendar)
- **Manus平台**：[manus.im](https://manus.im)

---

## 🙏 致谢

- 感谢倪海厦先生的养生理论和中医智慧
- 感谢React、Tailwind CSS等开源社区
- 感谢所有贡献者和用户的支持

---

## 📚 相关资源

- [倪海厦官方网站](https://www.nhs.com.tw/)
- [黄帝内经原文](https://baike.baidu.com/item/%E9%BB%84%E5%B8%9D%E5%86%85%E7%BB%8F)
- [二十四节气百科](https://baike.baidu.com/item/%E4%BA%8C%E5%8D%81%E5%9B%9B%E8%8A%82%E6%B0%94)
- [中医养生指南](https://www.tcmworld.org/)

---

**最后更新**：2026年1月3日  
**版本**：1.0.0  
**维护者**：Manus AI
