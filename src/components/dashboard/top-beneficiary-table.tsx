import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { topBeneficiaries } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, Users, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

export function TopBeneficiaryTable() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Top-20 Beneficiary Watch</CardTitle>
          <Link href="/training/outcome-tracker">
            <Button variant="ghost" size="xs" className="gap-1">
              All <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-100">
          {topBeneficiaries.map((b) => (
            <div key={b.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-colors">
              {/* Rank */}
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                b.rank === 1 ? "bg-amber-100 text-amber-700" :
                b.rank === 2 ? "bg-slate-100 text-slate-700" :
                b.rank === 3 ? "bg-orange-100 text-orange-700" :
                "bg-slate-50 text-slate-500"
              }`}>
                {b.rank}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">{b.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] text-slate-400">{b.district}</span>
                  <span className="text-[10px] text-slate-300">•</span>
                  <Badge variant="secondary" className="text-[9px] h-3.5 px-1">{b.scheme}</Badge>
                </div>
              </div>

              {/* Score + health */}
              <div className="text-right shrink-0">
                <div className="flex items-center gap-1 justify-end">
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                  <span className="text-xs font-semibold text-slate-900">{b.growthScore}</span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  {b.marketLinked ? (
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <XCircle className="h-3 w-3 text-slate-300" />
                  )}
                  <Badge
                    variant={
                      b.repaymentHealth === "good" ? "success" :
                      b.repaymentHealth === "at-risk" ? "warning" : "danger"
                    }
                    className="text-[9px] h-3.5 px-1"
                  >
                    {b.repaymentHealth}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 rounded-b-xl">
          <p className="text-xs text-slate-500 text-center">
            Showing top 5 of 12,480 beneficiaries
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
