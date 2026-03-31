import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Briefcase, GraduationCap, Workflow } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "banking",
    message: "42 new BC leads captured from Gorakhpur field drive",
    time: "2 hours ago",
    icon: Building2,
    color: "text-blue-600 bg-blue-50",
  },
  {
    id: 2,
    type: "consultancy",
    message: "DPR004 — SHG Enterprise Cluster sent for 4th review",
    time: "3 hours ago",
    icon: Briefcase,
    color: "text-purple-600 bg-purple-50",
  },
  {
    id: 3,
    type: "training",
    message: "BATCH003 Mission Shakti completed — 35 certified",
    time: "5 hours ago",
    icon: GraduationCap,
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    id: 4,
    type: "workflow",
    message: "TEV003 Cold Storage Facility Agra finalized",
    time: "6 hours ago",
    icon: Workflow,
    color: "text-amber-600 bg-amber-50",
  },
  {
    id: 5,
    type: "banking",
    message: "BC006 Pooja Sharma — 412 transactions this month",
    time: "8 hours ago",
    icon: Building2,
    color: "text-blue-600 bg-blue-50",
  },
  {
    id: 6,
    type: "training",
    message: "New batch YUVA-LKO-2411-01 — 28/30 attendance",
    time: "10 hours ago",
    icon: GraduationCap,
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    id: 7,
    type: "consultancy",
    message: "DPR003 PM VISHWAKARMA approved — ready to submit",
    time: "Yesterday",
    icon: Briefcase,
    color: "text-purple-600 bg-purple-50",
  },
];

export function WeeklyActivityFeed() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Activity Feed</CardTitle>
          <Badge variant="secondary" className="text-xs">Last 24h</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-0 p-0">
        <div className="divide-y divide-slate-100">
          {activities.map((a) => (
            <div key={a.id} className="flex items-start gap-3 px-5 py-3 hover:bg-slate-50 transition-colors">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${a.color}`}>
                <a.icon className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700 leading-relaxed">{a.message}</p>
                <p className="text-xs text-slate-400 mt-0.5">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
