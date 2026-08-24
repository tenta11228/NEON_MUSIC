const $ = (s, root = document) => root.querySelector(s);
let app;

const esc = s => String(s ?? "").replace(/[&<>"']/g, m => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}[m]));

const byId = (arr, id) => (arr || []).find(x => x.id === id);
const query = () => new URLSearchParams(location.search);

const songUrl = id => `song.html?id=${encodeURIComponent(id)}`;
const playlistUrl = id => `playlist.html?id=${encodeURIComponent(id)}`;
const albumUrl = id => `album.html?id=${encodeURIComponent(id)}`;
const artistUrl = id => `artist.html?id=${encodeURIComponent(id)}`;
const categoryUrl = id => `category.html?id=${encodeURIComponent(id)}`;

function fallbackCover(text = "NEON MUSIC") {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">
      <rect width="100%" height="100%" fill="#151525"/>
      <rect x="30" y="30" width="740" height="740" rx="40" fill="none" stroke="#7c4dff" stroke-width="3"/>
      <circle cx="400" cy="350" r="140" fill="#7c4dff" opacity=".2"/>
      <text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="Arial" font-size="54" font-weight="bold">NEON</text>
      <text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" fill="#b7a6ff" font-family="Arial" font-size="30">${String(text).slice(0, 22)}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function safeSongCover(song) {
  try {
    if (typeof getSongCover === "function") {
      return getSongCover(song);
    }
  } catch (e) {}

  return song?.cover || fallbackCover(song?.title || "NEON MUSIC");
}

function empty(text = "هنوز محتوایی برای نمایش وجود ندارد.") {
  return `
    <div class="empty-state">
      <div>♫</div>
      <h3>${text}</h3>
      <p>به‌زودی محتوای جدید در این بخش قرار می‌گیرد.</p>
    </div>
  `;
}

function songCard(s) {
  const i = DATA.songs.findIndex(x => x.id === s.id);

  return `
    <article class="song-card">
      <a href="${songUrl(s.id)}" class="cover-wrap">
        <img
          class="song-cover lazy-cover"
          src="${safeSongCover(s)}"
          alt="کاور ${esc(s.title)}"
          loading="lazy"
          data-song="${esc(s.id)}"
        >
        <span class="cover-play">▶</span>
      </a>

      <div class="song-card-body">
        <a href="${songUrl(s.id)}" class="song-title">${esc(s.title)}</a>
        <span class="song-artist">${esc(s.artist || "هنرمند نامشخص")}</span>

        <div class="song-card-meta">
          <span>${esc(s.duration || "")}</span>

          <div>
            <button onclick="Player.load(${i}, true)" aria-label="پخش ${esc(s.title)}">▶</button>
            <a href="${esc(s.audio)}" download aria-label="دانلود ${esc(s.title)}">⇩</a>
            <a href="${songUrl(s.id)}" aria-label="جزئیات">⋯</a>
          </div>
        </div>
      </div>
    </article>
  `;
}

function songRow(s, num) {
  const i = DATA.songs.findIndex(x => x.id === s.id);

  return `
    <article class="song-row">
      <span class="row-number">${String(num).padStart(2, "0")}</span>

      <a href="${songUrl(s.id)}">
        <img
          src="${safeSongCover(s)}"
          class="row-cover lazy-cover"
          data-song="${esc(s.id)}"
          alt="کاور ${esc(s.title)}"
        >
      </a>

      <div class="row-main">
        <a href="${songUrl(s.id)}">
          <b>${esc(s.title)}</b>
        </a>

        <span>${esc(s.artist || "هنرمند نامشخص")}</span>
      </div>

      <span class="row-album">${esc(s.album || "—")}</span>
      <span class="row-duration">${esc(s.duration || "—")}</span>

      <div class="row-actions">
        <button onclick="Player.load(${i}, true)" aria-label="پخش">▶</button>
        <a href="${esc(s.audio)}" download aria-label="دانلود">⇩</a>
        <a href="${songUrl(s.id)}">⋯</a>
      </div>
    </article>
  `;
}

function songGrid(list) {
  return list && list.length
    ? `<div class="song-grid">${list.map(songCard).join("")}</div>`
    : empty();
}

function playlistSongs(id) {
  const p = byId(DATA.playlists, id);

  return (p?.songIds || [])
    .map(songId => byId(DATA.songs, songId))
    .filter(Boolean);
}

function cardGrid(list, type) {
  if (!list || !list.length) return empty();

  const urlMap = {
    playlist: playlistUrl,
    album: albumUrl,
    artist: artistUrl,
    category: categoryUrl
  };

  return `
    <div class="entity-grid">
      ${list.map(x => {
        const title = x.title || x.name || x.id;
        const cover = x.cover || fallbackCover(title);

        return `
          <a class="entity-card" href="${urlMap[type](x.id)}">
            <img
              src="${cover}"
              alt="${esc(title)}"
              loading="lazy"
            >

            <div>
              <b>${esc(title)}</b>

              <span>
                ${
                  type === "playlist"
                    ? `${(x.songIds || []).length} آهنگ`
                    : esc(x.description || x.artist || "")
                }
              </span>
            </div>
          </a>
        `;
      }).join("")}
    </div>
  `;
}

function renderHome() {
  const latest = [...(DATA.songs || [])].slice().reverse().slice(0, 8);
  const popular = playlistSongs("popular").slice(0, 8);

  app.innerHTML = `
    <section class="home-hero">
      <span class="eyebrow">NEON MUSIC / نئون موزیک</span>

      <h1>
        آهنگ‌های <em>خاص</em> رو
        <br>
        اینجا گوش بده
      </h1>

      <p>
        موسیقی‌های جدید و منتخب را در نئون موزیک پیدا کن،
        گوش بده و دانلود کن.
      </p>

      <div class="hero-actions">
        <a class="btn primary" href="songs.html">شروع شنیدن</a>
        <a class="btn ghost" href="playlists.html">پلی‌لیست‌ها</a>
      </div>
    </section>

    <section class="home-list-section">
      <div class="section-head">
        <div>
          <span class="eyebrow">NEW RELEASES</span>
          <h2>لیست جدید</h2>
        </div>

        <a href="songs.html">مشاهده همه ←</a>
      </div>

      <div class="song-list">
        ${
          latest.length
            ? latest.map((s, i) => songRow(s, i + 1)).join("")
            : empty("هنوز آهنگ جدیدی اضافه نشده است.")
        }
      </div>
    </section>

    <section class="home-list-section">
      <div class="section-head">
        <div>
          <span class="eyebrow">POPULAR PLAYLIST</span>
          <h2>پلی‌لیست پرطرفدار</h2>
        </div>

        <a href="playlist.html?id=popular">مشاهده پلی‌لیست ←</a>
      </div>

      <div class="playlist-feature">
        <div class="playlist-feature-info">
          <div class="playlist-icon">🔥</div>

          <div>
            <h3>پرطرفدارها</h3>
            <p>منتخبی از آهنگ‌های پرطرفدار و خاص نئون موزیک.</p>
          </div>
        </div>

        <a class="btn ghost" href="playlist.html?id=popular">
          باز کردن پلی‌لیست
        </a>
      </div>

      <div class="song-list">
        ${
          popular.length
            ? popular.map((s, i) => songRow(s, i + 1)).join("")
            : empty("هنوز آهنگی به پلی‌لیست پرطرفدارها اضافه نشده است.")
        }
      </div>
    </section>
  `;
}

function renderSongs() {
  app.innerHTML = `
    <div class="page-hero">
      <span>آرشیو موسیقی</span>
      <h1>آهنگ‌ها</h1>
      <p>تمام آهنگ‌های ثبت‌شده در نئون موزیک.</p>
    </div>

    ${songGrid(DATA.songs || [])}
  `;
}

function renderPlaylists() {
  app.innerHTML = `
    <div class="page-hero">
      <span>PLAYLISTS</span>
      <h1>پلی‌لیست‌ها</h1>
      <p>پلی‌لیست‌های منتخب نئون موزیک.</p>
    </div>

    ${cardGrid(DATA.playlists || [], "playlist")}
  `;
}

function renderPlayListDetail() {
  const p = byId(DATA.playlists || [], query().get("id"));

  if (!p) {
    app.innerHTML = empty("پلی‌لیست پیدا نشد.");
    return;
  }

  const list = playlistSongs(p.id);

  app.innerHTML = `
    <section class="detail-hero">
      <img
        src="${p.cover || fallbackCover(p.title)}"
        alt="${esc(p.title)}"
      >

      <div>
        <span class="eyebrow">PLAYLIST</span>
        <h1>${esc(p.title)}</h1>
        <p>${esc(p.description || "")}</p>

        <span class="detail-count">${list.length} آهنگ</span>

        <div class="detail-actions">
          <button
            class="btn primary"
            ${
              list.length
                ? `onclick="Player.load(${DATA.songs.findIndex(s => s.id === list[0].id)}, true)"`
                : "disabled"
            }
          >
            ▶ پخش همه
          </button>

          <button
            class="btn ghost"
            ${
              list.length
                ? `onclick="playPlaylistShuffle('${esc(p.id)}')"`
                : "disabled"
            }
          >
            ⤨ پخش تصادفی
          </button>
        </div>
      </div>
    </section>

    ${songGrid(list)}
  `;
}

function renderSong() {
  const s = byId(DATA.songs || [], query().get("id"));

  if (!s) {
    app.innerHTML = empty("آهنگ پیدا نشد.");
    return;
  }

  const idx = DATA.songs.findIndex(x => x.id === s.id);

  const related = (DATA.songs || [])
    .filter(
      x =>
        x.id !== s.id &&
        (x.artist === s.artist || x.category === s.category)
    )
    .slice(0, 6);

  app.innerHTML = `
    <section class="song-detail">
      <img
        id="detail-cover"
        src="${safeSongCover(s)}"
        alt="کاور ${esc(s.title)}"
      >

      <div>
        <span class="eyebrow">NEON MUSIC</span>

        <h1>${esc(s.title)}</h1>

        <p class="detail-artist">
          ${esc(s.artist || "هنرمند نامشخص")}
        </p>

        <dl>
          <div>
            <dt>آلبوم</dt>
            <dd>${esc(s.album || "—")}</dd>
          </div>

          <div>
            <dt>سبک</dt>
            <dd>${esc(s.category || "—")}</dd>
          </div>

          <div>
            <dt>مدت</dt>
            <dd>${esc(s.duration || "—")}</dd>
          </div>
        </dl>

        <div class="detail-actions">
          <button
            class="btn primary"
            onclick="Player.load(${idx}, true)"
          >
            ▶ پخش
          </button>

          <a
            class="btn ghost"
            href="${esc(s.audio)}"
            download
          >
            ⇩ دانلود
          </a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <h2>آهنگ‌های مرتبط</h2>
      </div>

      ${songGrid(related)}
    </section>
  `;

  if (typeof extractEmbeddedCover === "function") {
    extractEmbeddedCover(s)
      .then(src => {
        const img = $("#detail-cover");

        if (img && src) {
          img.src = src;
        }
      })
      .catch(() => {});
  }
}

function renderSearch() {
  const q = (query().get("q") || "").trim().toLowerCase();

  const input = `
    <section class="search-page">
      <span class="eyebrow">SEARCH</span>
      <h1>جستجو</h1>

      <form class="big-search" action="search.html">
        <input
          name="q"
          value="${esc(q)}"
          autofocus
          placeholder="نام آهنگ، خواننده، آلبوم یا سبک..."
        >

        <button>جستجو</button>
      </form>
    </section>
  `;

  if (!q) {
    app.innerHTML = input + empty("عبارت مورد نظرت را جستجو کن.");
    return;
  }

  const songs = (DATA.songs || []).filter(s =>
    [s.title, s.artist, s.album, s.category].some(v =>
      String(v || "").toLowerCase().includes(q)
    )
  );

  app.innerHTML = `
    ${input}

    <section class="section">
      <div class="section-head">
        <h2>نتایج برای «${esc(q)}»</h2>
      </div>

      ${songGrid(songs)}
    </section>
  `;
}

function renderEntityList(kind, title) {
  const typeMap = {
    albums: "album",
    artists: "artist",
    categories: "category"
  };

  app.innerHTML = `
    <div class="page-hero">
      <span>NEON MUSIC</span>
      <h1>${title}</h1>
    </div>

    ${cardGrid(DATA[kind] || [], typeMap[kind])}
  `;
}

function renderEntityDetail(kind) {
  const x = byId(DATA[kind] || [], query().get("id"));

  if (!x) {
    app.innerHTML = empty("مورد مورد نظر پیدا نشد.");
    return;
  }

  let songs = [];

  if (kind === "albums") {
    songs = (DATA.songs || []).filter(
      s => s.album === x.id || s.album === x.title
    );
  }

  if (kind === "artists") {
    songs = (DATA.songs || []).filter(
      s => s.artist === x.name || s.artist === x.title
    );
  }

  if (kind === "categories") {
    songs = (DATA.songs || []).filter(
      s =>
        s.category === x.name ||
        s.category === x.title ||
        s.category === x.id
    );
  }

  const title = x.title || x.name || x.id;

  app.innerHTML = `
    <section class="detail-hero">
      <img
        src="${x.cover || fallbackCover(title)}"
        alt="${esc(title)}"
      >

      <div>
        <span class="eyebrow">${kind.slice(0, -1).toUpperCase()}</span>

        <h1>${esc(title)}</h1>

        <p>${esc(x.description || "")}</p>

        ${
          kind === "artists"
            ? `<p>${esc(x.bio || "")}</p>`
            : ""
        }
      </div>
    </section>

    ${songGrid(songs)}
  `;
}

function renderText(page) {
  const content = {
    about: [
      "درباره نئون موزیک",
      [
        "نئون موزیک یک پلتفرم مدرن برای کشف، پخش و دانلود موسیقی است. هدف ما ارائه تجربه‌ای سریع، ساده و حرفه‌ای برای شنیدن موسیقی است.",
        "در نئون موزیک می‌توانید آهنگ‌ها، آلبوم‌ها، هنرمندان، سبک‌های موسیقی و پلی‌لیست‌های منتخب را در صفحه‌های اختصاصی پیدا کنید."
      ]
    ],

    contact: [
      "ارتباط با ما",
      [
        "برای ارتباط با نئون موزیک، ارسال پیشنهاد، گزارش مشکل یا پیگیری موارد مربوط به محتوا، از طریق تلگرام با ما در ارتباط باشید."
      ]
    ],

    privacy: [
      "حریم خصوصی",
      [
        "نئون موزیک به حریم خصوصی کاربران احترام می‌گذارد.",
        "برخی تنظیمات مربوط به تجربه کاربری مانند حالت روشن یا تیره ممکن است فقط در مرورگر شما ذخیره شوند.",
        "لینک‌های خارجی مانند تلگرام سیاست‌های حریم خصوصی مستقل خود را دارند."
      ]
    ],

    terms: [
      "قوانین استفاده",
      [
        "استفاده از نئون موزیک به معنی پذیرش قوانین سایت است.",
        "حقوق آثار موسیقی و کاورها متعلق به صاحبان قانونی آن‌ها است و استفاده از محتوا باید با رعایت حقوق مربوطه انجام شود.",
        "استفاده غیرمجاز از سایت یا ایجاد اختلال در عملکرد آن مجاز نیست."
      ]
    ]
  }[page];

  if (!content) {
    app.innerHTML = empty();
    return;
  }

  app.innerHTML = `
    <article class="text-page">
      <span class="eyebrow">NEON MUSIC</span>

      <h1>${content[0]}</h1>

      ${content[1].map(p => `<p>${p}</p>`).join("")}

      ${
        page === "contact"
          ? `
            <a
              class="btn primary"
              href="${SITE.telegram}"
              target="_blank"
              rel="noopener"
            >
              ارتباط در تلگرام
            </a>
          `
          : ""
      }
    </article>
  `;
}

function playPlaylistShuffle(id) {
  const list = playlistSongs(id);

  if (!list.length) return;

  const song = list[Math.floor(Math.random() * list.length)];
  const index = (DATA.songs || []).findIndex(x => x.id === song.id);

  if (index >= 0 && typeof Player !== "undefined") {
    Player.load(index, true);
  }
}

window.playPlaylistShuffle = playPlaylistShuffle;

window.renderCards = () => {
  document
    .querySelectorAll(".lazy-cover[data-song]")
    .forEach(img => {
      const song = byId(DATA.songs || [], img.dataset.song);

      if (song) {
        img.src = safeSongCover(song);
      }
    });
};

function boot() {
  app = $("#app");

  if (!app) return;

  if (typeof DATA === "undefined") {
    app.innerHTML = empty("اطلاعات سایت بارگذاری نشد.");
    return;
  }

  const page = document.body.dataset.page;

  const map = {
    index: renderHome,
    songs: renderSongs,
    song: renderSong,

    albums: () => renderEntityList("albums", "آلبوم‌ها"),
    album: () => renderEntityDetail("albums"),

    artists: () => renderEntityList("artists", "هنرمندان"),
    artist: () => renderEntityDetail("artists"),

    playlists: renderPlaylists,
    playlist: renderPlayListDetail,

    categories: () => renderEntityList("categories", "سبک‌ها"),
    category: () => renderEntityDetail("categories"),

    search: renderSearch,

    about: () => renderText("about"),
    contact: () => renderText("contact"),
    privacy: () => renderText("privacy"),
    terms: () => renderText("terms")
  };

  try {
    (map[page] || renderHome)();
  } catch (error) {
    console.error(error);

    app.innerHTML = `
      <div class="empty-state">
        <div>⚠</div>
        <h3>مشکلی در بارگذاری صفحه پیش آمد</h3>
        <p>لطفاً صفحه را دوباره بارگذاری کنید.</p>
      </div>
    `;
  }

  if (typeof preloadCovers === "function") {
    try {
      preloadCovers();
    } catch (e) {
      console.warn("Cover preload failed:", e);
    }
  }

  const t = $(".theme-toggle");

  t?.addEventListener("click", () => {
    document.body.classList.toggle("day");

    localStorage.setItem(
      "neon-theme",
      document.body.classList.contains("day")
        ? "day"
        : "night"
    );
  });

  if (localStorage.getItem("neon-theme") === "day") {
    document.body.classList.add("day");
  }

  const ft = $("#footer-telegram");

  if (ft && typeof SITE !== "undefined" && SITE.telegram) {
    ft.href = SITE.telegram;
    ft.target = "_blank";
    ft.rel = "noopener";
  }
}

document.addEventListener("DOMContentLoaded", boot);
