const Player = (() => {
  const audio = document.getElementById("audio");
  let currentIndex = -1, shuffled=false, repeat=false, ctx=null, analyser=null, source=null, raf=null;

  const els = {
    cover:document.getElementById("player-cover"), title:document.getElementById("player-title"),
    artist:document.getElementById("player-artist"), play:document.getElementById("play-btn"),
    prev:document.getElementById("prev-btn"), next:document.getElementById("next-btn"),
    shuffle:document.getElementById("shuffle-btn"), repeat:document.getElementById("repeat-btn"),
    progress:document.getElementById("progress"), current:document.getElementById("current-time"),
    duration:document.getElementById("duration"), volume:document.getElementById("volume"),
    mute:document.getElementById("mute-btn"), canvas:document.getElementById("spectrum")
  };

  async function load(index, autoplay=true){
    if(!DATA.songs.length) return;
    currentIndex=(index+DATA.songs.length)%DATA.songs.length;
    const song=DATA.songs[currentIndex];
    audio.src=song.audio; els.title.textContent=song.title||"بدون عنوان"; els.artist.textContent=song.artist||"هنرمند نامشخص";
    els.cover.src=getSongCover(song); els.cover.alt=`کاور ${song.title||""}`;
    extractEmbeddedCover(song).then(src=>{ if(DATA.songs[currentIndex]?.id===song.id) els.cover.src=src; window.renderCards&&window.renderCards(); });
    if(autoplay){ try{ await audio.play(); }catch(e){} }
    setupSpectrum(); window.dispatchEvent(new CustomEvent("neon:trackchange",{detail:song}));
  }
  function toggle(){ if(currentIndex<0){load(0,true);return;} audio.paused?audio.play():audio.pause(); }
  function next(){ if(shuffled && DATA.songs.length>1){let n; do{n=Math.floor(Math.random()*DATA.songs.length)}while(n===currentIndex); load(n,true); } else load(currentIndex+1,true); }
  function prev(){ if(audio.currentTime>3){audio.currentTime=0;return;} load(currentIndex-1,true); }
  function setupSpectrum(){
    if(!window.AudioContext || ctx) return;
    try{ ctx=new AudioContext(); source=ctx.createMediaElementSource(audio); analyser=ctx.createAnalyser(); analyser.fftSize=64; source.connect(analyser); analyser.connect(ctx.destination); drawSpectrum(); }catch(e){}
  }
  function drawSpectrum(){
    if(!analyser) return; const c=els.canvas, g=c.getContext("2d"), data=new Uint8Array(analyser.frequencyBinCount);
    const draw=()=>{raf=requestAnimationFrame(draw); analyser.getByteFrequencyData(data); g.clearRect(0,0,c.width,c.height); const w=c.width/data.length; data.forEach((v,i)=>{const h=(v/255)*c.height; const grad=g.createLinearGradient(0,c.height-h,0,c.height);grad.addColorStop(0,"#35dfff");grad.addColorStop(1,"#ff2cab");g.fillStyle=grad;g.fillRect(i*w,c.height-h,Math.max(2,w-2),h);});}; draw();
  }
  els.play.onclick=toggle; els.next.onclick=next; els.prev.onclick=prev;
  els.shuffle.onclick=()=>{shuffled=!shuffled;els.shuffle.classList.toggle("active",shuffled)};
  els.repeat.onclick=()=>{repeat=!repeat;els.repeat.classList.toggle("active",repeat)};
  els.progress.oninput=()=>{if(audio.duration) audio.currentTime=(els.progress.value/100)*audio.duration};
  els.volume.oninput=()=>audio.volume=els.volume.value;
  els.mute.onclick=()=>{audio.muted=!audio.muted;els.mute.textContent=audio.muted?"🔇":"🔊"};
  audio.addEventListener("play",()=>{els.play.textContent="❚❚";els.play.title="توقف";ctx&&ctx.resume()});
  audio.addEventListener("pause",()=>{els.play.textContent="▶";els.play.title="پخش"});
  audio.addEventListener("timeupdate",()=>{els.progress.value=audio.duration?(audio.currentTime/audio.duration)*100:0;els.current.textContent=formatTime(audio.currentTime);els.duration.textContent=formatTime(audio.duration)});
  audio.addEventListener("ended",()=>{repeat?audio.play():next()});
  return {load,toggle,next,prev,get current(){return DATA.songs[currentIndex]}};
})();