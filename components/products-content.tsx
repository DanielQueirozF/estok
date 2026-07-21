"use client";

import { useMemo, useState } from "react";
import { Search, Filter } from "lucide-react";
import { ProductsTable } from "./products-table";

type Product = {
  id: string;
  name: string;
  brand?: string;
  sku?: string;
  barcode?: string;
  category?: string;
  quantity?: number;
  unit?: string;
  min?: number;
  price?: string;
  cost?: string;
};

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Cadeira Ergonômica",
    brand: "Flexform",
    sku: "MOV-001",
    barcode: "7891234570001",
    category: "Móveis",
    quantity: 8,
    unit: "un",
    min: 2,
    price: "R$ 1.200,00",
    cost: "R$ 650,00",
  },
];

const CATEGORIES = ["Todas", "Móveis", "Eletrônicos", "Casa"];
const STATUS_FILTERS = ["Todos", "Normal", "Baixo", "Crítico", "Esgotado"];

export function ProductsContent() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("Todas");
  const [statusFilter, setStatusFilter] = useState<string>("Todos");

  const filtered = products.filter((p) => {
      const q = search.trim().toLowerCase();
      if (q) {
        const inName = p.name?.toLowerCase().includes(q);
        const inSku = p.sku?.toLowerCase().includes(q);
        const inBarcode = p.barcode?.toLowerCase().includes(q);
        if (!inName && !inSku && !inBarcode) return false;
      }
      if (categoryFilter !== "Todas" && p.category !== categoryFilter)
        return false;
      // status is not part of Product here; skip statusFilter logic for now
      return true;
    });

  return (
    <div className="space-y-4">
      <div className="bg-primary/10 rounded-xl  p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome, SKU, código de barras..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
            >
              {STATUS_FILTERS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {filtered.length} produto{filtered.length !== 1 ? "s" : ""}{" "}
            encontrado{filtered.length !== 1 ? "s" : ""}
          </span>
          {(search ||
            categoryFilter !== "Todas" ||
            statusFilter !== "Todos") && (
            <button
              onClick={() => {
                setSearch("");
                setCategoryFilter("Todas");
                setStatusFilter("Todos");
              }}
              className="text-primary hover:underline text-xs"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      <div className="bg-primary/10 rounded-xl  overflow-hidden">
        <ProductsTable data={filtered} />
      </div>
    </div>
  );
}
