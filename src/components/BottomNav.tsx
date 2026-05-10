import { Link, useLocation } from "@tanstack/react-router";
import { Flame, MessageCircle, Bookmark, User } from "lucide-react";

const items = [
  { to: "/feed", label: "Discover", icon: Flame },
  { to: "/matches", label: "Matches", icon: MessageCircle },
  { to: "/saved", label: "Saved", icon: Bookmark },
  { to: "/profile", label: "Profile", icon: User },
] as const;

/** 底部文档流导航：贴在手机屏幕底栏，配合外层 flex 布局，不再使用 fixed 悬浮在视窗外 */
export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="relative z-40 shrink-0 border-t border-border/50 bg-background/95 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="glass mx-auto flex max-w-md items-center justify-center gap-0.5 px-2 pb-1">
        {items.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || (to === "/feed" && pathname.startsWith("/opportunity"));
          return (
            <Link
              key={to}
              to={to}
              className={`group relative flex h-10 min-w-0 flex-1 items-center justify-center gap-1 rounded-full px-2 text-[11px] font-medium transition-all sm:gap-2 sm:px-3 ${
                active ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="hidden truncate sm:inline">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
