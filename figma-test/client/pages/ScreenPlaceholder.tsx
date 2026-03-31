import { Link } from "react-router-dom";

type ScreenPlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
};

export default function ScreenPlaceholder({ eyebrow, title, description, points }: ScreenPlaceholderProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff5f5_0%,_#ffffff_40%,_#fffdfd_100%)] px-4 py-6 text-slate-900">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-md flex-col justify-center">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-red-600">
            {eyebrow}
          </div>
          <h1 className="mt-4 font-nunito text-3xl font-black leading-tight">{title}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>

          <div className="mt-5 space-y-2">
            {points.map((point) => (
              <div key={point} className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-[11px] font-bold text-red-600">
                  ✓
                </span>
                <span>{point}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/home"
              className="inline-flex flex-1 items-center justify-center rounded-2xl bg-red-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-200 transition hover:bg-red-600"
            >
              Back to Home
            </Link>
            <Link
              to="/"
              className="inline-flex flex-1 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
