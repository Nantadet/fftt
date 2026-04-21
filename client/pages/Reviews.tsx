import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ReviewCategory {
  id: string;
  label: string;
  rating: number;
}

interface Review {
  id: string;
  reviewer: string;
  avatar: string;
  date: string;
  categories: { label: string; rating: number }[];
  comment: string;
  trip: string;
}

export default function Reviews() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"write" | "received">("write");
  
  // For writing a review
  const [categories, setCategories] = useState<ReviewCategory[]>([
    { id: "communication", label: "Communication", rating: 0 },
    { id: "responsibility", label: "Responsibility", rating: 0 },
    { id: "respectfulness", label: "Respectfulness", rating: 0 },
    { id: "punctuality", label: "Punctuality", rating: 0 },
  ]);
  const [publicComment, setPublicComment] = useState("");
  const [privateFeedback, setPrivateFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Mock received reviews
  const receivedReviews: Review[] = [
    {
      id: "1",
      reviewer: "Alex Chen",
      avatar: "A",
      date: "2 weeks ago",
      categories: [
        { label: "Communication", rating: 5 },
        { label: "Responsibility", rating: 5 },
        { label: "Respectfulness", rating: 4 },
        { label: "Punctuality", rating: 5 },
      ],
      comment: "Jasmine was an amazing travel buddy! Great communication and always on time. Would definitely travel with again!",
      trip: "Chiang Mai Adventure",
    },
    {
      id: "2",
      reviewer: "Maya Lopez",
      avatar: "M",
      date: "1 month ago",
      categories: [
        { label: "Communication", rating: 4 },
        { label: "Responsibility", rating: 5 },
        { label: "Respectfulness", rating: 5 },
        { label: "Punctuality", rating: 4 },
      ],
      comment: "Very respectful and responsible. Easy to plan with and flexible when things changed.",
      trip: "Bangkok Food Tour",
    },
  ];

  const setRating = (categoryId: string, rating: number) => {
    setCategories(prev =>
      prev.map(c => c.id === categoryId ? { ...c, rating } : c)
    );
  };

  const handleSubmit = () => {
    if (categories.every(c => c.rating > 0)) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setCategories(categories.map(c => ({ ...c, rating: 0 })));
        setPublicComment("");
        setPrivateFeedback("");
      }, 2000);
    }
  };

  const averageRating = categories.reduce((sum, c) => sum + c.rating, 0) / categories.length || 0;

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
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Reviews</p>
          </div>

          <div className="h-10 w-10" />
        </header>

        {/* Tab Switcher */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => setActiveTab("write")}
              className={`rounded-xl py-2.5 text-sm font-semibold transition ${
                activeTab === "write"
                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              Write Review
            </button>
            <button
              onClick={() => setActiveTab("received")}
              className={`rounded-xl py-2.5 text-sm font-semibold transition ${
                activeTab === "received"
                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              My Reviews
            </button>
          </div>
        </div>

        {activeTab === "write" ? (
          <WriteReviewView 
            categories={categories}
            setRating={setRating}
            publicComment={publicComment}
            setPublicComment={setPublicComment}
            privateFeedback={privateFeedback}
            setPrivateFeedback={setPrivateFeedback}
            averageRating={averageRating}
            submitted={submitted}
            onSubmit={handleSubmit}
          />
        ) : (
          <ReceivedReviewsView reviews={receivedReviews} />
        )}
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
          <NavItem to="/chat" label="Chat" icon={<ChatIcon />} />
          <NavItem to="/trips" label="Trips" icon={<BagIcon />} />
          <NavItem to="/organizer" label="Organizer" icon={<CrownIcon />} />
        </div>
      </nav>
    </div>
  );
}

function WriteReviewView({
  categories,
  setRating,
  publicComment,
  setPublicComment,
  privateFeedback,
  setPrivateFeedback,
  averageRating,
  submitted,
  onSubmit,
}: {
  categories: ReviewCategory[];
  setRating: (id: string, rating: number) => void;
  publicComment: string;
  setPublicComment: (value: string) => void;
  privateFeedback: string;
  setPrivateFeedback: (value: string) => void;
  averageRating: number;
  submitted: boolean;
  onSubmit: () => void;
}) {
  return (
    <main className="mt-4 flex-1 space-y-4 pb-5">
      {/* Reviewee Info */}
      <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center text-2xl font-bold text-white">
            A
          </div>
          <div>
            <p className="text-sm text-slate-400">Rate your trip companion</p>
            <h2 className="text-xl font-bold text-slate-900">Alex Chen</h2>
            <p className="text-sm text-slate-500">Chiang Mai Adventure • May 2024</p>
          </div>
        </div>
      </section>

      {/* Category Ratings */}
      <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Rate by Category
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Your honest feedback helps build a trusted community
        </p>
        
        <div className="mt-4 space-y-4">
          {categories.map((category) => (
            <div key={category.id}>
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-700">{category.label}</span>
                <span className="text-sm font-bold text-red-600">
                  {category.rating > 0 ? `${category.rating}/5` : "-"}
                </span>
              </div>
              <div className="mt-2 flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(category.id, star)}
                    className="transition hover:scale-110"
                  >
                    <StarIcon filled={star <= category.rating} />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Average */}
        <div className="mt-6 rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700">Overall Rating</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-slate-900">
                {averageRating > 0 ? averageRating.toFixed(1) : "-"}
              </span>
              <span className="text-sm text-slate-400">/ 5</span>
            </div>
          </div>
        </div>
      </section>

      {/* Public Review */}
      <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-600">PUBLIC</span>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Public Review
          </h2>
        </div>
        <p className="mt-2 text-xs text-slate-400">
          This will be visible on Alex's profile
        </p>
        <textarea
          value={publicComment}
          onChange={(e) => setPublicComment(e.target.value)}
          placeholder="Share your experience traveling with Alex..."
          className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 resize-none"
          rows={4}
        />
      </section>

      {/* Private Feedback */}
      <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">PRIVATE</span>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Private Feedback (Optional)
          </h2>
        </div>
        <p className="mt-2 text-xs text-slate-400">
          Only visible to WithMe team for quality improvement
        </p>
        <textarea
          value={privateFeedback}
          onChange={(e) => setPrivateFeedback(e.target.value)}
          placeholder="Any private feedback you'd like to share..."
          className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 resize-none"
          rows={3}
        />
      </section>

      {/* Submit Button */}
      <button
        onClick={onSubmit}
        disabled={submitted || categories.some(c => c.rating === 0)}
        className={`w-full rounded-2xl py-4 font-nunito text-lg font-bold transition ${
          submitted
            ? "bg-green-500 text-white"
            : categories.some(c => c.rating === 0)
            ? "bg-slate-200 text-slate-400 cursor-not-allowed"
            : "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-[0_18px_30px_rgba(239,68,68,0.25)] hover:from-red-600 hover:to-red-700"
        }`}
      >
        {submitted ? "✓ Review Submitted!" : "Submit Review"}
      </button>
    </main>
  );
}

function ReceivedReviewsView({ reviews }: { reviews: Review[] }) {
  const [expandedReview, setExpandedReview] = useState<string | null>(null);

  return (
    <main className="mt-4 flex-1 space-y-4 pb-5">
      {/* Summary Card */}
      <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Your Reputation Score</p>
            <p className="text-3xl font-black text-slate-900">4.8<span className="text-lg text-slate-400">/5</span></p>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-500 text-2xl shadow-lg">
            ⭐
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between rounded-2xl bg-slate-50 p-4">
          <div className="text-center flex-1">
            <p className="text-xl font-bold text-slate-900">{reviews.length}</p>
            <p className="text-xs text-slate-400">Reviews</p>
          </div>
          <div className="h-10 w-px bg-slate-200"></div>
          <div className="text-center flex-1">
            <p className="text-xl font-bold text-green-600">100%</p>
            <p className="text-xs text-slate-400">Would travel again</p>
          </div>
        </div>
      </section>

      {/* Reviews List */}
      <section className="space-y-3">
        <h2 className="px-1 text-lg font-bold text-slate-900">Recent Reviews</h2>
        
        {reviews.map((review) => (
          <article key={review.id} className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
            {/* Reviewer Header */}
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center text-lg font-bold text-white">
                {review.avatar}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{review.reviewer}</p>
                <p className="text-xs text-slate-400">{review.date} • {review.trip}</p>
              </div>
            </div>

            {/* Category Ratings */}
            <div className="mt-4 space-y-2">
              {review.categories.map((cat, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{cat.label}</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={star <= cat.rating ? "text-amber-400" : "text-slate-200"}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Comment */}
            <div className="mt-4">
              <p className={`text-sm text-slate-600 ${expandedReview === review.id ? "" : "line-clamp-2"}`}>
                "{review.comment}"
              </p>
              {review.comment.length > 80 && (
                <button 
                  onClick={() => setExpandedReview(expandedReview === review.id ? null : review.id)}
                  className="mt-1 text-xs font-semibold text-red-500"
                >
                  {expandedReview === review.id ? "Show less" : "Read more"}
                </button>
              )}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg 
      width="28" 
      height="28" 
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

function CrownIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 16L3 5l5.5 3L12 4l3.5 4L21 5l-2 11H5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
