"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Users,
  Share2,
  MessageCircle,
  CheckCircle2,
  Star,
} from "lucide-react";
import { CategoryBadge } from "@/components/category-badge";
import { UserAvatar } from "@/components/user-avatar";
import { mockHangouts, mockProfiles } from "@/lib/mock-data";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { toast } from "sonner";

export default function HangoutDetailPage() {
  const params = useParams();
  const hangout = mockHangouts.find((h) => h.id === params.id);

  if (!hangout) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="mb-2 text-xl font-semibold text-foreground">
          Role nao encontrado
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Esse hangout pode ter sido removido ou nao existe.
        </p>
        <Link
          href="/hangouts"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar aos hangouts
        </Link>
      </div>
    );
  }

  const isFull = hangout.status === "full";
  const dateFormatted = format(parseISO(hangout.date), "EEEE, d 'de' MMMM", {
    locale: ptBR,
  });
  const spotsLeft = hangout.max_participants - hangout.current_participants;

  // Simulated participants
  const participants = mockProfiles.slice(0, Math.min(hangout.current_participants, 4));

  return (
    <div className="mx-auto max-w-3xl">
      {/* Back */}
      <Link
        href="/hangouts"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Link>

      {/* Image / Banner */}
      <div className="mb-6 h-48 overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent sm:h-64">
        {hangout.image_url && (
          <img
            src={hangout.image_url}
            alt={hangout.title}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <CategoryBadge category={hangout.category} size="md" />
            {isFull && (
              <span className="rounded-full bg-destructive px-3 py-1 text-xs font-semibold text-destructive-foreground">
                Lotado
              </span>
            )}
            {hangout.status === "active" && (
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                Aberto
              </span>
            )}
          </div>

          <h1 className="mb-3 font-display text-2xl font-bold text-foreground sm:text-3xl text-balance">
            {hangout.title}
          </h1>

          {/* Creator info */}
          {hangout.creator && (
            <div className="mb-4 flex items-center gap-3">
              <UserAvatar
                name={hangout.creator.display_name}
                imageUrl={hangout.creator.avatar_url}
                size="md"
              />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {hangout.creator.display_name}
                </p>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                  <span className="text-xs text-muted-foreground">
                    {hangout.creator.reputation_score}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Details */}
          <div className="mb-6 flex flex-col gap-3 rounded-lg border border-border bg-muted/30 p-4">
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 shrink-0 text-primary" />
              <span className="capitalize text-foreground">{dateFormatted}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-4 w-4 shrink-0 text-primary" />
              <span className="text-foreground">{hangout.time}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 shrink-0 text-primary" />
              <span className="text-foreground">{hangout.location}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Users className="h-4 w-4 shrink-0 text-primary" />
              <span className="text-foreground">
                {hangout.current_participants}/{hangout.max_participants}{" "}
                participantes
                {!isFull && (
                  <span className="ml-1 text-muted-foreground">
                    ({spotsLeft} {spotsLeft === 1 ? "vaga" : "vagas"})
                  </span>
                )}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="mb-2 font-display text-lg font-semibold text-foreground">
              Sobre o role
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {hangout.description}
            </p>
          </div>

          {/* Participants */}
          <div>
            <h2 className="mb-3 font-display text-lg font-semibold text-foreground">
              Participantes
            </h2>
            <div className="flex flex-wrap gap-3">
              {participants.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5"
                >
                  <UserAvatar
                    name={p.display_name}
                    imageUrl={p.avatar_url}
                    size="sm"
                  />
                  <span className="text-xs font-medium text-foreground">
                    {p.display_name}
                  </span>
                </div>
              ))}
              {hangout.current_participants > 4 && (
                <div className="flex items-center rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground">
                  +{hangout.current_participants - 4} mais
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar / Actions */}
        <div className="lg:w-72">
          <div className="sticky top-20 flex flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
            <button
              onClick={() => toast.success("Voce entrou no role!")}
              disabled={isFull}
              className="flex items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              <CheckCircle2 className="h-4 w-4" />
              {isFull ? "Lotado" : "Participar"}
            </button>

            <button
              onClick={() => toast.info("Chat em breve!")}
              className="flex items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <MessageCircle className="h-4 w-4" />
              Chat do Role
            </button>

            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Link copiado!");
              }}
              className="flex items-center justify-center gap-2 rounded-lg border border-border py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <Share2 className="h-4 w-4" />
              Compartilhar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
