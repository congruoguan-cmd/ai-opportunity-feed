import { sourceMeta, type Source } from "@/lib/opportunities";

export function SourceBadge({ source }: { source: Source }) {
  const m = sourceMeta[source];
  return (
    <span className={`inline-flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold ${m.color}`}>
      {m.letter}
    </span>
  );
}
