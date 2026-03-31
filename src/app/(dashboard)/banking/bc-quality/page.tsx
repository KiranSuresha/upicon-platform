"use client";

import { TopBar } from "@/components/layout/topbar";
import { KPICard } from "@/components/shared/kpi-card";
import { SectionHeader } from "@/components/shared/section-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { businessCorrespondents } from "@/lib/mock-data";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { Activity, Monitor, TrendingDown, AlertTriangle, Download } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import type { BusinessCorrespondent } from "@/lib/types";

const columns: ColumnDef<BusinessCorrespondent>[] = [
  {
    accessorKey: "name",
    header: "BC Name",
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-medium text-slate-900">{row.original.name}</p>
        <p className="text-xs text-slate-400">{row.original.id} · {row.original.district}</p>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status as any} />,
  },
  {
    accessorKey: "monthlyTransactions",
    header: "Monthly Txns",
    cell: ({ row }) => (
      <span className={`text-sm font-medium ${row.original.monthlyTransactions < 50 ? "text-red-600" : "text-slate-900"}`}>
        {formatNumber(row.original.monthlyTransactions)}
      </span>
    ),
  },
  {
    accessorKey: "monthlyVolume",
    header: "Monthly Volume",
    cell: ({ row }) => (
      <span className="text-sm text-slate-700">{formatCurrency(row.original.monthlyVolume)}</span>
    ),
  },
  {
    id: "kiosk",
    header: "Kiosk Health",
    cell: ({ row }) => {
      const k = row.original.kiosk;
      const score = [k.gps, k.biometric, k.printer, k.active].filter(Boolean).length;
      return (
        <div className="flex items-center gap-1.5">
          <Progress
            value={(score / 4) * 100}
            className="w-16 h-1.5"
            indicatorClassName={score === 4 ? "bg-emerald-500" : score >= 2 ? "bg-amber-500" : "bg-red-500"}
          />
          <span className="text-xs text-slate-600">{score}/4</span>
        </div>
      );
    },
  },
  {
    accessorKey: "lastTransactionAt",
    header: "Last Transaction",
    cell: ({ row }) => (
      <span className="text-xs text-slate-500">{row.original.lastTransactionAt ?? "Never"}</span>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: () => (
      <Button variant="outline" size="xs">Details</Button>
    ),
  },
];

export default function BCQualityPage() {
  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="BC Quality Monitor"
        subtitle="Active vs inactive BCs, kiosk health, transaction productivity, and complaint flags"
        actions={
          <Button variant="outline" size="sm" className="h-8 gap-1.5">
            <Download className="h-3.5 w-3.5" />
            Export Report
          </Button>
        }
      />

      <div className="flex-1 p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard title="Active BCs" value={4287} change={5.2} icon={Activity} iconBg="bg-emerald-50" iconColor="text-emerald-600" />
          <KPICard title="Inactive BCs" value={319} change={-8.1} trendPositive={false} icon={TrendingDown} iconBg="bg-red-50" iconColor="text-red-600" />
          <KPICard title="Kiosk Uptime" value="89%" change={2.3} icon={Monitor} iconBg="bg-blue-50" iconColor="text-blue-600" />
          <KPICard title="Complaint Flags" value={47} change={-12} icon={AlertTriangle} iconBg="bg-amber-50" iconColor="text-amber-600" />
        </div>

        {/* Alert BCs */}
        <div>
          <SectionHeader title="At-Risk BCs — Action Required" description="No transactions in 30+ days or kiosk downtime" className="mb-3" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {businessCorrespondents.filter((bc) => bc.status === "inactive").map((bc) => (
              <Card key={bc.id} className="border-l-4 border-l-red-400">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{bc.name}</p>
                      <p className="text-xs text-slate-500">{bc.district} · {bc.bank}</p>
                      <p className="text-xs text-red-600 mt-1">
                        Last active: {bc.lastTransactionAt ?? "Never"}
                      </p>
                    </div>
                    <Badge variant="danger" className="text-[10px]">Inactive</Badge>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="xs" className="flex-1">Call</Button>
                    <Button size="xs" className="flex-1">Reactivate</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Full table */}
        <Card>
          <CardHeader className="pb-3">
            <SectionHeader title="All BCs — Quality Dashboard" />
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={businessCorrespondents}
              searchPlaceholder="Search BC name, district..."
              pageSize={8}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
