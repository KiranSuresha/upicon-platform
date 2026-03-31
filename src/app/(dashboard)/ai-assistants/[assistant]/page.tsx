"use client";

import { notFound } from "next/navigation";
import { TopBar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { aiAssistants } from "@/lib/mock-data";
import {
  Bot,
  Send,
  Paperclip,
  Mic,
  Languages,
  Clock,
  ChevronRight,
} from "lucide-react";

const mockConversations = [
  { id: 1, title: "Kiosk login troubleshoot", time: "Today, 10:42 AM" },
  { id: 2, title: "Account opening documents", time: "Today, 9:15 AM" },
  { id: 3, title: "Grievance filing process", time: "Yesterday" },
  { id: 4, title: "Lead pipeline review", time: "2 days ago" },
];

function getMockMessages(assistantId: string) {
  const baseMessages: Array<{ id: number; role: "user" | "assistant"; content: string; time: string }> = [];

  if (assistantId === "bc-assist") {
    return [
      { id: 1, role: "user" as const, content: "Mera kiosk band ho gaya hai aur customer queue mein hai", time: "10:42 AM" },
      { id: 2, role: "assistant" as const, content: "Samajh gaya! Turant yeh karein:\n\n1. Router restart karein — 30 seconds off rakhein\n2. Kiosk power cycle karein\n3. Network indicator green hai ya nahi check karein\n\nAgar nahi chala, main Field Executive Anil Sharma ji ko alert kar deta hoon — woh 30 min mein pahunch jayenge.", time: "10:42 AM" },
      { id: 3, role: "user" as const, content: "Network bar dikha rahi hai lekin login fail ho raha hai", time: "10:44 AM" },
      { id: 4, role: "assistant" as const, content: "Achha — network hai toh server issue ho sakta hai. Yeh karein:\n\n• Browser cache clear karein (Ctrl+Shift+Delete)\n• Incognito mode mein try karein\n• URL: https://bc.upicon.in/login\n\nAgar ab bhi fail — IT helpline: 0522-XXXXXXX (24x7 available)", time: "10:45 AM" },
      { id: 5, role: "user" as const, content: "Thank you, incognito mein login ho gaya!", time: "10:47 AM" },
    ];
  } else if (assistantId === "dpr-copilot") {
    return [
      { id: 1, role: "user" as const, content: "Draft executive summary for Agri-Processing Infrastructure DPR", time: "11:00 AM" },
      { id: 2, role: "assistant" as const, content: "Generating executive summary for DPR002...\n\n## Executive Summary\n**Project:** Agri-Processing Infrastructure — Varanasi\n**Value:** ₹82 Lakh | **Client:** UP Agriculture Department\n\nThis project establishes a modern agri-processing hub serving 1,200 farmer families across Varanasi district. Key interventions include cold storage (500MT), primary processing unit, and market linkage platform.\n\n**ROI:** 22.4% | **Employment:** 180+ jobs | **Payback:** 3.2 years", time: "11:01 AM" },
      { id: 3, role: "user" as const, content: "What is the current review status?", time: "11:03 AM" },
      { id: 4, role: "assistant" as const, content: "DPR002 Status:\n• Current Status: Draft\n• Review Loops: 0 (freshly drafted)\n• Draft Age: 7 days\n• Due Date: 2024-12-10\n• Assigned to: Anjali Trivedi\n\n⚠️ This DPR is 7 days old without a review loop — recommend initiating review today to stay within SLA.", time: "11:03 AM" },
    ];
  } else {
    return [
      { id: 1, role: "assistant" as const, content: `Hello! I'm ${aiAssistants.find((a) => a.id === assistantId)?.name ?? "your AI assistant"}. How can I help you today?`, time: "Now" },
      { id: 2, role: "user" as const, content: "What can you help me with?", time: "Now" },
      { id: 3, role: "assistant" as const, content: `I can help with:\n${aiAssistants.find((a) => a.id === assistantId)?.capabilities.map((c) => `• ${c}`).join("\n") ?? "• General assistance"}\n\nJust ask me anything!`, time: "Now" },
    ];
  }

  return baseMessages;
}

export default function AssistantChatPage({
  params,
}: {
  params: { assistant: string };
}) {
  const { assistant: id } = params;
  const foundAssistant = aiAssistants.find((a) => a.id === id);

  if (!foundAssistant) {
    notFound();
  }

  // After notFound() guard, foundAssistant is always defined
  const assistant = foundAssistant!;
  const messages = getMockMessages(id);

  return (
    <div className="flex flex-col h-full">
      <TopBar
        title={assistant.name}
        subtitle={assistant.description}
        actions={
          <div className="flex items-center gap-2">
            <Badge variant="success" className="text-xs">Online</Badge>
            <Button variant="outline" size="sm" className="h-8 gap-1.5">
              <Languages className="h-3.5 w-3.5" />
              Language
            </Button>
          </div>
        }
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <aside className="w-64 border-r border-slate-200 bg-white flex flex-col shrink-0 overflow-y-auto">
          {/* Assistant info */}
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-3xl">{assistant.icon}</div>
              <div>
                <p className="text-sm font-bold text-slate-900">{assistant.name}</p>
                <Badge variant="secondary" className="text-[10px] capitalize">{assistant.division}</Badge>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">{assistant.description}</p>
          </div>

          {/* Capabilities */}
          <div className="p-4 border-b border-slate-100">
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-2">Capabilities</p>
            <ul className="space-y-1.5">
              {assistant.capabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-1.5 text-xs text-slate-600">
                  <ChevronRight className="h-3 w-3 text-slate-400 mt-0.5 shrink-0" />
                  {cap}
                </li>
              ))}
            </ul>
          </div>

          {/* Language selector */}
          <div className="p-4 border-b border-slate-100">
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-2">Language</p>
            <div className="flex gap-2">
              {assistant.languages.map((lang) => (
                <button
                  key={lang}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${lang === "Hindi" ? "bg-upicon-600 text-white border-upicon-600" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Conversation history */}
          <div className="p-4 flex-1">
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-2">Recent Conversations</p>
            <div className="space-y-2">
              {mockConversations.map((conv) => (
                <button
                  key={conv.id}
                  className={`w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors border ${conv.id === 1 ? "border-upicon-200 bg-upicon-50" : "border-slate-100"}`}
                >
                  <p className="text-xs font-medium text-slate-800 truncate">{conv.title}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {conv.time}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Chat area */}
        <div className="flex-1 flex flex-col bg-slate-50 min-w-0">
          {/* Chat header */}
          <div className="bg-white border-b border-slate-200 px-6 py-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm text-slate-600">Active conversation</span>
              <span className="text-xs text-slate-400 ml-2">Session started • Today</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 bg-upicon-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <span className="text-base">{assistant.icon}</span>
                  </div>
                )}
                <div
                  className={`max-w-xl rounded-2xl px-4 py-3 ${
                    msg.role === "user"
                      ? "bg-upicon-600 text-white rounded-tr-sm"
                      : "bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
                  <p className={`text-[10px] mt-1.5 ${msg.role === "user" ? "text-white/70" : "text-slate-400"}`}>
                    {msg.time}
                  </p>
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 bg-upicon-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">MD</span>
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-upicon-100 rounded-full flex items-center justify-center shrink-0">
                <span className="text-base">{assistant.icon}</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                <div className="flex gap-1 items-center h-4">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
              <span className="text-xs text-slate-400">{assistant.name} is typing...</span>
            </div>
          </div>

          {/* Input bar */}
          <div className="bg-white border-t border-slate-200 px-6 py-4">
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
              <button className="text-slate-400 hover:text-slate-600 transition-colors">
                <Paperclip className="h-4 w-4" />
              </button>
              <input
                className="flex-1 bg-transparent text-sm outline-none placeholder-slate-400"
                placeholder={`Message ${assistant.name}...`}
              />
              <button className="text-slate-400 hover:text-slate-600 transition-colors mr-1">
                <Mic className="h-4 w-4" />
              </button>
              <Button size="sm" className="h-8 px-4 gap-1.5">
                <Send className="h-3.5 w-3.5" />
                Send
              </Button>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 text-center">
              AI responses are assistive. Always verify critical decisions with authorized personnel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
