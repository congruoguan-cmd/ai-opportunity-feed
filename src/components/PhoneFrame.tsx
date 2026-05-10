import type { ReactNode } from "react";

/**
 * iPhone X / 11 Pro 逻辑尺寸：375×812（CSS px）。
 * 机身主要靠 box-shadow 模拟，尽量不撑破 375 宽视口。
 * 宽度小于 375px：满屏无框；宽度不小于 375px：居中手机壳，屏高约 812（不超过可视高度）。
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-background max-[374px]:min-h-dvh min-[375px]:flex min-[375px]:min-h-dvh min-[375px]:items-center min-[375px]:justify-center min-[375px]:overflow-x-hidden min-[375px]:bg-[radial-gradient(ellipse_100%_90%_at_50%_10%,oklch(0.72_0.08_260),oklch(0.42_0.06_260),oklch(0.22_0.04_280))] min-[375px]:px-3 min-[375px]:py-6">
      <div className="relative mx-auto w-full max-[374px]:max-w-none min-[375px]:w-[375px] min-[375px]:max-w-[min(375px,100vw)] min-[375px]:shrink-0">
        {/* 金属感外圈 + 侧影（不占布局宽度） */}
        <div
          className="hidden min-[375px]:block pointer-events-none absolute -inset-[2px] rounded-[2.85rem] bg-gradient-to-b from-zinc-300 via-zinc-500 to-zinc-700 shadow-[0_40px_90px_-25px_rgba(0,0,0,0.75)]"
          aria-hidden
        />

        <div className="relative rounded-none max-[374px]:min-h-dvh min-[375px]:h-[min(812px,calc(100dvh-3rem))] min-[375px]:overflow-hidden min-[375px]:rounded-[2.35rem] min-[375px]:bg-zinc-950 min-[375px]:shadow-[0_0_0_11px_#52525b,0_0_0_13px_#0a0a0a,0_50px_100px_-30px_rgba(0,0,0,0.85)]">
          <div
            className="pointer-events-none absolute left-1/2 top-[14px] z-[60] hidden h-[30px] w-[118px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_2px_6px_rgba(255,255,255,0.07)] min-[375px]:block"
            aria-hidden
          />

          <div className="relative flex min-h-dvh min-[375px]:min-h-0 min-[375px]:h-full flex-col overflow-hidden min-[375px]:rounded-[2.05rem]">
            {/* 整屏 flex：子路由用 flex-1 + 内部滚动，底栏始终在机身内 */}
            <div className="flex min-h-dvh flex-1 flex-col overflow-hidden min-[375px]:min-h-0">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
