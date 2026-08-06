export type DashboardMetrics = {
  totalProducts: number;
  totalStockUnits: number;
  lowStockCount: number;
  stockValue: string;
};

export type LowStockProduct = {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  unit: string;
  minimumStock: number;
  category: string;
};

export type MovementType = "ENTRY" | "EXIT" | "TRANSFER_IN" | "TRANSFER_OUT" | "ADJUSTMENT";

export type RecentMovement = {
  id: string;
  productName: string;
  type: MovementType;
  quantity: number;
  unit: string;
  date: string;
  warehouseName: string;
};

export type ChartDataPoint = {
  label: string;
  entradas: number;
  saidas: number;
};

export const dashboardMetrics: DashboardMetrics = {
  totalProducts: 142,
  totalStockUnits: 3284,
  lowStockCount: 8,
  stockValue: "R$ 184.250,00",
};

export const lowStockProducts: LowStockProduct[] = [
  {
    id: "p1",
    name: "Mouse Sem Fio Loginfo",
    sku: "ELE-204",
    quantity: 2,
    unit: "un",
    minimumStock: 10,
    category: "Eletrônicos",
  },
  {
    id: "p2",
    name: "Cadeira Ergonômica Flexform",
    sku: "MOV-001",
    quantity: 0,
    unit: "un",
    minimumStock: 3,
    category: "Móveis",
  },
  {
    id: "p3",
    name: "Teclado Mecânico KeyPro",
    sku: "ELE-318",
    quantity: 4,
    unit: "un",
    minimumStock: 8,
    category: "Eletrônicos",
  },
  {
    id: "p4",
    name: "Monitor LED 24'' ViewMax",
    sku: "ELE-102",
    quantity: 1,
    unit: "un",
    minimumStock: 5,
    category: "Eletrônicos",
  },
  {
    id: "p5",
    name: "Mesa de Reunião Oslo",
    sku: "MOV-088",
    quantity: 0,
    unit: "un",
    minimumStock: 2,
    category: "Móveis",
  },
];

export const recentMovements: RecentMovement[] = [
  {
    id: "m1",
    productName: "Cadeira Ergonômica Flexform",
    type: "ENTRY",
    quantity: 12,
    unit: "un",
    date: "2026-08-05T14:30:00Z",
    warehouseName: "Matriz - São Paulo",
  },
  {
    id: "m2",
    productName: "Mouse Sem Fio Loginfo",
    type: "EXIT",
    quantity: 3,
    unit: "un",
    date: "2026-08-05T11:15:00Z",
    warehouseName: "Matriz - São Paulo",
  },
  {
    id: "m3",
    productName: "Teclado Mecânico KeyPro",
    type: "TRANSFER_OUT",
    quantity: 5,
    unit: "un",
    date: "2026-08-05T09:00:00Z",
    warehouseName: "Matriz - São Paulo",
  },
  {
    id: "m4",
    productName: "Monitor LED 24'' ViewMax",
    type: "ENTRY",
    quantity: 8,
    unit: "un",
    date: "2026-08-04T16:45:00Z",
    warehouseName: "Filial - Rio de Janeiro",
  },
  {
    id: "m5",
    productName: "Mesa de Reunião Oslo",
    type: "EXIT",
    quantity: 1,
    unit: "un",
    date: "2026-08-04T10:20:00Z",
    warehouseName: "Matriz - São Paulo",
  },
  {
    id: "m6",
    productName: "Cadeira Ergonômica Flexform",
    type: "ADJUSTMENT",
    quantity: 2,
    unit: "un",
    date: "2026-08-03T15:00:00Z",
    warehouseName: "Galpão Campinas",
  },
];

export const chartData: ChartDataPoint[] = [
  { label: "Seg", entradas: 42, saidas: 28 },
  { label: "Ter", entradas: 38, saidas: 35 },
  { label: "Qua", entradas: 55, saidas: 40 },
  { label: "Qui", entradas: 30, saidas: 52 },
  { label: "Sex", entradas: 48, saidas: 45 },
  { label: "Sáb", entradas: 20, saidas: 12 },
  { label: "Dom", entradas: 10, saidas: 5 },
];

export const movementTypeLabels: Record<MovementType, string> = {
  ENTRY: "Entrada",
  EXIT: "Saída",
  TRANSFER_IN: "Transferência (Entrada)",
  TRANSFER_OUT: "Transferência (Saída)",
  ADJUSTMENT: "Ajuste",
};

export const movementTypeColors: Record<MovementType, string> = {
  ENTRY: "text-emerald-500",
  EXIT: "text-red-500",
  TRANSFER_IN: "text-blue-500",
  TRANSFER_OUT: "text-orange-500",
  ADJUSTMENT: "text-yellow-500",
};

export function getStockStatus(quantity: number, minimumStock: number): {
  label: string;
  className: string;
} {
  if (quantity === 0) {
    return {
      label: "Esgotado",
      className: "bg-red-500/10 text-red-500 border-red-500/20",
    };
  }
  if (quantity <= minimumStock) {
    return {
      label: "Baixo",
      className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    };
  }
  return {
    label: "Normal",
    className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  };
}
