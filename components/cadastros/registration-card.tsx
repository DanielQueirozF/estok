import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function RegistrationCard({
  icon: Icon,
  title,
  description,
  actionType = "link",
  className,
  children,
  onClick,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  actionType?: "link" | "modal";
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  const inner = (
    <>
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover/card:bg-primary group-hover/card:text-primary-foreground">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover/card:translate-x-0.5" />
      </div>
    </>
  );

  if (actionType === "modal" && children) {
    return (
      <>
        <Card
          role="button"
          tabIndex={0}
          onClick={onClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onClick?.();
            }
          }}
          className={cn(
            "group/card cursor-pointer p-4 transition-colors hover:border-foreground/20 hover:bg-muted",
            className
          )}
        >
          {inner}
        </Card>
        {children}
      </>
    );
  }

  return (
    <Card
      className={cn(
        "group/card cursor-pointer p-4 transition-colors hover:border-foreground/20 hover:bg-muted",
        className
      )}
    >
      {inner}
    </Card>
  );
}
