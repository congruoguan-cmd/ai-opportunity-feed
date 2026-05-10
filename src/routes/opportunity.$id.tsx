import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Bookmark, Copy, RefreshCw, Send, Sparkles } from "lucide-react";
import { opportunities, sourceMeta, type Opportunity } from "@/lib/opportunities";
import { actions, useAppStore } from "@/lib/app-store";
import { SourceBadge } from "@/components/SourceBadge";

export const Route = createFileRoute("/opportunity/$id")({
  loader: ({ params }) => {
    const opp = opportunities.find((o) => o.id === params.id);
    if (!opp) throw notFound();
    return { opp };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.opp.rewrittenTitle} — Connect` : "Opportunity" },
      { name: "description", content: loaderData?.opp.summary ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center p-6 text-center">
      <div>
        <h1 className="font-display text-3xl">Opportunity not found</h1>
        <Link to="/feed" className="mt-4 inline-block text-sm underline">Back to feed</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="grid min-h-screen place-items-center p-6 text-center">
        <div>
          <p>{error.message}</p>
          <button onClick={() => { router.invalidate(); reset(); }} className="mt-4 underline">Retry</button>
        </div>
      </div>
    );
  },
  component: Detail,
});

const tones = ["casual", "formal", "bold"] as const;

function Detail() {
  const { opp } = Route.useLoaderData() as { opp: Opportunity };
  const { saved } = useAppStore();
  const isSaved = saved.includes(opp.id);
  const [tone, setTone] = useState<typeof tones[number]>("casual");
  const [dm, setDm] = useState(opp.suggestedDM);

  function regenerate(t: typeof tones[number]) {
    setTone(t);
    const variants: Record<typeof tones[number], string> = {
      casual: opp.suggestedDM,
      formal: `Hello ${opp.author.split(" ")[0]}, I came across your recent post on ${sourceMeta[opp.source].label}. My background closely aligns with what you described, and I would welcome the opportunity to connect and discuss further.`,
      bold: `${opp.author.split(" ")[0]} — your post is exactly the kind of thing I want to be part of. I ship fast, I care about craft, and I think we should talk this week.`,
    };
    setDm(variants[t]);
  }

  return (
    <main className="relative min-h-screen pb-32">
      <div className={`relative h-64 w-full bg-gradient-to-br ${opp.accent}`}>
        <div className="absolute inset-0 bg-glow" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 pt-[max(1rem,env(safe-area-inset-top))]">
          <Link to="/feed" className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <button
            onClick={() => (isSaved ? actions.unsave(opp.id) : actions.save(opp.id))}
            className={`grid h-10 w-10 place-items-center rounded-full backdrop-blur ${
              isSaved ? "bg-white text-foreground" : "bg-white/15 text-white"
            }`}
          >
            <Bookmark className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <div className="mb-3 flex items-center gap-3">
            <SourceBadge source={opp.source} />
            <div className="text-sm">
              <div className="font-semibold leading-tight">{opp.author}</div>
              <div className="text-[11px] opacity-80">{opp.authorRole} · {opp.postedAgo}</div>
            </div>
          </div>
          <h1 className="font-display text-[28px] leading-tight text-balance">{opp.rewrittenTitle}</h1>
        </div>
      </div>

      <div className="mx-auto -mt-6 max-w-md space-y-4 px-5">
        <div className="flex flex-wrap gap-1.5">
          {opp.tags.map((t) => (
            <span key={t} className="rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
              {t}
            </span>
          ))}
        </div>

        <Section title="Original post">
          <p className="text-[14px] leading-relaxed text-muted-foreground">"{opp.originalPost}"</p>
          <div className="mt-3 text-[11px] uppercase tracking-wider text-muted-foreground">
            via {sourceMeta[opp.source].label}
          </div>
        </Section>

        <Section title="AI interpretation" icon={<Sparkles className="h-3.5 w-3.5 text-accent" />}>
          <p className="text-[14px] leading-relaxed">{opp.aiInterpretation}</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Stat label="Signal score" value={`${opp.signalScore}/100`} accent />
            <Stat label="Urgency" value={opp.urgency} />
            <Stat label="Type" value={opp.type} />
            <Stat label="Stage" value={opp.stage} />
          </div>
        </Section>

        <Section title="Hidden signals">
          <ul className="divide-y divide-border">
            {opp.hiddenSignals.map((s) => (
              <li key={s.label} className="flex items-center justify-between py-2.5 text-[13px]">
                <span className="text-muted-foreground">{s.label}</span>
                <span className="font-medium">{s.value}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Suggested connect message">
          <div className="mb-3 flex gap-1.5">
            {tones.map((t) => (
              <button
                key={t}
                onClick={() => regenerate(t)}
                className={`rounded-full border px-3 py-1 text-[11px] font-medium capitalize transition-all ${
                  tone === t
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-muted-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <textarea
            value={dm}
            onChange={(e) => setDm(e.target.value)}
            rows={5}
            className="w-full resize-none rounded-2xl border border-border bg-secondary/60 p-4 text-[14px] leading-relaxed text-foreground outline-none focus:border-foreground"
          />
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => regenerate(tone)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-card py-2.5 text-[13px] font-medium"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Regenerate
            </button>
            <button
              onClick={() => navigator.clipboard?.writeText(dm)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-card py-2.5 text-[13px] font-medium"
            >
              <Copy className="h-3.5 w-3.5" /> Copy
            </button>
          </div>
          <button
            onClick={() => actions.like(opp.id)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-aurora py-3.5 text-[14px] font-semibold text-white shadow-glow"
          >
            <Send className="h-4 w-4" /> Send via {sourceMeta[opp.source].label}
          </button>
        </Section>
      </div>
    </main>
  );
}

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-border/70 bg-card p-5 shadow-soft">
      <div className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {icon} {title}
      </div>
      {children}
    </section>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl p-3 ${accent ? "bg-aurora text-white" : "bg-secondary"}`}>
      <div className={`text-[10px] uppercase tracking-wider ${accent ? "text-white/80" : "text-muted-foreground"}`}>
        {label}
      </div>
      <div className="mt-0.5 text-[15px] font-semibold capitalize">{value}</div>
    </div>
  );
}
