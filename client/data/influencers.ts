export interface Influencer {
  id: string;
  username: string;
  displayName: string;
  followers: string;
  profileUrl: string;
  imagePath: string;
}

// อิงตามชื่อไฟล์รูปใน public/ig-img/ เท่านั้น
// ใครไม่มีรูป = ไม่แสดง
export const influencers: Influencer[] = [
  { id: "kimeun_0209", username: "kimeun_0209", displayName: "kimeun_0209", followers: "1.4k", profileUrl: "https://www.instagram.com/kimeun_0209/", imagePath: "/ig-img/kimeun_0209.jpg" },
  { id: "coachkool", username: "coachkool", displayName: "coachkool", followers: "1.26k", profileUrl: "https://www.instagram.com/coachkool/", imagePath: "/ig-img/coachkool.jpg" },
  { id: "pfi.1q", username: "pfi.1q", displayName: "pfi.1q", followers: "1.6k", profileUrl: "https://www.instagram.com/pfi.1q/", imagePath: "/ig-img/pfi.1q.jpg" },
  { id: "jinnsurq", username: "jinnsurq", displayName: "jinnsurq", followers: "1.49k", profileUrl: "https://www.instagram.com/jinnsurq/", imagePath: "/ig-img/jinnsurq.jpg" },
  { id: "yaelllz", username: "yaelllz", displayName: "Yael David", followers: "11.8K", profileUrl: "https://www.instagram.com/yaelllz/", imagePath: "/ig-img/yaelllz.jpg" },
  { id: "clairnii", username: "clairnii", displayName: "แคมี่", followers: "13.4K", profileUrl: "https://www.instagram.com/clairnii/", imagePath: "/ig-img/clairnii.png" },
  { id: "_cnpsy", username: "_cnpsy", displayName: "_cnpsy", followers: "4,705", profileUrl: "https://www.instagram.com/_cnpsy/", imagePath: "/ig-img/_cnpsy.jpg" },
  { id: "allyeobo", username: "allyeobo", displayName: "b", followers: "5,325", profileUrl: "https://www.instagram.com/allyeobo/", imagePath: "/ig-img/allyeobo.jpg" },
  { id: "touchchouun", username: "touchchouun", displayName: "奕辰", followers: "2,463", profileUrl: "https://www.instagram.com/touchchouun/", imagePath: "/ig-img/touchchouun.jpg" },
  { id: "f4lwer", username: "f4lwer", displayName: "f4lwer", followers: "405", profileUrl: "https://www.instagram.com/f4lwer/", imagePath: "/ig-img/f4lwer.jpg" },
  { id: "urbeply", username: "urbeply", displayName: "urbeply", followers: "440", profileUrl: "https://www.instagram.com/urbeply/", imagePath: "/ig-img/urbeply.jpg" },
];
