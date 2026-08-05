export type Company = {
  id: string;
  name: string;
  document?: string;
  logoUrl?: string;
  email?: string;
  phone?: string;
};

export type Warehouse = {
  id: string;
  name: string;
  code?: string;
  isDefault: boolean;
  isActive: boolean;
  city?: string;
  state?: string;
};

export type CurrentUser = {
  id: string;
  name: string;
  companyId: string;
};

const acmeId = "company-acme";

export const company: Company = {
  id: acmeId,
  name: "Acme Comércio Ltda",
  document: "12.345.678/0001-90",
  email: "contato@acme.com",
  phone: "(11) 4002-8922",
};

export const currentUser: CurrentUser = {
  id: "user-daniel",
  name: "Daniel",
  companyId: acmeId,
};

export const warehouses: Warehouse[] = [
  {
    id: "wh-main",
    name: "Matriz - São Paulo",
    code: "SP-01",
    isDefault: true,
    isActive: true,
    city: "São Paulo",
    state: "SP",
  },
  {
    id: "wh-rj",
    name: "Filial - Rio de Janeiro",
    code: "RJ-01",
    isDefault: false,
    isActive: true,
    city: "Rio de Janeiro",
    state: "RJ",
  },
  {
    id: "wh-camp",
    name: "Galpão Campinas",
    code: "CP-01",
    isDefault: false,
    isActive: true,
    city: "Campinas",
    state: "SP",
  },
  {
    id: "wh-sec",
    name: "Secundário",
    code: "SC-01",
    isDefault: false,
    isActive: false,
    city: "São Paulo",
    state: "SP",
  },
];

export function getDefaultWarehouse(): Warehouse {
  return warehouses.find((w) => w.isDefault) ?? warehouses[0];
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
