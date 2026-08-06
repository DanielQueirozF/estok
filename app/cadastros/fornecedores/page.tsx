import { BackButton } from "@/components/ui/back-button";

export default function FornecedoresPage() {
  return (
    <div className="space-y-6">
      <BackButton href="/cadastros" />
      <div>
        <h2 className="text-xl font-semibold sm:text-2xl">Fornecedores</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Cadastre os fornecedores dos produtos.
        </p>
      </div>
      <div className="flex items-center justify-center py-20 text-sm text-muted-foreground border border-dashed border-border rounded-xl">
        Conteúdo em construção
      </div>
    </div>
  );
}
