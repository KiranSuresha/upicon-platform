"use client";

import { TopBar } from "@/components/layout/topbar";
import { SectionHeader } from "@/components/shared/section-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  Users,
  CheckSquare,
  PenSquare,
  CheckCircle,
  XCircle,
  Download,
  ClipboardCheck,
} from "lucide-react";
import { trainingBatches } from "@/lib/mock-data";

const schemeColors: Record<string, string> = {
  "CM YUVA": "bg-indigo-100 text-indigo-700",
  "ODOP": "bg-purple-100 text-purple-700",
  "Mission Shakti": "bg-pink-100 text-pink-700",
  "VSSY": "bg-amber-100 text-amber-700",
  "PMKVY": "bg-cyan-100 text-cyan-700",
  "DDU-GKY": "bg-emerald-100 text-emerald-700",
  "RGSA": "bg-orange-100 text-orange-700",
};

const mockTrainees = [
  { name: "Priya Verma", present: true },
  { name: "Suresh Kumar", present: true },
  { name: "Anjali Singh", present: false },
  { name: "Rakesh Yadav", present: true },
  { name: "Neha Gupta", present: true },
  { name: "Vikram Tiwari", present: true },
  { name: "Sunita Patel", present: false },
  { name: "Arun Mishra", present: true },
];

const districtEvidence = [
  { district: "Lucknow", submitted: true, batches: 3, submittedDate: "2024-11-20" },
  { district: "Varanasi", submitted: true, batches: 2, submittedDate: "2024-11-18" },
  { district: "Agra", submitted: true, batches: 2, submittedDate: "2024-11-01" },
  { district: "Kanpur", submitted: false, batches: 1, submittedDate: null },
  { district: "Gorakhpur", submitted: false, batches: 2, submittedDate: null },
];

const ongoingBatches = trainingBatches.filter((b) => b.status === "ongoing");

export default function TrainerOSPage() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const totalPresent = ongoingBatches.reduce((a, b) => a + b.present, 0);
  const totalEnrolled = ongoingBatches.reduce((a, b) => a + b.totalEnrolled, 0);

  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="Trainer OS"
        subtitle="Real-time batch management, attendance, quiz, and evidence tracking"
        actions={
          <Button variant="outline" size="sm" className="h-8 gap-1.5">
            <Download className="h-3.5 w-3.5" />
            Export Report
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Today's snapshot */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-5 text-white">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-4 w-4 text-white/80" />
                <span className="text-sm text-white/80">{today}</span>
              </div>
              <h2 className="text-xl font-bold">Today&apos;s Training Snapshot</h2>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-4">
            <div>
              <p className="text-white/70 text-xs">Active Batches Today</p>
              <p className="text-3xl font-bold">{ongoingBatches.length}</p>
            </div>
            <div>
              <p className="text-white/70 text-xs">Total Attendance</p>
              <p className="text-3xl font-bold">{totalPresent}/{totalEnrolled}</p>
            </div>
            <div>
              <p className="text-white/70 text-xs">Overall Attendance Rate</p>
              <p className="text-3xl font-bold">
                {totalEnrolled > 0 ? Math.round((totalPresent / totalEnrolled) * 100) : 0}%
              </p>
            </div>
          </div>
        </div>

        {/* Ongoing batch cards */}
        <div>
          <SectionHeader title="Active Batches" description="Ongoing training batches requiring today's actions" className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ongoingBatches.map((batch) => {
              const attendPct = Math.round((batch.present / batch.totalEnrolled) * 100);
              return (
                <Card key={batch.id}>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-slate-500">{batch.batchCode}</span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${schemeColors[batch.scheme] ?? "bg-slate-100 text-slate-600"}`}>
                            {batch.scheme}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-slate-900">{batch.center}</p>
                        <p className="text-xs text-slate-500">Trainer: {batch.trainer} • {batch.district}</p>
                      </div>
                      <StatusBadge status={batch.status} />
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-600">Attendance</span>
                        <span className={`font-semibold ${attendPct >= 90 ? "text-emerald-600" : attendPct >= 70 ? "text-amber-600" : "text-red-600"}`}>
                          {batch.present}/{batch.totalEnrolled} ({attendPct}%)
                        </span>
                      </div>
                      <Progress
                        value={attendPct}
                        className="h-2"
                        indicatorClassName={attendPct >= 90 ? "bg-emerald-500" : attendPct >= 70 ? "bg-amber-500" : "bg-red-500"}
                      />
                    </div>

                    {batch.assessmentScore !== undefined && (
                      <div className="mb-3 flex items-center gap-2">
                        <span className="text-xs text-slate-500">Quiz Score:</span>
                        <span className={`text-sm font-bold ${batch.assessmentScore >= 75 ? "text-emerald-600" : "text-amber-600"}`}>
                          {batch.assessmentScore}%
                        </span>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button size="sm" className="h-8 text-xs flex-1 gap-1 bg-green-600 hover:bg-green-700">
                        <CheckSquare className="h-3.5 w-3.5" />
                        Mark Attendance
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs flex-1 gap-1">
                        <PenSquare className="h-3.5 w-3.5" />
                        Quiz
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Attendance marking form */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4 text-green-600" />
                Mark Attendance — YUVA-LKO-2411-01
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-3">
                <select className="w-full h-8 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-green-400">
                  <option>YUVA-LKO-2411-01 — CM YUVA Lucknow</option>
                  <option>ODOP-VNS-2411-03 — ODOP Varanasi</option>
                </select>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {mockTrainees.map((trainee, i) => (
                  <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-600">
                        {trainee.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="text-sm text-slate-800">{trainee.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${trainee.present ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-400"}`}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${!trainee.present ? "bg-red-100 text-red-600" : "bg-slate-200 text-slate-400"}`}
                      >
                        <XCircle className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                <span className="text-xs text-slate-500">
                  {mockTrainees.filter((t) => t.present).length}/{mockTrainees.length} marked present
                </span>
                <Button size="sm" className="h-8 text-xs bg-green-600 hover:bg-green-700 gap-1">
                  <CheckSquare className="h-3.5 w-3.5" />
                  Submit Attendance
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* District evidence tracker */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">District Evidence Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {districtEvidence.map((dist) => (
                  <div key={dist.district} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${dist.submitted ? "bg-emerald-100" : "bg-amber-100"}`}>
                        {dist.submitted ? (
                          <CheckCircle className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-amber-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{dist.district}</p>
                        <p className="text-[10px] text-slate-500">
                          {dist.batches} batch{dist.batches > 1 ? "es" : ""} •{" "}
                          {dist.submitted ? `Submitted ${dist.submittedDate}` : "Evidence pending"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {dist.submitted ? (
                        <Badge variant="success" className="text-[10px]">Submitted</Badge>
                      ) : (
                        <Badge variant="warning" className="text-[10px]">Pending</Badge>
                      )}
                      {!dist.submitted && (
                        <Button variant="outline" size="sm" className="h-7 text-xs">Upload</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  {districtEvidence.filter((d) => d.submitted).length}/{districtEvidence.length} districts submitted
                </span>
                <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                  <Download className="h-3 w-3" />
                  Download Bundle
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
