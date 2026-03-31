import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface MatchProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  compatibility: number;
  trustScore: number;
  verified: boolean;
  rating: number;
  reviewCount: number;
  bio: string;
  budgetMatch: number;
  styleMatch: number;
  personalityMatch: number;
  redFlag?: string;
}

const mockProfiles: MatchProfile[] = [
  {
    id: "1",
    name: "Alex Chen",
    age: 29,
    location: "Chiang Mai, Thailand",
    compatibility: 92,
    trustScore: 94,
    verified: true,
    rating: 4.9,
    reviewCount: 23,
    bio: "Coffee lover, nature enthusiast. Love slow travel and discovering hidden gems.",
    budgetMatch: 88,
    styleMatch: 95,
    personalityMatch: 91,
    redFlag: "Rare cancellations",
  },
  {
    id: "2",
    name: "Maya Lopez",
    age: 26,
    location: "Bangkok, Thailand",
    compatibility: 87,
    trustScore: 91,
    verified: true,
    rating: 4.7,
    reviewCount: 15,
    bio: "Street food explorer, night market expert. Always up for adventures!",
    budgetMatch: 92,
    styleMatch: 84,
    personalityMatch: 88,
  },
  {
    id: "3",
    name: "James Wilson",
    age: 32,
    location: "Phuket, Thailand",
    compatibility: 85,
    trustScore: 88,
    verified: true,
    rating: 4.6,
    reviewCount: 31,
    bio: "Beach person, photographer. Looking for travel buddies who enjoy sunrise.",
    budgetMatch: 79,
    styleMatch: 91,
    personalityMatch: 86,
    redFlag: "Budget mismatch",
  },
];

export default function Matching() {
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState<MatchProfile | null>(null);
  const [destinationFilter, setDestinationFilter] = useState("Chiang Mai, Thailand");
  const [groupSize, setGroupSize] = useState("Small group");

  if (selectedProfile) {
    return (
      <ProfileDetail 
        profile={selectedProfile} 
        onBack={() => setSelectedProfile(null)}
        onSendRequest={() => navigate("/chat")}
      />
    );
  }

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
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Find Travel Match</p>
          </div>

          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50">
            <FilterIcon />
          </button>
        </header>

        <main className="mt-4 flex-1 space-y-4 pb-5">
          {/* Filters */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Destination Filter
            </h2>
            <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <select 
                value={destinationFilter}
                onChange={(e) => setDestinationFilter(e.target.value)}
                className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none"
              >
                <option>Chiang Mai, Thailand</option>
                <option>Bangkok, Thailand</option>
                <option>Phuket, Thailand</option>
                <option>Krabi, Thailand</option>
              </select>
            </div>

            <h2 className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Group Size Filter
            </h2>
            <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <select 
                value={groupSize}
                onChange={(e) => setGroupSize(e.target.value)}
                className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none"
              >
                <option>Small group (2-3)</option>
                <option>Medium group (4-6)</option>
                <option>Large group (7+)</option>
                <option>1-on-1</option>
              </select>
            </div>
          </section>

          {/* Suggested Matches */}
          <section className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-bold text-slate-900">Suggested Matches</h2>
              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                {mockProfiles.length} found
              </span>
            </div>

            {mockProfiles.map((profile) => (
              <MatchCard 
                key={profile.id} 
                profile={profile} 
                onViewProfile={() => setSelectedProfile(profile)}
              />
            ))}
          </section>
        </main>
      </div>

      {/* Bottom Nav */}
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto grid max-w-md grid-cols-5 gap-1 px-3 py-2 text-[11px] text-slate-500">
          <NavItem to="/home" label="Home" icon={<HomeIcon />} />
          <NavItem to="/matching" label="Matches" icon={<UsersIcon />} active />
          <NavItem to="/trip" label="Trips" icon={<BagIcon />} />
          <NavItem to="/chat" label="Chat" icon={<ChatIcon />} />
          <NavItem to="/profile" label="Profile" icon={<ProfileIcon />} />
        </div>
      </nav>
    </div>
  );
}

function MatchCard({ profile, onViewProfile }: { profile: MatchProfile; onViewProfile: () => void }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      {/* Header with compatibility */}
      <div className="bg-gradient-to-br from-red-500 to-rose-500 p-4 text-white">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-2xl">
              {profile.name.charAt(0)}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/80">Compatibility</p>
              <p className="text-3xl font-black leading-none">{profile.compatibility}%</p>
            </div>
          </div>
          <div className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur">
            {profile.verified ? "Verified" : "Trust pending"}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-black text-slate-900">
              {profile.name}, {profile.age}
            </h3>
            <p className="mt-1 text-sm text-slate-500">{profile.location}</p>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-1">
              <span className="text-amber-400">⭐</span>
              <span className="font-bold text-slate-900">{profile.rating}</span>
            </div>
            <p className="text-xs text-slate-400">({profile.reviewCount} reviews)</p>
          </div>
        </div>

        {/* Match indicators */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <BadgePill tone="red">Budget Match ✓</BadgePill>
          <BadgePill tone="rose">Travel Pace Match ✓</BadgePill>
          {profile.redFlag && (
            <BadgePill tone="slate" warning>{profile.redFlag}</BadgePill>
          )}
        </div>

        {/* Action buttons */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button 
            onClick={onViewProfile}
            className="rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            View Profile
          </button>
          <button className="rounded-xl bg-gradient-to-r from-red-500 to-red-600 py-2.5 text-sm font-semibold text-white shadow-md transition hover:from-red-600 hover:to-red-700">
            Send Request
          </button>
        </div>
      </div>
    </article>
  );
}

function ProfileDetail({ profile, onBack, onSendRequest }: { profile: MatchProfile; onBack: () => void; onSendRequest: () => void }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff5f5_0%,_#ffffff_35%,_#fffdfd_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-28 pt-4 sm:px-5">
        {/* Header */}
        <header className="flex items-center justify-between rounded-[1.6rem] border border-slate-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur">
          <button 
            onClick={onBack}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50"
          >
            <BackIcon />
          </button>

          <div className="text-center">
            <p className="font-nunito text-xl font-black tracking-[0.2em] text-red-500">WITH ME</p>
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Profile</p>
          </div>

          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50">
            <ShareIcon />
          </button>
        </header>

        <main className="mt-4 flex-1 space-y-4 pb-5">
          {/* Profile Header */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center text-3xl font-bold text-white">
                {profile.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-slate-900">{profile.name}</h1>
                  {profile.verified && (
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-600">
                      ✓ Verified
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500">Responsible traveler</p>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-600">
                    Trust score: <span className="font-bold text-red-600">{profile.trustScore}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-700">Travel Mindset Summary</h3>
              <p className="mt-1 text-sm text-slate-600">{profile.bio}</p>
            </div>
          </section>

          {/* Compatibility Breakdown */}
          <section className="rounded-[2rem] border border-red-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Compatibility Breakdown</h2>
              <span className="rounded-full bg-red-50 px-3 py-1 text-lg font-black text-red-600">
                {profile.compatibility}%
              </span>
            </div>

            <div className="mt-5 space-y-4">
              <BreakdownRow label="Budget" value={profile.budgetMatch} />
              <BreakdownRow label="Travel Style" value={profile.styleMatch} />
              <BreakdownRow label="Personality" value={profile.personalityMatch} />
            </div>
          </section>

          {/* Travel Preferences */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Travel Preferences
            </h2>
            <div className="mt-4 space-y-3">
              <PreferenceRow label="Travel Pace" value="Balanced" />
              <PreferenceRow label="Budget Level" value="Medium" />
              <PreferenceRow label="Group Style" value="Small group" />
            </div>
          </section>

          {/* Budget Range */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Budget Preference
            </h2>
            <p className="mt-2 text-lg font-bold text-slate-800">$500 - $1,000 per trip</p>
          </section>

          {/* Travel History */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Travel History
            </h2>
            <p className="mt-2 text-slate-600">Chiang Mai, Thailand • Bangkok, Thailand • Phuket, Thailand</p>
          </section>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={onBack}
              className="rounded-2xl border border-slate-200 bg-white py-4 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Back to Matches
            </button>
            <button 
              onClick={onSendRequest}
              className="rounded-2xl bg-gradient-to-r from-red-500 to-red-600 py-4 text-base font-bold text-white shadow-[0_18px_30px_rgba(239,68,68,0.25)] transition hover:from-red-600 hover:to-red-700"
            >
              Send Request
            </button>
          </div>
        </main>
      </div>

      {/* Bottom Nav */}
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto grid max-w-md grid-cols-5 gap-1 px-3 py-2 text-[11px] text-slate-500">
          <NavItem to="/home" label="Home" icon={<HomeIcon />} />
          <NavItem to="/matching" label="Matches" icon={<UsersIcon />} active />
          <NavItem to="/trip" label="Trips" icon={<BagIcon />} />
          <NavItem to="/chat" label="Chat" icon={<ChatIcon />} />
          <NavItem to="/profile" label="Profile" icon={<ProfileIcon />} />
        </div>
      </nav>
    </div>
  );
}

function BreakdownRow({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-600">{label}</span>
        <span className="font-bold text-slate-900">{value}%</span>
      </div>
      <div className="mt-2 h-2.5 rounded-full bg-slate-100">
        <div 
          className="h-2.5 rounded-full bg-gradient-to-r from-red-500 to-rose-500 transition-all" 
          style={{ width: `${value}%` }} 
        />
      </div>
    </div>
  );
}

function PreferenceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
      <span className="text-sm font-medium text-slate-500">{label}</span>
      <span className="text-sm font-bold text-slate-800">{value}</span>
    </div>
  );
}

function BadgePill({ tone, warning, children }: { tone: "red" | "rose" | "slate"; warning?: boolean; children: React.ReactNode }) {
  const tones = {
    red: "bg-red-50 text-red-600",
    rose: "bg-rose-50 text-rose-600",
    slate: warning ? "bg-amber-50 text-amber-600" : "bg-slate-50 text-slate-600",
  };

  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
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

// Icons
function BackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.5 10.5l7-3M8.5 13.5l7 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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
