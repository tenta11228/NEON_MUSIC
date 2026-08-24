function seoBase(title,description){
  document.title=`${title} | ${SITE.name}`;
  const d=document.querySelector('meta[name="description"]');if(d)d.content=description;
  const canon=document.querySelector('link[rel="canonical"]');if(canon)canon.href=location.href;
}
function addJsonLd(obj){
  document.querySelectorAll('script[data-neon-ld]').forEach(x=>x.remove());
  const s=document.createElement("script");s.type="application/ld+json";s.dataset.neonLd="1";s.textContent=JSON.stringify(obj);document.head.appendChild(s);
}
document.addEventListener("neon:trackchange",e=>{
  const s=e.detail; addJsonLd({"@context":"https://schema.org","@type":"MusicRecording",name:s.title,byArtist:{"@type":"MusicGroup",name:s.artist||"نامشخص"},inAlbum:s.album||undefined,url:location.href});
});
document.addEventListener("DOMContentLoaded",()=>{
  const page=document.body.dataset.page,id=new URLSearchParams(location.search).get("id");
  if(page==="song"){const s=DATA.songs.find(x=>x.id===id);if(s){seoBase(`${s.title} - ${s.artist||""}`,`پخش آنلاین و دانلود ${s.title}`);addJsonLd({"@context":"https://schema.org","@type":"MusicRecording",name:s.title,byArtist:{"@type":"MusicGroup",name:s.artist||"نامشخص"},url:location.href});}}
  if(page==="album"){const a=DATA.albums.find(x=>x.id===id);if(a)addJsonLd({"@context":"https://schema.org","@type":"MusicAlbum",name:a.title||a.name,url:location.href});}
  if(page==="artist"){const a=DATA.artists.find(x=>x.id===id);if(a)addJsonLd({"@context":"https://schema.org","@type":"MusicGroup",name:a.name||a.title,url:location.href});}
});