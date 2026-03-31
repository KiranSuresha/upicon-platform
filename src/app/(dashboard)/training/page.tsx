"use client";

import Link from "next/link";
import { TopBar } from "@/components/layout/topbar";
import { KPICard } from "@/components/shared/kpi-card";
import { SectionHeader } from "@/components/shared/section-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SchemeDistributionChart } from "@/components/training/scheme-distribution-chart";
import {
  GraduationCap,
  Users,
  Award,
  TrendingUp,
  ArrowRight,
  ClipboardList,
  BarChart3,
  UserCheck,
  Target,
  Plus,
  Download,
} from "lucide-react";
import { trainingBatches } from "@/lib/mock-data";

const modules = [
  {
    title: "Trainer OS",
    description: "Real-time attendance, quiz administration, and district evidence bundles",
    href: "/training/trainer-os",
    icon: ClipboardList,
    color: "bg-green-500",
    stats: "3 batches today",
  },
  {
    title: "Assessment Engine",
    description: "Quiz creation, scoring, certification, and scheme-wise pass rate analytics",
    href: "/training/assessment",
    icon: BarChart3,
    color: "bg-blue-500",
    stats: "8,420 assessments",
  },
  {
    title: "Beneficiary Clone",
    description: "Hindi-first post-training support — business guidance, scheme eligibility",
    href: "/training/beneficiary",
    icon: UserCheck,
    color: "bg-violet-500",
    stats: "AI-powered",
  },
  {
    title: "Outcome Tracker",
    description: "Business launch, market linkage, revenue, and employment outcome monitoring",
    href: "/training/outcome-tracker",
    icon: Target,
    color: "bg-amber-500",
    stats: "12,480 beneficiaries",
  },
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

export default function TrainingPage() {
  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="Training & Skilling"
        subtitle="Batch management, assessment, beneficiary outcomes, and scheme tracking"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1.5">
              <Download className="h-3.5 w-3.5" />
              Export
            </Button>
            <Button size="sm" className="h-8 gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              New Batch
            </Button>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Active Batches"
            value={68}
            change={12.3}
            changeLabel="vs last month"
            icon={GraduationCap}
            iconBg="bg-green-50"
            iconColor="text-green-600"
          />
          <KPICard
            title="Total Beneficiaries"
            value={12480}
            change={8.4}
            changeLabel="vs last month"
            icon={Users}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
          />
          <KPICard
            title="Certification Rate"
            value="74.3%"
            change={2.1}
            changeLabel="vs last month"
            icon={Award}
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
          />
          <KPICard
            title="Business Launch Rate"
            value="41.2%"
            change={3.8}
            changeLabel="vs last month"
            icon={TrendingUp}
            iconBg="bg-violet-50"
            iconColor="text-violet-600"
          />
        </div>

        {/* Module cards */}
        <div>
          <SectionHeader title="Training Modules" description="Click to open the full module" className="mb-4" />
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

        {/* Batch table + chart */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Batch table */}
          <div className="xl:col-span-2">
            <Card>
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">Training Batches</h2>
                  <p className="text-xs text-slate-500">{trainingBatches.length} batches shown</p>
                </div>
                <Link href="/training/trainer-os">
                  <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                    Manage all <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Batch Code</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Scheme</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">District</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Trainer</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Attendance</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Score</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Status</th>
                      <th className="text-right px-4 py-2.5 text-xs font-semibold text-slate-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {trainingBatches.map((batch) => {
                      const attendPct = batch.totalEnrolled > 0 ? Math.round((batch.present / batch.totalEnrolled) * 100) : 0;
                      return (
                        <tr key={batch.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3">
                            <span className="text-xs font-mono text-slate-700">{batch.batchCode}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${schemeColors[batch.scheme] ?? "bg-slate-100 text-slate-600"}`}>
                              {batch.scheme}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs text-slate-600">{batch.district}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs text-slate-600">{batch.trainer}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Progress
                                value={attendPct}
                                className="h-1.5 w-16"
                                indicatorClassName={attendPct >= 90 ? "bg-emerald-500" : attendPct >= 70 ? "bg-amber-500" : "bg-red-500"}
                              />
                              <span className="text-xs text-slate-700 font-medium">{batch.present}/{batch.totalEnrolled}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {batch.assessmentScore !== undefined ? (
                              <span className={`text-sm font-semibold ${batch.assessmentScore >= 75 ? "text-emerald-600" : batch.assessmentScore >= 60 ? "text-amber-600" : "text-red-600"}`}>
                                {batch.assessmentScore}%
                              </span>
                            ) : (
                              <span className="text-xs text-slate-400">Pending</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <StatusBadge status={batch.status} />
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1 justify-end">
                              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">View</Button>
                              <Button variant="outline" size="sm" className="h-7 px-2 text-xs">Manage</Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Scheme chart */}
          <SchemeDistributionChart />
        </div>
      </div>
    </div>
  );
}
