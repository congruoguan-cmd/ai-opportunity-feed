import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Code2, MapPin, Target } from "lucide-react";
import { actions } from "@/lib/app-store";

export const Route = createFileRoute("/profile-ready")({
  head: () => ({ meta: [{ title: "Your opportunity profile — Connect" }] }),
  component: ProfileReady,
});

const skills = ["React", "TypeScript", "AI/LLMs", "Product Design", "Node.js", "Postgres"];
const matches = [
  { label: "Startup hiring", v: 92 },
  { label: "AI teams", v: 88 },
  { label: "Cofounder search", v: 71 },
  { label: "Early-stage projects", v: 84 },
];

function ProfileReady() {
  const nav = useNavigate();
  return (
    <main className="relative min-h-screen overflow-hidden px-6 pt-[max(2rem,env(safe-area-inset-top))]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br from-primary to-fuchsia-500 opacity-30 blur-3xl" />
        <div className="absolute -right-16 top-40 h-72 w-72 rounded-full bg-gradient-to-br from-accent to-amber-300 opacity-30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-md pb-32">
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Step 4 of 4</p>
        <h1 className="mt-2 font-display text-[36px] leading-tight text-balance">
          Your Opportunity Profile
        </h1>
        <p className="mt-2 text-[14px] text-muted-foreground">
          Built from your LinkedIn + AI inferred career graph.
        </p>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mt-6 overflow-hidden rounded-3xl border border-border/70 bg-card-gradient p-6 shadow-card"
        >
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-aurora text-2xl font-bold text-white">
              YC
            </div>
            <div>
              <div className="text-[17px] font-semibold leading-tight">You</div>
              <div className="mt-1 flex items-center gap-1 text-[12px] text-muted-foreground">
                <Briefcase className="h-3 w-3" /> Senior Product Engineer
              </div>
              <div className="flex items-center gap-1 text-[12px] text-muted-foreground">
                <MapPin className="h-3 w-3" /> San Francisco, CA
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <Code2 className="h-3 w-3" /> Skills extracted
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span key={s} className="rounded-full border border-border bg-secondary px-3 py-1 text-[12px] font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-3 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <Target className="h-3 w-3" /> Opportunity match
            </div>
            <div className="space-y-2.5">
              {matches.map((m) => (
                <div key={m.label}>
                  <div className="mb-1 flex items-center justify-between text-[12px]">
                    <span className="text-foreground">{m.label}</span>
                    <span className="text-muted-foreground">{m.v}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${m.v}%` }}
                      transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
                      className="h-full rounded-full bg-aurora"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border/60 bg-background/80 px-6 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 backdrop-blur-xl">
        <div className="mx-auto max-w-md">
          <p className="mb-3 text-center text-[13px] text-muted-foreground">
            Your opportunity stream is ready.
          </p>
          <button
            onClick={() => { actions.setOnboarded(true); nav({ to: "/feed" }); }}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-foreground px-5 py-4 text-[15px] font-semibold text-background shadow-glow transition-transform active:scale-[0.98]"
          >
            Enter the stream <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </main>
  );
}
