import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff5f5_0%,_#ffffff_35%,_#fffdfd_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-28 pt-4 sm:px-5">
        <header className="flex items-center justify-between rounded-[1.6rem] border border-slate-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-300 to-orange-300 flex items-center justify-center text-sm font-bold text-white overflow-hidden">
              👩
            </div>
          </div>

          <div className="text-center">
            <p className="font-nunito text-xl font-black tracking-[0.2em] text-red-500">WITH ME</p>
          </div>

          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50">
            <BellIcon />
          </button>
        </header>

        <main className="mt-4 flex-1 space-y-4 pb-5">
          {/* Banner Section */}
          <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-rose-300 to-orange-300 p-5 shadow-sm">
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex-1">
                <h1 className="text-xl font-black leading-tight text-white">
                  Find Your Ideal<br />Travel Buddy
                </h1>
                <p className="mt-2 text-xs text-white/90">
                  Compatibility matching<br />for safe, fun trips.
                </p>
                <button
                  onClick={() => navigate("/matching")}
                  className="mt-3 rounded-xl bg-red-500 px-5 py-2 text-xs font-bold text-white shadow-md transition hover:bg-red-600"
                >
                  Find a Buddy
                </button>
              </div>
              <div className="h-24 w-24 rounded-full bg-white/20 flex items-center justify-center text-5xl overflow-hidden">
                👩‍🦱
              </div>
            </div>
          </section>

          {/* Suggested Matches - Horizontal scroll cards */}
          <section>
            <div className="flex items-center justify-between px-1 mb-3">
              <h2 className="text-lg font-bold text-slate-900">Suggested Matches</h2>
              <button 
                onClick={() => navigate("/matching")}
                className="text-sm text-slate-400 hover:text-red-500 transition"
              >
                See all →
              </button>
            </div>

            <div className="space-y-3">
              <MatchRow
                name="Lisa"
                age={26}
                location="Bangkok, Thailand"
                compatibility="92%"
                tags={["Beach Lover", "Foodie", "Easy-going"]}
                premium
                imageColor="from-rose-400 to-pink-400"
              />
              <MatchRow
                name="Tom"
                age={29}
                location="Chiang Mai, Thailand"
                compatibility="87%"
                tags={["Adventure", "Budget-Friendly"]}
                imageColor="from-blue-400 to-cyan-400"
              />
              <MatchRow
                name="Kate"
                age={25}
                location="Phuket, Thailand"
                compatibility="90%"
                tags={["Culture Enthusiast", "Budget-Friendly"]}
                imageColor="from-emerald-400 to-teal-400"
              />
            </div>
          </section>

          {/* Upcoming Trips */}
          <section>
            <div className="flex items-center justify-between px-1 mb-3">
              <h2 className="text-lg font-bold text-slate-900">Upcoming Trips</h2>
              <button 
                onClick={() => navigate("/trips")}
                className="text-sm text-slate-400 hover:text-red-500 transition"
              >
                See all →
              </button>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-xl font-bold text-white">
                  T
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900">Tom, 29</h3>
                    <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-semibold text-amber-600">
                      ⏳ Awaiting Agreement
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">Bali, 28 May, 1</p>
                </div>
                <div className="shrink-0 text-center">
                  <div className="h-12 w-12 rounded-full border-2 border-red-400 flex items-center justify-center">
                    <span className="text-xs font-black text-red-500">87%</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button 
                  onClick={() => navigate("/profile")}
                  className="flex-1 rounded-xl border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  View Profile
                </button>
                <button 
                  onClick={() => navigate("/trip")}
                  className="flex-1 rounded-xl bg-gradient-to-r from-red-500 to-red-600 py-2 text-xs font-bold text-white shadow-sm transition hover:from-red-600 hover:to-red-700"
                >
                  Send Request
                </button>
              </div>
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
          <NavItem to="/chat" label="Chat" icon={<ChatIcon />} />
          <NavItem to="/trips" label="Trips" icon={<BagIcon />} />
          <NavItem to="/organizer" label="Organizer" icon={<CrownIcon />} />
        </div>
      </nav>
    </div>
  );
}

function MatchRow({
  name,
  age,
  location,
  compatibility,
  tags,
  premium,
  imageColor,
}: {
  name: string;
  age: number;
  location: string;
  compatibility: string;
  tags: string[];
  premium?: boolean;
  imageColor: string;
}) {
  const navigate = useNavigate();
  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className={`h-14 w-14 shrink-0 rounded-xl bg-gradient-to-br ${imageColor} flex items-center justify-center text-lg font-bold text-white`}>
          {name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-black text-slate-900">{name}, {age}</h3>
            {premium && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                <span>⭐</span> Premium filter
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
            <LocationPinIcon />
            {location}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full bg-red-50 px-2.5 py-0.5 text-[11px] font-medium text-red-600">
                {tag === "Beach Lover" ? "❤️ " : ""}{tag}
              </span>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <button 
              onClick={() => navigate("/profile")}
              className="flex-1 rounded-lg border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              View Profile
            </button>
            <button 
              onClick={() => navigate("/chat")}
              className="flex-1 rounded-lg bg-red-500 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-red-600"
            >
              Send Request
            </button>
          </div>
        </div>
        <div className="shrink-0 text-center">
          <div className="h-12 w-12 rounded-full border-2 border-red-400 flex flex-col items-center justify-center">
            <span className="text-sm font-black text-red-500">{compatibility}</span>
          </div>
          <span className="text-[9px] text-slate-400">Compatible</span>
        </div>
      </div>
    </article>
  );
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

function LocationPinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth="2" />
      <path d="M12 21c4-4 8-8 8-12a8 8 0 10-16 0c0 4 4 8 8 12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 11l8-6 8 6v8a1 1 0 01-1 1h-5v-5H10v5H5a1 1 0 01-1-1v-8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 19a4.5 4.5 0 018.9 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14 19a3.7 3.7 0 017.4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 8h10l1 11H6L7 8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 8V7a3 3 0 016 0v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 5h14a2 2 0 012 2v8a2 2 0 01-2 2H11l-5 4v-4H5a2 2 0 01-2-2V7a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function CrownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 16L3 5l5.5 3L12 4l3.5 4L21 5l-2 11H5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
