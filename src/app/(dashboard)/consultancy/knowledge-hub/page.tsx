"use client";

import { TopBar } from "@/components/layout/topbar";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Upload,
  Download,
  Eye,
  Clock,
  FileText,
  Tag,
} from "lucide-react";
import { knowledgeDocuments } from "@/lib/mock-data";
import type { KnowledgeDocument } from "@/lib/types";

const categoryColors: Record<KnowledgeDocument["category"], string> = {
  SOP: "bg-blue-100 text-blue-700",
  Policy: "bg-purple-100 text-purple-700",
  Template: "bg-indigo-100 text-indigo-700",
  FAQ: "bg-cyan-100 text-cyan-700",
  Scheme: "bg-emerald-100 text-emerald-700",
  Training: "bg-green-100 text-green-700",
  Compliance: "bg-red-100 text-red-700",
};

const categories: Array<KnowledgeDocument["category"] | "All"> = [
  "All",
  "SOP",
  "Policy",
  "Template",
  "FAQ",
  "Scheme",
  "Training",
  "Compliance",
];

const recentlyViewed = [
  { id: "KD001", title: "BC Onboarding SOP v3.2", time: "5 min ago" },
  { id: "KD003", title: "CM YUVA — Eligibility Guide", time: "1 hr ago" },
  { id: "KD002", title: "DPR Template — MSME Cluster", time: "2 hr ago" },
];

function DocumentCard({ doc }: { doc: KnowledgeDocument }) {
  const catColor = categoryColors[doc.category] ?? "bg-slate-100 text-slate-600";
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
            <FileText className="h-4.5 w-4.5 text-slate-500" />
          </div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${catColor}`}>
            {doc.category}
          </span>
        </div>
        <h3 className="text-sm font-semibold text-slate-900 leading-snug mb-1 line-clamp-2">
          {doc.title}
        </h3>
        <p className="text-xs text-slate-500 mb-2">by {doc.author}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {doc.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
              <Tag className="inline h-2.5 w-2.5 mr-0.5" />
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 text-[10px] text-slate-400 mb-3 pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {doc.views.toLocaleString("en-IN")} views
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Updated {doc.updatedAt}
          </span>
          <Badge variant="secondary" className="text-[10px] capitalize">{doc.division}</Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-7 text-xs flex-1 gap-1">
            <Eye className="h-3 w-3" />
            View
          </Button>
          <Button size="sm" className="h-7 text-xs flex-1 gap-1">
            <Download className="h-3 w-3" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function KnowledgeHubPage() {
  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="District Knowledge Hub"
        subtitle="Centralized repository for SOPs, policies, templates, and compliance documents"
        actions={
          <Button size="sm" className="h-8 gap-1.5">
            <Upload className="h-3.5 w-3.5" />
            Upload Document
          </Button>
        }
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              className="w-full h-12 pl-12 pr-4 text-sm bg-white border border-slate-200 rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-upicon-500 focus:border-upicon-400"
              placeholder="Search documents by title, keyword, scheme, or district..."
            />
            <Button size="sm" className="absolute right-3 top-1/2 -translate-y-1/2 h-8">
              Search
            </Button>
          </div>

          {/* Document tabs */}
          <Tabs defaultValue="All">
            <TabsList className="h-9 flex gap-1 flex-wrap">
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat} className="text-xs px-3">
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((cat) => (
              <TabsContent key={cat} value={cat} className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {knowledgeDocuments
                    .filter((doc) => cat === "All" || doc.category === cat)
                    .map((doc) => (
                      <DocumentCard key={doc.id} doc={doc} />
                    ))}
                  {/* Placeholder cards for richer feel */}
                  {cat === "All" && (
                    <>
                      <Card className="hover:shadow-md transition-shadow border-dashed border-slate-300 bg-slate-50/50">
                        <CardContent className="p-4 flex flex-col items-center justify-center h-full min-h-[180px] gap-2">
                          <Upload className="h-7 w-7 text-slate-300" />
                          <p className="text-sm text-slate-400 font-medium">Upload a document</p>
                          <p className="text-xs text-slate-400 text-center">Drag &amp; drop or click to upload SOP, template, or policy</p>
                          <Button variant="outline" size="sm" className="h-7 text-xs mt-1">Browse Files</Button>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
                {knowledgeDocuments.filter((doc) => cat === "All" || doc.category === cat).length === 0 && (
                  <div className="text-center py-12 text-slate-400">
                    <FileText className="h-10 w-10 mx-auto mb-3 text-slate-300" />
                    <p className="text-sm font-medium">No documents in this category yet</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Sidebar */}
        <aside className="w-64 border-l border-slate-200 bg-white shrink-0 p-4 space-y-6 overflow-y-auto">
          <div>
            <SectionHeader title="Recently Viewed" className="mb-3" />
            <div className="space-y-2">
              {recentlyViewed.map((item) => (
                <button
                  key={item.id}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100"
                >
                  <p className="text-xs font-medium text-slate-800 line-clamp-2">{item.title}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {item.time}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader title="By Division" className="mb-3" />
            <div className="space-y-2">
              {[
                { label: "Banking", count: 42, color: "bg-blue-500" },
                { label: "Consultancy", count: 38, color: "bg-purple-500" },
                { label: "Training", count: 51, color: "bg-emerald-500" },
                { label: "Common / Admin", count: 16, color: "bg-slate-400" },
              ].map((div) => (
                <div key={div.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${div.color}`} />
                    <span className="text-xs text-slate-700">{div.label}</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-900">{div.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader title="Quick Actions" className="mb-3" />
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full h-8 text-xs justify-start gap-2">
                <Upload className="h-3.5 w-3.5" />
                Upload Document
              </Button>
              <Button variant="outline" size="sm" className="w-full h-8 text-xs justify-start gap-2">
                <Download className="h-3.5 w-3.5" />
                Download All SOPs
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
