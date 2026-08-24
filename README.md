# NEON MUSIC

وب‌سایت Static فارسی برای GitHub Pages با HTML/CSS/Vanilla JavaScript.

## مهم
برای افزودن آهنگ، فقط یک Object در `data.js` اضافه کن:

```js
{
  id: "sweet",
  title: "SWEET",
  artist: "نام هنرمند",
  album: "",
  category: "",
  audio: "assets/audio/SWEET.mp3",
  cover: ""
}
```

اولویت کاور:
1. Embedded Cover داخل MP3
2. `cover` در `data.js`
3. Placeholder نئونی اختصاصی همان آهنگ

سه پلی‌لیست دستی پیش‌فرض:
- پرطرفدارها
- آرامش‌بخش
- خارجی

برای هر پلی‌لیست، `songIds` را در `data.js` مدیریت کن.

قبل از انتشار، مقدار `SITE.telegram` را با لینک واقعی تلگرام جایگزین کن.

نکته: برای اجرای محلی بهتر است از یک Static Server استفاده شود تا خواندن Metadata و فایل‌های MP3 در همه مرورگرها با محدودیت فایل محلی مواجه نشود.
