import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface VerificationItem {
  id: string;
  label: string;
  description: string;
  verified: boolean;
  icon: React.ReactNode;
}

export default function Verification() {
  const navigate = useNavigate();
  const [verifications, setVerifications] = useState<VerificationItem[]>([
    {
      id: "id",
      label: "Government ID",
      description: "Passport or National ID",
      verified: true,
      icon: <IDIcon />,
    },
    {
      id: "face",
      label: "Selfie / Face Match",
      description: "Verify your identity with a photo",
      verified: true,
      icon: <FaceIcon />,
    },
    {
      id: "phone",
      label: "Phone Verification",
      description: "+66 89 XXX XXXX",
      verified: true,
      icon: <PhoneIcon />,
    },
    {
      id: "email",
      label: "Email Verification",
      description: "jasmine@email.com",
      verified: true,
      icon: <EmailIcon />,
    },
  ]);

  const trustScore = 94;
  const reviewCount = 23;
  const averageRating = 4.8;

  const handleVerify = (id: string) => {
    setVerifications(prev => 
      prev.map(v => v.id === id ? { ...v, verified: true } : v)
    );
  };

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
          {/* Trust Score Card */}
          <section className="overflow-hidden rounded-[2rem] border border-red-100 bg-white shadow-sm">
            <div className="bg-gradient-to-br from-red-500 to-rose-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-red-100">Your Trust Score</p>
                  <p className="mt-2 text-5xl font-black">{trustScore}</p>
                  <p className="mt-1 text-sm text-red-100">Excellent</p>
                </div>
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                  <ShieldCheckIcon className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>
          </section>

          {/* Trust Breakdown - แยก section ใหม่ */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 mb-4">
              Trust Breakdown
            </h2>
            <p className="text-xs text-slate-400 mb-4">Based on:</p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 text-lg">⭐</span>
                  <span className="text-sm text-slate-600">Rating</span>
                </div>
                <span className="text-sm font-bold text-slate-900">{averageRating}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-blue-400 text-lg">⏰</span>
                  <span className="text-sm text-slate-600">Punctuality</span>
                </div>
                <span className="text-sm font-bold text-green-600">High</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-red-400 text-lg">✕</span>
                  <span className="text-sm text-slate-600">Cancellation</span>
                </div>
                <span className="text-sm font-bold text-green-600">Rare</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-purple-400 text-lg">💬</span>
                  <span className="text-sm text-slate-600">Communication</span>
                </div>
                <span className="text-sm font-bold text-green-600">Excellent</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div className="text-center flex-1">
                  <p className="text-2xl font-bold text-slate-900">{reviewCount}</p>
                  <p className="text-xs text-slate-400">Reviews</p>
                </div>
                <div className="h-10 w-px bg-slate-200"></div>
                <div className="text-center flex-1">
                  <p className="text-2xl font-bold text-slate-900">{averageRating}</p>
                  <p className="text-xs text-slate-400">Avg Rating</p>
                </div>
                <div className="h-10 w-px bg-slate-200"></div>
                <div className="text-center flex-1">
                  <p className="text-2xl font-bold text-green-600">100%</p>
                  <p className="text-xs text-slate-400">Verified</p>
                </div>
              </div>
            </div>
          </section>

          {/* Verified Badge */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-3xl shadow-lg">
                <BadgeIcon />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-slate-900">Verified Badge</h2>
                <p className="text-sm text-slate-500">Your account is fully verified</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                    ✓ Fully Verified
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Verification List */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Verification Status
            </h2>
            <div className="mt-4 space-y-3">
              {verifications.map((item) => (
                <VerificationRow 
                  key={item.id}
                  item={item}
                  onVerify={() => handleVerify(item.id)}
                />
              ))}
            </div>
          </section>

          {/* Reviews & Ratings */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Reviews & Ratings
              </h2>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600">
                ⭐ {averageRating}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Based on {reviewCount} reviews from travel companions
            </p>
            <button className="mt-4 w-full rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
              View All Reviews
            </button>
          </section>

          {/* Safety Options */}
          <section className="rounded-[2rem] border border-red-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <WarningIcon className="text-red-500" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Safety Options
              </h2>
            </div>
            <div className="mt-4 space-y-2">
              <SafetyButton 
                label="Report User" 
                description="Report inappropriate behavior"
                variant="danger"
                onClick={() => alert("Report submitted. Our team will review within 24 hours.")}
              />
              <SafetyButton 
                label="Block User" 
                description="Block and stop all communication"
                variant="warning"
                onClick={() => alert("User blocked. You will no longer receive messages from them.")}
              />
            </div>
          </section>

          {/* Trust Tips */}
          <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-sm font-semibold text-slate-700">
              💡 Trust Building Tips
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Complete all verification steps</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Write a detailed bio</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Get reviews from past trips</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Be responsive to messages</span>
              </li>
            </ul>
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
          <NavItem to="/trip" label="Trips" icon={<BagIcon />} />
          <NavItem to="/chat" label="Chat" icon={<ChatIcon />} />
          <NavItem to="/verification" label="Trust" icon={<ShieldIconSmall />} active />
        </div>
      </nav>
    </div>
  );
}

function VerificationRow({ item, onVerify }: { item: VerificationItem; onVerify: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
          item.verified ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"
        }`}>
          {item.icon}
        </div>
        <div>
          <p className={`font-semibold ${item.verified ? "text-slate-900" : "text-slate-500"}`}>
            {item.label}
          </p>
          <p className="text-xs text-slate-400">{item.description}</p>
        </div>
      </div>
      {item.verified ? (
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-600">
          ✓ Verified
        </span>
      ) : (
        <button 
          onClick={onVerify}
          className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600 transition hover:bg-red-100"
        >
          Verify
        </button>
      )}
    </div>
  );
}

function SafetyButton({ 
  label, 
  description, 
  variant,
  onClick 
}: { 
  label: string; 
  description: string; 
  variant: "danger" | "warning";
  onClick: () => void;
}) {
  return (
    <button 
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${
        variant === "danger" 
          ? "border-red-200 bg-red-50 hover:bg-red-100" 
          : "border-amber-200 bg-amber-50 hover:bg-amber-100"
      }`}
    >
      <div>
        <p className={`font-semibold ${variant === "danger" ? "text-red-700" : "text-amber-700"}`}>
          {label}
        </p>
        <p className={`text-xs ${variant === "danger" ? "text-red-400" : "text-amber-400"}`}>
          {description}
        </p>
      </div>
      <ArrowIcon className={variant === "danger" ? "text-red-400" : "text-amber-400"} />
    </button>
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

// Icons
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

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9.5 12l1.8 1.8L15 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.8" />
      <path d="M8 12l2.5 2.5L16 9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IDIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="9" cy="11" r="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M15 10h2M15 14h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function FaceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="9" cy="10" r="1.5" fill="currentColor" />
      <circle cx="15" cy="10" r="1.5" fill="currentColor" />
      <path d="M8 15c1.5 1.5 6.5 1.5 8 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="3" width="12" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 18h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 8l8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 9v5M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10.3 3.9L1.8 18A2 2 0 003.5 21h17a2 2 0 001.7-3.1L13.7 3.9a2 2 0 00-3.4 0z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

function ShieldIconSmall() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
