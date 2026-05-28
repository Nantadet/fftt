import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Banknote,
  Gift,
  Ticket,
  Star,
  Award,
  Crown,
  Medal,
  Sparkles,
  CircleDot,
  CheckCircle2,
  Lightbulb,
  ThumbsUp,
  Instagram,
  Video,
  Camera,
  Clapperboard,
  Music,
  Globe,
  MonitorPlay,
  Smartphone,
  Info,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  cashSponsorship,
  prizeSponsorship,
  evoucherOptions,
} from "@/data/sponsorshipData";
import type { Package, BenefitGroup, EvoucherOption, Category } from "@/data/sponsorshipData";
import { useRef } from "react";

function getTierIcon(tier: string, className = "h-5 w-5") {
  switch (tier) {
    case "bronze":
      return <Medal className={className} />;
    case "silver":
      return <Award className={className} />;
    case "gold":
      return <Star className={className} />;
    case "platinum":
      return <Crown className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}

function extractPercent(text: string): string | null {
  const match = text.match(/ร้อยละ\s*(\d+)|(\d+)\s*เปอร์เซ็นต์|(\d+)%/);
  if (match) {
    const val = match[1] || match[2] || match[3];
    return val ? `${val}%` : null;
  }
  return null;
}

function detectMediaType(text: string): { icon: React.ReactNode; label: string; style: React.CSSProperties } | null {
  const lower = text.toLowerCase();
  if (lower.includes("tiktok")) {
    return {
      icon: <Music className="h-3.5 w-3.5" />,
      label: "TikTok",
      style: { background: "linear-gradient(90deg, #25F4EE, #FE2C55)", color: "#fff" },
    };
  }
  if (lower.includes("reels")) {
    return {
      icon: <Instagram className="h-3.5 w-3.5" />,
      label: "Reels",
      style: { background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)", color: "#fff" },
    };
  }
  if (lower.includes("short ads")) {
    return {
      icon: <Clapperboard className="h-3.5 w-3.5" />,
      label: "Short Ads",
      style: { background: "linear-gradient(90deg, #FF0000, #CC0000)", color: "#fff" },
    };
  }
  if (lower.includes("photo set")) {
    return {
      icon: <Camera className="h-3.5 w-3.5" />,
      label: "Photo Set",
      style: { background: "linear-gradient(90deg, #1877F2, #42A5F5)", color: "#fff" },
    };
  }
  if (lower.includes("vdo") || lower.includes("video")) {
    return {
      icon: <Video className="h-3.5 w-3.5" />,
      label: "Video",
      style: { background: "linear-gradient(90deg, #FF0000, #FF4444)", color: "#fff" },
    };
  }
  if (lower.includes("application")) {
    return {
      icon: <Smartphone className="h-3.5 w-3.5" />,
      label: "App",
      style: { background: "linear-gradient(90deg, #34A853, #0F9D58)", color: "#fff" },
    };
  }
  if (lower.includes("artwork")) {
    return {
      icon: <Globe className="h-3.5 w-3.5" />,
      label: "Artwork",
      style: { background: "linear-gradient(90deg, #FB8C00, #FFB74D)", color: "#fff" },
    };
  }
  if (lower.includes("บูธ")) {
    return {
      icon: <MonitorPlay className="h-3.5 w-3.5" />,
      label: "Booth",
      style: { background: "linear-gradient(90deg, #E91E63, #F48FB1)", color: "#fff" },
    };
  }
  if (lower.includes("influencer")) {
    return {
      icon: <Star className="h-3.5 w-3.5" />,
      label: "Influencer",
      style: { background: "linear-gradient(90deg, #9C27B0, #E1BEE7)", color: "#fff" },
    };
  }
  return null;
}

function MediaBanner({ text }: { text: string }) {
  const media = detectMediaType(text);
  if (!media) return null;
  return (
    <div
      className="absolute top-0 right-0 z-10 flex items-center gap-1 rounded-bl-xl rounded-tr-lg px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide shadow-md"
      style={media.style}
    >
      {media.icon}
      {media.label}
    </div>
  );
}

function PercentBadge({ text }: { text: string }) {
  const percent = extractPercent(text);
  if (!percent) return null;
  return (
    <span className="ml-1.5 inline-flex items-center rounded-md bg-orange-500 px-1.5 py-0.5 text-[10px] font-extrabold text-white shadow-sm">
      {percent}
    </span>
  );
}

function ContactPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm border border-white/20 hover:bg-black/80 transition-colors shadow-lg"
          title="Contact Channels"
        >
          <Info className="h-5 w-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start" sideOffset={8}>
        <div className="px-4 py-3 border-b">
          <p className="text-sm font-bold text-foreground">Contact Channels</p>
          <p className="text-xs text-muted-foreground">How to Live and Learn on Campus 2026</p>
        </div>
        <div className="p-2 space-y-1">
          <a
            href="https://www.facebook.com/mfuactivities"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-muted transition-colors group"
            title="MFU Activities"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1877F2] text-white flex-shrink-0">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold">Facebook</p>
              <p className="text-xs text-muted-foreground truncate">@mfuactivities</p>
            </div>
          </a>
          <a
            href="https://www.instagram.com/mfu_activities/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-muted transition-colors group"
            title="MFU Activities"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white flex-shrink-0">
              <Instagram className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold">Instagram</p>
              <p className="text-xs text-muted-foreground truncate">@mfu_activities</p>
            </div>
          </a>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function FloatingLogo() {
  return (
    <div className="absolute top-3 right-3 z-50">
      <img
        src="/logo.jpg"
        alt="Logo"
        className="h-14 w-14 rounded-full border-2 border-white/30 object-cover shadow-lg sm:h-16 sm:w-16"
      />
    </div>
  );
}

function BenefitContent({ group }: { group: BenefitGroup }) {
  return (
    <div className="space-y-3 py-1">
      {group.items.map((item, idx) => (
        <div key={idx} className="relative rounded-lg bg-muted/50 p-3 overflow-hidden">
          <MediaBanner text={item.title} />
          <div className="flex items-center gap-1 flex-wrap pr-16">
            <p className="text-sm font-semibold text-foreground">{item.title}</p>
            <PercentBadge text={item.description || ""} />
            <PercentBadge text={item.title} />
          </div>
          {item.description && (
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          )}
          {item.details && item.details.length > 0 && (
            <ul className="mt-2 space-y-1">
              {item.details.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CircleDot className="mt-1 h-3 w-3 flex-shrink-0 text-muted-foreground/50" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

function PackageAccordion({ pkg }: { pkg: Package }) {
  const isPlatinum = pkg.tier === "platinum";
  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <AccordionItem
      ref={itemRef}
      value={pkg.id}
      className={`relative rounded-xl border shadow-sm overflow-hidden transition-all duration-300 ${
        isPlatinum
          ? "border-amber-300/80 bg-gradient-to-br from-amber-50/80 via-white to-orange-50/80 shadow-md hover:shadow-xl hover:-translate-y-0.5"
          : "bg-white hover:shadow-md hover:-translate-y-0.5"
      }`}
    >
      {isPlatinum && (
        <div className="absolute top-0 right-0 z-10 flex items-center gap-1 rounded-bl-xl rounded-tr-lg bg-gradient-to-r from-amber-500 to-orange-500 px-2.5 py-1 text-[10px] font-extrabold text-white uppercase tracking-wide shadow-md">
          <ThumbsUp className="h-3.5 w-3.5" />
          Recommend
        </div>
      )}
      <AccordionTrigger className={`relative z-10 px-4 py-4 hover:no-underline transition-colors ${
        isPlatinum ? "hover:bg-amber-100/40" : "hover:bg-muted/30"
      }`}>
        <div className="flex items-center gap-3 text-left w-full pr-2">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl text-white flex-shrink-0 ${
              isPlatinum ? "shadow-inner ring-2 ring-amber-200" : ""
            }`}
            style={{ backgroundColor: pkg.color }}
          >
            {getTierIcon(pkg.tier, "h-5 w-5")}
          </div>
          <div className="min-w-0 flex-1">
            <p className={`text-base font-bold ${isPlatinum ? "text-amber-900" : "text-foreground"}`}>
              {pkg.name}
            </p>
            <p className="text-sm text-muted-foreground truncate">{pkg.amount}</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="relative z-10 px-4 pb-4">
        <Accordion type="single" collapsible className="w-full" onValueChange={(val) => {
          if (val) {
            setTimeout(() => {
              const el = document.querySelector(`[data-value="${val}"]`);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }, 350);
          }
        }}>
          {pkg.benefits.map((group, gi) => (
            <AccordionItem
              key={gi}
              value={`${pkg.id}-g${gi}`}
              className="border-b last:border-b-0"
            >
              <AccordionTrigger className={`py-3 text-sm font-semibold hover:no-underline transition-colors ${
                isPlatinum ? "hover:text-amber-700" : "hover:text-red-600"
              }`}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`h-4 w-4 ${isPlatinum ? "text-amber-500" : "text-muted-foreground"}`} />
                  {group.title}
                  <PercentBadge text={group.title} />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <BenefitContent group={group} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </AccordionContent>
    </AccordionItem>
  );
}

function EvoucherAccordion({ opt }: { opt: EvoucherOption }) {
  return (
    <AccordionItem
      value={opt.id}
      className="rounded-xl border bg-white shadow-sm overflow-hidden"
    >
      <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-muted/30 transition-colors">
        <div className="flex items-center gap-3 text-left w-full pr-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white flex-shrink-0">
            <Ticket className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-base font-bold text-foreground">{opt.title}</p>
            <p className="text-sm text-muted-foreground truncate">{opt.description}</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <ul className="space-y-2 py-1">
          {opt.details.map((d, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <CircleDot className="mt-1 h-3 w-3 flex-shrink-0 text-emerald-400" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
}

function CategoryNotes({ category }: { category: Category }) {
  const notes: { text: string; appliesTo?: string | null; pkgName: string; color: string }[] = [];

  category.packages.forEach((pkg) => {
    if (pkg.notes && pkg.notes.length > 0) {
      pkg.notes.forEach((note) => {
        notes.push({
          text: note.text,
          appliesTo: note.appliesTo,
          pkgName: pkg.name,
          color: pkg.color,
        });
      });
    }
  });

  if (notes.length === 0) return null;

  return (
    <div className="mt-4 rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-4 shadow-sm">
      <p className="mb-3 text-sm font-extrabold text-amber-900 flex items-center gap-2">
        <Lightbulb className="h-4 w-4 text-amber-600" />
        หมายเหตุเพิ่มเติม — {category.title}
      </p>
      <div className="space-y-3">
        {notes.map((note, i) => (
          <div
            key={i}
            className="relative flex items-start gap-3 rounded-lg border border-amber-100 bg-white p-3 overflow-hidden"
          >
            <div
              className="mt-0.5 h-2.5 w-2.5 flex-shrink-0 rounded-full"
              style={{ backgroundColor: note.color }}
            />
            <div className="min-w-0 flex-1">
              {note.appliesTo && (
                <Badge className="mb-1.5 bg-amber-100 text-amber-800 border-amber-200 text-xs font-semibold">
                  {note.appliesTo}
                </Badge>
              )}
              <p className="text-sm leading-relaxed text-amber-950 pr-16">{note.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function scrollToOpenItem(value: string) {
  if (!value) return;
  setTimeout(() => {
    const el = document.querySelector(`[data-value="${value}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 350);
}

export default function SponsorshipPackages() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Fixed Contact Button */}
      <div className="fixed top-4 left-4 z-50">
        <ContactPopover />
      </div>

      {/* Hero with bg.jpg background image */}
      <div className="relative overflow-hidden px-6 pb-10 pt-10 text-white">
        <FloatingLogo />
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/bg.jpg')`,
          }}
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <Badge
            variant="secondary"
            className="mb-4 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
          >
            ประจำปีการศึกษา 2569
          </Badge>
          <h1 className="font-nunito text-3xl font-extrabold leading-tight sm:text-4xl drop-shadow-lg">
            สิทธิประโยชน์ของผู้สนับสนุน
          </h1>
          <p className="text-sm text-white/80 drop-shadow-md">
            How to Live and Learn on Campus 2026
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-8 space-y-10">
        {/* Cash Sponsorship */}
        <section>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
              <Banknote className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{cashSponsorship.title}</h2>
              <p className="text-sm text-muted-foreground">
                {cashSponsorship.subtitle}
              </p>
            </div>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-3" onValueChange={scrollToOpenItem}>
            {cashSponsorship.packages.map((pkg) => (
              <PackageAccordion key={pkg.id} pkg={pkg} />
            ))}
          </Accordion>
          <CategoryNotes category={cashSponsorship} />
        </section>

        {/* Prize Sponsorship */}
        <section>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
              <Gift className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{prizeSponsorship.title}</h2>
              <p className="text-sm text-muted-foreground">
                {prizeSponsorship.subtitle}
              </p>
            </div>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-3" onValueChange={scrollToOpenItem}>
            {prizeSponsorship.packages.map((pkg) => (
              <PackageAccordion key={pkg.id} pkg={pkg} />
            ))}
          </Accordion>
          <CategoryNotes category={prizeSponsorship} />
        </section>

        {/* E-Voucher */}
        <section>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
              <Ticket className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold">E-Voucher (เพิ่มเติม)</h2>
              <p className="text-sm text-muted-foreground">
                ตัวเลือกสำหรับผู้สนับสนุน
              </p>
            </div>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-3" onValueChange={scrollToOpenItem}>
            {evoucherOptions.map((opt) => (
              <EvoucherAccordion key={opt.id} opt={opt} />
            ))}
          </Accordion>
        </section>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground pb-8">
          <p>How to Live and Learn on Campus 2026</p>
        </div>
      </div>
    </div>
  );
}
