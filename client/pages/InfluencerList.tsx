import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Instagram, Users, ExternalLink, Loader2, Music } from "lucide-react";
import { influencers } from "@/data/influencers";

interface ProfileData {
  igUrl: string;
  igImageUrl: string;
  igUsername: string;
  platform: string;
}

function formatFollowers(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

export default function InfluencerList() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<Record<string, ProfileData | null>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      const results: Record<string, ProfileData | null> = {};
      await Promise.all(
        influencers.map(async (inf) => {
          try {
            const res = await fetch("/api/preview", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ url: inf.url }),
            });
            if (!res.ok) throw new Error("Failed");
            const data = await res.json();
            results[inf.id] = data;
          } catch {
            results[inf.id] = null;
          }
        })
      );
      setProfiles(results);
      setLoading(false);
    }
    fetchAll();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#8B0000] via-[#b91c1c] to-[#dc2626] px-6 pb-8 pt-6 text-white">
        <div className="absolute inset-0 bg-[url('/bg.jpg')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4 -ml-3 text-white hover:bg-white/20"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            กลับหน้าหลัก
          </Button>
          <h1 className="font-nunito text-2xl font-extrabold sm:text-3xl drop-shadow-lg">
            Influencer List
          </h1>
          <p className="mt-1 text-sm text-white/80 drop-shadow-md">
            รายชื่อ Influencer สำหรับผลิตสื่อโปรโมท (เฉพาะ Package Platinum)
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8">
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-2 text-sm text-muted-foreground">กำลังโหลดข้อมูล...</span>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {influencers.map((inf) => {
            const p = profiles[inf.id];
            const profileUrl = p?.igUrl || inf.url;
            return (
              <a
                key={inf.id}
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50">
                    {p?.igImageUrl ? (
                      <img
                        src={p.igImageUrl}
                        alt={p.igUsername}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted">
                        <Instagram className="h-10 w-10 text-muted-foreground/40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute bottom-2 right-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <ExternalLink className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="truncate text-sm font-bold text-foreground">
                      {p?.igUsername || inf.id}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      @{inf.id}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5">
                      {inf.platform === "tiktok" ? (
                        <Music className="h-3.5 w-3.5 text-cyan-500" />
                      ) : (
                        <Instagram className="h-3.5 w-3.5 text-pink-500" />
                      )}
                      <Badge
                        variant="secondary"
                        className={`text-[10px] font-semibold px-1.5 py-0 ${
                          inf.platform === "tiktok"
                            ? "bg-cyan-50 text-cyan-600"
                            : "bg-pink-50 text-pink-600"
                        }`}
                      >
                        <Users className="h-3 w-3 mr-0.5" />
                        {p ? "ดูโปรไฟล์" : "..."}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
