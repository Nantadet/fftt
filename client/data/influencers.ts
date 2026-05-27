export interface Influencer {
  id: string;
  url: string;
  platform: "instagram" | "tiktok";
}

// Instagram = มี "posts" ใน profile
// TikTok = มี "Likes/ถูกใจ" แทน posts
export const influencers: Influencer[] = [
  // Instagram (จากลิงก์ที่ให้มา + ดู layout มี posts)
  { id: "kimeun_0209", url: "https://www.instagram.com/kimeun_0209", platform: "instagram" },
  { id: "coachkool", url: "https://www.instagram.com/coachkool", platform: "instagram" },
  { id: "pfi.1q", url: "https://www.instagram.com/pfi.1q", platform: "instagram" },
  { id: "jinnsurq", url: "https://www.instagram.com/jinnsurq", platform: "instagram" },
  { id: "yaelllz", url: "https://www.instagram.com/yaelllz", platform: "instagram" },
  { id: "claimii", url: "https://www.instagram.com/claimii", platform: "instagram" },
  { id: "_cnpsy", url: "https://www.instagram.com/_cnpsy", platform: "instagram" },
  { id: "allyeobo", url: "https://www.instagram.com/allyeobo", platform: "instagram" },
  { id: "touchchounn", url: "https://www.instagram.com/touchchounn", platform: "instagram" },
  { id: "f4lwer", url: "https://www.instagram.com/f4lwer", platform: "instagram" },
  { id: "urbeply", url: "https://www.instagram.com/urbeply", platform: "instagram" },

  // TikTok (ดู layout มี "Likes/ถูกใจ" แทน posts)
  { id: "_pzzkky", url: "https://www.tiktok.com/@_pzzkky", platform: "tiktok" },
  { id: "jirajiraruree26", url: "https://www.tiktok.com/@jirajiraruree26", platform: "tiktok" },
  { id: "puppet.mfu", url: "https://www.tiktok.com/@puppet.mfu", platform: "tiktok" },
  { id: "manuschai_", url: "https://www.tiktok.com/@manuschai_", platform: "tiktok" },
  { id: "pan.panny", url: "https://www.tiktok.com/@pan.panny", platform: "tiktok" },
  { id: "babyjeenee", url: "https://www.tiktok.com/@babyjeenee", platform: "tiktok" },
  { id: "rosysnrr", url: "https://www.tiktok.com/@rosysnrr", platform: "tiktok" },
  { id: "eye0502_", url: "https://www.tiktok.com/@eye0502_", platform: "tiktok" },
  { id: "inluv_btfly", url: "https://www.tiktok.com/@inluv_btfly", platform: "tiktok" },
];
