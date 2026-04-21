import { useNavigate } from "react-router-dom";

interface TripItem {
  id: string;
  name: string;
  age: number;
  location: string;
  dateRange: string;
  status: "awaiting" | "confirmed" | "upcoming" | "completed";
  imageColor: string;
}

const trips: TripItem[] = [
  {
    id: "1",
    name: "Tom",
    age: 29,
    location: "Bali, 28 May, 1",
    dateRange: "April - May 1",
    status: "awaiting",
    imageColor: "from-blue-400 to-cyan-500",
  },
  {
    id: "2",
    name: "Lisa",
    age: 26,
    location: "Chiang Mai, Thailand",
    dateRange: "May 5 - May 8",
    status: "confirmed",
    imageColor: "from-emerald-400 to-teal-500",
  },
  {
    id: "3",
    name: "Mark",
    age: 30,
    location: "Seoul, 1 May 1",
    dateRange: "May 12 - May 15",
    status: "upcoming",
    imageColor: "from-violet-400 to-purple-500",
  },
  {
    id: "4",
    name: "Kate",
    age: 25,
    location: "Phuket, Thailand",
    dateRange: "",
    status: "completed",
    imageColor: "from-rose-400 to-pink-500",
  },
];

export default function UpcomingTrips() {
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
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Upcoming Trips</p>
          </div>

          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50">
            <BellIcon />
          </button>
        </header>

        <main className="mt-4 flex-1 space-y-4 pb-5">
          {trips.map((trip) => (
            <article key={trip.id} className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-start gap-4">
                <div className={`h-16 w-16 shrink-0 rounded-xl bg-gradient-to-br ${trip.imageColor} flex items-center justify-center text-xl font-bold text-white`}>
                  {trip.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-black text-slate-900">
                      {trip.name}, {trip.age}
                    </h3>
                    {trip.status === "awaiting" && (
                      <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-semibold text-amber-600">
                        ⏳ Awaiting Agreement
                      </span>
                    )}
                    {trip.status === "confirmed" && (
                      <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600">
                        ✓ Agreement Confirmed
                      </span>
                    )}
                    {trip.status === "upcoming" && (
                      <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold text-blue-600">
                        🗓 Trip Upcoming
                      </span>
                    )}
                    {trip.status === "completed" && (
                      <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-500">
                        ✓ Trip Completed
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                    <LocationPinIcon />
                    {trip.location}
                  </div>
                  {trip.dateRange && (
                    <div className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                      trip.status === "confirmed" ? "bg-emerald-50 text-emerald-700" : 
                      trip.status === "upcoming" ? "bg-blue-50 text-blue-700" :
                      "bg-slate-50 text-slate-600"
                    }`}>
                      {trip.status === "confirmed" ? "❤️" : trip.status === "upcoming" ? "🗓" : "📅"} {trip.dateRange}
                    </div>
                  )}
                  {trip.status === "completed" && (
                    <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                      Culture Enthusiast
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <button 
                  onClick={() => navigate(`/profile`)}
                  className="rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  View Profile
                </button>
                {trip.status === "awaiting" && (
                  <button 
                    onClick={() => navigate("/trip")}
                    className="rounded-xl bg-red-500 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-red-600"
                  >
                    Send Request
                  </button>
                )}
                {trip.status === "confirmed" && (
                  <button 
                    onClick={() => navigate("/chat")}
                    className="rounded-xl bg-emerald-500 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-600"
                  >
                    Agreement Confirmed
                  </button>
                )}
                {trip.status === "upcoming" && (
                  <button 
                    onClick={() => navigate("/chat")}
                    className="rounded-xl border border-blue-200 bg-blue-50 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
                  >
                    🗓 Trip Upcoming
                  </button>
                )}
                {trip.status === "completed" && (
                  <button 
                    onClick={() => navigate(`/review/${trip.id}`)}
                    className="rounded-xl border border-slate-200 bg-slate-100 py-2.5 text-sm font-semibold text-slate-500 transition hover:bg-slate-200"
                  >
                    ✓ Trip Completed
                  </button>
                )}
              </div>
            </article>
          ))}
        </main>
      </div>

      {/* Bottom Nav */}
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto grid max-w-md grid-cols-5 gap-1 px-3 py-2 text-[11px] text-slate-500">
          <NavItem to="/home" label="Home" icon={<HomeIcon />} />
          <NavItem to="/matching" label="Matches" icon={<UsersIcon />} />
          <NavItem to="/trips" label="Trips" icon={<BagIcon />} active />
          <NavItem to="/chat" label="Chat" icon={<ChatIcon />} />
          <NavItem to="/profile" label="Profile" icon={<ProfileIcon />} />
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

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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

function ProfileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 20a7 7 0 0114 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
