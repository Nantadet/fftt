import { useState } from "react";

interface PremiumPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PremiumPopup({ isOpen, onClose }: PremiumPopupProps) {
  const [hovered, setHovered] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div 
        className="relative w-full max-w-sm rounded-[2rem] bg-white p-6 shadow-2xl"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Premium Badge */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <div className="rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-1 text-xs font-bold text-white shadow-lg">
            ⭐ PREMIUM
          </div>
        </div>

        <div className="mt-3 text-center">
          <h2 className="text-xl font-black text-slate-900">Upgrade to Premium</h2>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed">
            Unlock advanced matching filters based on travel style, budget, and personality.
          </p>

          <ul className="mt-5 space-y-3 text-left">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500 text-xs">✓</span>
              <span className="text-sm text-slate-700">More accurate matches</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500 text-xs">✓</span>
              <span className="text-sm text-slate-700">Unlimited chat</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500 text-xs">✓</span>
              <span className="text-sm text-slate-700">Priority suggestions</span>
            </li>
          </ul>

          <div className="mt-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Maybe Later
            </button>
            <button
              onClick={() => {
                alert("Thank you! Premium upgrade coming soon.");
                onClose();
              }}
              className="flex-1 rounded-xl bg-gradient-to-r from-red-500 to-red-600 py-3 text-sm font-bold text-white shadow-md transition hover:from-red-600 hover:to-red-700"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
