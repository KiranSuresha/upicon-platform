import { Metadata } from "next";
import { TopBar } from "@/components/layout/topbar";
import { KPICard } from "@/components/shared/kpi-card";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/shared/status-badge";
import { CommandCenterCharts } from "@/components/dashboard/command-center-charts";
import { TopBeneficiaryTable } from "@/components/dashboard/top-beneficiary-table";
import { WeeklyActivityFeed } from "@/components/dashboard/weekly-activity-feed";
import {
  commandCenterMetrics,
  workflowTasks,
} from "@/lib/mock-data";
import {
  Building2,
  Briefcase,
  GraduationCap,
  Network,
  ArrowRight,
  AlertTriangle,
  Clock,
  Download,
  RefreshCw,
} from "lucide-react";
import { formatCurrency, formatNumber, formatPercentage } from "@/lib/utils";
import Link from "next/link";

export const metadata: Metadata = { title: "Command Center" };

export default function CommandCenterPage() {
  const { banking, consultancy, training, network } = commandCenterMetrics;
  const criticalTasks = workflowTasks.filter(
    (t) => t.priority === "critical" || t.hoursElapsed > t.slaHours
  );

  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="MD Command Center"
        subtitle="Real-time intelligence across Banking, Consultancy, and Training"
        actions={
          <div className="flex items-center gap-2">
            <Badge variant="info" className="text-xs">
              Live — Updated 2 min ago
            </Badge>
            <Button variant="outline" size="sm" className="h-8 gap-1.5">
              <Download className="h-3.5 w-3.5" />
              Export
            </Button>
            <Button size="sm" className="h-8 gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh
            </Button>
          </div>
        }
      />

      <div className="flex-1 p-6 space-y-6">

        {/* Critical Alerts */}
        {criticalTasks.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="text-sm font-semibold text-red-800">
                {criticalTasks.length} SLA Breach / Critical Exception
                {criticalTasks.length > 1 ? "s" : ""}
              </span>
            </div>
            <div className="space-y-2">
              {criticalTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between bg-white rounded-lg px-3 py-2.5 border border-red-100"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">{task.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Assigned to {task.assignedTo} •{" "}
                      {task.hoursElapsed > task.slaHours ? (
                        <span className="text-red-600 font-medium">
                          SLA breached by {task.hoursElapsed - task.slaHours}h
                        </span>
                      ) : (
                        <span className="text-amber-600 font-medium">
                          Due {task.dueDate}
                        </span>
                      )}
                    </p>
                  </div>
                  <Link href="/workflows">
                    <Button variant="outline" size="xs" className="border-red-200 text-red-700 hover:bg-red-50">
                      Review
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Division KPI Summary */}
        <div>
          <SectionHeader
            title="Division Overview"
            description="Weekly performance snapshot across all verticals"
            className="mb-4"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Banking */}
            <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building2 className="h-3.5 w-3.5 text-blue-600" />
                    </div>
                    <CardTitle className="text-sm">Banking & Inclusion</CardTitle>
                  </div>
                  <Link href="/banking">
                    <ArrowRight className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Active BCs</span>
                  <span className="font-semibold text-slate-900">{formatNumber(banking.activeBCs)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Avg Onboarding TAT</span>
                  <span className="font-semibold text-slate-900">{banking.onboardingTAT} days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Active Kiosks</span>
                  <span className="font-semibold text-slate-900">{formatNumber(banking.activeKiosks)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Monthly Volume</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(banking.monthlyVolume)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Consultancy */}
            <Card className="border-l-4 border-l-purple-500 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Briefcase className="h-3.5 w-3.5 text-purple-600" />
                    </div>
                    <CardTitle className="text-sm">Consultancy & G2G</CardTitle>
                  </div>
                  <Link href="/consultancy">
                    <ArrowRight className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Live DPRs</span>
                  <span className="font-semibold text-slate-900">{consultancy.liveDPRs}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Live TEVs</span>
                  <span className="font-semibold text-slate-900">{consultancy.liveTEVs}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Pipeline Value</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(consultancy.pipelineValue)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Avg Draft Age</span>
                  <span className={`font-semibold ${consultancy.avgDraftAge > 5 ? "text-red-600" : "text-slate-900"}`}>
                    {consultancy.avgDraftAge} days
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Training */}
            <Card className="border-l-4 border-l-emerald-500 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <GraduationCap className="h-3.5 w-3.5 text-emerald-600" />
                    </div>
                    <CardTitle className="text-sm">Training & Skilling</CardTitle>
                  </div>
                  <Link href="/training">
                    <ArrowRight className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Active Batches</span>
                  <span className="font-semibold text-slate-900">{training.activeBatches}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Total Beneficiaries</span>
                  <span className="font-semibold text-slate-900">{formatNumber(training.totalBeneficiaries)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Certification Rate</span>
                  <span className="font-semibold text-slate-900">{formatPercentage(training.certificationRate)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Business Launch Rate</span>
                  <span className="font-semibold text-emerald-600">{formatPercentage(training.businessLaunchRate)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Network Economics */}
            <Card className="border-l-4 border-l-amber-500 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Network className="h-3.5 w-3.5 text-amber-600" />
                    </div>
                    <CardTitle className="text-sm">Network Economics</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Procurement Savings</span>
                  <span className="font-semibold text-emerald-600">{formatCurrency(network.pooledProcurementSavings)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">White-label Products</span>
                  <span className="font-semibold text-slate-900">{network.whiteLabelProducts}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Enterprise Cohorts</span>
                  <span className="font-semibold text-slate-900">{network.enterpriseCohorts}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Linkage Conversions</span>
                  <span className="font-semibold text-slate-900">{network.linkageConversions}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts + Top Beneficiaries */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <CommandCenterCharts />
          </div>
          <div>
            <TopBeneficiaryTable />
          </div>
        </div>

        {/* Bottom row: Pending workflows + Activity Feed */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Pending workflows */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Pending Approvals & SLAs</CardTitle>
                <Link href="/workflows">
                  <Button variant="ghost" size="xs" className="gap-1">
                    View all <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {workflowTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50"
                >
                  <div className={`w-2 h-2 rounded-full shrink-0 ${
                    task.priority === "critical" || task.hoursElapsed > task.slaHours
                      ? "bg-red-500"
                      : task.priority === "high"
                      ? "bg-amber-500"
                      : "bg-blue-500"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{task.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <StatusBadge status={task.status as any} />
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {task.hoursElapsed}/{task.slaHours}h
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="xs">Act</Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weekly activity */}
          <WeeklyActivityFeed />
        </div>
      </div>
    </div>
  );
}
