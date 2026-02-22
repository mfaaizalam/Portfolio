import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home",      to: "/" },
  { label: "Services",  to: "/services" },
  { label: "Process",   to: "/process" },
  { label: "Reviews",   to: "/reviews" },
  { label: "Contact",   to: "/contact" },
];

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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className={`fixed top-0 left-0 right-0 z-[1000] px-[5vw] flex items-center justify-between transition-all duration-500 ${
          scrolled ? "bg-ink/92 backdrop-blur-2xl" : "bg-transparent"
        }`}
        style={{
          height: "65px",
          transform: "translateZ(0)",
          willChange: "transform",
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <LogoMark size={28} />
          <span className="font-fraunces text-[17px] font-bold tracking-[2px] text-cream">
            GOLDENHORDE
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((lnk) => (
            <NavLink
              key={lnk.to}
              to={lnk.to}
              end={lnk.to === "/"}
              className={({ isActive }) =>
                `nav-link font-mono-gh text-[10px] tracking-[2.5px] transition-colors duration-300 ${
                  isActive ? "text-gold-l" : "text-cream/44 hover:text-gold-l"
                }`
              }
            >
              {lnk.label.toUpperCase()}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden bg-transparent border border-gold/14 text-cream px-4 py-2 rounded-[2px] font-mono-gh text-[9px] tracking-[3px] cursor-pointer"
        >
          {menuOpen ? "CLOSE" : "MENU"}
        </button>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-0 right-0 z-[999] bg-ink/97 backdrop-blur-2xl px-[5vw] py-6 pb-8 md:hidden"
            style={{ transform: "translateZ(0)" }}
          >
            {NAV_LINKS.map((lnk) => (
              <NavLink
                key={lnk.to}
                to={lnk.to}
                end={lnk.to === "/"}
                className={({ isActive }) =>
                  `block font-fraunces text-4xl font-semibold no-underline border-b border-gold/14 py-4 transition-colors duration-200 ${
                    isActive ? "text-gold-l" : "text-cream hover:text-gold-l"
                  }`
                }
              >
                {lnk.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="block bg-gold text-ink py-3.5 rounded-[2px] font-mono-gh text-[10px] tracking-[3px] font-bold text-center no-underline mt-4"
            >
              START A PROJECT
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}