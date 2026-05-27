export interface Influencer {
  id: string;
  username: string;
  displayName: string;
  followers: string;
  profileUrl: string;
  imagePath: string;
}

// รูปภาพต้องวางใน public/ig-img/{username}.jpg
export const influencers: Influencer[] = [
  { id: "kimeun_0209", username: "kimeun_0209", displayName: "kimeun_0209", followers: "N/A", profileUrl: "https://www.instagram.com/kimeun_0209/", imagePath: "/ig-img/kimeun_0209.jpg" },
  { id: "coachkool", username: "coachkool", displayName: "coachkool", followers: "N/A", profileUrl: "https://www.instagram.com/coachkool/", imagePath: "/ig-img/coachkool.jpg" },
  { id: "pfi.1q", username: "pfi.1q", displayName: "pfi.1q", followers: "N/A", profileUrl: "https://www.instagram.com/pfi.1q/", imagePath: "/ig-img/pfi.1q.jpg" },
  { id: "jinnsurq", username: "jinnsurq", displayName: "jinnsurq", followers: "N/A", profileUrl: "https://www.instagram.com/jinnsurq/", imagePath: "/ig-img/jinnsurq.jpg" },
  { id: "yaelllz", username: "yaelllz", displayName: "Yael David", followers: "11.8K", profileUrl: "https://www.instagram.com/yaelllz/", imagePath: "/ig-img/yaelllz.jpg" },
  { id: "clairnii", username: "clairnii", displayName: "แคร์", followers: "13.4K", profileUrl: "https://www.instagram.com/claimii/", imagePath: "/ig-img/clairnii.png" },
  { id: "_pzzkky", username: "_pzzkky", displayName: "ปุ๊กกี้", followers: "73.7K", profileUrl: "https://www.instagram.com/_pzzkky/", imagePath: "/ig-img/_pzzkky.jpg" },
  { id: "jirajiraruree26", username: "jirajiraruree26", displayName: "จิเรขนิดมิพล.", followers: "1,411", profileUrl: "https://www.instagram.com/jirajiraruree26/", imagePath: "/ig-img/jirajiraruree26.jpg" },
  { id: "_cnpsy", username: "_cnpsy", displayName: "_cnpsy", followers: "4,705", profileUrl: "https://www.instagram.com/_cnpsy/", imagePath: "/ig-img/_cnpsy.jpg" },
  { id: "allyeobo", username: "allyeobo", displayName: "b", followers: "5,325", profileUrl: "https://www.instagram.com/allyeobo/", imagePath: "/ig-img/allyeobo.jpg" },
  { id: "puppet.mfu", username: "puppet.mfu", displayName: "ปั้น มัลลี่", followers: "38K", profileUrl: "https://www.instagram.com/puppet.mfu/", imagePath: "/ig-img/puppet.mfu.jpg" },
  { id: "manuschai_", username: "manuschai_", displayName: "ปุ่ยป้อ", followers: "1,548", profileUrl: "https://www.instagram.com/manuschai_/", imagePath: "/ig-img/manuschai_.jpg" },
  { id: "pan.panny", username: "pan.panny", displayName: "ไอ'แอมปานี่", followers: "1,734", profileUrl: "https://www.instagram.com/pan.panny/", imagePath: "/ig-img/pan.panny.jpg" },
  { id: "babyjeenee", username: "babyjeenee", displayName: "babyjeenee", followers: "59.7K", profileUrl: "https://www.instagram.com/babyjeenee/", imagePath: "/ig-img/babyjeenee.jpg" },
  { id: "rosysnrr", username: "rosysnrr", displayName: "มะลิเลิฟซีซี", followers: "15.3K", profileUrl: "https://www.instagram.com/rosysnrr/", imagePath: "/ig-img/rosysnrr.jpg" },
  { id: "eye0502_", username: "eye0502_", displayName: "อาย", followers: "9,214", profileUrl: "https://www.instagram.com/eye0502_/", imagePath: "/ig-img/eye0502_.jpg" },
  { id: "inluv_btfly", username: "inluv_btfly", displayName: "마리사", followers: "4,461", profileUrl: "https://www.instagram.com/inluv_btfly/", imagePath: "/ig-img/inluv_btfly.jpg" },
  { id: "touchchounn", username: "touchchounn", displayName: "奕辰", followers: "2,463", profileUrl: "https://www.instagram.com/touchchounn/", imagePath: "/ig-img/touchchouun.jpg" },
  { id: "f4lwer", username: "f4lwer", displayName: "f4lwer", followers: "405", profileUrl: "https://www.instagram.com/f4lwer/", imagePath: "/ig-img/f4lwer.jpg" },
  { id: "urbeply", username: "urbeply", displayName: "urbeply", followers: "440", profileUrl: "https://www.instagram.com/urbeply/", imagePath: "/ig-img/urbeply.jpg" },
];
