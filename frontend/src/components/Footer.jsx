import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ── Reusable Line Reveal (matching About.jsx) ── */
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

/* ── FadeIn (matching About.jsx) ── */
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

/* ── Arrow Icon ── */
function ArrowIcon() {
  return (
    <svg width={11} height={11} viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Logo Mark ── */
function LogoMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <polygon points="18,2 34,32 2,32" fill="none" stroke="#C8902A" strokeWidth="1.5" />
      <polygon points="18,11 28,32 8,32" fill="rgba(200,144,42,.12)" />
      <circle cx="18" cy="18" r="2.5" fill="#C8902A" />
    </svg>
  );
}

/* ── Social Icons ── */
const FacebookIcon = () => (
  <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.118 1.523 5.851L.057 23.7a.75.75 0 0 0 .917.943l6.063-1.476A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.697-.5-5.25-1.377l-.374-.213-3.875.943.96-3.77-.23-.388A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const SOCIALS = [
  { label: "Facebook",  icon: <FacebookIcon />,  href: "#" },
  { label: "WhatsApp",  icon: <WhatsAppIcon />,  href: "#" },
  { label: "Twitter",   icon: <TwitterIcon />,   href: "#" },
  { label: "Instagram", icon: <InstagramIcon />, href: "#" },
];

const SERVICES = [
  {
    label: "MERN Portfolio",
    desc: "Full-stack React & Node apps",
    href: "#",
  },
  {
    label: "WordPress Portfolio",
    desc: "Custom themes & plugins",
    href: "#",
  },
  {
    label: "eCommerce Stores",
    desc: "Scalable stores built to sell",
    href: "#",
  },
];

const SUPPORT = [
  { label: "Documentation", href: "#" },
  { label: "FAQ",           href: "#" },
  { label: "Contact Us",    href: "#" },
  { label: "Status",        href: "#" },
];

const ABOUT = [
  { label: "Our Story",  href: "#" },
  { label: "Team",       href: "#" },
  { label: "Careers",    href: "#" },
  { label: "Blog",       href: "#" },
];

/* ── Column Link List ── */
function LinkList({ items }) {
  return (
    <ul className="space-y-3 mt-0">
      {items.map(({ label, href }, i) => (
        <li key={i}>
          <motion.a
            href={href}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
            className="group inline-flex items-center gap-2 no-underline"
          >
            {/* ↑ arrow size bumped */}
            <span className="text-gold/30 group-hover:text-gold transition-colors duration-200 text-[13px]">›</span>
            {/* ↑ text-[9px] → text-[12px], tracking tighter */}
            <span className="font-mono-gh text-[12px] tracking-[1.5px] text-cream/35 group-hover:text-cream/70 transition-colors duration-200">
              {label.toUpperCase()}
            </span>
          </motion.a>
        </li>
      ))}
    </ul>
  );
}

/* ══════════════════════════════════════
   FOOTER
══════════════════════════════════════ */
export default function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState(null);

  return (
    <footer className="relative bg-[#0c0a07] border-t border-gold/10 overflow-hidden">

      {/* Top gold glow line */}
      <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg,transparent 5%,rgba(200,144,42,.35) 50%,transparent 95%)" }} />

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(200,144,42,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(200,144,42,.02) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

      {/* ── Main grid ── */}
      <div className="relative z-10 px-[clamp(20px,6vw,80px)] pt-16 pb-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* ── Brand column ── */}
          <FadeIn delay={0} className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <LogoMark size={28} />
              {/* ↑ text-[13px] → text-[16px] */}
              <span className="font-fraunces font-bold tracking-[3px] text-cream/80 text-[16px]">
                GOLDENHORDE
              </span>
            </div>

            {/* Tagline — text-[13px] → text-[15px] */}
            <p className="text-cream/35 font-light leading-[1.85] text-[15px] mb-7 max-w-[260px]">
              Boutique web studio crafting digital experiences that command attention.
            </p>

            {/* Social buttons */}
            <div className="flex gap-2.5">
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  title={s.label}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  onHoverStart={() => setHoveredSocial(s.label)}
                  onHoverEnd={() => setHoveredSocial(null)}
                  className="relative w-10 h-10 rounded-[2px] border flex items-center justify-center no-underline transition-colors duration-250"
                  style={{
                    borderColor: hoveredSocial === s.label ? "rgba(200,144,42,.5)" : "rgba(200,144,42,.15)",
                    background:  hoveredSocial === s.label ? "rgba(200,144,42,.1)" : "rgba(255,255,255,.02)",
                    color:       hoveredSocial === s.label ? "#C8902A" : "rgba(232,224,208,0.35)",
                  }}
                >
                  {hoveredSocial === s.label && (
                    <>
                      <div className="absolute top-0 left-0 w-4 h-px bg-gold/70" />
                      <div className="absolute top-0 left-0 w-px h-4 bg-gold/70" />
                    </>
                  )}
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </FadeIn>

          {/* ── Services column ── */}
          <FadeIn delay={0.1}>
            <div>
              {/* ↑ text-[8px] → text-[11px] */}
              <span className="font-mono-gh text-[11px] tracking-[3px] text-gold/55 block mb-5">
                SERVICES
              </span>
              <div className="h-px w-8 mb-6"
                style={{ background: "linear-gradient(90deg,#C8902A,transparent)" }} />

              <ul className="space-y-5">
                {SERVICES.map(({ label, desc, href }, i) => (
                  <li key={i}>
                    <motion.a
                      href={href}
                      className="group block no-underline"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center gap-2 mb-0.5">
                        {/* ↑ text-[10px] → text-[13px] */}
                        <span className="text-gold/25 group-hover:text-gold transition-colors duration-200 text-[13px]">›</span>
                        {/* ↑ text-[9px] → text-[12px] */}
                        <span className="font-mono-gh text-[12px] tracking-[1.5px] text-cream/50 group-hover:text-cream/80 transition-colors duration-200">
                          {label.toUpperCase()}
                        </span>
                      </div>
                      {/* ↑ text-[11px] → text-[13px] */}
                      <span className="text-cream/22 text-[13px] font-light pl-4 block leading-snug">
                        {desc}
                      </span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* ── Support column ── */}
          <FadeIn delay={0.2}>
            <div>
              <span className="font-mono-gh text-[11px] tracking-[3px] text-gold/55 block mb-5">
                SUPPORT
              </span>
              <div className="h-px w-8 mb-6"
                style={{ background: "linear-gradient(90deg,#C8902A,transparent)" }} />
              <LinkList items={SUPPORT} />
            </div>
          </FadeIn>

          {/* ── About column ── */}
          <FadeIn delay={0.3}>
            <div>
              <span className="font-mono-gh text-[11px] tracking-[3px] text-gold/55 block mb-5">
                ABOUT
              </span>
              <div className="h-px w-8 mb-6"
                style={{ background: "linear-gradient(90deg,#C8902A,transparent)" }} />
              <LinkList items={ABOUT} />
            </div>
          </FadeIn>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative z-10 border-t border-gold/8">
        <div className="px-[clamp(20px,6vw,80px)] py-5 max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">

          {/* ↑ text-[8px] → text-[11px] */}
          <span className="font-mono-gh text-[11px] tracking-[2px] text-cream/18">
            © 2025 GOLDENHORDE STUDIO
          </span>

          <div className="hidden md:flex items-center gap-3">
            <div className="w-16 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(200,144,42,.25))" }} />
            <div className="w-[5px] h-[5px] border border-gold/30 rotate-45" />
            <div className="w-16 h-px" style={{ background: "linear-gradient(90deg,rgba(200,144,42,.25),transparent)" }} />
          </div>

          {/* ↑ text-[8px] → text-[11px] */}
          <span className="font-mono-gh text-[11px] tracking-[2px] text-gold/30">
            CRAFTED WITH PURPOSE
          </span>

        </div>
      </div>

    </footer>
  );
}