import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface VerificationItem {
  id: string;
  label: string;
  verified: boolean;
}

export default function Verification() {
  const navigate = useNavigate();
  const [verifications] = useState<VerificationItem[]>([
    { id: "id", label: "Government ID", verified: true },
    { id: "face", label: "Face match", verified: true },
    { id: "phone", label: "Phone", verified: true },
    { id: "email", label: "Email", verified: true },
  ]);

  const trustScore = 94;
  const averageRating = 4.8;
  const reviewCount = 23;

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
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Trust & Safety</p>
          </div>

          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50">
            <SettingsIcon />
          </button>
        </header>

        <main className="mt-4 flex-1 space-y-4 pb-5">
          {/* Trust Score Section */}
          <section className="rounded-[2rem] border border-red-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-slate-900">[</span>
                <span className="text-sm font-semibold uppercase tracking-wider text-slate-600">Trust Score</span>
                <span className="text-2xl font-black text-red-500">{trustScore}</span>
                <span className="text-lg font-bold text-slate-900">]</span>
              </div>
              <span className="text-sm font-semibold text-slate-600">Excellent</span>
            </div>
          </section>

          {/* Based on Section */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-600 mb-4">Based on:</p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-amber-400 text-lg">⭐</span>
                <span className="text-sm text-slate-600">Rating:</span>
                <span className="text-sm font-bold text-slate-900 ml-auto">{averageRating}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-blue-400 text-lg">⏰</span>
                <span className="text-sm text-slate-600">Punctuality:</span>
                <span className="text-sm font-bold text-green-600 ml-auto">High</span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-purple-400 text-lg">💬</span>
                <span className="text-sm text-slate-600">Communication:</span>
                <span className="text-sm font-bold text-green-600 ml-auto">Excellent</span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-red-400 text-lg">✕</span>
                <span className="text-sm text-slate-600">Cancellation:</span>
                <span className="text-sm font-bold text-green-600 ml-auto">Rare</span>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="border-t-2 border-dashed border-slate-200"></div>

          {/* Verification Section */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 mb-4">Verification</h2>
            
            <div className="space-y-3">
              {verifications.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <span className="text-sm text-slate-700">{item.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Divider */}
          <div className="border-t-2 border-dashed border-slate-200"></div>

          {/* Reputation Section */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 mb-3">Reputation</h2>
            
            <div className="flex items-center gap-2 mb-2">
              <span className="text-amber-400">⭐</span>
              <span className="text-sm text-slate-700">{reviewCount} reviews</span>
            </div>
            
            <button className="text-sm text-slate-500 underline hover:text-slate-700">
              View all reviews
            </button>
          </section>

          {/* Divider */}
          <div className="border-t-2 border-dashed border-slate-200"></div>

          {/* Safety Section */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-slate-900 mb-4">Safety</h2>
            
            <div className="space-y-2">
              <button 
                onClick={() => alert("Report submitted. Our team will review within 24 hours.")}
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-red-600 transition"
              >
                <span>[</span>
                <span>Report user</span>
                <span>]</span>
              </button>
              
              <button 
                onClick={() => alert("User blocked. You will no longer receive messages from them.")}
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-red-600 transition"
              >
                <span>[</span>
                <span>Block user</span>
                <span>]</span>
              </button>
            </div>
          </section>
        </main>
      </div>

      {/* SOS Button */}
      <button
        onClick={() => alert("SOS Alert sent! Emergency contacts and authorities have been notified.")}
        className="fixed bottom-24 right-4 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white shadow-[0_18px_30px_rgba(239,68,68,0.32)] transition hover:scale-110 active:scale-95"
      >
        <SOSIcon />
      </button>

      {/* Bottom Nav */}
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto grid max-w-md grid-cols-5 gap-1 px-3 py-2 text-[11px] text-slate-500">
          <NavItem to="/home" label="Home" icon={<HomeIcon />} />
          <NavItem to="/matching" label="Matches" icon={<UsersIcon />} />
          <NavItem to="/chat" label="Chat" icon={<ChatIcon />} />
          <NavItem to="/trips" label="Trips" icon={<BagIcon />} />
          <NavItem to="/organizer" label="Organizer" icon={<CrownIcon />} />
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

function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M19 12h2M3 12h2M12 5V3M12 21v-2M17 7l1.5-1.5M5.5 19.5L7 18M17 17l1.5 1.5M5.5 4.5L7 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SOSIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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

function CrownIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 16L3 5l5.5 3L12 4l3.5 4L21 5l-2 11H5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
