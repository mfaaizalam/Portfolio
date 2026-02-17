import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────
   TOKENS
───────────────────────────────────────── */
const C = {
  gold:  "#C8902A",
  goldL: "#E2AC46",
  goldD: "#8C5E12",
  goldP: "#F5E4A8",
  ink:   "#07060A",
  ink2:  "#110F16",
  cream: "#EDE8E0",
  muted: "rgba(237,232,224,0.44)",
  b:     "rgba(200,144,42,0.14)",
};

/* ─────────────────────────────────────────
   GLOBAL CSS
───────────────────────────────────────── */
const Css = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,700;1,9..144,300;1,9..144,600&family=Manrope:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@300;400;500&display=swap');

    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{
      font-family:'Manrope',sans-serif;
      background:${C.ink};color:${C.cream};
      overflow-x:hidden;-webkit-font-smoothing:antialiased;
    }
    ::selection{background:${C.gold};color:${C.ink}}
    ::-webkit-scrollbar{width:3px}
    ::-webkit-scrollbar-track{background:${C.ink}}
    ::-webkit-scrollbar-thumb{background:${C.gold}}

    .f { font-family:'Fraunces',serif }
    .m { font-family:'IBM Plex Mono',monospace }

    /* shimmer */
    @keyframes sh{0%{background-position:0% 50%}100%{background-position:200% 50%}}
    .sh{
      background:linear-gradient(90deg,${C.goldD} 0%,${C.gold} 28%,${C.goldP} 50%,${C.gold} 72%,${C.goldD} 100%);
      background-size:200% auto;
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;
      background-clip:text;animation:sh 4s linear infinite;
    }

    /* noise */
    body::before{
      content:'';position:fixed;inset:0;pointer-events:none;z-index:9990;
      background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23f)' opacity='0.04'/%3E%3C/svg%3E");
      opacity:.55;mix-blend-mode:overlay;
    }

    /* grid bg */
    .gbg{
      background-image:
        linear-gradient(rgba(200,144,42,.045) 1px,transparent 1px),
        linear-gradient(90deg,rgba(200,144,42,.045) 1px,transparent 1px);
      background-size:64px 64px;
    }

    /* marquee */
    @keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
    .mq{animation:mq 26s linear infinite;display:flex;width:max-content}

    /* nav link */
    .nl{position:relative;text-decoration:none;transition:color .25s}
    .nl::after{content:'';position:absolute;bottom:-2px;left:0;right:0;height:1px;
      background:${C.gold};transform:scaleX(0);transform-origin:left;transition:transform .3s}
    .nl:hover{color:${C.goldL}!important}
    .nl:hover::after{transform:scaleX(1)}

    /* service card */
    .sc{border:1px solid ${C.b};transition:border-color .4s,box-shadow .4s,transform .3s,background .4s}
    .sc:hover{border-color:rgba(200,144,42,.45);
      box-shadow:0 0 60px rgba(200,144,42,.08),inset 0 1px 0 rgba(200,144,42,.1);
      transform:translateY(-4px)}

    /* work row */
    .wr{border-bottom:1px solid rgba(200,144,42,.1);transition:background .3s,padding-left .3s}
    .wr:hover{background:rgba(200,144,42,.04)}

    /* input */
    .inp{
      width:100%;padding:12px 14px;
      background:rgba(200,144,42,.04);
      border:1px solid rgba(200,144,42,.18);
      color:${C.cream};font-size:13px;border-radius:2px;
      font-family:'Manrope',sans-serif;outline:none;transition:border-color .3s;
    }
    .inp:focus{border-color:rgba(200,144,42,.5)}
    .inp::placeholder{color:rgba(237,232,224,.22)}

    /* ─── RESPONSIVE ─────────────────────── */

    /* Tablet */
    @media(max-width:1024px){
      .hide-t{display:none!important}
      .g2{grid-template-columns:1fr!important}
      .g4{grid-template-columns:1fr 1fr!important}
      .g3{grid-template-columns:1fr!important}
      .cr{flex-direction:column!important}
    }

    /* Mobile */
    @media(max-width:768px){
      .nav-d{display:none!important}
      .mob-btn{display:flex!important}
      .hero-grid{grid-template-columns:1fr!important;grid-template-rows:auto auto!important}
      .hero-left{padding-top:80px!important;padding-bottom:28px!important}
      .hero-right{display:none!important}
      .hero-stats{grid-template-columns:1fr 1fr!important}
      .g4{grid-template-columns:1fr 1fr!important}
      .g2{grid-template-columns:1fr!important}
      .g3{grid-template-columns:1fr!important}
      .wr:hover{padding-left:0!important}
      .footer-inner{flex-direction:column!important;align-items:flex-start!important;gap:14px!important}
    }

    @media(max-width:480px){
      .hero-stats{grid-template-columns:1fr 1fr!important}
      .g4{grid-template-columns:1fr!important}
      .cta-row{flex-direction:column!important;align-items:stretch!important}
      .cta-row a{text-align:center!important;justify-content:center!important}
    }

    .mob-btn{display:none}
  `}</style>
);

/* ─────────────────────────────────────────
   GLOBE CANVAS
───────────────────────────────────────── */
function Globe() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    let w, h, raf;
    const resize = () => {
      w = cv.offsetWidth; h = cv.offsetHeight;
      cv.width = w * devicePixelRatio; cv.height = h * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cv);

    const R = () => Math.min(w, h) * 0.36;
    const project = (lat, lon, rot) => {
      const φ = lat * Math.PI / 180;
      const λ = lon * Math.PI / 180 + rot;
      const tilt = 0.3;
      const x = Math.cos(φ) * Math.cos(λ);
      const y = Math.cos(φ) * Math.sin(λ);
      const z = Math.sin(φ);
      const y2 = y * Math.cos(tilt) - z * Math.sin(tilt);
      const z2 = y * Math.sin(tilt) + z * Math.cos(tilt);
      const r = R();
      return { x: w / 2 + x * r, y: h / 2 + y2 * r, z: z2 * r, v: z2 > -r * 0.05 };
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      const rot = t * 0.00016;
      const r = R();
      // lat lines
      for (let i = -8; i <= 8; i++) {
        ctx.beginPath();
        let f = true;
        for (let j = 0; j <= 100; j++) {
          const p = project(i * 10.5, j / 100 * 360 - 180, rot);
          const a = p.v ? 0.13 + (p.z / r) * 0.2 : 0.03;
          ctx.strokeStyle = `rgba(200,144,42,${i === 0 ? a * 2.5 : a})`;
          ctx.lineWidth = i === 0 ? 1 : 0.5;
          f ? (ctx.moveTo(p.x, p.y), f = false) : ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
      // lon lines
      for (let j = 0; j < 14; j++) {
        ctx.beginPath();
        let f = true;
        for (let i = -50; i <= 50; i++) {
          const p = project(i * 1.8, j / 14 * 360 - 180, rot);
          const a = p.v ? 0.12 + (p.z / r) * 0.15 : 0.02;
          ctx.strokeStyle = `rgba(200,144,42,${a})`;
          ctx.lineWidth = 0.5;
          f ? (ctx.moveTo(p.x, p.y), f = false) : ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
      // glow dots on front
      for (let i = -3; i <= 3; i++) {
        for (let j = 0; j < 14; j++) {
          const p = project(i * 15, j / 14 * 360 - 180, rot);
          if (p.z > r * 0.25) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(226,172,70,${0.3 + (p.z / r) * 0.6})`;
            ctx.fill();
          }
        }
      }
      // outer glow
      const g = ctx.createRadialGradient(w/2,h/2,r*.65,w/2,h/2,r*1.15);
      g.addColorStop(0,"rgba(200,144,42,0)");
      g.addColorStop(.7,"rgba(200,144,42,0.05)");
      g.addColorStop(1,"rgba(200,144,42,0)");
      ctx.beginPath(); ctx.arc(w/2,h/2,r*1.1,0,Math.PI*2);
      ctx.fillStyle=g; ctx.fill();
    };

    const loop = (t) => { draw(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} style={{ width:"100%", height:"100%", display:"block" }} />;
}

/* ─────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────── */
function Count({ to, suffix = "" }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const step = to / (1500 / 16);
        let cur = 0;
        const t = setInterval(() => {
          cur += step;
          if (cur >= to) { setV(to); clearInterval(t); } else setV(Math.floor(cur));
        }, 16);
      }
    }, { threshold: .5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

/* ─────────────────────────────────────────
   LINE REVEAL
───────────────────────────────────────── */
function LR({ children, delay = 0, style = {} }) {
  return (
    <div style={{ overflow:"hidden", ...style }}>
      <motion.div
        initial={{ y:"105%" }} animate={{ y:"0%" }}
        transition={{ duration:.9, delay, ease:[0.16,1,0.3,1] }}
      >{children}</motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────── */
function SH({ tag, h1, italic, sub, center }) {
  return (
    <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }} transition={{ duration:.7 }}
      style={{ marginBottom:52, textAlign: center ? "center" : "left" }}
    >
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16,
        justifyContent: center ? "center" : "flex-start" }}>
        <div style={{ width:22, height:1, background:C.gold }} />
        <span className="m" style={{ fontSize:9, letterSpacing:4, color:`rgba(200,144,42,.65)` }}>{tag}</span>
        {center && <div style={{ width:22, height:1, background:C.gold }} />}
      </div>
      <h2 className="f" style={{ fontSize:"clamp(34px,5vw,68px)", fontWeight:600, lineHeight:1.05 }}>
        {h1}{" "}
        {italic && <span className="sh f" style={{ fontStyle:"italic" }}>{italic}</span>}
      </h2>
      {sub && <p style={{ color:C.muted, fontSize:14, lineHeight:1.8, maxWidth:340, marginTop:14,
        marginLeft: center ? "auto" : 0, marginRight: center ? "auto" : 0 }}>{sub}</p>}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   NAV
───────────────────────────────────────── */
function Nav() {
  const [sc, setSc] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.header initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }}
        transition={{ duration:.7 }}
        style={{
          position:"fixed", top:0, left:0, right:0, zIndex:1000,
          padding:"0 5vw", height:64,
          display:"flex", alignItems:"center", justifyContent:"space-between",
          backdropFilter: sc ? "blur(28px)" : "none",
          background: sc ? "rgba(7,6,10,.92)" : "transparent",
          borderBottom:`1px solid ${sc ? C.b : "transparent"}`,
          transition:"all .4s ease",
        }}>
        {/* Logo */}
        <a href="#" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
          <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
            <polygon points="18,2 34,32 2,32" fill="none" stroke={C.gold} strokeWidth="1.5"/>
            <polygon points="18,11 28,32 8,32" fill={`rgba(200,144,42,.12)`}/>
            <circle cx="18" cy="18" r="2.5" fill={C.gold}/>
          </svg>
          <span className="f" style={{ fontSize:17, fontWeight:700, letterSpacing:2, color:C.cream }}>
            GOLDENHORDE
          </span>
        </a>

        {/* Desktop */}
        <nav className="nav-d" style={{ display:"flex", gap:32, alignItems:"center" }}>
          {["Work","Services","Process","Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nl m"
              style={{ fontSize:10, letterSpacing:2.5, color:C.muted }}>
              {l.toUpperCase()}
            </a>
          ))}
          <motion.a href="#contact" whileHover={{ background:C.goldL }} whileTap={{ scale:.97 }}
            style={{
              background:C.gold, color:C.ink, padding:"9px 22px", borderRadius:2,
              fontSize:10, letterSpacing:2.5, fontWeight:700, textDecoration:"none",
              fontFamily:"'IBM Plex Mono',monospace", transition:"background .2s",
            }}>START PROJECT</motion.a>
        </nav>

        {/* Mobile */}
        <button className="mob-btn" onClick={() => setOpen(!open)}
          style={{
            background:"none", border:`1px solid ${C.b}`, color:C.cream,
            padding:"8px 16px", borderRadius:2, cursor:"pointer",
            fontSize:9, letterSpacing:3, fontFamily:"'IBM Plex Mono',monospace",
          }}>{open ? "CLOSE" : "MENU"}</button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }}
            style={{
              position:"fixed", top:64, left:0, right:0, zIndex:999,
              background:"rgba(7,6,10,.97)", backdropFilter:"blur(20px)",
              borderBottom:`1px solid ${C.b}`, padding:"24px 5vw 32px",
            }}>
            {["Work","Services","Process","Contact"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}
                style={{
                  display:"block", fontSize:36, fontWeight:600,
                  fontFamily:"'Fraunces',serif", textDecoration:"none", color:C.cream,
                  borderBottom:`1px solid ${C.b}`, padding:"16px 0",
                  transition:"color .2s",
                }}
                onMouseEnter={e => e.target.style.color = C.goldL}
                onMouseLeave={e => e.target.style.color = C.cream}
              >{l}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)}
              style={{
                display:"block", background:C.gold, color:C.ink, padding:"14px",
                borderRadius:2, fontSize:10, letterSpacing:3, fontWeight:700,
                textDecoration:"none", textAlign:"center",
                fontFamily:"'IBM Plex Mono',monospace", marginTop:18,
              }}>START A PROJECT</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
function Hero() {
  return (
    <section style={{
      minHeight:"100vh", position:"relative", overflow:"hidden", paddingTop:0,
    }}>
      {/* Grid bg */}
      <div className="gbg" style={{ position:"absolute", inset:0, zIndex:0 }} />

      {/* Radial glow */}
      <div style={{
        position:"absolute", top:"-20%", left:"-5%",
        width:"min(800px,110vw)", height:"min(800px,110vw)", borderRadius:"50%",
        background:`radial-gradient(circle,rgba(200,144,42,.16) 0%,transparent 65%)`,
        zIndex:1, pointerEvents:"none",
      }} />
      <div style={{
        position:"absolute", bottom:"-10%", right:"-5%",
        width:"min(500px,70vw)", height:"min(500px,70vw)", borderRadius:"50%",
        background:`radial-gradient(circle,rgba(140,94,18,.1) 0%,transparent 70%)`,
        zIndex:1, pointerEvents:"none",
      }} />

      {/* Ghost letters behind everything */}
      <div className="f hide-t" style={{
        position:"absolute", top:"50%", left:"50%",
        transform:"translate(-50%,-50%)",
        fontSize:"13vw", letterSpacing:".15em", whiteSpace:"nowrap",
        color:"transparent", WebkitTextStroke:`1px rgba(200,144,42,.055)`,
        zIndex:1, pointerEvents:"none", userSelect:"none",
      }}>GOLDENHORDE</div>

      {/* Main 2-col grid */}
      <div className="hero-grid" style={{
        display:"grid", gridTemplateColumns:"1fr 1fr",
        minHeight:"100vh", position:"relative", zIndex:10,
      }}>

        {/* LEFT: copy */}
        <div className="hero-left" style={{
          display:"flex", flexDirection:"column", justifyContent:"center",
          padding:"clamp(80px,12vh,120px) clamp(24px,5vw,72px) clamp(32px,5vh,56px)",
          borderRight:`1px solid ${C.b}`,
        }}>

          {/* Badge */}
          <LR delay={.4}>
            <div style={{
              display:"inline-flex", alignItems:"center", gap:9,
              border:`1px solid rgba(200,144,42,.22)`, padding:"7px 16px",
              borderRadius:100, marginBottom:36, width:"fit-content",
              background:"rgba(200,144,42,.05)", backdropFilter:"blur(8px)",
            }}>
              <motion.span animate={{ opacity:[1,.2,1] }} transition={{ duration:1.5, repeat:Infinity }}
                style={{ width:7, height:7, borderRadius:"50%", background:"#5DDB7F",
                  boxShadow:"0 0 10px #5DDB7F", display:"inline-block" }} />
              <span className="m" style={{ fontSize:9, letterSpacing:3, color:`rgba(200,144,42,.85)` }}>
                ACCEPTING PROJECTS · 2025
              </span>
            </div>
          </LR>

          {/* HEADLINE — concise & punchy */}
          <div style={{ marginBottom:20 }}>
            <LR delay={.55}>
              <div className="f" style={{
                fontSize:"clamp(36px,5.5vw,76px)",
                fontWeight:600, lineHeight:.95, color:C.cream,
                letterSpacing:"-.02em",
              }}>
                Websites That
              </div>
            </LR>
            <LR delay={.7}>
              <div className="f sh" style={{
                fontSize:"clamp(36px,5.5vw,76px)",
                fontWeight:300, fontStyle:"italic", lineHeight:.95,
                letterSpacing:"-.01em",
              }}>
                Win Clients.
              </div>
            </LR>
          </div>

          {/* Sub rule */}
          <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }}
            transition={{ duration:1, delay:1.1, ease:[0.16,1,0.3,1] }}
            style={{
              height:1, width:"75%", marginBottom:24,
              background:`linear-gradient(90deg,${C.gold},rgba(200,144,42,.08))`,
              transformOrigin:"left",
            }} />

          {/* DESCRIPTOR — short, professional */}
          <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:.7, delay:1.25 }}
            style={{
              color:C.muted, fontSize:"clamp(13px,1.4vw,15px)",
              lineHeight:1.8, maxWidth:400, fontWeight:300, marginBottom:32,
            }}>
            We craft high-performance websites for emerging businesses, creative professionals, and ambitious brands — designed to convert, built to last.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:.7, delay:1.4 }}
            className="cta-row"
            style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:36 }}>
            <motion.a href="#contact"
              whileHover={{ scale:1.03, boxShadow:`0 0 44px rgba(200,144,42,.35)` }}
              whileTap={{ scale:.97 }}
              style={{
                display:"inline-flex", alignItems:"center", gap:10,
                background:`linear-gradient(135deg,${C.gold},${C.goldL})`,
                color:C.ink, padding:"14px 28px", borderRadius:2,
                fontSize:10, letterSpacing:3, fontWeight:700,
                textDecoration:"none", fontFamily:"'IBM Plex Mono',monospace",
              }}>
              START YOUR PROJECT
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
            <motion.a href="#work"
              whileHover={{ color:C.goldL, borderColor:`rgba(200,144,42,.45)` }}
              style={{
                display:"inline-flex", alignItems:"center", gap:10,
                border:`1px solid rgba(200,144,42,.22)`, color:C.muted,
                padding:"14px 28px", borderRadius:2, fontSize:10,
                letterSpacing:3, fontWeight:500, textDecoration:"none",
                fontFamily:"'IBM Plex Mono',monospace", transition:"all .3s",
              }}>
              VIEW PORTFOLIO
            </motion.a>
          </motion.div>

          {/* Stars */}
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.7 }}
            style={{ display:"flex", alignItems:"center", gap:8 }}>
            {[...Array(5)].map((_,i) => (
              <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill={C.gold}>
                <polygon points="6,0 7.5,4.5 12,4.5 8.5,7 9.8,12 6,9 2.2,12 3.5,7 0,4.5 4.5,4.5"/>
              </svg>
            ))}
            <span className="m" style={{ fontSize:8, letterSpacing:2.5, color:`rgba(200,144,42,.5)` }}>
              5.0 · 87+ PROJECTS DELIVERED
            </span>
          </motion.div>
        </div>

        {/* RIGHT: Globe */}
        <div className="hero-right" style={{
          position:"relative", display:"flex", alignItems:"center", justifyContent:"center",
          minHeight:"50vw",
        }}>
          <motion.div initial={{ opacity:0, scale:.88 }} animate={{ opacity:1, scale:1 }}
            transition={{ duration:1.3, delay:.7, ease:[0.16,1,0.3,1] }}
            style={{ width:"100%", height:"100%", position:"absolute", inset:0 }}>
            <Globe />
          </motion.div>

          {/* Center label */}
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.8, duration:.8 }}
            style={{ position:"relative", zIndex:2, textAlign:"center", pointerEvents:"none" }}>
            <div className="f" style={{
              fontSize:"clamp(26px,3.5vw,44px)", letterSpacing:6,
              color:C.gold, opacity:.9,
              textShadow:`0 0 40px rgba(200,144,42,.45)`,
            }}>GH</div>
            <div className="m" style={{ fontSize:8, letterSpacing:4, color:`rgba(200,144,42,.45)`, marginTop:5 }}>
              STUDIO
            </div>
          </motion.div>

          {/* Pulse rings */}
          {[1, 1.6, 2.2].map((s, i) => (
            <motion.div key={i}
              animate={{ scale:[s, s+.35, s], opacity:[.12, 0, .12] }}
              transition={{ duration:3+i, repeat:Infinity, delay:i*.9, ease:"easeInOut" }}
              style={{
                position:"absolute", top:"50%", left:"50%",
                transform:"translate(-50%,-50%)",
                width:"38%", height:"38%", borderRadius:"50%",
                border:`1px solid rgba(200,144,42,${.28 - i*.07})`,
                pointerEvents:"none", zIndex:3,
              }} />
          ))}

          {/* Floating stat cards — desktop only */}
          {[
            { label:"SATISFACTION", value:"100%", pos:{ top:"12%", left:"8%" } },
            { label:"DELIVERED",    value:"87+",  pos:{ bottom:"14%", right:"8%" } },
          ].map((pt, i) => (
            <motion.div key={i} className="hide-t"
              initial={{ opacity:0, scale:.85 }}
              animate={{ opacity:1, scale:1 }}
              transition={{ duration:.6, delay:2 + i*.15 }}
              style={{
                position:"absolute", ...pt.pos,
                border:`1px solid rgba(200,144,42,.2)`,
                background:"rgba(7,6,10,.75)", backdropFilter:"blur(10px)",
                padding:"12px 18px", borderRadius:2, zIndex:5,
              }}>
              <div className="m" style={{ fontSize:8, letterSpacing:3, color:`rgba(200,144,42,.55)`, marginBottom:5 }}>
                {pt.label}
              </div>
              <div className="f" style={{ fontSize:28, letterSpacing:1, color:C.goldL, lineHeight:1 }}>
                {pt.value}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* STAT BAR */}
      <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
        transition={{ duration:.7, delay:2 }}
        className="hero-stats"
        style={{
          display:"grid", gridTemplateColumns:"repeat(4,1fr)",
          borderTop:`1px solid ${C.b}`, position:"relative", zIndex:10,
        }}>
        {[
          { v:87,  s:"+",    l:"Projects Delivered" },
          { v:100, s:"%",    l:"Client Satisfaction" },
          { v:5,   s:" Days",l:"Avg. Turnaround"     },
          { v:40,  s:"+",    l:"Satisfied Clients"   },
        ].map((st, i) => (
          <div key={i} style={{
            padding:"22px 0 22px clamp(14px,3vw,36px)",
            borderRight: i < 3 ? `1px solid ${C.b}` : "none",
          }}>
            <div className="f" style={{
              fontSize:"clamp(26px,3.2vw,46px)", fontWeight:600,
              color:C.goldL, lineHeight:1, marginBottom:5,
            }}>
              <Count to={st.v} suffix={st.s} />
            </div>
            <div className="m" style={{ fontSize:8, letterSpacing:3, color:C.muted }}>
              {st.l.toUpperCase()}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────
   MARQUEE
───────────────────────────────────────── */
function Marquee() {
  const items = ["PORTFOLIO SITES","BUSINESS WEBSITES","PERSONAL BRANDING","LANDING PAGES","SMALL BUSINESS","CREATIVE STUDIOS","FREELANCERS","STARTUPS"];
  return (
    <div style={{
      borderTop:`1px solid ${C.b}`, borderBottom:`1px solid ${C.b}`,
      overflow:"hidden", padding:"12px 0", background:`rgba(200,144,42,.02)`,
    }}>
      <div className="mq">
        {[...items,...items,...items].map((x,i) => (
          <span key={i} className="m" style={{
            fontSize:9, letterSpacing:4, color:`rgba(200,144,42,.42)`,
            padding:"0 32px", borderRight:`1px solid rgba(200,144,42,.1)`,
            whiteSpace:"nowrap", flexShrink:0,
          }}>{x}</span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SERVICES
───────────────────────────────────────── */
const SVCS = [
  { n:"01", title:"Emerging Business Websites",
    desc:"From concept to launch — credibility-first websites that establish trust, attract clients, and position your business for growth.",
    tags:["STRATEGY","UI/UX","DEVELOPMENT","SEO"],
    icon:<svg width="22" height="22" viewBox="0 0 28 28" fill="none"><rect x="2" y="6" width="24" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M2 10h24" stroke="currentColor" strokeWidth="1.3"/><circle cx="6" cy="8" r="1" fill="currentColor"/><circle cx="10" cy="8" r="1" fill="currentColor"/></svg> },
  { n:"02", title:"Personal Portfolio Websites",
    desc:"Bespoke portfolio sites for designers, developers, photographers and consultants — crafted to open doors and start conversations.",
    tags:["PERSONAL BRAND","ANIMATION","CUSTOM","RESPONSIVE"],
    icon:<svg width="22" height="22" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="10" r="5" stroke="currentColor" strokeWidth="1.3"/><path d="M4 24c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg> },
  { n:"03", title:"Small Business Web Presence",
    desc:"Locally-optimised websites for restaurants, clinics, salons and agencies — built to earn trust and drive real business results.",
    tags:["LOCAL SEO","GOOGLE","CMS","FAST"],
    icon:<svg width="22" height="22" viewBox="0 0 28 28" fill="none"><path d="M4 22V12l10-8 10 8v10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><rect x="10" y="16" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.3"/></svg> },
  { n:"04", title:"Landing Pages & Campaigns",
    desc:"High-converting single-purpose pages for product launches, lead capture and campaigns — every element earns its place.",
    tags:["CONVERSION","A/B READY","ANALYTICS","FAST LOAD"],
    icon:<svg width="22" height="22" viewBox="0 0 28 28" fill="none"><path d="M6 20l6-8 4 4 3-6 5 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><circle cx="22" cy="6" r="3" stroke="currentColor" strokeWidth="1.3"/></svg> },
];

function Services() {
  return (
    <section id="services" style={{ padding:"88px 5vw", maxWidth:1400, margin:"0 auto" }}>
      <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:20 }}>
        <SH tag="WHAT WE OFFER" h1="Our" italic="Services"
          sub="Digital presences that convert visitors into clients — crafted with precision, launched with confidence." />
      </div>
      <div className="g2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2 }}>
        {SVCS.map((s, i) => (
          <motion.div key={i} className="sc"
            initial={{ opacity:0, y:26 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, margin:"-40px" }}
            transition={{ duration:.6, delay:i*.09, ease:[0.16,1,0.3,1] }}
            style={{
              padding:"clamp(22px,3vw,40px) clamp(18px,2.8vw,36px)",
              background:"rgba(7,6,10,.5)", position:"relative", overflow:"hidden",
            }}>
            {/* watermark */}
            <div className="f" style={{
              position:"absolute", top:-10, right:10, fontSize:100,
              color:"rgba(200,144,42,.04)", pointerEvents:"none", userSelect:"none",
            }}>{s.n}</div>
            {/* icon */}
            <div style={{
              width:44, height:44, borderRadius:2,
              border:`1px solid rgba(200,144,42,.2)`, background:"rgba(200,144,42,.07)",
              display:"flex", alignItems:"center", justifyContent:"center",
              color:C.goldL, marginBottom:22,
            }}>{s.icon}</div>
            <span className="m" style={{ fontSize:8, letterSpacing:3, color:`rgba(200,144,42,.42)`, display:"block", marginBottom:11 }}>
              {s.n} / 04
            </span>
            <h3 className="f" style={{ fontSize:"clamp(17px,2vw,24px)", fontWeight:600, marginBottom:12, lineHeight:1.2 }}>
              {s.title}
            </h3>
            <p style={{ color:C.muted, fontSize:13, lineHeight:1.8, marginBottom:22 }}>{s.desc}</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {s.tags.map(t => (
                <span key={t} className="m" style={{
                  fontSize:8, letterSpacing:2.5, padding:"4px 9px",
                  border:`1px solid rgba(200,144,42,.17)`, color:`rgba(200,144,42,.55)`, borderRadius:2,
                }}>{t}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   WORK
───────────────────────────────────────── */
const WORK = [
  { t:"Arcana Creative Studio",      c:"Personal Portfolio",     y:"2025", tp:"Design + Dev" },
  { t:"Fold & Flour Artisan Bakery", c:"Small Business",         y:"2025", tp:"Full Build"   },
  { t:"Ionescu Legal Advisory",      c:"Professional Portfolio", y:"2025", tp:"Design + Dev" },
  { t:"Zephyr Wellness Collective",  c:"Emerging Business",      y:"2024", tp:"Full Build"   },
  { t:"Capsule Apparel Co.",         c:"E-Commerce Launch",      y:"2024", tp:"Full Build"   },
  { t:"Roshan Kumar — Engineering",  c:"Personal Portfolio",     y:"2024", tp:"Design + Dev" },
];

function Work() {
  return (
    <section id="work" style={{
      borderTop:`1px solid ${C.b}`, background:`rgba(200,144,42,.01)`, padding:"88px 5vw",
    }}>
      <div style={{ maxWidth:1400, margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
          <SH tag="SELECTED WORK" h1="Recent" italic="Projects" />
          <a href="#contact" className="m"
            style={{
              color:C.muted, fontSize:10, letterSpacing:3, textDecoration:"none",
              borderBottom:`1px solid rgba(200,144,42,.2)`, paddingBottom:2, transition:"all .3s",
              marginBottom:52,
            }}
            onMouseEnter={e => { e.target.style.color = C.goldL; e.target.style.borderBottomColor = C.goldL; }}
            onMouseLeave={e => { e.target.style.color = C.muted; e.target.style.borderBottomColor = "rgba(200,144,42,.2)"; }}
          >DISCUSS A PROJECT →</a>
        </div>
        {WORK.map((w, i) => (
          <motion.div key={i} className="wr"
            initial={{ opacity:0, x:-12 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:"-20px" }} transition={{ duration:.5, delay:i*.07 }}
            style={{
              display:"flex", alignItems:"center", justifyContent:"space-between",
              padding:"22px 10px 22px 0", gap:14, cursor:"pointer", flexWrap:"wrap",
            }}>
            <div style={{ display:"flex", alignItems:"center", gap:18, flex:1, minWidth:160 }}>
              <div style={{ width:5, height:5, borderRadius:"50%", background:C.gold, flexShrink:0, opacity:.35 }}/>
              <div>
                <div className="m" style={{ fontSize:8, letterSpacing:3, color:`rgba(200,144,42,.42)`, marginBottom:4 }}>
                  {w.c.toUpperCase()}
                </div>
                <h3 className="f" style={{ fontSize:"clamp(16px,2.4vw,30px)", fontWeight:600 }}>{w.t}</h3>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:16, flexShrink:0 }}>
              <span className="m" style={{ fontSize:10, color:"rgba(237,232,224,.2)" }}>{w.y}</span>
              <span className="m" style={{
                fontSize:8, letterSpacing:2.5, padding:"4px 11px",
                border:`1px solid rgba(200,144,42,.17)`, color:`rgba(200,144,42,.5)`, borderRadius:2,
              }}>{w.tp}</span>
              <span style={{ color:`rgba(200,144,42,.38)`, fontSize:16 }}>↗</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   PROCESS
───────────────────────────────────────── */
const PROC = [
  { n:"01", t:"Discovery",  b:"We learn your goals, audience, and definition of success — no assumptions, no templates, just honest strategy." },
  { n:"02", t:"Design",     b:"Custom wireframes and high-fidelity visuals tailored to your brand — functional, beautiful, and purposeful." },
  { n:"03", t:"Build",      b:"Clean, performant code with pixel-perfect execution, fast load times, and full mobile responsiveness." },
  { n:"04", t:"Launch",     b:"Rigorous QA, smooth deployment, and a handover that leaves you confident and in full control." },
];

function Process() {
  return (
    <section id="process" style={{ padding:"88px 5vw", borderTop:`1px solid ${C.b}` }}>
      <div style={{ maxWidth:1400, margin:"0 auto" }}>
        <SH tag="OUR PROCESS" h1="From Idea to" italic="Live" center />
        <div className="g4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:2 }}>
          {PROC.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:"-30px" }} transition={{ duration:.6, delay:i*.1 }}
              style={{
                padding:"clamp(20px,2.6vw,36px) clamp(16px,2.2vw,28px)",
                border:`1px solid ${C.b}`, background:"rgba(7,6,10,.3)", position:"relative",
              }}>
              <div style={{
                width:46, height:46, borderRadius:"50%",
                border:`1px solid rgba(200,144,42,.28)`, background:"rgba(200,144,42,.07)",
                display:"flex", alignItems:"center", justifyContent:"center", marginBottom:22,
              }}>
                <span className="f" style={{ fontSize:16, color:C.goldL, fontWeight:700 }}>{p.n}</span>
              </div>
              <h3 className="f" style={{ fontSize:"clamp(16px,1.8vw,22px)", fontWeight:600, marginBottom:11 }}>{p.t}</h3>
              <p style={{ color:C.muted, fontSize:13, lineHeight:1.8 }}>{p.b}</p>
              <div style={{
                position:"absolute", bottom:0, left:0, right:0, height:2,
                background:`linear-gradient(90deg,${C.goldD},${C.gold})`, opacity:.25,
              }}/>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────── */
const TESTI = [
  { name:"Sarah Mitchell",  role:"Founder, Zephyr Wellness",    q:"GoldenHorde exceeded every expectation. Our client enquiries doubled within the first month of launch." },
  { name:"Roshan Kumar",    role:"Senior Software Engineer",    q:"The portfolio they built led to three interview invitations in two weeks. Outstanding quality and communication." },
  { name:"Marco Delacroix", role:"Owner, Capsule Apparel Co.", q:"Professional, fast, and meticulous. They understood our brand from the very first conversation." },
];

function Testimonials() {
  return (
    <section style={{
      padding:"88px 5vw",
      background:`linear-gradient(180deg,rgba(200,144,42,.025) 0%,transparent 100%)`,
      borderTop:`1px solid ${C.b}`,
    }}>
      <div style={{ maxWidth:1400, margin:"0 auto" }}>
        <SH tag="CLIENT FEEDBACK" h1="What Our Clients" italic="Say" center />
        <div className="g3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2 }}>
          {TESTI.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true, margin:"-30px" }} transition={{ duration:.6, delay:i*.1 }}
              style={{
                padding:"clamp(22px,2.8vw,38px) clamp(18px,2.4vw,32px)",
                border:`1px solid ${C.b}`, background:"rgba(7,6,10,.4)", position:"relative",
              }}>
              <div className="f" style={{
                position:"absolute", top:6, left:20, fontSize:72, lineHeight:1,
                color:C.gold, opacity:.14, fontWeight:700,
              }}>"</div>
              <div style={{ display:"flex", gap:3, marginBottom:20 }}>
                {[...Array(5)].map((_,j) => (
                  <svg key={j} width="11" height="11" viewBox="0 0 12 12" fill={C.gold}>
                    <polygon points="6,0 7.5,4.5 12,4.5 8.5,7 9.8,12 6,9 2.2,12 3.5,7 0,4.5 4.5,4.5"/>
                  </svg>
                ))}
              </div>
              <p className="f" style={{
                fontSize:"clamp(14px,1.4vw,16px)", lineHeight:1.75, fontStyle:"italic",
                color:"rgba(237,232,224,.82)", marginBottom:24,
              }}>"{t.q}"</p>
              <div style={{ fontSize:13, fontWeight:600, color:C.cream }}>{t.name}</div>
              <div className="m" style={{ fontSize:8, letterSpacing:2.5, color:`rgba(200,144,42,.48)`, marginTop:5 }}>
                {t.role.toUpperCase()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CONTACT
───────────────────────────────────────── */
function Contact() {
  return (
    <section id="contact" style={{
      padding:"100px 5vw", borderTop:`1px solid ${C.b}`,
      position:"relative", overflow:"hidden",
    }}>
      <div style={{
        position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
        width:"min(800px,120vw)", height:"min(800px,120vw)", borderRadius:"50%",
        background:`radial-gradient(circle,rgba(200,144,42,.07) 0%,transparent 65%)`,
        pointerEvents:"none",
      }}/>
      <div className="f hide-t" style={{
        position:"absolute", right:0, bottom:"-4%",
        fontSize:"min(200px,14vw)", color:"rgba(200,144,42,.04)",
        pointerEvents:"none", userSelect:"none", lineHeight:1, fontStyle:"italic",
      }}>GH</div>

      <div style={{ maxWidth:1400, margin:"0 auto" }}>
        <div className="cr" style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"7vw", flexWrap:"wrap" }}>

          {/* LEFT */}
          <motion.div initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:.8 }}
            style={{ flex:"1 1 280px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
              <div style={{ width:22, height:1, background:C.gold }}/>
              <span className="m" style={{ fontSize:8, letterSpacing:5, color:`rgba(200,144,42,.6)` }}>GET IN TOUCH</span>
            </div>
            <h2 className="f" style={{
              fontSize:"clamp(36px,5.5vw,84px)", fontWeight:600, lineHeight:.93, marginBottom:22,
            }}>
              Let's Build<br/>Something<br/>
              <span className="sh f" style={{ fontStyle:"italic" }}>Remarkable.</span>
            </h2>
            <p style={{ color:C.muted, fontSize:14, lineHeight:1.8, maxWidth:360, marginBottom:34 }}>
              Launching a new venture, elevating your personal brand, or strengthening your business's digital presence — we're ready to deliver.
            </p>
            {[
              { icon:"✦", l:"Email",         v:"hello@goldenhorde.studio" },
              { icon:"◈", l:"Response Time", v:"Within 24 business hours"  },
              { icon:"◆", l:"Availability",  v:"Currently accepting projects" },
            ].map((c,i) => (
              <div key={i} style={{ display:"flex", gap:14, marginBottom:16, alignItems:"flex-start" }}>
                <span style={{ color:C.gold, fontSize:10, flexShrink:0, marginTop:2 }}>{c.icon}</span>
                <div>
                  <div className="m" style={{ fontSize:7, letterSpacing:3.5, color:`rgba(200,144,42,.44)`, marginBottom:4 }}>
                    {c.l.toUpperCase()}
                  </div>
                  <div style={{ fontSize:13, color:C.cream }}>{c.v}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* FORM */}
          <motion.div initial={{ opacity:0, x:24 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:.8, delay:.2 }}
            style={{
              flex:"1 1 280px",
              border:`1px solid ${C.b}`,
              padding:"clamp(22px,3.2vw,44px) clamp(18px,2.8vw,38px)",
              background:"rgba(7,6,10,.72)", backdropFilter:"blur(16px)",
            }}>
            <h3 className="f" style={{ fontSize:24, fontWeight:600, marginBottom:6 }}>Start a Conversation</h3>
            <p style={{ color:C.muted, fontSize:12, lineHeight:1.7, marginBottom:28 }}>
              Tell us about your project. We'll respond promptly.
            </p>
            {[{ l:"Full Name", p:"Your name", t:"text" }, { l:"Email Address", p:"your@email.com", t:"email" }].map((f, i) => (
              <div key={i} style={{ marginBottom:16 }}>
                <label className="m" style={{ fontSize:8, letterSpacing:3, color:`rgba(200,144,42,.52)`, display:"block", marginBottom:7 }}>
                  {f.l.toUpperCase()}
                </label>
                <input type={f.t} placeholder={f.p} className="inp"/>
              </div>
            ))}
            <div style={{ marginBottom:16 }}>
              <label className="m" style={{ fontSize:8, letterSpacing:3, color:`rgba(200,144,42,.52)`, display:"block", marginBottom:7 }}>
                PROJECT TYPE
              </label>
              <select className="inp" style={{ background:"rgba(7,6,10,.95)" }}>
                {["Select project type…","Personal Portfolio","Business Website","Landing Page","Small Business","Other"].map(o => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom:24 }}>
              <label className="m" style={{ fontSize:8, letterSpacing:3, color:`rgba(200,144,42,.52)`, display:"block", marginBottom:7 }}>
                MESSAGE
              </label>
              <textarea rows={4} placeholder="Describe your goals, timeline, and requirements…"
                className="inp" style={{ resize:"vertical" }}/>
            </div>
            <motion.button whileHover={{ scale:1.02, boxShadow:`0 0 44px rgba(200,144,42,.3)` }}
              whileTap={{ scale:.98 }}
              style={{
                width:"100%", padding:"16px",
                background:`linear-gradient(135deg,${C.gold},${C.goldL})`,
                color:C.ink, fontFamily:"'IBM Plex Mono',monospace",
                fontSize:10, letterSpacing:3.5, fontWeight:700,
                border:"none", borderRadius:2, cursor:"pointer",
                display:"flex", alignItems:"center", justifyContent:"center", gap:10,
              }}>
              SEND ENQUIRY
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   FOOTER
───────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer-inner" style={{
      borderTop:`1px solid ${C.b}`, padding:"36px 5vw",
      display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16,
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:9 }}>
        <svg width="22" height="22" viewBox="0 0 36 36" fill="none">
          <polygon points="18,2 34,32 2,32" fill="none" stroke={C.gold} strokeWidth="1.5"/>
          <circle cx="18" cy="18" r="2.5" fill={C.gold}/>
        </svg>
        <span className="f" style={{ fontSize:14, fontWeight:700, letterSpacing:2, color:"rgba(237,232,224,.35)" }}>
          GOLDENHORDE
        </span>
      </div>
      <div className="m" style={{ fontSize:8, letterSpacing:2.5, color:"rgba(237,232,224,.18)" }}>
        © 2025 GOLDENHORDE STUDIO
      </div>
      <div style={{ display:"flex", gap:22, flexWrap:"wrap" }}>
        {["Privacy","Instagram","LinkedIn","Behance"].map(l => (
          <a key={l} href="#" className="m"
            style={{ fontSize:8, letterSpacing:2.5, color:"rgba(237,232,224,.2)", textDecoration:"none", transition:"color .2s" }}
            onMouseEnter={e => e.target.style.color = C.goldL}
            onMouseLeave={e => e.target.style.color = "rgba(237,232,224,.2)"}
          >{l.toUpperCase()}</a>
        ))}
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────
   APP
───────────────────────────────────────── */
export default function App() {
  return (
    <div style={{ background:C.ink, minHeight:"100vh" }}>
      <Css />
      <Nav />
      <Hero />
      <Marquee />
      <Services />
      <Work />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}