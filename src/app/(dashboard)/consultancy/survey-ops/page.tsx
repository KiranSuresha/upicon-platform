"use client";

import { TopBar } from "@/components/layout/topbar";
import { KPICard } from "@/components/shared/kpi-card";
import { SectionHeader } from "@/components/shared/section-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ClipboardList,
  Users,
  BarChart3,
  TrendingUp,
  MapPin,
  CheckCircle,
  XCircle,
  Plus,
  Download,
} from "lucide-react";
import { surveyProjects } from "@/lib/mock-data";

const fieldAgents = [
  { name: "Suresh Pandey", district: "Varanasi", responses: 18, quality: 94, gps: true, lastSync: "5 min ago" },
  { name: "Kavita Sharma", district: "Varanasi", responses: 14, quality: 88, gps: true, lastSync: "12 min ago" },
  { name: "Rahul Mishra", district: "Jaunpur", responses: 21, quality: 91, gps: true, lastSync: "3 min ago" },
  { name: "Priti Yadav", district: "Mirzapur", responses: 9, quality: 72, gps: false, lastSync: "1 hr ago" },
  { name: "Anil Kumar", district: "Varanasi", responses: 16, quality: 85, gps: true, lastSync: "8 min ago" },
  { name: "Deepa Singh", district: "Chandauli", responses: 11, quality: 79, gps: true, lastSync: "22 min ago" },
];

export default function SurveyOpsPage() {
  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="SurveyOps"
        subtitle="Field survey management, agent tracking, and data quality monitoring"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1.5">
              <Download className="h-3.5 w-3.5" />
              Export Data
            </Button>
            <Button size="sm" className="h-8 gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              New Survey
            </Button>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Active Surveys"
            value={2}
            icon={ClipboardList}
            iconBg="bg-cyan-50"
            iconColor="text-cyan-600"
          />
          <KPICard
            title="Field Agents Deployed"
            value={42}
            change={5.0}
            changeLabel="vs last week"
            icon={Users}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
          />
          <KPICard
            title="Responses Collected"
            value={6340}
            change={12.4}
            changeLabel="vs last week"
            icon={BarChart3}
            iconBg="bg-indigo-50"
            iconColor="text-indigo-600"
          />
          <KPICard
            title="Completion Rate"
            value="76%"
            change={3.2}
            changeLabel="vs last week"
            icon={TrendingUp}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />
        </div>

        {/* Survey project cards */}
        <div>
          <SectionHeader title="Survey Projects" description="Progress tracking for all active and completed surveys" className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {surveyProjects.map((survey) => {
              const pct = Math.round((survey.completedResponses / survey.targetResponses) * 100);
              return (
                <Card key={survey.id}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-slate-400">{survey.id}</span>
                          <StatusBadge status={survey.status} />
                        </div>
                        <h3 className="text-sm font-semibold text-slate-900">{survey.title}</h3>
                        <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {survey.district} • {survey.scheme}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-xs text-slate-600">
                        <span>Progress</span>
                        <span className="font-semibold">
                          {survey.completedResponses.toLocaleString("en-IN")} / {survey.targetResponses.toLocaleString("en-IN")} responses
                        </span>
                      </div>
                      <Progress
                        value={pct}
                        className="h-2"
                        indicatorClassName={pct >= 100 ? "bg-emerald-500" : pct >= 60 ? "bg-blue-500" : "bg-amber-500"}
                      />
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Started {survey.startDate}</span>
                        <span className="font-medium text-slate-600">{pct}% complete</span>
                        <span>Ends {survey.endDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Users className="h-3.5 w-3.5" />
                        <span>{survey.fieldAgents} agents</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-7 text-xs">View Data</Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs">Field Map</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Field quality monitoring */}
        <div>
          <SectionHeader
            title="Field Quality Monitoring"
            description="Agent-wise data quality, GPS validation, and sync status"
            className="mb-4"
            actions={
              <Button variant="outline" size="sm" className="h-7 text-xs">
                <Download className="h-3.5 w-3.5 mr-1" />
                Export
              </Button>
            }
          />
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Agent Name</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">District</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Today&apos;s Responses</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Quality Score</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">GPS Check</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Last Sync</th>
                      <th className="text-right px-4 py-2.5 text-xs font-semibold text-slate-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {fieldAgents.map((agent) => (
                      <tr key={agent.name} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 bg-cyan-100 rounded-full flex items-center justify-center shrink-0">
                              <span className="text-[10px] font-bold text-cyan-700">
                                {agent.name.split(" ").map((n) => n[0]).join("")}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-slate-800">{agent.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="secondary" className="text-xs">{agent.district}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-sm font-semibold ${agent.responses >= 15 ? "text-emerald-600" : agent.responses >= 10 ? "text-amber-600" : "text-red-600"}`}>
                            {agent.responses}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Progress
                              value={agent.quality}
                              className="h-1.5 w-16"
                              indicatorClassName={agent.quality >= 90 ? "bg-emerald-500" : agent.quality >= 75 ? "bg-amber-500" : "bg-red-500"}
                            />
                            <span className={`text-xs font-semibold ${agent.quality >= 90 ? "text-emerald-600" : agent.quality >= 75 ? "text-amber-600" : "text-red-600"}`}>
                              {agent.quality}%
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {agent.gps ? (
                            <div className="flex items-center gap-1 text-emerald-600">
                              <CheckCircle className="h-3.5 w-3.5" />
                              <span className="text-xs font-medium">Pass</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-red-600">
                              <XCircle className="h-3.5 w-3.5" />
                              <span className="text-xs font-medium">Fail</span>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs text-slate-500">{agent.lastSync}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1 justify-end">
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">View</Button>
                            <Button variant="outline" size="sm" className="h-7 px-2 text-xs">Alert</Button>
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
      </div>
    </div>
  );
}
