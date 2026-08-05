"use client";

import { createContext, useContext, useMemo, useState } from "react";
import {
  warehouses,
  getDefaultWarehouse,
  type Warehouse,
} from "@/lib/app-data";

type WarehouseContextValue = {
  activeWarehouse: Warehouse;
  activeWarehouseId: string;
  setActiveWarehouseId: (id: string) => void;
};

const WarehouseContext = createContext<WarehouseContextValue | null>(null);

export function WarehouseProvider({ children }: { children: React.ReactNode }) {
  const [activeWarehouseId, setActiveWarehouseId] = useState<string>(
    getDefaultWarehouse().id
  );

  const value = useMemo<WarehouseContextValue>(
    () => ({
      activeWarehouse:
        warehouses.find((w) => w.id === activeWarehouseId) ?? getDefaultWarehouse(),
      activeWarehouseId,
      setActiveWarehouseId,
    }),
    [activeWarehouseId]
  );

  return (
    <WarehouseContext.Provider value={value}>
      {children}
    </WarehouseContext.Provider>
  );
}

export function useActiveWarehouse() {
  const ctx = useContext(WarehouseContext);
  if (!ctx) {
    throw new Error("useActiveWarehouse deve ser usado dentro de WarehouseProvider");
  }
  return ctx;
}
