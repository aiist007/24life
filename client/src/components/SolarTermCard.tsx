import { motion } from "framer-motion";
import { Calendar, Utensils, Moon, Activity, MapPin, Volume2, AlertCircle } from "lucide-react";
import type { SolarTerm } from "@/data/solarTerms";

/*
 * 设计风格：四时流转 - 自然意象美学
 * 卡片采用自然纹理背景，五行色彩点缀
 * 悬停时轻微上浮，展示生命气息
 */

interface SolarTermCardProps {
  term: SolarTerm;
  isActive?: boolean;
  onClick?: () => void;
}

export function SolarTermCard({ term, isActive, onClick }: SolarTermCardProps) {
  const getElementBgClass = (element: string) => {
    const classes: Record<string, string> = {
      "木": "bg-wood/10 border-wood/30",
      "火": "bg-fire/10 border-fire/30",
      "土": "bg-earth/10 border-earth/30",
      "金": "bg-metal/10 border-metal/30",
      "水": "bg-water/10 border-water/30"
    };
    return classes[element] || classes["木"];
  };

  const getElementTextClass = (element: string) => {
    const classes: Record<string, string> = {
      "木": "text-wood",
      "火": "text-fire",
      "土": "text-earth",
      "金": "text-metal",
      "水": "text-water"
    };
    return classes[element] || classes["木"];
  };

  const getSeasonEmoji = (season: string) => {
    const emojis: Record<string, string> = {
      "春": "🌸",
      "夏": "☀️",
      "秋": "🍂",
      "冬": "❄️"
    };
    return emojis[season] || "🌿";
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`
        solar-term-card p-5 cursor-pointer border-2 transition-all duration-300
        ${isActive ? "ring-2 ring-primary ring-offset-2" : ""}
        ${getElementBgClass(term.element)}
      `}
    >
      {/* 头部：节气名称和日期 */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{getSeasonEmoji(term.season)}</span>
            <h3 className={`text-2xl font-bold ${getElementTextClass(term.element)}`} style={{ fontFamily: "'Noto Serif SC', serif" }}>
              {term.name}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">{term.pinyin}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{term.date.replace("2026-", "")}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{term.time}</p>
        </div>
      </div>

      {/* 主题标签 */}
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-3 ${getElementBgClass(term.element)} ${getElementTextClass(term.element)}`}>
        {term.theme}
      </div>

      {/* 描述 */}
      <p className="text-sm text-foreground/80 leading-relaxed mb-4 line-clamp-3">
        {term.description}
      </p>

      {/* 养生要点 */}
      <div className="space-y-2 text-sm">
        <div className="flex items-start gap-2">
          <Utensils className={`w-4 h-4 mt-0.5 ${getElementTextClass(term.element)}`} />
          <div>
            <span className="font-medium">食疗：</span>
            <span className="text-muted-foreground">{term.foods.slice(0, 3).join("、")}</span>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Moon className={`w-4 h-4 mt-0.5 ${getElementTextClass(term.element)}`} />
          <div>
            <span className="font-medium">起居：</span>
            <span className="text-muted-foreground">{term.lifestyle}</span>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Activity className={`w-4 h-4 mt-0.5 ${getElementTextClass(term.element)}`} />
          <div>
            <span className="font-medium">运动：</span>
            <span className="text-muted-foreground">{term.exercise}</span>
          </div>
        </div>
      </div>

      {/* 底部信息 */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {term.acupoint.split("、")[0]}
          </span>
          <span className="flex items-center gap-1">
            <Volume2 className="w-3 h-3" />
            六字诀：{term.sixSound}
          </span>
        </div>
        <div className={`text-xs font-medium px-2 py-0.5 rounded ${getElementBgClass(term.element)} ${getElementTextClass(term.element)}`}>
          {term.element} · {term.organ}
        </div>
      </div>
    </motion.div>
  );
}

// 节气详情卡片（完整版）
export function SolarTermDetailCard({ term, onClose }: { term: SolarTerm; onClose: () => void }) {
  const getElementBgClass = (element: string) => {
    const classes: Record<string, string> = {
      "木": "bg-wood/10",
      "火": "bg-fire/10",
      "土": "bg-earth/10",
      "金": "bg-metal/10",
      "水": "bg-water/10"
    };
    return classes[element] || classes["木"];
  };

  const getElementTextClass = (element: string) => {
    const classes: Record<string, string> = {
      "木": "text-wood",
      "火": "text-fire",
      "土": "text-earth",
      "金": "text-metal",
      "水": "text-water"
    };
    return classes[element] || classes["木"];
  };

  const getSeasonEmoji = (season: string) => {
    const emojis: Record<string, string> = {
      "春": "🌸",
      "夏": "☀️",
      "秋": "🍂",
      "冬": "❄️"
    };
    return emojis[season] || "🌿";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-card shadow-2xl ${getElementBgClass(term.element)}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部背景 */}
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(/images/hero-${term.season === "春" ? "spring" : term.season === "夏" ? "summer" : term.season === "秋" ? "autumn" : "winter"}.png)`,
              filter: "brightness(0.8)"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{getSeasonEmoji(term.season)}</span>
              <div>
                <h2 className="text-3xl font-bold" style={{ fontFamily: "'Noto Serif SC', serif" }}>{term.name}</h2>
                <p className="text-white/80">{term.pinyin}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-white/90">
              <span>{term.date}</span>
              <span>{term.time}</span>
              <span className="px-2 py-0.5 bg-white/20 rounded">{term.element} · {term.organ}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* 内容区域 */}
        <div className="p-6 space-y-6">
          {/* 主题 */}
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-base font-semibold ${getElementBgClass(term.element)} ${getElementTextClass(term.element)}`}>
            {term.theme}
          </div>

          {/* 描述 */}
          <div>
            <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "'Noto Serif SC', serif" }}>节气概述</h3>
            <p className="text-foreground/80 leading-relaxed">{term.description}</p>
          </div>

          {/* 诗词 */}
          <div className={`p-4 rounded-xl ${getElementBgClass(term.element)} border-l-4 ${getElementTextClass(term.element).replace("text-", "border-")}`}>
            <p className="text-lg italic" style={{ fontFamily: "'Noto Serif SC', serif" }}>"{term.poem}"</p>
          </div>

          {/* 养生指导 */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-card border">
              <div className="flex items-center gap-2 mb-3">
                <Utensils className={`w-5 h-5 ${getElementTextClass(term.element)}`} />
                <h4 className="font-semibold">食疗养生</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{term.foodColors}</p>
              <div className="flex flex-wrap gap-2">
                {term.foods.map((food, i) => (
                  <span key={i} className={`px-2 py-1 text-sm rounded ${getElementBgClass(term.element)}`}>
                    {food}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-card border">
              <div className="flex items-center gap-2 mb-3">
                <Moon className={`w-5 h-5 ${getElementTextClass(term.element)}`} />
                <h4 className="font-semibold">起居作息</h4>
              </div>
              <p className="text-sm text-foreground/80">{term.lifestyle}</p>
            </div>

            <div className="p-4 rounded-xl bg-card border">
              <div className="flex items-center gap-2 mb-3">
                <Activity className={`w-5 h-5 ${getElementTextClass(term.element)}`} />
                <h4 className="font-semibold">运动导引</h4>
              </div>
              <p className="text-sm text-foreground/80">{term.exercise}</p>
            </div>

            <div className="p-4 rounded-xl bg-card border">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className={`w-5 h-5 ${getElementTextClass(term.element)}`} />
                <h4 className="font-semibold">穴位按摩</h4>
              </div>
              <p className="text-sm text-foreground/80">{term.acupoint}</p>
            </div>
          </div>

          {/* 六字诀 */}
          <div className="p-4 rounded-xl bg-card border">
            <div className="flex items-center gap-2 mb-3">
              <Volume2 className={`w-5 h-5 ${getElementTextClass(term.element)}`} />
              <h4 className="font-semibold">六字诀吐纳</h4>
            </div>
            <p className="text-sm text-foreground/80">
              本节气对应六字诀为「<span className={`text-xl font-bold ${getElementTextClass(term.element)}`}>{term.sixSound}</span>」字诀，
              配合呼吸吐纳，可调理{term.organ}脏功能。
            </p>
          </div>

          {/* 禁忌 */}
          <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <h4 className="font-semibold text-destructive">养生禁忌</h4>
            </div>
            <p className="text-sm text-foreground/80">{term.taboo}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
