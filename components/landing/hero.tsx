import Link from "next/link";
import { ArrowRight, Shield, Users, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pb-20 pt-32">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -right-20 top-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex animate-fade-in items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Conecte-se com pessoas reais
          </div>

          {/* Heading */}
          <h1 className="mb-6 max-w-4xl font-display text-4xl font-bold tracking-tight text-foreground opacity-0 animate-fade-in text-balance sm:text-5xl md:text-6xl lg:text-7xl [animation-delay:100ms]">
            Encontre seu proximo{" "}
            <span className="text-primary">role</span> perfeito
          </h1>

          {/* Subtitle */}
          <p className="mb-10 max-w-2xl text-lg text-muted-foreground opacity-0 animate-fade-in text-pretty sm:text-xl [animation-delay:200ms]">
            Crie e participe de encontros incriveis perto de voce. De esportes a
            gastronomia, encontre pessoas com os mesmos interesses e viva
            experiencias reais.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 opacity-0 animate-fade-in sm:flex-row [animation-delay:300ms]">
            <Link
              href="/auth/sign-up"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
            >
              Comecar agora
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-8 py-3.5 text-base font-semibold text-foreground transition-all hover:bg-accent"
            >
              Ja tenho conta
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 opacity-0 animate-fade-in text-sm text-muted-foreground [animation-delay:400ms]">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-500" />
              Verificacao de seguranca
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Comunidade ativa
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              100% gratuito
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
