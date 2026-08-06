import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendType,
  className,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendType?: "up" | "down" | "neutral";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-muted/30 p-4",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold">{value}</p>
      {trend && (
        <p
          className={cn(
            "mt-1.5 text-xs font-medium",
            trendType === "up" && "text-emerald-500",
            trendType === "down" && "text-red-500",
            trendType === "neutral" && "text-muted-foreground"
          )}
        >
          {trend}
        </p>
      )}
    </div>
  );
}
