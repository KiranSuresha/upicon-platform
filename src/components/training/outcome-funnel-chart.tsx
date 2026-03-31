"use client";

import {
  FunnelChart,
  Funnel,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const funnelData = [
  { name: "Enrolled", value: 12480, fill: "#6366F1" },
  { name: "Certified", value: 9240, fill: "#8B5CF6" },
  { name: "Business Launched", value: 5140, fill: "#10B981" },
  { name: "Market Linked", value: 3480, fill: "#F59E0B" },
  { name: "Sustainable", value: 2180, fill: "#059669" },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: { name: string; value: number } }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-md">
        <p className="text-sm font-medium text-slate-900">{item.name}</p>
        <p className="text-sm text-slate-600">{item.value.toLocaleString("en-IN")} beneficiaries</p>
      </div>
    );
  }
  return null;
}

export function OutcomeFunnelChart() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Outcome Funnel</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <FunnelChart>
            <Tooltip content={<CustomTooltip />} />
            <Funnel dataKey="value" data={funnelData} isAnimationActive>
              <LabelList
                position="right"
                fill="#475569"
                stroke="none"
                dataKey="name"
                style={{ fontSize: 12 }}
              />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
