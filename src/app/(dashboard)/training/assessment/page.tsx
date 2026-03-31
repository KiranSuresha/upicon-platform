"use client";

import { TopBar } from "@/components/layout/topbar";
import { KPICard } from "@/components/shared/kpi-card";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AssessmentChart } from "@/components/training/assessment-chart";
import {
  ClipboardList,
  TrendingUp,
  CheckCircle,
  Clock,
  Plus,
  Download,
  Award,
} from "lucide-react";

const assessmentResults = [
  { name: "Priya Verma", batch: "YUVA-LKO-2411-01", scheme: "CM YUVA", score: 84, status: "pass" as const, date: "2024-11-20" },
  { name: "Amit Tiwari", batch: "ODOP-VNS-2411-03", scheme: "ODOP", score: 72, status: "pass" as const, date: "2024-11-19" },
  { name: "Meena Patel", batch: "SHAKTI-AGR-2410-02", scheme: "Mission Shakti", score: 91, status: "pass" as const, date: "2024-11-01" },
  { name: "Suresh Kumar", batch: "YUVA-LKO-2411-01", scheme: "CM YUVA", score: 54, status: "fail" as const, date: "2024-11-20" },
  { name: "Ravi Shankar", batch: "YUVA-LKO-2411-01", scheme: "CM YUVA", score: 78, status: "pass" as const, date: "2024-11-20" },
  { name: "Kavita Singh", batch: "ODOP-VNS-2411-03", scheme: "ODOP", score: 65, status: "pass" as const, date: "2024-11-19" },
];

const questionTypes = ["MCQ", "True/False", "Short Answer", "Practical", "Case Study"];

export default function AssessmentPage() {
  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="Assessment Engine"
        subtitle="Quiz creation, scoring, certification, and scheme-wise analytics"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1.5">
              <Download className="h-3.5 w-3.5" />
              Export Results
            </Button>
            <Button size="sm" className="h-8 gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              New Assessment
            </Button>
          </div>
        }
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left — Main content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="Total Assessments"
              value={8420}
              change={6.4}
              changeLabel="vs last month"
              icon={ClipboardList}
              iconBg="bg-blue-50"
              iconColor="text-blue-600"
            />
            <KPICard
              title="Average Score"
              value="71%"
              change={1.8}
              changeLabel="vs last month"
              icon={TrendingUp}
              iconBg="bg-indigo-50"
              iconColor="text-indigo-600"
            />
            <KPICard
              title="Pass Rate"
              value="74%"
              change={2.3}
              changeLabel="vs last month"
              icon={CheckCircle}
              iconBg="bg-emerald-50"
              iconColor="text-emerald-600"
            />
            <KPICard
              title="Pending Certification"
              value={1240}
              change={-8.4}
              changeLabel="vs last month"
              trendPositive={false}
              icon={Clock}
              iconBg="bg-amber-50"
              iconColor="text-amber-600"
            />
          </div>

          {/* Assessment list */}
          <div>
            <SectionHeader title="Assessment Results" description="Recent assessment scores and certification status" className="mb-4" />
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50">
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Beneficiary</th>
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Batch</th>
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Scheme</th>
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Score</th>
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Result</th>
                        <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Date</th>
                        <th className="text-right px-4 py-2.5 text-xs font-semibold text-slate-500">Certificate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {assessmentResults.map((result, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                                <span className="text-[10px] font-bold text-blue-700">
                                  {result.name.split(" ").map((n) => n[0]).join("")}
                                </span>
                              </div>
                              <span className="text-sm font-medium text-slate-800">{result.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs font-mono text-slate-500">{result.batch}</span>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant="secondary" className="text-xs">{result.scheme}</Badge>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-sm font-bold ${result.score >= 75 ? "text-emerald-600" : result.score >= 60 ? "text-amber-600" : "text-red-600"}`}>
                              {result.score}%
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant={result.status === "pass" ? "success" : "danger"} className="text-xs capitalize">
                              {result.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs text-slate-500">{result.date}</span>
                          </td>
                          <td className="px-4 py-3">
                            {result.status === "pass" ? (
                              <div className="flex gap-1 justify-end">
                                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
                                  <Award className="h-3 w-3" />
                                  Issue
                                </Button>
                              </div>
                            ) : (
                              <span className="text-xs text-slate-400 text-right block">Not eligible</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chart */}
          <AssessmentChart />
        </div>

        {/* Right — Create Assessment panel */}
        <div className="w-80 shrink-0 bg-white border-l border-slate-200 overflow-y-auto">
          <div className="px-5 py-4 border-b border-slate-200">
            <h2 className="text-sm font-semibold text-slate-900">Create Assessment</h2>
            <p className="text-xs text-slate-500">Configure a new quiz or assessment</p>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Assessment Name</label>
              <input
                className="w-full h-8 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="e.g. CM YUVA Final Assessment"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Scheme</label>
              <select className="w-full h-8 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400">
                <option>CM YUVA</option>
                <option>ODOP</option>
                <option>Mission Shakti</option>
                <option>VSSY</option>
                <option>PMKVY</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Question Type</label>
              <div className="flex flex-wrap gap-2">
                {questionTypes.map((qt) => (
                  <button
                    key={qt}
                    className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 text-slate-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
                  >
                    {qt}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Number of Questions</label>
              <input
                type="number"
                className="w-full h-8 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="25"
                defaultValue={25}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Passing Score (%)</label>
              <input
                type="number"
                className="w-full h-8 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="60"
                defaultValue={60}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Duration (minutes)</label>
              <input
                type="number"
                className="w-full h-8 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="45"
                defaultValue={45}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">Assign to Batch</label>
              <select className="w-full h-8 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-400">
                <option>YUVA-LKO-2411-01</option>
                <option>ODOP-VNS-2411-03</option>
              </select>
            </div>
            <Button className="w-full h-9 gap-1.5 text-sm">
              <Plus className="h-4 w-4" />
              Create Assessment
            </Button>
          </div>

          <div className="px-5 pb-5">
            <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
              <p className="text-xs font-semibold text-blue-800 mb-1">AI Question Generation</p>
              <p className="text-xs text-blue-700 leading-relaxed">
                Let AI generate questions from scheme curriculum documents automatically.
              </p>
              <Button variant="outline" size="sm" className="mt-3 h-7 text-xs w-full border-blue-300 text-blue-700 hover:bg-blue-100">
                Generate with AI
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
