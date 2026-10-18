import React, { Suspense, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls, Sparkles, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowDown, ArrowRight, ArrowUpRight, BrainCircuit, BriefcaseBusiness, Code2,
  Download, Github, GraduationCap, House, Linkedin, Mail, Menu, Monitor,
  Moon, Sparkles as SparkleIcon, UserRound, X, Zap, Phone, MessageCircle
} from "lucide-react";
import "./styles.css";

const PROFILE = {
  name: "Jagadish V",
  email: "jv8380@srmist.edu.in",
  phone: "9176081437",
  linkedin: "https://www.linkedin.com/in/jagadish-v-b6b90a29b",
  github: "https://github.com/jagadishnot",
  resume: "/Jagadish-V-Resume.pdf"
};

const projects = [
  {
    number: "01", title: "VOICEDOC AI", image: "/images/projects/voicedoc-ai.svg", subtitle: "Talk to Your Files",
    description: "A privacy-focused AI workspace for asking questions about documents, summarizing audio, and exploring data.",
    tags: ["React", "Python", "Ollama", "RAG", "FAISS"],
    category: "GENERATIVE AI", icon: "◈", color: "violet",
    github: "https://github.com/jagadishnot/VoiceDocAI",
    demo: "https://github.com/jagadishnot/VoiceDocAI"
  },
  {
    number: "02", title: "ISL TRANSLATOR", image: "/images/projects/isl-translator.svg", subtitle: "Real-time Sign Language AI",
    description: "A real-time Indian Sign Language translation system using landmark extraction and a hybrid GNN + Transformer model.",
    tags: ["PyTorch", "MediaPipe", "FastAPI", "WebSockets"],
    category: "COMPUTER VISION", icon: "⌁", color: "blue",
    github: "https://github.com/jagadishnot/ISL-RT-AI1",
    demo: "https://github.com/jagadishnot/ISL-RT-AI1",
    metric: "95.4% word accuracy · 241-word vocabulary"
  },
  {
    number: "03", title: "RENTAL PLATFORM", image: "/images/projects/rental-platform.svg", subtitle: "House & Vehicle Marketplace",
    description: "A rental marketplace with role-based owner/customer experiences, listing management, bookings, and an AI assistant.",
    tags: ["React", "Supabase", "PostgreSQL", "Groq API"],
    category: "FULL STACK", icon: "⌂", color: "cyan",
    github: "https://house-vehicle-rental-system.onrender.com",
    demo: "https://house-vehicle-rental-system.onrender.com"
  },
  {
    number: "04", title: "AI HAND CRICKET", image: "/images/projects/ai-hand-cricket.svg", subtitle: "Gesture-powered game",
    description: "An interactive cricket game with camera-based hand gesture recognition, an AI opponent, scoring, and OUT conditions.",
    tags: ["Python", "OpenCV", "React", "Machine Learning"],
    category: "AI + WEB", icon: "✳", color: "orange",
    github: "https://hand-cricket-yelm.onrender.com",
    demo: "https://hand-cricket-yelm.onrender.com"
  },
  {
    number: "05", title: "YOUTUBE SENTIMENT", image: "/images/projects/youtube-sentiment.svg", subtitle: "Comment intelligence",
    description: "A full-stack sentiment analysis application using a Transformer model to classify YouTube comments.",
    tags: ["DistilBERT", "Flask", "React", "NLP"],
    category: "NLP", icon: "◉", color: "pink",
    github: "https://yt-frontend-2u2f.onrender.com",
    demo: "https://yt-frontend-2u2f.onrender.com"
  },
  {
    number: "06", title: "COLLEGE + E-COMMERCE", image: "/images/projects/college-mern.svg", subtitle: "One connected platform",
    description: "A MERN application combining a college admission portal with student registration, product listings, and checkout.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    category: "MERN STACK", icon: "▦", color: "green",
    github: "https://collegewebsite-4.onrender.com",
    demo: "https://collegewebsite-4.onrender.com"
  },
  {
    number: "07", title: "AI FITNESS TRACKER", image: "/images/projects/fitness-tracker.svg", subtitle: "Fitness & diet companion",
    description: "A fitness and diet management application with workout tracking, calorie monitoring, and AI-assisted guidance.",
    tags: ["React", "JavaScript", "AI Chatbot", "Health Analytics"],
    category: "AI + WELLNESS", icon: "✧", color: "pink",
    github: "https://github.com/jagadishnot/fitnessjaga",
    demo: "https://github.com/jagadishnot/fitnessjaga"
  },
  {
    number: "08", title: "TITANIC SURVIVAL ML", image: "/images/projects/titanic-ml.svg", subtitle: "Predictive analytics",
    description: "A machine learning project using data preprocessing, feature engineering, and model evaluation to predict passenger survival.",
    tags: ["Python", "Pandas", "Scikit-learn", "Random Forest"],
    category: "DATA SCIENCE", icon: "⌁", color: "blue",
    github: "https://github.com/jagadishnot",
    demo: "https://github.com/jagadishnot"
  },
  {
    number: "09", title: "LOAN DEFAULT PREDICTION", subtitle: "Risk modelling",
    description: "A predictive modelling project focused on loan default risk using data preparation and neural-network experimentation.",
    tags: ["Python", "Machine Learning", "ANN", "Data Analysis"],
    category: "MACHINE LEARNING", icon: "◉", color: "green",
    github: "https://github.com/jagadishnot",
    demo: "https://github.com/jagadishnot"
  },
  {
    number: "10", title: "IOT WATER QUALITY", image: "/images/projects/iot-water-quality.svg", subtitle: "Data-driven monitoring",
    description: "An exploratory water-quality classification project combining IoT context with a hybrid KNN–MLP modelling approach.",
    tags: ["Python", "KNN", "MLP", "Classification"],
    category: "APPLIED ML", icon: "≈", color: "cyan",
    github: "https://github.com/jagadishnot",
    demo: "https://github.com/jagadishnot"
  }
];

const certificates = [
  { title: "SAP Certificate", image: "/images/certificates/sap.svg", provider: "SAP", category: "GENERATIVE AI", url: "https://drive.google.com/file/d/1_UgqN6uTSLZumjttXi5Ci4l254zwbgoa/view?usp=drivesdk", icon: "✳" },
  { title: "NPTEL — Machine Learning", image: "/images/certificates/nptel.svg", provider: "NPTEL", category: "MACHINE LEARNING", url: "https://drive.google.com/file/d/18C-4fGTwBiYnWdNo5Xlsq14NEenw6oaN/view?usp=drivesdk", icon: "◈" },
  { title: "AWS Machine Learning Fundamentals", image: "/images/certificates/aws.svg", provider: "Amazon Web Services", category: "CLOUD & AI", url: "https://drive.google.com/file/d/1R9fy98pwrmT4bl11QFT84BR1FoFGL4uP/view?usp=drivesdk", icon: "☁" },
  { title: "Scaler Certificate", image: "/images/certificates/scaler.svg", provider: "Scaler", category: "TECHNOLOGY", url: "https://drive.google.com/file/d/1Qe4M_rVG8kvcnR6KGoEZ2CC2m1INnkP0/view?usp=drivesdk", icon: "⌘" },
  { title: "Data Visualization using Tableau", image: "/images/certificates/tableau.svg", provider: "Tableau", category: "DATA ANALYTICS", url: "https://drive.google.com/file/d/1Qv_GHfojmxRcrjDDdu-UYD5N73qWYUFy/view?usp=drivesdk", icon: "▥" },
  { title: "Big Data Analytics", image: "/images/certificates/big-data.svg", provider: "Certificate", category: "BIG DATA", url: "https://drive.google.com/file/d/1R5S6iPBRQClPyJ6YYsMFStnTQXNZTN7f/view?usp=drivesdk", icon: "⌁" },
  { title: "BE10X Certificate", image: "/images/certificates/be10x.svg", provider: "BE10X", category: "AI & PRODUCTIVITY", url: "https://drive.google.com/file/d/1RFfoB4oDqpDj9mqoxLLyZvNuirH94ocz/view?usp=drivesdk", icon: "✦" },
  { title: "Cybersecurity Analyst Job Simulation", image: "/images/certificates/forage.svg", provider: "Forage", category: "CYBERSECURITY", url: "https://drive.google.com/file/d/1RI3m8Gn9LrIW_yUy6WEfKejGQSFPr2WS/view?usp=drivesdk", icon: "⬡" },
  { title: "Internship Certificate", image: "/images/certificates/internship.svg", provider: "CodSoft", category: "INTERNSHIP", url: "https://drive.google.com/drive/folders/1PXKHJyR-zto06pd1zjlki0mj5RyGoCz5", icon: "✧" },
  { title: "Hackathon Certificates", image: "/images/certificates/hackathon.svg", provider: "Collection", category: "HACKATHONS", url: "https://drive.google.com/drive/folders/1PklmAAhjUZkDPL47Jwe99ss87z2NhjOR", icon: "⚡" },
  { title: "Oracle Certificates", image: "/images/certificates/oracle.svg", provider: "Oracle", category: "DATABASE & CLOUD", url: "https://drive.google.com/drive/folders/1inpE9b7x4uG1vaOyuzHnK5Dd9IBfN0qa", icon: "◉" },
  { title: "Coursera Certificate", image: "/images/certificates/coursera.svg", provider: "Coursera", category: "ONLINE LEARNING", url: "https://drive.google.com/file/d/1aovXiunjD59iHv4-05aB-XOIuUAr-L6P/view?usp=drivesdk", icon: "✳" },
  { title: "Anthropic Certificate", image: "/images/certificates/anthropic.svg", provider: "Anthropic", category: "GENERATIVE AI", url: "https://drive.google.com/file/d/1gzQMktMbGLsT-24k6z0y5vAfXEu3lq9r/view?usp=drivesdk", icon: "✺" }
];

const skills = [
  { title: "Programming & CS", text: "Python · C · C++ · JavaScript · TypeScript · Java · SQL · Data Structures & Algorithms", level: 88 },
  { title: "Data Analytics", text: "Pandas · NumPy · Excel · Power BI · Tableau · Statistics · Data Cleaning · Data Visualization", level: 86 },
  { title: "Machine Learning", text: "Scikit-learn · TensorFlow · PyTorch · Keras · XGBoost · Random Forest · Model Evaluation", level: 84 },
  { title: "Generative AI & NLP", text: "LLMs · RAG · Ollama · FAISS · SentenceTransformers · NLP · Prompt Engineering · MCP", level: 82 },
  { title: "Computer Vision", text: "OpenCV · MediaPipe · Image Processing · Landmark Extraction · Real-time Inference", level: 80 },
  { title: "Full Stack Engineering", text: "React · Node.js · Express.js · Next.js · HTML · CSS · Tailwind CSS · REST APIs", level: 88 },
  { title: "Backend & Databases", text: "FastAPI · MongoDB · PostgreSQL · MySQL · Supabase · Prisma · Authentication", level: 84 },
  { title: "Big Data, Cloud & DevOps", text: "Hadoop · Spark / PySpark · Kafka · Airflow · Databricks · AWS · GCP · Docker · Kubernetes", level: 74 },
  { title: "Tools & Deployment", text: "Git · GitHub · Linux · VS Code · Vercel · Render · Jupyter · CUDA · MLflow", level: 82 }
];

function Orb() {
  const mesh = useRef();
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.16;
      mesh.current.rotation.y += delta * 0.23;
    }
  });
  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.8}>
      <mesh ref={mesh} scale={1.45}>
        <icosahedronGeometry args={[1, 5]} />
        <MeshDistortMaterial color="#7162ff" roughness={0.15} metalness={0.75} distort={0.34} speed={2.2} />
      </mesh>
    </Float>
  );
}

function ThreeHero() {
  return (
    <div className="scene" aria-label="Animated 3D abstract orb">
      <Canvas camera={{ position: [0, 0, 5], fov: 44 }} dpr={[1, 1.7]}>
        <ambientLight intensity={1.3} />
        <pointLight position={[3, 2, 4]} intensity={22} color="#5ee7ff" />
        <pointLight position={[-3, -2, 2]} intensity={18} color="#9a5bff" />
        <Suspense fallback={null}>
          <Orb />
          <Sparkles count={100} scale={5.6} size={2.5} speed={0.3} color="#a5e8ff" />
          <Stars radius={18} depth={5} count={500} factor={2.3} saturation={0} fade speed={0.4} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.55} />
      </Canvas>
      <div className="scene-glow" />
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="float-label label-top"><span className="live-dot" /> BUILDING SOMETHING NEW</div>
      <div className="float-label label-bottom"><Code2 size={15} /> AI · WEB · DATA</div>
    </div>
  );
}

function Sidebar({ active, setActive, open, setOpen }) {
  const nav = [
    ["home", "Home", House], ["about", "About", UserRound], ["skills", "Skills", BrainCircuit],
    ["projects", "Projects", Code2], ["experience", "Experience", BriefcaseBusiness],
    ["certificates", "Certificates", GraduationCap], ["contact", "Contact", Mail]
  ];
  return (
    <>
      <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
        {open ? <X /> : <Menu />}
      </button>
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <a href="#home" className="brand-mark" onClick={() => { setActive("home"); setOpen(false); }}>
          <span>JV</span><i />
        </a>
        <div className="sidebar-caption">PORTFOLIO / 2026</div>
        <nav>
          {nav.map(([id, label, Icon]) => (
            <a key={id} href={`#${id}`} className={active === id ? "nav-link active" : "nav-link"}
              onClick={() => { setActive(id); setOpen(false); }}>
              <Icon size={18} strokeWidth={1.8} /><span>{label}</span>
            </a>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="availability"><span className="live-dot" /> OPEN TO OPPORTUNITIES</div>
          <div className="socials">
            <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
            <a href={`mailto:${PROFILE.email}`} aria-label="Email"><Mail /></a>
          </div>
          <span className="side-location">CHENNAI, INDIA · IST</span>
        </div>
      </aside>
    </>
  );
}

function SectionHeading({ eyebrow, title, accent, description }) {
  return (
    <div className="section-heading">
      <div className="eyebrow"><span /> {eyebrow}</div>
      <h2>{title} <span className="gradient-text">{accent}</span></h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const handlePointerMove = (event) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    setTilt({ x: (0.5 - y) * 7, y: (x - 0.5) * 8 });
  };
  const resetTilt = () => setTilt({ x: 0, y: 0 });
  return (
    <motion.article className={`project-card ${project.color}`} initial={{ opacity: 0, y: 34, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={handlePointerMove} onPointerLeave={resetTilt}
      style={{ "--tilt-x": `${tilt.x}deg`, "--tilt-y": `${tilt.y}deg` }}>

      <div className="project-visual">
        <img className="project-art-image" src={project.image || "/images/projects/voicedoc-ai.svg"} alt={`${project.title} 3D illustration`} loading="lazy" />
        <div className="visual-grid" />
        <div className="visual-orb">{project.icon}</div>
        <span className="project-number">{project.number}</span>
        <span className="project-category">{project.category}</span>
        <div className="visual-lines"><i /><i /><i /><i /></div>
      </div>
      <div className="project-content">
        <div className="project-title-row"><h3>{project.title}</h3><ArrowUpRight size={18} /></div>
        <div className="project-subtitle">{project.subtitle}</div>
        <p>{project.description}</p>
        {project.metric && <div className="metric"><Zap size={13} /> {project.metric}</div>}
        <div className="tag-list">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <div className="project-actions">
          <a className="small-primary" href={project.demo} target="_blank" rel="noreferrer">Explore project <ArrowUpRight size={15} /></a>
          <a className="icon-action" href={project.github} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}><Github size={17} /></a>
        </div>
      </div>
    </motion.article>
  );
}

function App() {
  const [active, setActive] = React.useState("home");
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [showAll, setShowAll] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const cinematicRoot = React.useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    // Scene-like section entrances, with subtle depth and no forced scroll hijacking.
    gsap.utils.toArray(".section-heading, .about-main, .detail-card, .skill-card, .timeline-item, .contact-card").forEach((el, i) => {
      gsap.fromTo(el,
        { autoAlpha: 0, y: 34, rotateX: 2 },
        {
          autoAlpha: 1, y: 0, rotateX: 0, duration: 0.8, ease: "power3.out",
          delay: (i % 3) * 0.045,
          scrollTrigger: { trigger: el, start: "top 88%", once: true }
        }
      );
    });

    // Gentle parallax for the hero environment and ambient background.
    gsap.to(".hero-art", {
      yPercent: 9, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.7 }
    });
    gsap.to(".ambient-a", {
      y: 150, x: -35, ease: "none",
      scrollTrigger: { trigger: ".main-content", start: "top top", end: "bottom bottom", scrub: 1.2 }
    });
    gsap.utils.toArray(".project-card").forEach((card, i) => {
      gsap.fromTo(card,
        { autoAlpha: 0, y: 44, rotateY: i % 2 === 0 ? -3 : 3, scale: 0.975 },
        {
          autoAlpha: 1, y: 0, rotateY: 0, scale: 1, duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 92%", once: true }
        }
      );
    });
    gsap.utils.toArray(".certificate-card").forEach((card, i) => {
      gsap.fromTo(card,
        { autoAlpha: 0, y: 28, rotateX: -4 },
        {
          autoAlpha: 1, y: 0, rotateX: 0, duration: 0.62,
          ease: "power2.out",
          delay: (i % 4) * 0.045,
          scrollTrigger: { trigger: card, start: "top 94%", once: true }
        }
      );
    });
  }, { scope: cinematicRoot, dependencies: [] });

  React.useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "experience", "certificates", "contact"];
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-32% 0px -52% 0px" });
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -7% 0px" });
    document.documentElement.classList.add("motion-ready");
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) { navObserver.observe(el); if (id !== "home") revealObserver.observe(el); }
    });
    document.querySelectorAll(".stats-strip, .timeline-item, .about-main, .detail-card, .tech-cloud, .contact-card")
      .forEach(el => revealObserver.observe(el));
    return () => { navObserver.disconnect(); revealObserver.disconnect(); document.documentElement.classList.remove("motion-ready"); };
  }, []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  }

  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [showTop, setShowTop] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      setShowTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="app-shell" ref={cinematicRoot}>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <div className="ambient ambient-a" /><div className="ambient ambient-b" />
      <Sidebar active={active} setActive={setActive} open={menuOpen} setOpen={setMenuOpen} />
      <main className="main-content">
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <motion.div className="status-pill" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <span className="live-dot" /> AVAILABLE FOR INTERNSHIPS & PROJECTS
            </motion.div>
            <motion.p className="hero-kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>HELLO, WORLD. I'M</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }}>
              Jagadish<br /><span className="gradient-text">V<span className="period">.</span></span>
            </motion.h1>
            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
              Data Analyst <span>/</span> Software Engineer <span>/</span> AI/ML Developer
            </motion.h2>
            <motion.p className="hero-description" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
              I turn data into insights and ideas into intelligent solutions, combining Data Science, Software Engineering, and AI to build impactful real-world applications.
            </motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <a className="primary-button" href="#projects">Explore my work <ArrowRight size={17} /></a>
              <a className="secondary-button" href={PROFILE.resume} download><Download size={16} /> Download resume</a>
            </motion.div>
            <div className="hero-contact-links">
              <a href={`tel:+91${PROFILE.phone}`}><Phone size={17}/><span><strong>+91 {PROFILE.phone}</strong><small>Call me</small></span></a>
              <a href={`https://wa.me/91${PROFILE.phone}?text=${encodeURIComponent("Hi Jagadish, I saw your portfolio and would like to connect.")}`} target="_blank" rel="noreferrer"><MessageCircle size={18}/><span><strong>Chat on WhatsApp</strong><small>Usually replies fast</small></span></a>
              <a href={`mailto:${PROFILE.email}`}><Mail size={17}/><span><strong>{PROFILE.email}</strong><small>Send email</small></span></a>
            </div>
            <div className="hero-footnote"><ArrowDown size={14} /> SCROLL TO EXPLORE <span className="foot-line" /></div>
          </div>
          <motion.div className="hero-art" initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}>
            <div className="hero-researcher-scene">
              <img src="/images/hero-ai-researcher.png" alt="3D illustration of an AI developer researching with a laptop and holographic neural network" />
              <div className="researcher-caption"><span className="live-dot" /> AI RESEARCH LAB <i>● LIVE</i></div>
              <div className="research-hud hud-data"><span>DATA ANALYSIS</span><div className="hud-bars"><i/><i/><i/><i/><i/><i/></div><small>Processing dataset...</small></div>
              <div className="research-hud hud-model"><span>MODEL TRAINING</span><div className="hud-wave">⌁ ⌁ ⌁ ⌁</div><small>Neural network active</small></div>
            </div>
            <div className="code-card">
              <div className="code-card-top"><span /><span /><span /><small>jagadish.py</small></div>
              <pre><span className="code-purple">class</span> <span className="code-blue">Developer</span>:{"\n"}  focus = <span className="code-green">"AI + Web"</span>{"\n"}  learn(<span className="code-green">"every day"</span>){"\n"}  <span className="code-purple">return</span> impact</pre>
            </div>
            <div className="floating-chip chip-ai"><BrainCircuit size={16} /> Generative AI</div>
            <div className="floating-chip chip-data"><Monitor size={16} /> Data Science</div>
          </motion.div>
          <div className="hero-index">01 <span /> 06</div>
        </section>

        <section className="stats-strip">
          <div><strong>8.8<span>/10</span></strong><small>ACADEMIC GPA</small></div>
          <div><strong>06<span>+</span></strong><small>FEATURED PROJECTS</small></div>
          <div><strong>AI<span>×</span>WEB</strong><small>CORE FOCUS</small></div>
          <div><strong>2027</strong><small>GRADUATION TARGET</small></div>
        </section>

        <section className="section-wrap about-section" id="about">
          <SectionHeading eyebrow="A LITTLE ABOUT ME" title="Curiosity into" accent="creation." />
          <div className="about-grid">
            <div className="about-main">
              <div className="about-symbol"><SparkleIcon size={27} /></div>
              <h3>Building beyond<br />the obvious.</h3>
              <p>I'm an integrated M.Tech CSE student specializing in Data Science at SRM Institute of Science and Technology. I enjoy solving meaningful problems through practical AI systems, thoughtful interfaces, and reliable full-stack applications.</p>
              <p>From local-first document intelligence to real-time sign language translation, I like taking ideas from experiment to working product.</p>
              <a href="#contact" className="text-link">Let's build something <ArrowRight size={15} /></a>
            </div>
            <div className="about-details">
              <div className="detail-card"><span className="detail-icon"><GraduationCap /></span><div><small>EDUCATION</small><h4>Integrated M.Tech — CSE</h4><p>Data Science · SRMIST</p></div><span className="detail-year">2022–27</span></div>
              <div className="detail-card"><span className="detail-icon"><BriefcaseBusiness /></span><div><small>EXPERIENCE</small><h4>Data Science Intern</h4><p>CodSoft · Remote</p></div><span className="detail-year">2024</span></div>
              <div className="detail-card"><span className="detail-icon"><BrainCircuit /></span><div><small>INTERESTS</small><h4>AI, RAG & intelligent apps</h4><p>ML · NLP · Full Stack</p></div><span className="detail-year">NOW</span></div>
            </div>
          </div>
        </section>

        <section className="section-wrap skills-section" id="skills">
          <SectionHeading eyebrow="MY TOOLKIT" title="Skills that make" accent="ideas real." description="A practical stack for turning data and ideas into useful applications." />
          <div className="skills-grid">
            {skills.map((skill, i) => <motion.div className="skill-card" key={skill.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <div className="skill-card-head"><span className={`skill-index s${i}`}>0{i + 1}</span><ArrowUpRight size={16} /></div>
              <h3>{skill.title}</h3><p>{skill.text}</p>
              <div className="skill-track"><motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.25 + i * 0.08 }} /></div>
            </motion.div>)}
          </div>
          <div className="tech-cloud"><span>ALSO EXPLORING</span>{["MCP", "n8n", "LLM Fine-tuning", "Power BI", "MySQL", "MongoDB", "CUDA", "Git & GitHub"].map(t => <i key={t}>{t}</i>)}</div>
        </section>

        <section className="section-wrap projects-section" id="projects">
          <div className="projects-heading-row">
            <SectionHeading eyebrow="SELECTED WORK · 2024—2026" title="Ideas made" accent="tangible." description="A few projects where engineering meets experimentation." />
            <button className="outline-button" onClick={() => setShowAll(!showAll)}>{showAll ? "Show featured" : "View all projects"} <ArrowRight size={15} /></button>
          </div>
          <div className="projects-grid">{projects.slice(0, showAll ? projects.length : 4).map((project, i) => <ProjectCard key={project.number} project={project} index={i} />)}</div>
        </section>

        <section className="section-wrap experience-section" id="experience">
          <SectionHeading eyebrow="THE JOURNEY SO FAR" title="Learning by" accent="building." />
          <div className="timeline">
            <div className="timeline-item"><div className="timeline-dot" /><div className="timeline-date">JAN — FEB 2024</div><div className="timeline-body"><div className="timeline-top"><h3>Data Science Intern</h3><span>INTERNSHIP</span></div><h4>CodSoft <span>· Remote</span></h4><p>Worked with Python for data preprocessing, statistical analysis, visualization, and machine learning model development.</p><div className="tag-list"><span>Python</span><span>Machine Learning</span><span>Matplotlib</span><span>Seaborn</span></div></div></div>
            <div className="timeline-item"><div className="timeline-dot current" /><div className="timeline-date">2022 — 2027</div><div className="timeline-body"><div className="timeline-top"><h3>Integrated M.Tech, CSE</h3><span>EDUCATION</span></div><h4>SRM Institute of Science and Technology</h4><p>Specialization in Data Science, with a focus on software engineering, analytics, and applied AI.</p><div className="tag-list"><span>Data Science</span><span>Computer Science</span><span>8.8 GPA</span></div></div></div>
          </div>
        </section>

        <section className="section-wrap certificates-section" id="certificates">
          <SectionHeading eyebrow="LEARNING NEVER STOPS" title="Proof of" accent="progress." description="Explore my certificates and learning milestones. Each card opens the original Google Drive file or collection." />
          <div className="certificate-grid">
            {certificates.map((cert, i) => (
              <motion.a key={cert.title} className="certificate-card" href={cert.url} target="_blank" rel="noreferrer"
                initial={{ opacity: 0, y: 24, rotateX: -5 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
                whileHover={{ y: -7, rotateY: 2 }}>
                <div className="certificate-art-wrap">
                  <img className="certificate-art-image" src={cert.image || "/images/certificates/sap.svg"} alt={`${cert.title} 3D certificate artwork`} loading="lazy" />
                  <span className="certificate-open-icon"><ArrowUpRight size={16} /></span>
                </div>
                <span className="certificate-category">{cert.category}</span>
                <h3>{cert.title}</h3><p>{cert.provider}</p>
                <div className="certificate-open">Open certificate <ArrowUpRight size={14} /></div>
              </motion.a>
            ))}
          </div>
          <p className="certificate-note">Google Drive permissions are controlled by the original file owner. If a link does not open, check that file's sharing settings.</p>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <div className="contact-card">
            <div className="contact-orb" />
            <div className="eyebrow"><span /> YOUR IDEA, MY NEXT BUILD</div>
            <h2>Have a good idea?<br /><span className="gradient-text">Let's make it real.</span></h2>
            <p>I'm open to internships, collaborations, and interesting problems in AI and software engineering.</p>
            <div className="contact-actions">
              <a className="primary-button" href={`mailto:${PROFILE.email}?subject=${encodeURIComponent("Portfolio collaboration")}&body=${encodeURIComponent("Hi Jagadish, I would like to discuss an opportunity.")}`}>Start a conversation <ArrowUpRight size={17} /></a>
              <a className="secondary-button" href={`https://wa.me/91${PROFILE.phone}?text=${encodeURIComponent("Hi Jagadish, I saw your portfolio and would like to connect.")}`} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp me</a>
              <a className="secondary-button" href={`tel:+91${PROFILE.phone}`}><Phone size={16} /> Call me</a>
              <button className="secondary-button" onClick={copyEmail}><Mail size={16} /> {copied ? "Email copied!" : "Copy email"}</button>
            </div>
            <div className="contact-meta"><span><span className="live-dot" /> CURRENTLY OPEN TO OPPORTUNITIES</span><span>CHENNAI, INDIA</span></div>
          </div>
        </section>

        <footer className="footer"><a className="footer-brand" href="#home">JV<span>.</span></a><p>Designed with curiosity. Built with code.</p><div className="footer-links"><a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a><a href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={`mailto:${PROFILE.email}`}>Email</a></div><span className="copyright">© 2026 JAGADISH V</span></footer>
      </main>
      <div className="right-rail" aria-label="Quick section navigation">
        <span className="rail-label">EXPLORE</span>
        {[
          ["home", "01"], ["about", "02"], ["skills", "03"], ["projects", "04"],
          ["experience", "05"], ["certificates", "06"], ["contact", "07"]
        ].map(([id, number]) => <a key={id} href={`#${id}`} className={active === id ? "rail-dot active" : "rail-dot"} aria-label={`Go to ${id}`} title={id}><span>{number}</span></a>)}
      </div>
      {showTop && <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">↑</button>}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
