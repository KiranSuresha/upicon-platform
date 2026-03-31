"use client";

import { TopBar } from "@/components/layout/topbar";
import { KPICard } from "@/components/shared/kpi-card";
import { SectionHeader } from "@/components/shared/section-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OutcomeFunnelChart } from "@/components/training/outcome-funnel-chart";
import {
  Award,
  TrendingUp,
  ShoppingBag,
  AlertTriangle,
  Download,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { beneficiaries } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const filterTabs = [
  { label: "All", value: "all" },
  { label: "Certified", value: "certified" },
  { label: "Launched", value: "launched" },
  { label: "At Risk", value: "at-risk" },
  { label: "NPA Risk", value: "npa-risk" },
];

const schemeColors: Record<string, string> = {
  "CM YUVA": "bg-indigo-100 text-indigo-700",
  "ODOP": "bg-purple-100 text-purple-700",
  "Mission Shakti": "bg-pink-100 text-pink-700",
  "VSSY": "bg-amber-100 text-amber-700",
  "PMKVY": "bg-cyan-100 text-cyan-700",
  "DDU-GKY": "bg-emerald-100 text-emerald-700",
};

const riskBadgeVariant = {
  none: "success" as const,
  low: "warning" as const,
  medium: "warning" as const,
  high: "danger" as const,
};

function BeneficiaryTable({ items }: { items: typeof beneficiaries }) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Beneficiary</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Scheme</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">District</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Certification</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Business</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Turnover</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Employees</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Market Linked</th>
                <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Risk</th>
                <th className="text-right px-4 py-2.5 text-xs font-semibold text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((ben) => (
                <tr key={ben.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-violet-100 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold text-violet-700">
                          {ben.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{ben.name}</p>
                        <p className="text-[10px] text-slate-400">{ben.mobile}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${schemeColors[ben.scheme] ?? "bg-slate-100 text-slate-600"}`}>
                      {ben.scheme}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-slate-600">{ben.district}</span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={ben.certificationStatus} />
                  </td>
                  <td className="px-4 py-3">
                    {ben.businessLaunched ? (
                      <div className="flex items-center gap-1 text-emerald-600">
                        <CheckCircle className="h-3.5 w-3.5" />
                        <span className="text-xs font-medium">Launched</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-slate-400">
                        <XCircle className="h-3.5 w-3.5" />
                        <span className="text-xs">Not yet</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {ben.turnover !== undefined ? (
                      <span className="text-sm font-semibold text-slate-900">{formatCurrency(ben.turnover)}</span>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {ben.employeesCreated !== undefined ? (
                      <span className="text-sm font-semibold text-slate-900">{ben.employeesCreated}</span>
                    ) : (
                      <span className="text-xs text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {ben.marketLinked ? (
                      <Badge variant="success" className="text-[10px]">Yes</Badge>
                    ) : (
                      <Badge variant="secondary" className="text-[10px]">No</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {ben.riskFlag && (
                      <Badge variant={riskBadgeVariant[ben.riskFlag]} className="text-[10px] capitalize flex items-center gap-1 w-fit">
                        {ben.riskFlag !== "none" && <AlertTriangle className="h-2.5 w-2.5" />}
                        {ben.riskFlag === "none" ? "None" : `${ben.riskFlag} risk`}
                      </Badge>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 justify-end">
                      <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">View</Button>
                      <Button variant="outline" size="sm" className="h-7 px-2 text-xs">Contact</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export default function OutcomeTrackerPage() {
  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="Outcome Tracker"
        subtitle="Post-training business outcomes — certification, launch, market linkage, and risk"
        actions={
          <Button variant="outline" size="sm" className="h-8 gap-1.5">
            <Download className="h-3.5 w-3.5" />
            Export Report
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Certified"
            value={9240}
            change={3.4}
            changeLabel="vs last month"
            icon={Award}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
          />
          <KPICard
            title="Business Launched"
            value={5140}
            change={6.2}
            changeLabel="vs last month"
            icon={TrendingUp}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />
          <KPICard
            title="Market Linked"
            value={3480}
            change={8.7}
            changeLabel="vs last month"
            icon={ShoppingBag}
            iconBg="bg-indigo-50"
            iconColor="text-indigo-600"
          />
          <KPICard
            title="At Risk"
            value={847}
            change={2.1}
            changeLabel="vs last month"
            trendPositive={false}
            icon={AlertTriangle}
            iconBg="bg-red-50"
            iconColor="text-red-600"
          />
        </div>

        {/* Funnel + table */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Funnel chart */}
          <OutcomeFunnelChart />

          {/* Summary stats */}
          <div className="xl:col-span-2">
            <Card className="h-full">
              <CardContent className="p-5">
                <SectionHeader title="Outcome Summary" description="Aggregated performance across all batches" className="mb-4" />
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Total Beneficiaries", value: "12,480", color: "text-slate-900" },
                    { label: "Certification Rate", value: "74.3%", color: "text-blue-600" },
                    { label: "Business Launch Rate", value: "41.2%", color: "text-emerald-600" },
                    { label: "Market Linkage Rate", value: "27.9%", color: "text-indigo-600" },
                    { label: "Avg Annual Turnover", value: "₹7.2L", color: "text-amber-600" },
                    { label: "Total Employees Created", value: "3,840", color: "text-violet-600" },
                    { label: "Total Loan Disbursed", value: "₹42.8Cr", color: "text-cyan-600" },
                    { label: "Sustainability Rate", value: "17.5%", color: "text-emerald-700" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-slate-50 rounded-xl p-4">
                      <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Beneficiary table */}
        <div>
          <SectionHeader title="Beneficiary Records" description="Complete post-training outcome data" className="mb-4" />
          <Tabs defaultValue="all">
            <TabsList className="h-8 mb-4">
              {filterTabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value} className="text-xs px-3">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <BeneficiaryTable items={beneficiaries} />
            </TabsContent>
            <TabsContent value="certified" className="mt-0">
              <BeneficiaryTable items={beneficiaries.filter((b) => b.certificationStatus === "certified")} />
            </TabsContent>
            <TabsContent value="launched" className="mt-0">
              <BeneficiaryTable items={beneficiaries.filter((b) => b.businessLaunched)} />
            </TabsContent>
            <TabsContent value="at-risk" className="mt-0">
              <BeneficiaryTable items={beneficiaries.filter((b) => b.riskFlag === "medium" || b.riskFlag === "high")} />
            </TabsContent>
            <TabsContent value="npa-risk" className="mt-0">
              <BeneficiaryTable items={beneficiaries.filter((b) => b.riskFlag === "high")} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
