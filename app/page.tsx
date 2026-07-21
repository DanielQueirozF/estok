"use client";

import { useState } from "react";
import { Package, BarChart3, Download, Plus } from "lucide-react";
import { DashboardContent } from "@/components/dashboard-content";
import { ProductsContent } from "@/components/products-content";

type ActiveTab = "produtos" | "dashboard";

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");

  const renderContent = () => {
    if (activeTab === "produtos") {
      return <ProductsContent />;
    }

    return <DashboardContent />;
  };

  return (
    <main className="min-h-screen bg-background p-2">
      <div className="mx-auto grid min-h-screen max-w-8xl gap-4 lg:grid-cols-[260px_1fr] lg:grid-rows-[80px_1fr]">
        <header className="flex items-center justify-between rounded-2xl bg-primary px-2 py-4 text-white shadow-sm sm:px-6 lg:col-span-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
              <Package className="w-4 h-4 text-primary-foreground" />
            </div>
            <span
              className="text-base text-primary-foreground"
              style={{ fontWeight: 700 }}
            >
              Estok
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="text-base text-primary-foreground"
              style={{ fontWeight: 500 }}
            >
              Olá, Daniel
            </span>
            <div className="rounded-full bg-secondary h-12 w-12"></div>
          </div>
        </header>

        <aside className="flex flex-wrap gap-2 rounded-2xl bg-primary p-3 text-primary-foreground shadow-sm lg:flex-col lg:gap-3 lg:p-4">
          <nav className="flex-1 space-y-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${activeTab === "dashboard" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}
            >
              <BarChart3 className="w-4 h-4 shrink-0" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("produtos")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${activeTab === "produtos" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}
            >
              <Package className="w-4 h-4 shrink-0" />
              Produtos
            </button>
          </nav>

          <div className="space-y-2">
            <button className="w-full flex justify-center items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors text-left">
              <Download className="w-4 h-4 shrink-0" />
              Exportar CSV
            </button>
            <button
              className="w-full flex justify-center items-center gap-3 px-3 py-2.5 rounded-lg bg-secondary text-secondary-foreground text-sm hover:bg-secondary/90 transition-colors text-left"
              style={{ fontWeight: 600 }}
            >
              <Plus className="w-4 h-4 shrink-0" />
              Novo Produto
            </button>
          </div>
        </aside>

        <section className="rounded-2xl bg-primary p-4 text-primary-foreground shadow-sm sm:p-6 lg:p-8">
          {renderContent()}
        </section>
      </div>
    </main>
  );
}
