import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Linkedin, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Connect — Opportunities hidden in the internet" },
      { name: "description", content: "AI scans LinkedIn, X, Reddit and more, then rebuilds the missed opportunities into a swipeable feed." },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  const nav = useNavigate();
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* aurora background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-aurora opacity-40 blur-3xl" />
        <div className="absolute -right-24 top-40 h-80 w-80 rounded-full bg-gradient-to-br from-accent to-rose-400 opacity-30 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-tr from-primary to-sky-400 opacity-25 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-md flex-col px-6 pb-10 pt-[max(2rem,env(safe-area-inset-top))]">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-foreground text-background">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Connect</span>
          </div>
          <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">v1 · beta</span>
        </header>

        <section className="flex flex-1 flex-col justify-center py-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-card px-3 py-1 text-[11px] font-medium text-muted-foreground shadow-soft">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent pulse-ring" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              AI is reading the internet right now
            </span>

            <h1 className="mt-6 font-display text-[44px] leading-[1.02] text-balance text-foreground">
              The opportunities <em>you missed</em><br /> are more than the ones you saw.
            </h1>

            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              AI is rebuilding your career world — pulling hidden hiring, cofounder, and
              collaboration signals from across the internet into one swipeable feed.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="mt-10 space-y-3"
          >
            <button
              onClick={() => nav({ to: "/scanning" })}
              className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-[#0A66C2] px-5 py-4 text-[15px] font-semibold text-white shadow-glow transition-transform active:scale-[0.98]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              <Linkedin className="h-5 w-5" />
              Continue with LinkedIn
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            <Link
              to="/scanning"
              className="block w-full rounded-2xl py-3 text-center text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Skip for now
            </Link>
          </motion.div>
        </section>

        <footer className="text-center text-[11px] text-muted-foreground">
          We don't show posts. We show opportunities hidden in the internet.
        </footer>
      </div>
    </main>
  );
}
