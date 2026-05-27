import { RequestHandler } from "express";

interface InstagramProfileResponse {
  username: string;
  fullName: string;
  followers: number;
  profilePicUrl: string;
  biography?: string;
}

export const handleInstagramProfile: RequestHandler = async (req, res) => {
  const username = req.query.username as string;

  if (!username || !/^[A-Za-z0-9._]{1,30}$/.test(username)) {
    res.status(400).json({ error: "Invalid username" });
    return;
  }

  try {
    const endpoint = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`;

    const response = await fetch(endpoint, {
      headers: {
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36 Instagram 320.0.0.0.37",
        "X-IG-App-ID": "936619743392459",
        Referer: `https://www.instagram.com/${username}/`,
      },
    });

    if (!response.ok) {
      res.status(502).json({ error: "Instagram request failed" });
      return;
    }

    const data = await response.json();
    const user = data?.data?.user;

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const result: InstagramProfileResponse = {
      username: user.username || username,
      fullName: user.full_name || username,
      followers: user.edge_followed_by?.count ?? 0,
      profilePicUrl:
        user.profile_pic_url_hd || user.profile_pic_url || "",
      biography: user.biography || "",
    };

    res.json(result);
  } catch (err) {
    console.error("Instagram profile fetch error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
