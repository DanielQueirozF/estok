import { Boxes } from "lucide-react";

import { company, currentUser, getInitials } from "@/lib/app-data";

export function HeaderContainer() {
  return (
    <header className="flex items-center justify-between rounded-2xl bg-muted px-4 py-3 text-foreground shadow-sm sm:px-6 lg:col-span-2">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted-foreground/15">
          <Boxes className="h-5 w-5 text-foreground" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold tracking-tight">Estok</span>
          <span className="hidden text-foreground/40 sm:inline">·</span>
          <span className="hidden text-sm font-medium text-foreground/80 sm:inline">
            {company.name}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden text-sm font-medium sm:block">
          Olá, {currentUser.name}
        </span>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted-foreground/15 text-sm font-semibold text-foreground">
          {getInitials(currentUser.name)}
        </div>
      </div>
    </header>
  );
}
