import { Metadata } from "next";
import { TopBar } from "@/components/layout/topbar";
import { KPICard } from "@/components/shared/kpi-card";
import { SectionHeader } from "@/components/shared/section-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { businessCorrespondents } from "@/lib/mock-data";
import { CheckCircle2, XCircle, Clock, AlertCircle, Plus, FileText } from "lucide-react";

export const metadata: Metadata = { title: "BC Onboard" };

const docTypes = [
  { type: "PAN Card", required: true },
  { type: "Aadhaar Card", required: true },
  { type: "Police Clearance Certificate (PCC)", required: true },
  { type: "IIBF Certificate", required: true },
  { type: "Shop Photo", required: true },
  { type: "OD Account Proof", required: false },
];

const kioskChecks = [
  { label: "GPS Coordinate", key: "gps" },
  { label: "Biometric Device", key: "biometric" },
  { label: "Printer Ready", key: "printer" },
  { label: "Kiosk Active", key: "active" },
];

export default function BCOnboardPage() {
  const pendingBCs = businessCorrespondents.filter(
    (bc) => bc.status === "document" || bc.status === "screening" || bc.status === "interview"
  );

  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="BC Onboard"
        subtitle="Eligibility checks, document verification, kiosk readiness, and activation workflow"
        actions={
          <Button size="sm" className="h-8 gap-1.5">
            <Plus className="h-3.5 w-3.5" />
            Start New Onboarding
          </Button>
        }
      />

      <div className="flex-1 p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard title="Pending Docs" value={12} icon={FileText} iconBg="bg-amber-50" iconColor="text-amber-600" />
          <KPICard title="In Interview" value={5} icon={Clock} iconBg="bg-blue-50" iconColor="text-blue-600" />
          <KPICard title="Avg Onboarding Days" value="6.2" icon={Clock} iconBg="bg-indigo-50" iconColor="text-indigo-600" />
          <KPICard title="Rejection Rate" value="8.4%" icon={AlertCircle} iconBg="bg-red-50" iconColor="text-red-600" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Onboarding pipeline */}
          <div className="xl:col-span-2 space-y-4">
            <SectionHeader title="Active Onboarding Cases" />
            {pendingBCs.map((bc) => {
              const docsVerified = Object.values(bc.kiosk).filter(Boolean).length;
              const progress = Math.round((docsVerified / 4) * 100);

              return (
                <Card key={bc.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-slate-900">{bc.name}</h3>
                          <StatusBadge status={bc.status as any} />
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {bc.id} • {bc.district} • {bc.bank}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="xs">Documents</Button>
                        <Button size="xs">Advance</Button>
                      </div>
                    </div>

                    {/* Document checklist */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {docTypes.map((doc) => {
                        const hasDoc = Math.random() > 0.4;
                        return (
                          <div
                            key={doc.type}
                            className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs ${
                              hasDoc ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {hasDoc ? (
                              <CheckCircle2 className="h-3 w-3 shrink-0" />
                            ) : (
                              <Clock className="h-3 w-3 shrink-0" />
                            )}
                            <span className="truncate">{doc.type}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Kiosk readiness */}
                    <div className="border-t border-slate-100 pt-3">
                      <p className="text-xs font-medium text-slate-600 mb-2">Kiosk Readiness</p>
                      <div className="grid grid-cols-4 gap-2">
                        {kioskChecks.map((check) => {
                          const ready = bc.kiosk[check.key as keyof typeof bc.kiosk];
                          return (
                            <div
                              key={check.key}
                              className={`flex flex-col items-center gap-1 p-2 rounded-lg text-center ${
                                ready ? "bg-emerald-50" : "bg-red-50"
                              }`}
                            >
                              {ready ? (
                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-500" />
                              )}
                              <span className="text-[10px] text-slate-600 leading-tight">{check.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* KYC score progress */}
                    <div className="border-t border-slate-100 pt-3 mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-500">KYC Score</span>
                        <span className="text-xs font-semibold text-slate-900">{bc.kycScore}/100</span>
                      </div>
                      <Progress
                        value={bc.kycScore}
                        className="h-1.5"
                        indicatorClassName={bc.kycScore >= 80 ? "bg-emerald-500" : bc.kycScore >= 60 ? "bg-amber-500" : "bg-red-500"}
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Document requirements & SOP */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Onboarding Checklist</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Required Documents</p>
                {docTypes.filter((d) => d.required).map((doc) => (
                  <div key={doc.type} className="flex items-center gap-2 text-sm text-slate-700">
                    <FileText className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    {doc.type}
                  </div>
                ))}
                <div className="border-t border-slate-100 pt-2 mt-2">
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">Kiosk Checks</p>
                  {kioskChecks.map((check) => (
                    <div key={check.key} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      {check.label}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Common Rejection Reasons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { reason: "PCC not from competent authority", count: 18 },
                  { reason: "IIBF certificate expired", count: 12 },
                  { reason: "Shop photo unclear / mismatched", count: 9 },
                  { reason: "Aadhaar address mismatch", count: 7 },
                  { reason: "Biometric device incompatible", count: 5 },
                ].map((item) => (
                  <div key={item.reason} className="flex items-center justify-between">
                    <span className="text-xs text-slate-600 flex-1 pr-2">{item.reason}</span>
                    <Badge variant="warning" className="text-[10px] shrink-0">{item.count}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
