import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

/* ── Reusable Line Reveal ── */
function LR({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "105%" }}
        animate={inView ? { y: "0%" } : {}}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ── Fade In ── */
function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
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

/* ── Service Card ── */
function ServiceCard({ icon, title, description, tags, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative border border-gold/12 rounded-[2px] p-8 overflow-hidden cursor-pointer"
      style={{
        background: hovered
          ? "linear-gradient(135deg,rgba(200,144,42,.09),rgba(200,144,42,.03))"
          : "rgba(255,255,255,0.02)",
        transition: "background 0.4s ease",
      }}
    >
      <div className="absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-gold/60 to-transparent" />
      <div className="absolute top-0 left-0 w-px h-12 bg-gradient-to-b from-gold/60 to-transparent" />
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-0 right-0 rounded-full pointer-events-none"
        style={{
          width: "200px", height: "200px",
          background: "radial-gradient(circle,rgba(200,144,42,.12) 0%,transparent 70%)",
          transform: "translate(40%,40%)",
        }}
      />
      <div className="mb-6 w-12 h-12 border border-gold/20 rounded-[2px] flex items-center justify-center bg-gold/5">
        {icon}
      </div>
      <div className="font-fraunces text-cream text-[22px] font-semibold mb-3 leading-snug">{title}</div>
      <p className="text-cream/44 font-light leading-[1.8] mb-6 text-[14px]">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span key={i} className="font-mono-gh text-[8px] tracking-[2.5px] text-gold/55 border border-gold/15 px-3 py-1 rounded-full bg-gold/5">
            {tag}
          </span>
        ))}
      </div>
      <motion.div
        animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.4 }}
        transition={{ duration: 0.3 }}
        className="mt-6 inline-flex items-center gap-2 text-gold font-mono-gh text-[9px] tracking-[2px]"
      >
        LEARN MORE <ArrowIcon />
      </motion.div>
    </motion.div>
  );
}

/* ── Image Slider ── */
function ImageSlider({ images, title }) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent(c => (c + 1) % images.length);
    }, 3500);
    return () => clearInterval(t);
  }, [images.length]);

  const goTo = (i) => {
    if (!isAnimating && i !== current) {
      setIsAnimating(true);
      setCurrent(i);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-[2px]">
      {images.map((img, i) => (
        <motion.img
          key={i}
          src={img}
          alt={`${title} ${i + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={i === current ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className="w-[5px] h-[5px] rounded-full transition-all duration-300"
            style={{ background: i === current ? "#C8902A" : "rgba(200,144,42,0.3)" }}
          />
        ))}
      </div>
    </div>
  );
}

const SHOWCASES = [
  {
    category: "React Portfolio",
    headline: "Portfolio & Personal Brands",
    sub: "Lightning-fast React sites built for creators, freelancers, and studios who demand a standout digital identity.",
    images: [
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    ],
    align: "left",
  },
  {
    category: "WordPress Business",
    headline: "Business Websites",
    sub: "CMS-powered business sites that are easy to manage, SEO-ready, and crafted to convert visitors into customers.",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    ],
    align: "right",
  },
  {
    category: "E-Commerce",
    headline: "Online Stores",
    sub: "Full-featured e-commerce experiences — from product discovery to checkout — engineered for growth and built to scale.",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80",
    ],
    align: "left",
  },
];

const PROCESS = [
  { n: "01", title: "Discovery", desc: "We deep-dive into your brand, audience, and goals before a single pixel is placed." },
  { n: "02", title: "Design", desc: "Custom wireframes and high-fidelity designs crafted around your unique identity." },
  { n: "03", title: "Build", desc: "Clean, performant code — React or WordPress — built for speed and scalability." },
  { n: "04", title: "Launch", desc: "Rigorous QA, seamless deployment, and post-launch support to ensure success." },
];

/* ── Hero Slider images — dark moody tech/studio theme ── */
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=90", // abstract dark purple/gold
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&q=90", // dark tech screens
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1600&q=90", // coding dark
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&q=90", // dark code editor
];

function HeroSlider({ heroRef, heroOpacity, heroY }) {
  const [current, setCurrent] = useState(0);
  const total = HERO_IMAGES.length;

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent(c => (c + 1) % total);
    }, 4000);
    return () => clearInterval(t);
  }, [total]);

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ height: "100svh", minHeight: "500px" }}
    >
      {/* Sliding background images */}
      {HERO_IMAGES.map((img, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{
            opacity: i === current ? 1 : 0,
            scale: i === current ? 1 : 1.05,
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0c0a07]/65" style={{ zIndex: 1 }} />

      {/* Gold vignette edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(12,10,7,0.7) 100%)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          backgroundImage:
            "linear-gradient(rgba(200,144,42,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(200,144,42,.04) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ zIndex: 3, background: "linear-gradient(to bottom,transparent,#0c0a07)" }}
      />

      {/* Slide indicators — bottom center */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3" style={{ zIndex: 5 }}>
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? "28px" : "6px",
              height: "6px",
              borderRadius: "3px",
              background: i === current ? "#C8902A" : "rgba(200,144,42,0.3)",
              transition: "all 0.4s ease",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Hero content */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY, zIndex: 4 }}
        className="relative text-center px-6 max-w-4xl mx-auto w-full"
      >
        <LR delay={0.3}>
          <h1
            className="font-fraunces font-semibold text-cream leading-[.92] tracking-[-0.02em] mb-4"
            style={{ fontSize: "clamp(36px,6vw,96px)" }}
          >
            We Build Digital
          </h1>
        </LR>
        <LR delay={0.45}>
          <h1
            className="font-fraunces font-light italic text-shimmer leading-[.92] tracking-[-0.01em]"
            style={{ fontSize: "clamp(36px,6vw,96px)" }}
          >
            Experiences.
          </h1>
        </LR>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-cream/50 leading-[1.8] font-light mt-6 max-w-[560px] mx-auto"
          style={{ fontSize: "clamp(13px,1.4vw,16px)" }}
        >
          GoldenHorde is a boutique web studio specialising in high-performance websites
          for businesses, creatives, and brands who refuse to blend in.
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="h-px w-32 mx-auto mt-8 origin-center"
          style={{ background: "linear-gradient(90deg,transparent,#C8902A,transparent)" }}
        />
      </motion.div>
    </section>
  );
}

export default function About() {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, 80]);

  const SERVICES = [
    {
      icon: (
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#C8902A" strokeWidth="1.5" strokeLinecap="round">
          <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
        </svg>
      ),
      title: "React Portfolio Sites",
      description: "We build blazing-fast, component-driven portfolio websites using React. Every interaction feels alive — from page transitions to micro-animations — giving creative professionals a digital home that matches their ambition.",
      tags: ["React", "Framer Motion", "Tailwind CSS", "Custom Animations", "Performance"],
    },
    {
      icon: (
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#C8902A" strokeWidth="1.5" strokeLinecap="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
      title: "WordPress Business Sites",
      description: "Robust, CMS-powered websites built for businesses that need flexibility and control. We design custom WordPress themes that are SEO-optimised, mobile-first, and fully manageable by your team.",
      tags: ["WordPress", "Custom Themes", "SEO", "WooCommerce", "Page Speed"],
    },
    {
      icon: (
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="#C8902A" strokeWidth="1.5" strokeLinecap="round">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
        </svg>
      ),
      title: "E-Commerce Stores",
      description: "End-to-end online stores designed to sell. We craft the full journey — from product pages that convert to checkouts that don't leak. Scalable, secure, and optimised for revenue from day one.",
      tags: ["Shopify", "WooCommerce", "Payment Integration", "Product UI", "Conversion CRO"],
    },
  ];

  return (
    <main className="bg-[#0c0a07] min-h-screen">

      {/* ══ HERO SECTION ══ */}
      <HeroSlider heroRef={heroRef} heroOpacity={heroOpacity} heroY={heroY} />

      {/* ══ ABOUT INTRO ══ */}
      <section className="relative py-24 px-[clamp(20px,6vw,80px)] max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <LR delay={0}>
              <span className="font-mono-gh text-[9px] tracking-[4px] text-gold/60">WHO WE ARE</span>
            </LR>
            <div className="mt-5">
              <LR delay={0.1}>
                <h2
                  className="font-fraunces font-semibold text-cream leading-[.95]"
                  style={{ fontSize: "clamp(32px,4.5vw,58px)" }}
                >
                  Craftsmen of the
                </h2>
              </LR>
              <LR delay={0.22}>
                <h2
                  className="font-fraunces font-light italic text-shimmer leading-[.95]"
                  style={{ fontSize: "clamp(32px,4.5vw,58px)" }}
                >
                  Digital Frontier.
                </h2>
              </LR>
            </div>
          </div>
          <FadeIn delay={0.2}>
            <div className="space-y-5 lg:pt-[26px]">
              <p className="text-cream/50 leading-[1.9] text-[15px] font-light">
                We're a focused team of designers and developers obsessed with one thing:
                building websites that actually work — for your business, your brand, and your bottom line.
              </p>
              <p className="text-cream/50 leading-[1.9] text-[15px] font-light">
                From React-powered portfolios with silky animations to scalable WordPress solutions
                and full-stack e-commerce stores — every project leaves our studio built to perform
                and designed to impress.
              </p>
              <div className="flex items-center gap-4 pt-3">
                <div className="h-px flex-1 bg-gold/10" />
                <span className="font-mono-gh text-[8px] tracking-[3px] text-gold/40">EST. 2020</span>
                <div className="h-px flex-1 bg-gold/10" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ SERVICES GRID ══ */}
      <section className="py-20 px-[clamp(20px,6vw,80px)] max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <LR>
              <span className="font-mono-gh text-[9px] tracking-[4px] text-gold/60">OUR SERVICES</span>
            </LR>
            <div className="mt-4">
              <LR delay={0.1}>
                <h2 className="font-fraunces font-semibold text-cream leading-[.95]"
                  style={{ fontSize: "clamp(28px,4vw,52px)" }}>What We Build,</h2>
              </LR>
              <LR delay={0.2}>
                <h2 className="font-fraunces font-light italic text-shimmer leading-[.95]"
                  style={{ fontSize: "clamp(28px,4vw,52px)" }}>and How We Build It.</h2>
              </LR>
            </div>
          </div>
          <FadeIn delay={0.25}>
            <p className="text-cream/40 text-[13px] font-light max-w-xs leading-relaxed">
              Three core services. One standard — exceptional.
            </p>
          </FadeIn>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <ServiceCard key={i} {...s} index={i} />
          ))}
        </div>
      </section>

      {/* ══ WORK SHOWCASES ══
      <section className="py-24 px-[clamp(20px,6vw,80px)] max-w-7xl mx-auto space-y-32">
        <div className="text-center mb-[-16px]">
          <LR>
            <span className="font-mono-gh text-[9px] tracking-[4px] text-gold/60">OUR WORK IN ACTION</span>
          </LR>
          <div className="mt-4">
            <LR delay={0.1}>
              <h2 className="font-fraunces font-semibold text-cream leading-[.95]"
                style={{ fontSize: "clamp(28px,4vw,52px)" }}>
                Projects That{" "}
                <span className="font-light italic text-shimmer">Speak for Themselves.</span>
              </h2>
            </LR>
          </div>
        </div>
        {SHOWCASES.map((showcase, i) => {
          const isRight = showcase.align === "right";
          return (
            <div key={i}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isRight ? "lg:flex-row-reverse" : ""}`}
            >
              <FadeIn delay={0.1} className={`h-[360px] md:h-[440px] relative ${isRight ? "lg:order-2" : ""}`}>
                <div className="absolute inset-0 border border-gold/12 rounded-[2px] overflow-hidden">
                  <ImageSlider images={showcase.images} title={showcase.category} />
                </div>
                <div className="absolute -top-4 -left-4 z-10 w-10 h-10 border border-gold/20 bg-[#0c0a07] flex items-center justify-center">
                  <span className="font-fraunces text-gold text-[18px]">{String(i + 1).padStart(2, "0")}</span>
                </div>
              </FadeIn>
              <div className={isRight ? "lg:order-1" : ""}>
                <FadeIn delay={0}>
                  <span className="font-mono-gh text-[8px] tracking-[4px] text-gold/55 border border-gold/15 px-3 py-1 rounded-full bg-gold/5">
                    {showcase.category.toUpperCase()}
                  </span>
                </FadeIn>
                <div className="mt-5">
                  <LR delay={0.1}>
                    <h3 className="font-fraunces font-semibold text-cream leading-tight"
                      style={{ fontSize: "clamp(24px,3.5vw,44px)" }}>
                      {showcase.headline}
                    </h3>
                  </LR>
                </div>
                <FadeIn delay={0.2}>
                  <p className="text-cream/44 leading-[1.85] font-light mt-5 text-[15px]">{showcase.sub}</p>
                </FadeIn>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="h-px w-24 mt-6 origin-left"
                  style={{ background: "linear-gradient(90deg,#C8902A,transparent)" }}
                />
              </div>
            </div>
          );
        })} */}
      {/* </section> */}

      {/* ══ PROCESS ══ */}
      <section className="py-24 px-[clamp(20px,6vw,80px)]"
        style={{ background: "linear-gradient(180deg,transparent,rgba(200,144,42,.04) 50%,transparent)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <LR>
              <span className="font-mono-gh text-[9px] tracking-[4px] text-gold/60">HOW WE WORK</span>
            </LR>
            <div className="mt-4">
              <LR delay={0.12}>
                <h2 className="font-fraunces font-semibold text-cream"
                  style={{ fontSize: "clamp(28px,4vw,52px)" }}>
                  The Process Behind{" "}
                  <span className="font-light italic text-shimmer">Great Websites.</span>
                </h2>
              </LR>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((step, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="relative p-7 border border-gold/10 rounded-[2px] group hover:border-gold/25 transition-colors duration-400"
                  style={{ background: "rgba(255,255,255,0.015)" }}>
                  <div className="font-fraunces text-[52px] leading-none text-gold/8 select-none mb-4 tracking-tight">
                    {step.n}
                  </div>
                  {i < PROCESS.length - 1 && (
                    <div className="hidden lg:block absolute top-[52px] -right-3 w-6 h-px z-10"
                      style={{ background: "linear-gradient(to right,rgba(200,144,42,.4),transparent)" }} />
                  )}
                  <div className="font-fraunces text-cream text-[18px] font-semibold mb-3">{step.title}</div>
                  <p className="text-cream/38 text-[13px] font-light leading-relaxed">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ══ */}
      <section className="py-28 px-[clamp(20px,6vw,80px)]">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <div className="relative border border-gold/15 rounded-[2px] p-12 md:p-16 overflow-hidden"
              style={{ background: "linear-gradient(135deg,rgba(200,144,42,.07),rgba(200,144,42,.02))" }}>
              {[
                "top-0 left-0 w-16 h-px",
                "top-0 left-0 w-px h-16",
                "bottom-0 right-0 w-16 h-px",
                "bottom-0 right-0 w-px h-16",
              ].map((cls, i) => (
                <div key={i} className={`absolute ${cls} bg-gold/40`} />
              ))}
              <LR>
                <span className="font-mono-gh text-[9px] tracking-[4px] text-gold/60">READY TO START?</span>
              </LR>
              <div className="mt-5 mb-6">
                <LR delay={0.12}>
                  <h2 className="font-fraunces font-semibold text-cream leading-[.93]"
                    style={{ fontSize: "clamp(28px,4.5vw,52px)" }}>
                    Let's Build Something
                  </h2>
                </LR>
                <LR delay={0.24}>
                  <h2 className="font-fraunces font-light italic text-shimmer leading-[.93]"
                    style={{ fontSize: "clamp(28px,4.5vw,52px)" }}>
                    Worth Remembering.
                  </h2>
                </LR>
              </div>
              <FadeIn delay={0.3}>
                <p className="text-cream/40 font-light text-[14px] leading-relaxed mb-9 max-w-sm mx-auto">
                  Every great website starts with a conversation. Tell us about your project and we'll get back within 24 hours.
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(200,144,42,.4)" }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 text-ink px-8 py-4 rounded-[2px] font-mono-gh text-[10px] tracking-[3px] font-bold no-underline"
                  style={{ background: "linear-gradient(135deg,#C8902A,#E2AC46)" }}
                >
                  START YOUR PROJECT <ArrowIcon />
                </motion.a>
              </FadeIn>
            </div>
          </FadeIn>
        </div>
      </section>

    </main>
  );
}
