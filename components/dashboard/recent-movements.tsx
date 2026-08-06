import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  RefreshCw,
} from "lucide-react";
import {
  recentMovements,
  movementTypeLabels,
  type MovementType,
} from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

const movementIcons: Record<MovementType, typeof ArrowDownToLine> = {
  ENTRY: ArrowDownToLine,
  EXIT: ArrowUpFromLine,
  TRANSFER_IN: ArrowLeftRight,
  TRANSFER_OUT: ArrowLeftRight,
  ADJUSTMENT: RefreshCw,
};

const movementColors: Record<MovementType, string> = {
  ENTRY: "bg-emerald-500/10 text-emerald-500",
  EXIT: "bg-red-500/10 text-red-500",
  TRANSFER_IN: "bg-blue-500/10 text-blue-500",
  TRANSFER_OUT: "bg-orange-500/10 text-orange-500",
  ADJUSTMENT: "bg-yellow-500/10 text-yellow-500",
};

function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return "agora";
  if (diffHours < 24) return `${diffHours}h atrás`;
  if (diffDays === 1) return "ontem";
  return `${diffDays} dias atrás`;
}

export function RecentMovements() {
  return (
    <div className="rounded-xl border border-border bg-muted/30">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold">Últimas Movimentações</h3>
        <Link
          href="/movimentacoes"
          className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Ver todas
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      <ul className="divide-y divide-border">
        {recentMovements.map((m) => {
          const Icon = movementIcons[m.type];
          return (
            <li key={m.id} className="flex items-center gap-3 px-4 py-3">
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                  movementColors[m.type]
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{m.productName}</p>
                <p className="text-xs text-muted-foreground">
                  {movementTypeLabels[m.type]} · {m.warehouseName}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-semibold">
                  {m.type === "EXIT" || m.type === "TRANSFER_OUT"
                    ? "-"
                    : "+"}
                  {m.quantity} {m.unit}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatRelativeDate(m.date)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
