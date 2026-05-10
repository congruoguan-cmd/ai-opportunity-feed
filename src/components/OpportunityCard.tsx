import { motion, useMotionValue, useTransform, type PanInfo } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Opportunity } from "@/lib/opportunities";
import { sourceMeta } from "@/lib/opportunities";

interface Props {
  opp: Opportunity;
  onSwipe?: (dir: "left" | "right") => void;
  active?: boolean;
  index?: number;
}

const orbStyles = ["bg-sunset", "bg-cool", "bg-warm", "bg-orb", "bg-sunset"];

export function OpportunityCard({ opp, onSwipe, active = true, index = 0 }: Props) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-6, 0, 6]);
  const likeOpacity = useTransform(x, [20, 120], [0, 1]);
  const passOpacity = useTransform(x, [-120, -20], [1, 0]);

  function onDragEnd(_: unknown, info: PanInfo) {
    const t = 110;
    if (info.offset.x > t) onSwipe?.("right");
    else if (info.offset.x < -t) onSwipe?.("left");
  }

  const orb = orbStyles[parseInt(opp.id.replace(/\D/g, ""), 10) % orbStyles.length];

  return (
    <motion.div
      className="absolute inset-0"
      style={{ x: active ? x : 0, rotate: active ? rotate : 0, zIndex: 10 - index }}
      initial={false}
      animate={{ scale: 1 - index * 0.02, y: index * 6, opacity: index > 2 ? 0 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      drag={active ? "x" : false}
      dragElastic={0.6}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={onDragEnd}
    >
      <Link
        to="/opportunity/$id"
        params={{ id: opp.id }}
        draggable={false}
        className="block h-full w-full"
        onClick={(e) => { if (Math.abs(x.get()) > 6) e.preventDefault(); }}
      >
        <div className="relative mx-auto flex h-full w-full max-w-[min(340px,100%)] flex-col overflow-hidden rounded-[1.65rem] border border-border/70 bg-card shadow-card sm:max-w-none sm:rounded-[1.85rem]">
          {/* swipe affordances */}
          <motion.div
            style={{ opacity: likeOpacity }}
            className="absolute right-5 top-5 z-10 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-primary-foreground"
          >
            Interested
          </motion.div>
          <motion.div
            style={{ opacity: passOpacity }}
            className="absolute left-5 top-5 z-10 rounded-full border border-foreground/20 bg-background px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-foreground"
          >
            Pass
          </motion.div>

          {/* big AI summary */}
          <div className="px-5 pb-4 pt-5 sm:px-6 sm:pb-5 sm:pt-6">
            <p className="font-display text-[26px] leading-[1.02] text-balance text-foreground sm:text-[30px]">
              {opp.rewrittenTitle}
            </p>
          </div>

          {/* link thumbnail card with soft orb */}
          <div className="mx-4 mb-4 mt-auto overflow-hidden rounded-xl border border-border bg-background sm:mx-5 sm:mb-5 sm:rounded-2xl">
            <div className={`relative h-[5.5rem] w-full sm:h-28 ${orb}`}>
              <div className="absolute inset-0 bg-[radial-gradient(transparent_60%,oklch(0_0_0/0.04))]" />
            </div>
            <div className="flex items-center gap-3 px-4 py-3.5">
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13px] font-semibold text-foreground">
                  {opp.originalTitle}
                </div>
                <div className="truncate text-[11px] text-muted-foreground">
                  {sourceMeta[opp.source].label.toLowerCase()} · {opp.author} · {opp.postedAgo}
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
