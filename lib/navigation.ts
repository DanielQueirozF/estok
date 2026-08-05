import {
  BarChart3,
  Package,
  ArrowLeftRight,
  Settings2,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type NavSection = {
  label: string;
  items: NavItem[];
};

export const NAV_SECTIONS: NavSection[] = [
  {
    label: "Visão Geral",
    items: [{ href: "/", label: "Dashboard", icon: BarChart3 }],
  },
  {
    label: "Operação",
    items: [
      { href: "/estoque", label: "Estoque", icon: Package },
      { href: "/movimentacoes", label: "Movimentações", icon: ArrowLeftRight },
    ],
  },
  {
    label: "Sistema",
    items: [
      { href: "/cadastros", label: "Cadastros", icon: Settings2 },
      { href: "/configuracoes", label: "Configurações", icon: Settings },
    ],
  },
];

export const ALL_NAV_ITEMS: NavItem[] = NAV_SECTIONS.flatMap((s) => s.items);
