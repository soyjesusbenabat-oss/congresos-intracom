/* ============================================================
   INTRACOM Congresos — interactions
   ============================================================ */
(function(){
  "use strict";
  const $=(s,c=document)=>c.querySelector(s);
  const $$=(s,c=document)=>[...c.querySelectorAll(s)];
  const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;

  /* ---------- NAV ---------- */
  const nav=$("#nav");
  const onScroll=()=>{ nav.classList.toggle("scrolled", window.scrollY>14); };
  onScroll(); addEventListener("scroll",onScroll,{passive:true});
  const navLinks=$("#navLinks"), navToggle=$("#navToggle");
  navToggle?.addEventListener("click",()=>navLinks.classList.toggle("open"));
  $$("#navLinks a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));

  /* ---------- REVEAL + COUNT (scroll-driven; robust where IO doesn't fire) ---------- */
  let revs=$$(".reveal");
  let counters=$$("[data-count]");
  let firstSweep=true;
  const vh=()=>window.innerHeight||document.documentElement.clientHeight;
  function sweep(){
    const h=vh();
    if(revs.length){
      revs=revs.filter(el=>{
        const top=el.getBoundingClientRect().top;
        if(top < h*0.93){ if(!firstSweep && !reduce) el.classList.add("anim"); el.classList.add("in"); return false; }
        return true;
      });
    }
    if(counters.length){
      counters=counters.filter(el=>{
        const top=el.getBoundingClientRect().top;
        if(top < h*0.85){ animateCount(el); return false; }
        return true;
      });
    }
    firstSweep=false;
  }
  let ticking=false;
  function requestSweep(){ if(ticking) return; ticking=true; requestAnimationFrame(()=>{ sweep(); ticking=false; }); }
  if(reduce){ revs.forEach(r=>r.classList.add("in")); revs=[]; }

  /* ---------- COUNT-UP ---------- */
  function animateCount(el){
    const target=parseFloat(el.dataset.count);
    const dur=1500, t0=performance.now();
    const fmt=(n)=> Number.isInteger(target)? Math.round(n).toString() : n.toFixed(0);
    if(reduce){ el.textContent=fmt(target); return; }
    function tick(t){
      const p=Math.min(1,(t-t0)/dur);
      const e=1-Math.pow(1-p,3);
      el.textContent=fmt(target*e);
      if(p<1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const onScrollSweep=()=>requestSweep();
  addEventListener("scroll",onScrollSweep,{passive:true});
  addEventListener("resize",onScrollSweep);
  sweep();
  // safety re-checks (fonts/layout settling) and reveal-all fallback
  setTimeout(sweep,120);
  setTimeout(sweep,500);
  setTimeout(()=>{ revs.forEach(r=>r.classList.add("in")); revs=[]; counters.forEach(animateCount); counters=[]; },2500);

  /* ---------- HERO PARALLAX ---------- */
  const hero=$("#hero");
  if(hero && !reduce){
    const layers=$$("[data-px]",hero);
    let raf=null, mx=0,my=0;
    hero.addEventListener("pointermove",(e)=>{
      const r=hero.getBoundingClientRect();
      mx=((e.clientX-r.left)/r.width-.5);
      my=((e.clientY-r.top)/r.height-.5);
      if(!raf) raf=requestAnimationFrame(apply);
    });
    function apply(){
      layers.forEach(l=>{
        const d=parseFloat(l.dataset.px);
        l.style.transform=`translate3d(${(-mx*d).toFixed(1)}px,${(-my*d).toFixed(1)}px,0)`;
      });
      raf=null;
    }
    addEventListener("scroll",()=>{
      const y=window.scrollY;
      layers.forEach(l=>{ const d=parseFloat(l.dataset.pxScroll||0); if(d) l.style.translate=`0 ${(y*d).toFixed(1)}px`; });
    },{passive:true});
  }

  /* ---------- SERVICES TABS ---------- */
  $$(".svc-tab").forEach(tab=>{
    tab.addEventListener("click",()=>{
      const id=tab.dataset.tab;
      $$(".svc-tab").forEach(t=>t.classList.toggle("active",t===tab));
      $$(".svc-content").forEach(c=>c.classList.toggle("show",c.dataset.tab===id));
    });
  });
  /* services accordion (mobile) */
  $$(".svc-acc-head").forEach(h=>{
    h.addEventListener("click",()=>{
      const item=h.closest(".svc-acc-item");
      const body=item.querySelector(".svc-acc-body");
      const open=item.classList.contains("open");
      if(open){ item.classList.remove("open"); body.style.maxHeight=null; }
      else{ item.classList.add("open"); body.style.maxHeight=body.scrollHeight+"px"; }
    });
  });

  /* ---------- FAQ ---------- */
  $$(".faq-q").forEach(q=>{
    q.addEventListener("click",()=>{
      const item=q.closest(".faq-item");
      const a=item.querySelector(".faq-a");
      const open=item.classList.contains("open");
      $$(".faq-item.open").forEach(o=>{ if(o!==item){ o.classList.remove("open"); o.querySelector(".faq-a").style.maxHeight=null; } });
      if(open){ item.classList.remove("open"); a.style.maxHeight=null; }
      else{ item.classList.add("open"); a.style.maxHeight=a.scrollHeight+"px"; }
    });
  });

  /* ---------- FORM ---------- */
  const form=$("#contactForm");
  if(form){
    form.addEventListener("submit",async(e)=>{
      e.preventDefault();
      let ok=true;
      $$("[data-required]",form).forEach(f=>{
        const val=(f.value||"").trim();
        if(!val){ f.classList.add("err"); ok=false; } else f.classList.remove("err");
      });
      const email=$("#f-email",form);
      if(email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){ email.classList.add("err"); ok=false; }
      if(!ok){ form.querySelector(".err")?.scrollIntoView?.({behavior:"smooth",block:"center"}); return; }

      const btn=form.querySelector(".form-submit");
      btn.disabled=true; btn.textContent="Enviando…";

      try{
        const data=new FormData(form);
        // collect checked services
        const checked=[...$$(".check-pill input:checked",form)].map(i=>i.value).join(", ");
        if(checked) data.set("servicios_interes", checked);

        const res=await fetch("https://api.web3forms.com/submit",{method:"POST",body:data});
        const json=await res.json();
        if(json.success){
          form.style.display="none";
          $("#formOk").classList.add("show");
        } else {
          btn.disabled=false; btn.innerHTML="Enviar solicitud <span class='arr'>→</span>";
          alert("Hubo un error al enviar. Por favor escríbenos a info@intracom.es");
        }
      } catch(err){
        btn.disabled=false; btn.innerHTML="Enviar solicitud <span class='arr'>→</span>";
        alert("Error de conexión. Por favor escríbenos a info@intracom.es");
      }
    });
    $$("input,select,textarea",form).forEach(f=>f.addEventListener("input",()=>f.classList.remove("err")));
  }

  /* ---------- TWEAKS ---------- */
  const KEY="intracom_tweaks_v1";
  const defaults={hero:"centered", theme:"light", accent:"red"};
  let state=Object.assign({},defaults);
  try{ const s=JSON.parse(localStorage.getItem(KEY)); if(s) state=Object.assign(state,s); }catch(e){}

  const accents={
    red:{a:"var(--red)",a6:"var(--red-600)",soft:"var(--red-50)"},
    sky:{a:"var(--sky-deep)",a6:"#236f84",soft:"var(--sky-50)"},
    navy:{a:"var(--blue)",a6:"var(--blue-deep)",soft:"var(--blue-50)"}
  };
  function apply(){
    const root=document.documentElement;
    root.setAttribute("data-theme", state.theme);
    const acc=accents[state.accent]||accents.red;
    root.style.setProperty("--accent",acc.a);
    root.style.setProperty("--accent-600",acc.a6);
    root.style.setProperty("--accent-soft",acc.soft);
    hero?.setAttribute("data-layout", state.hero);
    // sync UI
    $$("[data-tw]").forEach(btn=>{
      const g=btn.dataset.tw, v=btn.dataset.val;
      btn.classList.toggle("on", state[g]===v);
    });
    try{ localStorage.setItem(KEY,JSON.stringify(state)); }catch(e){}
  }
  $$("[data-tw]").forEach(btn=>{
    btn.addEventListener("click",()=>{ state[btn.dataset.tw]=btn.dataset.val; apply(); });
  });
  apply();

  // tweaks visibility — host protocol + local toggle
  const panel=$("#tweaks");
  function setTweaks(on){ panel.classList.toggle("hidden",!on); }
  setTweaks(false);
  $("#twClose")?.addEventListener("click",()=>{ setTweaks(false); try{parent.postMessage({type:"tweaks:closed"},"*")}catch(e){} });
  addEventListener("message",(e)=>{
    const d=e.data||{};
    if(d.type==="tweaks:toggle") setTweaks(!!d.value);
    if(d.type==="tweaks:show") setTweaks(true);
    if(d.type==="tweaks:hide") setTweaks(false);
  });
  // local keyboard shortcut to reveal (t)
  addEventListener("keydown",(e)=>{ if(e.key==="t" && !/input|textarea|select/i.test(document.activeElement.tagName)) setTweaks(panel.classList.contains("hidden")); });

  /* year */
  const yr=$("#year"); if(yr) yr.textContent=new Date().getFullYear();
})();
