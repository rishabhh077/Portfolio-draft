(() => {
  // ../../home/claude/repo/js/utils.js
  var $ = (s, r = document) => r.querySelector(s);
  var $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  var sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  var clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  var lerp = (a, b, t) => a + (b - a) * t;
  var damp = (a, b, k, dt) => lerp(a, b, 1 - Math.exp(-k * dt));
  var mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var mqFine = window.matchMedia("(hover: hover) and (pointer: fine)");
  var reduced = () => mqReduce.matches;
  var isSmall = () => window.innerWidth < 760;
  var esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  var ARROW = '<svg class="arr" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ARROW_UR = '<svg class="arr" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var app = { scene: null, lenis: null, mini: null, accent: "cyan", pointer: { x: -100, y: -100 }, peekOn: false, parallax: [], tls: [], phases: [] };

  // ../../home/claude/repo/js/data.js
  var SITE = {
    name: "Rishabh Prajapati",
    email: "rishabhprajapati2606@gmail.com",
    phone: "+919990448155",
    phoneLabel: "+91 99904 48155",
    location: "South Delhi, India",
    linkedin: "https://www.linkedin.com/in/rishabhh077",
    linkedinLabel: "linkedin.com/in/rishabhh077",
    github: "https://github.com/rishabhh077",
    githubLabel: "github.com/rishabhh077",
    live: "https://rishabhh077.github.io/Portfolio-draft/"
  };
  var NAV = [
    { path: "/", label: "Home", key: "home" },
    { path: "/about", label: "About", key: "about" },
    { path: "/skills", label: "Skills", key: "skills" },
    { path: "/projects", label: "Projects", key: "projects" },
    { path: "/certifications", label: "Certifications", key: "certifications" },
    { path: "/experience", label: "Journey", key: "experience" },
    { path: "/contact", label: "Contact", key: "contact" }
  ];
  var ACCENTS = {
    cyan: ["#43E0FF", "67,224,255", 4448511],
    blue: ["#4F6BFF", "79,107,255", 5204991],
    violet: ["#9A6BFF", "154,107,255", 10120191],
    green: ["#3DF2A4", "61,242,164", 4059812]
  };
  var PROJECTS = [
    {
      slug: "phishing-website-detection",
      n: "01",
      title: "Phishing Website Detection",
      accent: "violet",
      vis: "scan",
      blurb: "A machine-learning tool that flags phishing websites from their URLs, at about 91% accuracy.",
      overview: "A machine-learning tool that detects phishing websites by analyzing their URLs. I trained and tested it on over 400,000 real URLs and shipped it both as a live Streamlit web app and as a command-line tool.",
      tech: ["Python", "scikit-learn", "Streamlit"],
      facts: ["Classifies a website as phishing or legitimate from its URL", "Trained and tested on 400,000+ real URLs", "About 91% accuracy", "Shipped as a Streamlit web app and a CLI"],
      github: "https://github.com/rishabhh077/phishing-website-detection",
      live: "https://rishabhh-phishing.streamlit.app",
      liveLabel: "Live demo",
      alt: "Illustration: a list of URLs being scanned and flagged, with an accuracy gauge"
    },
    {
      slug: "password-vault",
      n: "02",
      title: "Password Vault",
      accent: "green",
      vis: "vault",
      blurb: "A client-side password manager that encrypts credentials with AES-256-GCM in the browser.",
      overview: "A password manager that runs entirely in the browser. Credentials are encrypted with AES-256-GCM using a key derived from the master password with PBKDF2, so nothing readable ever leaves the device.",
      tech: ["JavaScript", "Web Crypto API"],
      facts: ["AES-256-GCM encryption with PBKDF2 key derivation (600K iterations)", "Key wrapping with a recovery key", "5-minute auto-lock", "Cryptographically secure password generator"],
      github: "https://github.com/rishabhh077/password_manager",
      live: "https://rishabhh077.github.io/password_manager/",
      liveLabel: "Live demo",
      alt: "Illustration: a padlock beside a list of masked saved passwords"
    },
    {
      slug: "password-strength-analyzer",
      n: "03",
      title: "Password Strength Analyzer & Breach Checker",
      accent: "cyan",
      vis: "meter",
      blurb: "Scores passwords 0 to 100 in real time and checks whether they appear in known data breaches.",
      overview: "A real-time password analyzer that scores passwords from 0 to 100 by effective entropy instead of simple rules. It also checks, without ever sending the password, whether it has appeared in known data breaches.",
      tech: ["JavaScript", "Web Crypto API", "HIBP API"],
      facts: ["Real-time 0 to 100 score based on effective entropy", "Detects sequences, leetspeak and personal details", "Privacy-safe breach check against Have I Been Pwned"],
      github: "https://github.com/rishabhh077/password_strength_analyzer_breach",
      live: "https://rishabhh077.github.io/password_strength_analyzer_breach/",
      liveLabel: "Live demo",
      alt: "Illustration: a masked password field above a strength meter and checklist"
    },
    {
      slug: "college-query-chatbot",
      n: "04",
      title: "College Query Chatbot (RAG)",
      accent: "violet",
      vis: "rag",
      blurb: "A RAG chatbot that answers student questions from LIET website documents and cites its sources.",
      overview: "A retrieval-augmented chatbot for students at LIET. It answers questions using the college's own website documents and cites the sources behind every answer, so replies stay grounded instead of made up.",
      tech: ["Python", "Gemini API", "NumPy", "Streamlit"],
      facts: ["Answers student questions from LIET website documents", "Cites sources in each answer", "Document chunking and Gemini embeddings", "NumPy cosine-similarity retrieval and grounded answer generation"],
      github: "https://github.com/rishabhh077/college-chatbot",
      live: "https://liet-chatbot.streamlit.app",
      liveLabel: "Live demo",
      alt: "Illustration: documents flowing through an embedding step into a cited chat answer"
    },
    {
      slug: "bluenexus",
      n: "05",
      title: "BlueNexus, Smart India Hackathon 2026",
      accent: "blue",
      vis: "globe",
      blurb: "Team project: a 3D platform that visualizes real INCOIS ocean data and Argo float observations.",
      overview: "A team project for Smart India Hackathon 2026. BlueNexus is a 3D platform that visualizes real ocean data from INCOIS, including Argo float and glider observations. I built the frontend and contributed to the FastAPI backend.",
      tech: ["React", "TypeScript", "Three.js", "FastAPI"],
      facts: ["Built the 3D frontend in React, TypeScript and Three.js", "Visualizes real INCOIS ocean data and Argo float/glider observations", "Contributed to the FastAPI REST backend and design", "Deployed on Vercel"],
      github: "https://github.com/rishabhh077/BlueNexus-SIH-2026",
      live: "https://bluenexus-sih-2026.vercel.app",
      liveLabel: "Live demo",
      alt: "Illustration: a wireframe globe with ocean data points and wave lines"
    },
    {
      slug: "wordlist-generator",
      n: "06",
      title: "Wordlist Generator (Word Pattern Lab)",
      accent: "green",
      vis: "list",
      blurb: "A browser tool that generates password-pattern variations for password-awareness training.",
      overview: "A browser tool that takes a base word and generates the predictable variations people often use as passwords. It is built for password-awareness training, to show how quickly a 'clever' password can be guessed.",
      tech: ["HTML", "CSS", "JavaScript"],
      facts: ["Generates password-pattern variations from a base word", "Built for password-awareness training", "Exports the list as a .txt file", "Runs fully in the browser"],
      github: "https://github.com/rishabhh077/wordlist_generator_tool",
      live: "https://rishabhh077.github.io/wordlist_generator_tool/",
      liveLabel: "Live demo",
      alt: "Illustration: a base word expanding into a list of pattern variations"
    }
  ];
  var SKILL_GROUPS = {
    web: "Web",
    backend: "Languages & tools",
    ai: "AI & ML",
    security: "Security"
  };
  var SKILLS = [
    { name: "HTML/CSS", group: "web", desc: "Used across my browser tools, including the Wordlist Generator and this portfolio." },
    { name: "JavaScript", group: "web", desc: "Powers the Password Vault, the Password Strength Analyzer and the Wordlist Generator." },
    { name: "TypeScript", group: "web", desc: "Used with React for the BlueNexus frontend at Smart India Hackathon 2026." },
    { name: "React", group: "web", desc: "Built the BlueNexus frontend, a 3D ocean-data platform." },
    { name: "Three.js", group: "web", desc: "3D visualization of ocean data in BlueNexus, and the 3D scenes on this site." },
    { name: "Python", group: "backend", desc: "My main language for ML and AI: the Phishing Website Detection tool and the RAG chatbot." },
    { name: "C", group: "backend", desc: "Part of my B.Tech coursework and programming foundations." },
    { name: "SQL (MySQL)", group: "backend", desc: "Relational databases and queries with MySQL (basic)." },
    { name: "FastAPI", group: "backend", desc: "Contributed to the FastAPI REST backend for BlueNexus." },
    { name: "Git & Linux", group: "backend", desc: "Everyday tools for version control and working on the command line (basic)." },
    { name: "scikit-learn", group: "ai", desc: "Trained the phishing URL classifier on 400,000+ URLs, reaching about 91% accuracy." },
    { name: "RAG & Gemini", group: "ai", desc: "Chunking, Gemini embeddings and cosine-similarity retrieval in the College Query Chatbot." },
    { name: "Streamlit", group: "ai", desc: "Deployed the phishing detector and the college chatbot as live web apps." },
    { name: "Cryptography", group: "security", desc: "AES-GCM, PBKDF2 and SHA hashing, applied in the Password Vault and the breach checker." },
    { name: "Phishing detection", group: "security", desc: "Built an ML phishing detector, plus the Mastercard phishing job simulation." },
    { name: "Nmap", group: "security", desc: "Network scanning and reconnaissance basics." },
    { name: "IAM", group: "security", desc: "Identity and access management fundamentals, from the Tata IAM job simulation." },
    { name: "AppSec & Cloud", group: "security", desc: "Certified AppSec, Network Security and Cloud Security (AWS) Practitioner, The SecOps Group, Oct 2025." }
  ];
  var FEATURED = [
    { year: "2026", role: "Cyber Security Analyst Intern", org: "Thiranex, remote, Jul to Aug 2026" },
    { year: "2026", role: "Ethical Hacking & Cybersecurity Intern", org: "VaultofCodes, via the AICTE National Internship Portal" },
    { year: "2025", role: "Tech Contributor", org: "GirlScript Summer of Code (GSSoC) 2025" },
    { year: "2025", role: "Super Contributor", org: "Hacktoberfest 2025 (DigitalOcean)" }
  ];
  var ARCHIVE = [
    { year: "2026", items: [
      { d: "Aug 2026", t: "Ethical Hacking with AI, Unstop", k: "Course" },
      { d: "Aug 2026", t: "MongoDB Basics", k: "Database" },
      { d: "Jun to Jul 2026", t: "Cybersecurity Job Simulation, Tata (IAM), via Forage", k: "Simulation" },
      { d: "Jun to Jul 2026", t: "Cybersecurity Job Simulation, Mastercard (Phishing), via Forage", k: "Simulation" },
      { d: "Jun to Jul 2026", t: "Cyber Job Simulation, Deloitte, via Forage", k: "Simulation" },
      { d: "Jun 2026", t: "Technology Risk Virtual Job Simulation, EY", k: "Simulation" }
    ] },
    { year: "2025", items: [
      { d: "Oct 2025", t: "Certified AppSec Practitioner (CAP), The SecOps Group", k: "Security" },
      { d: "Oct 2025", t: "Certified Network Security Practitioner (CNSP), The SecOps Group", k: "Security" },
      { d: "Oct 2025", t: "Certified Cloud Security Practitioner, AWS (CCSP-AWS), The SecOps Group", k: "Security" },
      { d: "Jul 2025", t: "AI Appreciate 2025", k: "AI" },
      { d: "Jul 2025", t: "AI Aware 2025", k: "AI" }
    ] }
  ];
  var ORBIT = {
    web: {
      label: "WEB",
      title: "Web",
      color: 4448511,
      css: "cyan",
      text: "Browser tools built with JavaScript and the Web Crypto API, like the Password Vault and the breach checker, plus a React and Three.js frontend for BlueNexus."
    },
    ai: {
      label: "AI",
      title: "AI",
      color: 10120191,
      css: "violet",
      text: "A phishing URL classifier trained on 400,000+ URLs with scikit-learn, and a RAG chatbot that answers from real documents using Gemini embeddings."
    },
    sec: {
      label: "SECURITY",
      title: "Security",
      color: 4059812,
      css: "green",
      text: "My B.Tech specialization. Two cybersecurity internships, SecOps Group AppSec, network and cloud certifications, and job simulations with Tata, Mastercard, Deloitte and EY."
    }
  };
  var ROLES = ["Cybersecurity Student", "Security Tool Builder", "Python & ML Developer", "Web Developer"];

  // ../../home/claude/repo/js/reveal.js
  function splitWords(el) {
    if (!el || el.dataset.split) return;
    const text = el.textContent.replace(/\s+/g, " ").trim();
    el.dataset.split = "w";
    let i = 0;
    el.innerHTML = '<span class="sr">' + esc(text) + "</span>" + text.split(" ").map((w) => `<span class="w" aria-hidden="true"><span class="wi" style="--i:${i++}">${esc(w)}</span></span>`).join(" ");
  }
  function splitChars(el, withSr) {
    if (!el || el.dataset.split) return;
    const text = el.textContent.trim();
    const base = parseInt(el.dataset.base || "0", 10);
    el.dataset.split = "c";
    let i = base;
    el.innerHTML = (withSr ? '<span class="sr">' + esc(text) + "</span>" : "") + text.split(" ").map((w) => `<span class="wd" aria-hidden="true">${[...w].map((c) => `<span class="ch"><span class="chi" style="--i:${i++}">${esc(c)}</span></span>`).join("")}</span>`).join(" ");
  }
  var revealIO = null;
  function initReveals() {
    if (revealIO) revealIO.disconnect();
    const els = $$("[data-reveal]:not(.in)");
    if (!("IntersectionObserver" in window) || reduced()) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    revealIO = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          revealIO.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach((e) => revealIO.observe(e));
  }
  function setAccent(name) {
    if (!ACCENTS[name]) return;
    app.accent = name;
    const root = document.documentElement.style;
    root.setProperty("--accent", ACCENTS[name][0]);
    root.setProperty("--accent-rgb", ACCENTS[name][1]);
    if (app.scene && app.scene.ok) app.scene.setAccent(name);
  }
  var accentIO = null;
  function initAccents(defaultAccent) {
    if (accentIO) accentIO.disconnect();
    const live = /* @__PURE__ */ new Set();
    const els = $$("[data-accent]");
    if (!els.length || !("IntersectionObserver" in window)) return;
    accentIO = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        en.target.classList.toggle("on", en.isIntersecting);
        if (en.isIntersecting) live.add(en.target);
        else live.delete(en.target);
      });
      const last = Array.from(live).pop();
      setAccent(last ? last.dataset.accent : defaultAccent);
    }, { threshold: 0.6, rootMargin: "-15% 0px -15% 0px" });
    els.forEach((e) => {
      accentIO.observe(e);
      e.addEventListener("pointerenter", () => {
        setAccent(e.dataset.accent);
        if (app.scene && app.scene.ok) app.scene.pulse(1);
      });
    });
  }
  function disposeReveals() {
    if (revealIO) revealIO.disconnect();
    if (accentIO) accentIO.disconnect();
  }

  // ../../home/claude/repo/js/cursor.js
  var cursorTick = () => {
  };
  function initCursor() {
    if (!mqFine.matches) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");
    const dot = $("#cDot"), ring = $("#cRing"), label = $("#cLabel"), peek = $("#peek");
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, px = x, py = y, shown = false, state = "";
    const STATES = ["cur-link", "cur-view", "cur-drag", "cur-magnet"];
    const setState = (cls, text) => {
      if (cls === state) return;
      state = cls;
      STATES.forEach((c) => root.classList.toggle(c, c === cls));
      if (text) label.textContent = text;
    };
    addEventListener("pointermove", (e) => {
      if (e.pointerType === "touch") return;
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        shown = true;
        rx = px = x;
        ry = py = y;
        root.classList.add("cur-on");
      }
    }, { passive: true });
    document.addEventListener("pointerleave", () => root.classList.remove("cur-on"));
    document.addEventListener("pointerenter", () => {
      if (shown) root.classList.add("cur-on");
    });
    addEventListener("pointerdown", () => root.classList.add("cur-down"), { passive: true });
    addEventListener("pointerup", () => root.classList.remove("cur-down"), { passive: true });
    document.addEventListener("pointerover", (e) => {
      const t = e.target.closest ? e.target.closest("[data-cursor],[data-magnet],a,button") : null;
      if (!t) {
        setState("");
        return;
      }
      const kind = t.dataset.cursor;
      if (kind === "view") setState("cur-view", "VIEW");
      else if (kind === "drag") setState("cur-drag", "DRAG");
      else if (t.hasAttribute("data-magnet")) setState("cur-magnet");
      else setState("cur-link");
      if (kind && app.scene && app.scene.ok) app.scene.pulse(0.5);
    }, { passive: true });
    cursorTick = (dt) => {
      if (!shown) return;
      const k = reduced() ? 1 : 1 - Math.exp(-26 * dt);
      rx += (x - rx) * k;
      ry += (y - ry) * k;
      dot.style.transform = `translate3d(${x}px,${y}px,0)`;
      ring.style.transform = `translate3d(${rx.toFixed(2)}px,${ry.toFixed(2)}px,0)`;
      if (app.peekOn) {
        const pk = 1 - Math.exp(-14 * dt);
        px += (x - px) * pk;
        py += (y - py) * pk;
        peek.style.transform = `translate3d(${(px + 28).toFixed(1)}px,${(py - peek.offsetHeight / 2).toFixed(1)}px,0)`;
      }
    };
  }

  // ../../home/claude/repo/js/scroll.js
  var frame = { sy: 0, vh: window.innerHeight, lastProg: -1 };
  function measure() {
    const sy = window.scrollY || 0;
    frame.vh = window.innerHeight;
    const box = (el) => {
      const r = el.getBoundingClientRect();
      return { top: r.top + sy, h: r.height };
    };
    app.parallax.forEach((p) => Object.assign(p, box(p.box), { last: "" }));
    app.tls.forEach((t) => Object.assign(t, box(t.el), { last: -1 }));
    app.phases.forEach((ph) => Object.assign(ph, { m: box(ph.el), on: null }));
  }
  var measureT = 0;
  function scheduleMeasure() {
    clearTimeout(measureT);
    measureT = setTimeout(measure, 120);
  }
  function collectScrollTargets() {
    app.parallax = $$("[data-px],[data-py]").map((el) => ({
      el,
      box: el.parentElement,
      px: parseFloat(el.dataset.px || "0"),
      py: parseFloat(el.dataset.py || "0")
    }));
    app.tls = $$(".tl").map((el) => ({ el, fill: $(".tl__fill", el) }));
    app.phases = $$(".phase").map((el) => ({ el }));
    measure();
    if (reduced()) {
      app.tls.forEach((t) => {
        t.fill.style.transform = "scaleY(1)";
      });
      app.phases.forEach((ph) => ph.el.classList.add("on"));
    }
  }
  function scrollFrame() {
    const y = window.scrollY || 0, vh = frame.vh;
    frame.sy = app.lenis || reduced() ? y : lerp(frame.sy, y, 0.22);
    const max = Math.max(1, document.documentElement.scrollHeight - vh);
    const prog = clamp(y / max, 0, 1);
    if (Math.abs(prog - frame.lastProg) > 3e-4) {
      frame.lastProg = prog;
      $("#progress").style.transform = `scaleX(${prog.toFixed(4)})`;
    }
    if (app.scene && app.scene.ok) app.scene.scroll = frame.sy;
    if (reduced()) return;
    for (const p of app.parallax) {
      const rel = (p.top + p.h / 2 - y - vh / 2) / vh;
      if (rel < -1.6 || rel > 1.6) continue;
      const v = `translate3d(${(p.px * rel * -9).toFixed(2)}vw,${(p.py * rel * 60).toFixed(1)}px,0)`;
      if (v !== p.last) {
        p.last = v;
        p.el.style.transform = v;
      }
    }
    for (const t of app.tls) {
      const v = clamp((vh * 0.65 - (t.top - y)) / t.h, 0, 1);
      if (Math.abs(v - t.last) > 1e-3) {
        t.last = v;
        t.fill.style.transform = `scaleY(${v.toFixed(3)})`;
      }
    }
    for (const ph of app.phases) {
      const top = ph.m.top - y, on = top < vh * 0.55 && top + ph.m.h > vh * 0.45;
      if (on !== ph.on) {
        ph.on = on;
        ph.el.classList.toggle("on", on);
      }
    }
  }

  // ../../home/claude/repo/js/three/scene.js
  var _sprite = null;
  function makeSprite() {
    if (_sprite) return _sprite;
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d");
    if (g) {
      const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grd.addColorStop(0, "rgba(255,255,255,1)");
      grd.addColorStop(0.25, "rgba(255,255,255,.55)");
      grd.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = grd;
      g.fillRect(0, 0, 64, 64);
    }
    _sprite = new THREE.CanvasTexture(c);
    return _sprite;
  }
  var LAYOUT = {
    home: { x: 3.5, y: 0.1, s: 1.35, op: 1, grid: 0.12, part: 0.85 },
    about: { x: -3.9, y: -0.2, s: 1.1, op: 0.5, grid: 0.08, part: 0.6 },
    skills: { x: 0, y: 0, s: 2.6, op: 0.1, grid: 0.05, part: 0.4 },
    projects: { x: 4.8, y: 0.6, s: 0.9, op: 0.32, grid: 0.08, part: 0.5 },
    detail: { x: 4.2, y: 0.2, s: 1.05, op: 0.34, grid: 0.08, part: 0.5 },
    certifications: { x: -4.4, y: 0.4, s: 0.95, op: 0.3, grid: 0.08, part: 0.5 },
    experience: { x: 4.4, y: -0.3, s: 1, op: 0.3, grid: 0.08, part: 0.5 },
    contact: { x: 0, y: 0, s: 2.1, op: 0.24, grid: 0.1, part: 0.7 }
  };
  var Scene = class {
    constructor(canvas) {
      this.ok = false;
      this.canvas = canvas;
      this.t = 0;
      this.energy = 0;
      this.half = false;
      this.fr = 0;
      this.scroll = 0;
      this.key = "home";
      this.mouse = { x: 0, y: 0, sx: 0, sy: 0 };
      if (typeof THREE === "undefined") return;
      try {
        this.r = new THREE.WebGLRenderer({ canvas, antialias: !isSmall(), alpha: true, powerPreference: "high-performance" });
      } catch {
        return;
      }
      this.ok = true;
      this.r.setClearColor(0, 0);
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.Fog(395019, 9, 26);
      this.cam = new THREE.PerspectiveCamera(50, 1, 0.1, 60);
      this.cam.position.set(0, 0, 8);
      this.colors = {};
      Object.keys(ACCENTS).forEach((k) => {
        this.colors[k] = new THREE.Color(ACCENTS[k][2]);
      });
      this.col = this.colors.cyan.clone();
      this.colT = this.colors.cyan.clone();
      this.build();
      this.cur = Object.assign({}, LAYOUT.home);
      this.tgt = Object.assign({}, LAYOUT.home);
      this.resize();
      addEventListener("resize", () => this.resize());
      addEventListener("pointermove", (e) => {
        this.mouse.x = e.clientX / innerWidth * 2 - 1;
        this.mouse.y = e.clientY / innerHeight * 2 - 1;
      }, { passive: true });
      this.last = performance.now();
      this.acc = 0;
      this.n = 0;
    }
    build() {
      const T = THREE, sprite = makeSprite(), small = isSmall();
      this.core = new T.Group();
      this.scene.add(this.core);
      const ico = new T.IcosahedronGeometry(1.6, 1);
      this.outerMat = new T.LineBasicMaterial({ color: 4448511, transparent: true, opacity: 0.5 });
      this.outer = new T.LineSegments(new T.WireframeGeometry(ico), this.outerMat);
      this.innerMat = new T.LineBasicMaterial({ color: 10120191, transparent: true, opacity: 0.6 });
      this.inner = new T.LineSegments(new T.WireframeGeometry(new T.OctahedronGeometry(0.85, 0)), this.innerMat);
      const pos = ico.attributes.position, seen = /* @__PURE__ */ new Map(), verts = [];
      for (let i = 0; i < pos.count; i++) {
        const key = pos.getX(i).toFixed(3) + "," + pos.getY(i).toFixed(3) + "," + pos.getZ(i).toFixed(3);
        if (!seen.has(key)) {
          seen.set(key, 1);
          verts.push(pos.getX(i), pos.getY(i), pos.getZ(i));
        }
      }
      const ng = new T.BufferGeometry();
      ng.setAttribute("position", new T.Float32BufferAttribute(verts, 3));
      this.nodeMat = new T.PointsMaterial({ map: sprite, size: 0.34, transparent: true, depthWrite: false, blending: T.AdditiveBlending, color: 4448511, opacity: 0.95 });
      this.nodes = new T.Points(ng, this.nodeMat);
      const ringGeo = (r) => {
        const pts = [];
        for (let i = 0; i < 120; i++) {
          const a = i / 120 * Math.PI * 2;
          pts.push(new T.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r));
        }
        return new T.BufferGeometry().setFromPoints(pts);
      };
      this.ringMat = new T.LineBasicMaterial({ color: 4448511, transparent: true, opacity: 0.22 });
      this.ring1 = new T.LineLoop(ringGeo(2.5), this.ringMat);
      this.ring1.rotation.set(1.1, 0, 0.3);
      this.ring2 = new T.LineLoop(ringGeo(3.1), this.ringMat);
      this.ring2.rotation.set(0.4, 0, -0.9);
      this.core.add(this.outer, this.inner, this.nodes, this.ring1, this.ring2);
      const N = small ? 380 : 900, arr = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        arr[i * 3] = (Math.random() - 0.5) * 24;
        arr[i * 3 + 1] = (Math.random() - 0.5) * 15;
        arr[i * 3 + 2] = -9 + Math.random() * 15;
      }
      const pg = new T.BufferGeometry();
      pg.setAttribute("position", new T.BufferAttribute(arr, 3));
      this.partMat = new T.PointsMaterial({ map: sprite, size: 0.1, transparent: true, depthWrite: false, blending: T.AdditiveBlending, color: 10465535, opacity: 0.6 });
      this.parts = new T.Points(pg, this.partMat);
      this.scene.add(this.parts);
      this.grid = new T.GridHelper(48, 48, 2832988, 1845056);
      this.grid.position.y = -3.4;
      this.grid.material.transparent = true;
      this.grid.material.opacity = 0.1;
      this.scene.add(this.grid);
    }
    apply(key) {
      this.key = key;
      const base = LAYOUT[key] || LAYOUT.about;
      const t = Object.assign({}, base);
      if (this.cam.aspect < 1.05) {
        t.x = 0;
        t.y = key === "home" ? 1.7 : 2.4;
        t.s = base.s * (key === "home" ? 0.62 : 0.5);
        t.op = base.op * 0.75;
        t.part = base.part * 0.8;
        if (key === "skills" || key === "contact") {
          t.y = 0;
          t.s = base.s * 0.5;
        }
      }
      this.tgt = t;
    }
    setRoute(key) {
      this.apply(key);
      if (reduced()) this.snap();
    }
    setAccent(name) {
      if (!this.colors[name]) return;
      this.colT.copy(this.colors[name]);
      if (reduced()) {
        this.col.copy(this.colT);
        this.draw(0, 0);
      }
    }
    pulse(v) {
      this.energy = Math.min(1.6, this.energy + (v || 1));
    }
    resize() {
      const w = innerWidth, h = innerHeight;
      this.r.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.maxPR || (isSmall() ? 1.25 : 1.5)));
      this.r.setSize(w, h, false);
      this.cam.aspect = w / h;
      this.cam.updateProjectionMatrix();
      this.apply(this.key);
      if (reduced()) this.snap();
    }
    snap() {
      if (this.tgt) {
        this.cur = Object.assign({}, this.tgt);
        this.col.copy(this.colT);
        this.draw(0, 0);
      }
    }
    /* called by the master loop. Also self-tunes: if the GPU struggles, drop to
       1x pixel ratio and halve the particles. */
    frame(now) {
      if (document.hidden) {
        this.last = now;
        return;
      }
      if (reduced()) return;
      if (this.half && this.fr++ & 1) return;
      const dt = Math.min(0.05, (now - this.last) / 1e3 || 0.016);
      this.last = now;
      this.t += dt;
      if (!this.lowq && !this.half) {
        this.acc += dt;
        this.n++;
        if (this.n === 90) {
          if (this.acc / this.n > 0.026) {
            this.lowq = true;
            this.maxPR = 1;
            this.resize();
            const g = this.parts.geometry;
            g.setDrawRange(0, Math.floor(g.attributes.position.count * 0.5));
          }
          this.acc = 0;
          this.n = 0;
        }
      }
      this.draw(dt, this.t);
    }
    draw(dt, t) {
      const c = this.cur, g = this.tgt, m = this.mouse;
      ["x", "y", "z", "s", "op", "grid", "part"].forEach((k) => {
        if (g[k] !== void 0) c[k] = damp(c[k] === void 0 ? g[k] : c[k], g[k], 3, dt || 1);
      });
      m.sx = damp(m.sx, m.x, 4, dt || 1);
      m.sy = damp(m.sy, m.y, 4, dt || 1);
      this.energy = damp(this.energy, 0, 2.2, dt || 1);
      this.col.lerp(this.colT, 1 - Math.exp(-4 * (dt || 1)));
      const e = this.energy, sc = c.s * (1 + e * 0.1);
      this.core.position.set(c.x, c.y + clamp(this.scroll * 16e-4, 0, 3.5), c.z || 0);
      this.core.scale.setScalar(sc * (1 - clamp(this.scroll * 5e-5, 0, 0.2)));
      this.core.rotation.y = t * 0.12 + m.sx * 0.55 + this.scroll * 13e-4 + e * 0.4;
      this.core.rotation.x = t * 0.07 + m.sy * 0.35 + this.scroll * 5e-4;
      this.inner.rotation.y = -t * 0.3;
      this.inner.rotation.x = t * 0.2;
      this.ring1.rotation.z = 0.3 + t * 0.12;
      this.ring2.rotation.z = -0.9 - t * 0.09;
      this.outerMat.color.copy(this.col);
      this.outerMat.opacity = (0.5 + e * 0.2) * c.op;
      this.innerMat.color.copy(this.col).offsetHSL(0.14, 0, 0);
      this.innerMat.opacity = 0.6 * c.op;
      this.nodeMat.color.copy(this.col);
      this.nodeMat.opacity = 0.95 * c.op;
      this.ringMat.color.copy(this.col);
      this.ringMat.opacity = 0.22 * c.op;
      this.partMat.opacity = 0.6 * c.part;
      this.parts.rotation.y = t * 0.012 + m.sx * 0.06;
      this.parts.rotation.x = m.sy * 0.03;
      this.parts.position.y = clamp(this.scroll * 9e-4, 0, 4);
      this.grid.material.opacity = c.grid;
      this.grid.position.z = this.scroll * 4e-3 % 1;
      this.cam.position.x = damp(this.cam.position.x, m.sx * 0.6, 3, dt || 1);
      this.cam.position.y = damp(this.cam.position.y, -m.sy * 0.35, 3, dt || 1);
      this.cam.lookAt(0, 0, 0);
      this.r.render(this.scene, this.cam);
    }
  };
  var Mini = class {
    constructor(wrap, canvas, build, opts) {
      this.wrap = wrap;
      this.canvas = canvas;
      this.ok = false;
      this.t = 0;
      this.opts = opts || {};
      this.pointer = { x: 0, y: 0, sx: 0, sy: 0 };
      this.visible = true;
      this.dead = false;
      this.cleanup = [];
      if (typeof THREE === "undefined") return;
      try {
        this.r = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      } catch {
        return;
      }
      this.ok = true;
      this.scene = new THREE.Scene();
      this.cam = new THREE.PerspectiveCamera(45, 1, 0.1, 60);
      this.baseZ = this.opts.z || 9;
      this.cam.position.set(0, 0, this.baseZ);
      this.resize();
      this.io = new IntersectionObserver((es) => {
        this.visible = es[0].isIntersecting;
        if (app.scene && app.scene.ok) app.scene.half = this.visible;
      });
      this.io.observe(wrap);
      this.ro = new ResizeObserver(() => this.resize());
      this.ro.observe(wrap);
      const mv = (e) => {
        const r = wrap.getBoundingClientRect();
        this.pointer.x = (e.clientX - r.left) / r.width * 2 - 1;
        this.pointer.y = (e.clientY - r.top) / r.height * 2 - 1;
      };
      const lv = () => {
        this.pointer.x = 0;
        this.pointer.y = 0;
      };
      wrap.addEventListener("pointermove", mv);
      wrap.addEventListener("pointerleave", lv);
      this.api = build(this);
      this.last = performance.now();
    }
    resize() {
      if (!this.ok) return;
      const w = Math.max(1, this.wrap.clientWidth), h = Math.max(1, this.wrap.clientHeight);
      this.w = w;
      this.h = h;
      this.r.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSmall() ? 1.25 : 1.5));
      this.r.setSize(w, h, false);
      this.cam.aspect = w / h;
      const f = this.cam.aspect < 1 ? clamp(1 / (this.cam.aspect * 1.1), 1, 1.8) : 1;
      this.cam.position.z = this.baseZ * f;
      this.cam.updateProjectionMatrix();
      if (this.api && this.api.update) this.api.update(0, this.t);
      if (this.r && this.scene) this.r.render(this.scene, this.cam);
    }
    frame(now) {
      if (this.dead || !this.api) return;
      if (document.hidden || !this.visible) {
        this.last = now;
        return;
      }
      const dt = Math.min(0.05, (now - this.last) / 1e3 || 0.016);
      this.last = now;
      this.t += dt;
      const p = this.pointer;
      p.sx = damp(p.sx, p.x, 4, dt);
      p.sy = damp(p.sy, p.y, 4, dt);
      this.api.update(dt, this.t);
      this.r.render(this.scene, this.cam);
    }
    dispose() {
      this.dead = true;
      if (app.scene && app.scene.ok) app.scene.half = false;
      if (!this.ok) return;
      if (this.io) this.io.disconnect();
      if (this.ro) this.ro.disconnect();
      if (this.api && this.api.dispose) this.api.dispose();
      this.scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
      });
      this.r.dispose();
      if (this.r.forceContextLoss) this.r.forceContextLoss();
    }
  };

  // ../../home/claude/repo/js/nav.js
  function buildNav() {
    const links = $("#navLinks");
    NAV.forEach((n) => {
      const a = document.createElement("a");
      a.href = "#" + n.path;
      a.textContent = n.label;
      a.dataset.key = n.key;
      a.dataset.cursor = "link";
      links.appendChild(a);
    });
    $("#menuList").innerHTML = NAV.map((n, i) => `<li><a href="#${n.path}" data-key="${n.key}" style="--i:${i}">${n.label}</a></li>`).join("");
    const ind = $("#navInd");
    const moveTo = (a) => {
      if (!a) {
        ind.style.opacity = "0";
        return;
      }
      ind.style.opacity = "1";
      ind.style.width = a.offsetWidth + "px";
      ind.style.transform = `translateX(${a.offsetLeft}px)`;
    };
    app.moveInd = () => moveTo($('a[aria-current="page"]', links));
    $$("a", links).forEach((a) => a.addEventListener("pointerenter", () => moveTo(a)));
    links.addEventListener("pointerleave", () => app.moveInd());
    addEventListener("resize", () => app.moveInd());
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => app.moveInd());
  }
  function setNavActive(key) {
    $$("#navLinks a, #menuList a").forEach((a) => {
      if (a.dataset.key === key) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    if (app.moveInd) app.moveInd();
  }
  function setMenu(open) {
    const menu = $("#menu"), burger = $("#burger");
    menu.classList.toggle("open", open);
    menu.inert = !open;
    menu.setAttribute("aria-hidden", String(!open));
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.documentElement.classList.toggle("menu-open", open);
    if (app.lenis) open ? app.lenis.stop() : app.lenis.start();
    if (open) setTimeout(() => {
      const a = $("#menuList a");
      if (a) a.focus({ preventScroll: true });
    }, 400);
  }

  // ../../home/claude/repo/js/loader.js
  function runLoader() {
    return new Promise((resolveLoader) => {
      const el = $("#loader");
      if (!el) {
        resolveLoader();
        return;
      }
      let seen = false;
      try {
        seen = sessionStorage.getItem("rp-seen") === "1";
      } catch {
      }
      if (seen || reduced()) {
        el.remove();
        resolveLoader();
        return;
      }
      const cnt = $("#lcount"), bar = $("#lbar"), steps = ["01", "02", "03", "ENTER"];
      let i = 0, done = false, timer = null;
      const finish = async () => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        el.classList.add("out");
        try {
          sessionStorage.setItem("rp-seen", "1");
        } catch {
        }
        resolveLoader();
        await sleep(850);
        el.remove();
      };
      const tick = () => {
        cnt.textContent = steps[i];
        bar.style.transform = `scaleX(${(i + 1) / steps.length})`;
        if (i === steps.length - 1) {
          timer = setTimeout(finish, 240);
          return;
        }
        i++;
        timer = setTimeout(tick, 210);
      };
      tick();
      el.addEventListener("click", finish);
      addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === "Escape") finish();
      }, { once: true });
    });
  }

  // ../../home/claude/repo/js/interactions.js
  function initMagnets(root) {
    if (!mqFine.matches || reduced()) return;
    $$("[data-magnet]", root).forEach((el) => {
      const s = parseFloat(el.dataset.magnet) || 0.3;
      let raf = 0, ev = null;
      el.addEventListener("pointermove", (e) => {
        ev = e;
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          if (!ev) return;
          const r = el.getBoundingClientRect();
          const dx = ev.clientX - (r.left + r.width / 2), dy = ev.clientY - (r.top + r.height / 2);
          el.style.transform = `translate3d(${(dx * s).toFixed(1)}px,${(dy * s).toFixed(1)}px,0)`;
        });
      }, { passive: true });
      el.addEventListener("pointerleave", () => {
        ev = null;
        el.style.transform = "";
      });
    });
  }
  function initTilt(root) {
    $$("[data-tilt]", root).forEach((el) => {
      const tgt = $("[data-tilt-t]", el);
      let raf = 0, ev = null;
      el.addEventListener("pointermove", (e) => {
        ev = e;
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          if (!ev) return;
          const r = el.getBoundingClientRect();
          const px = (ev.clientX - r.left) / r.width, py = (ev.clientY - r.top) / r.height;
          el.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
          el.style.setProperty("--my", (py * 100).toFixed(1) + "%");
          if (tgt && !reduced() && mqFine.matches) {
            tgt.style.transform = `perspective(900px) rotateX(${((0.5 - py) * 9).toFixed(2)}deg) rotateY(${((px - 0.5) * 11).toFixed(2)}deg) scale(1.03)`;
          }
        });
      }, { passive: true });
      el.addEventListener("pointerleave", () => {
        ev = null;
        if (tgt) tgt.style.transform = "";
      });
    });
  }
  function initFills(root) {
    $$(".lrow", root).forEach((el) => {
      const set = (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--x", e.clientX - r.left + "px");
        el.style.setProperty("--y", e.clientY - r.top + "px");
      };
      el.addEventListener("pointerenter", set);
      el.addEventListener("pointerleave", set);
    });
  }
  function initCopy(root) {
    $$("[data-copy]", root).forEach((btn) => {
      btn.addEventListener("click", async () => {
        const text = btn.dataset.copy;
        let ok = false;
        try {
          await navigator.clipboard.writeText(text);
          ok = true;
        } catch {
          try {
            const ta = document.createElement("textarea");
            ta.value = text;
            ta.style.position = "fixed";
            ta.style.opacity = "0";
            document.body.appendChild(ta);
            ta.select();
            ok = document.execCommand("copy");
            ta.remove();
          } catch {
            ok = false;
          }
        }
        const prev = btn.textContent;
        btn.textContent = ok ? "Copied" : "Press Ctrl+C";
        $("#live").textContent = ok ? "Email address copied" : "Copy failed";
        setTimeout(() => {
          btn.textContent = prev;
        }, 1800);
      });
    });
  }

  // ../../home/claude/repo/js/pages/common.js
  function footer(nextPath, nextLabel) {
    return `<footer class="foot wrap">
    <a class="foot__next" href="#${nextPath}" data-cursor="link"><span><span class="mono muted" style="display:block;margin-bottom:.6rem">Next</span><span class="foot__t">${esc(nextLabel)}</span></span>${ARROW}</a>
    <p class="foot__c">\xA9 2026 ${SITE.name}. Built with care.</p>
  </footer>`;
  }
  function nextOf(key) {
    const i = NAV.findIndex((n2) => n2.key === key);
    const n = NAV[(i + 1) % NAV.length];
    return footer(n.path, n.label);
  }
  function pageHead(title, lead) {
    return `<section class="page wrap">
    <h1 class="title" data-reveal="chars">${esc(title)}</h1>
    ${lead ? `<p class="lead" data-reveal="words">${esc(lead)}</p>` : ""}
  </section>`;
  }
  function page404() {
    return `<section class="page wrap nf"><h1 class="title">Page not found</h1><p class="lead">That address doesn't exist on this site.</p><p><a class="btn btn--solid" href="#/">Back to home ${ARROW}</a></p></section>`;
  }

  // ../../home/claude/repo/js/pages/previews.js
  function preview(slug) {
    const p = PROJECTS.find((x) => x.slug === slug);
    const head = `<svg viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(p.alt)}" focusable="false"><rect class="pv-bg" x=".5" y=".5" width="639" height="479" rx="20"/>`;
    const ck = (x, y) => `<path class="pv-ck" d="M${x - 7} ${y} l5 5 l9 -11"/>`;
    const xx = (x, y) => `<path class="pv-ck" d="M${x - 6} ${y - 6} l12 12 M${x + 6} ${y - 6} l-12 12"/>`;
    let b = "";
    if (p.vis === "scan") {
      let rows = "";
      [[260, 0], [200, 1], [290, 0], [170, 1], [230, 0]].forEach(([w, bad], i) => {
        const y = 128 + i * 62;
        rows += `<rect class="pv-o${bad ? " pv-fill" : ""}" x="40" y="${y}" width="380" height="46" rx="12"/>
      <rect class="pv-bar${bad ? " pv-hl" : ""}" x="62" y="${y + 19}" width="${w}" height="8" rx="4"/>
      ${bad ? xx(394, y + 23) : ck(394, y + 23)}`;
      });
      b = `
    <rect class="pv-o" x="40" y="40" width="560" height="52" rx="26"/>
    <circle class="pv-o" cx="72" cy="64" r="10"/><line class="pv-l" x1="79" y1="71" x2="88" y2="80"/>
    <rect class="pv-bar pv-hl" x="104" y="62" width="300" height="8" rx="4"/>
    <g class="pv-m">${rows}</g>
    <g class="pv-r">
      <circle class="pv-o" cx="524" cy="270" r="62"/>
      <circle class="pv-ck" cx="524" cy="270" r="62" stroke-dasharray="354 390" transform="rotate(-90 524 270)"/>
      <text class="pv-t" x="524" y="278" text-anchor="middle" style="font-size:26px">91%</text>
      <text class="pv-t" x="524" y="362" text-anchor="middle">ACCURACY</text>
    </g>`;
    } else if (p.vis === "vault") {
      let rows = "";
      [150, 110, 180, 130].forEach((w, i) => {
        const y = 112 + i * 72;
        let dots = "";
        for (let k = 0; k < 8; k++) dots += `<circle class="pv-bar${i === 0 ? " pv-hl" : ""}" cx="${432 + k * 18}" cy="${y + 36}" r="4"/>`;
        rows += `<rect class="pv-o${i === 0 ? " pv-fill" : ""}" x="270" y="${y}" width="330" height="56" rx="14"/>
      <circle class="pv-o" cx="300" cy="${y + 28}" r="12"/>
      <rect class="pv-bar pv-hl" x="324" y="${y + 14}" width="${w * 0.6}" height="7" rx="3.5"/>${dots}`;
      });
      b = `
    <g class="pv-m">
      <path class="pv-l" d="M100 210 v-46 a45 45 0 0 1 90 0 v46" style="stroke-width:6;stroke-opacity:.6"/>
      <rect class="pv-o pv-fill" x="70" y="210" width="150" height="130" rx="18"/>
      <circle class="pv-bar pv-hl" cx="145" cy="262" r="14"/><rect class="pv-bar pv-hl" x="140" y="268" width="10" height="34" rx="5"/>
      <text class="pv-t" x="145" y="384" text-anchor="middle">AES-256-GCM</text>
      <text class="pv-t" x="145" y="406" text-anchor="middle" style="opacity:.6">AUTO-LOCK 5:00</text>
    </g>
    <g class="pv-r">${rows}</g>`;
    } else if (p.vis === "meter") {
      let segs = "", checks = "";
      for (let k = 0; k < 5; k++) segs += `<rect class="pv-bar${k < 4 ? " pv-hl" : ""}" x="${40 + k * 108}" y="140" width="96" height="12" rx="6"/>`;
      [[220, 1], [170, 1], [250, 0], [190, 1]].forEach(([w, ok], i) => {
        const y = 230 + i * 50;
        checks += `${ok ? ck(60, y) : xx(60, y)}<rect class="pv-bar" x="86" y="${y - 4}" width="${w}" height="8" rx="4"/>`;
      });
      let dots = "";
      for (let k = 0; k < 12; k++) dots += `<circle class="pv-bar pv-hl" cx="${76 + k * 22}" cy="76" r="5"/>`;
      b = `
    <rect class="pv-o" x="40" y="44" width="560" height="64" rx="16"/>${dots}
    <path class="pv-l" d="M540 76 q22 -18 44 0 q-22 18 -44 0"/><circle class="pv-bar pv-hl" cx="562" cy="76" r="5"/>
    ${segs}
    <text class="pv-t" x="40" y="190">STRENGTH</text><text class="pv-t" x="600" y="190" text-anchor="end" style="font-size:18px">84 / 100</text>
    <g class="pv-m">${checks}</g>
    <g class="pv-r">
      <path class="pv-o pv-fill" d="M500 228 l72 26 v58 c0 46 -32 72 -72 88 c-40 -16 -72 -42 -72 -88 v-58 z"/>
      ${ck(500, 318)}
      <text class="pv-t" x="500" y="440" text-anchor="middle">NOT IN BREACHES</text>
    </g>`;
    } else if (p.vis === "rag") {
      b = `
    <g class="pv-m">
      <rect class="pv-o" x="56" y="92" width="130" height="170" rx="12"/>
      <rect class="pv-o" x="48" y="84" width="130" height="170" rx="12" style="fill:var(--bg,#06070b)"/>
      <rect class="pv-o pv-fill" x="40" y="76" width="130" height="170" rx="12"/>
      <rect class="pv-bar pv-hl" x="60" y="100" width="70" height="7" rx="3.5"/>
      <rect class="pv-bar" x="60" y="122" width="90" height="6" rx="3"/><rect class="pv-bar" x="60" y="138" width="80" height="6" rx="3"/><rect class="pv-bar" x="60" y="154" width="90" height="6" rx="3"/><rect class="pv-bar" x="60" y="170" width="60" height="6" rx="3"/>
      <text class="pv-t" x="105" y="290" text-anchor="middle">DOCS</text>
      <path class="pv-l pv-d" d="M186 170 C220 170 220 232 246 232"/>
      <circle class="pv-o pv-fill" cx="276" cy="232" r="30"/>
      <circle class="pv-bar pv-hl" cx="266" cy="224" r="4"/><circle class="pv-bar" cx="284" cy="226" r="4"/><circle class="pv-bar" cx="274" cy="242" r="4"/><circle class="pv-bar pv-hl" cx="288" cy="240" r="3"/>
      <text class="pv-t" x="276" y="290" text-anchor="middle">EMBED</text>
      <path class="pv-l pv-d" d="M306 232 C330 232 330 170 352 170"/>
    </g>
    <g class="pv-r">
      <rect class="pv-o" x="412" y="64" width="188" height="50" rx="16"/>
      <rect class="pv-bar" x="430" y="84" width="130" height="7" rx="3.5"/>
      <rect class="pv-o pv-fill" x="352" y="132" width="248" height="120" rx="16"/>
      <rect class="pv-bar pv-hl" x="372" y="154" width="190" height="7" rx="3.5"/><rect class="pv-bar" x="372" y="170" width="200" height="7" rx="3.5"/><rect class="pv-bar" x="372" y="186" width="150" height="7" rx="3.5"/>
      <rect class="pv-o" x="372" y="210" width="44" height="24" rx="12"/><text class="pv-t" x="394" y="226" text-anchor="middle">[1]</text>
      <rect class="pv-o" x="424" y="210" width="44" height="24" rx="12"/><text class="pv-t" x="446" y="226" text-anchor="middle">[2]</text>
      <rect class="pv-o" x="412" y="272" width="188" height="50" rx="16"/>
      <rect class="pv-bar" x="430" y="292" width="110" height="7" rx="3.5"/>
      <rect class="pv-o" x="40" y="380" width="560" height="56" rx="28"/>
      <rect class="pv-bar" x="68" y="404" width="220" height="8" rx="4"/>
      <circle class="pv-o pv-fill" cx="568" cy="408" r="16"/>
    </g>`;
    } else if (p.vis === "globe") {
      let pts = "";
      [[180, 170, 1], [262, 150, 0], [300, 230, 1], [210, 262, 0], [150, 300, 1], [290, 320, 0], [236, 206, 1]].forEach(([x, y, h]) => {
        pts += `<circle class="pv-bar${h ? " pv-hl" : ""}" cx="${x}" cy="${y}" r="${h ? 6 : 4}"/>`;
      });
      let bars = "";
      [60, 96, 74, 120, 88, 140, 104].forEach((h, i) => {
        bars += `<rect class="pv-bar${i === 5 ? " pv-hl" : ""}" x="${448 + i * 20}" y="${300 - h}" width="12" height="${h}" rx="3"/>`;
      });
      b = `
    <g class="pv-m">
      <circle class="pv-o pv-fill" cx="226" cy="240" r="150"/>
      <ellipse class="pv-l" cx="226" cy="240" rx="150" ry="52"/>
      <ellipse class="pv-l" cx="226" cy="240" rx="150" ry="110"/>
      <ellipse class="pv-l" cx="226" cy="240" rx="56" ry="150"/>
      <ellipse class="pv-l" cx="226" cy="240" rx="112" ry="150"/>
      ${pts}
    </g>
    <g class="pv-r">
      <rect class="pv-o" x="428" y="120" width="172" height="200" rx="14"/>
      <rect class="pv-bar pv-hl" x="448" y="140" width="80" height="7" rx="3.5"/>
      ${bars}
      <text class="pv-t" x="514" y="350" text-anchor="middle">ARGO FLOATS</text>
    </g>
    <path class="pv-l" d="M40 420 q40 -22 80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0"/>
    <path class="pv-l pv-d" d="M40 444 q40 -18 80 0 t80 0 t80 0 t80 0 t80 0 t80 0 t80 0"/>`;
    } else {
      const words = ["rishabh", "Rishabh2026", "r1shabh!", "RISHABH@123", "rishabh_26", "Rish@bh", "hbahsir"];
      let rows = "";
      words.forEach((w, i) => {
        const y = 150 + i * 40;
        rows += `<rect class="pv-o${i === 0 ? " pv-fill" : ""}" x="330" y="${y}" width="270" height="30" rx="8"/>
      <text class="pv-t" x="348" y="${y + 20}">${w}</text>`;
      });
      b = `
    <g class="pv-m">
      <rect class="pv-o pv-fill" x="40" y="150" width="210" height="56" rx="14"/>
      <text class="pv-t" x="62" y="184" style="font-size:16px">rishabh</text>
      <text class="pv-t" x="62" y="134">BASE WORD</text>
      <rect class="pv-o" x="40" y="236" width="96" height="30" rx="15"/><text class="pv-t" x="88" y="256" text-anchor="middle">LEET</text>
      <rect class="pv-o pv-fill" x="146" y="236" width="104" height="30" rx="15"/><text class="pv-t" x="198" y="256" text-anchor="middle">YEARS</text>
      <rect class="pv-o" x="40" y="276" width="110" height="30" rx="15"/><text class="pv-t" x="95" y="296" text-anchor="middle">SYMBOLS</text>
      <path class="pv-l pv-d" d="M250 178 C290 178 290 165 330 165"/>
    </g>
    <g class="pv-r">
      <text class="pv-t" x="330" y="134">VARIATIONS</text>
      ${rows}
      <rect class="pv-o pv-fill" x="500" y="60" width="100" height="40" rx="20"/><text class="pv-t" x="550" y="85" text-anchor="middle">.TXT</text>
    </g>`;
    }
    return head + b + "</svg>";
  }

  // ../../home/claude/repo/js/pages/home.js
  function pageHome() {
    const verbs = [
      ["Build", "cyan", "security tools for the browser, like a password vault encrypted with AES-256-GCM and a breach checker.", -1],
      ["Experiment", "violet", "with AI and ML: a phishing URL detector trained on 400,000+ URLs and a RAG chatbot that cites its sources.", 1],
      ["Explore", "green", "cybersecurity as my B.Tech specialization, through two internships, SecOps Group certifications and job simulations.", -1]
    ].map(([w, a, t, d]) => `
    <div class="verb" data-accent="${a}">
      <div class="verb__word" data-reveal="line"><span class="par" data-px="${d}"><span class="rv">${w}</span></span></div>
      <p data-reveal="fade">${t}</p>
    </div>`).join("");
    const rows = PROJECTS.map((p) => `
    <a class="work-row" href="#/projects/${p.slug}" data-cursor="view" data-peek="${p.slug}" style="--pa:${ACCENTS[p.accent][0]}" data-reveal="fade">
      <span class="work-row__n mono">${p.n}</span>
      <span class="work-row__t">${esc(p.title)}</span>
      <span class="work-row__d">${esc(p.blurb)}</span>
      <span class="work-row__tags mono">${p.tech.length ? esc(p.tech.join(", ")) : ""}</span>
      ${ARROW}
    </a>`).join("");
    const marq = FEATURED.map((f) => `<span class="marq__i"><b>${esc(f.role)}</b> ${esc(f.org)}</span>`).join("");
    return `
  <section class="hero">
    <div class="wrap">
      <p class="hero__label mono" data-reveal="fade"><span class="dot"></span>CYBERSECURITY \u2022 AI \u2022 WEB</p>
      <h1 class="hero__name" aria-label="${SITE.name}">
        <span class="nm" data-reveal="chars" data-base="0" aria-hidden="true">Rishabh</span>
        <span class="nm" data-reveal="chars" data-base="7" aria-hidden="true">Prajapati</span>
      </h1>
      <div class="hero__row">
        <div>
          <p class="hero__lead" data-reveal="words">I build security tools, experiment with AI, and ship them to the web.</p>
          <p class="hero__role mono" aria-hidden="true" data-reveal="fade" style="--d:400ms"><span id="role"></span><i class="caret"></i></p>
        </div>
        <div class="hero__cta" data-reveal="fade" style="--d:500ms">
          <a class="btn btn--solid" data-magnet="0.3" href="#/projects">See projects ${ARROW}</a>
          <a class="btn" data-magnet="0.3" href="#/contact">Get in touch</a>
        </div>
      </div>
      <div class="hero__foot" data-reveal="fade" style="--d:700ms">
        <p class="mono">B.Tech CSE (Cybersecurity) at LIET, Greater Noida, 2025 to 2029</p>
        <span class="scroll-cue" aria-hidden="true">Scroll<i></i></span>
      </div>
    </div>
  </section>

  <section class="verbs wrap" aria-label="What I do">${verbs}</section>

  <section class="work wrap" aria-labelledby="workH">
    <div class="sec-head">
      <h2 class="h2" id="workH" data-reveal="words">Selected work</h2>
      <a class="ul" href="#/projects" data-cursor="link">All projects</a>
    </div>
    ${rows}
  </section>

  <section class="marq" aria-label="Internships and contributions">
    <div class="marq__track">${marq}${marq.replace(/<span class="marq__i">/g, '<span class="marq__i" aria-hidden="true">')}${marq.replace(/<span class="marq__i">/g, '<span class="marq__i" aria-hidden="true">')}${marq.replace(/<span class="marq__i">/g, '<span class="marq__i" aria-hidden="true">')}</div>
  </section>

  <section class="cta wrap">
    <a class="cta__big" href="#/contact" data-cursor="link" data-reveal="fade">Let's connect ${ARROW}</a>
    <a class="cta__mail ul" href="mailto:${SITE.email}" data-reveal="fade" style="--d:150ms">${SITE.email}</a>
  </section>
  ${footer("/about", "About")}`;
  }
  function initPeek() {
    if (!mqFine.matches) return;
    const peek = $("#peek");
    $$("[data-peek]").forEach((row) => {
      row.addEventListener("pointerenter", () => {
        const p = PROJECTS.find((x) => x.slug === row.dataset.peek);
        if (!p) return;
        peek.innerHTML = preview(p.slug);
        peek.style.color = `rgb(${ACCENTS[p.accent][1]})`;
        peek.classList.add("on");
        app.peekOn = true;
      });
      row.addEventListener("pointerleave", () => {
        peek.classList.remove("on");
        app.peekOn = false;
      });
    });
  }
  function initRoles() {
    const el = $("#role");
    if (!el) return;
    if (reduced()) {
      el.textContent = ROLES.join(", ");
      return;
    }
    let i = 0, j = 0, deleting = false;
    const tick = () => {
      if (!el.isConnected) return;
      const word = ROLES[i];
      j += deleting ? -1 : 1;
      el.textContent = word.slice(0, j);
      let delay = deleting ? 30 : 55;
      if (!deleting && j === word.length) {
        deleting = true;
        delay = 1400;
      } else if (deleting && j === 0) {
        deleting = false;
        i = (i + 1) % ROLES.length;
        delay = 350;
      }
      setTimeout(tick, delay);
    };
    setTimeout(tick, 900);
  }
  function initHome() {
    initPeek();
    initRoles();
  }

  // ../../home/claude/repo/js/three/page-scenes.js
  function buildOrbit(m, ctx) {
    const T = THREE, sprite = makeSprite();
    const root = new T.Group();
    m.scene.add(root);
    const coreMat = new T.LineBasicMaterial({ color: 9085183, transparent: true, opacity: 0.55 });
    const core = new T.LineSegments(new T.WireframeGeometry(new T.IcosahedronGeometry(1.25, 1)), coreMat);
    const heart = new T.Mesh(new T.IcosahedronGeometry(0.42, 0), new T.MeshBasicMaterial({ color: 16777215, transparent: true, opacity: 0.35, wireframe: true }));
    const halo = new T.Sprite(new T.SpriteMaterial({ map: sprite, color: 9085183, transparent: true, opacity: 0.45, depthWrite: false, blending: T.AdditiveBlending }));
    halo.scale.set(4.4, 4.4, 1);
    root.add(core, heart, halo);
    const defs = [
      { k: "web", r: 3, tx: 0.35, tz: 0.15, speed: 0.5, ph: 0 },
      { k: "ai", r: 3.5, tx: -0.5, tz: -0.2, speed: 0.36, ph: 2.1 },
      { k: "sec", r: 2.5, tx: 0.95, tz: 0.35, speed: 0.62, ph: 4.2 }
    ];
    const nodes = defs.map((d) => {
      const col = ORBIT[d.k].color;
      const pivot = new T.Group();
      pivot.rotation.set(d.tx, 0, d.tz);
      root.add(pivot);
      const pts = [];
      for (let i = 0; i <= 128; i++) {
        const a = i / 128 * Math.PI * 2;
        pts.push(new T.Vector3(Math.cos(a) * d.r, 0, Math.sin(a) * d.r));
      }
      const ringMat = new T.LineBasicMaterial({ color: col, transparent: true, opacity: 0.22 });
      pivot.add(new T.Line(new T.BufferGeometry().setFromPoints(pts), ringMat));
      const mat = new T.MeshBasicMaterial({ color: col });
      const mesh = new T.Mesh(new T.OctahedronGeometry(0.2, 0), mat);
      pivot.add(mesh);
      const glow = new T.Sprite(new T.SpriteMaterial({ map: sprite, color: col, transparent: true, opacity: 0.5, depthWrite: false, blending: T.AdditiveBlending }));
      glow.scale.set(3.4, 3.4, 1);
      mesh.add(glow);
      return Object.assign({ col, pivot, mesh, ringMat, glow, ang: d.ph, mult: 1, sc: 1, el: ctx.els[d.k] }, d);
    });
    const N = 48, bPos = new Float32Array(N * 3), bVel = new Float32Array(N * 3), bGeo = new T.BufferGeometry();
    for (let i = 0; i < N; i++) bPos[i * 3 + 1] = 9999;
    bGeo.setAttribute("position", new T.BufferAttribute(bPos, 3));
    const bMat = new T.PointsMaterial({ map: sprite, size: 0.2, transparent: true, depthWrite: false, blending: T.AdditiveBlending, color: 16777215, opacity: 0 });
    const burst = new T.Points(bGeo, bMat);
    burst.frustumCulled = false;
    root.add(burst);
    let life = 0, lastActive = null;
    const v = new T.Vector3(), tmpCol = new T.Color();
    function spawn(node) {
      node.mesh.getWorldPosition(v);
      root.worldToLocal(v);
      bMat.color.setHex(node.col);
      life = 1;
      for (let i = 0; i < N; i++) {
        const a = Math.random() * Math.PI * 2, b = Math.acos(2 * Math.random() - 1), s = 0.8 + Math.random() * 1.8;
        bPos[i * 3] = v.x;
        bPos[i * 3 + 1] = v.y;
        bPos[i * 3 + 2] = v.z;
        bVel[i * 3] = Math.sin(b) * Math.cos(a) * s;
        bVel[i * 3 + 1] = Math.sin(b) * Math.sin(a) * s;
        bVel[i * 3 + 2] = Math.cos(b) * s;
      }
      bGeo.attributes.position.needsUpdate = true;
    }
    return {
      update(dt, t) {
        const act = ctx.active, still = reduced();
        if (act !== lastActive) {
          lastActive = act;
          const n = nodes.find((x) => x.k === act);
          if (n && !still) spawn(n);
        }
        nodes.forEach((n) => {
          const on = act === n.k;
          n.mult = damp(n.mult, act ? on ? 0.12 : 0.55 : 1, 4, dt || 1);
          if (!still) n.ang += dt * n.speed * n.mult;
          n.mesh.position.set(Math.cos(n.ang) * n.r, 0, Math.sin(n.ang) * n.r);
          n.sc = damp(n.sc, on ? 2.1 : act ? 0.75 : 1, 6, dt || 1);
          n.mesh.scale.setScalar(n.sc);
          n.ringMat.opacity = damp(n.ringMat.opacity, on ? 0.75 : act ? 0.1 : 0.22, 6, dt || 1);
          n.glow.material.opacity = damp(n.glow.material.opacity, on ? 0.95 : 0.5, 6, dt || 1);
        });
        const an = nodes.find((x) => x.k === act);
        tmpCol.setHex(an ? an.col : 9085183);
        coreMat.color.lerp(tmpCol, 1 - Math.exp(-5 * (dt || 1)));
        halo.material.color.copy(coreMat.color);
        const p = m.pointer;
        root.rotation.y = damp(root.rotation.y, p.sx * 0.5 + (still ? 0 : t * 0.04), 3, dt || 1);
        root.rotation.x = damp(root.rotation.x, p.sy * 0.35, 3, dt || 1);
        if (!still) {
          core.rotation.y += dt * (0.2 + (act ? 0.5 : 0));
          heart.rotation.x -= dt * 0.5;
        }
        if (life > 0 && dt) {
          life -= dt * 1.3;
          for (let i = 0; i < N; i++) {
            bPos[i * 3] += bVel[i * 3] * dt;
            bPos[i * 3 + 1] += bVel[i * 3 + 1] * dt;
            bPos[i * 3 + 2] += bVel[i * 3 + 2] * dt;
            bVel[i * 3] *= 0.96;
            bVel[i * 3 + 1] *= 0.96;
            bVel[i * 3 + 2] *= 0.96;
          }
          bGeo.attributes.position.needsUpdate = true;
        }
        bMat.opacity = Math.max(0, life) * 0.9;
        root.updateMatrixWorld(true);
        const w = m.w, h = m.h;
        nodes.forEach((n) => {
          n.mesh.getWorldPosition(v);
          const front = clamp((v.z + 3.5) / 7, 0, 1);
          v.project(m.cam);
          const x = (v.x * 0.5 + 0.5) * w, y = (-v.y * 0.5 + 0.5) * h;
          n.el.style.transform = `translate3d(${x.toFixed(1)}px,${(y - 30).toFixed(1)}px,0) translate(-50%,-50%)`;
          n.el.style.opacity = ((0.55 + 0.45 * front) * (act && act !== n.k ? 0.55 : 1)).toFixed(2);
          n.el.style.zIndex = String(Math.round(front * 10));
        });
      }
    };
  }
  function buildSkills(m, ctx) {
    const T = THREE, sprite = makeSprite(), R = 2.7, N = SKILLS.length;
    const root = new T.Group();
    m.scene.add(root);
    const gcol = { web: 4448511, backend: 5204991, ai: 10120191, security: 4059812 };
    const coreMat = new T.LineBasicMaterial({ color: 5204991, transparent: true, opacity: 0.3 });
    const core = new T.LineSegments(new T.WireframeGeometry(new T.IcosahedronGeometry(1.5, 2)), coreMat);
    const shellMat = new T.LineBasicMaterial({ color: 9085183, transparent: true, opacity: 0.07 });
    const shell = new T.LineSegments(new T.WireframeGeometry(new T.IcosahedronGeometry(R + 0.2, 2)), shellMat);
    root.add(core, shell);
    const centers = { web: [-0.95, 0.5, 0.45], backend: [0.95, 0.1, 0.4], ai: [-0.05, -0.9, 0.5], security: [0.1, 0.65, -0.95] };
    const groups = {};
    SKILLS.forEach((s, i) => {
      (groups[s.group] = groups[s.group] || []).push(i);
    });
    const base = new Array(N);
    Object.keys(groups).forEach((g) => {
      const idx = groups[g], c = new T.Vector3(...centers[g]).normalize();
      const up2 = Math.abs(c.y) > 0.9 ? new T.Vector3(1, 0, 0) : new T.Vector3(0, 1, 0);
      const u = new T.Vector3().crossVectors(c, up2).normalize(), w = new T.Vector3().crossVectors(c, u).normalize();
      const rr = idx.length > 3 ? 0.62 : idx.length > 1 ? 0.5 : 0;
      idx.forEach((si, j) => {
        const a = j / idx.length * Math.PI * 2 + 0.4;
        base[si] = c.clone().addScaledVector(u, Math.cos(a) * rr).addScaledVector(w, Math.sin(a) * rr).normalize().multiplyScalar(R);
      });
    });
    const nodes = SKILLS.map((s, i) => {
      const col = gcol[s.group];
      const mat = new T.MeshBasicMaterial({ color: col });
      const mesh = new T.Mesh(new T.OctahedronGeometry(0.13, 0), mat);
      root.add(mesh);
      const glow = new T.Sprite(new T.SpriteMaterial({ map: sprite, color: col, transparent: true, opacity: 0.4, depthWrite: false, blending: T.AdditiveBlending }));
      glow.scale.set(4.6, 4.6, 1);
      mesh.add(glow);
      return { i, s, col, base: base[i], pos: base[i].clone(), mesh, glow, sc: 1, el: ctx.els[i] };
    });
    const gKeys = Object.keys(groups), segCount = N + gKeys.length;
    const lPos = new Float32Array(segCount * 6), lGeo = new T.BufferGeometry();
    lGeo.setAttribute("position", new T.BufferAttribute(lPos, 3));
    const lMat = new T.LineBasicMaterial({ color: 9085183, transparent: true, opacity: 0.2 });
    const lines = new T.LineSegments(lGeo, lMat);
    lines.frustumCulled = false;
    root.add(lines);
    const aPos = new Float32Array((N + 1) * 6), aGeo = new T.BufferGeometry();
    aGeo.setAttribute("position", new T.BufferAttribute(aPos, 3));
    const aMat = new T.LineBasicMaterial({ color: 16777215, transparent: true, opacity: 0.85 });
    const aLines = new T.LineSegments(aGeo, aMat);
    aLines.frustumCulled = false;
    root.add(aLines);
    let dragging = false, lx = 0, ly = 0, spin = 0;
    const down = (e) => {
      if (e.target.closest && e.target.closest("button")) return;
      dragging = true;
      lx = e.clientX;
      ly = e.clientY;
      try {
        m.wrap.setPointerCapture(e.pointerId);
      } catch {
      }
    };
    const move = (e) => {
      if (!dragging) return;
      const dx = e.clientX - lx, dy = e.clientY - ly;
      lx = e.clientX;
      ly = e.clientY;
      root.rotation.y += dx * 6e-3;
      spin = dx * 6e-3 * 60;
      root.rotation.x = clamp(root.rotation.x + dy * 4e-3, -0.9, 0.9);
    };
    const up = () => {
      dragging = false;
    };
    m.wrap.addEventListener("pointerdown", down);
    m.wrap.addEventListener("pointermove", move);
    m.wrap.addEventListener("pointerup", up);
    m.wrap.addEventListener("pointercancel", up);
    const v = new T.Vector3(), cl = new T.Vector3(), tgt = new T.Vector3(), cen = new T.Vector3(), actPos = new T.Vector3();
    return {
      update(dt, t) {
        const act = ctx.active, filter = ctx.filter, still = reduced();
        const ag = act >= 0 ? SKILLS[act].group : null;
        if (!dragging) {
          spin = damp(spin, 0, 2.5, dt || 1);
          root.rotation.y += (dt || 0) * ((still ? 0 : 0.14) * (act >= 0 ? 0.12 : 1) + spin);
          root.rotation.x = damp(root.rotation.x, m.pointer.sy * 0.28, 3, dt || 1);
        }
        root.updateMatrixWorld(true);
        cl.copy(m.cam.position);
        root.worldToLocal(cl);
        cl.normalize();
        if (act >= 0) actPos.copy(nodes[act].base);
        nodes.forEach((n) => {
          tgt.copy(n.base);
          if (n.i === act) tgt.addScaledVector(cl, 1.15);
          else if (act >= 0 && n.s.group === ag) tgt.lerp(actPos, 0.16);
          else if (act >= 0) tgt.multiplyScalar(1.08);
          n.pos.lerp(tgt, 1 - Math.exp(-7 * (dt || 1)));
          n.mesh.position.copy(n.pos);
          const dim = filter !== "all" && n.s.group !== filter;
          n.sc = damp(n.sc, n.i === act ? 2.4 : dim ? 0.6 : 1, 7, dt || 1);
          n.mesh.scale.setScalar(n.sc);
          n.glow.material.opacity = damp(n.glow.material.opacity, n.i === act ? 0.95 : dim ? 0.08 : 0.4, 7, dt || 1);
        });
        let o = 0;
        gKeys.forEach((g) => {
          cen.set(0, 0, 0);
          groups[g].forEach((si) => cen.add(nodes[si].pos));
          cen.multiplyScalar(1 / groups[g].length);
          groups[g].forEach((si) => {
            const p = nodes[si].pos;
            lPos[o++] = p.x;
            lPos[o++] = p.y;
            lPos[o++] = p.z;
            lPos[o++] = cen.x;
            lPos[o++] = cen.y;
            lPos[o++] = cen.z;
          });
          lPos[o++] = cen.x;
          lPos[o++] = cen.y;
          lPos[o++] = cen.z;
          lPos[o++] = 0;
          lPos[o++] = 0;
          lPos[o++] = 0;
          if (g === ag) {
            let a = 0;
            groups[g].forEach((si) => {
              const p = nodes[si].pos;
              aPos[a++] = p.x;
              aPos[a++] = p.y;
              aPos[a++] = p.z;
              aPos[a++] = cen.x;
              aPos[a++] = cen.y;
              aPos[a++] = cen.z;
            });
            aPos[a++] = cen.x;
            aPos[a++] = cen.y;
            aPos[a++] = cen.z;
            aPos[a++] = 0;
            aPos[a++] = 0;
            aPos[a++] = 0;
            aGeo.setDrawRange(0, (groups[g].length + 1) * 2);
            aMat.color.setHex(gcol[g]);
          }
        });
        if (!ag) aGeo.setDrawRange(0, 0);
        lGeo.attributes.position.needsUpdate = true;
        aGeo.attributes.position.needsUpdate = true;
        lMat.opacity = damp(lMat.opacity, act >= 0 ? 0.08 : 0.2, 5, dt || 1);
        coreMat.opacity = 0.3 + (act >= 0 ? 0.1 : 0);
        if (!still) {
          core.rotation.y -= (dt || 0) * 0.08;
          shell.rotation.y += (dt || 0) * 0.03;
        }
        root.updateMatrixWorld(true);
        const w = m.w, h = m.h;
        nodes.forEach((n) => {
          n.mesh.getWorldPosition(v);
          const front = clamp((v.z + R) / (2 * R), 0, 1);
          v.project(m.cam);
          const x = (v.x * 0.5 + 0.5) * w, y = (-v.y * 0.5 + 0.5) * h;
          const dim = filter !== "all" && n.s.group !== filter;
          n.el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) translate(-50%,calc(-100% - 10px))`;
          n.el.style.opacity = ((0.32 + 0.68 * front) * (dim ? 0.28 : 1)).toFixed(2);
          n.el.style.zIndex = String(n.i === act ? 20 : Math.round(front * 10));
        });
      },
      dispose() {
        m.wrap.removeEventListener("pointerdown", down);
        m.wrap.removeEventListener("pointermove", move);
        m.wrap.removeEventListener("pointerup", up);
        m.wrap.removeEventListener("pointercancel", up);
      }
    };
  }

  // ../../home/claude/repo/js/pages/about.js
  function pageAbout() {
    const trio = [
      ["cyan", "Web development", "JavaScript, HTML and CSS for browser tools, plus React, TypeScript and Three.js on BlueNexus. Everything I build ships with a live demo.", "Build"],
      ["violet", "AI and machine learning", "Python, scikit-learn and the Gemini API: a phishing URL classifier at about 91% accuracy and a RAG chatbot grounded in real documents.", "Experiment"],
      ["green", "Cybersecurity", "My B.Tech specialization. Applied cryptography, phishing detection and IAM, backed by two internships and SecOps Group certifications.", "Explore"]
    ].map(([a, h, t, k]) => `
    <article class="trio__c" data-tilt data-accent="${a}" style="--c-rgb:var(--${a}-rgb)">
      <span class="trio__k mono">${k}</span>
      <div><h3>${h}</h3><p style="margin-top:1rem">${t}</p></div>
    </article>`).join("");
    return `
  ${pageHead("About", "Cybersecurity student who builds security tools, AI experiments and web apps.")}

  <section class="split wrap" data-reveal="rule">
    <h2 class="h2" data-reveal="words">Who I am</h2>
    <div class="prose">
      <p data-reveal="fade">I'm a B.Tech Computer Science student at Lloyd Institute of Engineering & Technology (LIET), Greater Noida, specializing in Cybersecurity. I'm passionate about cyber threats and making software more secure.</p>
      <p data-reveal="fade" style="--d:120ms">I learn by building. So far that means a phishing detector, a client-side password vault, a breach checker, a RAG chatbot for my college and a Smart India Hackathon project. I'm growing my skills in network security, ethical hacking and threat analysis, and I'm keen to contribute to real-world projects.</p>
    </div>
  </section>

  <section class="wrap" aria-labelledby="doH">
    <h2 class="h2" id="doH" data-reveal="words">What I do</h2>
    <div class="trio" data-reveal="fade">${trio}</div>
  </section>

  <section class="split wrap" data-reveal="rule">
    <h2 class="h2" data-reveal="words">How I work</h2>
    <div class="lines">
      <p data-reveal="fade">Build practical tools and ship them live.</p>
      <p data-reveal="fade">Keep secrets on the client and data private.</p>
      <p data-reveal="fade">Ground AI answers in real sources.</p>
      <p data-reveal="fade">Keep learning through internships, simulations and open source.</p>
    </div>
  </section>

  <section class="split wrap" data-reveal="rule">
    <h2 class="h2" data-reveal="words">Education</h2>
    <div>
      <div class="edu__row" data-reveal="fade">
        <div><p class="edu__t">B.Tech, Computer Science & Engineering (Cybersecurity)</p><p class="edu__m" style="margin-top:.4rem">Lloyd Institute of Engineering & Technology (LIET), Greater Noida</p></div>
        <p class="edu__m">2025 to 2029</p>
      </div>
      <div class="edu__row" data-reveal="fade">
        <div><p class="edu__t">Class XII, CBSE (Science)</p><p class="edu__m" style="margin-top:.4rem">Doon Bharti Public School, Faridabad, Haryana</p></div>
        <p class="edu__m">2024 to 2025</p>
      </div>
      <div class="edu__row" data-reveal="fade">
        <div><p class="edu__t">Class X, CBSE</p><p class="edu__m" style="margin-top:.4rem">Doon Bharti Public School, Faridabad, Haryana</p></div>
        <p class="edu__m">2022 to 2023</p>
      </div>
    </div>
  </section>

  <section class="wrap identity" id="identity" aria-labelledby="idH">
    <div class="orbit" id="orbit">
      <canvas aria-hidden="true"></canvas>
      <button type="button" class="orb" data-k="web" style="--oc:var(--cyan);--oc-rgb:var(--cyan-rgb)" aria-describedby="orbText">WEB</button>
      <button type="button" class="orb" data-k="ai" style="--oc:var(--violet);--oc-rgb:var(--violet-rgb)" aria-describedby="orbText">AI</button>
      <button type="button" class="orb" data-k="sec" style="--oc:var(--green);--oc-rgb:var(--green-rgb)" aria-describedby="orbText">SECURITY</button>
    </div>
    <div class="orbit__panel">
      <h2 class="h2" id="idH" style="margin-bottom:1.4rem" data-reveal="words">Where web, AI and security meet</h2>
      <div class="swap" id="orbSwap" aria-live="polite">
        <h3 id="orbTitle">Three areas, one workflow</h3>
        <p id="orbText">Most of my projects sit where these meet: security tools built for the web, and AI used to catch threats.</p>
      </div>
      <p class="orbit__hint mono">Hover, focus or tap a node.</p>
    </div>
  </section>
  ${nextOf("about")}`;
  }
  function initAbout() {
    const wrap = $("#orbit"), canvas = $("canvas", wrap);
    const els = {};
    $$(".orb", wrap).forEach((b) => {
      els[b.dataset.k] = b;
    });
    const ctx = { active: null, els };
    const title = $("#orbTitle"), text = $("#orbText"), swap = $("#orbSwap");
    const idle = { t: title.textContent, x: text.textContent, c: "" };
    let timer = null;
    const setActive = (k) => {
      if (ctx.active === k) return;
      ctx.active = k;
      Object.keys(els).forEach((x) => els[x].classList.toggle("is-on", x === k));
      swap.classList.add("out");
      clearTimeout(timer);
      timer = setTimeout(() => {
        title.textContent = k ? ORBIT[k].title : idle.t;
        text.textContent = k ? ORBIT[k].text : idle.x;
        title.style.color = k ? `var(--${ORBIT[k].css})` : "";
        swap.classList.remove("out");
      }, 180);
      if (k) setAccent(ORBIT[k].css);
    };
    Object.keys(els).forEach((k) => {
      const b = els[k];
      b.addEventListener("pointerenter", () => setActive(k));
      b.addEventListener("pointerleave", (e) => {
        if (e.pointerType !== "touch") setActive(null);
      });
      b.addEventListener("focus", () => setActive(k));
      b.addEventListener("blur", () => setActive(null));
      b.addEventListener("click", () => setActive(k));
    });
    wrap.addEventListener("pointerleave", (e) => {
      if (e.pointerType !== "touch") setActive(null);
    });
    app.mini = new Mini(wrap, canvas, (m) => buildOrbit(m, ctx), { z: 9.5 });
    if (!app.mini.ok) document.body.classList.add("nogl");
  }

  // ../../home/claude/repo/js/pages/skills.js
  function pageSkills() {
    const labels = SKILLS.map((s, i) => `<button type="button" class="skl" data-i="${i}" data-g="${s.group}" aria-describedby="skDesc">${esc(s.name)}</button>`).join("");
    const chips = [["all", "All"]].concat(Object.keys(SKILL_GROUPS).map((k) => [k, SKILL_GROUPS[k]])).map(([k, l]) => `<button type="button" class="chip" data-f="${k}" aria-pressed="${k === "all"}">${esc(l)}</button>`).join("");
    const list = Object.keys(SKILL_GROUPS).map((g) => `
    <div data-reveal="rule"><h3>${esc(SKILL_GROUPS[g])}</h3><ul>${SKILLS.filter((s) => s.group === g).map((s) => `<li>${esc(s.name)}</li>`).join("")}</ul></div>`).join("");
    return `
  ${pageHead("Skills", "The languages, frameworks and areas I work with. Drag the sphere, then hover or focus a skill.")}
  <section class="wrap skstage" aria-label="Skills ecosystem">
    <div class="skstage__cv" id="skwrap" data-cursor="drag">
      <canvas aria-hidden="true"></canvas>
      ${labels}
    </div>
    <aside class="skpanel" id="skpanel">
      <span class="mono" id="skGroup">Ecosystem</span>
      <div class="swap" id="skSwap" aria-live="polite">
        <h2 id="skName">Four areas, one toolkit</h2>
        <p id="skDesc">Web, languages and tools, AI and ML, and security. Hover a node to see where each one shows up in my work.</p>
      </div>
      <div class="chips" role="group" aria-label="Filter by area">${chips}</div>
    </aside>
  </section>
  <section class="wrap sklist" aria-label="All skills by area">${list}</section>
  ${nextOf("skills")}`;
  }
  function initSkills() {
    const wrap = $("#skwrap"), canvas = $("canvas", wrap);
    const els = $$(".skl", wrap);
    const ctx = { active: -1, filter: "all", els };
    const swap = $("#skSwap"), name = $("#skName"), desc = $("p", swap), grp = $("#skGroup"), panel = $("#skpanel");
    const idle = { n: name.textContent, d: desc.textContent, g: "Ecosystem" };
    let timer = null;
    const gcss = { web: "cyan", backend: "blue", ai: "violet", security: "green" };
    const setActive = (i) => {
      if (ctx.active === i) return;
      ctx.active = i;
      els.forEach((e, j) => e.classList.toggle("is-on", j === i));
      swap.classList.add("out");
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (i >= 0) {
          const s = SKILLS[i];
          name.textContent = s.name;
          desc.textContent = s.desc;
          grp.textContent = SKILL_GROUPS[s.group];
          panel.style.setProperty("--gc", `var(--${gcss[s.group]})`);
        } else {
          name.textContent = idle.n;
          desc.textContent = idle.d;
          grp.textContent = idle.g;
          panel.style.removeProperty("--gc");
        }
        swap.classList.remove("out");
      }, 160);
      if (i >= 0) {
        setAccent(gcss[SKILLS[i].group]);
        if (app.scene && app.scene.ok) app.scene.pulse(0.5);
      }
    };
    els.forEach((b, i) => {
      b.addEventListener("pointerenter", () => setActive(i));
      b.addEventListener("pointerleave", (e) => {
        if (e.pointerType !== "touch") setActive(-1);
      });
      b.addEventListener("focus", () => setActive(i));
      b.addEventListener("blur", () => setActive(-1));
      b.addEventListener("click", () => setActive(i));
    });
    $$(".chip", panel).forEach((c) => c.addEventListener("click", () => {
      ctx.filter = c.dataset.f;
      $$(".chip", panel).forEach((x) => x.setAttribute("aria-pressed", String(x === c)));
      els.forEach((e) => {
        e.style.pointerEvents = ctx.filter !== "all" && e.dataset.g !== ctx.filter ? "none" : "";
      });
    }));
    app.mini = new Mini(wrap, canvas, (m) => buildSkills(m, ctx), { z: 9.6 });
    if (!app.mini.ok) document.body.classList.add("nogl");
  }

  // ../../home/claude/repo/js/pages/projects.js
  function pageProjects() {
    const cards = PROJECTS.map((p) => `
    <article class="proj" data-tilt data-cursor="view" style="--pa-rgb:${ACCENTS[p.accent][1]}" data-reveal="fade">
      <div>
        <span class="proj__num" aria-hidden="true">${p.n}</span>
        <h2><a class="proj__link" href="#/projects/${p.slug}">${esc(p.title)}</a></h2>
        <p class="proj__d">${esc(p.blurb)}</p>
        ${p.tech.length ? `<ul class="tags" aria-label="Technologies">${p.tech.map((t, i) => `<li style="--i:${i}">${esc(t)}</li>`).join("")}</ul>` : ""}
        <span class="proj__cta" aria-hidden="true">View project ${ARROW}</span>
      </div>
      <div class="proj__vis" data-tilt-t>${preview(p.slug)}</div>
    </article>`).join("");
    return `
  ${pageHead("Projects", "Security tools, AI experiments and web builds. Every one has a live demo and public source code.")}
  <section class="wrap projs" aria-label="Projects">${cards}</section>
  ${nextOf("projects")}`;
  }
  function pageProject(p) {
    const i = PROJECTS.indexOf(p);
    const prev = PROJECTS[(i + PROJECTS.length - 1) % PROJECTS.length], next = PROJECTS[(i + 1) % PROJECTS.length];
    return `
  <article class="pd" style="--pa-rgb:${ACCENTS[p.accent][1]}">
    <section class="page wrap">
      <a class="pd__back mono" href="#/projects" data-cursor="link" data-reveal="fade">${ARROW} All projects</a>
      <p class="mono muted" style="margin-top:2rem" data-reveal="fade">Project ${p.n} of ${String(PROJECTS.length).padStart(2, "0")}</p>
      <h1 class="pd__title" data-reveal="words" style="margin-top:.6rem">${esc(p.title)}</h1>
      <p class="pd__lead" data-reveal="fade" style="--d:200ms">${esc(p.blurb)}</p>
      <div class="pd__box"><div class="pd__vis par" data-py="-0.3" data-reveal="clip" style="--d:250ms;display:block">${preview(p.slug)}</div></div>
    </section>

    <section class="wrap pd__grid">
      <div class="pd__col pd__col--a" data-reveal="rule">
        <h2>Overview</h2>
        <p>${esc(p.overview)}</p>
      </div>
      <div class="pd__col pd__col--b" data-reveal="rule" style="--d:100ms">
        <h2>What it does</h2>
        <ul>${p.facts.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
      </div>
      <div class="pd__col pd__col--c" data-reveal="rule" style="--d:200ms">
        ${p.tech.length ? `<h2>Technologies</h2><ul class="pd__tags" style="margin-bottom:2rem">${p.tech.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
        <h2>Links</h2>
        <div class="pd__links">
          <a class="btn btn--solid ext" href="${p.github || SITE.github}" target="_blank" rel="noopener noreferrer" data-magnet="0.2">View on GitHub ${ARROW_UR}</a>
          ${p.live ? `<a class="btn ext" href="${p.live}" target="_blank" rel="noopener noreferrer" data-magnet="0.2">${esc(p.liveLabel)} ${ARROW_UR}</a>` : ""}
        </div>
        ${p.github ? "" : `<p class="pd__note">The GitHub link opens my profile at ${SITE.githubLabel}.</p>`}
      </div>
    </section>

    <section class="wrap">
      <nav class="pd__pn" aria-label="Other projects">
        <a href="#/projects/${prev.slug}" data-cursor="link"><span class="mono muted">Previous</span><b>${esc(prev.title)}</b></a>
        <a href="#/projects/${next.slug}" data-cursor="link"><span class="mono muted">Next</span><b>${esc(next.title)}</b></a>
      </nav>
    </section>
    <footer class="foot wrap"><p class="foot__c">\xA9 2026 ${SITE.name}. Built with care.</p></footer>
  </article>`;
  }

  // ../../home/claude/repo/js/pages/certifications.js
  function pageCerts() {
    const feat = FEATURED.map((f) => `
    <article class="feat" data-reveal="fade">
      <span class="feat__y mono">${f.year}</span>
      <div><h3 class="feat__t">${esc(f.role)}</h3><p class="feat__o">${esc(f.org)}</p></div>
    </article>`).join("");
    const arch = ARCHIVE.map((g) => `
    <div class="tlg">
      <h3 class="tlg__y" data-reveal="fade">${g.year}</h3>
      <div class="tl"><i class="tl__fill" aria-hidden="true"></i>
        ${g.items.map((e) => `<div class="entry"><span class="entry__d mono">${e.d}</span><h4 class="entry__t">${esc(e.t)}</h4><span class="entry__k mono">${e.k}</span></div>`).join("")}
      </div>
    </div>`).join("");
    return `
  ${pageHead("Certifications", "Internships, open-source programs, certifications and job simulations.")}
  <section class="wrap" style="margin-top:clamp(2.4rem,6vw,5rem)" aria-label="Internships and contributions">
    ${feat}
  </section>
  <section class="wrap arch" aria-labelledby="archH">
    <h2 class="h2" id="archH" data-reveal="words">Archive</h2>
    ${arch}
  </section>
  ${nextOf("certifications")}`;
  }

  // ../../home/claude/repo/js/pages/journey.js
  function pageJourney() {
    const step = (b, s) => `<div class="step" data-reveal="fade"><b>${esc(b)}</b>${s ? `<span>${esc(s)}</span>` : ""}</div>`;
    return `
  ${pageHead("Journey", "From school to internships: open source, certifications, a hackathon and two cybersecurity internships.")}
  <section class="wrap" style="margin-top:clamp(2.4rem,6vw,5rem)">
    <div class="phase" data-reveal="rule">
      <div><h2 class="phase__k">School</h2><p class="phase__sub">Where the foundations started.</p></div>
      <div>
        ${step("Class X, CBSE, Doon Bharti Public School, Faridabad", "2022 to 2023")}
        ${step("Class XII, CBSE (Science), Doon Bharti Public School, Faridabad", "2024 to 2025")}
      </div>
    </div>
    <div class="phase" data-reveal="rule">
      <div><h2 class="phase__k">2025</h2><p class="phase__sub">Starting B.Tech, contributing, certifying.</p></div>
      <div>
        ${step("Started B.Tech CSE (Cybersecurity) at LIET, Greater Noida", "2025")}
        ${step("Tech Contributor, GirlScript Summer of Code (GSSoC)", "2025")}
        ${step("AI Appreciate and AI Aware", "Jul 2025")}
        ${step("Super Contributor, Hacktoberfest (DigitalOcean)", "Oct 2025")}
        ${step("Certified AppSec, Network Security and Cloud Security (AWS) Practitioner, The SecOps Group", "Oct 2025")}
      </div>
    </div>
    <div class="phase" data-reveal="rule">
      <div><h2 class="phase__k">2026</h2><p class="phase__sub">Hackathon, simulations and internships.</p></div>
      <div>
        ${step("BlueNexus, Smart India Hackathon 2026 (team)", "Built the 3D frontend and helped on the FastAPI backend")}
        ${step("Job simulations: Tata (IAM), Mastercard (Phishing), Deloitte (Cyber) and EY (Technology Risk)", "Jun to Jul 2026")}
        <div class="hl" data-reveal="fade"><span class="mono muted">Internship</span><b>Cyber Security Analyst Intern</b><span>Thiranex, remote, 03 Jul to 02 Aug 2026</span></div>
        <div class="hl" data-reveal="fade"><span class="mono muted">Internship</span><b>Ethical Hacking & Cybersecurity Intern</b><span>VaultofCodes, remote, from 25 Jul 2026, via the AICTE National Internship Portal</span></div>
        ${step("Ethical Hacking with AI, Unstop", "Aug 2026")}
        ${step("MongoDB Basics", "Aug 2026")}
      </div>
    </div>
    <div class="phase" data-reveal="rule">
      <div><h2 class="phase__k">Now</h2><p class="phase__sub">Studying and building.</p></div>
      <div>
        ${step("B.Tech, Computer Science & Engineering", "Specializing in Cybersecurity, LIET, 2025 to 2029")}
        <div class="built" data-reveal="fade">${PROJECTS.map((p) => `<a href="#/projects/${p.slug}" data-cursor="link">${esc(p.title)}</a>`).join("")}</div>
      </div>
    </div>
  </section>
  ${nextOf("experience")}`;
  }

  // ../../home/claude/repo/js/pages/contact.js
  function pageContact() {
    return `
  <section class="page wrap">
    <div class="ct">
      <div>
        <h1 class="title" data-reveal="chars">Let's connect.</h1>
        <p class="lead" data-reveal="words">Email is the fastest way to reach me. LinkedIn and GitHub are below.</p>
      </div>
      <a class="orbbtn" href="mailto:${SITE.email}" data-magnet="0.35" data-reveal="fade" style="--d:300ms">
        <span>Get in<br>touch</span>
        <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
    </div>
    <div class="lrows">
      <div class="lrow" data-reveal="fade"><span class="mono muted">Email</span><a class="lrow__a lrow__t" href="mailto:${SITE.email}" data-cursor="link">${SITE.email}</a><button type="button" class="copy" data-copy="${SITE.email}">Copy</button></div>
      <div class="lrow" data-reveal="fade"><span class="mono muted">LinkedIn</span><a class="lrow__a lrow__t ext" href="${SITE.linkedin}" target="_blank" rel="noopener noreferrer" data-cursor="link">Rishabh Prajapati</a>${ARROW_UR}</div>
      <div class="lrow" data-reveal="fade"><span class="mono muted">GitHub</span><a class="lrow__a lrow__t ext" href="${SITE.github}" target="_blank" rel="noopener noreferrer" data-cursor="link">@rishabhh077</a>${ARROW_UR}</div>
    </div>
    <div class="ct__more mono" data-reveal="fade">
      <span><b>Phone</b><a class="ul" href="tel:${SITE.phone}">${SITE.phoneLabel}</a></span>
      <span><b>Location</b>${SITE.location}</span>
    </div>
  </section>
  ${footer("/", "Home")}`;
  }
  function initContact() {
    initCopy(document);
    initFills(document);
  }

  // ../../home/claude/repo/js/router.js
  var noop = () => {
  };
  var PAGES = {
    "/": { key: "home", title: "Rishabh Prajapati: Cybersecurity, AI and Web", label: "Home", render: pageHome, init: initHome, accent: "cyan" },
    "/about": { key: "about", title: "About", label: "About", render: pageAbout, init: initAbout, accent: "blue" },
    "/skills": { key: "skills", title: "Skills", label: "Skills", render: pageSkills, init: initSkills, accent: "cyan" },
    "/projects": { key: "projects", title: "Projects", label: "Projects", render: pageProjects, init: noop, accent: "violet" },
    "/certifications": { key: "certifications", title: "Certifications", label: "Certifications", render: pageCerts, init: noop, accent: "blue" },
    "/experience": { key: "experience", title: "Journey", label: "Journey", render: pageJourney, init: noop, accent: "cyan" },
    "/contact": { key: "contact", title: "Contact", label: "Contact", render: pageContact, init: initContact, accent: "cyan" }
  };
  function currentPath() {
    let h = location.hash.replace(/^#/, "");
    if (!h.startsWith("/")) h = "/";
    h = h.replace(/\/+$/, "") || "/";
    return h;
  }
  function resolve(path) {
    if (PAGES[path]) return PAGES[path];
    const m = path.match(/^\/projects\/([a-z0-9-]+)$/);
    if (m) {
      const p = PROJECTS.find((x) => x.slug === m[1]);
      if (p) return { key: "projects", scene: "detail", title: p.title, label: p.title, render: () => pageProject(p), init: noop, accent: p.accent };
    }
    return { key: "", scene: "about", title: "Page not found", label: "404", render: page404, init: noop, accent: "cyan" };
  }
  async function curtainIn(label) {
    if (reduced()) return;
    const c = $("#curtain");
    $("#curtainLabel").textContent = label;
    c.classList.remove("out");
    c.classList.add("live");
    void c.offsetWidth;
    c.classList.add("in");
    await sleep(640);
  }
  async function curtainOut() {
    if (reduced()) return;
    const c = $("#curtain");
    c.classList.add("out");
    void c.offsetWidth;
    c.classList.remove("in");
    await sleep(540);
    c.classList.remove("live", "out");
  }
  function teardown() {
    if (app.mini) {
      app.mini.dispose();
      app.mini = null;
    }
    document.body.classList.remove("nogl");
    const peek = $("#peek");
    peek.classList.remove("on");
    app.peekOn = false;
    disposeReveals();
    app.parallax = [];
    app.tls = [];
    app.phases = [];
  }
  var current = null;
  var busy = false;
  var pending = null;
  async function go(path, first) {
    if (busy) {
      pending = path;
      return;
    }
    if (path === current) return;
    busy = true;
    const page = resolve(path);
    if (!first) await curtainIn(page.label);
    teardown();
    setMenu(false);
    const main = $("#main");
    main.innerHTML = page.render();
    document.title = page.key === "home" ? page.title : page.title + " | Rishabh Prajapati";
    if (app.lenis) {
      app.lenis.scrollTo(0, { immediate: true });
      app.lenis.resize();
    } else window.scrollTo(0, 0);
    frame.sy = 0;
    setNavActive(page.key);
    if (app.scene && app.scene.ok) app.scene.setRoute(page.scene || page.key || "about");
    setAccent(page.accent);
    $$('[data-reveal="words"]', main).forEach(splitWords);
    $$('[data-reveal="chars"]', main).forEach((el) => splitChars(el, !el.closest(".hero__name")));
    initMagnets(main);
    initTilt(main);
    page.init();
    collectScrollTargets();
    initAccents(page.accent);
    if (!first) {
      const out = curtainOut();
      await sleep(180);
      initReveals();
      await out;
    }
    current = path;
    busy = false;
    $("#live").textContent = "Navigated to " + page.label;
    if (!first) main.focus({ preventScroll: true });
    if (pending && pending !== path) {
      const p = pending;
      pending = null;
      go(p);
    } else pending = null;
  }

  // ../../home/claude/repo/js/main.js
  async function boot() {
    window.__rpBooted = true;
    document.documentElement.classList.add("js");
    buildNav();
    initCursor();
    if (typeof Lenis !== "undefined" && !reduced()) {
      try {
        app.lenis = new Lenis({ lerp: 0.16, wheelMultiplier: 1.05, smoothWheel: true, syncTouch: false });
      } catch {
        app.lenis = null;
      }
    }
    app.scene = new Scene($("#bg"));
    let lastT = performance.now();
    const master = (t) => {
      requestAnimationFrame(master);
      const dt = Math.min(0.05, (t - lastT) / 1e3 || 0.016);
      lastT = t;
      if (app.lenis) app.lenis.raf(t);
      scrollFrame();
      cursorTick(dt);
      if (app.scene && app.scene.ok) app.scene.frame(t);
      if (app.mini && app.mini.ok) app.mini.frame(t);
    };
    requestAnimationFrame(master);
    addEventListener("resize", scheduleMeasure);
    if (window.ResizeObserver) new ResizeObserver(scheduleMeasure).observe($("#main"));
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    addEventListener("load", measure);
    $("#burger").addEventListener("click", () => setMenu(!$("#menu").classList.contains("open")));
    addEventListener("keydown", (e) => {
      if (e.key === "Escape" && $("#menu").classList.contains("open")) {
        setMenu(false);
        $("#burger").focus();
      }
    });
    $("#menu").addEventListener("click", (e) => {
      if (e.target.closest("a")) setMenu(false);
    });
    $("#skip").addEventListener("click", (e) => {
      e.preventDefault();
      const m = $("#main");
      m.focus();
      m.scrollIntoView();
    });
    addEventListener("hashchange", () => go(currentPath()));
    if (mqReduce.addEventListener) mqReduce.addEventListener("change", () => location.reload());
    await go(currentPath(), true);
    await runLoader();
    initReveals();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
