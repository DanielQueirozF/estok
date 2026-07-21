export function DashboardContent() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold sm:text-2xl">Dashboard</h2>
        <p className="mt-1 text-sm opacity-90">
          Visão geral rápida da sua operação.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-white/10 p-4">
          <p className="text-sm opacity-80">Vendas hoje</p>
          <p className="mt-2 text-2xl font-semibold">R$ 2.480</p>
        </div>
        <div className="rounded-xl bg-white/10 p-4">
          <p className="text-sm opacity-80">Pedidos</p>
          <p className="mt-2 text-2xl font-semibold">24</p>
        </div>
        <div className="rounded-xl bg-white/10 p-4">
          <p className="text-sm opacity-80">Clientes ativos</p>
          <p className="mt-2 text-2xl font-semibold">96</p>
        </div>
      </div>
    </div>
  );
}
