import { Link } from "react-router-dom";

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

export default function Footer() {
  return (
    <footer className="border-t border-gold/10 px-[5vw] py-9 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2.5">
        <LogoMark size={22} />
        <span className="font-fraunces text-sm font-bold tracking-[2px] text-cream/35">
          GOLDENHORDE
        </span>
      </div>
      <div className="font-mono-gh text-[8px] tracking-[2.5px] text-cream/18">
        © 2025 GOLDENHORDE STUDIO
      </div>
      <div className="flex gap-5 flex-wrap">
        {["Privacy", "Instagram", "LinkedIn", "Behance"].map((l) => (
          <a
            key={l}
            href="#"
            className="font-mono-gh text-[8px] tracking-[2.5px] text-cream/20 no-underline transition-colors duration-200 hover:text-gold-l"
          >
            {l.toUpperCase()}
          </a>
        ))}
      </div>
    </footer>
  );
}