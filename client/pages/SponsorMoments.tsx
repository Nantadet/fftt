import { Images } from "lucide-react";
import { SponsorPageShell } from "@/components/SponsorSidebar";

const t = {
  title: "\u0e1a\u0e23\u0e23\u0e22\u0e32\u0e01\u0e32\u0e28\u0e20\u0e32\u0e22\u0e43\u0e19\u0e07\u0e32\u0e19",
  subtitle: "HLLC 2025 Moments",
  note: "",
};

const momentImages = [
  "/img_example/img_Moment/S__62185481_0.jpg",
  "/img_example/img_Moment/S__62185482_0.jpg",
  "/img_example/img_Moment/S__62185483_0.jpg",
  "/img_example/img_Moment/S__62185484_0.jpg",
  "/img_example/img_Moment/S__62185486_0.jpg",
  "/img_example/img_Moment/S__62185487_0.jpg",
  "/img_example/img_Moment/S__62185488_0.jpg",
];

const scrollingImages = [...momentImages, ...momentImages];

export default function SponsorMoments() {
  return (
    <SponsorPageShell>
      <div className="grid gap-6">
        <section className="ae-panel rounded-2xl p-6">
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/10 text-amber-200 ring-1 ring-amber-300/10">
              <Images className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-lanna text-3xl font-extrabold text-amber-50">{t.title}</h1>
              <p className="mt-1 text-sm text-amber-100/70">{t.subtitle}</p>
            </div>
          </div>
        </section>

        <section className="ae-panel overflow-hidden rounded-2xl py-5">
          <div className="relative z-10 mb-4 px-5">
            <p className="text-sm font-semibold text-amber-100/70">{t.note}</p>
          </div>
          <div className="moments-marquee relative z-10 flex w-max gap-4 px-5">
            {scrollingImages.map((src, index) => (
              <article
                key={`${src}-${index}`}
                className="w-[80vw] max-w-[460px] flex-shrink-0 overflow-hidden rounded-2xl border border-amber-300/20 bg-stone-950 shadow-[0_18px_38px_rgba(0,0,0,0.28)] sm:w-[420px]"
              >
                <img
                  src={src}
                  alt={`HLLC moment ${(index % momentImages.length) + 1}`}
                  className="h-72 w-full object-cover sm:h-80"
                />
              </article>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {momentImages.map((src, index) => (
            <article key={src} className="overflow-hidden rounded-2xl border border-amber-300/20 bg-stone-950 shadow-[0_18px_38px_rgba(0,0,0,0.28)]">
              <img
                src={src}
                alt={`HLLC moment ${index + 1}`}
                className="h-64 w-full object-cover"
              />
            </article>
          ))}
        </section>
      </div>
    </SponsorPageShell>
  );
}
