import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Menu, X, ArrowUpRight, ArrowRight, Mail, Github, Linkedin, MapPin, Sun, Moon } from "lucide-react";

/* ---------------------------------------------------------
   TOKENS — two palettes, same structure
--------------------------------------------------------- */
const DARK = {
  void: "#141310",
  surface: "#1c1a16",
  surfaceHi: "#242119",
  line: "#332f27",
  signal: "#FF5A3C",   // coral — community / human
  spark: "#C4F542",    // lime — tech / signal
  text: "#F5F1E8",
  muted: "#948E80",
  cursorLine: "245,241,232",
  cursorDot: "245,241,232",
};

const LIGHT = {
  void: "#F6F2E7",
  surface: "#ECE5D4",
  surfaceHi: "#E2D9C3",
  line: "#D5C9AC",
  signal: "#E14A2A",
  spark: "#5C7A00",
  text: "#1D1912",
  muted: "#75705F",
  cursorLine: "29,25,18",
  cursorDot: "29,25,18",
};

/* ---------------------------------------------------------
   DATA
--------------------------------------------------------- */
const NAV = [
  { id: "work", label: "Work" },
  { id: "approach", label: "Approach" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const IMPACT = [
  { value: 550, suffix: "+", label: "students engaged through TinkerHub hackathons & events" },
  { value: 30, suffix: "", label: "person international team led for AI+Compassion's global relay" },
  { value: 25000, suffix: "+", label: "students reached through NoteAI's EdTech programs" },
  { value: 6, suffix: "", label: "continents coordinated live in a single 26-hour relay" },
];

const CASES = [
  {
    tag: "Community / Global Ops",
    title: "AI+Compassion Global Relay",
    role: "Asia Pacific Regional Coordinator → Project Manager",
    summary: "A 26-hour live relay across six continents, 60+ speakers, zero room for a dropped handoff.",
    challenge: "Coordinate a 26-hour global relay event at Expo 2025 Osaka — 60+ speakers across six continents, streaming live, with no room for handoff errors.",
    approach: "Owned the Asia Pacific region end-to-end while regularly stepping in to support other regions. Built the master presentation template, speaker intro system, and global slide decks that became the standard used across the entire event. Coordinated live handoffs with teams in North America and South Asia to keep the global stream seamless.",
    outcome: "Flawless 26-hour live handoff across continents. Post-event, designed the participant engagement framework and proposed the mentorship tracks now shaping the initiative's 'Year Zero' strategy.",
    quote: {
      text: "She combines technical skill, cultural sensitivity, and genuine initiative in a way that's rare. Any organization would be fortunate to have her.",
      name: "Jun Suto",
      role: "Solution Curator & XPRIZE Visioneer — worked with Rasha on the same team",
    },
  },
  {
    tag: "Community / Ecosystem",
    title: "TinkerHub Campus Leadership",
    role: "Campus Lead, MAMOC · Campus Council Member",
    summary: "Reviving a dormant campus chapter inside a 62-campus statewide maker network.",
    challenge: "Build a maker culture on campus from near-zero, inside TinkerHub's statewide network of 62 campuses — while earning a seat in how the whole network makes decisions.",
    approach: "Revived the TinkerHub MAMOC chapter and hosted hackathons and learning programs both on- and off-campus. Helped organize \"Chaayem Puppsum,\" a multi-city orientation kickoff spanning TinkerSpace Kochi and IPM Kozhikode, featuring a cross-community panel discussion. Volunteered at Tink-Her-Hack 4.0, Kerala's largest women-only hackathon.",
    outcome: "550+ student participation across on- and off-campus events. Earned a seat on the Campus Council, driving strategic decisions across all 62 campuses in the network.",
  },
  {
    tag: "Community / Operations",
    title: "NoteAI × MuLearn",
    role: "Operations Lead (NoteAI) · Associate, Management IG (MuLearn)",
    summary: "Scaling an EdTech startup's reach while building a leadership pipeline for 70+ people.",
    challenge: "Grow a student-led AI EdTech startup's reach, while separately structuring a scalable leadership pipeline inside a much larger student network.",
    approach: "Ran lead generation, database operations, and bootcamps for NoteAI. In parallel at MuLearn, designed a structured project-management learning roadmap, ran weekly office hours and the PM Master Quest 2025, then stepped up to lead 70+ member teams and 10+ concurrent high-impact projects as strategic liaison between students and industry.",
    outcome: "NoteAI has reached 25,000+ students on its way to a 1-lakh-student goal. MuLearn's Management IG restructured into a durable leadership pipeline under Rasha's ownership.",
  },
  {
    tag: "Product / Development",
    title: "Berry Basket",
    role: "Lead Developer",
    summary: "A full e-commerce mobile app for micro-retailers, built solo, Flutter + Django REST.",
    challenge: "Micro-retailers needed a lightweight way to sell online without enterprise e-commerce overhead.",
    approach: "Built a full e-commerce mobile app in Flutter with a Django REST Framework backend — Admin, Seller, and Customer modules; inventory and order management; location-based discovery; JWT authentication; Provider for state management; a glassmorphic UI with adaptive light/dark themes.",
    outcome: "A working, production-style multi-role commerce app — proof of shipping a real product solo, start to finish.",
  },
];

const APPROACH = [
  { title: "Listen", body: "Spend time in the room before designing anything — understand what a community actually needs, not what looks good on a roadmap." },
  { title: "Design", body: "Build the structure — templates, frameworks, roadmaps — that turns good intentions into something repeatable." },
  { title: "Build", body: "Ship the tools myself when the community needs them: the app, the dashboard, the site. No handoff required." },
  { title: "Grow", body: "Hand off ownership, document what worked, and make sure the thing outlives my involvement in it." },
];

const TIMELINE = [
  { year: "2023", text: "Front-End Developer Intern & Team Lead, Cybersquare Professional — React.js on production ERP/CRM systems." },
  { year: "2024", text: "AI Mentor, Interval Learning · Operations Lead, NoteAI · Project Management IG Lead, MuLearn." },
  { year: "2025", text: "Campus Lead, TinkerHub · Project Manager, AI+Compassion · Curiosity Coach, iLAB · Grace Hopper Celebration India Scholar." },
  { year: "2026", text: "World Bank Group Youth Summit Delegate · Beyond Borders Fellow · Associate, MuLearn — leading 70+ team members." },
];

const ACHIEVEMENTS = [
  "World Bank Group Youth Summit 2026 — Virtual Delegate, India",
  "Beyond Borders Fellowship 2026 — The Growth Sphere",
  "Grace Hopper Celebration India Scholar — 2025",
  "Excellence Award, NSS MAMOC",
  "Top Project, Tink-Her-Hack 3.0",
  "1st Place, Management Fest — NSKL Education",
  "2nd Place, Code To Eve — illu'μnate 2024",
];

/* ---------------------------------------------------------
   HOOKS
--------------------------------------------------------- */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e) => setReduced(e.matches);
    mq.addEventListener?.("change", fn);
    return () => mq.removeEventListener?.("change", fn);
  }, []);
  return reduced;
}

function useCanHover() {
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);
  return canHover;
}

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function CountUp({ value, suffix = "", duration = 1400 }) {
  const [ref, visible] = useReveal();
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.floor(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, value, duration]);
  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

/* Magnetic button — desktop hover only */
function Magnetic({ children, className = "", style = {}, onClick, as: Tag = "button", ...rest }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const canHover = useCanHover();
  const handleMove = (e) => {
    if (!canHover || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    setPos({ x, y });
  };
  const reset = () => setPos({ x: 0, y: 0 });
  return (
    <Tag
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`cursor-hover ${className}`}
      {...rest}
      style={{
        ...style,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: "transform 0.2s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {children}
    </Tag>
  );
}

/* Spotlight wrapper — radial glow follows cursor within the element */
function Spotlight({ children, className = "", style = {}, ...rest }) {
  const ref = useRef(null);
  const canHover = useCanHover();
  const onMove = (e) => {
    if (!canHover || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };
  return (
    <div ref={ref} className={`spotlight cursor-hover ${className}`} onMouseMove={onMove} style={style} {...rest}>
      {children}
    </div>
  );
}

/* ---------------------------------------------------------
   CUSTOM CURSOR — global follower with hover states
--------------------------------------------------------- */
function CustomCursor({ theme, accent, reduced }) {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const canHover = useCanHover();
  const target = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (!canHover) return;
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
    };
    const onOver = (e) => {
      const hoverEl = e.target.closest?.(".cursor-hover, a, button, .case-card");
      if (hoverEl && ringRef.current) ringRef.current.classList.add("cursor-ring--hover");
    };
    const onOut = (e) => {
      const hoverEl = e.target.closest?.(".cursor-hover, a, button, .case-card");
      if (hoverEl && ringRef.current) ringRef.current.classList.remove("cursor-ring--hover");
    };
    const onDown = () => ringRef.current?.classList.add("cursor-ring--down");
    const onUp = () => ringRef.current?.classList.remove("cursor-ring--down");

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    let raf;
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * (reduced ? 1 : 0.18);
      pos.current.y += (target.current.y - pos.current.y) * (reduced ? 1 : 0.18);
      if (ringRef.current) ringRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, [canHover, reduced]);

  if (!canHover) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ borderColor: `rgba(${theme.cursorLine},0.5)`, "--accent": accent }}
      />
      <div ref={dotRef} className="cursor-dot" style={{ background: accent }} />
    </>
  );
}

/* ---------------------------------------------------------
   NETWORK CANVAS (hero signature element)
--------------------------------------------------------- */
function NetworkCanvas({ reduced, lineRGB, dotRGB, accentSignal, accentSpark }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let nodes = [];
    let w, h;

    const hexToRgb = (hex) => {
      const v = hex.replace("#", "");
      return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)].join(",");
    };
    const signalRGB = hexToRgb(accentSignal);

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = canvas.width = rect.width * devicePixelRatio;
      h = canvas.height = rect.height * devicePixelRatio;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      const count = Math.min(70, Math.floor((rect.width * rect.height) / 14000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
      }));
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) * devicePixelRatio,
        y: (e.clientY - rect.top) * devicePixelRatio,
      };
    };
    const onLeave = () => (mouseRef.current = { x: -9999, y: -9999 });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      const linkDist = 130 * devicePixelRatio;
      const mouseDist = 180 * devicePixelRatio;

      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < linkDist) {
            ctx.strokeStyle = `rgba(${lineRGB},${0.1 * (1 - d / linkDist)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const dm = Math.hypot(nodes[i].x - mx, nodes[i].y - my);
        if (dm < mouseDist) {
          ctx.strokeStyle = `rgba(${signalRGB},${0.5 * (1 - dm / mouseDist)})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mx, my);
          ctx.stroke();
        }
      }
      for (const n of nodes) {
        const dm = Math.hypot(n.x - mx, n.y - my);
        const near = dm < mouseDist;
        ctx.fillStyle = near ? accentSpark : `rgba(${dotRGB},0.6)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, near ? 2.4 * devicePixelRatio : 1.6 * devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced, lineRGB, dotRGB, accentSignal, accentSpark]);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}

/* Small recurring divider glyph — node/line motif used instead of numbering */
function NodeGlyph({ color, line, mid }) {
  return (
    <svg width="40" height="16" viewBox="0 0 40 16" fill="none">
      <line x1="2" y1="8" x2="38" y2="8" stroke={line} strokeWidth="1" />
      <circle cx="2" cy="8" r="2.5" fill={color} />
      <circle cx="20" cy="8" r="2" fill={mid} />
      <circle cx="38" cy="8" r="2.5" fill={color} />
    </svg>
  );
}

/* ---------------------------------------------------------
   ROTATING WORD (hero)
--------------------------------------------------------- */
function RotatingWord({ words, color, interval = 1800 }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);
  return (
    <span style={{ position: "relative", display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
      <span key={i} style={{ display: "inline-block", color, animation: "wordIn 0.55s cubic-bezier(0.16,1,0.3,1)" }}>
        {words[i]}
      </span>
    </span>
  );
}

/* ---------------------------------------------------------
   ANIMATED TIMELINE
--------------------------------------------------------- */
function Timeline({ items, C }) {
  const wrapRef = useRef(null);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    let raf;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height;
        const visible = Math.min(total, Math.max(0, window.innerHeight * 0.8 - rect.top));
        setFill(Math.min(1, Math.max(0, visible / total)));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      <div style={{ position: "absolute", left: 1, top: 2, bottom: 2, width: 1, background: C.line }} />
      <div
        style={{
          position: "absolute", left: 1, top: 2, width: 2, background: C.signal,
          height: `calc(${fill * 100}% - 4px)`, transition: "height 0.1s linear",
          boxShadow: `0 0 8px ${C.signal}`,
        }}
      />
      {items.map((t, i) => {
        const [ref, visible] = useReveal(0.3);
        return (
          <div
            key={t.year}
            ref={ref}
            style={{
              display: "flex", gap: 20, paddingBottom: 32, marginLeft: 6, paddingLeft: 26, position: "relative",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0) scale(1)" : "translateX(-16px) scale(0.97)",
              transition: `opacity 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 60}ms, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 60}ms`,
            }}
          >
            <div
              style={{
                position: "absolute", left: -5, top: 2, width: 9, height: 9, borderRadius: "50%",
                background: visible ? C.signal : C.line,
                transform: visible ? "scale(1.3)" : "scale(1)",
                transition: "background 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.1s",
                boxShadow: visible ? `0 0 0 4px ${C.surface}, 0 0 0 5px ${C.line}` : "none",
              }}
            />
            <div>
              <p className="mono" style={{ color: C.spark, fontSize: 13, marginBottom: 6 }}>{t.year}</p>
              <p style={{ fontSize: 14.5, color: C.muted, lineHeight: 1.6 }}>{t.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------
   MAIN COMPONENT
--------------------------------------------------------- */
export default function Portfolio() {
  const reduced = useReducedMotion();
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("work");
  const [expanded, setExpanded] = useState(0);
  const [progress, setProgress] = useState(0);
  const sectionRefs = useRef({});

  const C = theme === "dark" ? DARK : LIGHT;

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -50% 0px" }
    );
    Object.values(sectionRefs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = useCallback((id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  }, [reduced]);

  const registerSection = (id) => (el) => (sectionRefs.current[id] = el);

  return (
    <div style={{ background: C.void, color: C.text, fontFamily: "'Inter', sans-serif", minHeight: "100vh", transition: "background 0.4s ease, color 0.4s ease" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Caveat:wght@500;600;700&display=swap');
        * { box-sizing: border-box; }
        .disp { font-family: 'Space Grotesk', sans-serif; }
        .mono { font-family: 'IBM Plex Mono', monospace; }
        .cursive { font-family: 'Caveat', cursive; }
        @keyframes wordIn { from { opacity:0; transform: translateY(100%);} to {opacity:1; transform: translateY(0);} }
        @keyframes floatIn { from {opacity:0; transform: translateY(16px);} to {opacity:1; transform: translateY(0);} }
        .navlink { position: relative; }
        .navlink::after { content:''; position:absolute; left:0; bottom:-4px; height:1px; width:0; background:${C.signal}; transition: width .3s cubic-bezier(0.16,1,0.3,1); }
        .navlink:hover::after, .navlink.active::after { width: 100%; }
        .case-card { transition: transform .4s cubic-bezier(0.16,1,0.3,1), border-color .4s; }
        .case-card:hover { transform: translateY(-4px); }
        .spotlight { position: relative; overflow: hidden; }
        .spotlight::before {
          content: ''; position: absolute; inset: 0; pointer-events: none; opacity: 0;
          background: radial-gradient(240px circle at var(--mx,50%) var(--my,50%), ${theme === "dark" ? "rgba(255,90,60,0.12)" : "rgba(225,74,42,0.10)"}, transparent 70%);
          transition: opacity .3s ease;
        }
        .spotlight:hover::before { opacity: 1; }
        ::selection { background: ${C.signal}; color: ${C.void}; }
        html { scroll-behavior: ${reduced ? "auto" : "smooth"}; }
        a, button { font-family: inherit; }
        .badge-track { animation: scrollX 28s linear infinite; }
        @keyframes scrollX { from { transform: translateX(0);} to { transform: translateX(-50%);} }
        .desktop-nav { display: flex; }
        .desktop-cta { display: inline-flex; }
        .mobile-toggle { display: none; }
        .about-grid { grid-template-columns: 1.1fr 1fr; }
        @media (max-width: 767px) {
          .desktop-nav { display: none; }
          .desktop-cta { display: none; }
          .mobile-toggle { display: block; }
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
        /* Custom cursor */
        .cursor-ring, .cursor-dot { display: none; }
        html.has-custom-cursor { cursor: none; }
        html.has-custom-cursor a, html.has-custom-cursor button, html.has-custom-cursor .cursor-hover { cursor: none; }
        html.has-custom-cursor .cursor-ring {
          display: block; position: fixed; top: 0; left: 0; width: 30px; height: 30px;
          border: 1px solid; border-radius: 50%; pointer-events: none; z-index: 9999;
          transition: width .25s cubic-bezier(0.16,1,0.3,1), height .25s cubic-bezier(0.16,1,0.3,1), background .25s, border-color .25s;
        }
        html.has-custom-cursor .cursor-dot {
          display: block; position: fixed; top: 0; left: 0; width: 5px; height: 5px; border-radius: 50%;
          pointer-events: none; z-index: 9999; transition: width .2s, height .2s;
        }
        html.has-custom-cursor .cursor-ring--hover {
          width: 58px; height: 58px;
          background: rgba(255,90,60,0.1);
          border-color: var(--accent);
        }
        html.has-custom-cursor .cursor-ring--down { width: 22px; height: 22px; }
      `}</style>

      <CustomCursor theme={C} accent={C.signal} reduced={reduced} />

      {/* progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, height: 2, width: `${progress * 100}%`, background: C.signal, zIndex: 100, transition: "width 0.1s linear" }} />

      {/* NAV */}
      <header style={{ position: "sticky", top: 0, zIndex: 90, background: theme === "dark" ? "rgba(20,19,16,0.85)" : "rgba(246,242,231,0.85)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${C.line}`, transition: "background 0.4s ease, border-color 0.4s ease" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }); }} className="disp cursor-hover" style={{ fontWeight: 700, fontSize: 18, color: C.text, textDecoration: "none", letterSpacing: -0.5 }}>
            RASHA<span style={{ color: C.signal }}>.</span>
          </a>
          <nav style={{ display: "flex", gap: 18, alignItems: "center" }} className="mono">
            <div className="desktop-nav" style={{ gap: 32, alignItems: "center" }}>
              {NAV.slice(0, -1).map((n) => (
                <button key={n.id} onClick={() => scrollTo(n.id)} className={`navlink cursor-hover ${active === n.id ? "active" : ""}`} style={{ background: "none", border: "none", color: active === n.id ? C.text : C.muted, fontSize: 13, cursor: "pointer", marginRight: 32 }}>
                  {n.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="cursor-hover"
              aria-label="Toggle theme"
              style={{ background: "none", border: `1px solid ${C.line}`, borderRadius: 999, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", color: C.text, cursor: "pointer" }}
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <Magnetic onClick={() => scrollTo("contact")} className="mono desktop-cta" style={{ background: C.signal, color: C.void, border: "none", padding: "9px 18px", borderRadius: 999, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
              Let's Talk
            </Magnetic>
            <button onClick={() => setMenuOpen(true)} className="mobile-toggle cursor-hover" style={{ background: "none", border: "none", color: C.text, cursor: "pointer" }}>
              <Menu size={22} />
            </button>
          </nav>
        </div>
      </header>

      {/* mobile menu */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, background: C.void, zIndex: 200, display: "flex", flexDirection: "column", padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={() => setMenuOpen(false)} style={{ background: "none", border: "none", color: C.text }}><X size={28} /></button>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 24 }}>
            {NAV.map((n, i) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="disp" style={{ background: "none", border: "none", color: C.text, fontSize: 36, textAlign: "left", cursor: "pointer", opacity: 0, animation: `floatIn .5s ${i * 0.08}s forwards` }}>
                {n.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* HERO */}
      <section id="top" style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", overflow: "hidden", borderBottom: `1px solid ${C.line}` }}>
        <NetworkCanvas reduced={reduced} lineRGB={C.cursorLine} dotRGB={C.cursorDot} accentSignal={C.signal} accentSpark={C.spark} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 40%, ${C.void} 100%)` }} />
        <div style={{ position: "relative", maxWidth: 1120, margin: "0 auto", padding: "80px 24px", width: "100%" }}>
          <p className="mono" style={{ color: C.muted, fontSize: 13, letterSpacing: 1, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <MapPin size={14} /> KOZHIKODE, KERALA
          </p>
          <p className="cursive" style={{ fontSize: "1.9rem", color: C.signal, transform: "rotate(-2deg)", display: "inline-block", marginBottom: 4 }}>
            hey, I'm Rasha —
          </p>
          <h1 className="disp" style={{ fontSize: "clamp(2.4rem, 6.5vw, 4.6rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: -1.5, maxWidth: 880 }}>
            I connect <RotatingWord words={["people", "campuses", "teams", "ideas"]} color={C.spark} />.
            <br />
            I build the tech that keeps them connected.
          </h1>
          <p style={{ marginTop: 28, fontSize: 18, color: C.muted, maxWidth: 560, lineHeight: 1.6 }}>
            Currently: Project Manager @ AI+Compassion · Campus Lead @ TinkerHub · Curiosity Coach @ iLAB — coordinating global-scale programs and shipping the tools that run them.
          </p>
          <div style={{ marginTop: 40, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Magnetic onClick={() => scrollTo("work")} className="mono" style={{ background: C.signal, color: C.void, border: "none", padding: "16px 28px", borderRadius: 999, fontSize: 14, fontWeight: 500, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
              See the Work <ArrowRight size={16} />
            </Magnetic>
            <Magnetic onClick={() => scrollTo("contact")} className="mono" style={{ background: "transparent", color: C.text, border: `1px solid ${C.line}`, padding: "16px 28px", borderRadius: 999, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
              Hire Me
            </Magnetic>
          </div>
        </div>
      </section>

      {/* IMPACT STRIP */}
      <section style={{ borderBottom: `1px solid ${C.line}`, background: C.surface, transition: "background 0.4s ease" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "56px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32 }}>
          {IMPACT.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className="disp" style={{ fontSize: "2.6rem", fontWeight: 700, color: C.spark, letterSpacing: -1 }}>
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <div style={{ color: C.muted, fontSize: 14, marginTop: 8, lineHeight: 1.5 }}>{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section id="work" ref={registerSection("work")} style={{ padding: "120px 24px", maxWidth: 1120, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
            <NodeGlyph color={C.signal} line={C.line} mid={C.muted} />
            <span className="mono" style={{ color: C.muted, fontSize: 13, letterSpacing: 1 }}>SELECTED WORK</span>
          </div>
          <h2 className="disp" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, letterSpacing: -1, maxWidth: 640 }}>
            Four programs. Two crafts. One instinct for building things that hold together.
          </h2>
        </Reveal>

        <div style={{ marginTop: 56, display: "flex", flexDirection: "column", gap: 16 }}>
          {CASES.map((c, i) => {
            const isOpen = expanded === i;
            return (
              <Reveal key={c.title} delay={i * 60}>
                <Spotlight
                  className="case-card"
                  style={{ border: `1px solid ${isOpen ? C.signal : C.line}`, borderRadius: 20, padding: "28px 28px", background: C.surface, cursor: "pointer" }}
                  onClick={() => setExpanded(isOpen ? -1 : i)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
                    <div>
                      <span className="mono" style={{ fontSize: 12, color: C.spark, letterSpacing: 0.5 }}>{c.tag}</span>
                      <h3 className="disp" style={{ fontSize: "1.6rem", fontWeight: 600, marginTop: 8, letterSpacing: -0.5 }}>{c.title}</h3>
                      <p style={{ color: C.muted, fontSize: 14, marginTop: 4 }}>{c.role}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, color: C.muted }}>
                      <ArrowUpRight size={22} style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform .35s cubic-bezier(0.16,1,0.3,1)" }} />
                    </div>
                  </div>
                  {!isOpen && <p style={{ marginTop: 16, color: C.muted, fontSize: 15, lineHeight: 1.6 }}>{c.summary}</p>}
                  <div style={{ maxHeight: isOpen ? 640 : 0, opacity: isOpen ? 1 : 0, overflow: "hidden", transition: "max-height .5s cubic-bezier(0.16,1,0.3,1), opacity .4s ease" }}>
                    <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 24, paddingTop: 20, borderTop: `1px solid ${C.line}` }}>
                      <div>
                        <p className="mono" style={{ fontSize: 11, color: C.muted, letterSpacing: 1, marginBottom: 8 }}>CHALLENGE</p>
                        <p style={{ fontSize: 14.5, lineHeight: 1.65, color: C.text }}>{c.challenge}</p>
                      </div>
                      <div>
                        <p className="mono" style={{ fontSize: 11, color: C.muted, letterSpacing: 1, marginBottom: 8 }}>APPROACH</p>
                        <p style={{ fontSize: 14.5, lineHeight: 1.65, color: C.text }}>{c.approach}</p>
                      </div>
                      <div>
                        <p className="mono" style={{ fontSize: 11, color: C.muted, letterSpacing: 1, marginBottom: 8 }}>OUTCOME</p>
                        <p style={{ fontSize: 14.5, lineHeight: 1.65, color: C.text }}>{c.outcome}</p>
                      </div>
                    </div>
                    {c.quote && (
                      <div style={{ marginTop: 24, padding: "20px 24px", borderLeft: `2px solid ${C.signal}`, background: C.surfaceHi, borderRadius: "0 12px 12px 0" }}>
                        <p className="cursive" style={{ fontSize: 22, lineHeight: 1.4, color: C.text }}>"{c.quote.text}"</p>
                        <p className="mono" style={{ fontSize: 12, color: C.muted, marginTop: 12 }}>— {c.quote.name}, {c.quote.role}</p>
                      </div>
                    )}
                  </div>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* APPROACH */}
      <section id="approach" ref={registerSection("approach")} style={{ padding: "100px 24px", background: C.surface, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, transition: "background 0.4s ease" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
              <NodeGlyph color={C.spark} line={C.line} mid={C.muted} />
              <span className="mono" style={{ color: C.muted, fontSize: 13, letterSpacing: 1 }}>HOW I WORK</span>
            </div>
          </Reveal>
          <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
            {APPROACH.map((a, i) => (
              <Reveal key={a.title} delay={i * 90}>
                <Spotlight style={{ paddingTop: 20, borderTop: `1px solid ${C.line}`, borderRadius: 8 }}>
                  <h3 className="disp" style={{ fontSize: "1.3rem", fontWeight: 600, color: i % 2 === 0 ? C.signal : C.spark }}>{a.title}</h3>
                  <p style={{ marginTop: 10, color: C.muted, fontSize: 14.5, lineHeight: 1.65 }}>{a.body}</p>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" ref={registerSection("about")} style={{ padding: "120px 24px", maxWidth: 1120, margin: "0 auto" }}>
        <div className="about-grid" style={{ display: "grid", gap: 64 }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
              <NodeGlyph color={C.signal} line={C.line} mid={C.muted} />
              <span className="mono" style={{ color: C.muted, fontSize: 13, letterSpacing: 1 }}>ABOUT</span>
            </div>
            <h2 className="disp" style={{ fontSize: "clamp(1.6rem,3.4vw,2.2rem)", fontWeight: 700, letterSpacing: -0.5, lineHeight: 1.3, maxWidth: 520 }}>
              I've never wanted to be the person who can organize the room but can't build what's in it.
            </h2>
            <div style={{ marginTop: 24, color: C.muted, fontSize: 15.5, lineHeight: 1.8, maxWidth: 520 }}>
              <p>It started with teaching: helping teachers at Interval Learning rediscover the digital world, and coastal-community students at iLAB build confidence with their first lines of code.</p>
              <p style={{ marginTop: 16 }}>It scaled into coordinating a 30-person team across six continents for AI+Compassion's global relay at Expo 2025 Osaka. And it's grounded, always, in Kerala's own maker culture — reviving a TinkerHub campus chapter, sitting on the Campus Council for 62 campuses, running hackathons for hundreds of students.</p>
              <p style={{ marginTop: 16 }}>Somewhere in between, I still write code — React.js on production systems, a full Flutter e-commerce app from scratch. I believe learning is endless, and technology grows stronger when we share it.</p>
            </div>
          </Reveal>
          <Timeline items={TIMELINE} C={C} />
        </div>

        {/* achievements marquee */}
        <Reveal delay={200}>
          <div style={{ marginTop: 60, overflow: "hidden", borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, padding: "20px 0" }}>
            <div className="badge-track" style={{ display: "flex", gap: 40, width: "max-content" }}>
              {[...ACHIEVEMENTS, ...ACHIEVEMENTS].map((a, i) => (
                <span key={i} className="mono" style={{ fontSize: 13, color: C.muted, whiteSpace: "nowrap" }}>
                  {a} <span style={{ color: C.signal, margin: "0 8px" }}>◆</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* CONTACT */}
      <section id="contact" ref={registerSection("contact")} style={{ padding: "140px 24px", background: C.surface, borderTop: `1px solid ${C.line}`, transition: "background 0.4s ease" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <p className="cursive" style={{ color: C.signal, fontSize: 26, transform: "rotate(-1.5deg)", display: "inline-block" }}>let's build something</p>
            <h2 className="disp" style={{ fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 700, letterSpacing: -1, lineHeight: 1.15, marginTop: 8 }}>
              Building a community? Need someone who can ship the product for it too?
            </h2>
            <p style={{ marginTop: 20, color: C.muted, fontSize: 16 }}>Currently open to community program leadership, EdTech/social impact projects, and front-end development work.</p>
            <div style={{ marginTop: 40, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Magnetic as="a" href="mailto:rashahasoon923@gmail.com" style={{ background: C.signal, color: C.void, textDecoration: "none", padding: "16px 32px", borderRadius: 999, fontWeight: 500, fontSize: 15, display: "inline-flex", alignItems: "center", gap: 8 }} className="mono">
                <Mail size={16} /> rashahasoon923@gmail.com
              </Magnetic>
            </div>
            <div style={{ marginTop: 32, display: "flex", gap: 24, justifyContent: "center" }}>
              <a href="https://www.linkedin.com/in/rasha-hasoon/" target="_blank" rel="noreferrer" className="cursor-hover" style={{ color: C.muted }}><Linkedin size={20} /></a>
              <a href="#" className="cursor-hover" style={{ color: C.muted }}><Github size={20} /></a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "32px 24px", borderTop: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span className="cursive" style={{ fontSize: 22, color: C.text }}>Rasha Hasoon</span>
          <span className="mono" style={{ fontSize: 12, color: C.muted }}>Kozhikode, Kerala, India</span>
        </div>
      </footer>
    </div>
  );
}
