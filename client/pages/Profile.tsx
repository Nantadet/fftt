import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff5f5_0%,_#ffffff_35%,_#fffdfd_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-28 pt-4 sm:px-5">
        {/* Header */}
        <header className="flex items-center justify-between rounded-[1.6rem] border border-slate-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50"
          >
            <BackIcon />
          </button>

          <div className="text-center">
            <p className="font-nunito text-xl font-black tracking-[0.2em] text-red-500">WITH ME</p>
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Profile</p>
          </div>

          {/* User Icon - กดไปหน้า Verification */}
          <button 
            onClick={() => navigate("/verification")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50"
          >
            <UserIcon />
          </button>
        </header>

        <main className="mt-4 flex-1 space-y-4 pb-5">
          {/* Profile Card - แบบในรูป */}
          <section className="rounded-[2rem] border border-red-100 bg-white p-5 shadow-[0_16px_42px_rgba(239,68,68,0.08)]">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center text-2xl font-bold text-white">
                A
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-black text-slate-900">Anna Lee</h1>
                <p className="text-sm text-slate-500">Verified traveler</p>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                  <span>✓</span>
                  <span>Verified</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">Trust score</p>
                <p className="text-2xl font-black text-red-500">97</p>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-center">
                <p className="text-xs text-slate-400 mb-1">Travel Mindset</p>
                <p className="text-sm font-bold text-slate-900">Balanced</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-center">
                <p className="text-xs text-slate-400 mb-1">Budget</p>
                <p className="text-sm font-bold text-slate-900">$500-1,000</p>
              </div>
            </div>
          </section>

          {/* Compatibility Indicators */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 mb-4">
              Compatibility Indicators
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Travel pace</span>
                <span className="text-sm font-bold text-slate-900">Balanced</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Budget level</span>
                <span className="text-sm font-bold text-slate-900">Medium</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Group style</span>
                <span className="text-sm font-bold text-slate-900">Small group</span>
              </div>
            </div>
          </section>

          {/* Travel History */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3">
              Travel History
            </h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Chiang Mai, Thailand
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Bangkok, Thailand
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Phuket, Thailand
              </div>
            </div>
          </section>

          {/* Edit Profile Button */}
          <button 
            onClick={() => navigate("/onboarding")}
            className="w-full rounded-2xl bg-gradient-to-r from-red-500 to-red-600 py-4 font-nunito text-lg font-bold text-white shadow-[0_18px_30px_rgba(239,68,68,0.25)] transition hover:from-red-600 hover:to-red-700 active:scale-[0.99]"
          >
            Edit Profile
          </button>
        </main>
      </div>

      {/* Bottom Nav */}
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto grid max-w-md grid-cols-5 gap-1 px-3 py-2 text-[11px] text-slate-500">
          <NavItem to="/home" label="Home" icon={<HomeIcon />} />
          <NavItem to="/matching" label="Matches" icon={<UsersIcon />} />
          <NavItem to="/trip" label="Trips" icon={<BagIcon />} />
          <NavItem to="/chat" label="Chat" icon={<ChatIcon />} />
          <NavItem to="/verification" label="Trust" icon={<ShieldIconSmall />} active />
        </div>
      </nav>
    </div>
  );
}

function NavItem({ to, label, icon, active = false }: { to: string; label: string; icon: React.ReactNode; active?: boolean }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 transition ${
        active ? "text-red-600" : "text-slate-400 hover:text-slate-600"
      }`}
    >
      <span className={active ? "scale-110" : ""}>{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}

function BackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 20a7 7 0 0114 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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

function ShieldIconSmall() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
