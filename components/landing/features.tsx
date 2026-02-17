import {
  MapPin,
  Camera,
  MessageCircle,
  Shield,
  Users,
  Star,
} from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Hangouts Perto de Voce",
    description:
      "Descubra roles incriveis na sua regiao. Filtre por categoria, data e distancia para encontrar o programa perfeito.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Camera,
    title: "Reels & Momentos",
    description:
      "Compartilhe fotos e videos dos seus encontros. Mostre as melhores experiencias e inspire outros a participar.",
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  {
    icon: MessageCircle,
    title: "Chat em Tempo Real",
    description:
      "Converse com os participantes antes, durante e depois dos hangouts. Mensagens privadas ou em grupo.",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    icon: Shield,
    title: "Seguranca em Primeiro Lugar",
    description:
      "Sistema de reputacao, verificacao de perfis e check-in nos eventos garantem experiencias seguras.",
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  },
  {
    icon: Users,
    title: "Comunidade Diversa",
    description:
      "De esportes a culinaria, de jogos a voluntariado. Encontre sua tribo entre centenas de categorias.",
    color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
  },
  {
    icon: Star,
    title: "Reputacao & Badges",
    description:
      "Ganhe badges participando de hangouts e receba avaliacoes. Quanto mais participa, mais confiavel fica.",
    color: "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
  },
];

export function Features() {
  return (
    <section className="bg-muted/30 py-20" id="features">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-14 text-center">
          <h2 className="mb-3 font-display text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Tudo que voce precisa para encontrar seu role
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-pretty">
            Uma plataforma completa para criar conexoes reais com pessoas
            incriveis perto de voce.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div
                className={`mb-4 inline-flex rounded-lg p-3 ${feature.color}`}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-card-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
