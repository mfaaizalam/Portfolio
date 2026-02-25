import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
// import { submitContactForm } from "../lib/api";

/* ── Typewriter Hook ── */
function useTypewriter(lines, speed = 60, pauseBetween = 900) {
  const [displayed, setDisplayed] = useState([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (lineIdx >= lines.length) { setDone(true); return; }
    if (charIdx < lines[lineIdx].length) {
      const t = setTimeout(() => {
        setDisplayed(prev => {
          const next = [...prev];
          if (!next[lineIdx]) next[lineIdx] = "";
          next[lineIdx] = lines[lineIdx].slice(0, charIdx + 1);
          return next;
        });
        setCharIdx(c => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLineIdx(l => l + 1);
        setCharIdx(0);
      }, pauseBetween);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx, lines, speed, pauseBetween]);

  return { displayed, done };
}
//ddd
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

/* ══════════════════════════════════════
   CONTACT
══════════════════════════════════════ ..*/
export default function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    project: "",
    message: ""
  });

  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      const res = await submitContactForm(form);
      setStatus(res.message || "Message sent successfully!");
      setForm({ name: "", email: "", project: "", message: "" });
    } catch {
      setStatus("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  /* Typewriter lines */
  const typeLines = ["Let's Build", "Something", "Remarkable."];
  const { displayed, done } = useTypewriter(typeLines, 55, 700);

  return (
    <main className="min-h-screen relative overflow-hidden border-t border-gold/10">

      {/* ── Grid bg (same as hero) ── */}
      <div className="absolute inset-0 z-0"
        style={{
          backgroundImage: "linear-gradient(rgba(200,144,42,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(200,144,42,.04) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

      {/* ── Glows ── */}
      <div className="absolute top-[-20%] left-[-5%] rounded-full pointer-events-none z-[1]"
        style={{ width: "min(800px,110vw)", height: "min(800px,110vw)", background: "radial-gradient(circle,rgba(200,144,42,.13) 0%,transparent 65%)" }} />
      <div className="absolute bottom-[-10%] right-[-5%] rounded-full pointer-events-none z-[1]"
        style={{ width: "min(500px,70vw)", height: "min(500px,70vw)", background: "radial-gradient(circle,rgba(140,94,18,.09) 0%,transparent 70%)" }} />

      {/* ── Ghost text ── */}
      <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-fraunces select-none pointer-events-none z-[1]"
        style={{ fontSize: "11vw", letterSpacing: ".15em", whiteSpace: "nowrap", color: "transparent", WebkitTextStroke: "1px rgba(200,144,42,.045)" }}>
        CONTACT
      </div>

      {/* ── 2-col grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen relative z-10">

        {/* ── LEFT: Hero-style content with typewriter ── */}
        <div className="flex flex-col justify-center px-[clamp(24px,5vw,72px)] pt-[clamp(100px,14vh,140px)] pb-[clamp(40px,6vh,64px)]">

          {/* Badge */}
          <LR delay={0.3}>
            <div className="inline-flex items-center gap-2.5 border border-gold/22 px-4 py-[7px] rounded-full mb-9 bg-gold/5 backdrop-blur-sm w-fit">
              <motion.span
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-[7px] h-[7px] rounded-full bg-[#5DDB7F] shadow-[0_0_10px_#5DDB7F] inline-block"
              />
              <span className="font-mono-gh text-[9px] tracking-[3px] text-gold/85">
                GET IN TOUCH · WE RESPOND FAST
              </span>
            </div>
          </LR>

          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-2.5 mb-5"
          >
            <div className="w-5 h-px bg-gold" />
            <span className="font-mono-gh text-[8px] tracking-[5px] text-gold/60">
              START A PROJECT
            </span>
          </motion.div>

          {/* Typewriter headline */}
          <div className="mb-5" style={{ minHeight: "clamp(108px,16vw,240px)" }}>
            {typeLines.map((line, i) => {
              const isLast = i === typeLines.length - 1;
              const text = displayed[i] || "";
              const isActive = i === (displayed.length - 1) && !done;
              return (
                <div key={i}
                  className="font-fraunces font-semibold leading-[.95] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(36px,5.2vw,76px)" }}>
                  {isLast ? (
                    <span className="text-shimmer font-fraunces italic">
                      {text}
                      {isActive && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                          className="inline-block w-[3px] ml-[2px] align-middle bg-gold"
                          style={{ height: "0.8em" }}
                        />
                      )}
                    </span>
                  ) : (
                    <span className="text-cream">
                      {text}
                      {isActive && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                          className="inline-block w-[3px] ml-[2px] align-middle bg-gold"
                          style={{ height: "0.8em" }}
                        />
                      )}
                    </span>
                  )}
                </div>
              );
            })}
            {/* Blinking cursor after all done — sits at end of last line */}
            {done && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.75, repeat: Infinity }}
                className="inline-block w-[3px] ml-[2px] align-middle bg-gold"
                style={{ height: "0.7em", marginTop: "-0.1em" }}
              />
            )}
          </div>

          {/* Rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="h-px w-3/4 mb-6 origin-left"
            style={{ background: "linear-gradient(90deg,#C8902A,rgba(200,144,42,.08))" }}
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.55 }}
            className="text-cream/44 leading-[1.8] font-light max-w-[400px] mb-8"
            style={{ fontSize: "clamp(13px,1.4vw,15px)" }}
          >
            Launching a new venture, elevating your personal brand, or strengthening your
            business's digital presence — we're ready to deliver. Fill in the form and
            we'll be in touch promptly.
          </motion.p>

          {/* Info tiles */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.7 }}
            className="flex flex-col gap-3 mb-9"
          >
            {[
              { icon: "✦", label: "RESPONSE TIME", value: "Within 24 hours" },
              { icon: "✦", label: "PROJECT START", value: "As fast as 48h" },
              { icon: "✦", label: "CLIENT SATISFACTION", value: "100% · 87+ Projects" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-gold text-[10px]">{item.icon}</span>
                <span className="font-mono-gh text-[8px] tracking-[3px] text-gold/50">{item.label}</span>
                <span className="w-px h-3 bg-gold/20 mx-1" />
                <span className="font-mono-gh text-[8px] tracking-[2px] text-cream/60">{item.value}</span>
              </div>
            ))}
          </motion.div>

          {/* Stars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="flex items-center gap-2"
          >
            <Stars count={5} size={12} />
            <span className="font-mono-gh text-[8px] tracking-[2.5px] text-gold/50">
              5.0 · 87+ PROJECTS DELIVERED
            </span>
          </motion.div>
        </div>

        {/* ── RIGHT: Contact Form ── */}
        <div className="flex items-center justify-center px-[clamp(24px,4vw,64px)] pt-[clamp(40px,8vh,80px)] pb-[clamp(40px,8vh,80px)]">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-[520px] border border-gold/14 bg-ink/72 backdrop-blur-2xl p-[clamp(22px,3.2vw,44px)]"
          >
            <h3 className="font-fraunces text-2xl font-semibold mb-1.5">
              Start a Conversation
            </h3>

            <p className="text-cream/44 text-xs leading-[1.7] mb-7">
              Tell us about your project. We'll respond promptly.
            </p>

            {/* NAME */}
            <div className="mb-4">
              <label className="font-mono-gh text-[8px] tracking-[3px] text-gold/52 block mb-1.5">
                FULL NAME
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="gold-input"
                required
              />
            </div>

            {/* EMAIL */}
            <div className="mb-4">
              <label className="font-mono-gh text-[8px] tracking-[3px] text-gold/52 block mb-1.5">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="gold-input"
                required
              />
            </div>

            {/* PROJECT */}
            <div className="mb-4">
              <label className="font-mono-gh text-[8px] tracking-[3px] text-gold/52 block mb-1.5">
                PROJECT TYPE
              </label>
              <select
                name="project"
                value={form.project}
                onChange={handleChange}
                className="gold-input"
                style={{ background: "rgba(7,6,10,.95)" }}
                required
              >
                <option value="">Select project type…</option>
                <option>Personal Portfolio</option>
                <option>Business Website</option>
                <option>Landing Page</option>
                <option>Small Business</option>
                <option>Other</option>
              </select>
            </div>

            {/* MESSAGE */}
            <div className="mb-6">
              <label className="font-mono-gh text-[8px] tracking-[3px] text-gold/52 block mb-1.5">
                MESSAGE
              </label>
              <textarea
                rows={4}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Describe your goals, timeline, and requirements…"
                className="gold-input resize-y"
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={sending}
              whileHover={{ scale: 1.02, boxShadow: "0 0 44px rgba(200,144,42,.3)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 text-ink font-mono-gh text-[10px] tracking-[3.5px] font-bold rounded-[2px] cursor-pointer border-0 flex items-center justify-center gap-2.5 disabled:opacity-60"
              style={{ background: "linear-gradient(135deg,#C8902A,#E2AC46)" }}
            >
              {sending ? "SENDING..." : (
                <>SEND ENQUIRY <ArrowIcon /></>
              )}
            </motion.button>

            {status && (
              <p className="mt-4 text-xs text-gold/70">{status}</p>
            )}
          </motion.form>
        </div>
      </div>

      {/* Ghost letters bottom-right (decorative, same as original) */}
      <div
        className="hidden lg:block font-fraunces absolute right-0 bottom-[-4%] text-gold/[0.04] pointer-events-none select-none leading-none italic z-[1]"
        style={{ fontSize: "min(200px,14vw)" }}
        aria-hidden
      >
        GH
      </div>
    </main>
  );
}