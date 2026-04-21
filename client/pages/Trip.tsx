import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Trip() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"create" | "agreement">("create");
  
  // Trip creation state
  const [dates, setDates] = useState({ start: "2024-05-20", end: "2024-05-23" });
  const [destination, setDestination] = useState("Thailand");
  const [budgetRange, setBudgetRange] = useState<"low" | "medium" | "high">("medium");
  const [travelStyles, setTravelStyles] = useState<string[]>(["nature", "cafe"]);
  const [schedule, setSchedule] = useState([
    { day: 1, activity: "Arrival & Night Market" },
    { day: 2, activity: "Elephant Park" },
    { day: 3, activity: "City Park" },
  ]);
  
  // Agreement state
  const [sharedRules, setSharedRules] = useState<string[]>(["budget", "punctuality"]);
  const [costSplit, setCostSplit] = useState<"equal" | "percentage" | "custom">("equal");
  const [cancellationPolicy, setCancellationPolicy] = useState<"flexible" | "moderate" | "strict">("moderate");

  const toggleTravelStyle = (style: string) => {
    setTravelStyles(prev => 
      prev.includes(style) 
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  const toggleSharedRule = (rule: string) => {
    setSharedRules(prev => 
      prev.includes(rule)
        ? prev.filter(r => r !== rule)
        : [...prev, rule]
    );
  };

  const handleConfirm = () => {
    navigate("/chat");
  };

  if (step === "agreement") {
    return (
      <AgreementView 
        sharedRules={sharedRules}
        toggleSharedRule={toggleSharedRule}
        costSplit={costSplit}
        setCostSplit={setCostSplit}
        cancellationPolicy={cancellationPolicy}
        setCancellationPolicy={setCancellationPolicy}
        onBack={() => setStep("create")}
        onConfirm={handleConfirm}
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
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Create Trip</p>
          </div>

          <div className="h-10 w-10" />
        </header>

        <main className="mt-4 flex-1 space-y-4 pb-5">
          {/* Trip Dates */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <CalendarIcon className="text-red-500" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Trip Dates
              </h2>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <label className="text-xs text-slate-400">Start Date</label>
                <input 
                  type="date" 
                  value={dates.start}
                  onChange={(e) => setDates({...dates, start: e.target.value})}
                  className="mt-1 w-full bg-transparent text-sm font-semibold text-slate-700 outline-none"
                />
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <label className="text-xs text-slate-400">End Date</label>
                <input 
                  type="date" 
                  value={dates.end}
                  onChange={(e) => setDates({...dates, end: e.target.value})}
                  className="mt-1 w-full bg-transparent text-sm font-semibold text-slate-700 outline-none"
                />
              </div>
            </div>
            <p className="mt-3 text-center text-sm font-medium text-slate-600">
              May 20 - 23 <span className="text-slate-400">(4 days)</span>
            </p>
          </section>

          {/* Destination */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <LocationIcon className="text-red-500" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Destination
              </h2>
            </div>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <select 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none"
              >
                <option>Thailand</option>
                <option>Japan</option>
                <option>Korea</option>
                <option>Vietnam</option>
              </select>
            </div>
          </section>

          {/* Budget Range */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Budget Range
              </h2>
              <span className="text-xs text-slate-400">per person</span>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Low</span>
                <span>Medium ($500-1,000)</span>
                <span>High</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="3" 
                step="1"
                value={budgetRange === "low" ? 1 : budgetRange === "medium" ? 2 : 3}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setBudgetRange(val === 1 ? "low" : val === 2 ? "medium" : "high");
                }}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
            </div>
          </section>

          {/* Travel Style Agreement */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Travel Style Agreement
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <StyleChip label="Nature" icon="🌿" selected={travelStyles.includes("nature")} onClick={() => toggleTravelStyle("nature")} />
              <StyleChip label="Cafe" icon="☕" selected={travelStyles.includes("cafe")} onClick={() => toggleTravelStyle("cafe")} />
              <StyleChip label="Adventure" icon="🏔️" selected={travelStyles.includes("adventure")} onClick={() => toggleTravelStyle("adventure")} />
              <StyleChip label="Culture" icon="🏛️" selected={travelStyles.includes("culture")} onClick={() => toggleTravelStyle("culture")} />
            </div>
          </section>

          {/* Preliminary Schedule */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Preliminary Schedule
            </h2>
            <div className="mt-4 space-y-3">
              {schedule.map((item, index) => (
                <div key={index} className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
                    {item.day}
                  </span>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400">Day {item.day}</p>
                    <input 
                      type="text" 
                      value={item.activity}
                      onChange={(e) => {
                        const newSchedule = [...schedule];
                        newSchedule[index].activity = e.target.value;
                        setSchedule(newSchedule);
                      }}
                      className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Shared Rules Preview */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Shared Rules
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <RuleBadge active={sharedRules.includes("budget")}>Budget</RuleBadge>
              <RuleBadge active={sharedRules.includes("punctuality")}>Punctuality</RuleBadge>
              <RuleBadge active={sharedRules.includes("communication")}>Communication</RuleBadge>
              <RuleBadge active={sharedRules.includes("flexibility")}>Flexibility</RuleBadge>
            </div>
          </section>

          {/* Next Button */}
          <button
            onClick={() => setStep("agreement")}
            className="w-full rounded-2xl bg-gradient-to-r from-red-500 to-red-600 py-4 font-nunito text-lg font-bold text-white shadow-[0_18px_30px_rgba(239,68,68,0.25)] transition hover:from-red-600 hover:to-red-700 active:scale-[0.99]"
          >
            Continue to Agreement →
          </button>
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

function AgreementView({ 
  sharedRules, 
  toggleSharedRule, 
  costSplit, 
  setCostSplit,
  cancellationPolicy,
  setCancellationPolicy,
  onBack,
  onConfirm
}: { 
  sharedRules: string[];
  toggleSharedRule: (rule: string) => void;
  costSplit: string;
  setCostSplit: (split: "equal" | "percentage" | "custom") => void;
  cancellationPolicy: string;
  setCancellationPolicy: (policy: "flexible" | "moderate" | "strict") => void;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const navigate = useNavigate();

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
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Trip Agreement</p>
          </div>

          <div className="h-10 w-10" />
        </header>

        <main className="mt-4 flex-1 space-y-4 pb-5">
          {/* Cost Agreement */}
          <section className="rounded-[2rem] border border-red-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">IMPORTANT</span>
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Cost Agreement
              </h2>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              How will trip costs be shared among travelers?
            </p>
            <div className="mt-4 space-y-2">
              <CostOption 
                label="Equal Split" 
                description="Everyone pays the same amount"
                selected={costSplit === "equal"}
                onClick={() => setCostSplit("equal")}
              />
              <CostOption 
                label="Percentage" 
                description="Split based on usage/ preference"
                selected={costSplit === "percentage"}
                onClick={() => setCostSplit("percentage")}
              />
              <CostOption 
                label="Custom" 
                description="Define your own arrangement"
                selected={costSplit === "custom"}
                onClick={() => setCostSplit("custom")}
              />
            </div>
          </section>

          {/* Shared Rules */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Shared Rules
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Select rules all travelers must agree to:
            </p>
            <div className="mt-4 space-y-2">
              <RuleCheckbox 
                label="Respect the budget plan" 
                checked={sharedRules.includes("budget")}
                onChange={() => toggleSharedRule("budget")}
              />
              <RuleCheckbox 
                label="Be punctual for scheduled activities" 
                checked={sharedRules.includes("punctuality")}
                onChange={() => toggleSharedRule("punctuality")}
              />
              <RuleCheckbox 
                label="Communicate changes immediately" 
                checked={sharedRules.includes("communication")}
                onChange={() => toggleSharedRule("communication")}
              />
              <RuleCheckbox 
                label="Be flexible with minor changes" 
                checked={sharedRules.includes("flexibility")}
                onChange={() => toggleSharedRule("flexibility")}
              />
            </div>
          </section>

          {/* Cancellation Policy */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Cancellation Policy
            </h2>
            <div className="mt-4 space-y-2">
              <PolicyOption 
                label="Flexible" 
                description="Full refund up to 24 hours before"
                selected={cancellationPolicy === "flexible"}
                onClick={() => setCancellationPolicy("flexible")}
              />
              <PolicyOption 
                label="Moderate" 
                description="50% refund up to 48 hours before"
                selected={cancellationPolicy === "moderate"}
                onClick={() => setCancellationPolicy("moderate")}
              />
              <PolicyOption 
                label="Strict" 
                description="No refund after confirmation"
                selected={cancellationPolicy === "strict"}
                onClick={() => setCancellationPolicy("strict")}
              />
            </div>
          </section>

          {/* Summary */}
          <section className="rounded-[2rem] border border-slate-200 bg-slate-50 p-5">
            <h3 className="font-semibold text-slate-800">Agreement Summary</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Cost split: {costSplit}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> {sharedRules.length} shared rules agreed
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span> Cancellation: {cancellationPolicy}
              </li>
            </ul>
          </section>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={onBack}
              className="rounded-2xl border border-slate-200 bg-white py-4 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Back
            </button>
            <button 
              onClick={onConfirm}
              className="rounded-2xl bg-gradient-to-r from-red-500 to-red-600 py-4 text-base font-bold text-white shadow-[0_18px_30px_rgba(239,68,68,0.25)] transition hover:from-red-600 hover:to-red-700"
            >
              Confirm Trip
            </button>
          </div>
        </main>
      </div>

      {/* Bottom Nav */}
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto grid max-w-md grid-cols-5 gap-1 px-3 py-2 text-[11px] text-slate-500">
          <NavItem to="/home" label="Home" icon={<HomeIcon />} />
          <NavItem to="/matching" label="Matches" icon={<UsersIcon />} />
          <NavItem to="/trip" label="Trips" icon={<BagIcon />} active />
          <NavItem to="/chat" label="Chat" icon={<ChatIcon />} />
          <NavItem to="/profile" label="Profile" icon={<ProfileIcon />} />
        </div>
      </nav>
    </div>
  );
}

// Component helpers
function StyleChip({ label, icon, selected, onClick }: { label: string; icon: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition ${
        selected
          ? "border-red-300 bg-red-50 text-red-600"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function RuleBadge({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${
      active ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-400"
    }`}>
      {children}
    </span>
  );
}

function CostOption({ label, description, selected, onClick }: { label: string; description: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${
        selected
          ? "border-red-300 bg-red-50"
          : "border-slate-200 bg-white hover:bg-slate-50"
      }`}
    >
      <div>
        <span className={`font-semibold ${selected ? "text-red-600" : "text-slate-700"}`}>{label}</span>
        <p className="text-xs text-slate-400">{description}</p>
      </div>
      <div className={`h-5 w-5 rounded-full border-2 ${selected ? "border-red-500 bg-red-500" : "border-slate-300"}`}>
        {selected && <CheckIconSmall />}
      </div>
    </button>
  );
}

function RuleCheckbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left transition hover:bg-slate-50"
    >
      <div className={`flex h-5 w-5 items-center justify-center rounded border-2 transition ${
        checked ? "border-red-500 bg-red-500" : "border-slate-300"
      }`}>
        {checked && <CheckIconSmall />}
      </div>
      <span className="text-sm font-medium text-slate-700">{label}</span>
    </button>
  );
}

function PolicyOption({ label, description, selected, onClick }: { label: string; description: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${
        selected
          ? "border-red-300 bg-red-50"
          : "border-slate-200 bg-white hover:bg-slate-50"
      }`}
    >
      <div>
        <span className={`font-semibold ${selected ? "text-red-600" : "text-slate-700"}`}>{label}</span>
        <p className="text-xs text-slate-400">{description}</p>
      </div>
      <div className={`h-5 w-5 rounded-full border-2 ${selected ? "border-red-500 bg-red-500" : "border-slate-300"}`}>
        {selected && <CheckIconSmall />}
      </div>
    </button>
  );
}

function CheckIconSmall() {
  return (
    <svg className="h-full w-full p-0.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
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

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 21c4-4 8-8 8-12a8 8 0 10-16 0c0 4 4 8 8 12z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
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
