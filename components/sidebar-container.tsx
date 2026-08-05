"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { WarehouseSelector } from "@/components/warehouse-selector";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NAV_SECTIONS, ALL_NAV_ITEMS } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function isPathActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function SidebarContainer() {
  const pathname = usePathname();
  const activeItem =
    ALL_NAV_ITEMS.find((n) => isPathActive(pathname, n.href)) ?? ALL_NAV_ITEMS[0];

  return (
    <>
      {/* Mobile: warehouse selector (above nav dropdown) */}
      <div className="lg:hidden">
        <WarehouseSelector />
      </div>

      {/* Mobile: navigation dropdown */}
      <div className="lg:hidden">
        <label className="mb-1.5 flex items-center gap-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <LayoutGrid className="h-3.5 w-3.5" />
          Navegação
        </label>
        <Select
          value={activeItem.href}
          onValueChange={(href) => {
            window.location.href = href;
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {NAV_SECTIONS.map((section) => (
              <SelectGroup key={section.label}>
                <SelectLabel>{section.label}</SelectLabel>
                {section.items.map((item) => (
                  <SelectItem key={item.href} value={item.href}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Mobile: theme toggle */}
      <div className="flex justify-center lg:hidden">
        <ThemeToggle />
      </div>

      {/* Desktop: sidebar */}
      <aside className="hidden min-h-full flex-col gap-6 rounded-2xl border border-border bg-muted/40 p-4 shadow-sm lg:flex">
        <WarehouseSelector />

        <nav className="flex-1 space-y-5">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label} className="space-y-1.5">
              <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.label}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = isPathActive(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "relative w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors text-left",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-foreground/80 hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5 shrink-0",
                          isActive
                            ? "text-primary-foreground"
                            : "text-muted-foreground"
                        )}
                      />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="flex justify-center border-t border-border pt-4">
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}
