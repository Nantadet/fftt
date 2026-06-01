import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";
import {
  CalendarDays,
  Diamond,
  Images,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SponsorTheme = "lanna" | "plain";

const navItems = [
  {
    to: "/home",
    label: "\u0e40\u0e01\u0e35\u0e48\u0e22\u0e27\u0e01\u0e31\u0e1a\u0e01\u0e34\u0e08\u0e01\u0e23\u0e23\u0e21",
    icon: Info,
  },
  {
    to: "/schedule",
    label: "\u0e01\u0e33\u0e2b\u0e19\u0e14\u0e01\u0e32\u0e23",
    icon: CalendarDays,
  },
  {
    to: "/moments",
    label: "\u0e1a\u0e23\u0e23\u0e22\u0e32\u0e01\u0e32\u0e28\u0e20\u0e32\u0e22\u0e43\u0e19\u0e07\u0e32\u0e19",
    icon: Images,
  },
  {
    to: "/packages",
    label: "\u0e41\u0e1e\u0e47\u0e01\u0e40\u0e01\u0e08\u0e2a\u0e1b\u0e2d\u0e19\u0e40\u0e0b\u0e2d\u0e23\u0e4c",
    icon: Diamond,
  },
];

function LogoMark({
  compact = false,
  theme = "lanna",
}: {
  compact?: boolean;
  theme?: SponsorTheme;
}) {
  if (theme === "plain") {
    return (
      <div
        className={cn(
          "flex flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-200 p-[2px] shadow-[0_14px_34px_rgba(15,23,42,0.18)]",
          compact ? "h-10 w-10" : "h-14 w-14",
        )}
      >
        <div className="flex h-full w-full items-center justify-center rounded-[0.9rem] bg-white/95 p-1.5">
          <img
            src="/HLLC logo.png"
            alt="HLLC 2026"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative isolate flex flex-shrink-0 items-center justify-center rounded-[1.35rem]",
        compact ? "h-10 w-10" : "h-16 w-16",
      )}
    >
      <div className="absolute -inset-1 rounded-[1.6rem] bg-amber-300/30 blur-md" />
      <div className="relative flex h-full w-full items-center justify-center rounded-[1.25rem] border border-amber-700/20 bg-[linear-gradient(135deg,#fffdf7_0%,#f7e7bd_48%,#c99434_100%)] p-[3px] shadow-[0_16px_34px_rgba(120,53,15,0.18)]">
        <div className="flex h-full w-full items-center justify-center rounded-[1rem] bg-stone-950 p-1.5 shadow-inner">
          <img
            src="/HLLC logo.png"
            alt="HLLC 2026"
            className="h-full w-full object-contain drop-shadow"
          />
        </div>
      </div>
    </div>
  );
}

export function SponsorSidebar({ theme = "lanna" }: { theme?: SponsorTheme }) {
  const isLanna = theme === "lanna";

  return (
    <aside
      className={cn(
        "overflow-hidden rounded-2xl border shadow-sm lg:sticky lg:top-6",
        isLanna
          ? "lanna-card border-amber-400/25 dark:border-amber-300/20 bg-white/95 dark:bg-stone-950/80 shadow-[0_22px_60px_rgba(180,120,9,0.10)] dark:shadow-[0_22px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl"
          : "bg-white",
      )}
    >
      <div
        className={cn(
          "hidden border-b px-4 py-4 lg:block",
          isLanna
            ? "border-amber-400/20 dark:border-amber-300/20 lanna-sidebar-header"
            : "bg-gradient-to-br from-white to-amber-50/70",
        )}
      >
        <div className="flex items-center gap-3">
          <LogoMark theme={theme} />
          <div className="min-w-0">
            <p className={cn("text-xl font-bold", isLanna ? "font-lanna text-stone-800 dark:text-amber-50" : "font-serif text-slate-950")}>HLLC 2026</p>
          </div>
        </div>
      </div>
      <nav className={cn("grid gap-1.5 p-3", isLanna && "lanna-side-rail")}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition",
                  isLanna
                    ? "relative text-stone-600 dark:text-amber-50/80 hover:bg-amber-200/25 dark:hover:bg-amber-300/10 hover:text-stone-800 dark:hover:text-amber-50"
                    : "text-slate-700 hover:bg-slate-100",
                  isActive &&
                    (isLanna
                      ? "bg-gradient-to-r from-amber-400/25 to-yellow-100/10 text-stone-800 dark:text-amber-50 shadow-[0_10px_24px_rgba(180,120,9,0.12)] dark:shadow-[0_10px_24px_rgba(0,0,0,0.18)] ring-1 ring-amber-400/30 dark:ring-amber-300/30"
                      : "bg-amber-100 text-amber-950 shadow-sm hover:bg-amber-100"),
                )
              }
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export function SponsorPageShell({
  children,
  theme = "lanna",
}: {
  children: ReactNode;
  theme?: SponsorTheme;
}) {
  const isLanna = theme === "lanna";

  return (
    <div
      className={cn(
        "min-h-screen",
        isLanna
          ? "lanna-shell text-stone-800 dark:text-amber-50"
          : "bg-[linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)] text-slate-950",
      )}
    >
      <header
        className={cn(
          "border-b backdrop-blur lg:hidden",
          isLanna ? "border-amber-400/20 dark:border-amber-300/20 bg-white/90 dark:bg-stone-950/90 shadow-sm" : "bg-white/90",
        )}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <LogoMark compact theme={theme} />
          <p className={cn("text-xl font-bold", isLanna ? "font-lanna text-stone-800 dark:text-amber-50" : "font-serif")}>HLLC 2026</p>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1440px] items-start gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:px-8">
        <SponsorSidebar theme={theme} />
        <main className="min-w-0 pb-10">{children}</main>
      </div>
    </div>
  );
}
