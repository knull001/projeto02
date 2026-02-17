import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { AppHeader } from "@/components/app-header";
import { MobileNav } from "@/components/mobile-nav";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const userName =
    user.user_metadata?.display_name ||
    user.email?.split("@")[0] ||
    "Usuario";

  return (
    <div className="min-h-screen bg-background">
      <AppHeader userName={userName} />
      <main className="container mx-auto max-w-6xl px-4 pb-24 pt-6 md:pb-8">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}
