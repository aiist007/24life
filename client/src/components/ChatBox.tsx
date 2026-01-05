import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, X, MessageSquare, Loader2, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const STORAGE_KEY = "master_ni_chat_history";

export function ChatBox() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<Message[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                try {
                    return JSON.parse(saved);
                } catch (e) {
                    console.error("Failed to parse chat history", e);
                }
            }
        }
        return [
            { role: "assistant", content: "您好，我是倪师的AI分身，可以随时跟我聊中医养生和五行八卦相关的问题。" }
        ];
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }, [messages]);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg: Message = { role: "user", content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input })
            });

            if (!response.ok) throw new Error("Failed to get response");

            const data = await response.json();
            setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: "assistant", content: "抱歉，由于网络原因，我现在无法回答。请稍后再试。" }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleExport = () => {
        const text = messages.map(m => `${m.role === 'user' ? '我' : '倪师'}:\n${m.content}`).join('\n\n-------------------\n\n');
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `MasterNi-Dialogue-${new Date().toLocaleDateString().replace(/\//g, '-')}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="relative">
            <Button
                variant="default"
                className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-bold py-2.5 px-6 rounded-full shadow-lg animate-breathe hover:animate-none scale-105 active:scale-95 border-2 border-white/10"
                onClick={() => setIsOpen(true)}
            >
                <MessageSquare className="w-5 h-5 fill-current/20" />
                <span className="text-base">对话倪师</span>
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-4 right-4 w-[92vw] sm:w-[420px] h-[70vh] max-h-[600px] bg-background border shadow-2xl rounded-2xl flex flex-col z-[100]"
                        style={{ isolation: "isolate" }}
                    >
                        {/* Header */}
                        <div className="p-3 border-b bg-primary flex items-center justify-between text-primary-foreground rounded-t-2xl shrink-0">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                    <span className="font-bold text-sm">倪</span>
                                </div>
                                <h3 className="font-bold">对话倪师</h3>
                            </div>
                            <div className="flex items-center gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hover:bg-white/10 text-white w-8 h-8"
                                    onClick={handleExport}
                                    title="保存对话记录"
                                >
                                    <Download className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hover:bg-white/10 text-white w-8 h-8"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Chat Messages - Native scrollable div */}
                        <div
                            className="flex-1 overflow-y-auto p-4 space-y-4"
                            style={{ overscrollBehavior: "contain" }}
                        >
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                                        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === "user" ? "bg-muted" : "bg-primary/10 text-primary"}`}>
                                            {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                        </div>
                                        <div className={`p-3 rounded-2xl text-sm ${msg.role === "user"
                                            ? "bg-primary text-primary-foreground rounded-tr-none"
                                            : "bg-muted rounded-tl-none prose prose-sm max-w-none dark:prose-invert"
                                            }`}>
                                            {msg.role === "assistant" ? (
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                    {msg.content}
                                                </ReactMarkdown>
                                            ) : (
                                                msg.content
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="flex gap-3 max-w-[85%]">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                            <Bot className="w-4 h-4" />
                                        </div>
                                        <div className="bg-muted p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span className="text-xs text-muted-foreground">倪师正在思考资料中...</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 border-t bg-muted/30 shrink-0 rounded-b-2xl">
                            <form
                                className="flex gap-2"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSend();
                                }}
                            >
                                <Input
                                    placeholder="询问中医养生建议..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="bg-background rounded-full pl-4 flex-1"
                                />
                                <Button size="icon" type="submit" className="rounded-full flex-shrink-0" disabled={isLoading}>
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
