import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  if (step === 1) {
    return (
      <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden">
        {/* Background gradient like sunset */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-400/80 via-rose-400/80 to-orange-400/80" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <h1 className="font-nunito text-5xl font-black tracking-tight text-white drop-shadow-lg">
            WITHME
          </h1>
          
          <div className="mt-6 space-y-1">
            <p className="text-2xl font-bold text-white drop-shadow-md">
              Match Your Vibe.
            </p>
            <p className="text-2xl font-bold text-red-400 drop-shadow-md">
              Travel with Confidence.
            </p>
          </div>

          <p className="mt-6 text-sm text-white/90 max-w-xs leading-relaxed drop-shadow">
            Find travel buddies who match your travel style, budget, and personality.
          </p>

          <button
            onClick={() => setStep(2)}
            className="mt-10 w-full max-w-xs rounded-2xl bg-red-500 px-8 py-4 text-white font-bold text-lg shadow-[0_18px_30px_rgba(239,68,68,0.4)] transition hover:scale-105 hover:bg-red-600"
          >
            Get Started
          </button>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
        <div className="absolute top-20 right-10 h-40 w-40 rounded-full bg-red-100/50 blur-3xl" />
        <div className="absolute bottom-20 left-10 h-48 w-48 rounded-full bg-rose-100/50 blur-3xl" />
        
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-md flex-col px-6 py-8">
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-center text-2xl font-black text-slate-900 mb-10">
              Our Key Features
            </h1>

            <div className="space-y-6">
              <div className="flex items-start gap-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
                  <SearchUserIcon />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Smart matching</h3>
                  <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                    based on your travel style, budget, and personality.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
                  <ShieldCheckIcon />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Verified users</h3>
                  <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                    for a safer travel experience.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
                  <AgreementIcon />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Set clear agreements</h3>
                  <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                    before your trip.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mb-6">
            <div className="h-2 w-2 rounded-full bg-slate-300" />
            <div className="h-2 w-2 rounded-full bg-red-500" />
            <div className="h-2 w-2 rounded-full bg-slate-300" />
          </div>

          <button
            onClick={() => setStep(3)}
            className="w-full rounded-2xl bg-red-500 py-4 text-white font-bold text-lg shadow-[0_18px_30px_rgba(239,68,68,0.3)] transition hover:bg-red-600"
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-20 left-10 h-40 w-40 rounded-full bg-red-100/50 blur-3xl" />
      <div className="absolute bottom-20 right-10 h-48 w-48 rounded-full bg-rose-100/50 blur-3xl" />
      
      <div className="relative z-10 flex flex-col items-center px-6">
        <div className="text-center">
          <div className="font-nunito text-5xl font-black tracking-tight">
            <span className="text-red-500">with</span>
            <span className="text-red-500 text-6xl mx-1">♥</span>
            <span className="text-slate-800">me</span>
          </div>
          <p className="mt-6 text-lg text-slate-600 font-medium">
            Match your vibe, travel safely
          </p>
          <p className="mt-2 text-sm text-slate-400 max-w-xs mx-auto">
            Find travel buddies who match your travel style, budget, and personality.
          </p>
        </div>

        <div className="flex justify-center gap-2 mt-10 mb-10">
          <div className="h-2 w-2 rounded-full bg-slate-300" />
          <div className="h-2 w-2 rounded-full bg-slate-300" />
          <div className="h-2 w-2 rounded-full bg-red-500" />
        </div>

        <button
          onClick={() => navigate("/login")}
          className="w-full max-w-xs rounded-2xl bg-red-500 px-12 py-4 text-white font-bold text-lg shadow-[0_18px_30px_rgba(239,68,68,0.3)] transition hover:scale-105 hover:bg-red-600"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

function SearchUserIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="11" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 16c.5-1.5 2-2 4-2s3.5.5 4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9.5 12l1.8 1.8L15 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AgreementIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 19.5V5a2 2 0 012-2h12a2 2 0 012 2v14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 19.5A2.5 2.5 0 016.5 22h11a2.5 2.5 0 002.5-2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
