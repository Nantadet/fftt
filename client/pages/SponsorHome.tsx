import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  GraduationCap,
  MapPin,
  Megaphone,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { SponsorPageShell } from "@/components/SponsorSidebar";

const t = {
  about: "\u0e40\u0e01\u0e35\u0e48\u0e22\u0e27\u0e01\u0e31\u0e1a\u0e01\u0e34\u0e08\u0e01\u0e23\u0e23\u0e21",
  title: "\u0e01\u0e34\u0e08\u0e01\u0e23\u0e23\u0e21\u0e40\u0e15\u0e23\u0e35\u0e22\u0e21\u0e04\u0e27\u0e32\u0e21\u0e1e\u0e23\u0e49\u0e2d\u0e21\u0e2a\u0e33\u0e2b\u0e23\u0e31\u0e1a\u0e19\u0e31\u0e01\u0e28\u0e36\u0e01\u0e29\u0e32\u0e43\u0e2b\u0e21\u0e48",
  package: "\u0e14\u0e39\u0e41\u0e1e\u0e47\u0e01\u0e40\u0e01\u0e08\u0e2a\u0e1b\u0e2d\u0e19\u0e40\u0e0b\u0e2d\u0e23\u0e4c",
  objectives: "\u0e27\u0e31\u0e15\u0e16\u0e38\u0e1b\u0e23\u0e30\u0e2a\u0e07\u0e04\u0e4c",
  keyInfo: "\u0e02\u0e49\u0e2d\u0e21\u0e39\u0e25\u0e2a\u0e33\u0e04\u0e31\u0e0d",
  date: "\u0e27\u0e31\u0e19\u0e17\u0e35\u0e48",
  place: "\u0e2a\u0e16\u0e32\u0e19\u0e17\u0e35\u0e48",
  students: "\u0e19\u0e31\u0e01\u0e28\u0e36\u0e01\u0e29\u0e32\u0e43\u0e2b\u0e21\u0e48\u0e40\u0e02\u0e49\u0e32\u0e23\u0e48\u0e27\u0e21\u0e01\u0e34\u0e08\u0e01\u0e23\u0e23\u0e21",
  reach: "Reach Social Media \u0e17\u0e38\u0e01\u0e0a\u0e48\u0e2d\u0e07\u0e17\u0e32\u0e07",
};

const objectives = [
  "\u0e43\u0e2b\u0e49\u0e19\u0e31\u0e01\u0e28\u0e36\u0e01\u0e29\u0e32\u0e0a\u0e31\u0e49\u0e19\u0e1b\u0e35\u0e17\u0e35\u0e48 1 \u0e44\u0e14\u0e49\u0e23\u0e31\u0e1a\u0e41\u0e19\u0e27\u0e17\u0e32\u0e07\u0e01\u0e32\u0e23\u0e43\u0e0a\u0e49\u0e0a\u0e35\u0e27\u0e34\u0e15\u0e43\u0e19\u0e23\u0e30\u0e14\u0e31\u0e1a\u0e2d\u0e38\u0e14\u0e21\u0e28\u0e36\u0e01\u0e29\u0e32 \u0e41\u0e25\u0e30\u0e17\u0e33\u0e07\u0e32\u0e19\u0e23\u0e48\u0e27\u0e21\u0e01\u0e31\u0e1a\u0e1c\u0e39\u0e49\u0e2d\u0e37\u0e48\u0e19\u0e44\u0e14\u0e49",
  "\u0e43\u0e2b\u0e49\u0e19\u0e31\u0e01\u0e28\u0e36\u0e01\u0e29\u0e32\u0e44\u0e14\u0e49\u0e40\u0e23\u0e35\u0e22\u0e19\u0e23\u0e39\u0e49\u0e41\u0e19\u0e27\u0e17\u0e32\u0e07\u0e01\u0e32\u0e23\u0e28\u0e36\u0e01\u0e29\u0e32\u0e43\u0e19\u0e2a\u0e32\u0e02\u0e32\u0e27\u0e34\u0e0a\u0e32\u0e0a\u0e35\u0e1e\u0e02\u0e2d\u0e07\u0e15\u0e19\u0e40\u0e2d\u0e07",
  "\u0e43\u0e2b\u0e49\u0e19\u0e31\u0e01\u0e28\u0e36\u0e01\u0e29\u0e32\u0e40\u0e01\u0e34\u0e14\u0e41\u0e23\u0e07\u0e1a\u0e31\u0e19\u0e14\u0e32\u0e25\u0e43\u0e08 \u0e41\u0e25\u0e30\u0e1e\u0e31\u0e12\u0e19\u0e32\u0e28\u0e31\u0e01\u0e22\u0e20\u0e32\u0e1e\u0e02\u0e2d\u0e07\u0e15\u0e19\u0e44\u0e14\u0e49",
];

const heroImages = [
  "/img_example/img_Moment/S__62308417.jpg",
  "/img_example/img_Moment/S__62308412_0.jpg",
  "/img_example/img_Moment/S__62308416_0.jpg",
  "/img_example/img_Moment/S__62308415_0.jpg",
  "/img_example/img_Moment/S__62308410_0.jpg",
  "/img_example/img_Moment/S__62308413_0.jpg",
  "/img_example/img_Moment/S__62308414_0.jpg",
  "/img_example/img_Moment/S__62308411_0.jpg",
  "/img_example/img_Moment/S__62308409_0.jpg",
  "/img_example/img_Moment/S__62185482_0.jpg",
  "/img_example/img_Moment/S__62185483_0.jpg",
  "/img_example/img_Moment/S__62185484_0.jpg",
  "/img_example/img_Moment/S__62185486_0.jpg",
  "/img_example/img_Moment/S__62185488_0.jpg",
];

const featureHighlights = [
  {
    icon: Sparkles,
    title: "Campus Welcome",
    detail: "Ceremony, guest speaker, and student inspiration sessions",
  },
  {
    icon: BookOpen,
    title: "Learning Journey",
    detail: "Academic orientation and school-based activities",
  },
];

export default function SponsorHome() {
  const [activeHero, setActiveHero] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % heroImages.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <SponsorPageShell>
      <div className="grid gap-7">
        <section className="overflow-hidden rounded-[1.75rem] border border-amber-300/10 bg-stone-950 shadow-[0_24px_70px_rgba(0,0,0,0.3)]">
          <div className="relative min-h-[520px]">
            <div className="absolute inset-0">
              {heroImages.map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${
                    activeHero === index
                      ? "scale-100 opacity-100"
                      : "scale-105 opacity-0"
                  }`}
                />
              ))}
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,9,8,0.88)_0%,rgba(38,24,12,0.58)_48%,rgba(11,9,8,0.2)_100%),linear-gradient(135deg,rgba(251,191,36,0.1),transparent_45%)]" />
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-stone-950/70 to-transparent" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/70 to-transparent" />

            <div className="relative flex min-h-[520px] items-center px-5 py-10 text-white sm:px-10">
              <div className="lanna-hero-copy flex max-w-[760px] flex-col items-start gap-3">
                <p className="inline-flex w-fit rounded-full border border-amber-100/25 bg-stone-950/70 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-50 shadow-[0_10px_24px_rgba(0,0,0,0.22)] backdrop-blur">
                  Sponsor Benefits 2026
                </p>
                <h1 className="font-lanna text-5xl font-bold leading-none text-white drop-shadow-[0_6px_22px_rgba(0,0,0,0.55)] sm:text-7xl">
                  HLLC 2026
                </h1>

                <p className="max-w-2xl text-base font-semibold leading-9 text-white sm:text-lg">
                  <span className="hero-text-chip">
                    {t.title} HLLC 2026 at{" "}
                    <span className="whitespace-nowrap">Mae Fah Luang University.</span>
                  </span>
                </p>

                <div className="mt-3 grid gap-2 text-xs font-bold uppercase tracking-wide text-amber-50 sm:grid-cols-3">
                  <span className="rounded-xl border border-amber-100/20 bg-stone-950/60 px-3 py-2 shadow-sm backdrop-blur">27 Jul - 1 Aug</span>
                  <span className="rounded-xl border border-amber-100/20 bg-stone-950/60 px-3 py-2 shadow-sm backdrop-blur">Mae Fah Luang University</span>
                  <span className="rounded-xl border border-amber-100/20 bg-stone-950/60 px-3 py-2 shadow-sm backdrop-blur">Online + On-site</span>
                </div>

                <Link
                  to="/packages"
                  className="mt-4 inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 px-5 py-3 text-sm font-bold text-stone-950 shadow-[0_14px_30px_rgba(217,119,6,0.34)] hover:from-amber-400 hover:to-yellow-300"
                >
                  {t.package}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="ae-panel rounded-[1.35rem] p-5">
            <div className="relative z-10 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-300/10 bg-amber-300/10 text-amber-200">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="font-lanna text-3xl font-extrabold text-amber-50">4,000+</p>
                <p className="text-sm text-amber-100/70">{t.students}</p>
              </div>
            </div>
          </div>
          <div className="ae-panel rounded-[1.35rem] p-5">
            <div className="relative z-10 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-300/10 bg-amber-300/10 text-amber-200">
                <Megaphone className="h-6 w-6" />
              </div>
              <div>
                <p className="font-lanna text-3xl font-extrabold text-amber-50">50,000+</p>
                <p className="text-sm text-amber-100/70">{t.reach}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-3">
          {featureHighlights.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="ae-panel rounded-[1.35rem] p-5"
              >
                <div className="relative z-10 flex gap-4 d-lex justify-between">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-amber-300/10 bg-amber-300/10 text-amber-200 shadow-[0_10px_20px_rgba(0,0,0,0.18)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-lanna text-xl font-extrabold text-amber-50">{item.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-amber-100/70">{item.detail}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="ae-panel rounded-[1.35rem] p-6">
            <div className="relative z-10 mb-4 flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-300/10 bg-amber-300/10 text-amber-200">
                <Target className="h-5 w-5" />
              </span>
              <h2 className="font-lanna text-2xl font-extrabold text-amber-50">{t.objectives}</h2>
            </div>
            <ul className="relative z-10 grid gap-3 text-sm leading-7 text-amber-100/80">
              {objectives.map((item) => (
                <li key={item} className="rounded-xl border border-amber-200/10 bg-[#17120d]/80 p-3 shadow-sm">{item}</li>
              ))}
            </ul>
          </div>

          <div className="ae-panel rounded-[1.35rem] p-6">
            <div className="relative z-10 mb-4 flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-300/10 bg-amber-300/10 text-amber-200">
                <CalendarDays className="h-5 w-5" />
              </span>
              <h2 className="font-lanna text-2xl font-extrabold text-amber-50">{t.keyInfo}</h2>
            </div>
            <div className="relative z-10 grid gap-3 text-sm leading-7 text-amber-100/80">
              <p className="rounded-xl border border-amber-200/10 bg-[#17120d]/80 p-3 shadow-sm">{t.date}: 27 July - 1 August 2026</p>
              <p className="rounded-xl border border-amber-200/10 bg-[#17120d]/80 p-3 shadow-sm">{t.place}: Indoor Stadium, Mae Fah Luang University</p>
              <p className="rounded-xl border border-amber-200/10 bg-[#17120d]/80 p-3 shadow-sm">
                <MapPin className="mr-2 inline h-4 w-4 text-amber-200" />
                Online + On-site activities
              </p>
            </div>
          </div>
        </section>
      </div>
    </SponsorPageShell>
  );
}
