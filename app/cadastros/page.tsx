"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Warehouse as WarehouseIcon,
  Users,
  Tags,
  Truck,
  Ruler,
  type LucideIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RegistrationCard } from "@/components/cadastros/registration-card";

type RegistryItem = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  actionType: "link" | "modal";
  href?: string;
};

const registryItems: RegistryItem[] = [
  {
    id: "armazens",
    icon: WarehouseIcon,
    title: "Armazéns",
    description: "Cadastre e gerencie os armazéns da empresa",
    actionType: "link",
    href: "/cadastros/armazens",
  },
  {
    id: "usuarios",
    icon: Users,
    title: "Usuários",
    description: "Cadastre e gerencie os usuários do sistema",
    actionType: "link",
    href: "/cadastros/usuarios",
  },
  {
    id: "categorias",
    icon: Tags,
    title: "Categorias",
    description: "Organize seus produtos por categorias",
    actionType: "modal",
  },
  {
    id: "fornecedores",
    icon: Truck,
    title: "Fornecedores",
    description: "Cadastre os fornecedores dos produtos",
    actionType: "link",
    href: "/cadastros/fornecedores",
  },
  {
    id: "unidades",
    icon: Ruler,
    title: "Unidades",
    description: "Defina as unidades de medidas para os produtos",
    actionType: "modal",
  },
];

export default function CadastrosPage() {
  const [modalOpen, setModalOpen] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold sm:text-2xl">Cadastros</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Gerencie as entidades auxiliares do sistema.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {registryItems.map((item) =>
          item.actionType === "link" && item.href ? (
            <Link key={item.id} href={item.href}>
              <RegistrationCard
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            </Link>
          ) : (
            <RegistrationCard
              key={item.id}
              icon={item.icon}
              title={item.title}
              description={item.description}
              actionType="modal"
              onClick={() => setModalOpen(item.id)}
            >
              <Dialog
                open={modalOpen === item.id}
                onOpenChange={(open) => !open && setModalOpen(null)}
              >
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{item.title}</DialogTitle>
                    <DialogDescription>
                      Modal de {item.title.toLowerCase()} — estrutura em construção.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 flex items-center justify-center py-12 text-sm text-muted-foreground border border-dashed border-border rounded-lg">
                    Conteúdo do formulário aparecerá aqui
                  </div>
                </DialogContent>
              </Dialog>
            </RegistrationCard>
          )
        )}
      </div>
    </div>
  );
}
