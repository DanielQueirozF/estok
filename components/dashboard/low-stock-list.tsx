import Link from "next/link";
import { PackageX, ChevronRight } from "lucide-react";
import {
  lowStockProducts,
  getStockStatus,
} from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

export function LowStockList() {
  return (
    <div className="rounded-xl border border-border bg-muted/30">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <PackageX className="h-4 w-4 text-yellow-500" />
          <h3 className="text-sm font-semibold">Estoque Baixo</h3>
        </div>
        <Link
          href="/estoque"
          className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Ver todos
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      {lowStockProducts.length === 0 ? (
        <p className="px-4 py-8 text-center text-sm text-muted-foreground">
          Nenhum produto com estoque baixo.
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {lowStockProducts.map((product) => {
            const status = getStockStatus(product.quantity, product.minimumStock);
            return (
              <li
                key={product.id}
                className="flex items-center justify-between gap-3 px-4 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{product.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {product.sku} · {product.category}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      {product.quantity} {product.unit}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      min: {product.minimumStock}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-xs font-medium",
                      status.className
                    )}
                  >
                    {status.label}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
