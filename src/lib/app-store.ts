// Tiny client-only store for saved & matched opportunities (localStorage).
import { useEffect, useState, useSyncExternalStore } from "react";

type State = {
  saved: string[];
  matches: string[];
  passed: string[];
  onboarded: boolean;
};

const KEY = "connect.state.v1";
const initial: State = { saved: [], matches: [], passed: [], onboarded: false };

let state: State = initial;
const listeners = new Set<() => void>();

function load() {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) state = { ...initial, ...JSON.parse(raw) };
  } catch {}
}
function persist() {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(state));
}
function emit() { listeners.forEach((l) => l()); }

export function setState(updater: (s: State) => State) {
  state = updater(state);
  persist();
  emit();
}

export function useAppStore() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { load(); setHydrated(true); emit(); }, []);
  const snap = useSyncExternalStore(
    (cb) => { listeners.add(cb); return () => listeners.delete(cb); },
    () => state,
    () => initial,
  );
  return { ...snap, hydrated };
}

export const actions = {
  save: (id: string) => setState((s) => s.saved.includes(id) ? s : { ...s, saved: [id, ...s.saved] }),
  unsave: (id: string) => setState((s) => ({ ...s, saved: s.saved.filter((x) => x !== id) })),
  like: (id: string) => setState((s) => ({
    ...s,
    matches: s.matches.includes(id) ? s.matches : [id, ...s.matches],
  })),
  pass: (id: string) => setState((s) => ({
    ...s,
    passed: s.passed.includes(id) ? s.passed : [id, ...s.passed],
  })),
  setOnboarded: (v: boolean) => setState((s) => ({ ...s, onboarded: v })),
  reset: () => setState(() => initial),
};
