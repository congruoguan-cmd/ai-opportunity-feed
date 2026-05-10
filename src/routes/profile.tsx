import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronRight, LogOut, Settings, Sparkles } from "lucide-react";
import { actions, useAppStore } from "@/lib/app-store";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Connect" }] }),
  component: Profile,
});

const skills = ["React", "TypeScript", "AI/LLMs", "Product Design", "Node.js", "Postgres"];
const interests = ["AI infra", "Design engineering", "Cofounder", "Seed-stage"];

function Profile() {
  const { saved, matches, passed } = useAppStore();
  const nav = useNavigate();

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      <main className="mx-auto flex min-h-0 w-full max-w-md flex-1 flex-col overflow-y-auto overscroll-contain px-5 pb-4 pt-[max(2rem,env(safe-area-inset-top))]">
        <header className="mb-5 flex shrink-0 items-center justify-between">
          <h1 className="font-display text-[28px] leading-none">Profile</h1>
          <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-muted-foreground">
            <Settings className="h-4 w-4" />
          </button>
        </header>

        <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-card p-5 shadow-card">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-aurora opacity-20 blur-2xl" />
          <div className="relative flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-aurora text-2xl font-bold text-white">YC</div>
            <div>
              <div className="text-[17px] font-semibold">You</div>
              <div className="text-[12px] text-muted-foreground">Senior Product Engineer · SF</div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-secondary/40">
            <Stat n={matches.length} l="Matches" />
            <Stat n={saved.length} l="Saved" />
            <Stat n={passed.length} l="Passed" />
          </div>
        </section>

        <Section title="Skills (AI extracted)">
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <span key={s} className="rounded-full border border-border bg-secondary px-3 py-1 text-[12px] font-medium">{s}</span>
            ))}
          </div>
        </Section>

        <Section title="Opportunity preferences">
          <div className="flex flex-wrap gap-1.5">
            {interests.map((s) => (
              <span key={s} className="inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1 text-[12px] font-medium text-background">
                <Sparkles className="h-3 w-3" /> {s}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Account">
          <Row label="Refine my profile" />
          <Row label="Notification preferences" />
          <Row label="Linked accounts" />
        </Section>

        <button
          type="button"
          onClick={() => { actions.reset(); nav({ to: "/" }); }}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card py-3 text-[13px] font-medium text-muted-foreground"
        >
          <LogOut className="h-4 w-4" /> Reset & restart onboarding
        </button>
      </main>

      <BottomNav />
    </div>
  );
}

function Stat({ n, l }: { n: number; l: string }) {
  return (
    <div className="px-3 py-3 text-center">
      <div className="font-display text-2xl">{n}</div>
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{l}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-4 rounded-3xl border border-border/70 bg-card p-5 shadow-soft">
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{title}</div>
      {children}
    </section>
  );
}

function Row({ label }: { label: string }) {
  return (
    <button className="flex w-full items-center justify-between border-b border-border py-3 text-[14px] last:border-0">
      <span>{label}</span>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}
