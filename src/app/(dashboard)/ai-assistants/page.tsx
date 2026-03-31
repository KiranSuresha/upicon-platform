"use client";

import Link from "next/link";
import { TopBar } from "@/components/layout/topbar";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Languages, ExternalLink } from "lucide-react";
import { aiAssistants } from "@/lib/mock-data";
import type { AIAssistant } from "@/lib/types";

const divisionColors: Record<AIAssistant["division"], string> = {
  banking: "bg-blue-100 text-blue-700",
  consultancy: "bg-purple-100 text-purple-700",
  training: "bg-green-100 text-green-700",
  common: "bg-slate-100 text-slate-700",
};

const divisionBorder: Record<AIAssistant["division"], string> = {
  banking: "border-blue-200 hover:border-blue-400",
  consultancy: "border-purple-200 hover:border-purple-400",
  training: "border-green-200 hover:border-green-400",
  common: "border-slate-200 hover:border-slate-400",
};

const filterTabs = [
  { label: "All", value: "all" },
  { label: "Banking", value: "banking" },
  { label: "Consultancy", value: "consultancy" },
  { label: "Training", value: "training" },
];

function AssistantCard({ assistant }: { assistant: AIAssistant }) {
  return (
    <Card className={`hover:shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer border-2 ${divisionBorder[assistant.division]}`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl leading-none">{assistant.icon}</div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${divisionColors[assistant.division]}`}>
            {assistant.division}
          </span>
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-1">{assistant.name}</h3>
        <p className="text-xs text-slate-500 leading-relaxed mb-4">{assistant.description}</p>

        {/* Capabilities */}
        <div className="mb-4">
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-2">Capabilities</p>
          <ul className="space-y-1">
            {assistant.capabilities.slice(0, 4).map((cap) => (
              <li key={cap} className="flex items-start gap-1.5 text-xs text-slate-600">
                <span className="mt-1 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                {cap}
              </li>
            ))}
            {assistant.capabilities.length > 4 && (
              <li className="text-xs text-slate-400">+{assistant.capabilities.length - 4} more</li>
            )}
          </ul>
        </div>

        {/* Languages */}
        <div className="flex items-center gap-2 mb-4">
          <Languages className="h-3.5 w-3.5 text-slate-400" />
          <div className="flex gap-1">
            {assistant.languages.map((lang) => (
              <Badge key={lang} variant="secondary" className="text-[10px]">{lang}</Badge>
            ))}
          </div>
        </div>

        <Link href={`/dashboard/ai-assistants/${assistant.id}`}>
          <Button className="w-full h-8 text-xs gap-1.5" size="sm">
            <ExternalLink className="h-3.5 w-3.5" />
            Launch Assistant
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default function AIAssistantsPage() {
  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="AI Assistants"
        subtitle="Purpose-built AI assistants for banking, consultancy, and training operations"
        actions={
          <Button size="sm" className="h-8 gap-1.5">
            <Bot className="h-3.5 w-3.5" />
            Request New Assistant
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Stats banner */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "AI Assistants Available", value: aiAssistants.length, color: "text-upicon-700" },
            { label: "Languages Supported", value: "2 (Hindi + English)", color: "text-blue-700" },
            { label: "Monthly Conversations", value: "24,800+", color: "text-emerald-700" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-4 text-center">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs + grid */}
        <Tabs defaultValue="all">
          <div className="flex items-center justify-between mb-4">
            <SectionHeader title="All Assistants" description="Click any assistant to open a full chat session" />
            <TabsList className="h-8">
              {filterTabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value} className="text-xs px-3">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {filterTabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {aiAssistants
                  .filter((a) => tab.value === "all" || a.division === tab.value)
                  .map((assistant) => (
                    <AssistantCard key={assistant.id} assistant={assistant} />
                  ))}
              </div>
              {aiAssistants.filter((a) => tab.value === "all" || a.division === tab.value).length === 0 && (
                <div className="text-center py-12 text-slate-400">
                  <Bot className="h-10 w-10 mx-auto mb-3 text-slate-300" />
                  <p className="text-sm">No assistants in this category</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
