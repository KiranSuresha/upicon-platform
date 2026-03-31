"use client";

import { TopBar } from "@/components/layout/topbar";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bot,
  FileText,
  Plus,
  Database,
  BookOpen,
  Send,
  Download,
  RefreshCw,
} from "lucide-react";
import { dprProjects } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import type { DPRStatus } from "@/lib/types";

const copilotMessages = [
  {
    id: 1,
    role: "user" as const,
    content: "Draft the executive summary for Lucknow Leather ODOP cluster",
    time: "11:20 AM",
  },
  {
    id: 2,
    role: "assistant" as const,
    content: `## Executive Summary\n\n**Project:** ODOP Cluster Development — Lucknow Leather\n**Client:** MSME Department, Government of Uttar Pradesh\n**Prepared by:** UPICON Consultancy Division\n\n### Project Overview\nThe proposed Lucknow Leather ODOP Cluster Development project aims to establish a world-class manufacturing and export ecosystem for the renowned Lucknow leather goods sector. The cluster will directly benefit 2,400+ artisans across 18 micro-enterprise units in Sarojini Nagar and Charbagh industrial zones.\n\n### Key Financials\n• **Total Project Cost:** ₹1.25 Crore\n• **Central Grant (SFURTI):** ₹62.5 Lakh (50%)\n• **State Contribution:** ₹25 Lakh (20%)\n• **Beneficiary Contribution:** ₹37.5 Lakh (30%)\n\n### Expected Outcomes\n• 40% increase in unit productivity\n• ₹3.8 Cr annual incremental revenue\n• Export linkage with 6 international buyers\n• 480 new jobs over 3 years\n\n### Recommendation\nProject is VIABLE and recommended for fast-track approval. IRR: 18.4% | Payback: 4.2 years`,
    time: "11:21 AM",
  },
];

const statusFilters: Array<{ label: string; value: "all" | DPRStatus }> = [
  { label: "All", value: "all" },
  { label: "Draft", value: "draft" },
  { label: "In Review", value: "in-review" },
  { label: "Approved", value: "approved" },
];

export default function DPRCopilotPage() {
  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="DPR Copilot"
        subtitle="AI-assisted drafting, review routing, and submission management"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1.5">
              <Download className="h-3.5 w-3.5" />
              Export All
            </Button>
            <Button size="sm" className="h-8 gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              New DPR
            </Button>
          </div>
        }
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left — DPR List */}
        <div className="flex-1 flex flex-col overflow-hidden border-r border-slate-200">
          <Tabs defaultValue="all" className="flex flex-col h-full">
            <div className="px-6 pt-4 pb-0 bg-white border-b border-slate-100">
              <TabsList className="h-8">
                {statusFilters.map((f) => (
                  <TabsTrigger key={f.value} value={f.value} className="text-xs px-3">
                    {f.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {statusFilters.map((filter) => (
              <TabsContent key={filter.value} value={filter.value} className="flex-1 overflow-y-auto p-6 mt-0 space-y-3">
                {dprProjects
                  .filter((d) => filter.value === "all" || d.status === filter.value)
                  .map((dpr) => (
                    <Card key={dpr.id} className="hover:shadow-sm transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-mono text-slate-400">{dpr.id}</span>
                              <StatusBadge status={dpr.status} />
                              {dpr.draftAge > 7 && (
                                <Badge variant="danger" className="text-[10px]">Overdue</Badge>
                              )}
                            </div>
                            <h3 className="text-sm font-semibold text-slate-900 line-clamp-1">{dpr.title}</h3>
                            <p className="text-xs text-slate-500 mt-0.5">{dpr.client} • {dpr.district}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-bold text-slate-900">{formatCurrency(dpr.value)}</p>
                            <p className="text-xs text-slate-400">{dpr.sector}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                          <span>Assigned: {dpr.assignedTo.split(" ").slice(-2).join(" ")}</span>
                          <span>Review loops: {dpr.reviewLoops}</span>
                          <span className={dpr.draftAge > 5 ? "text-red-600 font-medium" : ""}>
                            Age: {dpr.draftAge > 0 ? `${dpr.draftAge} days` : "—"}
                          </span>
                          <span className="ml-auto">Due: {dpr.dueDate}</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button variant="outline" size="sm" className="h-7 text-xs">Open DPR</Button>
                          <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                            <Bot className="h-3 w-3" />
                            AI Assist
                          </Button>
                          <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                            <RefreshCw className="h-3 w-3" />
                            Review Loop
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Right — Copilot Panel */}
        <div className="w-96 flex flex-col bg-slate-50 shrink-0">
          <div className="px-5 py-4 bg-white border-b border-slate-200">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 bg-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <p className="text-sm font-semibold text-slate-900">DPR Copilot</p>
              <Badge variant="info" className="text-[10px] ml-auto">AI Active</Badge>
            </div>
            <p className="text-xs text-slate-500">Contextual drafting assistant for DPR001 — Lucknow Leather ODOP</p>
          </div>

          {/* Action buttons */}
          <div className="px-4 py-3 border-b border-slate-200 bg-white flex gap-2">
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1 flex-1">
              <FileText className="h-3 w-3" />
              Template
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1 flex-1">
              <Database className="h-3 w-3" />
              District Data
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1 flex-1">
              <BookOpen className="h-3 w-3" />
              Prior Work
            </Button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {copilotMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <Bot className="h-3.5 w-3.5 text-purple-700" />
                  </div>
                )}
                <div
                  className={`max-w-[280px] rounded-xl px-3 py-2.5 ${
                    msg.role === "user"
                      ? "bg-purple-600 text-white rounded-tr-sm"
                      : "bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm"
                  }`}
                >
                  <p className="text-xs leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  <p className={`text-[10px] mt-1 ${msg.role === "user" ? "text-white/70" : "text-slate-400"}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="bg-white border-t border-slate-200 p-4">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
              <input
                className="flex-1 bg-transparent text-xs outline-none placeholder-slate-400"
                placeholder="Ask DPR Copilot..."
              />
              <Button size="sm" className="h-7 px-3 gap-1 text-xs bg-purple-600 hover:bg-purple-700">
                <Send className="h-3 w-3" />
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
