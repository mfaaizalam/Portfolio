// import { useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion, useInView } from "framer-motion";
// import { LR, Stars, ArrowIcon, SH } from "../components/UI";

// const SERVICES = [
//   {
//     num: "01",
//     title: "Portfolio Websites",
//     desc: "We specialise in two things — portfolio websites and business websites — and we do them exceptionally well. If you're a creative who needs their work to speak for itself, we build exactly that. Clean, fast, and crafted with intent.",
//     tags: ["PERSONAL BRAND", "CREATIVE", "GALLERY"],
//   },
//   {
//     num: "02",
//     title: "Business Websites",
//     desc: "No bloated agency offering, no jack-of-all-trades approach. If you're a business that needs your website to generate real leads, we build exactly that. High-converting, polished, and built to last.",
//     tags: ["LEAD GEN", "BRAND", "CONVERSION"],
//   },
// ];

// const STATS = [
//   { label: "FOUNDED",   value: "2021" },
//   { label: "PROJECTS",  value: "87+"  },
//   { label: "COUNTRIES", value: "12+"  },
//   { label: "RATING",    value: "5.0★" },
// ];

// const STEPS = [
//   { n: "1", label: "DISCOVERY", text: "We learn your goals, audience, and brand inside-out before writing a single line of code." },
//   { n: "2", label: "DESIGN",    text: "Custom layouts crafted in Figma — responsive, refined, and ready for your approval." },
//   { n: "3", label: "BUILD",     text: "Production-grade code built for speed, SEO, and long-term maintainability." },
//   { n: "4", label: "LAUNCH",    text: "We handle deployment, final QA, and stay available post-launch so you're never on your own." },
// ];

// /* ── Video Hero ── */
// function VideoHero() {
//   const videoRef = useRef(null);
//   const [playing, setPlaying] = useState(true);
//   const [muted, setMuted]     = useState(true);

//   const togglePlay = () => {
//     const v = videoRef.current;
//     if (!v) return;
//     if (v.paused) { v.play(); setPlaying(true); }
//     else          { v.pause(); setPlaying(false); }
//   };

//   const toggleMute = () => {
//     const v = videoRef.current;
//     if (!v) return;
//     v.muted = !v.muted;
//     setMuted(v.muted);
//   };

//   return (
//     <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
//       {/* Video */}
//       <video
//         ref={videoRef}
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute inset-0 w-full h-full object-cover z-0"
//         src="https://www.w3schools.com/html/mov_bbb.mp4" // ← replace with your video
//       />

//       {/* Overlays */}
//       <div className="absolute inset-0 z-[1]"
//         style={{ background: "linear-gradient(to bottom,rgba(10,8,4,.78) 0%,rgba(10,8,4,.52) 50%,rgba(10,8,4,.92) 100%)" }}
//       />
//       <div className="absolute inset-0 z-[2] pointer-events-none"
//         style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%,rgba(200,144,42,.13) 0%,transparent 70%)" }}
//       />
//       <div className="grid-bg absolute inset-0 z-[2] opacity-30" />

//       {/* Ghost text */}
//       <div
//         className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-fraunces select-none pointer-events-none z-[3]"
//         style={{ fontSize: "13vw", letterSpacing: ".15em", whiteSpace: "nowrap", color: "transparent", WebkitTextStroke: "1px rgba(200,144,42,.045)" }}
//       >
//         GOLDENHORDE
//       </div>

//       {/* Content */}
//       <div className="relative z-[10] text-center px-[5vw] max-w-[820px] mx-auto">
//         <LR delay={0.3}>
//           <div className="inline-flex items-center gap-2.5 border border-gold/22 px-4 py-[7px] rounded-full mb-8 bg-gold/5 backdrop-blur-sm w-fit mx-auto">
//             <span className="font-mono-gh text-[9px] tracking-[3px] text-gold/85">ABOUT GOLDENHORDE</span>
//           </div>
//         </LR>

//         <LR delay={0.5}>
//           <h1 className="font-fraunces font-semibold leading-[.92] tracking-[-0.02em] text-cream mb-3"
//             style={{ fontSize: "clamp(40px,7vw,96px)" }}>
//             We Build
//           </h1>
//         </LR>
//         <LR delay={0.65}>
//           <h1 className="text-shimmer font-fraunces font-light italic leading-[.92] tracking-[-0.01em] mb-7"
//             style={{ fontSize: "clamp(40px,7vw,96px)" }}>
//             Digital Presence.
//           </h1>
//         </LR>

//         <motion.div
//           initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
//           transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
//           className="h-px w-1/2 mx-auto mb-7 origin-center"
//           style={{ background: "linear-gradient(90deg,transparent,#C8902A,transparent)" }}
//         />

//         <motion.p
//           initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 1.15 }}
//           className="text-cream/44 leading-[1.9] font-light max-w-[520px] mx-auto mb-10"
//           style={{ fontSize: "clamp(13px,1.4vw,15px)" }}
//         >
//           GoldenHorde is a boutique web studio specialising in portfolio and business websites —
//           crafted with intent, launched with precision, and built to convert.
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 1.35 }}
//           className="flex gap-3 flex-wrap justify-center"
//         >
//           <motion.div whileHover={{ scale: 1.03, boxShadow: "0 0 44px rgba(200,144,42,.35)" }} whileTap={{ scale: 0.97 }}>
//             <Link
//               to="/contact"
//               className="inline-flex items-center gap-2.5 text-ink px-7 py-3.5 rounded-[2px] font-mono-gh text-[10px] tracking-[3px] font-bold no-underline"
//               style={{ background: "linear-gradient(135deg,#C8902A,#E2AC46)" }}
//             >
//               START YOUR PROJECT <ArrowIcon />
//             </Link>
//           </motion.div>
//           <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
//             <Link
//               to="/services"
//               className="inline-flex items-center gap-2.5 border border-gold/22 text-cream/44 hover:text-gold-l px-7 py-3.5 rounded-[2px] font-mono-gh text-[10px] tracking-[3px] font-medium no-underline transition-all duration-300"
//             >
//               OUR SERVICES
//             </Link>
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* Video controls */}
//       <motion.div
//         initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
//         className="absolute bottom-8 right-[5vw] z-[10] flex gap-2"
//       >
//         <button
//           onClick={togglePlay}
//           className="border border-gold/20 bg-ink/50 backdrop-blur-md text-cream/70 hover:text-gold-l px-4 py-2 rounded-[2px] font-mono-gh text-[8px] tracking-[2.5px] cursor-pointer transition-colors duration-200"
//         >
//           {playing ? "❙❙ PAUSE" : "▶ PLAY"}
//         </button>
//         <button
//           onClick={toggleMute}
//           className="border border-gold/20 bg-ink/50 backdrop-blur-md text-cream/70 hover:text-gold-l px-4 py-2 rounded-[2px] font-mono-gh text-[8px] tracking-[2.5px] cursor-pointer transition-colors duration-200"
//         >
//           {muted ? "🔇 SOUND" : "🔊 MUTE"}
//         </button>
//       </motion.div>

//       {/* Scroll cue */}
//       <motion.div
//         initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[10] flex flex-col items-center gap-2"
//       >
//         <span className="font-mono-gh text-[7px] tracking-[3px] text-gold/40">SCROLL</span>
//         <motion.div
//           animate={{ y: [0, 6, 0] }}
//           transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
//           className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent"
//         />
//       </motion.div>
//     </section>
//   );
// }

// /* ── Stat Bar ── */
// function StatBar() {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true });

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.7 }}
//       className="grid grid-cols-2 md:grid-cols-4 border-b border-gold/10"
//     >
//       {STATS.map((s, i) => (
//         <div key={i} className="py-6 pl-[clamp(14px,3vw,36px)] border-r border-gold/10 last:border-r-0">
//           <div className="font-fraunces font-semibold text-gold-l leading-none mb-1.5"
//             style={{ fontSize: "clamp(26px,3.2vw,46px)" }}>
//             {s.value}
//           </div>
//           <div className="font-mono-gh text-[8px] tracking-[3px] text-cream/44">{s.label}</div>
//         </div>
//       ))}
//     </motion.div>
//   );
// }

// /* ── Why Choose Us ── */
// function WhyUs() {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-60px" });

//   return (
//     <section ref={ref} className="px-[5vw] py-[clamp(60px,10vh,120px)] relative overflow-hidden border-t border-gold/10">
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
//         style={{ width: "min(600px,80vw)", height: "min(600px,80vw)", background: "radial-gradient(circle,rgba(200,144,42,.07) 0%,transparent 65%)" }}
//       />

//       <div className="max-w-[900px] mx-auto relative z-10">
//         <SH
//           tag="WHY GOLDENHORDE"
//           h1="Your digital presence should"
//           italic="work as hard as you do."
//           center
//         />

//         <motion.p
//           initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.7, delay: 0.2 }}
//           className="text-cream/44 leading-[1.9] font-light text-center max-w-[620px] mx-auto"
//           style={{ fontSize: "clamp(13px,1.4vw,15.5px)" }}
//         >
//           We don't do templates, retainers, or rushed handoffs. Every site we build is designed
//           from scratch around your goals — because a website that looks like everyone else's converts
//           like everyone else's. We're a small studio, and that's the point. When you work with
//           GoldenHorde, you get real attention, not a ticket number.
//         </motion.p>
//       </div>
//     </section>
//   );
// }

// /* ── Service Card ── */
// function ServiceCard({ num, title, desc, tags, delay = 0 }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-60px" });

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.7, delay }}
//       className="relative border border-gold/12 rounded-[2px] p-8 md:p-10 bg-gold/[.02] hover:bg-gold/[.045] hover:border-gold/25 transition-all duration-500 group overflow-hidden"
//     >
//       {/* Ghost number */}
//       <div
//         className="absolute top-4 right-6 font-fraunces text-[80px] leading-none pointer-events-none select-none"
//         style={{ color: "transparent", WebkitTextStroke: "1px rgba(200,144,42,.07)" }}
//       >
//         {num}
//       </div>

//       <div className="font-mono-gh text-[9px] tracking-[3px] text-gold/50 mb-5">{num}</div>

//       <h3 className="font-fraunces font-semibold text-cream mb-4 leading-tight"
//         style={{ fontSize: "clamp(22px,2.5vw,32px)" }}>
//         {title}
//       </h3>

//       <motion.div
//         initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
//         transition={{ duration: 0.8, delay: delay + 0.3 }}
//         className="h-px mb-5 origin-left"
//         style={{ background: "linear-gradient(90deg,#C8902A,rgba(200,144,42,.06))" }}
//       />

//       <p className="text-cream/44 leading-[1.8] font-light mb-6"
//         style={{ fontSize: "clamp(13px,1.2vw,14.5px)" }}>
//         {desc}
//       </p>

//       <div className="flex flex-wrap gap-2">
//         {tags.map((t) => (
//           <span key={t} className="font-mono-gh text-[7px] tracking-[2.5px] border border-gold/18 text-gold/55 px-3 py-1.5 rounded-full">
//             {t}
//           </span>
//         ))}
//       </div>

//       {/* Bottom hover line */}
//       <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700"
//         style={{ background: "linear-gradient(90deg,#C8902A,#E2AC46)" }}
//       />
//     </motion.div>
//   );
// }

// /* ── Our Work blurb ── */
// function WorkBlurb() {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-60px" });

//   return (
//     <section ref={ref} className="px-[5vw] py-[clamp(48px,8vh,96px)] border-t border-gold/10">
//       <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
//         {/* Left */}
//         <motion.div
//           initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
//           transition={{ duration: 0.7 }}
//         >
//           <div className="flex items-center gap-2.5 mb-4">
//             <div className="w-5 h-px bg-gold" />
//             <span className="font-mono-gh text-[9px] tracking-[4px] text-gold/65">OUR WORK</span>
//           </div>
//           <h2 className="font-fraunces font-semibold text-cream leading-[1.05] mb-5"
//             style={{ fontSize: "clamp(28px,3.8vw,52px)" }}>
//             Real projects.{" "}
//             <span className="text-shimmer font-light italic">Real results.</span>
//           </h2>
//           <motion.div
//             initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
//             transition={{ duration: 0.9, delay: 0.3 }}
//             className="h-px w-3/4 mb-6 origin-left"
//             style={{ background: "linear-gradient(90deg,#C8902A,rgba(200,144,42,.08))" }}
//           />
//           <p className="text-cream/44 leading-[1.85] font-light mb-8"
//             style={{ fontSize: "clamp(13px,1.3vw,15px)" }}>
//             Every project in our portfolio started with a conversation and ended with a client who
//             had something they were genuinely proud of. We don't pad our work with filler projects —
//             what you see is what we've actually shipped, for real people and real businesses.
//             Browse it, steal inspiration, then let's talk about what we can build for you.
//           </p>
//           <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
//             <Link
//               to="/work"
//               className="inline-flex items-center gap-2.5 border border-gold/22 text-cream/44 hover:text-gold-l px-7 py-3.5 rounded-[2px] font-mono-gh text-[10px] tracking-[3px] font-medium no-underline transition-all duration-300"
//             >
//               VIEW PORTFOLIO <ArrowIcon />
//             </Link>
//           </motion.div>
//         </motion.div>

//         {/* Right — decorative stat cards */}
//         <motion.div
//           initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
//           transition={{ duration: 0.7, delay: 0.15 }}
//           className="hidden md:grid grid-cols-2 gap-4"
//         >
//           {[
//             { label: "CLIENT SATISFACTION", value: "100%" },
//             { label: "PROJECTS DELIVERED",  value: "87+"  },
//             { label: "YEARS EXPERIENCE",    value: "4+"   },
//             { label: "COUNTRIES SERVED",    value: "12+"  },
//           ].map((pt, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
//               className="border border-gold/14 bg-gold/[.025] backdrop-blur-sm px-5 py-6 rounded-[2px] hover:border-gold/28 hover:bg-gold/[.05] transition-all duration-400"
//             >
//               <div className="font-mono-gh text-[7px] tracking-[3px] text-gold/50 mb-2">{pt.label}</div>
//               <div className="font-fraunces text-[32px] tracking-[1px] text-gold-l leading-none">{pt.value}</div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// /* ── Process Strip ── */
// function ProcessStrip() {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-60px" });

//   return (
//     <section ref={ref} className="px-[5vw] py-[clamp(48px,8vh,96px)] border-t border-gold/10">
//       <SH tag="HOW WE WORK" h1="From conversation" italic="to launch." center />

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto">
//         {STEPS.map((s, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.6, delay: i * 0.12 }}
//             className="relative pl-5 border-l border-gold/18 group"
//           >
//             <div className="font-fraunces text-[36px] text-gold/12 leading-none mb-2 select-none">{s.n}</div>
//             <div className="font-mono-gh text-[8px] tracking-[3px] text-gold-l mb-3">{s.label}</div>
//             <p className="text-cream/40 text-[13px] leading-[1.75] font-light">{s.text}</p>
//             <div className="absolute top-0 left-[-1px] w-px h-0 group-hover:h-full transition-all duration-700 origin-top"
//               style={{ background: "linear-gradient(180deg,#C8902A,transparent)" }}
//             />
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }

// /* ── CTA Banner ── */
// function CTABanner() {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-60px" });

//   return (
//     <section ref={ref} className="px-[5vw] py-[clamp(60px,10vh,120px)] relative overflow-hidden border-t border-gold/10">
//       <div className="absolute inset-0 pointer-events-none"
//         style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%,rgba(200,144,42,.09) 0%,transparent 70%)" }}
//       />
//       <div className="grid-bg absolute inset-0 opacity-20" />

//       <motion.div
//         initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.7 }}
//         className="relative z-10 text-center max-w-[700px] mx-auto"
//       >
//         <div className="inline-flex items-center gap-2.5 border border-gold/22 px-4 py-[7px] rounded-full mb-8 bg-gold/5 backdrop-blur-sm">
//           <motion.span
//             animate={{ opacity: [1, 0.2, 1] }}
//             transition={{ duration: 1.5, repeat: Infinity }}
//             className="w-[7px] h-[7px] rounded-full bg-[#5DDB7F] shadow-[0_0_10px_#5DDB7F] inline-block"
//           />
//           <span className="font-mono-gh text-[9px] tracking-[3px] text-gold/85">TAKING ON NEW CLIENTS</span>
//         </div>

//         <h2 className="font-fraunces font-semibold leading-[1] tracking-[-0.02em] text-cream mb-5"
//           style={{ fontSize: "clamp(30px,5vw,68px)" }}>
//           Ready to get{" "}
//           <span className="text-shimmer font-light italic">started?</span>
//         </h2>

//         <p className="text-cream/44 leading-[1.85] font-light mb-8 max-w-[440px] mx-auto"
//           style={{ fontSize: "clamp(13px,1.3vw,15px)" }}>
//           Tell us about your project and we'll get back to you within 24 hours with a plan.
//         </p>

//         <div className="flex gap-3 flex-wrap justify-center items-center">
//           <Stars count={5} size={12} />
//           <motion.div whileHover={{ scale: 1.03, boxShadow: "0 0 44px rgba(200,144,42,.35)" }} whileTap={{ scale: 0.97 }}>
//             <Link
//               to="/contact"
//               className="inline-flex items-center gap-2.5 text-ink px-8 py-4 rounded-[2px] font-mono-gh text-[10px] tracking-[3px] font-bold no-underline"
//               style={{ background: "linear-gradient(135deg,#C8902A,#E2AC46)" }}
//             >
//               START YOUR PROJECT <ArrowIcon />
//             </Link>
//           </motion.div>
//         </div>
//       </motion.div>
//     </section>
//   );
// }

// /* ── Page ── */
// export default function About() {
//   return (
//     <main>
//       <VideoHero />
//       <StatBar />
//       <WhyUs />

//       {/* Services */}
//       <section className="px-[5vw] py-[clamp(48px,8vh,96px)] border-t border-gold/10">
//         <SH tag="WHAT WE OFFER" h1="Two things." italic="Done exceptionally." center />
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[1100px] mx-auto">
//           {SERVICES.map((s, i) => (
//             <ServiceCard key={i} {...s} delay={i * 0.15} />
//           ))}
//         </div>
//       </section>

//       <WorkBlurb />
//       <ProcessStrip />
//       <CTABanner />
//     </main>
//   );
// }