"use client";

import { TopBar } from "@/components/layout/topbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Upload,
  Download,
  Eye,
  FileText,
  Clock,
  Shield,
  GraduationCap,
  BookOpen,
  ClipboardList,
  Tag,
  HelpCircle,
  Star,
} from "lucide-react";
import { knowledgeDocuments } from "@/lib/mock-data";
import type { KnowledgeDocument } from "@/lib/types";

const categoryConfig: Record<
  KnowledgeDocument["category"],
  { icon: React.ElementType; color: string; bg: string; border: string }
> = {
  SOP: { icon: ClipboardList, color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200" },
  Policy: { icon: BookOpen, color: "text-purple-700", bg: "bg-purple-50", border: "border-purple-200" },
  Template: { icon: FileText, color: "text-indigo-700", bg: "bg-indigo-50", border: "border-indigo-200" },
  FAQ: { icon: HelpCircle, color: "text-cyan-700", bg: "bg-cyan-50", border: "border-cyan-200" },
  Scheme: { icon: Star, color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
  Training: { icon: GraduationCap, color: "text-green-700", bg: "bg-green-50", border: "border-green-200" },
  Compliance: { icon: Shield, color: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
};

const categoryCounts: Record<string, number> = {
  SOP: 48,
  Policy: 32,
  Template: 41,
  FAQ: 28,
  Scheme: 36,
  Training: 51,
  Compliance: 24,
  Other: 24,
};

export default function KnowledgePage() {
  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="Knowledge Base"
        subtitle="Centralized repository for all UPICON operational documents and guidelines"
        actions={
          <Button size="sm" className="h-8 gap-1.5">
            <Upload className="h-3.5 w-3.5" />
            Upload Document
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Search */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            className="w-full h-12 pl-12 pr-32 text-sm bg-white border border-slate-200 rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-upicon-500 focus:border-upicon-400"
            placeholder="Search by keyword, scheme, category, or author..."
          />
          <Button size="sm" className="absolute right-3 top-1/2 -translate-y-1/2 h-8 px-4">
            Search
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Documents", value: "284", icon: FileText, color: "text-upicon-700", bg: "bg-upicon-50" },
            { label: "Categories", value: "12", icon: Tag, color: "text-blue-700", bg: "bg-blue-50" },
            { label: "Searches Today", value: "847", icon: Search, color: "text-emerald-700", bg: "bg-emerald-50" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4">
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center shrink-0`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Category grid */}
        <div>
          <h2 className="text-base font-semibold text-slate-900 mb-4">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(Object.entries(categoryConfig) as Array<[KnowledgeDocument["category"], typeof categoryConfig[KnowledgeDocument["category"]]]>).map(([cat, cfg]) => {
              const IconComp = cfg.icon;
              return (
                <button
                  key={cat}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 ${cfg.bg} ${cfg.border} hover:shadow-md transition-all hover:-translate-y-0.5 text-left`}
                >
                  <div className={`w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0`}>
                    <IconComp className={`h-5 w-5 ${cfg.color}`} />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${cfg.color}`}>{cat}</p>
                    <p className="text-xs text-slate-500">{categoryCounts[cat] ?? 0} docs</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Document list */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-slate-900">Recent Documents</h2>
            <Button variant="outline" size="sm" className="h-8 gap-1.5">
              <Download className="h-3.5 w-3.5" />
              Export All
            </Button>
          </div>

          <div className="space-y-3">
            {knowledgeDocuments.map((doc) => {
              const cfg = categoryConfig[doc.category];
              const IconComp = cfg?.icon ?? FileText;
              return (
                <div
                  key={doc.id}
                  className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-sm transition-shadow flex items-start gap-4"
                >
                  <div className={`w-10 h-10 ${cfg?.bg ?? "bg-slate-50"} rounded-xl flex items-center justify-center shrink-0`}>
                    <IconComp className={`h-5 w-5 ${cfg?.color ?? "text-slate-500"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-slate-900 truncate">{doc.title}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">by {doc.author}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge variant="secondary" className="text-[10px]">{doc.category}</Badge>
                        <Badge variant="info" className="text-[10px] capitalize">{doc.division}</Badge>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {doc.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-4 text-[10px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {doc.views.toLocaleString("en-IN")} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Updated {doc.updatedAt}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-7 px-3 text-xs gap-1">
                          <Eye className="h-3 w-3" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="h-7 px-3 text-xs gap-1">
                          <Download className="h-3 w-3" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
