"use client";

import { TopBar } from "@/components/layout/topbar";
import { KPICard } from "@/components/shared/kpi-card";
import { SectionHeader } from "@/components/shared/section-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Clock,
  AlertTriangle,
  CheckCircle,
  PlayCircle,
  User,
  ArrowRight,
  Download,
  Plus,
} from "lucide-react";
import { workflowTasks } from "@/lib/mock-data";
import type { WorkflowTask } from "@/lib/types";

const priorityConfig = {
  low: { label: "Low", color: "text-slate-500", bg: "bg-slate-100" },
  medium: { label: "Medium", color: "text-amber-600", bg: "bg-amber-100" },
  high: { label: "High", color: "text-orange-600", bg: "bg-orange-100" },
  critical: { label: "Critical", color: "text-red-700", bg: "bg-red-100" },
};

const typeLabels: Record<WorkflowTask["type"], string> = {
  "bc-onboard": "BC Onboarding",
  "dpr-review": "DPR Review",
  "tev-approval": "TEV Approval",
  "training-evidence": "Training Evidence",
  "scheme-linkage": "Scheme Linkage",
  "compliance-check": "Compliance Check",
};

const typeColors: Record<WorkflowTask["type"], string> = {
  "bc-onboard": "bg-blue-100 text-blue-700",
  "dpr-review": "bg-purple-100 text-purple-700",
  "tev-approval": "bg-indigo-100 text-indigo-700",
  "training-evidence": "bg-green-100 text-green-700",
  "scheme-linkage": "bg-emerald-100 text-emerald-700",
  "compliance-check": "bg-red-100 text-red-700",
};

const timelineStages = [
  { label: "Created", icon: Plus, done: true },
  { label: "Assigned", icon: User, done: true },
  { label: "In Progress", icon: PlayCircle, done: true },
  { label: "Review", icon: Clock, done: false },
  { label: "Approved", icon: CheckCircle, done: false },
];

function WorkflowCard({ task }: { task: WorkflowTask }) {
  const slaPercent = Math.min(Math.round((task.hoursElapsed / task.slaHours) * 100), 100);
  const isBreached = task.hoursElapsed > task.slaHours;
  const priority = priorityConfig[task.priority];

  return (
    <Card className={`border-l-4 ${isBreached ? "border-l-red-500" : task.priority === "critical" ? "border-l-red-400" : task.priority === "high" ? "border-l-orange-400" : "border-l-slate-300"}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${typeColors[task.type]}`}>
                {typeLabels[task.type]}
              </span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${priority.bg} ${priority.color}`}>
                {priority.label}
              </span>
              {isBreached && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-700 flex items-center gap-1">
                  <AlertTriangle className="h-2.5 w-2.5" />
                  SLA Breached
                </span>
              )}
            </div>
            <h3 className="text-sm font-semibold text-slate-900">{task.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{task.description}</p>
          </div>
          <StatusBadge status={task.status} />
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            {task.assignedTo}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            Due: {task.dueDate}
          </span>
        </div>

        {/* SLA progress */}
        <div className="mb-3">
          <div className="flex justify-between text-[10px] mb-1">
            <span className="text-slate-500">SLA Progress</span>
            <span className={`font-semibold ${isBreached ? "text-red-600" : slaPercent >= 80 ? "text-amber-600" : "text-slate-600"}`}>
              {task.hoursElapsed}h / {task.slaHours}h
            </span>
          </div>
          <Progress
            value={slaPercent}
            className="h-1.5"
            indicatorClassName={
              isBreached ? "bg-red-500" :
              slaPercent >= 80 ? "bg-amber-500" :
              "bg-emerald-500"
            }
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {task.status !== "approved" && task.status !== "rejected" && (
            <>
              <Button size="sm" className="h-7 text-xs flex-1 bg-emerald-600 hover:bg-emerald-700 gap-1">
                <CheckCircle className="h-3 w-3" />
                Approve
              </Button>
              <Button variant="outline" size="sm" className="h-7 text-xs flex-1 gap-1 text-red-600 border-red-200 hover:bg-red-50">
                Reject
              </Button>
              {!isBreached && (
                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-amber-700">
                  <ArrowRight className="h-3 w-3" />
                  Escalate
                </Button>
              )}
            </>
          )}
          {(task.status === "approved" || task.status === "rejected") && (
            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
              View details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

const filterTabs = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "In Progress", value: "in-progress" },
  { label: "SLA Breach", value: "breach" },
  { label: "Completed", value: "completed" },
];

export default function WorkflowsPage() {
  const pending = workflowTasks.filter((t) => t.status === "pending").length;
  const breached = workflowTasks.filter((t) => t.hoursElapsed > t.slaHours).length;

  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="Workflows & Approval Engine"
        subtitle="Cross-division task routing, SLA tracking, and approval management"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1.5">
              <Download className="h-3.5 w-3.5" />
              Export
            </Button>
            <Button size="sm" className="h-8 gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              New Task
            </Button>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Pending"
            value={8}
            icon={Clock}
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
          />
          <KPICard
            title="SLA Breached"
            value={breached}
            icon={AlertTriangle}
            iconBg="bg-red-50"
            iconColor="text-red-600"
          />
          <KPICard
            title="Completed Today"
            value={14}
            change={16.7}
            changeLabel="vs yesterday"
            icon={CheckCircle}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />
          <KPICard
            title="Avg Resolution Time"
            value="18h"
            subtitle="Target: 24h"
            icon={PlayCircle}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Task list */}
          <div className="xl:col-span-2">
            <Tabs defaultValue="all">
              <div className="flex items-center justify-between mb-4">
                <SectionHeader title="Workflow Tasks" description="Manage approvals and track SLA compliance" />
                <TabsList className="h-8">
                  {filterTabs.map((tab) => (
                    <TabsTrigger key={tab.value} value={tab.value} className="text-xs px-2.5">
                      {tab.label}
                      {tab.value === "breach" && breached > 0 && (
                        <span className="ml-1 w-4 h-4 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                          {breached}
                        </span>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value="all" className="mt-0 space-y-3">
                {workflowTasks.map((task) => <WorkflowCard key={task.id} task={task} />)}
              </TabsContent>
              <TabsContent value="pending" className="mt-0 space-y-3">
                {workflowTasks.filter((t) => t.status === "pending").map((task) => <WorkflowCard key={task.id} task={task} />)}
              </TabsContent>
              <TabsContent value="in-progress" className="mt-0 space-y-3">
                {workflowTasks.filter((t) => t.status === "in-progress").map((task) => <WorkflowCard key={task.id} task={task} />)}
              </TabsContent>
              <TabsContent value="breach" className="mt-0 space-y-3">
                {workflowTasks.filter((t) => t.hoursElapsed > t.slaHours).map((task) => <WorkflowCard key={task.id} task={task} />)}
              </TabsContent>
              <TabsContent value="completed" className="mt-0 space-y-3">
                {workflowTasks.filter((t) => t.status === "approved" || t.status === "rejected").map((task) => <WorkflowCard key={task.id} task={task} />)}
              </TabsContent>
            </Tabs>
          </div>

          {/* Timeline sidebar */}
          <div>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Workflow Timeline</CardTitle>
                <p className="text-xs text-slate-500">BC Onboarding — Kavita Patel</p>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {timelineStages.map((stage, idx) => {
                    const IconComp = stage.icon;
                    const isLast = idx === timelineStages.length - 1;
                    return (
                      <div key={stage.label} className="flex items-start gap-3 pb-6 relative">
                        {!isLast && (
                          <div className={`absolute left-4 top-8 w-0.5 h-full ${stage.done ? "bg-emerald-400" : "bg-slate-200"}`} />
                        )}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${stage.done ? "bg-emerald-500" : "bg-slate-200"}`}>
                          <IconComp className={`h-4 w-4 ${stage.done ? "text-white" : "text-slate-400"}`} />
                        </div>
                        <div className="pt-1">
                          <p className={`text-sm font-medium ${stage.done ? "text-slate-900" : "text-slate-400"}`}>
                            {stage.label}
                          </p>
                          {stage.done && (
                            <p className="text-xs text-slate-400 mt-0.5">Completed</p>
                          )}
                          {!stage.done && (
                            <p className="text-xs text-amber-600 mt-0.5">Pending</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-2 pt-4 border-t border-slate-100 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Created</span>
                    <span className="text-slate-700 font-medium">2024-11-23</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">SLA</span>
                    <span className="text-amber-600 font-medium">48 hours</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Elapsed</span>
                    <span className="text-red-600 font-medium">36 hours (75%)</span>
                  </div>
                  <Progress value={75} className="h-1.5 mt-1" indicatorClassName="bg-amber-500" />
                </div>
              </CardContent>
            </Card>

            {/* Summary stats */}
            <Card className="mt-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Tasks Created", value: 24, icon: Plus, color: "text-blue-600" },
                  { label: "Approved", value: 18, icon: CheckCircle, color: "text-emerald-600" },
                  { label: "Rejected", value: 2, icon: AlertTriangle, color: "text-red-600" },
                  { label: "Escalated", value: 4, icon: ArrowRight, color: "text-amber-600" },
                ].map((stat) => {
                  const IconComp = stat.icon;
                  return (
                    <div key={stat.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IconComp className={`h-3.5 w-3.5 ${stat.color}`} />
                        <span className="text-sm text-slate-600">{stat.label}</span>
                      </div>
                      <span className={`text-sm font-bold ${stat.color}`}>{stat.value}</span>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
