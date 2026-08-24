const SITE = {
  name: "NEON MUSIC",
  subtitle: "نئون موزیک",
  telegram: "http://t.me/Crzzygxts",
  description: "پلتفرم پخش و دانلود موسیقی با تجربه نئونی و مدرن"
};

const DATA = {
  songs: [
    {
      id: "7rings",
      title: "7 rings",
      artist: "Ariana Grande",
      album: "thank u, next",
      category: "Pop",
      audio: "assets/audio/7rings.mp3",
      cover: "",
      duration: ""
    }
  ],

  playlists: [
    {
      id: "popular",
      title: "پرطرفدارها",
      description: "منتخبی از آهنگ‌های پرطرفدار",
      cover: "",
      songIds: []
    },
    {
      id: "relax",
      title: "آرامش‌بخش",
      description: "آهنگ‌های آرام و ملایم",
      cover: "",
      songIds: ["7rings"]
    },
    {
      id: "foreign",
      title: "خارجی",
      description: "منتخبی از موسیقی‌های خارجی",
      cover: "",
      songIds: ["7rings"]
    }
  ],

  artists: [],
  albums: [],
  categories: []
};
