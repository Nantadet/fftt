import { CalendarDays, Clock } from "lucide-react";
import { SponsorPageShell } from "@/components/SponsorSidebar";

const t = {
  title: "\u0e01\u0e33\u0e2b\u0e19\u0e14\u0e01\u0e32\u0e23",
  subtitle: "Schedule of HLLC 2026",
};

const scheduleDays = [
  {
    date: "27 July 2026",
    events: [
      {
        time: "09:00 - 11:00",
        title: "Meet the President",
        detail: "President meeting new students / Lamduan Flower / local roots activity",
      },
      {
        time: "13:00 - 16:00",
        title: "Guest Speaker",
        detail: "Guest speaker session about student life and learning",
      },
      {
        time: "18:00 - 21:00",
        title: "Khan Tok Ceremony",
        detail: "Traditional welcome ceremony and Khan Tok event",
      },
    ],
  },
  {
    date: "28 - 30 July 2026",
    events: [
      {
        time: "08:00 - 17:00",
        title: "How to Learn",
        detail: "Students meet their schools and academic teams",
      },
      {
        time: "Activity period",
        title: "Meet the Dean",
        detail: "Students meet the dean of each school",
      },
      {
        time: "Activity period",
        title: "The Inspiration",
        detail: "Inspiration-building activity",
      },
    ],
  },
  {
    date: "31 July 2026",
    events: [
      {
        time: "09:00 - 12:00",
        title: "Guest Speaker",
        detail: "Guest speaker 1 / Green and SDG content / International and Lanna themes",
      },
      {
        time: "17:30 - 20:00",
        title: "MFU Freshers Night",
        detail: "Freshers welcome concert",
      },
    ],
  },
  {
    date: "1 August 2026",
    events: [
      {
        time: "06:00 - 12:00",
        title: "Follow Royal Path",
        detail: "Follow Royal Path activity",
      },
    ],
  },
];

export default function SponsorSchedule() {
  return (
    <SponsorPageShell>
      <div className="grid gap-6">
        <section className="ae-panel rounded-2xl p-6">
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/10 text-amber-200 ring-1 ring-amber-300/10">
              <CalendarDays className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-lanna text-3xl font-extrabold text-amber-50">{t.title}</h1>
              <p className="mt-1 text-sm text-amber-100/70">{t.subtitle}</p>
            </div>
          </div>
        </section>

        <section className="grid gap-5">
          {scheduleDays.map((day) => (
            <article key={day.date} className="ae-panel rounded-2xl p-5">
              <h2 className="relative z-10 mb-4 font-lanna text-2xl font-extrabold text-amber-100">{day.date}</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {day.events.map((event) => (
                  <div key={`${day.date}-${event.title}-${event.time}`} className="relative z-10 rounded-xl border border-amber-300/10 bg-white/5 p-4 shadow-sm backdrop-blur">
                    <p className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs font-bold text-amber-100 ring-1 ring-amber-300/10">
                      <Clock className="h-3.5 w-3.5" />
                      {event.time}
                    </p>
                    <h3 className="mt-3 font-lanna text-xl font-extrabold text-amber-50">{event.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-amber-100/70">{event.detail}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
      </div>
    </SponsorPageShell>
  );
}
