"use client";

import { useState } from "react";
import { Plus, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { HangoutCard } from "@/components/hangout-card";
import { CategoryBadge } from "@/components/category-badge";
import { mockHangouts } from "@/lib/mock-data";
import type { HangoutCategory } from "@/lib/types";
import { CATEGORY_CONFIG } from "@/lib/types";

const categories: (HangoutCategory | "todos")[] = [
  "todos",
  "esportes",
  "cultura",
  "gastronomia",
  "festas",
  "jogos",
  "ao_ar_livre",
  "estudo",
  "voluntariado",
];

export default function DashboardPage() {
  const [activeCategory, setActiveCategory] = useState<
    HangoutCategory | "todos"
  >("todos");
  const [search, setSearch] = useState("");

  const filtered = mockHangouts.filter((h) => {
    const matchCategory =
      activeCategory === "todos" || h.category === activeCategory;
    const matchSearch =
      !search ||
      h.title.toLowerCase().includes(search.toLowerCase()) ||
      h.location.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div>
      {/* Welcome banner */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Descubra Roles
          </h1>
          <p className="text-sm text-muted-foreground">
            Encontre hangouts incriveis perto de voce
          </p>
        </div>
        <Link
          href="/hangouts/create"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Criar Role</span>
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar hangouts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Category Filters */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-accent"
            }`}
          >
            {cat === "todos" ? "Todos" : CATEGORY_CONFIG[cat].label}
          </button>
        ))}
      </div>

      {/* Hangout Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((hangout) => (
            <HangoutCard key={hangout.id} hangout={hangout} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 rounded-full bg-muted p-4">
            <Sparkles className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-1 text-lg font-semibold text-foreground">
            Nenhum role encontrado
          </h3>
          <p className="mb-4 max-w-xs text-sm text-muted-foreground">
            Tente mudar os filtros ou crie o seu proprio role!
          </p>
          <Link
            href="/hangouts/create"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Criar Role
          </Link>
        </div>
      )}
    </div>
  );
}
