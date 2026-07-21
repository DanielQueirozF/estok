"use client";
import { Pencil, Trash2, Barcode } from "lucide-react";

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
  price?: string; // formatted price
  cost?: string; // formatted cost
};

const sampleData: Product[] = [
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
  {
    id: "2",
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

export function ProductsTable({ data = sampleData }: { data?: Product[] }) {
  const products = data || [];

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
        <Barcode className="w-12 h-12 mb-3 opacity-30" />
        <p className="text-base" style={{ fontWeight: 500 }}>
          Nenhum produto encontrado
        </p>
        <p className="text-sm mt-1">
          Tente ajustar os filtros ou adicione um novo produto.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg bg-white/5 p-2">
      <table className="w-full min-w-175 table-auto text-sm">
        <thead>
          <tr className="text-left text-muted-foreground">
            <th className="px-4 py-3">Produto</th>
            <th className="px-4 py-3">SKU / Cód. Barras</th>
            <th className="px-4 py-3">Categoria</th>
            <th className="px-4 py-3 text-right">Quantidade</th>
            <th className="px-4 py-3 text-right">Preço Venda</th>
            <th className="px-4 py-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t border-border">
              <td className="px-4 py-4 align-center">
                <div className="font-medium">{p.name}</div>
                {p.brand && <div className="text-xs opacity-80">{p.brand}</div>}
              </td>
              <td className="px-4 py-4 align-center">
                <div className="space-y-0.5">
                  {p.sku && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded font-mono">
                        {p.sku}
                      </span>
                    </div>
                  )}
                  {p.barcode && (
                    <div className="mt-1 text-xs text-muted-foreground font-mono">
                      <Barcode className="w-3 h-3 inline-block mr-1" />
                      {p.barcode}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-4 py-4 align-center">
                <span className="text-sm">{p.category}</span>
              </td>
              <td className="px-4 py-4 align-center text-right">
                <div className="text-sm font-semibold">
                  {p.quantity} {p.unit}
                </div>
                {p.min !== undefined && (
                  <div className="text-xs opacity-80">min: {p.min}</div>
                )}
              </td>
              <td className="px-4 py-4 align-center text-right">
                <div className="text-sm font-semibold">{p.price}</div>
                {p.cost && (
                  <div className="text-xs opacity-80">custo: {p.cost}</div>
                )}
              </td>
              <td className="px-4 py-4 align-center">
                <div className="flex items-center gap-3">
                  <button
                    className="text-muted-foreground hover:text-foreground"
                    title="Editar"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    className="text-muted-foreground hover:text-destructive"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
