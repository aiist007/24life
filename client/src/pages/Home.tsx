import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Grid3X3, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigation, Footer } from "@/components/Navigation";
import { HeroSection, IntroSection } from "@/components/HeroSection";
import { CalendarView, YearWheelView } from "@/components/CalendarView";
import { SolarTermCard, SolarTermDetailCard } from "@/components/SolarTermCard";
import { FiveElementsChart, FiveElementsTable, HealthStandardsCard, SeasonalSleepCard } from "@/components/FiveElements";
import { solarTerms2026, type SolarTerm } from "@/data/solarTerms";

/*
 * 设计风格：四时流转 - 自然意象美学
 * 主页采用长滚动布局，各区块通过自然过渡连接
 * 色彩随季节变化，体现四时流转的意境
 */

export default function Home() {
  const [selectedTerm, setSelectedTerm] = useState<SolarTerm | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "calendar" | "wheel">("grid");
  const [seasonFilter, setSeasonFilter] = useState<string>("all");

  const handleSelectTerm = (term: SolarTerm) => {
    setSelectedTerm(term);
    setShowDetail(true);
  };

  const filteredTerms = seasonFilter === "all" 
    ? solarTerms2026 
    : solarTerms2026.filter(t => t.season === seasonFilter);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* 首页英雄区 */}
      <section id="home">
        <HeroSection />
      </section>

      {/* 简介区 */}
      <IntroSection />

      {/* 节气日历区 */}
      <section id="calendar" className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            >
              2026年节气日历
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              点击日历中的节气日期，查看详细的养生指导
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <CalendarView 
              onSelectTerm={handleSelectTerm}
              selectedTerm={selectedTerm}
            />
          </div>
        </div>
      </section>

      {/* 二十四节气区 */}
      <section id="terms" className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            >
              二十四节气养生指导
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              每个节气都有其独特的养生要点，包含食疗、起居、运动、穴位按摩等全方位指导
            </p>

            {/* 视图切换和筛选 */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* 视图模式 */}
              <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="w-4 h-4 mr-1" />
                  卡片
                </Button>
                <Button
                  variant={viewMode === "calendar" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("calendar")}
                >
                  <Calendar className="w-4 h-4 mr-1" />
                  月历
                </Button>
                <Button
                  variant={viewMode === "wheel" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("wheel")}
                >
                  <Grid3X3 className="w-4 h-4 mr-1" />
                  轮盘
                </Button>
              </div>

              {/* 季节筛选 */}
              <div className="flex items-center gap-2">
                {["all", "春", "夏", "秋", "冬"].map(season => (
                  <Button
                    key={season}
                    variant={seasonFilter === season ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSeasonFilter(season)}
                    className={season !== "all" ? `${
                      season === "春" ? "hover:bg-wood hover:text-white" :
                      season === "夏" ? "hover:bg-fire hover:text-white" :
                      season === "秋" ? "hover:bg-earth hover:text-white" :
                      "hover:bg-water hover:text-white"
                    }` : ""}
                  >
                    {season === "all" ? "全部" : season}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 节气展示 */}
          <AnimatePresence mode="wait">
            {viewMode === "grid" && (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredTerms.map((term, i) => (
                  <motion.div
                    key={term.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <SolarTermCard
                      term={term}
                      isActive={selectedTerm?.id === term.id}
                      onClick={() => handleSelectTerm(term)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {viewMode === "calendar" && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-4xl mx-auto"
              >
                <CalendarView 
                  onSelectTerm={handleSelectTerm}
                  selectedTerm={selectedTerm}
                />
              </motion.div>
            )}

            {viewMode === "wheel" && (
              <motion.div
                key="wheel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <YearWheelView 
                  onSelectTerm={handleSelectTerm}
                  selectedTerm={selectedTerm}
                />
                {selectedTerm && (
                  <div className="mt-8 max-w-2xl mx-auto">
                    <SolarTermCard
                      term={selectedTerm}
                      isActive
                      onClick={() => setShowDetail(true)}
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 五行养生区 */}
      <section id="elements" className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            >
              五行养生智慧
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              五行学说是中医理论的重要组成部分，木火土金水对应肝心脾肺肾五脏，
              理解五行相生相克的关系，有助于更好地进行养生调理
            </p>
          </motion.div>

          <Tabs defaultValue="chart" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="chart">五行图</TabsTrigger>
              <TabsTrigger value="table">对应表</TabsTrigger>
              <TabsTrigger value="sleep">四季作息</TabsTrigger>
            </TabsList>

            <TabsContent value="chart">
              <div className="bg-card rounded-2xl p-8 border shadow-sm">
                <FiveElementsChart />
                <div className="mt-8 text-center text-sm text-muted-foreground">
                  <p>木 → 火 → 土 → 金 → 水 → 木（相生）</p>
                  <p className="mt-1">木 → 土 → 水 → 火 → 金 → 木（相克）</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="table">
              <div className="bg-card rounded-2xl p-6 border shadow-sm overflow-hidden">
                <FiveElementsTable />
              </div>
            </TabsContent>

            <TabsContent value="sleep">
              <SeasonalSleepCard />
              <div className="mt-6 p-4 bg-card rounded-xl border text-center">
                <p className="text-sm text-muted-foreground">
                  《黄帝内经》云："春三月，此谓发陈...夜卧早起；夏三月，此谓蕃秀...夜卧早起；
                  秋三月，此谓容平...早卧早起；冬三月，此谓闭藏...早卧晚起。"
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* 健康标准区 */}
      <section id="health" className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            >
              倪海厦六大健康标准
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              倪海厦先生提出的六大健康标准，是判断身体健康状态的重要依据，
              符合这六条标准，说明身体处于良好的健康状态
            </p>
          </motion.div>

          <HealthStandardsCard />

          {/* 养生箴言 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 max-w-3xl mx-auto"
          >
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20 text-center">
              <blockquote 
                className="text-xl md:text-2xl font-medium text-foreground/90 leading-relaxed"
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              >
                "上工治未病，不治已病。圣人不治已乱治未乱，此之谓也。"
              </blockquote>
              <p className="mt-4 text-muted-foreground">——《黄帝内经·素问》</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 页脚 */}
      <Footer />

      {/* 节气详情弹窗 */}
      <AnimatePresence>
        {showDetail && selectedTerm && (
          <SolarTermDetailCard
            term={selectedTerm}
            onClose={() => setShowDetail(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
