import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { opportunities } from "@/lib/opportunities";
import { useAppStore } from "@/lib/app-store";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/saved")({
  head: () => ({ meta: [{ title: "Saved — Connect" }] }),
  component: Saved,
});

function Saved() {
  const { saved, hydrated } = useAppStore();
  const list = opportunities.filter((o) => saved.includes(o.id));

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      <main className="mx-auto flex min-h-0 w-full max-w-md flex-1 flex-col overflow-y-auto overscroll-contain px-5 pb-4 pt-[max(2rem,env(safe-area-inset-top))]">
        <header className="mb-5 shrink-0">
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Bookmarked</p>
          <h1 className="font-display text-[28px] leading-none">Saved opportunities</h1>
        </header>

        {!hydrated ? null : list.length === 0 ? (
          <div className="grid place-items-center rounded-3xl border border-dashed border-border bg-card/60 p-10 text-center">
            <div>
              <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-secondary">
                <Bookmark className="h-5 w-5 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl">Nothing saved yet</h3>
              <p className="mt-1 text-[13px] text-muted-foreground">Tap the bookmark on any card to save it for later.</p>
            </div>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-3 pb-2">
            {list.map((o) => (
              <li key={o.id}>
                <Link
                  to="/opportunity/$id"
                  params={{ id: o.id }}
                  className="block overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft transition-transform active:scale-[0.99]"
                >
                  <div className={`h-20 bg-gradient-to-br ${o.accent}`} />
                  <div className="p-4">
                    <div className="text-[11px] text-muted-foreground">{o.author} · {o.postedAgo}</div>
                    <div className="line-clamp-2 text-[14px] font-medium leading-snug">{o.rewrittenTitle}</div>
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
