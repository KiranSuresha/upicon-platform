"use client";

import { TopBar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Send, Paperclip, Zap } from "lucide-react";

const recentConversations = [
  {
    id: 1,
    bcName: "Ramesh Kumar Singh",
    bcId: "BC001",
    district: "Lucknow",
    lastMessage: "Kiosk mein login nahi ho raha hai",
    time: "2 min ago",
    unread: 2,
  },
  {
    id: 2,
    bcName: "Sunita Devi",
    bcId: "BC002",
    district: "Varanasi",
    lastMessage: "Nayi account kholne ka process kya hai?",
    time: "18 min ago",
    unread: 0,
  },
  {
    id: 3,
    bcName: "Pooja Sharma",
    bcId: "BC006",
    district: "Gorakhpur",
    lastMessage: "Customer ka grievance kaise file karein?",
    time: "45 min ago",
    unread: 1,
  },
  {
    id: 4,
    bcName: "Vikram Tiwari",
    bcId: "BC005",
    district: "Prayagraj",
    lastMessage: "PMJDY account ke liye documents list chahiye",
    time: "2 hr ago",
    unread: 0,
  },
  {
    id: 5,
    bcName: "Mohan Lal Gupta",
    bcId: "BC003",
    district: "Agra",
    lastMessage: "Printer band ho gayi hai, kya karein?",
    time: "3 hr ago",
    unread: 0,
  },
];

const quickChips = [
  "Account Opening",
  "Grievance Filing",
  "Lead Status",
  "Service Menu",
  "Field Report",
];

const mockMessages = [
  {
    id: 1,
    role: "user" as const,
    content: "Kiosk mein login nahi ho raha hai",
    time: "10:42 AM",
  },
  {
    id: 2,
    role: "assistant" as const,
    content:
      "Namaste Ramesh ji! Login problem ke liye yeh steps follow karein:\n\n**Step 1:** Kiosk restart karein — Power button 5 seconds dabaein\n**Step 2:** Restart ke baad **BC Login** select karein\n**Step 3:** Apna **Agent ID** enter karein (BC001)\n**Step 4:** OTP ke liye registered mobile number check karein\n**Step 5:** Agar OTP nahi aaya — Check karein ki mobile network hai\n\nAgar problem solve nahi hui toh mujhe batayein — main Field Executive ko alert kar deta hoon.",
    time: "10:42 AM",
  },
  {
    id: 3,
    role: "user" as const,
    content: "Nayi account kholne ke liye kya documents chahiye?",
    time: "10:45 AM",
  },
  {
    id: 4,
    role: "assistant" as const,
    content:
      "Jan Dhan / Savings Account ke liye documents:\n\n**Mandatory:**\n• Aadhaar Card (original + photocopy)\n• PAN Card (agar available ho)\n• 2 Passport size photos\n• Mobile number (Aadhaar se linked ho toh acha)\n\n**Address Proof (agar Aadhaar address different ho):**\n• Voter ID / Ration Card / Utility Bill\n\n**PMJDY (Zero Balance):**\n• Sirf Aadhaar sufficient hai\n• No minimum balance required\n• RuPay Debit Card milega\n\n**Process Time:** 15–20 minutes\n\nKiosk > New Account > Jan Dhan select karein. Koi aur help chahiye?",
    time: "10:46 AM",
  },
];

export default function BCAssistPage() {
  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="BCAssist — Hindi-first BC Support"
        subtitle="AI assistant for frontline Business Correspondents"
        actions={
          <Button size="sm" className="h-8 gap-1.5">
            <Bot className="h-3.5 w-3.5" />
            New Chat
          </Button>
        }
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left panel — Conversations */}
        <aside className="w-80 border-r border-slate-200 bg-white flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-100">
            <input
              className="w-full h-8 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-upicon-500"
              placeholder="Search conversations..."
            />
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {recentConversations.map((conv, idx) => (
              <button
                key={conv.id}
                className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors ${idx === 0 ? "bg-upicon-50" : ""}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 bg-upicon-600 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {conv.bcName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium text-slate-900 truncate">{conv.bcName}</span>
                        <span className="text-[10px] text-slate-400 shrink-0">{conv.bcId}</span>
                      </div>
                      <p className="text-xs text-slate-500 truncate">{conv.lastMessage}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-[10px] text-slate-400">{conv.time}</span>
                    {conv.unread > 0 && (
                      <span className="w-4 h-4 bg-upicon-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
                <Badge variant="secondary" className="mt-1.5 text-[10px]">
                  {conv.district}
                </Badge>
              </button>
            ))}
          </div>
        </aside>

        {/* Right panel — Chat */}
        <div className="flex-1 flex flex-col bg-slate-50 min-w-0">
          {/* Chat header */}
          <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-3">
            <div className="w-9 h-9 bg-upicon-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              RK
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Ramesh Kumar Singh — BC001</p>
              <p className="text-xs text-slate-500">Lucknow • SBI • Last active 2 min ago</p>
            </div>
            <div className="ml-auto">
              <Badge variant="success" className="text-xs">Active BC</Badge>
            </div>
          </div>

          {/* Welcome banner */}
          <div className="mx-6 mt-4">
            <Card className="bg-gradient-to-r from-upicon-600 to-violet-600 border-0">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">BCAssist — Hindi-first AI Support</p>
                  <p className="text-xs text-white/80">
                    Account opening, grievance filing, lead tracking, kiosk troubleshooting — all in Hindi & English
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick chips */}
          <div className="px-6 py-3 flex gap-2 flex-wrap">
            {quickChips.map((chip) => (
              <button
                key={chip}
                className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-full text-slate-700 hover:bg-upicon-50 hover:border-upicon-300 hover:text-upicon-700 transition-colors"
              >
                <Zap className="inline h-3 w-3 mr-1 text-upicon-500" />
                {chip}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-2 space-y-4">
            {mockMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 bg-upicon-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <Bot className="h-4 w-4 text-upicon-700" />
                  </div>
                )}
                <div
                  className={`max-w-lg rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-upicon-600 text-white rounded-tr-sm"
                      : "bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm"
                  }`}
                >
                  <p
                    className="text-sm leading-relaxed whitespace-pre-line"
                    style={{ fontFamily: "'Noto Sans', sans-serif" }}
                  >
                    {msg.content}
                  </p>
                  <p
                    className={`text-[10px] mt-1.5 ${
                      msg.role === "user" ? "text-white/70" : "text-slate-400"
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 bg-upicon-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <span className="text-white text-[10px] font-bold">RK</span>
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-upicon-100 rounded-full flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4 text-upicon-700" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1 items-center h-4">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Input bar */}
          <div className="bg-white border-t border-slate-200 px-6 py-4">
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
              <button className="text-slate-400 hover:text-slate-600">
                <Paperclip className="h-4 w-4" />
              </button>
              <input
                className="flex-1 bg-transparent text-sm outline-none placeholder-slate-400"
                placeholder="Type in Hindi or English..."
              />
              <Button size="sm" className="h-8 px-4 gap-1.5">
                <Send className="h-3.5 w-3.5" />
                Send
              </Button>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 text-center">
              BCAssist follows RBI guidelines. Advice is assistive — always verify with your Field Executive.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
