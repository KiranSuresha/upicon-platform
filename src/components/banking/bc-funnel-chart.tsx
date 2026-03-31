"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bcFunnelData } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";

export function BCFunnelChart() {
  const max = Math.max(...bcFunnelData.map((d) => d.count));

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">BC Onboarding Funnel</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {bcFunnelData.map((stage, i) => {
          const width = (stage.count / max) * 100;
          return (
            <div key={stage.stage}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-slate-600">{stage.stage}</span>
                <span className="text-sm font-semibold text-slate-900">
                  {formatNumber(stage.count)}
                </span>
              </div>
              <div className="h-6 bg-slate-100 rounded-md overflow-hidden">
                <div
                  className="h-full rounded-md flex items-center justify-end pr-2 transition-all duration-500"
                  style={{ width: `${width}%`, backgroundColor: stage.color }}
                >
                  {width > 20 && (
                    <span className="text-[10px] font-medium text-white">
                      {formatNumber(stage.count)}
                    </span>
                  )}
                </div>
              </div>
              {i < bcFunnelData.length - 1 && (
                <div className="text-center">
                  <span className="text-[10px] text-slate-400">
                    {Math.round((bcFunnelData[i + 1].count / stage.count) * 100)}% conversion
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
