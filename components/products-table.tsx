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
  price?: string;
  cost?: string;
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
    name: "Mouse Sem Fio",
    brand: "Loginfo",
    sku: "ELE-204",
    barcode: "7891234570002",
    category: "Eletrônicos",
    quantity: 0,
    unit: "un",
    min: 5,
    price: "R$ 89,90",
    cost: "R$ 42,00",
  },
];

export function ProductsTable({ data = sampleData }: { data?: Product[] }) {
  const products = data || [];

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
        <Barcode className="h-12 w-12 mb-3 opacity-30" />
        <p className="text-base font-medium">Nenhum produto encontrado</p>
        <p className="text-sm mt-1">
          Tente ajustar os filtros ou adicione um novo produto.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto p-2">
      <table className="w-full min-w-[700px] table-auto text-sm">
        <thead>
          <tr className="text-left text-muted-foreground border-b border-border">
            <th className="px-4 py-3 font-medium">Produto</th>
            <th className="px-4 py-3 font-medium">SKU / Cód. Barras</th>
            <th className="px-4 py-3 font-medium">Categoria</th>
            <th className="px-4 py-3 text-right font-medium">Quantidade</th>
            <th className="px-4 py-3 text-right font-medium">Preço Venda</th>
            <th className="px-4 py-3 font-medium">Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b border-border last:border-0">
              <td className="px-4 py-4 align-middle">
                <div className="font-medium text-foreground">{p.name}</div>
                {p.brand && (
                  <div className="text-xs text-muted-foreground">{p.brand}</div>
                )}
              </td>
              <td className="px-4 py-4 align-middle">
                <div className="space-y-0.5">
                  {p.sku && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
                        {p.sku}
                      </span>
                    </div>
                  )}
                  {p.barcode && (
                    <div className="mt-1 text-xs text-muted-foreground font-mono">
                      <Barcode className="h-3 w-3 inline-block mr-1" />
                      {p.barcode}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-4 py-4 align-middle">
                <span className="text-sm">{p.category}</span>
              </td>
              <td className="px-4 py-4 align-middle text-right">
                <div className="text-sm font-semibold">{p.quantity} {p.unit}</div>
                {p.min !== undefined && (
                  <div className="text-xs text-muted-foreground">min: {p.min}</div>
                )}
              </td>
              <td className="px-4 py-4 align-middle text-right">
                <div className="text-sm font-semibold">{p.price}</div>
                {p.cost && (
                  <div className="text-xs text-muted-foreground">custo: {p.cost}</div>
                )}
              </td>
              <td className="px-4 py-4 align-middle">
                <div className="flex items-center gap-3">
                  <button
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    title="Editar"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="h-4 w-4" />
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
