"use client";

import Link from "next/link";
import { TopBar } from "@/components/layout/topbar";
import { KPICard } from "@/components/shared/kpi-card";
import { SectionHeader } from "@/components/shared/section-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  BarChart3,
  ClipboardList,
  BookOpen,
  ArrowRight,
  Plus,
  Download,
  Clock,
  TrendingUp,
} from "lucide-react";
import { dprProjects, consultancyPipelineData } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const modules = [
  {
    title: "DPR Copilot",
    description: "AI-assisted DPR drafting from templates, district data, and prior sector work",
    href: "/consultancy/dpr-copilot",
    icon: FileText,
    color: "bg-purple-500",
    stats: "23 live DPRs",
  },
  {
    title: "TEV Copilot",
    description: "Guided appraisal workspace — cost, demand, viability, subsidy, and risk analysis",
    href: "/consultancy/tev-copilot",
    icon: BarChart3,
    color: "bg-indigo-500",
    stats: "17 live TEVs",
  },
  {
    title: "SurveyOps",
    description: "Field survey management, agent tracking, GPS validation, and data quality",
    href: "/consultancy/survey-ops",
    icon: ClipboardList,
    color: "bg-cyan-500",
    stats: "42 field agents",
  },
  {
    title: "Knowledge Hub",
    description: "District SOPs, DPR templates, policy documents, and compliance checklists",
    href: "/consultancy/knowledge-hub",
    icon: BookOpen,
    color: "bg-emerald-500",
    stats: "147 documents",
  },
];

export default function ConsultancyPage() {
  const avgDraftAge = 4.8;

  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="Consultancy & G2G"
        subtitle="DPR drafting, TEV appraisal, survey operations, and knowledge management"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1.5">
              <Download className="h-3.5 w-3.5" />
              Export
            </Button>
            <Button size="sm" className="h-8 gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              New DPR
            </Button>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Live DPRs"
            value={23}
            change={4.5}
            changeLabel="vs last month"
            icon={FileText}
            iconBg="bg-purple-50"
            iconColor="text-purple-600"
          />
          <KPICard
            title="Live TEVs"
            value={17}
            change={12.0}
            changeLabel="vs last month"
            icon={BarChart3}
            iconBg="bg-indigo-50"
            iconColor="text-indigo-600"
          />
          <KPICard
            title="Pipeline Value"
            value={formatCurrency(14500000)}
            change={8.2}
            changeLabel="vs last month"
            icon={TrendingUp}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />
          <KPICard
            title="Avg Draft Age"
            value={`${avgDraftAge} days`}
            subtitle={avgDraftAge > 5 ? "Above 5-day threshold" : "Within target"}
            icon={Clock}
            iconBg={avgDraftAge > 5 ? "bg-red-50" : "bg-amber-50"}
            iconColor={avgDraftAge > 5 ? "text-red-600" : "text-amber-600"}
          />
        </div>

        {/* Module cards */}
        <div>
          <SectionHeader title="Consultancy Modules" description="Click to open the full module" className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {modules.map((mod) => (
              <Link key={mod.title} href={mod.href}>
                <Card className="hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer h-full">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 ${mod.color} rounded-xl flex items-center justify-center`}>
                        <mod.icon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1">{mod.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-3">{mod.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                        {mod.stats}
                      </span>
                      <ArrowRight className="h-4 w-4 text-slate-400" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* DPR Table + Pipeline */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* DPR Table */}
          <div className="xl:col-span-2">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Recent DPR Projects</CardTitle>
                  <Link href="/consultancy/dpr-copilot">
                    <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                      View all <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50">
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">ID</th>
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Title</th>
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Client</th>
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Sector</th>
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Status</th>
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Age</th>
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Assigned</th>
                        <th className="text-right px-4 py-2.5 text-xs font-semibold text-slate-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {dprProjects.map((dpr) => (
                        <tr key={dpr.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3">
                            <span className="text-xs font-mono text-slate-500">{dpr.id}</span>
                          </td>
                          <td className="px-4 py-3 max-w-[180px]">
                            <span className="text-sm text-slate-800 font-medium line-clamp-1">{dpr.title}</span>
                            <span className="text-xs text-slate-400 block">{dpr.district}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs text-slate-600">{dpr.client}</span>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant="secondary" className="text-xs">{dpr.sector}</Badge>
                          </td>
                          <td className="px-4 py-3">
                            <StatusBadge status={dpr.status} />
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-medium ${dpr.draftAge > 7 ? "text-red-600" : dpr.draftAge > 4 ? "text-amber-600" : "text-slate-600"}`}>
                              {dpr.draftAge > 0 ? `${dpr.draftAge}d` : "—"}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs text-slate-600">{dpr.assignedTo.split(" ").slice(0, 2).join(" ")}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1 justify-end">
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">View</Button>
                              <Button variant="outline" size="sm" className="h-7 px-2 text-xs">Edit</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pipeline by sector */}
          <div>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Pipeline by Sector</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {consultancyPipelineData.map((item) => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-700">{item.name}</span>
                      <span className="text-xs font-semibold text-slate-900">{item.value}%</span>
                    </div>
                    <Progress
                      value={item.value}
                      className="h-1.5"
                      indicatorClassName={
                        item.value > 35 ? "bg-purple-500" :
                        item.value > 20 ? "bg-indigo-500" :
                        item.value > 12 ? "bg-cyan-500" : "bg-slate-400"
                      }
                    />
                  </div>
                ))}
                <div className="pt-3 border-t border-slate-100 mt-3">
                  <p className="text-xs text-slate-500">Total pipeline value</p>
                  <p className="text-lg font-bold text-slate-900 mt-0.5">{formatCurrency(14500000)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
