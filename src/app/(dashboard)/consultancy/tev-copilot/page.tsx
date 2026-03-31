"use client";

import { TopBar } from "@/components/layout/topbar";
import { StatusBadge } from "@/components/shared/status-badge";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Download, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";
import { tevProjects } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const riskFlags = [
  { label: "DSCR below 1.25 threshold", severity: "medium" as const },
  { label: "Demand projections based on optimistic scenario", severity: "low" as const },
  { label: "Collateral coverage adequate at 1.4x", severity: "info" as const },
];

const metricsResult = [
  { metric: "Project Cost", value: "₹1.80 Cr" },
  { metric: "Loan Amount", value: "₹1.20 Cr" },
  { metric: "Equity", value: "₹36 Lakh" },
  { metric: "Subsidy (MFC)", value: "₹24 Lakh" },
  { metric: "DSCR", value: "1.32x" },
  { metric: "IRR", value: "21.4%" },
  { metric: "Payback Period", value: "3.8 years" },
];

export default function TEVCopilotPage() {
  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="TEV Copilot"
        subtitle="Guided techno-economic viability appraisal workspace"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1.5">
              <Download className="h-3.5 w-3.5" />
              Export
            </Button>
            <Button size="sm" className="h-8 gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              New TEV
            </Button>
          </div>
        }
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left — TEV List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 border-r border-slate-200">
          <SectionHeader title="TEV Projects" description="All active and finalized TEV appraisals" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">ID</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Project</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Applicant</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Bank</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Loan</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Score</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Status</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-slate-500">Due</th>
                  <th className="text-right px-4 py-2.5 text-xs font-semibold text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tevProjects.map((tev) => (
                  <tr key={tev.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="text-xs font-mono text-slate-400">{tev.id}</span>
                    </td>
                    <td className="px-4 py-3 max-w-[160px]">
                      <p className="text-sm font-medium text-slate-900 line-clamp-1">{tev.title}</p>
                      <p className="text-xs text-slate-400">{tev.district} • {tev.sector}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-slate-600">{tev.applicant}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-slate-600">{tev.bank}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-slate-900">{formatCurrency(tev.loanAmount)}</span>
                    </td>
                    <td className="px-4 py-3">
                      {tev.viabilityScore !== undefined ? (
                        <div className="flex items-center gap-1.5">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              tev.viabilityScore >= 75 ? "bg-emerald-500" :
                              tev.viabilityScore >= 60 ? "bg-amber-500" : "bg-red-500"
                            }`}
                          />
                          <span className="text-sm font-semibold text-slate-900">{tev.viabilityScore}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">Pending</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={tev.status} />
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-slate-500">{tev.dueDate}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 justify-end">
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">Open</Button>
                        <Button variant="outline" size="sm" className="h-7 px-2 text-xs">Report</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right — TEV Workspace */}
        <div className="w-96 shrink-0 flex flex-col bg-white border-l border-slate-200 overflow-y-auto">
          <div className="px-5 py-4 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">TEV Workspace</h2>
                <p className="text-xs text-slate-500">Cold Storage Facility — Agra (TEV003)</p>
              </div>
              <Badge variant="success">Finalized</Badge>
            </div>
          </div>

          {/* Input form */}
          <div className="p-5 space-y-3 border-b border-slate-100">
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Project Parameters</p>
            {[
              { label: "Project Name", placeholder: "Cold Storage Facility — Agra" },
              { label: "Applicant", placeholder: "AgroFreeze Solutions" },
              { label: "Sector", placeholder: "Agriculture / Cold Chain" },
              { label: "Total Project Cost (₹)", placeholder: "1,80,00,000" },
              { label: "Loan Amount (₹)", placeholder: "1,20,00,000" },
              { label: "Equity (₹)", placeholder: "36,00,000" },
              { label: "Subsidy (₹)", placeholder: "24,00,000" },
              { label: "DSCR", placeholder: "1.32" },
              { label: "IRR (%)", placeholder: "21.4" },
              { label: "Payback Period (years)", placeholder: "3.8" },
            ].map((field) => (
              <div key={field.label}>
                <label className="text-xs text-slate-600 font-medium block mb-0.5">{field.label}</label>
                <input
                  className="w-full h-8 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder={field.placeholder}
                  defaultValue={field.placeholder}
                />
              </div>
            ))}
            <Button className="w-full h-9 gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-sm mt-2">
              <TrendingUp className="h-4 w-4" />
              Run Viability Analysis
            </Button>
          </div>

          {/* Result card */}
          <div className="p-5 space-y-4">
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Viability Analysis Result</p>

            {/* Score circle */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full border-4 border-emerald-500 flex flex-col items-center justify-center bg-emerald-50 shrink-0">
                <span className="text-2xl font-bold text-emerald-700">82</span>
                <span className="text-[10px] text-emerald-600 font-medium">/100</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-700">VIABLE</p>
                <p className="text-xs text-slate-500 leading-relaxed">Project meets key viability thresholds. Recommend fast-track approval.</p>
              </div>
            </div>

            {/* Metrics table */}
            <div className="rounded-lg border border-slate-200 overflow-hidden">
              {metricsResult.map((row, i) => (
                <div key={row.metric} className={`flex items-center justify-between px-3 py-2 text-xs ${i % 2 === 0 ? "bg-slate-50" : "bg-white"}`}>
                  <span className="text-slate-600">{row.metric}</span>
                  <span className="font-semibold text-slate-900">{row.value}</span>
                </div>
              ))}
            </div>

            {/* Risk flags */}
            <div>
              <p className="text-xs font-semibold text-slate-700 mb-2">Risk Flags</p>
              <div className="space-y-2">
                {riskFlags.map((flag) => (
                  <div
                    key={flag.label}
                    className={`flex items-start gap-2 px-3 py-2 rounded-lg text-xs ${
                      flag.severity === "medium" ? "bg-amber-50 text-amber-700" :
                      flag.severity === "low" ? "bg-yellow-50 text-yellow-700" :
                      "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {flag.severity === "info" ? (
                      <CheckCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    )}
                    {flag.label}
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full h-9 gap-1.5 text-sm" variant="outline">
              <Download className="h-4 w-4" />
              Generate TEV Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
