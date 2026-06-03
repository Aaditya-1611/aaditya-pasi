import React, { useState, useRef, useEffect } from "react";
import { ProfileData } from "../types";
import { Send, Bot, Sparkles, AlertCircle, RefreshCw } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: Date;
}

interface AIAssistantProps {
  profileData: ProfileData;
}

const COMMON_QUESTIONS = [
  "What is your tech stack & core strength?",
  "Tell me about your featured projects.",
  "What are you looking for in your next role?",
  "How can I contact or hire you?"
];

export default function AIAssistant({ profileData }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Greet user on load or when profileData name changes
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        role: "model",
        content: `Hi there! 👋 I am the AI Duplicate of **${profileData.name}**. I know everything about my real-world self's projects, tech stack, and background. Go ahead, ask me anything about my bio or hire terms!`,
        timestamp: new Date()
      }
    ]);
  }, [profileData.name]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorText(null);
    const userMsg: Message = {
      id: Date.now().toString() + "-user",
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Assemble history to keep chat flow coherent
      // Gather up to the last 10 messages
      const payloadHistory = messages
        .slice(-10)
        .map((m) => ({ role: m.role, content: m.content }));

      // API request to server-side Gemini endpoint
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: textToSend,
          history: payloadHistory,
          context: {
            name: profileData.name,
            role: profileData.role,
            bio: profileData.bio,
            skills: profileData.skills,
            projects: profileData.projects,
            experiences: profileData.experiences
          }
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to retrieve response from the virtual avatar.");
      }

      const botMsg: Message = {
        id: Date.now().toString() + "-bot",
        role: "model",
        content: data.reply,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMsg]);

    } catch (err: any) {
      console.error("Chatbot response error:", err);
      setErrorText(err.message || "Something went wrong. Let me retry.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const accentColorClass = {
    violet: "text-violet-400 bg-violet-500/10 hover:bg-violet-500/20 active:bg-violet-500/30",
    blue: "text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 active:bg-blue-500/30",
    teal: "text-teal-400 bg-teal-500/10 hover:bg-teal-500/20 active:bg-teal-500/30",
    emerald: "text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 active:bg-emerald-500/30",
    amber: "text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 active:bg-amber-500/30",
    rose: "text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 active:bg-rose-500/30"
  }[profileData.themeColor];

  const submitBtnAccent = {
    violet: "bg-violet-600 hover:bg-violet-700 focus:ring-violet-500",
    blue: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
    teal: "bg-teal-600 hover:bg-teal-700 focus:ring-teal-500",
    emerald: "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500",
    amber: "bg-amber-600 hover:bg-amber-750 focus:ring-amber-500",
    rose: "bg-rose-600 hover:bg-rose-700 focus:ring-rose-500"
  }[profileData.themeColor];

  const pillBorderAccent = {
    violet: "focus:border-violet-500 focus:ring-violet-500",
    blue: "focus:border-blue-500 focus:ring-blue-500",
    teal: "focus:border-teal-500 focus:ring-teal-500",
    emerald: "focus:border-emerald-500 focus:ring-emerald-500",
    amber: "focus:border-amber-500 focus:ring-amber-500",
    rose: "focus:border-rose-500 focus:ring-rose-500"
  }[profileData.themeColor];

  return (
    <div className="flex flex-col h-full bg-zinc-950/75 rounded-2xl overflow-hidden border border-zinc-900 shadow-inner" id="ai-assistant-card">
      {/* Bot Chat Header */}
      <div className="p-4 bg-zinc-900/60 border-b border-zinc-900/80 flex items-center justify-between" id="chat-header">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className={`p-1.5 rounded-xl ${accentColorClass.split(" ")[1]} border border-zinc-800`}>
              <Bot className="text-zinc-200" size={16} />
            </div>
            <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-zinc-950 ${
              profileData.themeColor === "violet" ? "bg-violet-500 animate-pulse" :
              profileData.themeColor === "blue" ? "bg-blue-500 animate-pulse" :
              profileData.themeColor === "teal" ? "bg-teal-500 animate-pulse" :
              profileData.themeColor === "emerald" ? "bg-emerald-500 animate-pulse" :
              profileData.themeColor === "amber" ? "bg-amber-500 animate-pulse" :
              "bg-rose-500 animate-pulse"
            }`} />
          </div>
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-zinc-400">AI Duplicate Node</h4>
            <p className="font-sans font-bold text-xs text-white">Ask anything about {profileData.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Sparkles className={`opacity-80 animate-pulse ${
            profileData.themeColor === "violet" ? "text-violet-400" :
            profileData.themeColor === "blue" ? "text-blue-400" :
            profileData.themeColor === "teal" ? "text-teal-400" :
            profileData.themeColor === "emerald" ? "text-emerald-400" :
            profileData.themeColor === "amber" ? "text-amber-400" :
            "text-rose-400"
          }`} size={13} />
          <span className="font-mono text-[9px] text-zinc-500">DualCore-v3.5</span>
        </div>
      </div>

      {/* Message Output Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[180px] max-h-[300px]" id="chat-thread-container">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex max-w-[85%] flex-col space-y-0.5 ${
              msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
            }`}
            id={`chat-msg-${msg.id}`}
          >
            <div className="flex items-center gap-1 px-1">
              <span className="font-mono text-[8px] text-zinc-500 uppercase">
                {msg.role === "user" ? "You" : `Duplicate`}
              </span>
              <span className="text-[8px] text-zinc-650">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div
              className={`px-3 py-2.5 rounded-2xl text-xs leading-relaxed ${
                msg.role === "user"
                  ? "bg-zinc-800 text-zinc-100 rounded-br-none border border-zinc-850"
                  : "bg-zinc-900/90 text-zinc-200 rounded-bl-none border border-zinc-850/40"
              }`}
            >
              {/* Highlight bold Markdown text */}
              {msg.content.split("\n").map((line, idx) => (
                <p key={idx} className={idx > 0 ? "mt-1.5" : ""}>
                  {line.split("**").map((chunk, cidx) => 
                    cidx % 2 === 1 ? <strong key={cidx} className="text-white font-semibold">{chunk}</strong> : chunk
                  )}
                </p>
              ))}
            </div>
          </div>
        ))}

        {/* Loading Indicator Spinner */}
        {isLoading && (
          <div className="flex flex-col space-y-1 items-start max-w-[80%]" id="chat-loading-placeholder">
            <span className="font-mono text-[8px] text-zinc-500 uppercase px-1">Thinking...</span>
            <div className="bg-zinc-900 border border-zinc-850 px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

        {/* Error Alert Box */}
        {errorText && (
          <div className="p-3 bg-rose-950/40 border border-rose-900/50 rounded-xl flex items-start gap-2 text-rose-300 text-[11px]" id="chat-error-log">
            <AlertCircle size={14} className="mt-0.5 shrink-0 text-rose-400" />
            <div className="space-y-1.5 w-full">
              <p className="font-sans leading-relaxed">{errorText}</p>
              <button
                onClick={() => sendMessage(messages[messages.length - 1]?.content || "Hello")}
                className="font-mono text-[9px] hover:underline flex items-center gap-1 text-rose-400"
              >
                <RefreshCw size={10} /> Retry Last Question
              </button>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggestion Quick Chips */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2 pt-1 flex flex-wrap gap-1.5 overflow-x-auto select-none" id="suggestion-chips-container">
          {COMMON_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className={`text-[10px] font-mono px-2.5 py-1.5 rounded-full border border-zinc-900/80 transition-all text-left truncate max-w-full cursor-pointer ${accentColorClass}`}
              id={`chip-${q.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* User Chat Input Panel */}
      <div className="p-3 bg-zinc-900/40 border-t border-zinc-900/60 flex gap-2" id="chat-inputs-panel">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={`Ask about projects, stacks, availability...`}
          className={`flex-1 bg-zinc-950 text-white placeholder-zinc-500 border border-zinc-850 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 ${pillBorderAccent}`}
          id="chat-user-textbox"
        />
        <button
          onClick={() => sendMessage(inputValue)}
          disabled={!inputValue.trim() || isLoading}
          className={`p-2 rounded-xl text-white shadow-md transition-all flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-40 disabled:pointer-events-none ${submitBtnAccent}`}
          id="chat-submit-btn"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}
