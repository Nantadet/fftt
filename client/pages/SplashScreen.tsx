import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect to login after 2.5 seconds
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background gradient circles */}
      <div className="absolute top-20 left-10 h-40 w-40 rounded-full bg-red-100/50 blur-3xl" />
      <div className="absolute bottom-20 right-10 h-48 w-48 rounded-full bg-rose-100/50 blur-3xl" />
      
      {/* Main Logo Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Circle */}
        <div className="relative flex items-center justify-center">
          {/* Outer circle */}
          <div className="h-48 w-48 rounded-full border-2 border-red-200 flex items-center justify-center bg-gradient-to-br from-red-50 to-white shadow-[0_20px_60px_rgba(239,68,68,0.15)]">
            {/* Inner content */}
            <div className="text-center">
              <div className="font-nunito text-5xl font-black tracking-tight">
                <span className="text-red-500">with</span>
              </div>
              <div className="relative -mt-2">
                <span className="text-6xl text-red-500">♥</span>
              </div>
              <div className="font-nunito text-5xl font-black tracking-tight -mt-2">
                <span className="text-slate-800">me</span>
              </div>
            </div>
          </div>
          
          {/* Decorative elements like in the sketch */}
          <div className="absolute -top-2 -left-2 h-4 w-4 rounded-full bg-red-400" />
          <div className="absolute top-4 -right-1 h-3 w-3 rounded-full bg-red-300" />
          <div className="absolute -bottom-1 right-8 h-2 w-2 rounded-full bg-red-400" />
        </div>
        
        {/* Tagline */}
        <p className="mt-8 text-center text-sm font-medium text-slate-400 tracking-widest uppercase">
          Find Your Travel Buddy
        </p>
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-16 flex flex-col items-center gap-3">
        <div className="flex gap-1.5">
          <div className="h-2 w-2 rounded-full bg-red-500 animate-bounce [animation-delay:0ms]" />
          <div className="h-2 w-2 rounded-full bg-red-500 animate-bounce [animation-delay:150ms]" />
          <div className="h-2 w-2 rounded-full bg-red-500 animate-bounce [animation-delay:300ms]" />
        </div>
        <p className="text-xs text-slate-300">Loading...</p>
      </div>
    </div>
  );
}
