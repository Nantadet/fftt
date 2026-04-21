import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const navigate = useNavigate();

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
          
          {/* Decorative elements */}
          <div className="absolute -top-2 -left-2 h-4 w-4 rounded-full bg-red-400" />
          <div className="absolute top-4 -right-1 h-3 w-3 rounded-full bg-red-300" />
          <div className="absolute -bottom-1 right-8 h-2 w-2 rounded-full bg-red-400" />
        </div>
        
        {/* Tagline */}
        <p className="mt-8 text-center text-sm font-medium text-slate-400 tracking-widest uppercase">
          Find Your Travel Buddy
        </p>

        {/* Get Started Button - กดเอง */}
        <button
          onClick={() => navigate("/login")}
          className="mt-12 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 px-12 py-4 text-white font-bold text-lg shadow-[0_18px_30px_rgba(239,68,68,0.3)] transition hover:scale-105 hover:from-red-600 hover:to-red-700"
        >
          Get Started
        </button>
      </div>

      {/* Loading dots (ตกแต่ง) */}
      <div className="absolute bottom-16 flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="h-2 w-2 rounded-full bg-red-500" />
          <div className="h-2 w-2 rounded-full bg-red-400" />
          <div className="h-2 w-2 rounded-full bg-red-300" />
        </div>
      </div>
    </div>
  );
}
