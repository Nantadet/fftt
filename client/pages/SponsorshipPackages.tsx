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
  ExternalLink,
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

const tierThemes: Record<
  string,
  {
    card: string;
    icon: string;
    accent: string;
    title: string;
    tag: string;
    hover: string;
  }
> = {
  bronze: {
    card: "border-[#c47a3d]/30 bg-[linear-gradient(145deg,rgba(65,35,20,0.94),rgba(18,12,10,0.98))] shadow-[0_20px_58px_rgba(79,38,14,0.24)]",
    icon: "bg-[linear-gradient(145deg,#8f4b24,#d28a4a,#f0c08d)] text-amber-50 ring-[#d28a4a]/40",
    accent: "text-[#f0c08d]",
    title: "text-[#f4caa4]",
    tag: "from-[#7c351a]/90 via-[#c47a3d]/80 to-[#f0b36b]/80 text-amber-50 shadow-[0_0_24px_rgba(196,122,61,0.36)]",
    hover: "hover:border-[#f0b36b]/50",
  },
  silver: {
    card: "border-slate-300/30 bg-[linear-gradient(145deg,rgba(47,53,61,0.94),rgba(13,15,18,0.98))] shadow-[0_20px_58px_rgba(15,23,42,0.28)]",
    icon: "bg-[linear-gradient(145deg,#6b7280,#d1d5db,#f8fafc)] text-slate-950 ring-slate-300/40",
    accent: "text-slate-200",
    title: "text-slate-100",
    tag: "from-slate-500/90 via-slate-300/70 to-white/60 text-slate-950 shadow-[0_0_24px_rgba(203,213,225,0.28)]",
    hover: "hover:border-slate-200/50",
  },
  gold: {
    card: "border-amber-300/30 bg-[linear-gradient(145deg,rgba(86,54,13,0.96),rgba(21,14,7,0.98))] shadow-[0_22px_64px_rgba(180,83,9,0.26)]",
    icon: "bg-[linear-gradient(145deg,#b45309,#f59e0b,#fde68a)] text-stone-950 ring-amber-200/50",
    accent: "text-amber-200",
    title: "text-amber-100",
    tag: "from-amber-500/95 via-yellow-300/80 to-amber-100/80 text-stone-950 shadow-[0_0_30px_rgba(245,158,11,0.42)]",
    hover: "hover:border-amber-200/60",
  },
  platinum: {
    card: "border-amber-200/40 bg-[linear-gradient(145deg,rgba(9,25,48,0.98),rgba(8,11,18,0.98)_52%,rgba(62,41,13,0.8))] shadow-[0_24px_72px_rgba(15,23,42,0.42),0_0_34px_rgba(251,191,36,0.16)]",
    icon: "bg-[linear-gradient(145deg,#0f2f5a,#174d87,#f6d36b)] text-amber-50 ring-amber-200/50",
    accent: "text-amber-200",
    title: "text-amber-50",
    tag: "from-sky-900/90 via-amber-300/80 to-yellow-100/80 text-stone-950 shadow-[0_0_34px_rgba(251,191,36,0.46)]",
    hover: "hover:border-amber-100/70",
  },
};

function getTierTheme(tier: string) {
  return tierThemes[tier] ?? tierThemes.gold;
}

function getBenefitChips(text: string): string[] {
  const lower = text.toLowerCase();
  const chips: string[] = [];

  if (lower.includes("logo")) chips.push("Logo on Media");
  if (lower.includes("application")) chips.push("Application");
  if (lower.includes("artwork")) chips.push("Artwork");
  if (lower.includes("vdo") || lower.includes("video")) chips.push("Video Placement");
  if (lower.includes("photo set")) chips.push("Photo Set");
  if (lower.includes("reels")) chips.push("Reels");
  if (lower.includes("short ads")) chips.push("Short Ads");
  if (lower.includes("tiktok")) chips.push("TikTok Content");
  if (lower.includes("ไลฟ์สด") || lower.includes("live")) chips.push("Live Promotion");
  if (lower.includes("2.1") || lower.includes("2.2")) chips.push("MC Mention");
  if (lower.includes("facebook") || lower.includes("instagram")) chips.push("Social Media");
  if (lower.includes("booth") || lower.includes("à¸šà¸¹à¸˜")) chips.push("Booth Space");

  return [...new Set(chips)].slice(0, 4);
}

function detectMediaType(text: string): { icon: React.ReactNode; label: string; style: React.CSSProperties } | null {
  const lower = text.toLowerCase();
  if (lower.includes("ไลฟ์สด") || lower.includes("live")) {
    return {
      icon: <MonitorPlay className="h-3.5 w-3.5" />,
      label: "Live",
      style: { background: "linear-gradient(90deg, #E1306C, #FE2C55, #25F4EE)", color: "#fff" },
    };
  }
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
      className="absolute right-0 top-0 z-10 flex items-center gap-1 rounded-bl-2xl rounded-tr-[1rem] border border-white/20 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wide shadow-[0_10px_28px_rgba(0,0,0,0.22)] backdrop-blur-md"
      style={media.style}
    >
      {media.icon}
      {media.label}
    </div>
  );
}

type MediaExample = {
  label: string;
  meta: string;
  href?: string;
  platform: string;
  thumbnail?: string;
  gradient: string;
  icon: React.ReactNode;
};

function getMediaExamples(text: string, description = ""): MediaExample[] {
  const combinedText = `${text} ${description}`;
  const lower = combinedText.toLowerCase();

  if (lower.includes("ไลฟ์สด") || lower.includes("live")) {
    return [];
  }

  if (lower.includes("photo set")) {
    const photoSetExamples = [
      {
        label: "Photo Set Example 1",
        kind: "4 รูป",
        meta: "Instagram post",
        href: "https://www.instagram.com/p/DL9JVVEvY0g/?igsh=MWVoejRjYXZsb2JxNg==",
        platform: "Instagram",
        thumbnail: "/img_example/S__62070807_0.jpg",
        gradient: "from-blue-600 to-sky-500",
        icon: <Camera className="h-3.5 w-3.5" />,
      },
      {
        label: "Photo Set Example 2",
        kind: "6 รูป",
        meta: "Instagram post",
        href: "https://www.instagram.com/p/DMAVlM_Pjtx/?igsh=MXZneG5lbjRqM3Rreg==",
        platform: "Instagram",
        thumbnail: "/img_example/S__62070812_0.jpg",
        gradient: "from-blue-600 to-sky-500",
        icon: <Camera className="h-3.5 w-3.5" />,
      },
    ];

    if (combinedText.includes("4 รูป")) {
      return photoSetExamples.filter((example) => example.kind === "4 รูป");
    }

    if (combinedText.includes("6 รูป")) {
      return photoSetExamples.filter((example) => example.kind === "6 รูป");
    }

    return photoSetExamples;
  }

  if (lower.includes("short ads")) {
    return [
      {
        label: "Short Ads Example",
        meta: "Instagram reel",
        href: "https://www.instagram.com/reel/C-FYzRMPjwG/?igsh=MTRhdXY2NWFnczVoaw==",
        platform: "Short Ads",
        gradient: "from-red-600 via-red-500 to-rose-500",
        icon: <Clapperboard className="h-3.5 w-3.5" />,
      },
    ];
  }

  if (lower.includes("reels")) {
    return [
      {
        label: "Reels 40-60s Example",
        meta: "Instagram reel",
        href: "https://www.instagram.com/reel/C9yrX2eP0k8/?igsh=MTdhZzR4bGp5YTVqZg==",
        platform: "Reels",
        gradient: "from-fuchsia-600 via-rose-500 to-orange-400",
        icon: <Instagram className="h-3.5 w-3.5" />,
      },
    ];
  }

  if (lower.includes("tiktok")) {
    return [
      {
        label: "TikTok Content Example",
        meta: "1 นาที 30 วินาที",
        href: "https://vt.tiktok.com/ZSxpbaQoP/",
        platform: "TikTok",
        gradient: "from-cyan-400 via-slate-900 to-rose-500",
        icon: <Music className="h-3.5 w-3.5" />,
      },
    ];
  }

  return [];
}

function MediaExampleLinks({ text, description }: { text: string; description?: string }) {
  const examples = getMediaExamples(text, description);
  if (examples.length === 0) return null;

  return (
    <div className={`mt-3 grid gap-2 ${examples.length > 1 ? "sm:grid-cols-2" : ""}`}>
      {examples.map((example) => {
        const cardClasses =
          "group relative min-h-[92px] overflow-hidden rounded-2xl border border-amber-200/20 bg-slate-950 text-white shadow-[0_14px_34px_rgba(0,0,0,0.24)] transition hover:-translate-y-0.5 hover:border-amber-200/40 hover:shadow-[0_18px_44px_rgba(0,0,0,0.32)] focus:outline-none focus:ring-2 focus:ring-amber-300";
        const cardContent = (
          <>
            {example.thumbnail ? (
              <img
                src={example.thumbnail}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#100b08_0%,#25160b_56%,#090807_100%)]" />
                <div className={`absolute inset-0 bg-gradient-to-r ${example.gradient} opacity-35`} />
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50" />
            <div className="relative flex min-h-[92px] items-end justify-between gap-3 p-3.5">
              <div className="min-w-0">
                <div className="mb-1 inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white/90 backdrop-blur-sm">
                  {example.icon}
                  {example.platform}
                </div>
                <p className="truncate text-sm font-extrabold text-amber-50">{example.label}</p>
                <p className="text-[11px] font-semibold text-amber-100/80">{example.meta}</p>
              </div>
              <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm transition group-hover:scale-105">
                {example.href ? (
                  <ExternalLink className="h-4 w-4" />
                ) : (
                  <MonitorPlay className="h-4 w-4" />
                )}
              </span>
            </div>
          </>
        );

        return example.href ? (
          <a
            key={`${example.label}-${example.platform}`}
            href={example.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cardClasses}
          >
            {cardContent}
          </a>
        ) : (
          <div key={`${example.label}-${example.platform}`} className={cardClasses}>
            {cardContent}
          </div>
        );
      })}
    </div>
  );
}

function PercentBadge({ text }: { text: string }) {
  const percent = extractPercent(text);
  if (!percent) return null;
  return (
    <span className="ml-1.5 inline-flex items-center rounded-full border border-amber-200/20 bg-amber-300/20 px-2 py-0.5 text-[10px] font-extrabold text-amber-100 shadow-sm backdrop-blur">
      {percent}
    </span>
  );
}

function ContactPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="flex h-11 w-11 items-center justify-center rounded-full border border-amber-200/25 bg-stone-950/70 text-amber-100 shadow-[0_14px_34px_rgba(0,0,0,0.28)] backdrop-blur-md transition-colors hover:bg-stone-950"
          title="Contact Channels"
        >
          <Info className="h-5 w-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 overflow-hidden border-amber-200/20 bg-stone-950 p-0 text-amber-50" align="start" sideOffset={8}>
        <div className="border-b border-amber-200/20 bg-amber-300/10 px-4 py-3">
          <p className="text-sm font-bold text-amber-50">Contact Channels</p>
          <p className="text-xs text-amber-100/70">How to Live and Learn on Campus 2026</p>
        </div>
        <div className="p-2 space-y-1">
          <a
            href="https://www.facebook.com/mfuactivities"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-amber-300/10"
            title="MFU Activities"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1877F2] text-white flex-shrink-0">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-amber-50">Facebook</p>
              <p className="truncate text-xs text-amber-100/60">@mfuactivities</p>
            </div>
          </a>
          <a
            href="https://www.instagram.com/mfu_activities/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-amber-300/10"
            title="MFU Activities"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white flex-shrink-0">
              <Instagram className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-amber-50">Instagram</p>
              <p className="truncate text-xs text-amber-100/60">@mfu_activities</p>
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
        src="/HLLC logo.png"
        alt="Logo"
        className="h-14 w-14 rounded-2xl border border-amber-200/30 bg-stone-950 object-contain p-1.5 shadow-[0_16px_36px_rgba(0,0,0,0.35)] sm:h-16 sm:w-16"
      />
    </div>
  );
}

function BenefitContent({ group }: { group: BenefitGroup }) {
  return (
    <div className="space-y-3 py-1">
      {group.items.map((item, idx) => {
        const chips = getBenefitChips(`${item.title} ${item.description ?? ""}`);

        return (
          <div key={idx} className="relative overflow-hidden rounded-2xl border border-amber-200/10 bg-white/5 p-4 shadow-sm backdrop-blur">
            <MediaBanner text={item.title} />
            <div className="flex flex-wrap items-center gap-1 pr-16">
              <p className="text-sm font-semibold text-amber-50">{item.title}</p>
              <PercentBadge text={item.description || ""} />
              <PercentBadge text={item.title} />
            </div>
            {chips.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {chips.map((chip) => (
                  <span key={chip} className="ae-benefit-chip">
                    <CheckCircle2 className="h-3 w-3" />
                    {chip}
                  </span>
                ))}
              </div>
            )}
            {item.description && (
              <p className="mt-2 text-sm leading-relaxed text-amber-50/80">
                {item.description}
              </p>
            )}
            {item.details && item.details.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {item.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-amber-50/80">
                    <CircleDot className="mt-1 h-3 w-3 flex-shrink-0 text-amber-300/60" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            )}
            <MediaExampleLinks text={item.title} description={item.description} />
          </div>
        );
      })}
    </div>
  );
}

function PackageAccordion({ pkg }: { pkg: Package }) {
  const isPlatinum = pkg.tier === "platinum";
  const tierTheme = getTierTheme(pkg.tier);
  const packageTag = isPlatinum ? "Recommend" : pkg.tier === "gold" ? "Best Seller" : null;
  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <AccordionItem
      ref={itemRef}
      value={pkg.id}
      className={`ae-package-card relative overflow-hidden rounded-[1.35rem] border shadow-sm transition-all duration-300 hover:-translate-y-0.5 ${tierTheme.card} ${tierTheme.hover}`}
    >
      {packageTag && (
        <div className={`absolute right-0 top-0 z-20 flex items-center gap-1 rounded-bl-2xl rounded-tr-[1.35rem] border border-white/25 bg-gradient-to-r px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wide backdrop-blur-xl ${tierTheme.tag}`}>
          <ThumbsUp className="h-3.5 w-3.5" />
          {packageTag}
        </div>
      )}
      <AccordionTrigger className="relative z-10 px-5 py-5 transition-colors hover:bg-white/[0.045] hover:no-underline">
        <div className="flex w-full items-center gap-4 pr-2 text-left">
          <div
            className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl shadow-inner ring-2 ${tierTheme.icon}`}
          >
            {getTierIcon(pkg.tier, "h-5 w-5")}
          </div>
          <div className="min-w-0 flex-1">
            <p className={`font-lanna text-lg font-extrabold ${tierTheme.title}`}>
              {pkg.name}
            </p>
            <p className="truncate text-sm font-medium text-amber-100/80">{pkg.amount}</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="relative z-10 px-5 pb-5">
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
              className="border-b border-amber-200/10 last:border-b-0"
            >
              <AccordionTrigger className="py-3 text-sm font-semibold text-amber-50/90 transition-colors hover:text-amber-200 hover:no-underline">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`h-4 w-4 ${tierTheme.accent}`} />
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
      className="ae-package-card overflow-hidden rounded-[1.25rem] border border-emerald-300/25 bg-[linear-gradient(145deg,rgba(8,47,39,0.92),rgba(7,15,12,0.98))] shadow-[0_18px_46px_rgba(0,0,0,0.24)]"
    >
      <AccordionTrigger className="px-5 py-5 transition-colors hover:bg-white/[0.045] hover:no-underline">
        <div className="flex w-full items-center gap-4 pr-2 text-left">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#059669,#34d399,#d1fae5)] text-emerald-950 ring-2 ring-emerald-200/40">
            <Ticket className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="font-lanna text-lg font-bold text-emerald-50">{opt.title}</p>
            <p className="truncate text-sm text-emerald-100/70">{opt.description}</p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-5 pb-5">
        <ul className="space-y-2 py-1">
          {opt.details.map((d, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-emerald-100/70">
              <CircleDot className="mt-1 h-3 w-3 flex-shrink-0 text-emerald-300/70" />
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
    <div className="ae-panel mt-5 rounded-[1.5rem] p-5 sm:p-6">
      <p className="mb-3 flex items-center gap-2 text-sm font-extrabold text-amber-100">
        <Lightbulb className="h-4 w-4 text-amber-300" />
        หมายเหตุเพิ่มเติม — {category.title}
      </p>
      <div className="grid gap-3 lg:grid-cols-2">
        {notes.map((note, i) => (
          <div
            key={i}
            className="relative flex items-start gap-3 overflow-hidden rounded-2xl border border-amber-200/10 bg-[#17120d]/90 p-4 shadow-[0_12px_28px_rgba(0,0,0,0.18)]"
          >
            <div
              className="mt-2 h-2 w-2 flex-shrink-0 rounded-full shadow-[0_0_16px_rgba(251,191,36,0.35)]"
              style={{ backgroundColor: "#d6a83d" }}
            />
            <div className="min-w-0 flex-1">
              {note.appliesTo && (
                <Badge className="mb-2 border-amber-200/20 bg-amber-300/10 text-xs font-semibold text-amber-100">
                  {note.appliesTo}
                </Badge>
              )}
              <p className="text-sm leading-7 text-amber-50/80">{note.text}</p>
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
    <div className="min-h-screen bg-[linear-gradient(180deg,#080706_0%,#1c120c_48%,#090807_100%)] text-amber-50">
      {/* Fixed Contact Button */}
      <div className="fixed top-4 left-4 z-50">
        <ContactPopover />
      </div>

      {/* Hero with bg.jpg background image */}
      <div className="relative overflow-hidden border-b border-amber-300/20 px-6 pb-12 pt-12 text-white">
        <FloatingLogo />
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{
            backgroundImage: `url('/bg.jpg')`,
          }}
        />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,7,6,0.42),rgba(8,7,6,0.9)),linear-gradient(90deg,rgba(8,7,6,0.86),rgba(87,52,18,0.42),rgba(8,7,6,0.82))]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(251,191,36,0.09)_0_1px,transparent_1px_28px)]" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <Badge
            variant="secondary"
            className="mb-4 border-amber-200/20 bg-white/10 text-amber-50 backdrop-blur-sm hover:bg-white/20"
          >
            ประจำปีการศึกษา 2569
          </Badge>
          <h1 className="font-lanna text-4xl font-extrabold leading-tight text-amber-50 drop-shadow-lg sm:text-5xl">
            สิทธิประโยชน์ของผู้สนับสนุน
          </h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.22em] text-amber-100/80 drop-shadow-md">
            How to Live and Learn on Campus 2026
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl space-y-10 px-4 py-8 sm:px-6">
        {/* Cash Sponsorship */}
        <section>
          <div className="ae-glass mb-4 flex items-center gap-3 rounded-2xl px-4 py-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/10">
              <Banknote className="h-5 w-5 text-amber-200" />
            </div>
            <div>
              <h2 className="font-lanna text-xl font-bold text-amber-50">{cashSponsorship.title}</h2>
              <p className="text-sm text-amber-100/60">
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

        {/* E-Voucher */}
        <section>
          <div className="ae-glass mb-4 flex items-center gap-3 rounded-2xl px-4 py-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-300/10">
              <Ticket className="h-5 w-5 text-emerald-200" />
            </div>
            <div>
              <h2 className="font-lanna text-xl font-bold text-emerald-50">E-Voucher (เพิ่มเติม)</h2>
              <p className="text-sm text-emerald-100/60">
                สำหรับ Package Platinum ฝั่งทุนทรัพย์
              </p>
            </div>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-3" onValueChange={scrollToOpenItem}>
            {evoucherOptions.map((opt) => (
              <EvoucherAccordion key={opt.id} opt={opt} />
            ))}
          </Accordion>
        </section>

        {/* Prize Sponsorship */}
        <section>
          <div className="ae-glass mb-4 flex items-center gap-3 rounded-2xl px-4 py-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/10">
              <Gift className="h-5 w-5 text-amber-200" />
            </div>
            <div>
              <h2 className="font-lanna text-xl font-bold text-amber-50">{prizeSponsorship.title}</h2>
              <p className="text-sm text-amber-100/60">
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

        {/* Footer */}
        <div className="pb-8 text-center text-xs text-amber-100/50">
          <p>How to Live and Learn on Campus 2026</p>
        </div>
      </div>
    </div>
  );
}
