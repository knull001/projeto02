import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-16 text-center shadow-2xl shadow-primary/20 sm:px-12">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary-foreground/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-primary-foreground/10 blur-2xl" />

          <div className="relative">
            <h2 className="mb-4 font-display text-3xl font-bold text-primary-foreground sm:text-4xl text-balance">
              Pronto para o seu proximo role?
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-lg text-primary-foreground/80 text-pretty">
              Junte-se a milhares de pessoas que ja estao vivendo experiencias
              incriveis. Cadastre-se agora e encontre seu proximo hangout!
            </p>
            <Link
              href="/auth/sign-up"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-foreground px-8 py-3.5 text-base font-semibold text-primary shadow-lg transition-all hover:bg-primary-foreground/90 hover:shadow-xl"
            >
              Criar conta gratuita
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
