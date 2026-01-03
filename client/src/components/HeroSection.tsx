import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { getCurrentSolarTerm, getSeasonBackground } from "@/data/solarTerms";

/*
 * 设计风格：四时流转 - 自然意象美学
 * 英雄区展示当前季节的水墨画背景
 * 文字采用传统书法风格，配合呼吸动画
 */

export function HeroSection() {
  const currentTerm = getCurrentSolarTerm();
  const season = currentTerm?.season || "春";
  const backgroundImage = getSeasonBackground(season);

  const getSeasonGreeting = (season: string) => {
    const greetings: Record<string, string> = {
      "春": "春生万物，养肝护阳",
      "夏": "夏长蕃秀，养心安神",
      "秋": "秋收容平，润肺养阴",
      "冬": "冬藏闭藏，补肾固本"
    };
    return greetings[season] || greetings["春"];
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景图片 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      </div>

      {/* 装饰元素 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        className="absolute top-10 right-10 w-48 h-48"
      >
        <img src="/images/bagua-pattern.png" alt="八卦图案装饰" className="w-full h-full opacity-30" />
      </motion.div>

      {/* 主内容 */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 
            className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            二十四节气养生历
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-2">
            2026年 · 倪海厦养生智慧
          </p>
        </motion.div>

        {/* 季节问候 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8"
        >
          <p 
            className="text-2xl md:text-3xl text-white font-medium"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            {getSeasonGreeting(season)}
          </p>
        </motion.div>

        {/* 当前节气信息 */}
        {currentTerm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 inline-block"
          >
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
              <p className="text-white/80 text-sm mb-2">当前节气</p>
              <h2 
                className="text-4xl font-bold text-white mb-2"
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              >
                {currentTerm.name}
              </h2>
              <p className="text-white/90">{currentTerm.theme}</p>
              <div className="flex items-center justify-center gap-4 mt-4 text-sm text-white/80">
                <span>{currentTerm.date}</span>
                <span>·</span>
                <span>{currentTerm.element} · {currentTerm.organ}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* 滚动提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-white/70"
          >
            <span className="text-sm mb-2">向下滚动探索</span>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// 简介区域
export function IntroSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            顺应天时，调和阴阳
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            倪海厦先生融汇中西医学精髓，以《黄帝内经》为根基，结合五行八卦之理，
            创立了独特的养生体系。二十四节气是中华民族智慧的结晶，
            顺应节气养生，可使人体与天地同步，达到阴阳平衡、身心康健的境界。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["食疗养生", "起居作息", "运动导引", "穴位按摩", "六字诀吐纳"].map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* 倪海厦简介 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-card rounded-2xl p-8 border shadow-sm">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-4xl font-bold text-primary" style={{ fontFamily: "'Noto Serif SC', serif" }}>倪</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Noto Serif SC', serif" }}>
                  倪海厦先生
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  倪海厦先生是当代著名的中医大师，精通《黄帝内经》、《伤寒论》、《金匮要略》等经典，
                  同时深谙易经八卦、紫微斗数等传统文化。他提出的"六大健康标准"——头凉足热、手足温热、
                  食欲正常、睡眠安稳、二便规律、精神饱满，成为判断健康状态的重要依据。
                  其养生理念强调顺应自然、调和阴阳，对现代人的健康养生具有重要的指导意义。
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
