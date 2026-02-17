"use client";

import { useState } from "react";
import { Plus, Search, Filter, MapPin } from "lucide-react";
import Link from "next/link";
import { HangoutCard } from "@/components/hangout-card";
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

export default function HangoutsPage() {
  const [activeCategory, setActiveCategory] = useState<
    HangoutCategory | "todos"
  >("todos");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "full">(
    "all"
  );

  const filtered = mockHangouts.filter((h) => {
    const matchCategory =
      activeCategory === "todos" || h.category === activeCategory;
    const matchSearch =
      !search ||
      h.title.toLowerCase().includes(search.toLowerCase()) ||
      h.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "all" || h.status === statusFilter;
    return matchCategory && matchSearch && matchStatus;
  });

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Hangouts
          </h1>
          <p className="text-sm text-muted-foreground">
            Explore todos os roles disponiveis
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

      {/* Search + Status filter */}
      <div className="mb-4 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por titulo ou local..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex gap-1 rounded-lg border border-input bg-background p-1">
          {(["all", "active", "full"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                statusFilter === s
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s === "all" ? "Todos" : s === "active" ? "Abertos" : "Lotados"}
            </button>
          ))}
        </div>
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

      {/* Results info */}
      <p className="mb-4 text-sm text-muted-foreground">
        {filtered.length}{" "}
        {filtered.length === 1 ? "role encontrado" : "roles encontrados"}
      </p>

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
            <MapPin className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-1 text-lg font-semibold text-foreground">
            Nenhum role encontrado
          </h3>
          <p className="max-w-xs text-sm text-muted-foreground">
            Tente ajustar seus filtros ou crie um novo hangout.
          </p>
        </div>
      )}
    </div>
  );
}
