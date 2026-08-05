"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- next-themes mount guard to prevent hydration mismatch
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      role="switch"
      aria-checked={mounted ? isDark : false}
      aria-label="Alternar tema"
      title={mounted ? (isDark ? "Mudar para tema claro" : "Mudar para tema escuro") : ""}
      className={cn(
        "group relative inline-flex h-9 w-16 items-center rounded-full border border-border bg-muted px-1 transition-colors",
        "hover:border-foreground/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
        className
      )}
    >
      <span
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform duration-200",
          isDark ? "translate-x-7" : "translate-x-0"
        )}
      >
        {mounted ? (
          isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />
        ) : <span className="h-4 w-4" />}
      </span>

      <Sun
        className={cn(
          "pointer-events-none absolute left-2 h-4 w-4 transition-colors",
          isDark ? "text-muted-foreground" : "text-transparent"
        )}
      />
      <Moon
        className={cn(
          "pointer-events-none absolute right-2 h-4 w-4 transition-colors",
          isDark ? "text-transparent" : "text-muted-foreground"
        )}
      />
    </button>
  );
}

