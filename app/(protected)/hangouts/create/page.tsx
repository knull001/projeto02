"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, MapPin, Calendar, Clock, Users, ImagePlus } from "lucide-react";
import { CATEGORY_CONFIG, type HangoutCategory } from "@/lib/types";

const categories: HangoutCategory[] = [
  "esportes",
  "cultura",
  "gastronomia",
  "festas",
  "jogos",
  "ao_ar_livre",
  "estudo",
  "voluntariado",
  "outro",
];

export default function CreateHangoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "" as HangoutCategory | "",
    location: "",
    date: "",
    time: "",
    max_participants: 10,
  });

  function update(field: string, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.category) {
      toast.error("Selecione uma categoria");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Voce precisa estar logado");
        router.push("/auth/login");
        return;
      }

      const { error } = await supabase.from("hangouts").insert({
        creator_id: user.id,
        title: form.title,
        description: form.description,
        category: form.category,
        location: form.location,
        date: form.date,
        time: form.time,
        max_participants: form.max_participants,
        current_participants: 1,
        status: "active",
      });

      if (error) {
        toast.error("Erro ao criar role", { description: error.message });
        setLoading(false);
        return;
      }

      toast.success("Role criado com sucesso!");
      router.push("/hangouts");
    } catch {
      toast.error("Erro inesperado. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Back link */}
      <Link
        href="/hangouts"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Link>

      <h1 className="mb-2 font-display text-2xl font-bold text-foreground">
        Criar novo Role
      </h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Preencha os detalhes para criar seu hangout.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6 shadow-sm"
      >
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="mb-1.5 block text-sm font-medium text-card-foreground"
          >
            Titulo
          </label>
          <input
            id="title"
            type="text"
            required
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="Ex: Futebol no Parque"
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-1.5 block text-sm font-medium text-card-foreground"
          >
            Descricao
          </label>
          <textarea
            id="description"
            required
            rows={4}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="Descreva seu role..."
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-card-foreground">
            Categoria
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => update("category", cat)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  form.category === cat
                    ? "bg-primary text-primary-foreground ring-2 ring-primary/30"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                }`}
              >
                {CATEGORY_CONFIG[cat].label}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="location"
            className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-card-foreground"
          >
            <MapPin className="h-4 w-4 text-muted-foreground" />
            Local
          </label>
          <input
            id="location"
            type="text"
            required
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            placeholder="Endereco ou nome do local"
            className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Date + Time + Participants */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label
              htmlFor="date"
              className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-card-foreground"
            >
              <Calendar className="h-4 w-4 text-muted-foreground" />
              Data
            </label>
            <input
              id="date"
              type="date"
              required
              value={form.date}
              onChange={(e) => update("date", e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label
              htmlFor="time"
              className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-card-foreground"
            >
              <Clock className="h-4 w-4 text-muted-foreground" />
              Horario
            </label>
            <input
              id="time"
              type="time"
              required
              value={form.time}
              onChange={(e) => update("time", e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label
              htmlFor="max"
              className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-card-foreground"
            >
              <Users className="h-4 w-4 text-muted-foreground" />
              Max. participantes
            </label>
            <input
              id="max"
              type="number"
              required
              min={2}
              max={200}
              value={form.max_participants}
              onChange={(e) =>
                update("max_participants", parseInt(e.target.value))
              }
              className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
          ) : null}
          {loading ? "Criando..." : "Criar Role"}
        </button>
      </form>
    </div>
  );
}
