const $ = (s,root=document)=>root.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
const byId=(arr,id)=>arr.find(x=>x.id===id);
const query=()=>new URLSearchParams(location.search);
const songUrl=id=>`song.html?id=${encodeURIComponent(id)}`;
const playlistUrl=id=>`playlist.html?id=${encodeURIComponent(id)}`;
const albumUrl=id=>`album.html?id=${encodeURIComponent(id)}`;
const artistUrl=id=>`artist.html?id=${encodeURIComponent(id)}`;
const categoryUrl=id=>`category.html?id=${encodeURIComponent(id)}`;

function empty(text="هنوز محتوایی برای نمایش وجود ندارد."){
  return `<div class="empty-state"><div>♫</div><h3>${text}</h3><p>به‌زودی محتوای جدید در این بخش قرار می‌گیرد.</p></div>`;
}
function songCard(s){
  const i=DATA.songs.findIndex(x=>x.id===s.id), cover=getSongCover(s);
  return `<article class="song-card"><a href="${songUrl(s.id)}" class="cover-wrap"><img class="song-cover lazy-cover" src="${cover}" alt="کاور ${esc(s.title)}" loading="lazy" data-song="${esc(s.id)}"><span class="cover-play">▶</span></a>
  <div class="song-card-body"><a href="${songUrl(s.id)}" class="song-title">${esc(s.title)}</a><span class="song-artist">${esc(s.artist||"هنرمند نامشخص")}</span>
  <div class="song-card-meta"><span>${esc(s.duration||"")}</span><div><button onclick="Player.load(${i},true)" aria-label="پخش ${esc(s.title)}">▶</button><a href="${esc(s.audio)}" download aria-label="دانلود ${esc(s.title)}">⇩</a><a href="${songUrl(s.id)}" aria-label="جزئیات">⋯</a></div></div></div></article>`;
}
function section(title,content,href){
  return `<section class="section"><div class="section-head"><h2>${title}</h2>${href?`<a href="${href}">مشاهده همه ←</a>`:""}</div>${content}</section>`;
}
function songGrid(list){return list.length?`<div class="song-grid">${list.map(songCard).join("")}</div>`:empty();}

function renderHome(){
  const latest=[...DATA.songs].slice().reverse().slice(0,8);
  const popular=playlistSongs("popular").slice(0,8);
  app.innerHTML=`
  <section class="home-hero">
    <span class="eyebrow">NEON MUSIC / نئون موزیک</span>
    <h1>آهنگ‌های <em>خاص</em> رو<br>اینجا گوش بده</h1>
    <p>موسیقی‌های جدید و منتخب را در نئون موزیک پیدا کن، گوش بده و دانلود کن.</p>
    <div class="hero-actions">
      <a class="btn primary" href="songs.html">شروع شنیدن</a>
      <a class="btn ghost" href="playlists.html">پلی‌لیست‌ها</a>
    </div>
  </section>

  <section class="home-list-section">
    <div class="section-head">
      <div><span class="eyebrow">NEW RELEASES</span><h2>لیست جدید</h2></div>
      <a href="songs.html">مشاهده همه ←</a>
    </div>
    <div class="song-list">
      ${latest.length ? latest.map((s,i)=>songRow(s,i+1)).join("") : empty("هنوز آهنگ جدیدی اضافه نشده است.")}
    </div>
  </section>

  <section class="home-list-section">
    <div class="section-head">
      <div><span class="eyebrow">POPULAR PLAYLIST</span><h2>پلی‌لیست پرطرفدار</h2></div>
      <a href="playlist.html?id=popular">مشاهده پلی‌لیست ←</a>
    </div>
    <div class="playlist-feature">
      <div class="playlist-feature-info">
        <div class="playlist-icon">🔥</div>
        <div><h3>پرطرفدارها</h3><p>منتخبی از آهنگ‌های پرطرفدار و خاص نئون موزیک.</p></div>
      </div>
      <a class="btn ghost" href="playlist.html?id=popular">باز کردن پلی‌لیست</a>
    </div>
    <div class="song-list">
      ${popular.length ? popular.map((s,i)=>songRow(s,i+1)).join("") : empty("هنوز آهنگی به پلی‌لیست پرطرفدارها اضافه نشده است.")}
    </div>
  </section>`;
}
function songRow(s,num){
  const i=DATA.songs.findIndex(x=>x.id===s.id);
  return `<article class="song-row">
    <span class="row-number">${String(num).padStart(2,"0")}</span>
    <a href="${songUrl(s.id)}"><img src="${getSongCover(s)}" class="row-cover lazy-cover" data-song="${esc(s.id)}" alt="کاور ${esc(s.title)}"></a>
    <div class="row-main"><a href="${songUrl(s.id)}"><b>${esc(s.title)}</b></a><span>${esc(s.artist||"هنرمند نامشخص")}</span></div>
    <span class="row-album">${esc(s.album||"—")}</span>
    <span class="row-duration">${esc(s.duration||"—")}</span>
    <div class="row-actions"><button onclick="Player.load(${i},true)" aria-label="پخش">▶</button><a href="${esc(s.audio)}" download aria-label="دانلود">⇩</a><a href="${songUrl(s.id)}">⋯</a></div>
  </article>`;
}
function cardGrid(list,type){
  if(!list.length)return empty();
  const urlMap={playlist:playlistUrl,album:albumUrl,artist:artistUrl,category:categoryUrl};
  return `<div class="entity-grid">${list.map(x=>`<a class="entity-card" href="${urlMap[type](x.id)}"><img src="${x.cover||neonPlaceholder(x.title||x.name||x.id)}" alt="${esc(x.title||x.name||"")}" loading="lazy"><div><b>${esc(x.title||x.name||"")}</b><span>${type==="playlist"?`${(x.songIds||[]).length} آهنگ`:esc(x.description||x.artist||"")}</span></div></a>`).join("")}</div>`;
}
function playlistSongs(id){const p=byId(DATA.playlists,id);return (p?.songIds||[]).map(id=>byId(DATA.songs,id)).filter(Boolean)}
function renderSongs(){app.innerHTML=`<div class="page-hero"><span>آرشیو موسیقی</span><h1>آهنگ‌ها</h1><p>تمام آهنگ‌های ثبت‌شده در نئون موزیک.</p></div>${songGrid(DATA.songs)}`;}
function renderPlaylists(){app.innerHTML=`<div class="page-hero"><span>PLAYLISTS</span><h1>پلی‌لیست‌ها</h1><p>سه پلی‌لیست منتخب و دستی نئون موزیک.</p></div>${cardGrid(DATA.playlists,"playlist")}`;}
function renderPlayListDetail(){
 const p=byId(DATA.playlists,query().get("id")); if(!p){app.innerHTML=empty("پلی‌لیست پیدا نشد.");return}
 const list=playlistSongs(p.id);
 app.innerHTML=`<section class="detail-hero"><img src="${p.cover||neonPlaceholder(p.title)}" alt="${esc(p.title)}"><div><span class="eyebrow">PLAYLIST</span><h1>${esc(p.title)}</h1><p>${esc(p.description||"")}</p><span class="detail-count">${list.length} آهنگ</span><div class="detail-actions"><button class="btn primary" ${list.length?`onclick="Player.load(${DATA.songs.findIndex(s=>s.id===list[0].id)},true)"`:"disabled"}>▶ پخش همه</button><button class="btn ghost" ${list.length?`onclick="playPlaylistShuffle('${esc(p.id)}')"`:"disabled"}>⤨ پخش تصادفی</button></div></div></section>${songGrid(list)}`;
}
function renderSong(){
 const s=byId(DATA.songs,query().get("id")); if(!s){app.innerHTML=empty("آهنگ پیدا نشد.");return}
 const idx=DATA.songs.findIndex(x=>x.id===s.id);
 const related=DATA.songs.filter(x=>x.id!==s.id&&(x.artist===s.artist||x.category===s.category)).slice(0,6);
 app.innerHTML=`<section class="song-detail"><img id="detail-cover" src="${getSongCover(s)}" alt="کاور ${esc(s.title)}"><div><span class="eyebrow">NEON MUSIC</span><h1>${esc(s.title)}</h1><p class="detail-artist">${esc(s.artist||"هنرمند نامشخص")}</p><dl><div><dt>آلبوم</dt><dd>${esc(s.album||"—")}</dd></div><div><dt>سبک</dt><dd>${esc(s.category||"—")}</dd></div><div><dt>مدت</dt><dd>${esc(s.duration||"—")}</dd></div></dl><div class="detail-actions"><button class="btn primary" onclick="Player.load(${idx},true)">▶ پخش</button><a class="btn ghost" href="${esc(s.audio)}" download>⇩ دانلود</a></div></div></section>${section("آهنگ‌های مرتبط",songGrid(related))}`;
 extractEmbeddedCover(s).then(src=>{const img=$("#detail-cover");if(img)img.src=src});
}
function renderSearch(){
 const q=(query().get("q")||"").trim().toLowerCase();
 const input=`<section class="search-page"><span class="eyebrow">SEARCH</span><h1>جستجو</h1><form class="big-search" action="search.html"><input name="q" value="${esc(q)}" autofocus placeholder="نام آهنگ، خواننده، آلبوم یا سبک..."><button>جستجو</button></form></section>`;
 if(!q){app.innerHTML=input+empty("عبارت مورد نظرت را جستجو کن.");return}
 const songs=DATA.songs.filter(s=>[s.title,s.artist,s.album,s.category].some(v=>String(v||"").toLowerCase().includes(q)));
 app.innerHTML=input+section(`نتایج برای «${esc(q)}»`,songGrid(songs));
}
function renderEntityList(kind,title){app.innerHTML=`<div class="page-hero"><span>NEON MUSIC</span><h1>${title}</h1></div>${cardGrid(DATA[kind],kind.slice(0,-1))}`;}
function renderEntityDetail(kind){
 const x=byId(DATA[kind],query().get("id"));if(!x){app.innerHTML=empty("مورد مورد نظر پیدا نشد.");return}
 let songs=[];
 if(kind==="albums")songs=DATA.songs.filter(s=>s.album===x.id||s.album===x.title);
 if(kind==="artists")songs=DATA.songs.filter(s=>s.artist===x.name||s.artist===x.title);
 if(kind==="categories")songs=DATA.songs.filter(s=>s.category===x.name||s.category===x.title||s.category===x.id);
 app.innerHTML=`<section class="detail-hero"><img src="${x.cover||neonPlaceholder(x.title||x.name)}" alt="${esc(x.title||x.name)}"><div><span class="eyebrow">${kind.slice(0,-1).toUpperCase()}</span><h1>${esc(x.title||x.name)}</h1><p>${esc(x.description||"")}</p>${kind==="artists"?`<p>${esc(x.bio||"")}</p>`:""}</div></section>${songGrid(songs)}`;
}
function renderText(page){
 const content={
 about:["درباره نئون موزیک",[
  "نئون موزیک یک پلتفرم مدرن برای کشف، پخش و دانلود موسیقی است. هدف ما ارائه تجربه‌ای سریع، ساده و حرفه‌ای برای شنیدن موسیقی است.",
  "در نئون موزیک می‌توانید آهنگ‌ها، آلبوم‌ها، هنرمندان، سبک‌های موسیقی و پلی‌لیست‌های منتخب را در صفحه‌های اختصاصی پیدا کنید."
 ]],
 contact:["ارتباط با ما",[
  "برای ارتباط با نئون موزیک، ارسال پیشنهاد، گزارش مشکل یا پیگیری موارد مربوط به محتوا، از طریق تلگرام با ما در ارتباط باشید."
 ]],
 privacy:["حریم خصوصی",[
  "نئون موزیک به حریم خصوصی کاربران احترام می‌گذارد. این نسخه از سایت برای استفاده عادی نیازی به ساخت حساب کاربری ندارد و اطلاعات شخصی کاربران را از طریق فرم ثبت‌نام دریافت نمی‌کند.",
  "برخی تنظیمات مربوط به تجربه کاربری، مانند انتخاب حالت روشن یا تیره، ممکن است فقط در مرورگر خود کاربر ذخیره شوند تا در مراجعه بعدی همان تنظیمات حفظ شوند.",
  "نئون موزیک ممکن است برای بهبود عملکرد و امنیت سایت از سرویس‌های استاندارد میزبانی یا ابزارهای فنی استفاده کند. این سرویس‌ها ممکن است داده‌های فنی عمومی مانند نوع مرورگر یا اطلاعات مربوط به درخواست را مطابق سیاست‌های خود پردازش کنند.",
  "لینک‌های خارجی، از جمله لینک تلگرام، سیاست‌های حریم خصوصی مستقل خود را دارند و استفاده از آن‌ها تابع قوانین همان سرویس است."
 ]],
 terms:["قوانین استفاده",[
  "استفاده از نئون موزیک به معنی پذیرش این قوانین است. کاربران موظف‌اند از خدمات و محتوای سایت به‌صورت قانونی و مسئولانه استفاده کنند.",
  "حقوق مربوط به آثار موسیقی، نام هنرمندان، کاورها و سایر محتوای دارای مالکیت معنوی متعلق به صاحبان قانونی آن‌ها است. انتشار یا استفاده از هر محتوا باید با رعایت حقوق مربوطه انجام شود.",
  "نئون موزیک تلاش می‌کند اطلاعات و لینک‌های سایت را به‌روز نگه دارد، اما تضمین نمی‌کند که تمام محتوا همیشه بدون خطا یا در دسترس باشد.",
  "استفاده غیرمجاز از سایت، ایجاد اختلال در عملکرد آن، یا تلاش برای سوءاستفاده از محتوا و زیرساخت سایت مجاز نیست.",
  "این قوانین ممکن است در آینده برای بهبود خدمات یا رعایت الزامات جدید به‌روزرسانی شوند."
 ]]
 }[page];
 app.innerHTML=`<article class="text-page"><span class="eyebrow">NEON MUSIC</span><h1>${content[0]}</h1>${content[1].map(p=>`<p>${p}</p>`).join("")}${page==="contact"?`<a class="btn primary" href="http://t.me/Crzzygxts" target="_blank" rel="noopener">ارتباط در تلگرام</a>`:""}</article>`;
}
function playPlaylistShuffle(id){const list=playlistSongs(id);if(!list.length)return;const s=list[Math.floor(Math.random()*list.length)];Player.load(DATA.songs.findIndex(x=>x.id===s.id),true)}
window.playPlaylistShuffle=playPlaylistShuffle;
window.renderCards=()=>document.querySelectorAll(".lazy-cover[data-song]").forEach(img=>{const s=byId(DATA.songs,img.dataset.song);if(s)img.src=getSongCover(s)});

function boot(){
 const app=$("#app"); const page=document.body.dataset.page;
 const map={index:renderHome,songs:renderSongs,song:renderSong,albums:()=>renderEntityList("albums","آلبوم‌ها"),album:()=>renderEntityDetail("albums"),artists:()=>renderEntityList("artists","هنرمندان"),artist:()=>renderEntityDetail("artists"),playlists:renderPlaylists,playlist:renderPlayListDetail,categories:()=>renderEntityList("categories","سبک‌ها"),category:()=>renderEntityDetail("categories"),search:renderSearch,about:()=>renderText("about"),contact:()=>renderText("contact"),privacy:()=>renderText("privacy"),terms:()=>renderText("terms")};
 (map[page]||renderHome)(); preloadCovers();
 const t=$(".theme-toggle"); t?.addEventListener("click",()=>{document.body.classList.toggle("day");localStorage.setItem("neon-theme",document.body.classList.contains("day")?"day":"night")});
 if(localStorage.getItem("neon-theme")==="day")document.body.classList.add("day");
 const ft=$("#footer-telegram");if(ft){ft.href=SITE.telegram;ft.target="_blank";ft.rel="noopener"}
}
document.addEventListener("DOMContentLoaded",boot);