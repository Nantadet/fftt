import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff5f5_0%,_#ffffff_35%,_#fffdfd_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-28 pt-4 sm:px-5">
        <header className="flex items-center justify-between rounded-[1.6rem] border border-slate-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur">
          <Link
            to="/"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50"
          >
            <BackIcon />
          </Link>

          <div className="text-center">
            <p className="font-nunito text-xl font-black tracking-[0.2em] text-red-500">WITH ME</p>
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">home page</p>
          </div>

          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50">
            <SearchIcon />
          </button>
        </header>

        <main className="mt-4 flex-1 space-y-4 pb-5">
          <section className="rounded-[2rem] border border-red-100 bg-white p-4 shadow-[0_16px_42px_rgba(239,68,68,0.08)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-500">Welcome,</p>
                <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900">Jasmine</h1>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                  <ShieldCheckIcon />
                  Verified community
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-gradient-to-br from-red-500 to-red-600 p-4 text-white shadow-lg shadow-red-200">
                <p className="text-[10px] uppercase tracking-[0.28em] text-red-100">Trust score</p>
                <p className="mt-1 text-3xl font-black leading-none">94</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <MetricCard label="Compatibility" value="92%" accent="red" />
              <MetricCard label="Reviews" value="4.9⭐" accent="rose" />
              <MetricCard label="Safety" value="A+" accent="slate" />
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                Filters
              </h2>
              <button className="text-xs font-semibold text-red-500">Reset</button>
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              <FilterChip active>Budget</FilterChip>
              <FilterChip>Travel style</FilterChip>
              <FilterChip>Verified only</FilterChip>
              <FilterChip>Safety</FilterChip>
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-bold text-slate-900">Suggested matches</h2>
              <span className="text-sm text-slate-400">See all</span>
            </div>

            <MatchCard
              name="Alex"
              age={29}
              location="Chiang Mai · Nature"
              compatibility="92%"
              rating="4.9"
              redFlag="Rare cancellations"
              verified
              accent="from-red-500 to-rose-500"
            />

            <MatchCard
              name="June"
              age={21}
              location="Bangkok · Nightlife"
              compatibility="87%"
              rating="4.7"
              redFlag="Budget mismatch"
              verified
              accent="from-rose-500 to-orange-400"
            />
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Why this match?</h2>
              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                Trust score 94
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <BreakdownRow label="Budget" value={88} />
              <BreakdownRow label="Travel style" value={95} />
              <BreakdownRow label="Personality" value={84} />
              <BreakdownRow label="Reviews" value={97} />
            </div>

            <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <span className="font-semibold text-slate-800">Review summary:</span> friendly, punctual, and easy to plan with.
            </div>
          </section>
        </main>
      </div>

      <button className="fixed bottom-24 right-4 z-20 rounded-full bg-gradient-to-r from-red-500 to-red-600 px-5 py-3 text-sm font-bold text-white shadow-[0_18px_30px_rgba(239,68,68,0.32)] transition hover:scale-[1.02]">
        SOS
      </button>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto grid max-w-md grid-cols-5 gap-1 px-3 py-2 text-[11px] text-slate-500">
          <NavItem to="/home" active label="Home" icon={<HomeIcon />} />
          <NavItem to="/matching" label="Matches" icon={<UsersIcon />} />
          <NavItem to="/trip" label="Trips" icon={<BagIcon />} />
          <NavItem to="/chat" label="Chat" icon={<ChatIcon />} />
          <NavItem to="/profile" label="Profile" icon={<ProfileIcon />} />
        </div>
      </nav>
    </div>
  );
}

function MetricCard({ label, value, accent }: { label: string; value: string; accent: "red" | "rose" | "slate" }) {
  const accents = {
    red: "bg-red-50 text-red-600",
    rose: "bg-rose-50 text-rose-600",
    slate: "bg-slate-50 text-slate-700",
  } as const;

  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 px-3 py-3 text-center">
      <div className={`mx-auto mb-2 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${accents[accent]}`}>
        {label}
      </div>
      <div className="text-lg font-black text-slate-900">{value}</div>
    </div>
  );
}

function FilterChip({ active = false, children }: { active?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition ${
        active
          ? "border-red-200 bg-red-50 text-red-600 shadow-sm"
          : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  );
}

function MatchCard({
  name,
  age,
  location,
  compatibility,
  rating,
  redFlag,
  verified,
  accent,
}: {
  name: string;
  age: number;
  location: string;
  compatibility: string;
  rating: string;
  redFlag: string;
  verified: boolean;
  accent: string;
}) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      <div className={`h-28 bg-gradient-to-br ${accent} p-4 text-white`}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/80">Compatibility</p>
            <p className="mt-2 text-4xl font-black leading-none">{compatibility}</p>
          </div>
          <div className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">
            {verified ? "Verified" : "Trust pending"}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-black text-slate-900">
              {name}, {age}
            </h3>
            <p className="mt-1 text-sm text-slate-500">{location}</p>
          </div>

          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Rating</p>
            <p className="mt-1 text-lg font-black text-slate-900">{rating}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <BadgePill tone="red">Verified badge</BadgePill>
          <BadgePill tone="slate">Trust score 91</BadgePill>
          <BadgePill tone="rose">{redFlag}</BadgePill>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-slate-500">
          <div className="rounded-2xl bg-slate-50 px-3 py-2 text-center">
            <span className="block font-semibold text-slate-800">Budget</span>
            88%
          </div>
          <div className="rounded-2xl bg-slate-50 px-3 py-2 text-center">
            <span className="block font-semibold text-slate-800">Style</span>
            93%
          </div>
          <div className="rounded-2xl bg-slate-50 px-3 py-2 text-center">
            <span className="block font-semibold text-slate-800">Respect</span>
            96%
          </div>
        </div>
      </div>
    </article>
  );
}

function BreakdownRow({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-600">{label}</span>
        <span className="font-semibold text-slate-900">{value}%</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-slate-100">
        <div className="h-2 rounded-full bg-gradient-to-r from-red-500 to-rose-500" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function BadgePill({ tone, children }: { tone: "red" | "rose" | "slate"; children: ReactNode }) {
  const tones = {
    red: "bg-red-50 text-red-600",
    rose: "bg-rose-50 text-rose-600",
    slate: "bg-slate-50 text-slate-600",
  } as const;

  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

function NavItem({
  to,
  label,
  icon,
  active = false,
}: {
  to: string;
  label: string;
  icon: ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 transition ${
        active ? "text-red-600" : "text-slate-400 hover:text-slate-600"
      }`}
    >
      <span className={active ? "scale-110" : ""}>{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}

function BackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9.5 12l1.8 1.8L15 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 11l8-6 8 6v8a1 1 0 01-1 1h-5v-5H10v5H5a1 1 0 01-1-1v-8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 19a4.5 4.5 0 018.9 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14 19a3.7 3.7 0 017.4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 8h10l1 11H6L7 8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 8V7a3 3 0 016 0v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 5h14a2 2 0 012 2v8a2 2 0 01-2 2H11l-5 4v-4H5a2 2 0 01-2-2V7a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 20a7 7 0 0114 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
