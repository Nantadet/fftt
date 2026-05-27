import { RequestHandler } from "express";

interface PreviewResponse {
  igUrl: string;
  igImageUrl: string;
  igUsername: string;
  videoUrl: string;
  audioUrl: string;
  embedUrl: string;
  platform: string;
}

function detectPlatform(url: string): "instagram" | "tiktok" | null {
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase();
    if (host === "instagram.com" || host === "www.instagram.com") return "instagram";
    if (["tiktok.com", "www.tiktok.com", "m.tiktok.com", "vm.tiktok.com", "vt.tiktok.com"].includes(host)) return "tiktok";
  } catch { /* ignore */ }
  return null;
}

function normalizeInstagramURL(url: string): { type: "profile" | "media"; username: string; normalized: string } | null {
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/").filter(Boolean);
    if (parts.length === 1) {
      return { type: "profile", username: parts[0], normalized: `https://www.instagram.com/${parts[0]}/` };
    }
    if (parts.length >= 2 && ["p", "reel", "tv"].includes(parts[0])) {
      return { type: "media", username: parts[0], normalized: url };
    }
    if (parts.length >= 1) {
      return { type: "profile", username: parts[0], normalized: `https://www.instagram.com/${parts[0]}/` };
    }
  } catch { /* ignore */ }
  return null;
}

function normalizeTikTokURL(url: string): { type: "profile" | "video"; username: string; normalized: string } | null {
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/").filter(Boolean);
    // /@user or /@user/video/123
    if (parts[0].startsWith("@")) {
      const username = parts[0].slice(1);
      if (parts.length >= 3 && parts[1] === "video") {
        return { type: "video", username, normalized: `https://www.tiktok.com/@${username}/video/${parts[2]}` };
      }
      return { type: "profile", username, normalized: `https://www.tiktok.com/@${username}` };
    }
  } catch { /* ignore */ }
  return null;
}

async function fetchInstagramProfile(username: string): Promise<PreviewResponse | null> {
  const endpoints = [
    `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`,
    `https://i.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`,
  ];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        headers: {
          Accept: "application/json",
          "User-Agent": "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36 Instagram 320.0.0.0.37",
          "X-IG-App-ID": "936619743392459",
          Referer: `https://www.instagram.com/${username}/`,
        },
      });
      if (!res.ok) continue;
      const data = await res.json();
      const user = data?.data?.user;
      if (!user) continue;
      return {
        igUrl: `https://www.instagram.com/${username}/`,
        igImageUrl: user.profile_pic_url_hd || user.profile_pic_url || "",
        igUsername: user.username || username,
        videoUrl: "",
        audioUrl: "",
        embedUrl: "",
        platform: "instagram",
      };
    } catch { /* ignore */ }
  }
  return null;
}

async function fetchTikTokProfile(username: string): Promise<PreviewResponse | null> {
  try {
    const url = `https://www.tiktok.com/@${username}`;
    const res = await fetch(url, {
      headers: {
        Accept: "text/html",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    if (!res.ok) return null;
    const html = await res.text();

    // Try SIGI_STATE
    const sigiMatch = html.match(/<script[^>]*>window\._SIGI_STATE__=(\{.+?\})<\/script>/);
    if (sigiMatch) {
      try {
        const sigi = JSON.parse(sigiMatch[1]);
        const userModule = sigi?.UserModule?.users;
        const userKey = Object.keys(userModule || {})[0];
        const user = userKey ? userModule[userKey] : null;
        if (user) {
          const avatar = user.avatarLarger || user.avatarMedium || user.avatarThumb || user.avatarUrl || "";
          return {
            igUrl: `https://www.tiktok.com/@${username}`,
            igImageUrl: avatar,
            igUsername: user.uniqueId || username,
            videoUrl: "",
            audioUrl: "",
            embedUrl: "",
            platform: "tiktok",
          };
        }
      } catch { /* ignore */ }
    }

    // Try __UNIVERSAL_DATA_FOR_REHYDRATION__
    const uniMatch = html.match(/<script[^>]*>window\.__UNIVERSAL_DATA_FOR_REHYDRATION__=(\{.+?\})<\/script>/);
    if (uniMatch) {
      try {
        const uni = JSON.parse(uniMatch[1]);
        const user = uni?.["$" + username]?.user || uni?.default?.user;
        if (user) {
          const avatar = user.avatarLarger || user.avatarMedium || user.avatarThumb || user.avatarUrl || "";
          return {
            igUrl: `https://www.tiktok.com/@${username}`,
            igImageUrl: avatar,
            igUsername: user.uniqueId || username,
            videoUrl: "",
            audioUrl: "",
            embedUrl: "",
            platform: "tiktok",
          };
        }
      } catch { /* ignore */ }
    }

    // Fallback og:image
    const ogMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/);
    if (ogMatch) {
      return {
        igUrl: `https://www.tiktok.com/@${username}`,
        igImageUrl: ogMatch[1],
        igUsername: username,
        videoUrl: "",
        audioUrl: "",
        embedUrl: "",
        platform: "tiktok",
      };
    }
  } catch { /* ignore */ }
  return null;
}

export const handlePreview: RequestHandler = async (req, res) => {
  const { url } = req.body as { url?: string };

  if (!url || typeof url !== "string") {
    res.status(400).json({ error: "URL is required" });
    return;
  }

  const platform = detectPlatform(url);
  if (!platform) {
    res.status(400).json({ error: "Unsupported platform" });
    return;
  }

  let result: PreviewResponse | null = null;

  if (platform === "instagram") {
    const parsed = normalizeInstagramURL(url);
    if (!parsed) {
      res.status(400).json({ error: "Invalid Instagram URL" });
      return;
    }
    if (parsed.type === "profile") {
      result = await fetchInstagramProfile(parsed.username);
    }
  } else if (platform === "tiktok") {
    const parsed = normalizeTikTokURL(url);
    if (!parsed) {
      res.status(400).json({ error: "Invalid TikTok URL" });
      return;
    }
    if (parsed.type === "profile") {
      result = await fetchTikTokProfile(parsed.username);
    }
  }

  if (!result) {
    res.status(502).json({ error: "Unable to fetch preview" });
    return;
  }

  res.json(result);
};
