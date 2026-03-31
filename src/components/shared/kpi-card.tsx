import { cn, formatNumber } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: number;
  changeLabel?: string;
  icon?: React.ElementType;
  iconBg?: string;
  iconColor?: string;
  trend?: "up" | "down" | "neutral";
  trendPositive?: boolean;
  className?: string;
  compact?: boolean;
}

export function KPICard({
  title,
  value,
  subtitle,
  change,
  changeLabel,
  icon: Icon,
  iconBg = "bg-upicon-50",
  iconColor = "text-upicon-600",
  trend,
  trendPositive = true,
  className,
  compact = false,
}: KPICardProps) {
  const displayChange = change !== undefined ? Math.abs(change) : undefined;
  const isPositive = change !== undefined ? (trendPositive ? change > 0 : change < 0) : undefined;

  return (
    <Card className={cn("p-5 hover:shadow-md transition-shadow", compact && "p-4", className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className={cn("text-sm text-slate-500 font-medium truncate", compact && "text-xs")}>
            {title}
          </p>
          <p className={cn("text-2xl font-bold text-slate-900 mt-1", compact && "text-xl")}>
            {typeof value === "number" ? formatNumber(value) : value}
          </p>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-0.5 truncate">{subtitle}</p>
          )}
          {(displayChange !== undefined || changeLabel) && (
            <div className="flex items-center gap-1 mt-2">
              {displayChange !== undefined && (
                <>
                  {trend === "up" || (change !== undefined && change > 0) ? (
                    <TrendingUp className={cn("h-3.5 w-3.5", isPositive ? "text-emerald-600" : "text-red-500")} />
                  ) : trend === "down" || (change !== undefined && change < 0) ? (
                    <TrendingDown className={cn("h-3.5 w-3.5", isPositive ? "text-emerald-600" : "text-red-500")} />
                  ) : (
                    <Minus className="h-3.5 w-3.5 text-slate-400" />
                  )}
                  <span className={cn("text-xs font-medium", isPositive ? "text-emerald-600" : "text-red-500")}>
                    {displayChange}%
                  </span>
                </>
              )}
              {changeLabel && (
                <span className="text-xs text-slate-400">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
        {Icon && (
          <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ml-3", iconBg)}>
            <Icon className={cn("h-5 w-5", iconColor)} />
          </div>
        )}
      </div>
    </Card>
  );
}
