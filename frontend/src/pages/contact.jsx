import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });
  const [sending, setSending] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => setSending(false), 2000);
  };

  const info = [
    { icon: "✦", label: "EMAIL", value: "hello@goldenhorde.studio" },
    { icon: "◈", label: "RESPONSE TIME", value: "Within 24 business hours" },
    { icon: "◆", label: "AVAILABILITY", value: "Currently accepting projects" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=Playfair+Display:wght@700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; width: 100%; overflow: hidden !important; }
        ::-webkit-scrollbar { display: none; }
        body { scrollbar-width: none; -ms-overflow-style: none; }

        .page {
          font-family: 'Sora', sans-serif;
          height: 100vh; width: 100vw;
          overflow: hidden;
          background: #0a0e1a;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .blob1 {
          position: fixed; top: -15%; left: -10%;
          width: 500px; height: 500px; border-radius: 50%;
          background: #4169E1; opacity: 0.04; filter: blur(120px);
          pointer-events: none;
        }
        .blob2 {
          position: fixed; bottom: -10%; right: -5%;
          width: 400px; height: 400px; border-radius: 50%;
          background: #FF8C00; opacity: 0.04; filter: blur(100px);
          pointer-events: none;
        }
        .inner {
          position: relative;
          width: 100%;
          max-width: 1200px;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        @media (min-width: 1024px) {
          .inner { grid-template-columns: 2fr 3fr; gap: 3rem; align-items: center; }
        }

        .badge { color: #4169E1; font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase; font-weight: 600; margin-bottom: 0.4rem; }
        .main-title { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 4vw, 3.2rem); font-weight: 900; line-height: 1.1; text-shadow: 0 0 40px rgba(65,105,225,0.4); }
        .accent { background: linear-gradient(90deg, #FF8C00, #FFB800, #FFC700); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .sub { color: rgba(255,255,255,0.35); font-size: 0.78rem; margin-top: 0.4rem; }

        .left { display: flex; flex-direction: column; gap: 1rem; }
        .get-in-touch { color: #D4A74A; font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase; font-weight: 600; }
        .divider { width: 50px; height: 3px; background: linear-gradient(90deg, #FF8C00, #FFB800, #FFC700); border-radius: 2px; margin: 0.5rem 0; }
        .left-title { font-family: 'Playfair Display', serif; font-size: clamp(1.2rem, 2.5vw, 1.8rem); font-weight: 700; line-height: 1.25; }
        .left-title span { color: #4169E1; }
        .left-desc { color: rgba(255,255,255,0.45); font-size: 0.78rem; line-height: 1.65; margin-top: 0.5rem; }
        .info-cards { display: flex; flex-direction: column; gap: 0.6rem; }
        .info-card {
          background: rgba(65,105,225,0.05);
          border: 1px solid rgba(212,167,74,0.15);
          border-radius: 12px; padding: 0.65rem 0.9rem;
          display: flex; align-items: flex-start; gap: 0.75rem;
          transition: all 0.3s;
        }
        .info-card:hover { background: rgba(65,105,225,0.1); border-color: rgba(212,167,74,0.4); }
        .info-icon { color: #D4A74A; font-size: 1rem; margin-top: 2px; flex-shrink: 0; }
        .info-label { color: #4169E1; font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 600; margin-bottom: 0.2rem; }
        .info-val { color: rgba(255,255,255,0.75); font-size: 0.78rem; }

        .form-card {
          border: 1px solid rgba(212,167,74,0.3);
          border-radius: 20px;
          padding: clamp(1.2rem, 2vw, 1.8rem);
          background: rgba(10,14,26,0.7);
          backdrop-filter: blur(12px);
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.9rem; }
        @media (max-width: 500px) { .form-row { grid-template-columns: 1fr; } }
        .form-group { display: flex; flex-direction: column; gap: 0.35rem; margin-bottom: 0.85rem; }
        label { font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.4); font-weight: 600; }
        input, select, textarea {
          background: rgba(65,105,225,0.06);
          border: 1px solid rgba(212,167,74,0.2);
          border-radius: 12px;
          padding: 0.6rem 0.9rem;
          color: #fff;
          font-size: 0.8rem;
          font-family: 'Sora', sans-serif;
          width: 100%;
          transition: all 0.3s;
          appearance: none;
        }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.18); }
        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: #4169E1;
          background: rgba(65,105,225,0.12);
          box-shadow: 0 0 0 3px rgba(65,105,225,0.15);
        }
        select option { background: #0d1224; color: #fff; }
        textarea { resize: none; }

        .send-btn {
          width: 100%; margin-top: 0.9rem;
          padding: 0.85rem;
          border-radius: 12px; border: none; cursor: pointer;
          font-family: 'Sora', sans-serif; font-size: 0.82rem;
          font-weight: 600; letter-spacing: 0.05em; color: #fff;
          background: linear-gradient(135deg, #4169E1, #2a4fc7);
          display: flex; align-items: center; justify-content: center; gap: 0.75rem;
          position: relative; overflow: hidden;
          transition: transform 0.2s, box-shadow 0.3s;
        }
        .send-btn::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, #FF8C00, #FFB800);
          opacity: 0; transition: opacity 0.35s;
        }
        .send-btn:hover::before { opacity: 1; }
        .send-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(65,105,225,0.35); }
        .send-btn span, .arrow { position: relative; z-index: 1; }
        .arrow {
          width: 26px; height: 26px; border-radius: 50%;
          background: rgba(255,255,255,0.15);
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 0.9rem;
        }
      `}</style>

      <div className="page">
        <div className="blob1" />
        <div className="blob2" />

        <div className="inner">
          {/* LEFT */}
          <div className="left">
            <div>
              <p className="badge">Contact</p>
              <h1 className="main-title">Start a <span className="accent">Conversation</span></h1>
              <p className="sub">Tell us about your project. We'll respond promptly.</p>
            </div>

            <div>
              <p className="get-in-touch">Get in Touch</p>
              <div className="divider" />
              <h2 className="left-title">Let's Build Something <span>Remarkable.</span></h2>
              <p className="left-desc">
                Launching a new venture, elevating your personal brand, or strengthening your business's digital presence — we're ready to deliver.
              </p>
            </div>

            <div className="info-cards">
              {info.map(({ icon, label, value }) => (
                <div className="info-card" key={label}>
                  <span className="info-icon">{icon}</span>
                  <div>
                    <p className="info-label">{label}</p>
                    <p className="info-val">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="form-card">
            <form onSubmit={submit}>
              <div className="form-row" style={{ marginBottom: "0.85rem" }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Full Name</label>
                  <input name="name" value={form.name} onChange={handle} required placeholder="John Doe" />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label>Email Address</label>
                  <input name="email" type="email" value={form.email} onChange={handle} required placeholder="you@email.com" />
                </div>
              </div>

              <div className="form-group">
                <label>Project Type</label>
                <select name="project" value={form.project} onChange={handle} required>
                  <option value="" disabled hidden>Select a project type...</option>
                  {["Personal Portfolio", "Business Website", "Landing Page", "E-Commerce Store", "Web Application", "Brand Identity", "Other"].map(o => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Project Description</label>
                <textarea name="message" value={form.message} onChange={handle} required rows={4}
                  placeholder="Tell us about your vision, goals, timeline, or anything else relevant..." />
              </div>

              <button type="submit" className="send-btn" disabled={sending}>
                <span>{sending ? "Sending..." : "Send Query"}</span>
                {!sending && <span className="arrow">→</span>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;