import { useState } from "react";

const initialReviews = [
  {
    name: "Sarah Mitchell",
    role: "Founder, Zephyr Wellness",
    stars: 5,
    text: "GoldenHorde exceeded every expectation. Our client enquiries doubled within the first month of launch.",
  },
  {
    name: "Roshan Kumar",
    role: "Senior Software Engineer",
    stars: 5,
    text: "The portfolio they built led to three interview invitations in two weeks. Outstanding quality and communication.",
  },
  {
    name: "Marco Delacroix",
    role: "Owner, Capsule Apparel Co.",
    stars: 5,
    text: "Professional, fast, and meticulous. They understood our brand from the very first conversation.",
  },
];

const Star = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#FFB800" : "none"} stroke={filled ? "#FFB800" : "#D4A74A"} strokeWidth="1.5" style={{ filter: filled ? "drop-shadow(0 0 4px rgba(255,184,0,0.6))" : "none" }}>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

const Stars = ({ count }) => (
  <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
    {[1,2,3,4,5].map(i => <Star key={i} filled={i <= count} />)}
  </div>
);

const Reviews = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [form, setForm] = useState({ name: "", role: "", stars: 5, text: "" });
  const [hoverStar, setHoverStar] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setReviews([...reviews, { ...form, stars: Number(form.stars) }]);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setShowForm(false); setForm({ name: "", role: "", stars: 5, text: "" }); }, 2000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
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
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 2rem;
        }
        .blob1 { position: fixed; top: -15%; left: -10%; width: 500px; height: 500px; border-radius: 50%; background: #4169E1; opacity: 0.04; filter: blur(120px); pointer-events: none; }
        .blob2 { position: fixed; bottom: -10%; right: -5%; width: 400px; height: 400px; border-radius: 50%; background: #FF8C00; opacity: 0.04; filter: blur(100px); pointer-events: none; }

        .content { position: relative; width: 100%; max-width: 1200px; display: flex; flex-direction: column; align-items: center; gap: 1.8rem; }

        /* Header */
        .header { text-align: center; }
        .badge-row { display: flex; align-items: center; gap: 0.75rem; justify-content: center; margin-bottom: 0.6rem; }
        .badge-line { height: 1px; width: 40px; background: linear-gradient(90deg, transparent, #D4A74A); }
        .badge-line.right { background: linear-gradient(90deg, #D4A74A, transparent); }
        .badge { color: #D4A74A; font-size: 0.6rem; letter-spacing: 0.35em; text-transform: uppercase; font-weight: 600; }
        .main-title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4.5vw, 3.8rem); font-weight: 900; line-height: 1.1; text-shadow: 0 0 40px rgba(65,105,225,0.3); }
        .accent { font-style: italic; background: linear-gradient(90deg, #FF8C00, #FFB800, #FFC700); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

        /* Cards grid */
        .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; width: 100%; }
        @media (max-width: 1024px) { .cards { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { 
          .cards { grid-template-columns: 1fr; gap: 0.65rem; }
          .page { padding: 1.2rem; }
          .main-title { font-size: clamp(1.6rem, 7vw, 2.5rem); }
          .bottom-row { flex-direction: column; gap: 0.9rem; align-items: flex-start; }
          .add-btn { width: 100%; justify-content: center; }
          .content { gap: 1.2rem; }
        }

        .card {
          border: 1px solid rgba(212,167,74,0.2);
          border-radius: 16px;
          padding: 1.25rem;
          background: rgba(65,105,225,0.04);
          backdrop-filter: blur(8px);
          transition: all 0.3s;
          position: relative;
        }
        .card:hover { border-color: rgba(212,167,74,0.45); background: rgba(65,105,225,0.09); transform: translateY(-2px); }
        .quote-mark { font-family: 'Playfair Display', serif; font-size: 2.5rem; color: #D4A74A; opacity: 0.4; line-height: 1; margin-bottom: 0.4rem; }
        .card-text { font-size: 0.78rem; line-height: 1.7; color: rgba(255,255,255,0.7); font-style: italic; margin: 0.5rem 0 0.9rem; }
        .card-name { font-size: 0.82rem; font-weight: 600; color: #fff; }
        .card-role { font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(212,167,74,0.7); margin-top: 0.2rem; }

        /* Bottom row */
        .bottom-row { display: flex; align-items: center; justify-content: space-between; width: 100%; }
        .stats { display: flex; gap: 2rem; }
        .stat-num { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 900; color: #4169E1; }
        .stat-label { font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-top: 0.1rem; }

        .add-btn {
          padding: 0.7rem 1.4rem;
          border-radius: 12px; border: none; cursor: pointer;
          font-family: 'Sora', sans-serif; font-size: 0.78rem;
          font-weight: 600; color: #fff;
          background: linear-gradient(135deg, #4169E1, #2a4fc7);
          display: flex; align-items: center; gap: 0.5rem;
          position: relative; overflow: hidden; transition: all 0.3s;
        }
        .add-btn::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, #FF8C00, #FFB800); opacity: 0; transition: opacity 0.3s; }
        .add-btn:hover::before { opacity: 1; }
        .add-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(65,105,225,0.3); }
        .add-btn span { position: relative; z-index: 1; }

        /* Modal overlay */
        .overlay {
          position: fixed; inset: 0;
          background: rgba(10,14,26,0.85); backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          z-index: 100;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .modal {
          background: #0d1224;
          border: 1px solid rgba(212,167,74,0.35);
          border-radius: 20px;
          padding: 2rem;
          width: 100%; max-width: 480px;
          animation: slideUp 0.25s ease;
        }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .modal-title { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; margin-bottom: 0.25rem; }
        .modal-sub { font-size: 0.75rem; color: rgba(255,255,255,0.4); margin-bottom: 1.25rem; }
        .form-group { display: flex; flex-direction: column; gap: 0.3rem; margin-bottom: 0.8rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; margin-bottom: 0.8rem; }
        label { font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.4); font-weight: 600; }
        input, select, textarea {
          background: rgba(65,105,225,0.07);
          border: 1px solid rgba(212,167,74,0.2);
          border-radius: 10px; padding: 0.55rem 0.85rem;
          color: #fff; font-size: 0.8rem;
          font-family: 'Sora', sans-serif; width: 100%;
          transition: all 0.3s; appearance: none;
        }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.18); }
        input:focus, select:focus, textarea:focus { outline: none; border-color: #4169E1; box-shadow: 0 0 0 3px rgba(65,105,225,0.15); }
        select option { background: #0d1224; }
        textarea { resize: none; }
        .star-picker { display: flex; gap: 6px; align-items: center; padding: 0.4rem 0; }
        .star-pick { cursor: pointer; transition: transform 0.15s; background: none; border: none; padding: 0; }
        .star-pick:hover { transform: scale(1.2); }
        .modal-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; margin-bottom: 0.8rem; }
        @media (max-width: 500px) { .modal-form-row { grid-template-columns: 1fr; } }
        .modal-actions { display: flex; gap: 0.75rem; margin-top: 0.5rem; }
        .cancel-btn {
          flex: 1; padding: 0.75rem; border-radius: 10px;
          border: 1px solid rgba(212,167,74,0.25); background: transparent;
          color: rgba(255,255,255,0.5); cursor: pointer;
          font-family: 'Sora', sans-serif; font-size: 0.78rem;
          transition: all 0.3s;
        }
        .cancel-btn:hover { border-color: rgba(212,167,74,0.5); color: #fff; }
        .submit-btn {
          flex: 2; padding: 0.75rem; border-radius: 10px; border: none;
          cursor: pointer; font-family: 'Sora', sans-serif; font-size: 0.78rem;
          font-weight: 600; color: #fff;
          background: linear-gradient(135deg, #4169E1, #2a4fc7);
          position: relative; overflow: hidden; transition: all 0.3s;
        }
        .submit-btn::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, #FF8C00, #FFB800); opacity: 0; transition: opacity 0.3s; }
        .submit-btn:hover::before { opacity: 1; }
        .submit-btn span { position: relative; z-index: 1; }
        .success { text-align: center; padding: 1rem 0; }
        .success-icon { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .success-text { font-family: 'Playfair Display', serif; font-size: 1.2rem; }
        .success-sub { font-size: 0.75rem; color: rgba(255,255,255,0.4); margin-top: 0.3rem; }
      `}</style>

      <div className="page">
        <div className="blob1" /><div className="blob2" />

        <div className="content">
          {/* Header */}
          <div className="header">
            <div className="badge-row">
              <div className="badge-line" />
              <span className="badge">Client Feedback</span>
              <div className="badge-line right" />
            </div>
            <h1 className="main-title">
              What Our Clients <span className="accent">Say</span>
            </h1>
          </div>

          {/* Cards */}
          <div className="cards">
            {reviews.map((r, i) => (
              <div className="card" key={i}>
                <div className="quote-mark">"</div>
                <Stars count={r.stars} />
                <p className="card-text">"{r.text}"</p>
                <div className="card-name">{r.name}</div>
                <div className="card-role">{r.role}</div>
              </div>
            ))}
          </div>

          {/* Bottom row */}
          <div className="bottom-row">
            <div className="stats">
              <div>
                <div className="stat-num">{reviews.length}+</div>
                <div className="stat-label">Happy Clients</div>
              </div>
              <div>
                <div className="stat-num">5.0</div>
                <div className="stat-label">Avg Rating</div>
              </div>
            </div>
            <button className="add-btn" onClick={() => setShowForm(true)}>
              <span>✦</span><span>Leave a Review</span>
            </button>
          </div>
        </div>

        {/* Modal */}
        {showForm && (
          <div className="overlay" onClick={(e) => e.target.className === "overlay" && setShowForm(false)}>
            <div className="modal">
              {submitted ? (
                <div className="success">
                  <div className="success-icon">✦</div>
                  <div className="success-text">Review Submitted!</div>
                  <div className="success-sub">Thank you for your feedback.</div>
                </div>
              ) : (
                <>
                  <div className="modal-title">Share Your Experience</div>
                  <div className="modal-sub">Your feedback means the world to us.</div>
                  <form onSubmit={submit}>
                    <div className="form-row">
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label>Full Name</label>
                        <input name="name" value={form.name} onChange={handle} required placeholder="Jane Doe" />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label>Role / Company</label>
                        <input name="role" value={form.role} onChange={handle} placeholder="CEO, Acme Inc." />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Rating</label>
                      <div className="star-picker">
                        {[1,2,3,4,5].map(n => (
                          <button
                            type="button"
                            key={n}
                            className="star-pick"
                            onMouseEnter={() => setHoverStar(n)}
                            onMouseLeave={() => setHoverStar(0)}
                            onClick={() => setForm({ ...form, stars: n })}
                          >
                            <svg width="28" height="28" viewBox="0 0 24 24"
                              fill={n <= (hoverStar || form.stars) ? "#FFB800" : "none"}
                              stroke={n <= (hoverStar || form.stars) ? "#FFB800" : "#D4A74A"}
                              strokeWidth="1.5"
                              style={{ filter: n <= (hoverStar || form.stars) ? "drop-shadow(0 0 6px rgba(255,184,0,0.7))" : "none", transition: "all 0.15s" }}
                            >
                              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                            </svg>
                          </button>
                        ))}
                        <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", marginLeft: "6px" }}>
                          {(hoverStar || form.stars)} / 5
                        </span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Your Review</label>
                      <textarea name="text" value={form.text} onChange={handle} required rows={4}
                        placeholder="Tell us about your experience working with us..." />
                    </div>
                    <div className="modal-actions">
                      <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
                      <button type="submit" className="submit-btn"><span>Submit Review →</span></button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Reviews;
