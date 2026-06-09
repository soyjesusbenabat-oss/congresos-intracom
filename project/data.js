/* ============================================================
   INTRACOM Congresos — content data + renderers
   ============================================================ */
(function(){
  const el=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e;};
  const check=`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 6 9 17l-5-5"/></svg>`;

  /* ---- icons ---- */
  const ic={
    clipboard:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6M9 16h4"/></svg>`,
    monitor:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
    review:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="m9 15 2 2 4-4"/></svg>`,
    card:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>`,
    headset:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 14v-2a9 9 0 0 1 18 0v2"/><path d="M21 16a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2zM3 16a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2z"/><path d="M21 16v1a4 4 0 0 1-4 4h-5"/></svg>`,
    video:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="m23 7-7 5 7 5z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>`,
    megaphone:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>`,
    mail:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>`,
    palette:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="13.5" cy="6.5" r="1.2"/><circle cx="17.5" cy="10.5" r="1.2"/><circle cx="8.5" cy="7.5" r="1.2"/><circle cx="6.5" cy="12.5" r="1.2"/><path d="M12 2C6.5 2 2 6 2 11c0 4.4 3.6 8 8 8 1.4 0 2.5-1.1 2.5-2.5 0-.6-.2-1.1-.6-1.5-.4-.4-.6-.9-.6-1.5 0-1.4 1.1-2.5 2.5-2.5H16c3.3 0 6-2.7 6-6 0-3.9-4.5-7-10-7z"/></svg>`,
    book:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`
  };

  /* ============ SERVICES (S5) ============ */
  const services=[
    {icon:ic.clipboard,name:"Secretaría Técnica",no:"01",
     desc:"Coordinamos todas las tareas operativas del congreso antes, durante y después del evento: comunicación con ponentes, gestión de documentación, seguimiento del programa y atención continua al comité organizador.",
     inc:["Coordinación general","Gestión de documentación","Atención a ponentes","Seguimiento de plazos","Cronograma y asignación de salas","Comunicación continua con el comité","Gestión de viajes de ponentes","Personal en sede el día del evento"]},
    {icon:ic.monitor,name:"Web del Congreso",no:"02",
     desc:"Diseñamos y desarrollamos la web oficial del congreso: programa, ponentes, inscripción e información práctica. Operativa desde el primer día y adaptada a la identidad de tu evento.",
     inc:["Diseño personalizado","Ficha de ponentes","Programa interactivo","Área de inscripción integrada","Multiidioma opcional","Mantenimiento y actualizaciones","Intervenciones por horas si ya tienes web"]},
    {icon:ic.palette,name:"Identidad Visual y Materiales",no:"03",
     desc:"Creamos la imagen corporativa del congreso y todos los materiales necesarios, tanto digitales como impresos, para que el evento tenga una presencia coherente y profesional.",
     inc:["Logo e identidad corporativa","Cartelería y roll-up","Programa impreso","Acreditaciones y certificados","Producción impresa de materiales","Decoración de la sede"]},
    {icon:ic.review,name:"Gestión de Comunicaciones Científicas",no:"04",
     desc:"Gestionamos el proceso científico del congreso a través de nuestra plataforma: envío de propuestas, evaluación por pares y comunicación personalizada con los participantes.",
     inc:["Plataforma de envío de abstracts","Asignación a revisores","Notificaciones automáticas a autores","Panel de control para el comité científico","CFP en tres idiomas","Difusión del CFP en la red Intracom","Gestión en redes sociales del congreso"]},
    {icon:ic.card,name:"Inscripciones y Administración",no:"05",
     desc:"Gestionamos el registro de participantes con tarifas diferenciadas, facturación automatizada y control de pagos en tiempo real. Sin hojas de cálculo ni transferencias manuales.",
     inc:["Formulario de inscripción online","Tarifas por perfil de participante","Códigos de descuento","Emisión de facturas personalizadas","Gestión fiscal de las facturas","Panel de control en tiempo real","Remisión de certificados online"]},
    {icon:ic.headset,name:"Producción del Evento",no:"06",
     desc:"Cubrimos todos los aspectos técnicos y logísticos el día del congreso, tanto en formato presencial como virtual o híbrido. Nuestro equipo está presente para que nada falle.",
     inc:["Soporte técnico presencial o remoto","Coordinación de salas virtuales","Gestión del streaming","Soporte a ponentes remotos","Grabación de sesiones","Servicio fotográfico y audiovisual","Servicios de catering (opcional)"]},
    {icon:ic.book,name:"Publicación y Difusión Científica",no:"07",
     desc:"Damos continuidad al conocimiento generado en el congreso a través de distintas vías de publicación científica, desde el libro de actas hasta monografías en editoriales de prestigio.",
     inc:["Publicación de resultados del congreso","Libro de actas (Intracom Ediciones)","Monografía en colección Intracom","Monografía en editoriales de prestigio","Mediación con revista científica para monográfico","Difusión en la red iberoamericana Intracom"]}
  ];
  const tabsWrap=document.getElementById("svcTabs");
  if(tabsWrap){
    const tabsCol=el("div","svc-tabs");
    const panel=el("div","svc-panel");
    panel.appendChild(el("div","svc-figure"));
    services.forEach((s,i)=>{
      const t=el("button","svc-tab"+(i===0?" active":""),
        `<span class="t-ic">${s.icon}</span><span class="t-name">${s.name}</span>
         <span class="t-i"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>`);
      t.dataset.tab="s"+i;
      tabsCol.appendChild(t);

      const c=el("div","svc-content"+(i===0?" show":""),
        `<span class="s-no">Servicio ${s.no}</span>
         <h3>${s.name}</h3>
         <p class="s-desc">${s.desc}</p>
         <div class="svc-includes">
           <div class="inc-label">Incluye</div>
           <div class="svc-chips">${s.inc.map(x=>`<span class="svc-chip">${check}${x}</span>`).join("")}</div>
         </div>`);
      c.dataset.tab="s"+i;
      panel.appendChild(c);
    });
    tabsWrap.append(tabsCol,panel);

    // accordion (mobile)
    const acc=document.getElementById("svcAccordion");
    services.forEach((s)=>{
      const item=el("div","svc-acc-item");
      item.innerHTML=`<button class="svc-acc-head"><span class="t-ic">${s.icon}</span><span class="t-name">${s.name}</span>
        <span class="pm"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg></span></button>
        <div class="svc-acc-body"><div class="svc-acc-inner">
          <p class="s-desc" style="color:var(--muted);margin:0 0 16px">${s.desc}</p>
          <div class="svc-chips">${s.inc.map(x=>`<span class="svc-chip">${check}${x}</span>`).join("")}</div>
        </div></div>`;
      acc.appendChild(item);
    });
  }

  /* ============ LOGO STRIP (S3) ============ */
  const logos=[
    {src:"assets/logos/complutense-t.png",nm:"Universidad Complutense de Madrid"},
    {src:"assets/logos/granada-t.png",nm:"Universidad de Granada"},
    {src:"assets/logos/sevilla-t.png",nm:"Universidad de Sevilla"},
    {src:"assets/logos/ceu-t.png",nm:"CEU Universidad Cardenal Herrera"},
    {src:"assets/logos/ull-t.png",nm:"Universidad de La Laguna"},
    {src:"assets/logos/sapienza-t.png",nm:"Sapienza Università di Roma"},
    {src:"assets/logos/ufsc-t.png",nm:"Universidade Federal de Santa Catarina"},
    {src:"assets/logos/logo_uaemex_escudo_una_linea_color.png",nm:"Universidad Autónoma del Estado de México"},
    {src:"assets/logos/logo_uca_horizontal_color.png",nm:"Universidad de Cádiz"},
    {src:"assets/logos/logo_uma_horizontal_color.png",nm:"Universidad de Málaga"},
    {src:"assets/logos/logo_unipa_2020.png",nm:"Università degli Studi di Palermo"},
    {src:"assets/logos/logo_unitus_tuscia.png",nm:"Università degli Studi della Tuscia"},
    {src:"assets/logos/logo_universidade_coimbra.png",nm:"Universidade de Coimbra"}
  ];
  const lt=document.getElementById("logoTrack");
  if(lt){
    const item=(l)=>`<div class="logo-item"><img src="${l.src}" alt="${l.nm}" loading="lazy"></div>`;
    // duplicate for seamless loop
    const html=logos.map(item).join("")+logos.map(item).join("");
    lt.innerHTML=html;
  }

  /* ============ PORTFOLIO (S8) ============ */
  const congresos=[
    {name:"Congreso Intracom",disc:"Comunicación y Divulgación Científica",place:"La Laguna, Tenerife",ed:"5 ediciones",fmt:"Presencial",tone:"navy",img:"assets/congreso-intracom.jpg",
     desc:"Organizado junto a la Universidad de La Laguna. Referente en transferencia del conocimiento en el espacio iberoamericano."},
    {name:"AI Ethics",disc:"IA y Derechos Humanos",place:"Madrid",ed:"2026",fmt:"Presencial",tone:"red",img:"assets/congreso-aiethics.webp",imgBg:"#0a1830",imgPos:"center top",
     desc:"Debate científico sobre el marco ético y jurídico de la IA en la sociedad."},
    {name:"DDHHGlobal",disc:"Derechos Humanos y Globalización",place:"La Laguna, Tenerife",ed:"2026",fmt:"Presencial",tone:"sky",img:"assets/congreso-ddhhglobal.jpg",imgPos:"center top",
     desc:"Multidisciplinar: derecho, filosofía, comunicación, sociología. Pensamiento crítico e internacional."},
    {name:"Mediaethics",disc:"Ética de la Comunicación",place:"Segovia",ed:"2026",fmt:"Presencial",tone:"red",img:"assets/congreso-mediaethics.jpg",
     desc:"Responsabilidad de la comunicación y los algoritmos en la sociedad contemporánea."},
    {name:"ICOM Food",disc:"Comunicación y Alimentación Saludable",place:"Granada",ed:"2026",fmt:"Híbrido",tone:"sky",img:"assets/congreso-icomfood.png",imgBg:"#FFFFFF",imgPos:"center top",lightImg:true,
     desc:"Congreso de comunicación y educación para una alimentación saludable, junto a las Universidades de Granada y Sevilla. Divulgación rigurosa frente a la desinformación."},
    {name:"Gendercom",disc:"Comunicación y Género",place:"Granada",ed:"2026",fmt:"Presencial",tone:"navy",
     desc:"Estudios de género, tecnología y equidad con carácter internacional."},
    {name:"COM-Vino",disc:"Comunicación del Vino",place:"Lanzarote",ed:"2026",fmt:"Presencial",tone:"red",img:"assets/congreso-comvino.jpg",
     desc:"Cruce entre enología, cultura y comunicación en un entorno volcánico único."}
  ];
  const pg=document.getElementById("portfolioGrid");
  if(pg){
    congresos.forEach((c,i)=>{
      const card=el("article","pcard reveal");
      if(i%3) card.dataset.d=(i%3);
      card.innerHTML=`
        <div class="pcard-bg${c.img?'':' ph'}${c.lightImg?' pcard-bg--light':''}" data-tone="${c.tone}"${c.img?` style="background-image:url('${c.img}');background-size:cover;background-position:${c.imgPos||'center'};${c.imgBg?`background-color:${c.imgBg};`:''}"`:''}>${c.img?'':`<span class="ph-label">Foto — ${c.name}</span>`}</div>
        <div class="pcard-top"><span class="tag tag-disc">${c.disc}</span><span class="tag tag-fmt">${c.fmt}</span></div>
        <div class="pcard-body">
          <div class="pcard-meta">${c.place}<span class="sep">·</span>${c.ed}</div>
          <h3>${c.name}</h3>
          <p class="pcard-desc">${c.desc}</p>
        </div>`;
      pg.appendChild(card);
    });
  }

  /* ============ TESTIMONIALS (S9) ============ */
  const tst=[
    {q:"Trabajar con Intracom ha sido una garantía de rigor y planificación. Su conocimiento del entorno científico y su capacidad para coordinar congresos complejos marcan la diferencia.",
     n:"María López",r:"Investigadora en Comunicación Científica",ab:"ML",c:"#CC0000"},
    {q:"Intracom entiende perfectamente las necesidades de las editoriales científicas. Su enfoque profesional, atención al detalle y capacidad de adaptación nos ha permitido centrarnos en los contenidos.",
     n:"Juan López",r:"Director de Comunicación Científica",ab:"JL",c:"#2C8DA6"},
    {q:"La combinación de experiencia, solvencia técnica y trato cercano convierte a Intracom en un partner estratégico. Su trabajo aporta valor real a congresos y publicaciones científicas.",
     n:"Julia Rodes",r:"Directora de Comunicación Científica",ab:"JR",c:"#003871"}
  ];
  const tg=document.getElementById("tstGrid");
  if(tg){
    tst.forEach((t,i)=>{
      const card=el("article","tst reveal");
      if(i) card.dataset.d=i;
      card.innerHTML=`<div class="quote-mk">&ldquo;</div>
        <blockquote>${t.q}</blockquote>
        <div class="tst-author"><span class="tst-avatar" style="background:${t.c}">${t.ab}</span>
        <span><b>${t.n}</b><span>${t.r}</span></span></div>`;
      tg.appendChild(card);
    });
  }

  /* ============ PRICING (S10) ============ */
  const plans=[
    {name:"Esencial",for_:"Para congresos que ya tienen parte de la organización resuelta y necesitan apoyo en áreas concretas.",
     price:"1.500",feats:["Web del congreso","Gestión de inscripciones y pagos","Atención básica a participantes","Certificados de asistencia"],pre:null,featured:false},
    {name:"Completo",for_:"Para comités que quieren delegar la gestión operativa completa y centrarse en el contenido científico.",
     price:"3.500",pre:"Todo lo del Esencial, más:",feats:["Secretaría Técnica Integral","Plataforma de revisión de comunicaciones","Soporte técnico durante el evento","Comunicación y difusión básica"],featured:true},
    {name:"Integral",for_:"Para congresos internacionales o con alta complejidad que necesitan una gestión 360°.",
     price:"6.000",pre:"Todo lo del Completo, más:",feats:["Grabación y producción audiovisual","Difusión completa en la red iberoamericana","Comunicación en varios idiomas","Coordinación con proveedores externos"],featured:false}
  ];
  const pgr=document.getElementById("pricingGrid");
  if(pgr){
    plans.forEach((p,i)=>{
      const card=el("article","plan reveal"+(p.featured?" featured":""));
      if(i) card.dataset.d=i;
      card.innerHTML=`
        ${p.featured?'<span class="plan-badge">★ Más contratado</span>':''}
        <div class="plan-name">Paquete · ${p.name}</div>
        <p class="plan-for">${p.for_}</p>
        <div class="plan-price"><span class="from">Desde</span><span class="amt">${p.price} €</span></div>
        <p class="plan-note">Precio orientativo. Solicita tu propuesta personalizada.</p>
        <a href="#contacto" class="btn ${p.featured?'btn-primary':'btn-ghost'}">Solicitar propuesta</a>
        <ul class="plan-feats">
          ${p.pre?`<li class="pf-pre" style="display:block">${p.pre}</li>`:''}
          ${p.feats.map(f=>`<li>${check}${f}</li>`).join("")}
        </ul>`;
      pgr.appendChild(card);
    });
  }

  /* ============ FAQ (S11) ============ */
  const faqs=[
    {q:"¿Podéis encargaros solo de una parte del congreso?",a:"Sí. Puedes contratarnos para la gestión completa o para servicios concretos: solo la secretaría técnica, solo la web, solo la plataforma de comunicaciones. Nos adaptamos a lo que tu comité ya tiene resuelto."},
    {q:"¿Trabajáis con congresos virtuales e híbridos?",a:"Sí. Tenemos experiencia en los tres formatos: presencial, virtual e híbrido. Adaptamos la plataforma, el soporte técnico y la logística al formato de tu congreso."},
    {q:"¿Con cuánta antelación hay que contactar?",a:"Lo ideal es al menos seis meses antes. Dicho esto, también podemos incorporarnos en procesos ya iniciados si el comité necesita apoyo en fases concretas."},
    {q:"¿Qué pasa con los derechos de las grabaciones?",a:"Las grabaciones son propiedad del comité organizador o de la entidad que determine. Intracom las gestiona técnicamente, pero los derechos son siempre vuestros."},
    {q:"¿Tenéis experiencia con congresos internacionales?",a:"Sí. Todos nuestros congresos tienen carácter internacional, con participantes de España y América Latina. Gestionamos comunicaciones en varios idiomas y coordinamos ponentes de distintos países."},
    {q:"¿Intracom organiza el congreso o solo lo gestiona técnicamente?",a:"Depende de lo que necesites. Podemos asumir la gestión técnica y operativa completa o implicarnos también en la difusión y el aval institucional a través de la red Intracom."},
    {q:"¿Los precios de los paquetes son fijos?",a:"Son orientativos. Cada congreso tiene características propias, por lo que siempre preparamos una propuesta personalizada. La primera reunión es gratuita y sin compromiso."}
  ];
  const fl=document.getElementById("faqList");
  if(fl){
    faqs.forEach(f=>{
      const item=el("div","faq-item");
      item.innerHTML=`<button class="faq-q">${f.q}<span class="pm"></span></button>
        <div class="faq-a"><div class="faq-a-inner">${f.a}</div></div>`;
      fl.appendChild(item);
    });
  }

  /* ============ FORM service checks (S12) ============ */
  const svcOptions=["Secretaría Técnica","Web","Plataforma de comunicaciones","Inscripciones","Soporte técnico","Grabación","Comunicación","Atención a participantes","No lo tengo claro aún"];
  const sc=document.getElementById("svcChecks");
  if(sc){
    svcOptions.forEach((o,i)=>{
      const w=el("div","check-pill");
      w.innerHTML=`<input type="checkbox" id="sv${i}" value="${o}"><label for="sv${i}"><span class="tick">${check}</span>${o}</label>`;
      sc.appendChild(w);
    });
  }
})();
