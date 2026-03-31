import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/home");
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_#fff3f3_0%,_#ffffff_46%,_#fff7f7_100%)] text-slate-900">
      <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col px-6 py-8 sm:px-8">
        <div className="pointer-events-none absolute -left-20 top-12 h-48 w-48 rounded-full bg-red-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 top-32 h-44 w-44 rounded-full bg-rose-100/70 blur-3xl" />
        <div className="pointer-events-none absolute bottom-12 left-10 h-36 w-36 rounded-full bg-red-50 blur-3xl" />

        <header className="flex items-center justify-between">
          <BrandMark />
          <span className="rounded-full border border-red-100 bg-white/80 px-3 py-1 text-xs font-semibold text-red-500 shadow-sm backdrop-blur">
            Verified community
          </span>
        </header>

        <main className="relative z-10 flex flex-1 flex-col justify-center">
          <section className="rounded-[2rem] border border-red-100 bg-white/95 p-6 shadow-[0_20px_50px_rgba(239,68,68,0.08)] backdrop-blur sm:p-8">
            <div className="flex items-center gap-3 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              <ShieldIcon />
              Find safe & compatible travel buddies
            </div>

            <div className="mt-7 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-red-400">
                WithMe
              </p>
              <h1 className="mt-3 font-nunito text-4xl font-black leading-tight text-slate-900 sm:text-[2.85rem]">
                Welcome,
                <br />
                Jasmine!
              </h1>
              <p className="mx-auto mt-4 max-w-xs text-sm leading-6 text-slate-500 sm:text-base">
                Compatibility first. Safety always. Start with a trusted travel community.
              </p>
            </div>

            <form onSubmit={handleSignIn} className="mt-7 space-y-3">
              <FieldShell icon={<EmailIcon />}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 sm:text-base"
                />
              </FieldShell>

              <FieldShell
                icon={<LockIcon />}
                action={
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="rounded-full px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                }
              >
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 sm:text-base"
                />
              </FieldShell>

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-red-500 to-red-600 px-5 py-4 font-nunito text-lg font-bold text-white shadow-[0_18px_30px_rgba(239,68,68,0.25)] transition hover:from-red-600 hover:to-red-700 active:scale-[0.99]"
              >
                Sign In
              </button>
            </form>

            <div className="mt-4 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-slate-400">
              <span className="h-px flex-1 bg-slate-200" />
              or continue with
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <SocialButton label="Google" icon={<GoogleIcon />} />
              <SocialButton label="Apple" icon={<AppleIcon />} />
            </div>

            <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <span className="font-semibold text-slate-800">Trust first:</span> ID verified users, community reviews, and safety tools built in.
            </div>

            <div className="mt-6 flex items-center justify-between text-sm">
              <button className="font-medium text-slate-500 transition hover:text-slate-700">
                Forgot password?
              </button>
              <Link to="/home" className="font-semibold text-red-500 transition hover:text-red-600">
                Explore home
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function BrandMark() {
  return (
    <div className="select-none font-nunito text-[1.85rem] font-black leading-none tracking-tight">
      <span className="text-red-500">with</span>
      <span className="text-slate-900">Me</span>
    </div>
  );
}

function FieldShell({
  icon,
  action,
  children,
}: {
  icon: ReactNode;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-red-200 focus-within:ring-4 focus-within:ring-red-50">
      <span className="text-slate-400">{icon}</span>
      <div className="min-w-0 flex-1">{children}</div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

function SocialButton({ label, icon }: { label: string; icon: ReactNode }) {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-red-200 hover:bg-red-50"
    >
      {icon}
      {label}
    </button>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M9.5 12l1.8 1.8L15 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 7l8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 11V8a5 5 0 0110 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="5" y="11" width="14" height="10" rx="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.5 12.2c0-.7-.1-1.2-.2-1.8H12v3.4h5.4c-.1.8-.6 2-1.7 2.7v2.2h2.8c1.6-1.5 3-3.8 3-6.5z" fill="#4285F4" />
      <path d="M12 22c2.7 0 5-.9 6.6-2.5l-2.8-2.2c-.8.5-1.8.9-3.1.9-2.4 0-4.4-1.6-5.1-3.8H4.7v2.3A9.99 9.99 0 0012 22z" fill="#34A853" />
      <path d="M6.9 14.4c-.2-.6-.4-1.3-.4-2.1s.2-1.5.4-2.1V7.9H4.7A10 10 0 002 12.3c0 1.6.4 3.1 1.1 4.4l3.2-2.3.6-.5z" fill="#FBBC05" />
      <path d="M12 6.2c1.5 0 2.9.5 4 1.6l3-3A10 10 0 0012 2a9.99 9.99 0 00-8.9 5.9l3.8 2.9c.7-2.2 2.7-4.6 5.1-4.6z" fill="#EA4335" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.7 4.2c-.7.8-1.5 1.4-2.5 1.3-.1-1 .3-2 .9-2.9.7-.8 1.7-1.4 2.6-1.5.1 1-.3 2-.9 3.1z" fill="#111827" />
      <path d="M19.3 8.1c-1.2-.1-2.3.7-2.9.7-.7 0-1.7-.7-2.8-.7-1.5 0-2.9.9-3.7 2.4-1.5 2.7-.4 6.7 1.1 8.9.7 1 1.5 2 2.6 2 1 0 1.4-.6 2.7-.6 1.3 0 1.6.6 2.7.6 1.1 0 1.8-1 2.5-2 0 0 .8-1.1 1.2-2.2-3.2-1.2-3.7-5.7-.4-7.5-.7-1-.7-1.8-.9-2.2z" fill="#111827" />
    </svg>
  );
}
