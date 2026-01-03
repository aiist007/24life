import { motion } from "framer-motion";
import { fiveElements, healthStandards, seasonalSleep } from "@/data/solarTerms";

/*
 * 设计风格：四时流转 - 自然意象美学
 * 五行展示采用圆形布局，体现相生相克关系
 * 动画效果模拟气的流动
 */

export function FiveElementsChart() {
  const elements = [
    { key: "wood", ...fiveElements.wood, position: { x: 50, y: 10 } },
    { key: "fire", ...fiveElements.fire, position: { x: 85, y: 40 } },
    { key: "earth", ...fiveElements.earth, position: { x: 70, y: 80 } },
    { key: "metal", ...fiveElements.metal, position: { x: 30, y: 80 } },
    { key: "water", ...fiveElements.water, position: { x: 15, y: 40 } }
  ];

  return (
    <div className="relative w-full max-w-md mx-auto aspect-square p-8">
      {/* 背景装饰 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 opacity-10"
        >
          <img src="/images/bagua-pattern.png" alt="五行八卦图案" className="w-full h-full" />
        </motion.div>
      </div>

      {/* 相生连线 */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        {/* 木生火 */}
        <line x1="50" y1="15" x2="80" y2="40" stroke="#276749" strokeWidth="0.5" strokeOpacity="0.3" />
        {/* 火生土 */}
        <line x1="80" y1="40" x2="70" y2="75" stroke="#c53030" strokeWidth="0.5" strokeOpacity="0.3" />
        {/* 土生金 */}
        <line x1="70" y1="75" x2="30" y2="75" stroke="#d69e2e" strokeWidth="0.5" strokeOpacity="0.3" />
        {/* 金生水 */}
        <line x1="30" y1="75" x2="20" y2="40" stroke="#9ca3af" strokeWidth="0.5" strokeOpacity="0.3" />
        {/* 水生木 */}
        <line x1="20" y1="40" x2="50" y2="15" stroke="#1a365d" strokeWidth="0.5" strokeOpacity="0.3" />
      </svg>

      {/* 五行元素 */}
      {elements.map((el, i) => (
        <motion.div
          key={el.key}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${el.position.x}%`, top: `${el.position.y}%` }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg"
              style={{ backgroundColor: el.color, fontFamily: "'Noto Serif SC', serif" }}
            >
              {el.name}
            </div>
            <div className="mt-2 text-center">
              <p className="text-sm font-medium" style={{ color: el.color }}>{el.organ}</p>
              <p className="text-xs text-muted-foreground">{el.season}</p>
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* 中心说明 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-bold text-foreground/80" style={{ fontFamily: "'Noto Serif SC', serif" }}>五行</p>
          <p className="text-xs text-muted-foreground">相生相克</p>
        </div>
      </div>
    </div>
  );
}

// 五行详情表格
export function FiveElementsTable() {
  const elements = Object.values(fiveElements);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-4 text-left font-semibold">五行</th>
            <th className="py-3 px-4 text-left font-semibold">脏腑</th>
            <th className="py-3 px-4 text-left font-semibold">季节</th>
            <th className="py-3 px-4 text-left font-semibold">五味</th>
            <th className="py-3 px-4 text-left font-semibold">情志</th>
            <th className="py-3 px-4 text-left font-semibold">方位</th>
            <th className="py-3 px-4 text-left font-semibold">六字诀</th>
          </tr>
        </thead>
        <tbody>
          {elements.map((el, i) => (
            <motion.tr
              key={el.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="border-b hover:bg-muted/50 transition-colors"
            >
              <td className="py-3 px-4">
                <span
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white font-bold"
                  style={{ backgroundColor: el.color }}
                >
                  {el.name}
                </span>
              </td>
              <td className="py-3 px-4 font-medium">{el.organ}</td>
              <td className="py-3 px-4">{el.season}</td>
              <td className="py-3 px-4">{el.taste}</td>
              <td className="py-3 px-4">{el.emotion}</td>
              <td className="py-3 px-4">{el.direction}</td>
              <td className="py-3 px-4">
                <span className="text-lg font-bold" style={{ color: el.color }}>{el.sound}</span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 健康标准卡片
export function HealthStandardsCard() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {healthStandards.map((standard, i) => (
        <motion.div
          key={standard.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-4 rounded-xl bg-card border hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
              {i + 1}
            </span>
            <h4 className="font-semibold" style={{ fontFamily: "'Noto Serif SC', serif" }}>{standard.title}</h4>
          </div>
          <p className="text-sm text-muted-foreground">{standard.description}</p>
        </motion.div>
      ))}
    </div>
  );
}

// 四季作息卡片
export function SeasonalSleepCard() {
  const seasons = Object.values(seasonalSleep);
  const colors = ["#276749", "#c53030", "#d69e2e", "#1a365d"];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {seasons.map((season, i) => (
        <motion.div
          key={season.name}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="p-5 rounded-xl text-white"
          style={{ backgroundColor: colors[i] }}
        >
          <h4 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Noto Serif SC', serif" }}>
            {season.name}
          </h4>
          <p className="text-lg font-medium mb-2">{season.pattern}</p>
          <p className="text-sm opacity-90">{season.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
