import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Instagram, Users, ExternalLink } from "lucide-react";
import { influencers } from "@/data/influencers";

export default function InfluencerList() {
  const navigate = useNavigate();

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
        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {influencers.map((inf) => (
            <a
              key={inf.id}
              href={inf.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="overflow-hidden border-0 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={inf.imagePath}
                    alt={inf.displayName}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(inf.username)}&background=E1306C&color=fff&size=256`;
                    }}
                  />
                  {/* Followers badge - top right */}
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-black/70 text-white border-0 text-[10px] font-bold px-2 py-0.5 backdrop-blur-sm">
                      <Users className="h-3 w-3 mr-1" />
                      {inf.followers}
                    </Badge>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-2 right-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <ExternalLink className="h-4 w-4 text-white" />
                  </div>
                </div>
                <CardContent className="p-3">
                  <div className="flex items-center gap-1.5">
                    <Instagram className="h-3.5 w-3.5 text-pink-500" />
                    <p className="truncate text-sm font-bold text-foreground">
                      {inf.displayName}
                    </p>
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    @{inf.username}
                  </p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        {/* คำแนะนำการใส่รูป */}
        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-semibold text-amber-900">
            📌 คำแนะนำ: วิธีใส่รูป Influencer
          </p>
          <p className="mt-1 text-sm text-amber-800">
            สร้างโฟลเดอร์ <code>public/ig-img/</code> แล้วใส่รูปโปรไฟล์แต่ละคนตามชื่อไฟล์นี้:
          </p>
          <ul className="mt-2 space-y-1 text-xs text-amber-700 font-mono">
            {influencers.map((inf) => (
              <li key={inf.id}>{inf.imagePath}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
