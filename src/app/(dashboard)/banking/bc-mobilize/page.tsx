"use client";

import { TopBar } from "@/components/layout/topbar";
import { KPICard } from "@/components/shared/kpi-card";
import { DataTable } from "@/components/shared/data-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { businessCorrespondents } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";
import { DISTRICTS } from "@/lib/utils";
import { Users, MapPin, UserPlus, TrendingUp, Filter, Plus, Download } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import type { BusinessCorrespondent } from "@/lib/types";

const columns: ColumnDef<BusinessCorrespondent>[] = [
  {
    accessorKey: "id",
    header: "BC ID",
    cell: ({ row }) => (
      <span className="text-xs font-mono text-slate-600">{row.original.id}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-medium text-slate-900">{row.original.name}</p>
        <p className="text-xs text-slate-400">{row.original.mobile}</p>
      </div>
    ),
  },
  {
    accessorKey: "district",
    header: "District / Block",
    cell: ({ row }) => (
      <div>
        <p className="text-sm text-slate-700">{row.original.district}</p>
        <p className="text-xs text-slate-400">{row.original.block}</p>
      </div>
    ),
  },
  {
    accessorKey: "bank",
    header: "Bank",
    cell: ({ row }) => (
      <span className="text-sm text-slate-700">{row.original.bank}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status as any} />,
  },
  {
    accessorKey: "kycScore",
    header: "KYC Score",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${row.original.kycScore >= 80 ? "bg-emerald-500" : row.original.kycScore >= 60 ? "bg-amber-500" : "bg-red-500"}`}
            style={{ width: `${row.original.kycScore}%` }}
          />
        </div>
        <span className="text-xs font-medium text-slate-700">{row.original.kycScore}</span>
      </div>
    ),
  },
  {
    accessorKey: "fieldExecutive",
    header: "Field Exec",
    cell: ({ row }) => (
      <span className="text-sm text-slate-600">{row.original.fieldExecutive}</span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <Button variant="outline" size="xs">View</Button>
        {(row.original.status === "lead" || row.original.status === "screening") && (
          <Button size="xs">Advance</Button>
        )}
      </div>
    ),
  },
];

export default function BCMobilizePage() {
  const leads = businessCorrespondents.filter((bc) => bc.status === "lead" || bc.status === "screening").length;
  const total = businessCorrespondents.length;

  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="BC Mobilize"
        subtitle="Digitized lead capture, district routing, and field executive tracker"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1.5">
              <Filter className="h-3.5 w-3.5" />
              Filters
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1.5">
              <Download className="h-3.5 w-3.5" />
              Export
            </Button>
            <Button size="sm" className="h-8 gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              New Lead
            </Button>
          </div>
        }
      />

      <div className="flex-1 p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard title="Total Leads" value={847} change={12.4} changeLabel="this week" icon={Users} iconBg="bg-blue-50" iconColor="text-blue-600" />
          <KPICard title="In Screening" value={612} change={8.1} changeLabel="this week" icon={UserPlus} iconBg="bg-indigo-50" iconColor="text-indigo-600" />
          <KPICard title="Districts Covered" value={15} icon={MapPin} iconBg="bg-emerald-50" iconColor="text-emerald-600" />
          <KPICard title="Conversion Rate" value="22%" change={3.2} changeLabel="vs last month" icon={TrendingUp} iconBg="bg-amber-50" iconColor="text-amber-600" />
        </div>

        {/* District funnel cards */}
        <div>
          <SectionHeader title="District-wise Lead Pipeline" className="mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
            {DISTRICTS.slice(0, 10).map((district, i) => {
              const count = Math.floor(Math.random() * 80 + 20);
              return (
                <Card key={district} className="p-3 hover:shadow-sm transition-shadow cursor-pointer">
                  <p className="text-xs font-medium text-slate-700 truncate">{district}</p>
                  <p className="text-xl font-bold text-slate-900 mt-1">{count}</p>
                  <Badge variant={count > 60 ? "success" : count > 40 ? "info" : "warning"} className="text-[10px] mt-1">
                    {count > 60 ? "High" : count > 40 ? "Medium" : "Low"} density
                  </Badge>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Lead table */}
        <Card>
          <CardHeader className="pb-3">
            <SectionHeader
              title="All BC Leads & Pipeline"
              description="Track every prospect from first contact to active status"
            />
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={businessCorrespondents}
              searchPlaceholder="Search by name, district, bank..."
              pageSize={8}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
