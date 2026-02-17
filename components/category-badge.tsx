import { cn } from "@/lib/utils";
import { CATEGORY_CONFIG, type HangoutCategory } from "@/lib/types";
import {
  Trophy,
  Palette,
  UtensilsCrossed,
  PartyPopper,
  Gamepad2,
  TreePine,
  BookOpen,
  Heart,
  MoreHorizontal,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Trophy,
  Palette,
  UtensilsCrossed,
  PartyPopper,
  Gamepad2,
  TreePine,
  BookOpen,
  Heart,
  MoreHorizontal,
};

export function CategoryBadge({
  category,
  size = "sm",
  className,
}: {
  category: HangoutCategory;
  size?: "sm" | "md";
  className?: string;
}) {
  const config = CATEGORY_CONFIG[category];
  const Icon = iconMap[config.icon];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium",
        config.color,
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm",
        className
      )}
    >
      {Icon && <Icon className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />}
      {config.label}
    </span>
  );
}
