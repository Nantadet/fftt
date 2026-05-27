import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  Star,
  Award,
  Crown,
  Medal,
  Sparkles,
  CheckCircle2,
  CircleDot,
  AlertCircle,
} from "lucide-react";
import { findPackage, getCategoryTitle } from "@/data/sponsorshipData";

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

export default function PackageDetail() {
  const { type, tier } = useParams<{ type: string; tier: string }>();
  const navigate = useNavigate();

  const pkg = type && tier ? findPackage(type, tier) : undefined;

  if (!pkg) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
        <AlertCircle className="h-12 w-12 text-muted-foreground" />
        <h1 className="text-xl font-bold">ไม่พบแพ็คเกจ</h1>
        <p className="text-sm text-muted-foreground">
          ไม่พบข้อมูลแพ็คเกจที่คุณต้องการดู
        </p>
        <Button onClick={() => navigate("/")} variant="default">
          กลับหน้าหลัก
        </Button>
      </div>
    );
  }

  const categoryTitle = getCategoryTitle(type!);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div
        className="relative px-6 pb-8 pt-6 text-white"
        style={{
          background: `linear-gradient(135deg, ${pkg.color}dd 0%, ${pkg.color} 100%)`,
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/20" />
        </div>
        <div className="relative mx-auto max-w-2xl">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4 -ml-3 text-white hover:bg-white/20"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            กลับหน้าหลัก
          </Button>

          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              {getTierIcon(pkg.tier, "h-7 w-7")}
            </div>
            <div>
              <Badge
                variant="secondary"
                className="mb-1 bg-white/20 text-white hover:bg-white/30"
              >
                {categoryTitle}
              </Badge>
              <h1 className="font-nunito text-2xl font-extrabold sm:text-3xl">
                {pkg.name}
              </h1>
            </div>
          </div>
          <p className="mt-3 text-base text-white/90">{pkg.amount}</p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-6">
        {/* Benefits */}
        <div className="space-y-4">
          {pkg.benefits.map((group, gi) => (
            <Card key={gi} className="overflow-hidden border-0 shadow-sm">
              <div
                className="h-1"
                style={{ backgroundColor: pkg.color }}
              />
              <CardContent className="p-5">
                <h2
                  className="mb-4 flex items-center gap-2 text-base font-bold"
                  style={{ color: pkg.color }}
                >
                  <CheckCircle2 className="h-5 w-5" />
                  {group.title}
                </h2>
                <div className="space-y-4">
                  {group.items.map((item, ii) => (
                    <div key={ii} className="rounded-lg bg-muted/40 p-4">
                      <h3 className="text-sm font-semibold text-foreground">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                      {item.details && item.details.length > 0 && (
                        <ul className="mt-2.5 space-y-1.5">
                          {item.details.map((d, di) => (
                            <li
                              key={di}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <CircleDot className="mt-1 h-3 w-3 flex-shrink-0 text-muted-foreground/60" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Notes */}
        {pkg.notes && pkg.notes.length > 0 && (
          <div className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem
                value="notes"
                className="rounded-xl border border-amber-200 bg-amber-50/50 px-4"
              >
                <AccordionTrigger className="text-sm font-semibold text-amber-800 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    หมายเหตุเพิ่มเติม
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2.5 pb-2">
                    {pkg.notes.map((note, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-amber-900/80"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        {/* Back button */}
        <div className="mt-8 pb-8 text-center">
          <Button
            variant="outline"
            size="lg"
            className="w-full max-w-xs"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            กลับหน้ารายการทั้งหมด
          </Button>
        </div>
      </div>
    </div>
  );
}
