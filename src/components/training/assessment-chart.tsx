"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { scheme: "CM YUVA", passRate: 78, avgScore: 74 },
  { scheme: "ODOP", passRate: 72, avgScore: 69 },
  { scheme: "Mission Shakti", passRate: 81, avgScore: 76 },
  { scheme: "VSSY", passRate: 65, avgScore: 62 },
  { scheme: "PMKVY", passRate: 74, avgScore: 71 },
  { scheme: "DDU-GKY", passRate: 69, avgScore: 66 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-md">
        <p className="text-sm font-semibold text-slate-900 mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} className="text-xs text-slate-600">
            <span style={{ color: p.color }}>●</span> {p.name}: {p.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export function AssessmentChart() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Scheme-wise Pass Rate</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis
              dataKey="scheme"
              tick={{ fontSize: 10, fill: "#64748B" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#64748B" }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={74} stroke="#EF4444" strokeDasharray="4 4" />
            <Bar dataKey="passRate" name="Pass Rate %" fill="#6366F1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="avgScore" name="Avg Score %" fill="#A5B4FC" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-[10px] text-slate-400 mt-1 text-right">Red line = 74% avg pass rate</p>
      </CardContent>
    </Card>
  );
}
