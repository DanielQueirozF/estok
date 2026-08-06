"use client";

import { Boxes, Package, AlertTriangle, DollarSign } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { LowStockList } from "@/components/dashboard/low-stock-list";
import { RecentMovements } from "@/components/dashboard/recent-movements";
import { EntryExitChart } from "@/components/dashboard/entry-exit-chart";
import { dashboardMetrics } from "@/lib/dashboard-data";
import { useActiveWarehouse } from "@/components/warehouse-provider";

export function DashboardContent() {
  const { activeWarehouse } = useActiveWarehouse();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold sm:text-2xl">Dashboard</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Visão geral do armazém{" "}
          <span className="font-medium text-foreground">
            {activeWarehouse.name}
          </span>
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total de Produtos"
          value={dashboardMetrics.totalProducts}
          icon={Package}
          trend="+3 esta semana"
          trendType="up"
        />
        <StatCard
          label="Itens em Estoque"
          value={dashboardMetrics.totalStockUnits.toLocaleString("pt-BR")}
          icon={Boxes}
          trend="+248 vs. semana passada"
          trendType="up"
        />
        <StatCard
          label="Estoque Baixo"
          value={dashboardMetrics.lowStockCount}
          icon={AlertTriangle}
          trend="Requer atenção"
          trendType="down"
        />
        <StatCard
          label="Valor em Estoque"
          value={dashboardMetrics.stockValue}
          icon={DollarSign}
          trend="+5,2% no mês"
          trendType="up"
        />
      </div>

      <QuickActions />

      <div className="grid gap-4 lg:grid-cols-2">
        <EntryExitChart />
        <LowStockList />
      </div>

      <RecentMovements />
    </div>
  );
}
