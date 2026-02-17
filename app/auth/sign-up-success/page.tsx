import Link from "next/link";
import { MailCheck } from "lucide-react";

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 inline-flex rounded-full bg-emerald-100 p-4 dark:bg-emerald-900/30">
          <MailCheck className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h1 className="mb-3 font-display text-2xl font-bold text-foreground">
          Verifique seu email
        </h1>
        <p className="mb-8 text-muted-foreground text-pretty">
          Enviamos um link de confirmacao para o seu email. Clique nele para
          ativar sua conta e comecar a usar o RoleMatch.
        </p>
        <Link
          href="/auth/login"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Ir para o login
        </Link>
      </div>
    </div>
  );
}
