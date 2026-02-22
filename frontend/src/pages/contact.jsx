import { motion } from "framer-motion";
import { useState } from "react";
import { submitContactForm } from "../lib/api";

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

  return (
    <main className="pt-24 pb-24 px-[5vw] border-t border-gold/10 relative overflow-hidden">
      
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: "min(800px,120vw)",
          height: "min(800px,120vw)",
          background: "radial-gradient(circle,rgba(200,144,42,.07) 0%,transparent 65%)",
        }}
      />

      {/* Ghost letters */}
      <div
        className="hidden lg:block font-fraunces absolute right-0 bottom-[-4%] text-gold/[0.04] pointer-events-none select-none leading-none italic"
        style={{ fontSize: "min(200px,14vw)" }}
        aria-hidden
      >
        GH
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-[7vw] flex-wrap">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 min-w-[280px]"
          >
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-5 h-px bg-gold" />
              <span className="font-mono-gh text-[8px] tracking-[5px] text-gold/60">
                GET IN TOUCH
              </span>
            </div>

            <h2
              className="font-fraunces font-semibold leading-[.93] mb-5"
              style={{ fontSize: "clamp(36px,5.5vw,84px)" }}
            >
              Let's Build<br />Something<br />
              <span className="text-shimmer font-fraunces italic">
                Remarkable.
              </span>
            </h2>

            <p className="text-cream/44 text-sm leading-[1.8] max-w-[360px] mb-8">
              Launching a new venture, elevating your personal brand, or strengthening your
              business's digital presence — we're ready to deliver.
            </p>
          </motion.div>

          {/* RIGHT SIDE FORM */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 min-w-[280px] border border-gold/14 bg-ink/72 backdrop-blur-2xl p-[clamp(22px,3.2vw,44px)]"
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
              {sending ? "SENDING..." : "SEND ENQUIRY"}
            </motion.button>

            {status && (
              <p className="mt-4 text-xs text-gold/70">{status}</p>
            )}
          </motion.form>
        </div>
      </div>
    </main>
  );
}