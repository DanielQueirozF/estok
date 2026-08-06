import Link from "next/link";
import { ArrowDownToLine, ArrowUpFromLine, ArrowLeftRight, Plus } from "lucide-react";

const actions = [
  {
    href: "/estoque",
    label: "Nova Entrada",
    icon: ArrowDownToLine,
    description: "Registrar recebimento",
  },
  {
    href: "/estoque",
    label: "Nova Saída",
    icon: ArrowUpFromLine,
    description: "Registrar retirada",
  },
  {
    href: "/movimentacoes",
    label: "Transferir",
    icon: ArrowLeftRight,
    description: "Entre armazéns",
  },
  {
    href: "/cadastros",
    label: "Novo Produto",
    icon: Plus,
    description: "Cadastrar item",
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Link
            key={action.label}
            href={action.href}
            className="group flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-3 transition-colors hover:border-foreground/20 hover:bg-muted"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium">{action.label}</p>
              <p className="truncate text-xs text-muted-foreground">
                {action.description}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
