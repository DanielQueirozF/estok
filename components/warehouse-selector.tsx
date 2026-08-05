"use client";

import { Warehouse as WarehouseIcon, Star } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { warehouses } from "@/lib/app-data";
import { useActiveWarehouse } from "@/components/warehouse-provider";

export function WarehouseSelector({ className }: { className?: string }) {
  const { activeWarehouse, activeWarehouseId, setActiveWarehouseId } =
    useActiveWarehouse();
  const active = activeWarehouse;

  return (
    <div className={cn("space-y-2.5", className)}>
      <div className="flex items-center gap-2 m-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        <WarehouseIcon className="h-5 w-5" />
        Armazém
      </div>

      <Select value={activeWarehouseId} onValueChange={setActiveWarehouseId}>
        <SelectTrigger className="h-auto border-0 bg-muted py-2.5 shadow-sm focus:ring-2 focus:ring-ring/30">
          <div className="flex items-center gap-2.5">
            <div className="flex flex-col items-start leading-tight">
              <span className="text-sm font-semibold text-foreground">
                {active.name}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                {active.code && <span>Cód. {active.code}</span>}
                {active.code && (active.city || active.state) && (
                  <span className="text-muted-foreground">·</span>
                )}
                {(active.city || active.state) && (
                  <span className="flex items-center gap-0.5">
                    {active.city}
                    {active.state ? `/${active.state}` : ""}
                  </span>
                )}
              </span>
            </div>
          </div>
        </SelectTrigger>
        <SelectContent>
          {warehouses
            .filter((w) => w.isActive)
            .map((w) => (
              <SelectItem
                key={w.id}
                value={w.id}
                className="flex items-start gap-2.5 py-2"
              >
                <span className="flex flex-col gap-0.5">
                  <span className="flex items-center gap-1.5">
                    <span className="font-medium">{w.name}</span>
                    {w.isDefault && (
                      <span className="inline-flex items-center gap-0.5 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                        <Star className="h-2.5 w-2.5" />
                        Padrão
                      </span>
                    )}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {w.code ? `Cód. ${w.code}` : ""}
                    {w.code && (w.city || w.state) ? " · " : ""}
                    {w.city}
                    {w.state ? `/${w.state}` : ""}
                  </span>
                </span>
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}
