import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function TripReview() {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [wouldTravelAgain, setWouldTravelAgain] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) return;
    setSubmitted(true);
    setTimeout(() => {
      navigate("/trips");
    }, 1500);
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
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Rate Your Travel Experience</p>
          </div>

          <div className="h-10 w-10" />
        </header>

        <main className="mt-4 flex-1 space-y-4 pb-5">
          {/* Companion Card */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 shrink-0 rounded-2xl bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center text-2xl font-bold text-white">
                L
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl font-black text-slate-900">Lisa, 26</h2>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-600">
                    <CheckSmallIcon /> Verified
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-slate-500">Rayong, Thailand</p>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                  📅 Apr 10 – 12
                </div>
              </div>
            </div>
          </section>

          {/* Rating Section */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm text-center">
            <h3 className="text-lg font-bold text-slate-900">
              How was your trip with Lisa?
            </h3>
            <div className="mt-4 flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition hover:scale-110"
                >
                  <StarIcon filled={star <= rating} />
                </button>
              ))}
            </div>
          </section>

          {/* Review Text */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write a review about your trip or give any feedback to Lisa."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 resize-none"
              rows={4}
            />
          </section>

          {/* Would travel again */}
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm text-center">
            <h3 className="text-lg font-bold text-slate-900">
              Would you travel with Lisa again?
            </h3>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={() => setWouldTravelAgain(true)}
                className={`rounded-xl px-10 py-2.5 text-base font-semibold transition ${
                  wouldTravelAgain === true
                    ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                    : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => setWouldTravelAgain(false)}
                className={`rounded-xl px-10 py-2.5 text-base font-semibold transition ${
                  wouldTravelAgain === false
                    ? "bg-red-100 text-red-700 border border-red-300"
                    : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                No
              </button>
            </div>
          </section>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={submitted || rating === 0}
            className={`w-full rounded-2xl py-4 font-nunito text-lg font-bold transition ${
              submitted
                ? "bg-green-500 text-white"
                : rating === 0
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-red-500 text-white shadow-[0_18px_30px_rgba(239,68,68,0.25)] hover:bg-red-600"
            }`}
          >
            {submitted ? "✓ Review Submitted!" : "Submit"}
          </button>

          <button
            onClick={() => alert("Report submitted. Our team will review.")}
            className="w-full text-center text-sm text-slate-400 hover:text-slate-600 transition"
          >
            Report
          </button>
        </main>
      </div>
    </div>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg 
      width="44" 
      height="44" 
      viewBox="0 0 24 24" 
      fill={filled ? "currentColor" : "none"}
      className={filled ? "text-amber-400" : "text-slate-300"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckSmallIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
