import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/scanning")({
  head: () => ({ meta: [{ title: "AI is scanning your career — Connect" }] }),
  component: Scanning,
});

const steps = [
  "Reading LinkedIn profile…",
  "Extracting skills & experience…",
  "Crawling X, Reddit, YC for signals…",
  "Building your opportunity graph…",
];

function Scanning() {
  const nav = useNavigate();
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (i >= steps.length) {
      const t = setTimeout(() => nav({ to: "/profile-ready" }), 700);
      return () => clearTimeout(t);
    }
  }, [i, nav]);

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-foreground px-6 text-background">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-aurora blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm text-center">
        <div className="relative mx-auto mb-10 grid h-32 w-32 place-items-center">
          <span className="absolute inset-0 rounded-full border border-white/20" />
          <span className="absolute inset-0 rounded-full border border-white/20 pulse-ring" />
          <span className="absolute inset-2 rounded-full border border-white/10 pulse-ring" style={{ animationDelay: "0.6s" }} />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 rounded-full border-2 border-dashed border-white/30"
          />
          <div className="font-display text-3xl">AI</div>
        </div>

        <h1 className="font-display text-[34px] leading-tight text-balance">
          AI is scanning your career trajectory
        </h1>

        <ul className="mt-8 space-y-2 text-left">
          <AnimatePresence>
            {steps.slice(0, Math.min(i + 1, steps.length)).map((s, idx) => (
              <motion.li
                key={s}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[13px]"
              >
                <span className={`h-2 w-2 rounded-full ${idx < i ? "bg-success" : "bg-accent"} ${idx === i ? "animate-pulse" : ""}`} />
                <span className="opacity-90">{s}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </main>
  );
}
