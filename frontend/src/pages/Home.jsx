import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/* ── Data ── */
const STATS = [
  { v: 87,  s: "+", l: "Projects Delivered" },
  { v: 100, s: "%", l: "Client Satisfaction" },
  { v: 5,   s: "",  l: "Years of Craft" },
  { v: 24,  s: "h", l: "Support Response" },
];

const MARQUEE_ITEMS = [
  "PORTFOLIO SITES","BUSINESS WEBSITES","PERSONAL BRANDING",
  "LANDING PAGES","SMALL BUSINESS","CREATIVE STUDIOS","FREELANCERS","STARTUPS",
];

/* ── Count ── */
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
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

/* ── LR (Line Reveal) ── */
function LR({ children, delay = 0, className = "" }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "105%" }} animate={{ y: "0%" }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ── Stars ── */
function Stars({ count = 5, size = 11 }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 12 12" fill="#C8902A">
          <polygon points="6,0 7.5,4.5 12,4.5 8.5,7 9.8,12 6,9 2.2,12 3.5,7 0,4.5 4.5,4.5" />
        </svg>
      ))}
    </div>
  );
}

/* ── ArrowIcon ── */
function ArrowIcon() {
  return (
    <svg width={13} height={13} viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Globe ── */
function Globe() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    let w, h, raf;
    const resize = () => {
      w = cv.offsetWidth; h = cv.offsetHeight;
      cv.width = w * devicePixelRatio; cv.height = h * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(cv);
    const R = () => Math.min(w, h) * 0.36;
    const project = (lat, lon, rot) => {
      const φ = lat * Math.PI / 180, λ = lon * Math.PI / 180 + rot, tilt = 0.3;
      const x = Math.cos(φ) * Math.cos(λ), y = Math.cos(φ) * Math.sin(λ), z = Math.sin(φ);
      const y2 = y * Math.cos(tilt) - z * Math.sin(tilt), z2 = y * Math.sin(tilt) + z * Math.cos(tilt);
      const r = R();
      return { x: w / 2 + x * r, y: h / 2 + y2 * r, z: z2 * r, v: z2 > -r * 0.05 };
    };
    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      const rot = t * 0.00016, r = R();
      for (let i = -8; i <= 8; i++) {
        ctx.beginPath(); let f = true;
        for (let j = 0; j <= 100; j++) {
          const p = project(i * 10.5, j / 100 * 360 - 180, rot);
          const a = p.v ? 0.13 + (p.z / r) * 0.2 : 0.03;
          ctx.strokeStyle = `rgba(200,144,42,${i === 0 ? a * 2.5 : a})`; ctx.lineWidth = i === 0 ? 1 : 0.5;
          f ? (ctx.moveTo(p.x, p.y), f = false) : ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
      for (let j = 0; j < 14; j++) {
        ctx.beginPath(); let f = true;
        for (let i = -50; i <= 50; i++) {
          const p = project(i * 1.8, j / 14 * 360 - 180, rot);
          const a = p.v ? 0.12 + (p.z / r) * 0.15 : 0.02;
          ctx.strokeStyle = `rgba(200,144,42,${a})`; ctx.lineWidth = 0.5;
          f ? (ctx.moveTo(p.x, p.y), f = false) : ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
      for (let i = -3; i <= 3; i++) for (let j = 0; j < 14; j++) {
        const p = project(i * 15, j / 14 * 360 - 180, rot);
        if (p.z > r * 0.25) {
          ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(226,172,70,${0.3 + (p.z / r) * 0.6})`; ctx.fill();
        }
      }
      const g = ctx.createRadialGradient(w / 2, h / 2, r * .65, w / 2, h / 2, r * 1.15);
      g.addColorStop(0, "rgba(200,144,42,0)"); g.addColorStop(.7, "rgba(200,144,42,0.05)"); g.addColorStop(1, "rgba(200,144,42,0)");
      ctx.beginPath(); ctx.arc(w / 2, h / 2, r * 1.1, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
    };
    const loop = (t) => { draw(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} className="w-full h-full block" />;
}

/* ── Marquee ── */
function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="relative border-t border-b border-gold/10 overflow-hidden py-[11px]"
      style={{ background: "linear-gradient(90deg,rgba(200,144,42,.03),rgba(200,144,42,.06) 50%,rgba(200,144,42,.03))" }}>
      <div className="absolute left-0 top-0 h-full w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right,#0c0a07,transparent)" }} />
      <div className="absolute right-0 top-0 h-full w-16 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left,#0c0a07,transparent)" }} />
      <div className="flex items-center w-max" style={{
        animation: `marquee ${MARQUEE_ITEMS.length * 38}s linear infinite`,
      }}>
        {items.map((label, i) => (
          <span key={i} className="inline-flex items-center flex-shrink-0">
            <span className="font-mono-gh text-[9px] tracking-[4px] text-gold/42 whitespace-nowrap">{label}</span>
            <span className="mx-5 inline-block w-[5px] h-[5px] bg-gold/45 flex-shrink-0"
              style={{ transform: "rotate(45deg)" }} />
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}

/* ══════════════════════════════════════
   HOME
══════════════════════════════════════ */
export default function Home() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="min-h-screen relative overflow-hidden">
        {/* Grid bg */}
        <div className="absolute inset-0 z-0"
          style={{
            backgroundImage: "linear-gradient(rgba(200,144,42,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(200,144,42,.04) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }} />

        {/* Glows */}
        <div className="absolute top-[-20%] left-[-5%] rounded-full pointer-events-none z-[1]"
          style={{ width: "min(800px,110vw)", height: "min(800px,110vw)", background: "radial-gradient(circle,rgba(200,144,42,.16) 0%,transparent 65%)" }} />
        <div className="absolute bottom-[-10%] right-[-5%] rounded-full pointer-events-none z-[1]"
          style={{ width: "min(500px,70vw)", height: "min(500px,70vw)", background: "radial-gradient(circle,rgba(140,94,18,.1) 0%,transparent 70%)" }} />

        {/* Ghost text */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-fraunces select-none pointer-events-none z-[1]"
          style={{ fontSize: "13vw", letterSpacing: ".15em", whiteSpace: "nowrap", color: "transparent", WebkitTextStroke: "1px rgba(200,144,42,.055)" }}>
          GOLDENHORDE
        </div>

        {/* 2-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen relative z-10">

          {/* LEFT */}
          <div className="flex flex-col justify-center px-[clamp(24px,5vw,72px)] pt-[clamp(80px,12vh,120px)] pb-[clamp(32px,5vh,56px)]">

            {/* Badge */}
            <LR delay={0.4}>
              <div className="inline-flex items-center gap-2.5 border border-gold/22 px-4 py-[7px] rounded-full mb-9 bg-gold/5 backdrop-blur-sm w-fit">
                <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-[7px] h-[7px] rounded-full bg-[#5DDB7F] shadow-[0_0_10px_#5DDB7F] inline-block" />
                <span className="font-mono-gh text-[9px] tracking-[3px] text-gold/85">ACCEPTING PROJECTS · 2025</span>
              </div>
            </LR>

            {/* Headline */}
            <div className="mb-5">
              <LR delay={0.55}>
                <div className="font-fraunces font-semibold leading-[.95] tracking-[-0.02em] text-cream"
                  style={{ fontSize: "clamp(36px,5.5vw,76px)" }}>Websites That</div>
              </LR>
              <LR delay={0.7}>
                <div className="text-shimmer font-fraunces font-light italic leading-[.95] tracking-[-0.01em]"
                  style={{ fontSize: "clamp(36px,5.5vw,76px)" }}>Win Clients.</div>
              </LR>
            </div>

            {/* Rule */}
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="h-px w-3/4 mb-6 origin-left"
              style={{ background: "linear-gradient(90deg,#C8902A,rgba(200,144,42,.08))" }} />

            {/* Description */}
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.25 }}
              className="text-cream/44 leading-[1.8] font-light max-w-[400px] mb-8"
              style={{ fontSize: "clamp(13px,1.4vw,15px)" }}>
              We craft high-performance websites for emerging businesses, creative professionals,
              and ambitious brands — designed to convert, built to last.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.4 }}
              className="flex gap-3 flex-wrap mb-9">
              <motion.div whileHover={{ scale: 1.03, boxShadow: "0 0 44px rgba(200,144,42,.35)" }} whileTap={{ scale: 0.97 }}>
                <Link to="/contact"
                  className="inline-flex items-center gap-2.5 text-ink px-7 py-3.5 rounded-[2px] font-mono-gh text-[10px] tracking-[3px] font-bold no-underline"
                  style={{ background: "linear-gradient(135deg,#C8902A,#E2AC46)" }}>
                  START YOUR PROJECT <ArrowIcon />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Link to="/work"
                  className="inline-flex items-center gap-2.5 border border-gold/22 text-cream/44 hover:text-gold-l px-7 py-3.5 rounded-[2px] font-mono-gh text-[10px] tracking-[3px] font-medium no-underline transition-all duration-300">
                  VIEW PORTFOLIO
                </Link>
              </motion.div>
            </motion.div>

            {/* Stars */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}
              className="flex items-center gap-2">
              <Stars count={5} size={12} />
              <span className="font-mono-gh text-[8px] tracking-[2.5px] text-gold/50">5.0 · 87+ PROJECTS DELIVERED</span>
            </motion.div>
          </div>

          {/* RIGHT: Globe */}
          <div className="relative hidden md:flex items-center justify-center" style={{ minHeight: "50vw" }}>
            <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.3, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full">
              <Globe />
            </motion.div>

            {/* Centre label */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.8 }}
              className="relative z-[2] text-center pointer-events-none">
              <div className="font-fraunces tracking-[6px] text-gold/90"
                style={{ fontSize: "clamp(26px,3.5vw,44px)", textShadow: "0 0 40px rgba(200,144,42,.45)" }}>GH</div>
              <div className="font-mono-gh text-[8px] tracking-[4px] text-gold/45 mt-1">STUDIO</div>
            </motion.div>

            {/* Pulse rings */}
            {[1, 1.6, 2.2].map((s, i) => (
              <motion.div key={i}
                animate={{ scale: [s, s + 0.35, s], opacity: [0.12, 0, 0.12] }}
                transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.9, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 rounded-full pointer-events-none z-[3]"
                style={{ transform: "translate(-50%,-50%)", width: "38%", height: "38%", border: `1px solid rgba(200,144,42,${0.28 - i * 0.07})` }} />
            ))}

            {/* Stat cards */}
            {[
              { label: "SATISFACTION", value: "100%", style: { top: "12%", left: "8%" } },
              { label: "DELIVERED",    value: "87+",  style: { bottom: "14%", right: "8%" } },
            ].map((pt, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 2 + i * 0.15 }}
                className="absolute hidden lg:block border border-gold/20 bg-ink/75 backdrop-blur-lg px-[18px] py-3 rounded-[2px] z-[5]"
                style={pt.style}>
                <div className="font-mono-gh text-[8px] tracking-[3px] text-gold/55 mb-1">{pt.label}</div>
                <div className="font-fraunces text-[28px] tracking-[1px] text-gold-l leading-none">{pt.value}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2 }}
          className="grid grid-cols-2 md:grid-cols-4 relative z-10 border-t border-gold/10">
          {STATS.map((st, i) => (
            <div key={i} className={`py-5 pl-[clamp(14px,3vw,36px)] ${i < 3 ? "border-r border-gold/10" : ""}`}>
              <div className="font-fraunces font-semibold text-gold-l leading-none mb-1.5"
                style={{ fontSize: "clamp(26px,3.2vw,46px)" }}>
                <Count to={st.v} suffix={st.s} />
              </div>
              <div className="font-mono-gh text-[8px] tracking-[3px] text-cream/44">{st.l.toUpperCase()}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Marquee ── */}
      <Marquee />
    </main>
  );
}