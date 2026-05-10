import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { opportunities } from "@/lib/opportunities";
import { useAppStore } from "@/lib/app-store";
import { BottomNav } from "@/components/BottomNav";
import { SourceBadge } from "@/components/SourceBadge";

export const Route = createFileRoute("/matches")({
  head: () => ({ meta: [{ title: "Matches — Connect" }] }),
  component: Matches,
});

function Matches() {
  const { matches, hydrated } = useAppStore();
  const list = opportunities.filter((o) => matches.includes(o.id));

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      <main className="mx-auto flex min-h-0 w-full max-w-md flex-1 flex-col overflow-y-auto overscroll-contain px-5 pb-4 pt-[max(2rem,env(safe-area-inset-top))]">
        <header className="mb-5 shrink-0">
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Mutual interest</p>
          <h1 className="font-display text-[28px] leading-none">Matches</h1>
        </header>

        {!hydrated ? null : list.length === 0 ? (
          <Empty />
        ) : (
          <ul className="space-y-3 pb-2">
            {list.map((o) => (
              <li key={o.id}>
                <Link
                  to="/opportunity/$id"
                  params={{ id: o.id }}
                  className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-4 shadow-soft transition-transform active:scale-[0.99]"
                >
                  <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${o.accent} text-white`}>
                    <SourceBadge source={o.source} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] text-muted-foreground">{o.author} · {o.postedAgo}</div>
                    <div className="line-clamp-2 text-[14px] font-medium leading-snug">{o.rewrittenTitle}</div>
                    <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-accent">
                      Tap to send a message
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>

      <BottomNav />
    </div>
  );
}

function Empty() {
  return (
    <div className="grid place-items-center rounded-3xl border border-dashed border-border bg-card/60 p-10 text-center">
      <div>
        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-secondary">
          <MessageCircle className="h-5 w-5 text-muted-foreground" />
        </div>
        <h3 className="font-display text-xl">No matches yet</h3>
        <p className="mt-1 text-[13px] text-muted-foreground">Swipe right on opportunities to start a conversation.</p>
        <Link to="/feed" className="mt-4 inline-block rounded-full bg-foreground px-4 py-2 text-[12px] font-medium text-background">
          Open the feed
        </Link>
      </div>
    </div>
  );
}
