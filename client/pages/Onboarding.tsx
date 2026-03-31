import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"basic" | "advanced">("basic");
  
  // Basic mode states
  const [travelStyle, setTravelStyle] = useState<"relaxed" | "balanced" | "intensive">("balanced");
  const [budgetRange, setBudgetRange] = useState<"0-2000" | "2001-4000" | "4000+">("2001-4000");
  
  // Advanced mode states
  const [travelPace, setTravelPace] = useState<"slow" | "moderate" | "fast">("moderate");
  const [personality, setPersonality] = useState<"introvert" | "ambivert" | "extrovert">("ambivert");
  const [cleanliness, setCleanliness] = useState<"relaxed" | "moderate" | "meticulous">("moderate");
  const [planningStyle, setPlanningStyle] = useState<"spontaneous" | "balanced" | "planner">("balanced");
  
  // Activities
  const [activities, setActivities] = useState<string[]>(["nature", "cafe"]);
  
  // Behavior expectations
  const [behaviors, setBehaviors] = useState<string[]>(["punctual", "flexible"]);

  const toggleActivity = (activity: string) => {
    setActivities(prev => 
      prev.includes(activity) 
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const toggleBehavior = (behavior: string) => {
    setBehaviors(prev => 
      prev.includes(behavior)
        ? prev.filter(b => b !== behavior)
        : [...prev, behavior]
    );
  };

  const handleSave = () => {
    navigate("/home");
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
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Travel Setup</p>
          </div>

          <div className="h-10 w-10" /> {/* Spacer */}
        </header>

        {/* Mode Toggle */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => setMode("basic")}
              className={`rounded-xl py-2.5 text-sm font-semibold transition ${
                mode === "basic"
                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              Basic
            </button>
            <button
              onClick={() => setMode("advanced")}
              className={`rounded-xl py-2.5 text-sm font-semibold transition ${
                mode === "advanced"
                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              Advanced
            </button>
          </div>
        </div>

        <main className="mt-4 flex-1 space-y-4 pb-5">
          {/* Travel Style */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Travel Style
            </h2>
            <div className="mt-4 space-y-3">
              <StyleOption
                label="Relaxed"
                description="Take it easy, enjoy the moment"
                selected={travelStyle === "relaxed"}
                onClick={() => setTravelStyle("relaxed")}
              />
              <StyleOption
                label="Balanced"
                description="Mix of activity and rest"
                selected={travelStyle === "balanced"}
                onClick={() => setTravelStyle("balanced")}
              />
              <StyleOption
                label="Intensive"
                description="Pack the schedule, see it all"
                selected={travelStyle === "intensive"}
                onClick={() => setTravelStyle("intensive")}
              />
            </div>
          </section>

          {/* Budget Alignment */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Budget Alignment
            </h2>
            <div className="mt-4 flex gap-2">
              <BudgetOption
                label="0-2,000"
                selected={budgetRange === "0-2000"}
                onClick={() => setBudgetRange("0-2000")}
              />
              <BudgetOption
                label="2,001-4,000"
                selected={budgetRange === "2001-4000"}
                onClick={() => setBudgetRange("2001-4000")}
              />
              <BudgetOption
                label="4,000+"
                selected={budgetRange === "4000+"}
                onClick={() => setBudgetRange("4000+")}
              />
            </div>
          </section>

          {/* Activity Preferences */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Activity Preferences
            </h2>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <ActivityChip
                label="Nature"
                icon="🌿"
                selected={activities.includes("nature")}
                onClick={() => toggleActivity("nature")}
              />
              <ActivityChip
                label="Cafe"
                icon="☕"
                selected={activities.includes("cafe")}
                onClick={() => toggleActivity("cafe")}
              />
              <ActivityChip
                label="Adventure"
                icon="🏔️"
                selected={activities.includes("adventure")}
                onClick={() => toggleActivity("adventure")}
              />
              <ActivityChip
                label="Nightlife"
                icon="🌃"
                selected={activities.includes("nightlife")}
                onClick={() => toggleActivity("nightlife")}
              />
              <ActivityChip
                label="Culture"
                icon="🏛️"
                selected={activities.includes("culture")}
                onClick={() => toggleActivity("culture")}
              />
              <ActivityChip
                label="Shopping"
                icon="🛍️"
                selected={activities.includes("shopping")}
                onClick={() => toggleActivity("shopping")}
              />
            </div>
          </section>

          {/* Behavior Expectations */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Behavior Expectations
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              <BehaviorChip
                label="Punctual"
                selected={behaviors.includes("punctual")}
                onClick={() => toggleBehavior("punctual")}
              />
              <BehaviorChip
                label="Flexible"
                selected={behaviors.includes("flexible")}
                onClick={() => toggleBehavior("flexible")}
              />
              <BehaviorChip
                label="Open group"
                selected={behaviors.includes("open-group")}
                onClick={() => toggleBehavior("open-group")}
              />
              <BehaviorChip
                label="Planner"
                selected={behaviors.includes("planner")}
                onClick={() => toggleBehavior("planner")}
              />
              <BehaviorChip
                label="Social"
                selected={behaviors.includes("social")}
                onClick={() => toggleBehavior("social")}
              />
              <BehaviorChip
                label="1-on-1"
                selected={behaviors.includes("1-on-1")}
                onClick={() => toggleBehavior("1-on-1")}
              />
            </div>
          </section>

          {/* Advanced Options */}
          {mode === "advanced" && (
            <>
              <section className="rounded-[2rem] border border-red-100 bg-gradient-to-br from-red-50/50 to-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">ADVANCED</span>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Travel Pace
                  </h2>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <PaceOption label="Slow" selected={travelPace === "slow"} onClick={() => setTravelPace("slow")} />
                  <PaceOption label="Moderate" selected={travelPace === "moderate"} onClick={() => setTravelPace("moderate")} />
                  <PaceOption label="Fast" selected={travelPace === "fast"} onClick={() => setTravelPace("fast")} />
                </div>
              </section>

              <section className="rounded-[2rem] border border-red-100 bg-gradient-to-br from-red-50/50 to-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">ADVANCED</span>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Personality
                  </h2>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <PersonalityOption label="Introvert" selected={personality === "introvert"} onClick={() => setPersonality("introvert")} />
                  <PersonalityOption label="Ambivert" selected={personality === "ambivert"} onClick={() => setPersonality("ambivert")} />
                  <PersonalityOption label="Extrovert" selected={personality === "extrovert"} onClick={() => setPersonality("extrovert")} />
                </div>
              </section>

              <section className="rounded-[2rem] border border-red-100 bg-gradient-to-br from-red-50/50 to-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">ADVANCED</span>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Cleanliness
                  </h2>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <CleanlinessOption label="Relaxed" selected={cleanliness === "relaxed"} onClick={() => setCleanliness("relaxed")} />
                  <CleanlinessOption label="Moderate" selected={cleanliness === "moderate"} onClick={() => setCleanliness("moderate")} />
                  <CleanlinessOption label="Meticulous" selected={cleanliness === "meticulous"} onClick={() => setCleanliness("meticulous")} />
                </div>
              </section>

              <section className="rounded-[2rem] border border-red-100 bg-gradient-to-br from-red-50/50 to-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">ADVANCED</span>
                  <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Planning Style
                  </h2>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <PlanningOption label="Spontaneous" selected={planningStyle === "spontaneous"} onClick={() => setPlanningStyle("spontaneous")} />
                  <PlanningOption label="Balanced" selected={planningStyle === "balanced"} onClick={() => setPlanningStyle("balanced")} />
                  <PlanningOption label="Planner" selected={planningStyle === "planner"} onClick={() => setPlanningStyle("planner")} />
                </div>
              </section>
            </>
          )}

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full rounded-2xl bg-gradient-to-r from-red-500 to-red-600 py-4 font-nunito text-lg font-bold text-white shadow-[0_18px_30px_rgba(239,68,68,0.25)] transition hover:from-red-600 hover:to-red-700 active:scale-[0.99]"
          >
            Save Preferences
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
          <NavItem to="/profile" label="Profile" icon={<ProfileIcon />} active />
        </div>
      </nav>
    </div>
  );
}

// Component helpers
function StyleOption({ label, description, selected, onClick }: { label: string; description: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 transition ${
        selected
          ? "border-red-300 bg-red-50 shadow-sm"
          : "border-slate-200 bg-white hover:bg-slate-50"
      }`}
    >
      <div className="text-left">
        <span className={`font-semibold ${selected ? "text-red-600" : "text-slate-700"}`}>{label}</span>
        <p className="text-xs text-slate-400">{description}</p>
      </div>
      <div className={`h-5 w-5 rounded-full border-2 ${selected ? "border-red-500 bg-red-500" : "border-slate-300"}`}>
        {selected && <CheckIcon />}
      </div>
    </button>
  );
}

function BudgetOption({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 rounded-xl border py-2.5 text-sm font-semibold transition ${
        selected
          ? "border-red-300 bg-red-50 text-red-600"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );
}

function ActivityChip({ label, icon, selected, onClick }: { label: string; icon: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 rounded-xl border p-3 transition ${
        selected
          ? "border-red-300 bg-red-50 text-red-600"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

function BehaviorChip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
        selected
          ? "border-red-300 bg-red-50 text-red-600"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );
}

function PaceOption({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border py-2 text-sm font-medium transition ${
        selected
          ? "border-red-300 bg-red-100 text-red-600"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );
}

function PersonalityOption({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border py-2 text-sm font-medium transition ${
        selected
          ? "border-red-300 bg-red-100 text-red-600"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );
}

function CleanlinessOption({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border py-2 text-sm font-medium transition ${
        selected
          ? "border-red-300 bg-red-100 text-red-600"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );
}

function PlanningOption({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border py-2 text-sm font-medium transition ${
        selected
          ? "border-red-300 bg-red-100 text-red-600"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
      }`}
    >
      {label}
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

function CheckIcon() {
  return (
    <svg className="h-full w-full p-0.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
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
