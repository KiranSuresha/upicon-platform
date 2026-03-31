"use client";

import { TopBar } from "@/components/layout/topbar";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  Download,
  Calendar,
  Clock,
  BarChart3,
  Users,
  GraduationCap,
  Plus,
  Mail,
} from "lucide-react";

interface ReportCard {
  name: string;
  description: string;
  lastGenerated: string;
  format: "PDF" | "Excel" | "Both";
  badge?: string;
}

const bankingReports: ReportCard[] = [
  {
    name: "BC Funnel Performance Report",
    description: "Lead-to-activation conversion rates, district-wise breakdown, and FE performance",
    lastGenerated: "2024-11-22",
    format: "Both",
    badge: "Weekly",
  },
  {
    name: "Active BC Transaction Summary",
    description: "Monthly transaction volumes, top performers, and inactive BC list",
    lastGenerated: "2024-11-22",
    format: "Excel",
    badge: "Monthly",
  },
  {
    name: "Kiosk Health & Downtime Report",
    description: "GPS verification, biometric status, printer downtime, and maintenance alerts",
    lastGenerated: "2024-11-20",
    format: "PDF",
  },
  {
    name: "SLA & Compliance Summary",
    description: "Onboarding SLA compliance, RBI-mandated KPI tracking, and audit trail",
    lastGenerated: "2024-11-15",
    format: "Both",
    badge: "Compliance",
  },
];

const consultancyReports: ReportCard[] = [
  {
    name: "DPR Pipeline Status Report",
    description: "Active DPRs by status, sector, district, assigned consultant, and review loop count",
    lastGenerated: "2024-11-21",
    format: "Both",
    badge: "Weekly",
  },
  {
    name: "TEV Appraisal Completion Report",
    description: "TEV projects by viability score, bank, sector, and submission status",
    lastGenerated: "2024-11-20",
    format: "PDF",
  },
  {
    name: "Survey Field Quality Report",
    description: "Agent-wise response quality, GPS validation, and district coverage analysis",
    lastGenerated: "2024-11-18",
    format: "Excel",
    badge: "Monthly",
  },
];

const trainingReports: ReportCard[] = [
  {
    name: "Batch Attendance & Progress Report",
    description: "Scheme-wise attendance rates, quiz scores, and trainer performance",
    lastGenerated: "2024-11-22",
    format: "Both",
    badge: "Daily",
  },
  {
    name: "Certification & Outcome Report",
    description: "Pass rates, certification status, business launch rate, and market linkage",
    lastGenerated: "2024-11-20",
    format: "Both",
    badge: "Monthly",
  },
  {
    name: "Beneficiary Risk Assessment",
    description: "At-risk beneficiaries, NPA alerts, low engagement, and intervention tracking",
    lastGenerated: "2024-11-18",
    format: "Excel",
    badge: "High Priority",
  },
  {
    name: "Employment & Revenue Impact Report",
    description: "Employees created, annual turnover, sector-wise revenue impact",
    lastGenerated: "2024-11-15",
    format: "PDF",
    badge: "Quarterly",
  },
];

const sectionConfig = [
  { title: "Banking Reports", icon: BarChart3, color: "text-blue-600", reports: bankingReports },
  { title: "Consultancy Reports", icon: FileText, color: "text-purple-600", reports: consultancyReports },
  { title: "Training Reports", icon: GraduationCap, color: "text-green-600", reports: trainingReports },
];

const badgeVariants: Record<string, "success" | "warning" | "info" | "danger" | "secondary"> = {
  Weekly: "info",
  Monthly: "secondary",
  Daily: "success",
  Quarterly: "secondary",
  Compliance: "warning",
  "High Priority": "danger",
};

function ReportRow({ report }: { report: ReportCard }) {
  return (
    <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-slate-200 bg-white hover:shadow-sm transition-shadow">
      <div className="flex items-start gap-3 min-w-0 flex-1">
        <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
          <FileText className="h-4.5 w-4.5 text-slate-500" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <h3 className="text-sm font-semibold text-slate-900">{report.name}</h3>
            {report.badge && (
              <Badge variant={badgeVariants[report.badge] ?? "secondary"} className="text-[10px]">
                {report.badge}
              </Badge>
            )}
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">{report.description}</p>
          <p className="text-[10px] text-slate-400 mt-1.5 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Last generated: {report.lastGenerated}
          </p>
        </div>
      </div>
      <div className="flex gap-2 shrink-0">
        {(report.format === "PDF" || report.format === "Both") && (
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
            <Download className="h-3.5 w-3.5" />
            PDF
          </Button>
        )}
        {(report.format === "Excel" || report.format === "Both") && (
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5 text-emerald-700 border-emerald-200 hover:bg-emerald-50">
            <Download className="h-3.5 w-3.5" />
            Excel
          </Button>
        )}
      </div>
    </div>
  );
}

export default function ReportsPage() {
  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="Reports & Analytics"
        subtitle="Download, schedule, and configure reports across all UPICON divisions"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Scheduled Reports
            </Button>
            <Button size="sm" className="h-8 gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              Custom Report
            </Button>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Report sections */}
        {sectionConfig.map((section) => {
          const IconComp = section.icon;
          return (
            <div key={section.title}>
              <SectionHeader
                title={section.title}
                description={`${section.reports.length} reports available for download`}
                className="mb-4"
                actions={
                  <Button variant="ghost" size="sm" className="h-7 text-xs gap-1.5">
                    <Download className="h-3.5 w-3.5" />
                    Download All
                  </Button>
                }
              />
              <div className="space-y-3">
                {section.reports.map((report) => (
                  <ReportRow key={report.name} report={report} />
                ))}
              </div>
            </div>
          );
        })}

        {/* Schedule Report section */}
        <div>
          <SectionHeader
            title="Schedule a Report"
            description="Automate report delivery to your team"
            className="mb-4"
          />
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1.5">Report Type</label>
                  <select className="w-full h-9 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-upicon-500">
                    <option>BC Funnel Performance</option>
                    <option>Active BC Transactions</option>
                    <option>DPR Pipeline Status</option>
                    <option>Batch Attendance Report</option>
                    <option>Certification & Outcome</option>
                    <option>Beneficiary Risk Assessment</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1.5">Frequency</label>
                  <select className="w-full h-9 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-upicon-500">
                    <option>Daily</option>
                    <option>Weekly (Monday)</option>
                    <option>Bi-weekly</option>
                    <option>Monthly</option>
                    <option>Quarterly</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1.5">Format</label>
                  <select className="w-full h-9 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-upicon-500">
                    <option>PDF</option>
                    <option>Excel</option>
                    <option>Both PDF + Excel</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1.5">Start Date</label>
                  <input
                    type="date"
                    className="w-full h-9 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-upicon-500"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="text-xs font-medium text-slate-700 block mb-1.5">
                  Recipients (comma-separated emails)
                </label>
                <div className="flex gap-3">
                  <input
                    className="flex-1 h-9 px-3 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-upicon-500"
                    placeholder="md@upicon.in, division-head@upicon.in, ..."
                  />
                  <Button className="h-9 gap-1.5 px-6">
                    <Calendar className="h-4 w-4" />
                    Schedule
                  </Button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-700 mb-3">Existing Schedules</p>
                <div className="space-y-2">
                  {[
                    { name: "BC Funnel Report", freq: "Weekly", recipients: "md@upicon.in, banking-head@upicon.in", next: "Mon, 25 Nov" },
                    { name: "Batch Attendance", freq: "Daily", recipients: "training-head@upicon.in", next: "Tomorrow, 8:00 AM" },
                    { name: "Certification Outcomes", freq: "Monthly", recipients: "md@upicon.in", next: "1 Dec 2024" },
                  ].map((schedule) => (
                    <div key={schedule.name} className="flex items-center justify-between px-4 py-3 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <div>
                          <p className="text-sm font-medium text-slate-800">{schedule.name}</p>
                          <p className="text-[10px] text-slate-500 flex items-center gap-2">
                            <span>{schedule.freq}</span>
                            <span>•</span>
                            <Mail className="h-3 w-3" />
                            <span>{schedule.recipients}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-500">Next: {schedule.next}</span>
                        <Button variant="ghost" size="sm" className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50">
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
