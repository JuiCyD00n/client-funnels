import { useState, useEffect, useRef } from "react";

// KennethPlay.com design system
const C = {
  bg: "#0f0f1a",
  bgCard: "#161628",
  bgCardHover: "#1c1c35",
  accent: "#7C5CFC",
  accentHover: "#9B7FFF",
  accentDim: "rgba(124, 92, 252, 0.12)",
  accentBorder: "rgba(124, 92, 252, 0.3)",
  white: "#FFFFFF",
  whiteDim: "rgba(255,255,255,0.7)",
  whiteFaint: "rgba(255,255,255,0.4)",
  divider: "rgba(255,255,255,0.08)",
  success: "#4ade80",
};

const services = [
  { icon: "🎯", title: "Private Coaching & Strategy", desc: "One-on-one sessions with Kenneth to work on exactly what you need. No generic advice. No group calls. Just you, your goals, and the world's most recognized sex educator in your corner." },
  { icon: "🩺", title: "World-Class Clinician Access", desc: "Warm introductions to the best sexual medicine doctors, therapists, and researchers on the planet. Not a Google search. Actual relationships Kenneth has built over a decade." },
  { icon: "🔒", title: "Privacy & Discretion Planning", desc: "NDAs, encrypted communications, and reputational risk management. Because at this level, protecting your private life matters as much as improving it." },
  { icon: "🌍", title: "Bespoke Experience Design", desc: "Travel coordination, private event planning, and carefully structured experiences in select cities worldwide. Everything counsel-reviewed and above board." },
  { icon: "📚", title: "Advanced Sexual Education", desc: "Access to Kenneth's full methodology delivered privately. Techniques, frameworks, and insights that go far beyond what any course or book can offer." }
];

const steps = [
  { num: "01", title: "Tell Us About You", desc: "Fill out a short, confidential form. No fluff. Just enough so Kenneth knows if he can actually help." },
  { num: "02", title: "Private Conversation", desc: "If it's a fit, you'll be invited to a paid consultation call. Think of it as a two-way interview." },
  { num: "03", title: "Start Working Together", desc: "Accepted clients begin a quarterly advisory. White-glove access. Kenneth and his team in your corner." },
];

const endorsements = [
  { quote: "Kenneth's book is every bit as essential for teaching men how to pleasure women as the New York Times bestseller Come As You Are is for teaching women about their own capacity for pleasure.", name: "Dr. Zhana Vrangalova", title: "PhD, NYU Professor of Human Sexuality" },
  { quote: "Kenneth Play is a sex ed Renaissance man. He distills information from complex arrays of sexual knowledge, psychology, physiology, and neuroscience into a fine sexual aperitif.", name: "Dr. Nan Wise", title: "PhD, Neuroscientist & Sex Researcher" },
  { quote: "After experiencing more pleasure than they ever thought was possible at my retreats, women often ask, 'Who can teach my man how to pleasure me like this?' The answer is simple: Kenneth Play.", name: "Pamela Madsen", title: "Founder, Back to the Body Retreats" }
];

const mediaLogos = ["GQ", "Playboy", "Men's Health", "Cosmopolitan", "Vice", "HuffPost", "Mashable", "AskMen"];

const categories = ["Relationship strategy", "Sexual wellness education", "Clinician or therapist referral", "Private experience design", "Privacy & discretion planning", "Something else"];

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

export default function PrivateAdvisoryV2() {
  const [form, setForm] = useState({ name: "", preferredName: "", email: "", phone: "", city: "", countries: "", type: "Individual", categories: [], partnerAware: "", filming: "", concerns: "", team: "", startMonth: "", budget: "", goal: "", agree: false });
  const [submitted, setSubmitted] = useState(false);
  const [endorseIdx, setEndorseIdx] = useState(0);
  const formRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setEndorseIdx(p => (p + 1) % endorsements.length), 6000);
    return () => clearInterval(t);
  }, []);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const toggleCat = (c) => set("categories", form.categories.includes(c) ? form.categories.filter(x => x !== c) : [...form.categories, c]);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', Arial, sans-serif", background: C.bg, color: C.white, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700&family=DM+Serif+Display:ital@0;1&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: rgba(124,92,252,0.12); color: #fff; }
        .serif { font-family: 'DM Serif Display', Georgia, serif; }
        .sans { font-family: 'DM Sans', 'Helvetica Neue', sans-serif; }
        .section { padding: 96px 24px; max-width: 880px; margin: 0 auto; }
        .section-wide { padding: 96px 24px; max-width: 1080px; margin: 0 auto; }
        .btn-primary { display: inline-block; padding: 16px 36px; background: #7C5CFC; color: #fff; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; letter-spacing: 0.5px; border: none; border-radius: 6px; cursor: pointer; transition: all 0.3s ease; text-decoration: none; }
        .btn-primary:hover { background: #9B7FFF; transform: translateY(-1px); }
        .input-field { width: 100%; padding: 14px 16px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); color: #fff; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 400; border-radius: 6px; outline: none; transition: border-color 0.3s ease; }
        .input-field:focus { border-color: #7C5CFC; }
        .input-field::placeholder { color: rgba(255,255,255,0.4); }
        textarea.input-field { resize: vertical; min-height: 100px; }
        select.input-field { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath fill='%237C5CFC' d='M6 8L0 0h12z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 16px center; padding-right: 40px; }
        select.input-field option { background: #161628; color: #fff; }
        .chip { display: inline-block; padding: 8px 18px; border: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.7); font-size: 13px; border-radius: 20px; cursor: pointer; transition: all 0.3s ease; user-select: none; }
        .chip.on { border-color: #7C5CFC; color: #7C5CFC; background: rgba(124,92,252,0.12); }
        .chip:hover { border-color: #7C5CFC; }
        .radio-row label { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px; color: rgba(255,255,255,0.7); margin-right: 20px; }
        .radio-row input[type="radio"] { appearance: none; width: 16px; height: 16px; border: 1px solid rgba(255,255,255,0.25); border-radius: 50%; cursor: pointer; position: relative; }
        .radio-row input[type="radio"]:checked { border-color: #7C5CFC; }
        .radio-row input[type="radio"]:checked::after { content: ''; position: absolute; top: 3px; left: 3px; width: 8px; height: 8px; background: #7C5CFC; border-radius: 50%; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (max-width: 640px) {
          .section, .section-wide { padding: 64px 20px; }
          .hero-h1 { font-size: 36px !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "60px 24px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 20%, rgba(124,92,252,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
        <FadeIn><div style={{ fontSize: 12, fontWeight: 500, letterSpacing: 3, textTransform: "uppercase", color: C.accent, marginBottom: 24 }}>Kenneth Play</div></FadeIn>
        <FadeIn delay={0.1}><h1 className="serif hero-h1" style={{ fontSize: 52, fontWeight: 400, lineHeight: 1.15, maxWidth: 680, marginBottom: 28 }}>Private Intimacy &<br />Lifestyle Advisory</h1></FadeIn>
        <FadeIn delay={0.25}><p className="sans" style={{ fontSize: 18, fontWeight: 300, lineHeight: 1.7, maxWidth: 560, color: C.whiteDim, marginBottom: 40 }}>Look, most of what I do is public. The course. The book. The tutorials millions of people have watched. But some things require a different level of attention.<br /><br />This is for the small number of people who want me and my team working privately on their intimate life. Directly. Confidentially. No courses. No group calls. Just us, working on what matters to you.</p></FadeIn>
        <FadeIn delay={0.4}><button className="btn-primary" onClick={scrollToForm} style={{ fontSize: 15, padding: "18px 44px" }}>Tell Me More About Your Situation</button></FadeIn>
        <FadeIn delay={0.5}><div style={{ marginTop: 40, fontSize: 13, fontWeight: 400, letterSpacing: 1, color: C.whiteFaint }}>Starting at $25,000 / quarter &nbsp;·&nbsp; Very limited availability &nbsp;·&nbsp; By invitation</div></FadeIn>
      </section>

      {/* MEDIA BAR */}
      <section style={{ borderTop: `1px solid ${C.divider}`, borderBottom: `1px solid ${C.divider}`, padding: "28px 24px" }}>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "8px 32px", alignItems: "center" }}>
          <span style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: C.whiteFaint, fontWeight: 500 }}>As seen in</span>
          {mediaLogos.map((n, i) => <span key={i} style={{ fontSize: 13, fontWeight: 400, color: C.whiteFaint, opacity: 0.6 }}>{n}</span>)}
        </div>
      </section>

      {/* THE DEAL */}
      <section className="section">
        <FadeIn><h2 className="serif" style={{ fontSize: 34, fontWeight: 400, textAlign: "center", lineHeight: 1.3, marginBottom: 32 }}>Here's the deal.</h2></FadeIn>
        <FadeIn delay={0.1}>
          <div className="sans" style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.85, color: C.whiteDim, maxWidth: 640, margin: "0 auto" }}>
            <p style={{ marginBottom: 18 }}>I've spent over a decade becoming the person GQ calls "the world's greatest sex hacker." I've coached thousands of people through my course. My tutorials have been watched over 60 million times. PhDs, neuroscientists, and licensed therapists endorse my work and recommend it to their own clients.</p>
            <p style={{ marginBottom: 18 }}>But here's what none of that can do: sit with you privately, understand your specific situation, connect you with the right doctors, therapists, and experts, handle the logistics, and make sure everything is done with the discretion your life requires.</p>
            <p>That's what this is. Not a product. Not a program. A private advisory relationship where I work directly with you (or you and your partner) on your intimate life, with the same care and precision you'd expect from any serious advisor in any other area of your life.</p>
          </div>
        </FadeIn>
      </section>

      {/* SERVICES */}
      <section className="section-wide" style={{ paddingTop: 20 }}>
        <FadeIn><div style={{ fontSize: 12, fontWeight: 500, letterSpacing: 3, textTransform: "uppercase", color: C.accent, textAlign: "center", marginBottom: 48 }}>What this looks like in practice</div></FadeIn>
        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {services.map((s, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div style={{ background: C.bgCard, borderRadius: 10, padding: "32px 28px", border: `1px solid ${C.divider}`, height: "100%", transition: "border-color 0.3s ease, background 0.3s ease" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.accentBorder; e.currentTarget.style.background = C.bgCardHover; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.divider; e.currentTarget.style.background = C.bgCard; }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{s.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 500, marginBottom: 10 }}>{s.title}</h3>
                <p className="sans" style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: C.whiteDim }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* WHY ME */}
      <section className="section">
        <FadeIn><div style={{ fontSize: 12, fontWeight: 500, letterSpacing: 3, textTransform: "uppercase", color: C.accent, textAlign: "center", marginBottom: 32 }}>Why me?</div></FadeIn>
        <FadeIn delay={0.1}>
          <div className="sans" style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.85, color: C.whiteDim, maxWidth: 640, margin: "0 auto" }}>
            <p style={{ marginBottom: 18 }}>Before any of the media mentions, I was a sexually insecure Asian immigrant with an average-sized body, no confidence, and a sex life that was going nowhere. When a woman first reached for my pants, I literally ran out of the room.</p>
            <p style={{ marginBottom: 18 }}>So I did what I do: I became obsessed with figuring it out. I studied peer-reviewed research. I trained with tantra masters, kink educators, and sex researchers. I collaborated on large-scale academic studies. I put in thousands of hours of real, hands-on practice.</p>
            <p style={{ marginBottom: 18 }}>And it worked. Today my work is endorsed by PhDs from NYU, neuroscientists, and sex therapists who recommend my methods to their own clients. My bestselling book, Beyond Satisfied, is considered essential reading in the field.</p>
            <p>This advisory is the most private, most personalized version of everything I've built. It's for people who want more than a course can give, and who need someone they can trust with the parts of their life they don't talk about publicly.</p>
          </div>
        </FadeIn>
      </section>

      {/* ENDORSEMENTS */}
      <section style={{ borderTop: `1px solid ${C.divider}`, borderBottom: `1px solid ${C.divider}`, padding: "80px 24px" }}>
        <div style={{ maxWidth: 660, margin: "0 auto", textAlign: "center", minHeight: 180 }}>
          {endorsements.map((e, i) => (
            <div key={i} style={{ opacity: endorseIdx === i ? 1 : 0, position: endorseIdx === i ? "relative" : "absolute", transition: "opacity 0.8s ease", pointerEvents: endorseIdx === i ? "auto" : "none" }}>
              <p className="serif" style={{ fontSize: 20, fontWeight: 400, lineHeight: 1.6, fontStyle: "italic", marginBottom: 24 }}>"{e.quote}"</p>
              <div style={{ fontSize: 14, fontWeight: 500, color: C.accent }}>{e.name}</div>
              <div style={{ fontSize: 12, fontWeight: 300, color: C.whiteFaint, marginTop: 4 }}>{e.title}</div>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 32 }}>
            {endorsements.map((_, i) => <button key={i} onClick={() => setEndorseIdx(i)} style={{ width: 8, height: 8, borderRadius: "50%", border: "none", cursor: "pointer", background: endorseIdx === i ? C.accent : "rgba(255,255,255,0.15)", transition: "background 0.3s" }} />)}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-wide">
        <FadeIn><div style={{ fontSize: 12, fontWeight: 500, letterSpacing: 3, textTransform: "uppercase", color: C.accent, textAlign: "center", marginBottom: 48 }}>How it works</div></FadeIn>
        <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ textAlign: "center", padding: "24px 16px" }}>
                <div className="serif" style={{ fontSize: 48, fontWeight: 400, color: C.accent, opacity: 0.3, marginBottom: 16 }}>{s.num}</div>
                <h4 style={{ fontSize: 18, fontWeight: 500, marginBottom: 10 }}>{s.title}</h4>
                <p className="sans" style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: C.whiteDim }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* INVESTMENT */}
      <section className="section" style={{ textAlign: "center" }}>
        <FadeIn><div style={{ fontSize: 12, fontWeight: 500, letterSpacing: 3, textTransform: "uppercase", color: C.accent, marginBottom: 32 }}>The investment</div></FadeIn>
        <FadeIn delay={0.1}><div className="serif" style={{ fontSize: 48, fontWeight: 400, marginBottom: 8 }}>$25,000</div><div className="sans" style={{ fontSize: 15, color: C.whiteDim, marginBottom: 32 }}>per quarter</div></FadeIn>
        <FadeIn delay={0.2}><p className="sans" style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.8, color: C.whiteDim, maxWidth: 520, margin: "0 auto 36px" }}>I only take on one or two people at a time. That's not manufactured scarcity. It's just the reality of doing this work well. Every engagement starts with a conversation, and not everyone will be a fit. That's okay.</p></FadeIn>
        <FadeIn delay={0.3}><button className="btn-primary" onClick={scrollToForm}>Let's Talk</button></FadeIn>
      </section>

      {/* DISCLAIMER */}
      <section style={{ borderTop: `1px solid ${C.divider}`, padding: "48px 24px" }}>
        <div className="sans" style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", fontSize: 13, fontWeight: 300, lineHeight: 1.8, color: C.whiteFaint }}>
          One more thing. This advisory is built on a consent-first, legally reviewed framework. I don't facilitate anything illegal. I don't help people deceive their partners. I don't do sham arrangements. If a request doesn't pass legal and ethical review, I'll tell you straight. That's how this works.
        </div>
      </section>

      {/* FORM */}
      <section ref={formRef} style={{ borderTop: `1px solid ${C.divider}`, padding: "96px 24px", background: C.bgCard }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          {submitted ? (
            <FadeIn>
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", border: `2px solid ${C.success}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: C.success, fontSize: 22 }}>✓</div>
                <h3 className="serif" style={{ fontSize: 28, fontWeight: 400, marginBottom: 14 }}>Got it. We'll be in touch.</h3>
                <p className="sans" style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.7, color: C.whiteDim, maxWidth: 420, margin: "0 auto" }}>Every submission is reviewed personally. If it looks like a fit, you'll hear from us within 72 hours. Everything you shared stays confidential.</p>
              </div>
            </FadeIn>
          ) : (
            <>
              <FadeIn>
                <div style={{ textAlign: "center", marginBottom: 48 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: 3, textTransform: "uppercase", color: C.accent, marginBottom: 16 }}>Start Here</div>
                  <h2 className="serif" style={{ fontSize: 30, fontWeight: 400, marginBottom: 12 }}>Tell me a bit about your situation</h2>
                  <p className="sans" style={{ fontSize: 14, fontWeight: 300, color: C.whiteDim }}>Everything here is confidential. Take your time.</p>
                </div>
              </FadeIn>
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
                <FadeIn delay={0.05}>
                  <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", color: C.accent, marginBottom: 16 }}>You</div>
                  <div className="form-grid" style={{ marginBottom: 14 }}>
                    <input className="input-field" placeholder="Full name *" required value={form.name} onChange={e => set("name", e.target.value)} />
                    <input className="input-field" placeholder="Preferred name (optional)" value={form.preferredName} onChange={e => set("preferredName", e.target.value)} />
                  </div>
                  <div className="form-grid" style={{ marginBottom: 36 }}>
                    <input className="input-field" type="email" placeholder="Email *" required value={form.email} onChange={e => set("email", e.target.value)} />
                    <input className="input-field" placeholder="Signal / WhatsApp / Phone" value={form.phone} onChange={e => set("phone", e.target.value)} />
                  </div>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", color: C.accent, marginBottom: 16 }}>Where</div>
                  <div className="form-grid" style={{ marginBottom: 36 }}>
                    <input className="input-field" placeholder="City you're based in *" required value={form.city} onChange={e => set("city", e.target.value)} />
                    <input className="input-field" placeholder="Countries you travel to regularly" value={form.countries} onChange={e => set("countries", e.target.value)} />
                  </div>
                </FadeIn>
                <FadeIn delay={0.15}>
                  <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", color: C.accent, marginBottom: 16 }}>What are you looking for?</div>
                  <div className="radio-row" style={{ marginBottom: 18 }}>
                    <span style={{ display: "block", fontSize: 13, color: C.whiteDim, marginBottom: 8 }}>I'm reaching out as:</span>
                    {["An individual", "A couple"].map(o => <label key={o}><input type="radio" name="type" checked={form.type === o} onChange={() => set("type", o)} />{o}</label>)}
                  </div>
                  <div style={{ marginBottom: 18 }}>
                    <span style={{ display: "block", fontSize: 13, color: C.whiteDim, marginBottom: 10 }}>What interests you? (pick as many as apply)</span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {categories.map(c => <span key={c} className={`chip ${form.categories.includes(c) ? "on" : ""}`} onClick={() => toggleCat(c)}>{c}</span>)}
                    </div>
                  </div>
                  <div className="radio-row" style={{ marginBottom: 18 }}>
                    <span style={{ display: "block", fontSize: 13, color: C.whiteDim, marginBottom: 8 }}>Is your partner aware you're reaching out?</span>
                    {["Yes", "No", "N/A (single)"].map(o => <label key={o}><input type="radio" name="partner" checked={form.partnerAware === o} onChange={() => set("partnerAware", o)} />{o}</label>)}
                  </div>
                  <div className="radio-row" style={{ marginBottom: 18 }}>
                    <span style={{ display: "block", fontSize: 13, color: C.whiteDim, marginBottom: 8 }}>Does this involve filming or content of any kind?</span>
                    {["Yes", "No"].map(o => <label key={o}><input type="radio" name="filming" checked={form.filming === o} onChange={() => set("filming", o)} />{o}</label>)}
                  </div>
                  <textarea className="input-field" placeholder="In your own words, what are you hoping to get out of this? (No need to be formal. Just tell me what's going on.)" value={form.goal} onChange={e => set("goal", e.target.value)} style={{ marginBottom: 36 }} />
                </FadeIn>
                <FadeIn delay={0.2}>
                  <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", color: C.accent, marginBottom: 16 }}>A few logistics</div>
                  <div className="form-grid" style={{ marginBottom: 14 }}>
                    <input className="input-field" placeholder="Do you work with an assistant, therapist, or lawyer?" value={form.team} onChange={e => set("team", e.target.value)} />
                    <input className="input-field" placeholder="When would you want to start?" value={form.startMonth} onChange={e => set("startMonth", e.target.value)} />
                  </div>
                  <select className="input-field" value={form.budget} onChange={e => set("budget", e.target.value)} style={{ marginBottom: 36 }}>
                    <option value="">Budget range</option>
                    <option value="25k">$25,000 / quarter</option>
                    <option value="50k">$50,000+ / quarter</option>
                    <option value="discuss">Let's discuss</option>
                  </select>
                </FadeIn>
                <FadeIn delay={0.25}>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: 13, fontWeight: 300, color: C.whiteDim, lineHeight: 1.6, marginBottom: 32 }}>
                    <input type="checkbox" required checked={form.agree} onChange={e => set("agree", e.target.checked)} style={{ display: "none" }} />
                    <span style={{ width: 18, height: 18, minWidth: 18, border: `1px solid ${form.agree ? C.accent : "rgba(255,255,255,0.2)"}`, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2, background: form.agree ? C.accentDim : "transparent", transition: "all 0.3s" }}>
                      {form.agree && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke={C.accent} strokeWidth="1.5" /></svg>}
                    </span>
                    <span>I understand this is a lawful advisory. It doesn't arrange illegal activity, and Kenneth may decline any request that doesn't pass ethical or legal review. Everything I share here is confidential.</span>
                  </label>
                </FadeIn>
                <FadeIn delay={0.3}>
                  <button type="submit" className="btn-primary" style={{ width: "100%", fontSize: 15, padding: "18px 0", opacity: (!form.agree || !form.name || !form.email || !form.city) ? 0.4 : 1, cursor: (!form.agree || !form.name || !form.email || !form.city) ? "not-allowed" : "pointer" }} disabled={!form.agree || !form.name || !form.email || !form.city}>
                    Send My Info to Kenneth's Team
                  </button>
                </FadeIn>
              </form>
            </>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${C.divider}`, padding: "32px 24px", textAlign: "center" }}>
        <div className="sans" style={{ fontSize: 12, fontWeight: 300, color: C.whiteFaint }}>
          © {new Date().getFullYear()} Kenneth Play &nbsp;·&nbsp; Privacy &nbsp;·&nbsp; Terms &nbsp;·&nbsp; All inquiries confidential
        </div>
      </footer>
    </div>
  );
}
