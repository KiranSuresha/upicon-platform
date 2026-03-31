"use client";

import { TopBar } from "@/components/layout/topbar";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Send, Zap, AlertTriangle } from "lucide-react";
import { beneficiaries } from "@/lib/mock-data";

const quickChips = [
  "Business Ideas",
  "Scheme Eligibility",
  "Loan Application",
  "Market Linkage",
  "Franchise Options",
];

const schemeColors: Record<string, string> = {
  "CM YUVA": "bg-indigo-100 text-indigo-700",
  "ODOP": "bg-purple-100 text-purple-700",
  "Mission Shakti": "bg-pink-100 text-pink-700",
  "VSSY": "bg-amber-100 text-amber-700",
  "PMKVY": "bg-cyan-100 text-cyan-700",
  "DDU-GKY": "bg-emerald-100 text-emerald-700",
  "RGSA": "bg-orange-100 text-orange-700",
};

const riskColors = {
  none: "bg-emerald-100 text-emerald-700",
  low: "bg-amber-100 text-amber-700",
  medium: "bg-orange-100 text-orange-700",
  high: "bg-red-100 text-red-700",
};

const mockMessages = [
  {
    id: 1,
    role: "assistant" as const,
    content: "Namaste Priya ji! Main aapka Beneficiary Clone hoon. Aapki training complete ho gayi hai — congratulations! 🎉\n\nAaj main aapki kaise madad kar sakta hoon?",
    time: "10:00 AM",
  },
  {
    id: 2,
    role: "user" as const,
    content: "Mujhe apna business shuru karna hai, kahan se shuru karun?",
    time: "10:02 AM",
  },
  {
    id: 3,
    role: "assistant" as const,
    content: `Priya ji, bahut achha! Business shuru karne ke liye yeh step-by-step plan follow karein:\n\n**Step 1 — Business Idea Select karein**\nAap Lucknow mein hain, toh yeh options best hain:\n• 🧵 Chikan embroidery products (ODOP)\n• 🍱 Tiffin service / food processing\n• 💄 Beauty parlour / salon\n• 📱 CSC / BC kiosk services\n\n**Step 2 — Loan Apply karein**\nCM YUVA ke under aapko ₹5 Lakh tak ka collateral-free loan milega:\n• Bank: Any nationalized bank\n• Interest: 4% only (remaining subsidy)\n• Documents: Aadhaar, PAN, Training Certificate\n\n**Step 3 — GST Registration**\nYadi annual turnover > ₹20 Lakh ho toh GST register karein. Common Seva Kendra (CSC) se FREE mein karva saktein hain.\n\n**Step 4 — Market Linkage**\nUPICON aapko buyers se connect karega:\n• ODOP marketplace\n• GeM portal\n• Local B2B melas\n\nKaunsa option aapko interest karta hai? Main aur detail de sakta hoon!`,
    time: "10:02 AM",
  },
  {
    id: 4,
    role: "user" as const,
    content: "CM YUVA franchise ke baare mein batao",
    time: "10:05 AM",
  },
  {
    id: 5,
    role: "assistant" as const,
    content: `CM YUVA Franchise Model:\n\n**Top Franchise Options under ₹5L:**\n\n| Franchise | Investment | Monthly Income |\n|-----------|------------|----------------|\n| PMFME Food Unit | ₹2–3L | ₹25,000–40,000 |\n| Pradhan Mantri Jan Aushadhi | ₹1.5L | ₹20,000–35,000 |\n| IFFCO Kisan Seva | ₹2L | ₹18,000–30,000 |\n| CSC Digital Kiosk | ₹50K | ₹15,000–25,000 |\n\n**Aapke liye best recommendation:**\nCSC Digital Kiosk — low investment, high demand, Lucknow mein plenty of customers!\n\nKya main aapka application form bharne mein help karun?`,
    time: "10:06 AM",
  },
];

export default function BeneficiaryClonePage() {
  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="Beneficiary Clone — Post-Training Support"
        subtitle="Hindi-first AI assistant for post-training beneficiary guidance"
        actions={
          <Button size="sm" className="h-8 gap-1.5">
            <Bot className="h-3.5 w-3.5" />
            New Session
          </Button>
        }
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left — Beneficiary list */}
        <aside className="w-72 border-r border-slate-200 bg-white flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-100">
            <input
              className="w-full h-8 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-violet-400"
              placeholder="Search beneficiaries..."
            />
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {beneficiaries.map((ben, idx) => (
              <button
                key={ben.id}
                className={`w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors ${idx === 0 ? "bg-violet-50" : ""}`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 bg-violet-200 rounded-full flex items-center justify-center shrink-0 text-violet-700 text-xs font-bold">
                    {ben.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-900 truncate">{ben.name}</p>
                      {ben.riskFlag && ben.riskFlag !== "none" && (
                        <AlertTriangle className={`h-3.5 w-3.5 shrink-0 ${ben.riskFlag === "high" ? "text-red-500" : "text-amber-500"}`} />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 truncate">{ben.district} • {ben.mobile}</p>
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${schemeColors[ben.scheme] ?? "bg-slate-100 text-slate-600"}`}>
                        {ben.scheme}
                      </span>
                      <StatusBadge status={ben.certificationStatus} />
                      {ben.riskFlag && ben.riskFlag !== "none" && (
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${riskColors[ben.riskFlag]}`}>
                          {ben.riskFlag} risk
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Right — Chat */}
        <div className="flex-1 flex flex-col bg-slate-50 min-w-0">
          {/* Chat header */}
          <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-3">
            <div className="w-9 h-9 bg-violet-200 rounded-full flex items-center justify-center text-violet-700 text-sm font-bold">
              PV
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Priya Verma — BEN001</p>
              <p className="text-xs text-slate-500">Lucknow • CM YUVA • Certified • Business Launched</p>
            </div>
            <div className="ml-auto flex gap-2">
              <Badge variant="success" className="text-xs">Certified</Badge>
              <Badge variant="info" className="text-xs">Business Launched</Badge>
            </div>
          </div>

          {/* Welcome banner */}
          <div className="mx-6 mt-4">
            <Card className="bg-gradient-to-r from-violet-600 to-purple-600 border-0">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Beneficiary Clone — Post-Training AI</p>
                  <p className="text-xs text-white/80">
                    Hindi mein business guidance, scheme eligibility, loan support, aur market linkage — sabh kuch ek jagah
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
                className="px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 rounded-full text-slate-700 hover:bg-violet-50 hover:border-violet-300 hover:text-violet-700 transition-colors"
              >
                <Zap className="inline h-3 w-3 mr-1 text-violet-500" />
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
                  <div className="w-7 h-7 bg-violet-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <Bot className="h-4 w-4 text-violet-700" />
                  </div>
                )}
                <div
                  className={`max-w-lg rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-violet-600 text-white rounded-tr-sm"
                      : "bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm"
                  }`}
                >
                  <p
                    className="text-sm leading-relaxed whitespace-pre-line"
                    style={{ fontFamily: "'Noto Sans', sans-serif" }}
                  >
                    {msg.content}
                  </p>
                  <p className={`text-[10px] mt-1.5 ${msg.role === "user" ? "text-white/70" : "text-slate-400"}`}>
                    {msg.time}
                  </p>
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 bg-violet-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <span className="text-white text-[10px] font-bold">PV</span>
                  </div>
                )}
              </div>
            ))}

            {/* Typing */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-violet-100 rounded-full flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4 text-violet-700" />
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

          {/* Input */}
          <div className="bg-white border-t border-slate-200 px-6 py-4">
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
              <input
                className="flex-1 bg-transparent text-sm outline-none placeholder-slate-400"
                placeholder="Hindi ya English mein type karein..."
              />
              <Button size="sm" className="h-8 px-4 gap-1.5 bg-violet-600 hover:bg-violet-700">
                <Send className="h-3.5 w-3.5" />
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
