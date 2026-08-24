const CoverStore = new Map();
const CoverLoading = new Map();

function neonPlaceholder(seed = "NEON MUSIC") {
  const safe = String(seed).slice(0, 26);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="#ff2cab"/>
          <stop offset=".52" stop-color="#804dff"/>
          <stop offset="1" stop-color="#35dfff"/>
        </linearGradient>

        <filter id="b">
          <feGaussianBlur stdDeviation="35"/>
        </filter>
      </defs>

      <rect width="100%" height="100%" fill="#0b0b13"/>

      <circle
        cx="150"
        cy="170"
        r="180"
        fill="#ff2cab"
        opacity=".4"
        filter="url(#b)"
      />

      <circle
        cx="660"
        cy="600"
        r="220"
        fill="#35dfff"
        opacity=".35"
        filter="url(#b)"
      />

      <rect
        x="24"
        y="24"
        width="752"
        height="752"
        rx="50"
        fill="none"
        stroke="url(#g)"
        opacity=".55"
      />

      <text
        x="50%"
        y="48%"
        text-anchor="middle"
        fill="url(#g)"
        font-size="72"
        font-family="Arial"
        font-weight="700"
      >
        NEON
      </text>

      <text
        x="50%"
        y="58%"
        text-anchor="middle"
        fill="#fff"
        opacity=".8"
        font-size="24"
        font-family="Arial"
      >
        ${safe.replace(/[<>&]/g, "")}
      </text>
    </svg>
  `;

  return (
    "data:image/svg+xml;charset=utf-8," +
    encodeURIComponent(svg)
  );
}

function getSongCover(song) {
  if (!song) return neonPlaceholder();

  const cached = CoverStore.get(song.id);

  if (cached) return cached;

  if (song.cover) return song.cover;

  // خواندن کاور از داخل فایل MP3 در پس‌زمینه
  extractEmbeddedCover(song).then(() => {
    refreshSongCovers();
  });

  return neonPlaceholder(song.title);
}

function extractEmbeddedCover(song) {
  if (!song || !song.audio) {
    return Promise.resolve(neonPlaceholder(song?.title));
  }

  if (CoverStore.has(song.id)) {
    return Promise.resolve(CoverStore.get(song.id));
  }

  if (CoverLoading.has(song.id)) {
    return CoverLoading.get(song.id);
  }

  if (!window.jsmediatags) {
    const fallback =
      song.cover || neonPlaceholder(song.title);

    return Promise.resolve(fallback);
  }

  const promise = new Promise(resolve => {
    jsmediatags.read(song.audio, {
      onSuccess: tag => {
        const pic = tag.tags?.picture;

        if (!pic?.data?.length || !pic.format) {
          const fallback =
            song.cover || neonPlaceholder(song.title);

          CoverStore.set(song.id, fallback);
          CoverLoading.delete(song.id);

          resolve(fallback);
          return;
        }

        let binary = "";

        for (let i = 0; i < pic.data.length; i++) {
          binary += String.fromCharCode(pic.data[i]);
        }

        const src =
          `data:${pic.format};base64,${btoa(binary)}`;

        CoverStore.set(song.id, src);
        CoverLoading.delete(song.id);

        refreshSongCovers();

        resolve(src);
      },

      onError: error => {
        console.log(
          "Embedded cover not found:",
          song.title,
          error
        );

        const fallback =
          song.cover || neonPlaceholder(song.title);

        CoverStore.set(song.id, fallback);
        CoverLoading.delete(song.id);

        resolve(fallback);
      }
    });
  });

  CoverLoading.set(song.id, promise);

  return promise;
}

function refreshSongCovers() {
  document
    .querySelectorAll("img[data-song]")
    .forEach(img => {
      const song = DATA.songs.find(
        s => s.id === img.dataset.song
      );

      if (!song) return;

      const cover = CoverStore.get(song.id);

      if (cover) {
        img.src = cover;
      }
    });

  if (window.renderCards) {
    window.renderCards();
  }
}

function preloadCovers(songs = DATA.songs) {
  songs.forEach(song => {
    extractEmbeddedCover(song).then(() => {
      refreshSongCovers();
    });
  });
}

function readDuration(song) {
  if (song.duration) {
    return Promise.resolve(song.duration);
  }

  return new Promise(resolve => {
    const a = new Audio();

    a.preload = "metadata";
    a.src = song.audio;

    a.onloadedmetadata = () => {
      resolve(
        Number.isFinite(a.duration)
          ? formatTime(a.duration)
          : ""
      );
    };

    a.onerror = () => resolve("");
  });
}

function formatTime(seconds) {
  const s = Math.floor(seconds || 0);

  return `${Math.floor(s / 60)}:${String(
    s % 60
  ).padStart(2, "0")}`;
}
