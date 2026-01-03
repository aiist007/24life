import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/*
 * 设计风格：四时流转 - 自然意象美学
 * 导航栏采用透明背景，滚动时变为半透明毛玻璃效果
 */

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "首页" },
  { id: "calendar", label: "节气日历" },
  { id: "terms", label: "二十四节气" },
  { id: "elements", label: "五行养生" },
  { id: "health", label: "健康标准" }
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-background/80 backdrop-blur-lg shadow-sm border-b" 
            : "bg-transparent"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button 
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src="/images/bagua-pattern.png" alt="节气养生历Logo" className="w-full h-full object-cover" />
              </div>
              <span 
                className={`text-xl font-bold transition-colors ${isScrolled ? "text-foreground" : "text-white"}`}
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              >
                节气养生
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isScrolled 
                      ? "text-foreground/70 hover:text-foreground hover:bg-muted" 
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden ${isScrolled ? "" : "text-white hover:bg-white/10"}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 bg-background/95 backdrop-blur-lg border-b shadow-lg md:hidden"
          >
            <div className="container py-4">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-3 rounded-lg text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// 页脚组件
export function Footer() {
  return (
    <footer className="bg-muted/50 border-t py-12">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo和简介 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src="/images/bagua-pattern.png" alt="节气养生历Logo" className="w-full h-full object-cover" />
              </div>
              <span 
                className="text-xl font-bold"
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              >
                节气养生
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              基于倪海厦中西医养生理论，融合五行八卦智慧，
              为您提供2026年二十四节气的养生指导。
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h4 className="font-semibold mb-4">快速导航</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {navItems.map(item => (
                <li key={item.id}>
                  <button 
                    onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
                    className="hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 养生理念 */}
          <div>
            <h4 className="font-semibold mb-4">养生理念</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>顺应天时，调和阴阳</li>
              <li>春生夏长，秋收冬藏</li>
              <li>头凉足热，手足温暖</li>
              <li>食饮有节，起居有常</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2026 二十四节气养生历 · 基于倪海厦养生智慧</p>
          <p className="mt-2 text-xs">
            本网站内容仅供参考，不构成医疗建议。如有健康问题，请咨询专业医师。
          </p>
        </div>
      </div>
    </footer>
  );
}
