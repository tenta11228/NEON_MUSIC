const SITE = {
  name: "NEON MUSIC",
  subtitle: "نئون موزیک",
  telegram: "http://t.me/Crzzygxts",
  description: "پلتفرم پخش و دانلود موسیقی با تجربه نئونی و مدرن"
};

const DATA = {
  // آهنگ جدید را فقط با اضافه کردن یک Object در این آرایه ثبت کن.
  songs: [
    /*
    {
      id: "sweet",
      title: "SWEET",
      artist: "نام هنرمند",
      album: "",
      category: "",
      audio: "assets/audio/SWEET.mp3",
      cover: "",
      duration: ""
    }
    */
  ],
  // این سه پلی‌لیست دستی هستند. songIds را خودت مدیریت می‌کنی.
  playlists: [
    {id:"popular", title:"پرطرفدارها", description:"منتخب‌های دستی نئون موزیک", cover:"", songIds:[]},
    {id:"relax", title:"آرامش‌بخش", description:"آهنگ‌های آرام و ملایم", cover:"", songIds:[]},
    {id:"foreign", title:"خارجی", description:"منتخبی از موسیقی‌های خارجی", cover:"", songIds:[]}
  ],
  artists: [],
  albums: [],
  categories: []
};