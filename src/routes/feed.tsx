import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, Sparkles } from "lucide-react";
import { opportunities } from "@/lib/opportunities";
import { actions } from "@/lib/app-store";
import { OpportunityCard } from "@/components/OpportunityCard";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/feed")({
  head: () => ({ meta: [{ title: "Discover — Connect" }] }),
  component: Feed,
});

function Feed() {
  const [index, setIndex] = useState(0);

  const stack = useMemo(() => opportunities, []);
  const remaining = stack.slice(index, index + 3);
  const current = stack[index];

  function handle(dir: "left" | "right") {
    if (!current) return;
    if (dir === "right") actions.like(current.id);
    else actions.pass(current.id);
    setIndex((i) => i + 1);
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden pt-[max(1rem,env(safe-area-inset-top))]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-aurora opacity-20 blur-3xl" />
        </div>

        <header className="mx-auto flex w-full max-w-md shrink-0 items-center justify-between px-5 pb-2">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Discover</p>
            <h1 className="font-display text-[22px] leading-none sm:text-[26px]">Today's stream</h1>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1.5 text-[11px] font-medium shadow-soft">
            <Sparkles className="h-3 w-3 text-accent" />
            {stack.length - index} new
          </div>
        </header>

        <section className="mx-auto flex min-h-0 w-full max-w-md flex-1 flex-col px-4 pb-2 sm:px-5">
          <div className="relative mx-auto min-h-0 w-full flex-1">
            <AnimatePresence mode="popLayout">
              {remaining.length === 0 ? (
                <EmptyState onReset={() => setIndex(0)} />
              ) : (
                remaining
                  .slice()
                  .reverse()
                  .map((opp, i) => {
                    const isActive = i === remaining.length - 1;
                    const stackIdx = remaining.length - 1 - i;
                    return (
                      <OpportunityCard
                        key={opp.id}
                        opp={opp}
                        active={isActive}
                        index={stackIdx}
                        onSwipe={handle}
                      />
                    );
                  })
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute inset-0 grid place-items-center rounded-[2rem] border border-dashed border-border bg-card/60 p-8 text-center"
    >
      <div>
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-aurora text-white">
          <Sparkles className="h-6 w-6" />
        </div>
        <h3 className="font-display text-2xl">You're all caught up</h3>
        <p className="mt-2 text-[13px] text-muted-foreground">
          AI is scanning the internet for fresh opportunities. Check back in a few hours.
        </p>
        <button
          onClick={onReset}
          className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-[12px] font-medium"
        >
          <RotateCcw className="h-3 w-3" /> Replay stream
        </button>
      </div>
    </motion.div>
  );
}
