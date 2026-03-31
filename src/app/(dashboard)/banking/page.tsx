import { Metadata } from "next";
import Link from "next/link";
import { TopBar } from "@/components/layout/topbar";
import { KPICard } from "@/components/shared/kpi-card";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BCFunnelChart } from "@/components/banking/bc-funnel-chart";
import { businessCorrespondents, bcFunnelData, districtBCDistribution } from "@/lib/mock-data";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  Users,
  UserCheck,
  Monitor,
  TrendingUp,
  ArrowRight,
  Bot,
  BarChart3,
  Plus,
  Download,
} from "lucide-react";

export const metadata: Metadata = { title: "Banking & Financial Inclusion" };

const modules = [
  {
    title: "BC Mobilize",
    description: "Lead capture, district routing, field exec tracker, and funnel view",
    href: "/banking/bc-mobilize",
    icon: Users,
    color: "bg-blue-500",
    stats: "847 active leads",
  },
  {
    title: "BC Onboard",
    description: "Eligibility, KYC docs, kiosk readiness, and activation workflow",
    href: "/banking/bc-onboard",
    icon: UserCheck,
    color: "bg-indigo-500",
    stats: "12 pending documents",
    alert: true,
  },
  {
    title: "BCAssist",
    description: "Hindi-first AI assistant for frontline BCs — SOP, leads, reports",
    href: "/banking/bc-assist",
    icon: Bot,
    color: "bg-violet-500",
    stats: "AI-powered",
  },
  {
    title: "BC Quality Monitor",
    description: "Active vs inactive, kiosk downtime, transactions, and complaints",
    href: "/banking/bc-quality",
    icon: BarChart3,
    color: "bg-cyan-500",
    stats: "89% kiosk uptime",
  },
];

export default function BankingPage() {
  const activeBCs = businessCorrespondents.filter((bc) => bc.status === "active").length;
  const pendingDocs = businessCorrespondents.filter((bc) => bc.status === "document").length;

  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="Banking & Financial Inclusion"
        subtitle="BC lifecycle management, kiosk operations, and financial inclusion metrics"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1.5">
              <Download className="h-3.5 w-3.5" />
              Export
            </Button>
            <Button size="sm" className="h-8 gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              Add BC Lead
            </Button>
          </div>
        }
      />

      <div className="flex-1 p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Active BCs"
            value={4287}
            change={5.2}
            changeLabel="vs last month"
            icon={Users}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
          />
          <KPICard
            title="Onboarded This Month"
            value={89}
            change={-12.4}
            changeLabel="vs last month"
            trendPositive={false}
            icon={UserCheck}
            iconBg="bg-indigo-50"
            iconColor="text-indigo-600"
          />
          <KPICard
            title="Active Kiosks"
            value={3814}
            change={2.1}
            changeLabel="vs last month"
            icon={Monitor}
            iconBg="bg-cyan-50"
            iconColor="text-cyan-600"
          />
          <KPICard
            title="Monthly Volume"
            value={formatCurrency(284500000)}
            change={8.7}
            changeLabel="vs last month"
            icon={TrendingUp}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />
        </div>

        {/* Module cards */}
        <div>
          <SectionHeader title="Banking Modules" description="Click to open the full module" className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {modules.map((mod) => (
              <Link key={mod.title} href={mod.href}>
                <Card className="hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer h-full">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 ${mod.color} rounded-xl flex items-center justify-center`}>
                        <mod.icon className="h-5 w-5 text-white" />
                      </div>
                      {mod.alert && <Badge variant="danger" className="text-[10px]">Action needed</Badge>}
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

        {/* Funnel + District Distribution */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <BCFunnelChart />

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">District-wise BC Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {districtBCDistribution.map((d) => {
                const total = d.active + d.inactive;
                const pct = Math.round((d.active / total) * 100);
                return (
                  <div key={d.district}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-700">{d.district}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">{d.active} active</span>
                        <span className="text-xs font-medium text-slate-900">{pct}%</span>
                      </div>
                    </div>
                    <Progress
                      value={pct}
                      className="h-1.5"
                      indicatorClassName={pct > 85 ? "bg-emerald-500" : pct > 70 ? "bg-blue-500" : "bg-amber-500"}
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
