import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { solarTerms2026, type SolarTerm } from "@/data/solarTerms";

/*
 * 设计风格：四时流转 - 自然意象美学
 * 日历采用月份视图，节气日期高亮显示
 * 季节变化时背景色渐变过渡
 */

interface CalendarViewProps {
  onSelectTerm: (term: SolarTerm) => void;
  selectedTerm?: SolarTerm | null;
}

const MONTHS = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];

export function CalendarView({ onSelectTerm, selectedTerm }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(0); // 0-11 for Jan-Dec

  // 获取当前月份的节气
  const monthTerms = useMemo(() => {
    return solarTerms2026.filter(term => {
      const month = parseInt(term.date.split("-")[1]) - 1;
      return month === currentMonth;
    });
  }, [currentMonth]);

  // 获取当前月份的季节
  const currentSeason = useMemo(() => {
    if (currentMonth >= 1 && currentMonth <= 3) return "春";
    if (currentMonth >= 4 && currentMonth <= 6) return "夏";
    if (currentMonth >= 7 && currentMonth <= 9) return "秋";
    return "冬";
  }, [currentMonth]);

  // 获取季节对应的颜色
  const getSeasonColors = (season: string) => {
    const colors: Record<string, { bg: string; accent: string; text: string }> = {
      "春": { bg: "from-green-50 to-emerald-100", accent: "bg-green-500", text: "text-green-700" },
      "夏": { bg: "from-red-50 to-orange-100", accent: "bg-red-500", text: "text-red-700" },
      "秋": { bg: "from-amber-50 to-yellow-100", accent: "bg-amber-500", text: "text-amber-700" },
      "冬": { bg: "from-blue-50 to-slate-100", accent: "bg-blue-600", text: "text-blue-700" }
    };
    return colors[season] || colors["春"];
  };

  const seasonColors = getSeasonColors(currentSeason);

  // 生成日历网格
  const calendarDays = useMemo(() => {
    const year = 2026;
    const firstDay = new Date(year, currentMonth, 1).getDay();
    const daysInMonth = new Date(year, currentMonth + 1, 0).getDate();
    
    const days: { day: number; term?: SolarTerm }[] = [];
    
    // 填充前面的空白
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: 0 });
    }
    
    // 填充日期
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `2026-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const term = solarTerms2026.find(t => t.date === dateStr);
      days.push({ day, term });
    }
    
    return days;
  }, [currentMonth]);

  const prevMonth = () => setCurrentMonth(m => (m === 0 ? 11 : m - 1));
  const nextMonth = () => setCurrentMonth(m => (m === 11 ? 0 : m + 1));

  return (
    <div className={`rounded-2xl overflow-hidden bg-gradient-to-br ${seasonColors.bg} shadow-lg`}>
      {/* 月份导航 */}
      <div className="flex items-center justify-between p-4 border-b border-white/50">
        <Button variant="ghost" size="icon" onClick={prevMonth} className="hover:bg-white/50">
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="text-center">
          <h2 className={`text-2xl font-bold ${seasonColors.text}`} style={{ fontFamily: "'Noto Serif SC', serif" }}>
            2026年 {MONTHS[currentMonth]}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {currentSeason}季 · {monthTerms.map(t => t.name).join(" / ") || "无节气"}
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={nextMonth} className="hover:bg-white/50">
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* 星期标题 */}
      <div className="grid grid-cols-7 gap-1 p-2 bg-white/30">
        {WEEKDAYS.map((day, i) => (
          <div key={i} className={`text-center py-2 text-sm font-medium ${i === 0 || i === 6 ? "text-red-500" : "text-foreground/70"}`}>
            {day}
          </div>
        ))}
      </div>

      {/* 日历网格 */}
      <div className="grid grid-cols-7 gap-1 p-2">
        <AnimatePresence mode="wait">
          {calendarDays.map((item, i) => (
            <motion.div
              key={`${currentMonth}-${i}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.01 }}
              className={`
                relative aspect-square flex flex-col items-center justify-center rounded-lg
                ${item.day === 0 ? "" : "hover:bg-white/50 cursor-pointer transition-colors"}
                ${item.term ? "bg-white/70 shadow-sm" : ""}
                ${selectedTerm?.id === item.term?.id ? "ring-2 ring-primary" : ""}
              `}
              onClick={() => item.term && onSelectTerm(item.term)}
            >
              {item.day > 0 && (
                <>
                  <span className={`text-lg font-medium ${item.term ? seasonColors.text : "text-foreground/70"}`}>
                    {item.day}
                  </span>
                  {item.term && (
                    <span className={`text-xs font-medium ${seasonColors.text} mt-0.5`}>
                      {item.term.name}
                    </span>
                  )}
                  {item.term && (
                    <div className={`absolute top-1 right-1 w-2 h-2 rounded-full ${seasonColors.accent}`} />
                  )}
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 本月节气快捷入口 */}
      {monthTerms.length > 0 && (
        <div className="p-4 border-t border-white/50 bg-white/30">
          <h3 className="text-sm font-medium text-foreground/70 mb-2">本月节气</h3>
          <div className="flex gap-2">
            {monthTerms.map(term => (
              <button
                key={term.id}
                onClick={() => onSelectTerm(term)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${selectedTerm?.id === term.id 
                    ? `${seasonColors.accent} text-white shadow-md` 
                    : "bg-white/70 hover:bg-white text-foreground/80"
                  }
                `}
              >
                {term.name}
                <span className="text-xs ml-1 opacity-70">{term.date.split("-")[2]}日</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// 年度节气轮盘视图
export function YearWheelView({ onSelectTerm, selectedTerm }: CalendarViewProps) {
  const getSeasonColor = (season: string) => {
    const colors: Record<string, string> = {
      "春": "#276749",
      "夏": "#c53030",
      "秋": "#d69e2e",
      "冬": "#1a365d"
    };
    return colors[season] || colors["春"];
  };

  return (
    <div className="relative w-full max-w-xl mx-auto aspect-square">
      {/* 中心太极图 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 rounded-full overflow-hidden shadow-lg"
        >
          <img src="/images/bagua-pattern.png" alt="八卦" className="w-full h-full object-cover" />
        </motion.div>
      </div>

      {/* 节气环 */}
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {solarTerms2026.map((term, i) => {
          const angle = (i * 15) - 90; // 每个节气15度，从顶部开始
          const radius = 160;
          const x = 200 + radius * Math.cos((angle * Math.PI) / 180);
          const y = 200 + radius * Math.sin((angle * Math.PI) / 180);
          const isSelected = selectedTerm?.id === term.id;

          return (
            <g key={term.id} onClick={() => onSelectTerm(term)} style={{ cursor: "pointer" }}>
              {/* 连接线 */}
              <line
                x1="200"
                y1="200"
                x2={x}
                y2={y}
                stroke={getSeasonColor(term.season)}
                strokeWidth="1"
                strokeOpacity="0.2"
              />
              {/* 节气点 */}
              <motion.circle
                cx={x}
                cy={y}
                r={isSelected ? 20 : 15}
                fill={getSeasonColor(term.season)}
                fillOpacity={isSelected ? 1 : 0.8}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
              />
              {/* 节气名称 */}
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="10"
                fontWeight="bold"
              >
                {term.name.slice(0, 2)}
              </text>
            </g>
          );
        })}

        {/* 季节标签 */}
        {[
          { name: "春", angle: -45, color: "#276749" },
          { name: "夏", angle: 45, color: "#c53030" },
          { name: "秋", angle: 135, color: "#d69e2e" },
          { name: "冬", angle: 225, color: "#1a365d" }
        ].map(season => {
          const radius = 100;
          const x = 200 + radius * Math.cos((season.angle * Math.PI) / 180);
          const y = 200 + radius * Math.sin((season.angle * Math.PI) / 180);
          return (
            <text
              key={season.name}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={season.color}
              fontSize="24"
              fontWeight="bold"
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            >
              {season.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
