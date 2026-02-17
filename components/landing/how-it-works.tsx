import { UserPlus, Search, PartyPopper } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Crie sua conta",
    description:
      "Cadastre-se em segundos, personalize seu perfil e escolha seus interesses favoritos.",
  },
  {
    icon: Search,
    step: "02",
    title: "Encontre um role",
    description:
      "Explore hangouts por categoria, localizacao e data. Ou crie o seu proprio!",
  },
  {
    icon: PartyPopper,
    step: "03",
    title: "Participe e se divirta",
    description:
      "Faca check-in no evento, conheca pessoas incriveis e compartilhe seus momentos.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20" id="how-it-works">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-14 text-center">
          <h2 className="mb-3 font-display text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Como funciona
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-pretty">
            Tres passos simples para comecar a viver experiencias incriveis.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.step} className="relative text-center">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute left-1/2 top-10 hidden h-0.5 w-full bg-border md:block" />
              )}

              <div className="relative mb-4 inline-flex flex-col items-center">
                <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
                  <step.icon className="h-9 w-9 text-primary" />
                </div>
                <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {step.step}
                </span>
              </div>
              <h3 className="mb-2 font-display text-xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mx-auto max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
