document.addEventListener("DOMContentLoaded",()=>{
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("is-visible");io.unobserve(e.target)}}),{threshold:.08});
  document.querySelectorAll(".reveal,.section,.song-card,.entity-card").forEach(x=>io.observe(x));
});