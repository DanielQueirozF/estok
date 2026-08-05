export function DashboardContent() {
  const stats = [
    { label: "Vendas hoje", value: "R$ 2.480" },
    { label: "Pedidos", value: "24" },
    { label: "Clientes ativos", value: "96" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold sm:text-2xl">Dashboard</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Visão geral rápida da sua operação.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="mt-2 text-2xl font-semibold">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
