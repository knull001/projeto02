"use client";

import Link from "next/link";
import { MapPin, Calendar, Clock, Users } from "lucide-react";
import { CategoryBadge } from "./category-badge";
import { UserAvatar } from "./user-avatar";
import type { Hangout } from "@/lib/types";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

export function HangoutCard({ hangout }: { hangout: Hangout }) {
  const isFull = hangout.status === "full";
  const dateFormatted = format(parseISO(hangout.date), "d 'de' MMM", {
    locale: ptBR,
  });
  const spotsLeft = hangout.max_participants - hangout.current_participants;

  return (
    <Link
      href={`/hangouts/${hangout.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* Image / Color banner */}
      <div className="relative h-36 bg-gradient-to-br from-primary/20 via-primary/10 to-accent">
        {hangout.image_url && (
          <img
            src={hangout.image_url}
            alt={hangout.title}
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute left-3 top-3">
          <CategoryBadge category={hangout.category} />
        </div>
        {isFull && (
          <div className="absolute right-3 top-3 rounded-full bg-destructive px-2.5 py-0.5 text-xs font-semibold text-destructive-foreground">
            Lotado
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1.5 font-display text-base font-semibold text-card-foreground transition-colors group-hover:text-primary line-clamp-2">
          {hangout.title}
        </h3>

        <div className="mb-3 flex flex-col gap-1.5 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{hangout.location}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              <span>{dateFormatted}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              <span>{hangout.time}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-2">
            {hangout.creator && (
              <>
                <UserAvatar
                  name={hangout.creator.display_name}
                  imageUrl={hangout.creator.avatar_url}
                  size="sm"
                />
                <span className="text-xs text-muted-foreground">
                  {hangout.creator.display_name}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">
              {hangout.current_participants}/{hangout.max_participants}
            </span>
            {!isFull && spotsLeft <= 5 && (
              <span className="text-xs text-primary">
                {spotsLeft === 1 ? "1 vaga" : `${spotsLeft} vagas`}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
