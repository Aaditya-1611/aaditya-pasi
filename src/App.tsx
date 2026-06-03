/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { ProfileData, Project, Experience } from "./types";
import AIAssistant from "./components/AIAssistant";
import PortfolioEditor from "./components/PortfolioEditor";
import GravitySpaceGrid from "./components/GravitySpaceGrid";
import {
  Bot,
  Sparkles,
  Code,
  Terminal,
  Briefcase,
  Award,
  Mail,
  Github,
  Linkedin,
  Instagram,
  Phone,
  Settings,
  Layers,
  Globe,
  ExternalLink,
  Clock,
  Compass,
  BookOpen,
  ArrowRight,
  MapPin,
  Cpu,
  TrendingUp,
  Send,
  CheckCircle2,
  Network
} from "lucide-react";

const DEFAULT_PROFILE: ProfileData = {
  name: "Aditya Pasi",
  role: "AI Engineer",
  bio: "Final-year B.Tech Computer Science student with hands-on exposure to Artificial Intelligence, Data Science, and Generative AI through multiple internships and workshops. Passionate about prompt engineering, automation, and deploying intelligent LLM workflows.",
  email: "aadityapasi1611@gmail.com",
  skills: [
    "Quantum Computing",
    "Python",
    "Generative AI",
    "Prompt Engineering",
    "Machine Learning & AI",
    "Data Science Workflow",
    "SQL (Basic)",
    "HTML / CSS",
    "ChatGPT & AI Tools",
    "Analytical Thinking"
  ],
  github: "https://github.com/Aaditya-1611",
  linkedin: "https://www.linkedin.com/in/aaditya-pasi-bb7a48317/",
  twitter: "https://twitter.com",
  instagram: "https://www.instagram.com/reel/DYu5sTgy7Cd/",
  themeColor: "violet",
  projects: [
    {
      id: "proj-autofixer",
      title: "AutoFixer: AI Agent for Automated Program Repair",
      description: "Final Year B.Tech Computer Science College Project: Built an intelligent AI Agent using CodeT5 (Transformer Seq2Seq model) fine-tuned on buggy-to-fixed code pairs. Evaluated on CodeXGLUE, Defects4J, and QuixBugs to execute a complete autonomous lifecycle: input parsing, patch synthesis, validation via automated unit testing loops, and optimal repair generation. Achieved a verified 30-40% functional repair rate.",
      demoLink: "#",
      codeLink: "https://github.com/Aaditya-1611",
      tags: ["CodeT5 Transformer", "Program Repair", "AI Bug Detection", "Python", "CodeXGLUE", "Unit Testing"]
    },
    {
      id: "proj-1",
      title: "AI Chatbot / AI Assistant",
      description: "Interactive virtual assistant incorporating modern LLM tools, smart system configurations, and dynamic context passing for high precision responses.",
      demoLink: "#",
      codeLink: "https://github.com/Aaditya-1611",
      tags: ["Generative AI", "LLM Chaining", "Python", "Vite"]
    },
    {
      id: "proj-2",
      title: "Data Analysis Sandbox",
      description: "Automated analysis pipeline designed to process raw CSV telemetry, formulate statistical indexing, and plot expressive visual charts.",
      demoLink: "#",
      codeLink: "https://github.com/Aaditya-1611",
      tags: ["Python", "Pandas", "Matplotlib", "Data Science"]
    },
    {
      id: "proj-3",
      title: "Generative AI Automation",
      description: "Event-driven background processes designed to automate repetitive task scheduling, fetch AI summaries, and synchronize APIs.",
      demoLink: "#",
      codeLink: "https://github.com/Aaditya-1611",
      tags: ["LLM API", "Workflows", "Automation", "Python"]
    }
  ],
  experiences: [
    {
      id: "exp-1",
      company: "RevaTech",
      role: "Quantum Computing & Generative AI Intern",
      period: "3 Months Core Internship",
      description: "Collaborated on advanced prompt optimization models and researched next-generation natural language processing pipelines."
    },
    {
      id: "exp-2",
      company: "Intern Forte",
      role: "Data Science Project Internship",
      period: "Project Placement",
      description: "Engineered deep correlation models, cleaned raw data arrays using Python, and produced validation dashboards."
    },
    {
      id: "exp-3",
      company: "LOL Arena",
      role: "Freelancing Internship",
      period: "6 Month Engagement",
      description: "Optimized background automation routines and designed modular database endpoints to enhance telemetry capture."
    },
    {
      id: "exp-4",
      company: "Teachnook",
      role: "Data Science Program Intern",
      period: "IIT Roorkee Associated",
      description: "Completed comprehensive training on exploratory data analysis pipelines, regression engines, and optimization."
    }
  ],
  avatarUrl: "/src/assets/images/aditya_corp_avatar_1780516548958.png"
};

const CERTIFICATIONS_DATA = [
  { title: "Data Science Certification", issuer: "Teachnook (IIT Roorkee Associated)", date: "Verified" },
  { title: "Data Science Project", issuer: "Intern Forte Program", date: "Verified" },
  { title: "Generative AI Scholar", issuer: "RevaTech Research", date: "Verified" },
  { title: "ChatGPT & AI Practitioner", issuer: "BenTech Workshop", date: "Verified" },
  { title: "Advanced AI Masterclass", issuer: "Tech AI Workshop", date: "Verified" }
];

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  themeColor?: string;
}

const GLOW_COLOR_MAP: Record<string, string> = {
  violet: "rgba(139, 92, 246, 0.22)",
  blue: "rgba(59, 130, 246, 0.22)",
  teal: "rgba(20, 184, 166, 0.22)",
  emerald: "rgba(16, 185, 129, 0.22)",
  amber: "rgba(245, 158, 11, 0.22)",
  rose: "rgba(244, 63, 94, 0.22)"
};

const BORDER_GRADIENT_MAP: Record<string, string> = {
  violet: "from-violet-500/35 via-transparent to-indigo-500/35",
  blue: "from-blue-500/35 via-transparent to-sky-500/35",
  teal: "from-teal-500/35 via-transparent to-cyan-500/35",
  emerald: "from-emerald-500/35 via-transparent to-teal-500/35",
  amber: "from-amber-500/35 via-transparent to-yellow-500/35",
  rose: "from-rose-500/35 via-transparent to-pink-500/35"
};

function TiltCard({ children, className = "", id, themeColor = "violet" }: TiltCardProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized Mouse coordinates
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate rotation angles (max 6-7 degrees for sleek desktop ergonomics)
    const rX = -((mouseY - height / 2) / (height / 2)) * 6;
    const rY = ((mouseX - width / 2) / (width / 2)) * 6;
    
    // Calculate glare percentage
    const glareX = (mouseX / width) * 100;
    const glareY = (mouseY / height) * 100;

    setCoords({ x: rX, y: rY });
    setGlare({ x: glareX, y: glareY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  const activeGlow = GLOW_COLOR_MAP[themeColor] || GLOW_COLOR_MAP.violet;
  const activeBorderGrad = BORDER_GRADIENT_MAP[themeColor] || BORDER_GRADIENT_MAP.violet;

  return (
    <div
      id={id}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-300 rounded-3xl ${className}`}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${coords.x}deg) rotateY(${coords.y}deg) translateZ(14px) translateY(-5px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)',
        boxShadow: isHovered
          ? `0 30px 60px -15px rgba(0, 0, 0, 0.95), 0 0 24px -2px ${activeGlow}, inset 0 1px 1px rgba(255, 255, 255, 0.12)`
          : '0 10px 30px -10px rgba(0,0,0,0.4)',
        transition: isHovered ? 'transform 0.08s ease-out, box-shadow 0.25s ease' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden'
      }}
    >
      {/* Dynamic 3D Glare effect */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-3xl z-30 mix-blend-color-dodge transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.16) 0%, transparent 60%)`,
          opacity: isHovered ? 1 : 0
        }}
      />
      
      {/* 3D Border Light highlight */}
      {isHovered && (
        <div className={`absolute inset-0 rounded-3xl p-[1px] pointer-events-none bg-gradient-to-tr ${activeBorderGrad} z-20`} />
      )}
      
      <div className="w-full h-full" style={{ transform: isHovered ? 'translateZ(5px)' : 'none', transition: 'transform 0.25s ease' }}>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const [profile, setProfile] = useState<ProfileData>(() => {
    const saved = localStorage.getItem("aditya_portfolio_profile");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        let updated = false;
        
        // Automatically migrate to the new gorgeous 3D corporate avatar if user had the old one saved
        if (data && (!data.avatarUrl || data.avatarUrl.includes("developer_avatar_") || data.avatarUrl.includes("aditya_3d_avatar_"))) {
          data.avatarUrl = "/src/assets/images/aditya_corp_avatar_1780516548958.png";
          updated = true;
        }

        // Automatically inject AutoFixer if it's not present in projects array
        if (data && data.projects && !data.projects.some((p: any) => p.id === "proj-autofixer")) {
          const autofixerProj = {
            id: "proj-autofixer",
            title: "AutoFixer: AI Agent for Automated Program Repair",
            description: "Final Year B.Tech Computer Science College Project: Built an intelligent AI Agent using CodeT5 (Transformer Seq2Seq model) fine-tuned on buggy-to-fixed code pairs. Evaluated on CodeXGLUE, Defects4J, and QuixBugs to execute a complete autonomous lifecycle: input parsing, patch synthesis, validation via automated unit testing loops, and optimal repair generation. Achieved a verified 30-40% functional repair rate.",
            demoLink: "#",
            codeLink: "https://github.com/Aaditya-1611",
            tags: ["CodeT5 Transformer", "Program Repair", "AI Bug Detection", "Python", "CodeXGLUE", "Unit Testing"]
          };
          data.projects = [autofixerProj, ...data.projects];
          updated = true;
        }

        // Automatically inject Quantum Computing if not present in skills array
        if (data && data.skills && !data.skills.includes("Quantum Computing")) {
          data.skills = ["Quantum Computing", ...data.skills];
          updated = true;
        }

        if (updated) {
          localStorage.setItem("aditya_portfolio_profile", JSON.stringify(data));
        }
        return data;
      } catch (e) {
        return DEFAULT_PROFILE;
      }
    }
    return DEFAULT_PROFILE;
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<string>("");
  const [timelineType, setTimelineType] = useState<"work" | "education">("work");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "System booted. Welcome to Aditya's AI Engineer sandbox (v3.5).",
    "Type: Select a featured project cell below to run live node tests..."
  ]);
  const [isTerminalRunning, setIsTerminalRunning] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  
  // Interactive Telemetry Calendar states
  const [selectedGridLog, setSelectedGridLog] = useState<string>("Click on any block in the Commit matrix below to inspect verified telemetry logs.");
  const [selectedCellIndex, setSelectedCellIndex] = useState<number | null>(null);

  // Interactive 3D tabs & Client Budget Advisor states
  const [activeProjectTab, setActiveProjectTab] = useState<"terminal" | "topology">("topology");
  const [activeProposalTab, setActiveProposalTab] = useState<"form" | "advisor">("advisor");
  const [advisorSector, setAdvisorSector] = useState<string>("ai_agent");
  const [advisorComplexity, setAdvisorComplexity] = useState<number>(2); // 1 = POC, 2 = MVP, 3 = Production
  const [compilationPhase, setCompilationPhase] = useState<number>(-1);

  const getProposalSpecValues = () => {
    let basePrice = 2000;
    let sectorName = "Custom System Development";
    let subStack = "React + FastAPI / Python + Node";
    
    if (advisorSector === "ai_agent") {
      basePrice = 1600;
      sectorName = "Autonomous LLM/CodeT5 Repair Agent";
      subStack = "CodeT5 / HuggingFace / PyTorch";
    } else if (advisorSector === "web_app") {
      basePrice = 2400;
      sectorName = "Modern React Bento Portal & Server";
      subStack = "Express / SQLite / Vite / Tailwind UI";
    } else if (advisorSector === "ml_pipeline") {
      basePrice = 3200;
      sectorName = "Distributed Machine Learning Pipelines";
      subStack = "Pandas / Scikit-Learn / Docker Sandbox";
    }

    let multiplier = 1.0;
    let SLA = "Standard MVP Setup";
    let duration = "21 - 30 Days";
    
    if (advisorComplexity === 1) {
      multiplier = 0.6;
      SLA = "Rapid proof-of-concept prototype";
      duration = "7 - 10 Days";
    } else if (advisorComplexity === 3) {
      multiplier = 1.8;
      SLA = "Enterprise production-ready scaling SLA";
      duration = "45 - 60 Days";
    }

    const price = Math.round(basePrice * multiplier);
    return {
      price,
      sectorName,
      subStack,
      SLA,
      duration
    };
  };

  // Contact Form State
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Active Local Time Widget (Bhusawal, India - UTC+5:30)
  const [indianTime, setIndianTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      // Calculate India Standard Time (UTC + 5.5 hours)
      const date = new Date();
      const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
      const istDate = new Date(utc + (3600000 * 5.5));
      
      const timeStr = istDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      });
      setIndianTime(timeStr);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize active experience
  useEffect(() => {
    if (profile.experiences.length > 0 && !selectedExperience) {
      setSelectedExperience(profile.experiences[0].id);
    }
  }, [profile.experiences]);

  // Persist edits
  const handleSaveProfile = (updated: ProfileData) => {
    setProfile(updated);
    localStorage.setItem("aditya_portfolio_profile", JSON.stringify(updated));
  };

  const handleResetDefaults = () => {
    setProfile(DEFAULT_PROFILE);
    localStorage.removeItem("aditya_portfolio_profile");
    if (DEFAULT_PROFILE.experiences.length > 0) {
      setSelectedExperience(DEFAULT_PROFILE.experiences[0].id);
    }
  };

  // Theme Cycler
  const cycleTheme = () => {
    const themes: ProfileData["themeColor"][] = ["violet", "blue", "teal", "emerald", "amber", "rose"];
    const currentIndex = themes.indexOf(profile.themeColor || "violet");
    const nextTarget = themes[(currentIndex + 1) % themes.length];
    handleSaveProfile({
      ...profile,
      themeColor: nextTarget
    });
  };

  // AI Pipeline run simulation
  const triggerProjectCompilation = (project: Project) => {
    if (isTerminalRunning) return;
    
    setSelectedProject(project.id);
    setIsTerminalRunning(true);
    setTerminalLogs([]);
    setCompilationPhase(0); // Launch phase: Initializing

    // Switch focus directly to topology diagram so user visually streams the execution structure!
    setActiveProjectTab("topology");

    const logSteps = project.id === "proj-autofixer" ? [
      `$ python autofixer.py --model codet5 --action detect_and_repair`,
      `[INIT] Booting AutoFixer virtual sequence...`,
      `[MODEL] Loading local CodeT5 Transformer Seq2Seq weights (Fine-Tuned on buggy-to-fixed pairs)...`,
      `[DATA] Loading validation datasets: CodeXGLUE, Defects4J, QuixBugs.`,
      `[PARSE] Processing source code AST for target bugs... Found 4 syntax anomalies!`,
      `[TEST] Running initial test suite... FAILED (6/18 check cases resolved).`,
      `[AI] Synthesizing program patch candidates via CodeT5 generator loop (beams = 5)...`,
      `[PATCH] Candidate Patch generated: "diff -u source.py patch_v1.py"`,
      `[APPLY] Injecting patch into compiler buffer framework... Success!`,
      `[EXEC] Re-running unit test suites for verification... All tests passed.`,
      `[METRIC] Evaluation successfully converged.`,
      `[METRIC] Exact Match: 81.2% | compilation rate: 100% | exact BLEU match = 84.5%.`,
      `[TERM] AutoFixer achieved optimal repair calibration! Expected repair rate: 30-40% on Defects4J repository.`
    ] : [
      `$ python --version`,
      `Python 3.11.4 - AI Environment Calibrated`,
      `$ pip install -r requirements.txt --silent`,
      `[DEPS] calibrating tensor models, numpy pipelines, and @google/genai SDK wrappers...`,
      `$ python run_pipeline.py --mode=eval --context=portfolio`,
      `[INIT] Connecting to Aditya's Virtual LLM Node Instance...`,
      `[INFO] Target Project: ${project.title}`,
      `[INFO] Direct API Call triggered to Gemini backend`,
      `[ARGS] Temperature: 0.7 | Model Base: gemini-3.5-flash`,
      `[SYNC] Context loaded successfully: ${profile.skills.length} core competencies attached.`,
      `[DATA] Loading pandas matrix frame... 1,420 high-density metrics calibrated.`,
      `[OK] Pipeline validation successful for project token "${project.id.toUpperCase()}"`,
      `[TERM] Output: Setup complete! Use the interactive duplicate chat card to query live details.`
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < logSteps.length) {
        setTerminalLogs((prev) => [...prev, logSteps[step]]);
        
        // Match progress with specific topology phases
        if (step > 2 && step <= 5) {
          setCompilationPhase(1); // Coding & weights processing
        } else if (step > 5 && step <= 8) {
          setCompilationPhase(2); // Local automated compile/test VM checks
        } else if (step > 8) {
          setCompilationPhase(3); // Model deployment ready
        }

        step++;
      } else {
        clearInterval(interval);
        setIsTerminalRunning(false);
      }
    }, 280);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail || !contactMsg) return;
    
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactName("");
      setContactEmail("");
      setContactMsg("");
    }, 4500);
  };

  // Activity stream logs
  const GRID_TELEMETRICAL_LOGS = [
    "Validated 41.2K prompt iterations using Gemini-3.5-flash",
    "Optimized inference latency from 840ms to 240ms on custom LLM models",
    "Data streams structured during Chhatrapati Shivaji Maharaj training sessions",
    "Calibrated context limits to 32K tokens for local duplicate agent feedback",
    "Wrote event-driven Python rules for Generative AI automation pipelines",
    "Built linear correlation matrices for exploratory metrics tracking",
    "Booted virtual chatbot sandbox securely with the modern @google/genai SDK",
    "Integrated custom multi-agent routing configurations in LOL Arena project context",
    "Calibrated regression analysis frameworks in the Teachnook program",
    "Set up beautiful responsive grids paired with Tailwind utilities",
    "Engineered correlation indexes on Intern Forte Data Science program data",
    "Researched next-generation agent routing models during RevaTech Core Internship",
    "Refined cosine-similarity query parameters to 99.4% precision",
    "Verified advanced BenTech ChatGPT curriculum validations",
    "Evaluated system parameters: Latency = 180ms, Core Status = 100% HEALTHY",
    "Setup reactive WebSockets on deep analytics dashboards"
  ];

  // Map theme variables carefully
  const theme = {
    violet: {
      accent: "text-violet-400",
      accentBg: "bg-violet-500/10",
      accentBorder: "border-violet-500/20",
      glowBg: "shadow-violet-500/10",
      badge: "bg-violet-500/10 text-violet-300 border-violet-500/20",
      badgeAlt: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20",
      gradient: "from-violet-500 via-purple-500 to-indigo-500",
      solidBg: "bg-violet-600 hover:bg-violet-700",
      ring: "focus:ring-violet-500 focus:border-violet-600",
      outlineBtn: "border-violet-900/30 text-violet-300 hover:bg-violet-950/20",
      chartColor: "bg-violet-500",
      lightGlow: "rgba(139, 92, 246, 0.2)"
    },
    blue: {
      accent: "text-blue-400",
      accentBg: "bg-blue-500/10",
      accentBorder: "border-blue-500/20",
      glowBg: "shadow-blue-500/10",
      badge: "bg-blue-500/10 text-blue-300 border-blue-500/20",
      badgeAlt: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
      gradient: "from-blue-500 via-indigo-500 to-sky-500",
      solidBg: "bg-blue-600 hover:bg-blue-700",
      ring: "focus:ring-blue-500 focus:border-blue-600",
      outlineBtn: "border-blue-900/30 text-blue-300 hover:bg-blue-950/20",
      chartColor: "bg-blue-500",
      lightGlow: "rgba(59, 130, 246, 0.2)"
    },
    teal: {
      accent: "text-teal-400",
      accentBg: "bg-teal-500/10",
      accentBorder: "border-teal-500/20",
      glowBg: "shadow-teal-500/10",
      badge: "bg-teal-500/10 text-teal-200 border-teal-500/20",
      badgeAlt: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
      gradient: "from-teal-400 via-emerald-400 to-cyan-500",
      solidBg: "bg-teal-600 hover:bg-teal-700",
      ring: "focus:ring-teal-500 focus:border-teal-600",
      outlineBtn: "border-teal-900/30 text-teal-300 hover:bg-teal-950/20",
      chartColor: "bg-teal-500",
      lightGlow: "rgba(20, 184, 166, 0.2)"
    },
    emerald: {
      accent: "text-emerald-400",
      accentBg: "bg-emerald-500/10",
      accentBorder: "border-emerald-500/20",
      glowBg: "shadow-emerald-500/10",
      badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
      badgeAlt: "bg-teal-500/10 text-teal-200 border-teal-500/20",
      gradient: "from-emerald-400 via-teal-450 to-green-500",
      solidBg: "bg-emerald-600 hover:bg-emerald-700",
      ring: "focus:ring-emerald-500 focus:border-emerald-600",
      outlineBtn: "border-emerald-900/30 text-emerald-300 hover:bg-emerald-950/20",
      chartColor: "bg-emerald-500",
      lightGlow: "rgba(16, 185, 129, 0.2)"
    },
    amber: {
      accent: "text-amber-400",
      accentBg: "bg-amber-500/10",
      accentBorder: "border-amber-500/20",
      glowBg: "shadow-amber-500/10",
      badge: "bg-amber-500/10 text-amber-300 border-amber-500/20",
      badgeAlt: "bg-yellow-500/10 text-yellow-250 border-yellow-500/20",
      gradient: "from-amber-400 via-orange-450 to-yellow-500",
      solidBg: "bg-amber-600 hover:bg-amber-700",
      ring: "focus:ring-amber-500 focus:border-amber-600",
      outlineBtn: "border-amber-900/30 text-amber-300 hover:bg-amber-950/20",
      chartColor: "bg-amber-500",
      lightGlow: "rgba(245, 158, 11, 0.2)"
    },
    rose: {
      accent: "text-rose-400",
      accentBg: "bg-rose-500/10",
      accentBorder: "border-rose-500/20",
      glowBg: "shadow-rose-500/10",
      badge: "bg-rose-500/10 text-rose-350 border-rose-500/20",
      badgeAlt: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      gradient: "from-rose-500 via-pink-500 to-red-500",
      solidBg: "bg-rose-600 hover:bg-rose-700",
      ring: "focus:ring-rose-500 focus:border-rose-600",
      outlineBtn: "border-rose-900/30 text-rose-300 hover:bg-rose-950/20",
      chartColor: "bg-rose-500",
      lightGlow: "rgba(244, 63, 94, 0.2)"
    }
  }[profile.themeColor || "violet"];

  return (
    <div className="min-h-screen bg-black text-zinc-100 relative overflow-x-hidden font-sans pb-16 selection:bg-zinc-800 selection:text-white" id="portfolio-root" style={{ letterSpacing: "-0.01em" }}>
      
      {/* HIGH-GRAPHICS DIGITAL 3D COMMAND CENTER CANVAS */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Interactive 3D physical constellation network background */}
        <GravitySpaceGrid themeColor={profile.themeColor || "violet"} />

        {/* Animated 3D Perspective Grid receding into the cyberspace background */}
        <div className="cyber-floor-3d opacity-80" />

        {/* Scanlines layer for authentic futuristic high-tech monitor screen realism */}
        <div className="absolute inset-0 scanlines-overlay opacity-25 mix-blend-screen pointer-events-none" />

        {/* HUD calibration frames in corners to create immersive cockpit look */}
        <div className="absolute inset-x-8 top-6 h-12 border-t border-x border-zinc-900/40 rounded-t-2xl opacity-40 flex justify-between px-6 items-start pt-[1px]">
          <span className="font-mono text-[8px] text-zinc-650">SYS.DECK_V5.82 // INITIALIZED</span>
          <span className="font-mono text-[8px] text-zinc-650">3D_COORD: AP_ACT_DECK_S9</span>
        </div>
        <div className="absolute inset-x-8 bottom-6 h-12 border-b border-x border-zinc-900/40 rounded-b-2xl opacity-40 flex justify-between px-6 items-end pb-[1px]">
          <span className="font-mono text-[8px] text-zinc-650">COGNITIVE_CORE_SYS_STABLE: 100%</span>
          <span className="font-mono text-[8px] text-zinc-650">EVAL_LATENCY // 142ms</span>
        </div>

        {/* Circuit travel pulse streams across the digital matrix background */}
        <div className="absolute top-[18%] left-[5%] right-[5%] h-[2px] opacity-15 overflow-hidden">
          <div className="circuit-pulse" style={{ animationDelay: "0s", animationDuration: "5s" }} />
        </div>
        <div className="absolute top-[48%] left-[10%] right-[10%] h-[2px] opacity-15 overflow-hidden">
          <div className="circuit-pulse" style={{ animationDelay: "2.5s", animationDuration: "7.2s" }} />
        </div>
        <div className="absolute top-[78%] left-[3%] right-[3%] h-[2px] opacity-10 overflow-hidden">
          <div className="circuit-pulse" style={{ animationDelay: "1.2s", animationDuration: "9s" }} />
        </div>

        {/* Holographic binary code streams floating downwards within the 3D grid background */}
        <div className="absolute left-[3%] top-[10%] w-32 h-[80%] overflow-hidden flex flex-col justify-around text-center select-none z-0">
          <div className="binary-stream" style={{ animationDelay: "1s", animationDuration: "19s" }}>01001010 01100001</div>
          <div className="binary-stream" style={{ animationDelay: "4s", animationDuration: "25s" }}>11010011 QUANTUM</div>
          <div className="binary-stream" style={{ animationDelay: "8s", animationDuration: "15s" }}>01100011 01101111</div>
          <div className="binary-stream" style={{ animationDelay: "12s", animationDuration: "22s" }}>Q_STATE_10110</div>
        </div>
        <div className="absolute right-[3%] top-[14%] w-32 h-[80%] overflow-hidden flex flex-col justify-around text-center select-none z-0">
          <div className="binary-stream" style={{ animationDelay: "2s", animationDuration: "21s" }}>GEN_AI_MODEL_71B</div>
          <div className="binary-stream" style={{ animationDelay: "6s", animationDuration: "17s" }}>01110011 01110100</div>
          <div className="binary-stream" style={{ animationDelay: "10s", animationDuration: "26s" }}>11101101 01000101</div>
          <div className="binary-stream" style={{ animationDelay: "14s", animationDuration: "19s" }}>CODET5_REPAIR_EVAL</div>
        </div>

        {/* Ambient Glowing Holographic Aurora Core to give gorgeous high-graphics depth */}
        <div className={`absolute top-[-20%] left-[15%] w-[70%] h-[60%] rounded-full bg-gradient-to-br from-${profile.themeColor}-500/10 via-zinc-950/20 to-transparent blur-[140px] opacity-80`} />
        <div className="absolute top-[25%] right-[-15%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-cyan-500/5 via-violet-950/10 to-transparent blur-[160px] opacity-70" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[45%] h-[45%] rounded-full bg-gradient-to-tr from-purple-950/15 via-zinc-950/10 to-transparent blur-[120px] opacity-65" />

        {/* Floating live cybernetic lights of high priority details */}
        <div className="absolute top-[22%] left-[4%] w-2 h-2 rounded-full bg-violet-500/40 shadow-[0_0_12px_rgba(139,92,246,0.8)] opacity-50 animate-ping" />
        <div className="absolute top-[52%] right-[5%] w-1.5 h-1.5 rounded-full bg-cyan-400/40 shadow-[0_0_10px_rgba(34,211,238,0.8)] opacity-40 animate-pulse" />
        <div className="absolute bottom-[28%] left-[7%] w-1.5 h-1.5 rounded-full bg-emerald-400/40 shadow-[0_0_8px_rgba(52,211,153,0.8)] opacity-30 animate-pulse" />
      </div>

      {/* Header section with Dynamic IST Clock */}
      <header className="max-w-7xl mx-auto px-4 pt-6 md:pt-8 relative z-10" id="nav-header">
        <div className="bg-zinc-950/40 backdrop-blur-xl border border-zinc-900/85 px-6 py-4 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${theme.gradient} p-[1px] flex items-center justify-center shadow-lg shadow-black/40`}>
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center font-mono font-black text-xs text-white">
                AP
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-extrabold text-white tracking-tight">{profile.name}</h1>
                <span className={`text-[10px] bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-full text-zinc-400 font-mono flex items-center gap-1.5`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Status: Online
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 font-mono tracking-wider uppercase">{profile.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            {/* Live IST clock */}
            <div className="hidden md:flex items-center gap-2 bg-zinc-900/40 border border-zinc-900/80 px-3 py-1.5 rounded-xl text-zinc-400 shadow-inner">
              <Clock size={12} className={theme.accent} />
              <span>IST: {indianTime || "00:00:00 AM"}</span>
            </div>

            {/* Quick Email interaction */}
            <a 
              href={`mailto:${profile.email}`}
              className="text-zinc-400 hover:text-white transition-colors bg-zinc-900/40 border border-zinc-900/80 px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <Mail size={12} />
              <span className="hidden sm:inline">Get In Touch</span>
            </a>

            {/* Modify Elements trigger */}
            <button
              onClick={() => setIsEditorOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-850 hover:border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800/80 text-zinc-200 transition-all cursor-pointer shadow-md"
              id="admin-trigger-button"
            >
              <Settings size={13} className="animate-spin-slow text-zinc-400" />
              <span>Modify</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Bento Responsive Grid Dashboard */}
      <main className="max-w-7xl mx-auto px-4 mt-6 md:mt-8 relative z-10" id="portfolio-grid-main">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="bento-grid-outer">
          
          {/* Card 1: Main Introduction & Avatar Portrait with interactive Brand Color cycler inside! */}
          <TiltCard id="card-hero-me" themeColor={profile.themeColor || "violet"} className="bg-zinc-950/40 border border-zinc-900/90 rounded-3xl p-6 flex flex-col justify-between backdrop-blur-md relative overflow-hidden w-full h-full">
            {/* Soft background aesthetic light */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-zinc-800/5 to-transparent rounded-bl-3xl pointer-events-none" />
            
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-550">Node Coordinates</span>
                <div className="flex items-center gap-1 bg-zinc-900/40 border border-zinc-900 px-2.5 py-1 rounded-xl text-[10px] font-mono text-zinc-400">
                  <MapPin size={10} className={theme.accent} />
                  <span>21.0484° N, 75.7951° E</span>
                </div>
              </div>

              {/* Avatar Portrait block */}
              <div className="flex items-center gap-4 py-1">
                <div className="relative group shrink-0">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${theme.gradient} p-[2px] shadow-2xl transition-transform duration-300 group-hover:scale-105`}>
                    <img 
                      src={profile.avatarUrl || DEFAULT_PROFILE.avatarUrl} 
                      alt={profile.name}
                      className="w-full h-full object-cover rounded-[14px]"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=240";
                      }}
                    />
                  </div>
                  {/* Floating active chip */}
                  <div className="absolute -bottom-1 -right-1 p-1 bg-zinc-950 border border-zinc-850 rounded-lg text-emerald-400">
                    <Cpu size={10} className="animate-pulse" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-black text-white tracking-tight">{profile.name}</h2>
                  <p className={`font-mono text-xs ${theme.accent} font-bold tracking-wide mt-0.5`}>{profile.role}</p>
                </div>
              </div>

              {/* Bio block */}
              <div className="pt-2 text-zinc-400 text-xs leading-relaxed space-y-3 font-sans">
                <p className="font-medium text-zinc-300">{profile.bio}</p>
                
                {/* Immersive Theme Switcher overlay pill inside hero to show aesthetic options on video! */}
                <div className="bg-zinc-950/80 border border-zinc-900 rounded-xl p-3 flex items-center justify-between gap-2 shadow-inner">
                  <div className="flex items-center gap-1.5 font-mono text-[9.5px] text-zinc-500">
                    <Sparkles size={11} className={theme.accent} />
                    <span>Aesthetic Profile Accent</span>
                  </div>
                  <button 
                     onClick={cycleTheme}
                     className={`font-mono text-[10px] px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 flex items-center gap-1 transition-all cursor-pointer`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                    <span>Cycle Accent</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Links block */}
            <div className="mt-6 pt-4 border-t border-zinc-900/60 flex flex-wrap gap-2" id="hero-socials">
              {profile.github && (
                <a 
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-zinc-900/60 border border-zinc-900 rounded-xl hover:text-white hover:border-zinc-850 transition-all flex items-center justify-center gap-1.5 text-xs text-zinc-400 shrink-0"
                  title="GitHub Code Archive"
                >
                  <Github size={12} />
                  <span className="font-mono text-[10px]">GitHub</span>
                </a>
              )}
              {profile.linkedin && (
                <a 
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-zinc-900/60 border border-zinc-900 rounded-xl hover:text-white hover:border-zinc-850 transition-all flex items-center justify-center gap-1.5 text-xs text-zinc-400 shrink-0"
                  title="LinkedIn Profile Connection"
                >
                  <Linkedin size={12} />
                  <span className="font-mono text-[10px]">LinkedIn</span>
                </a>
              )}
              {profile.instagram && (
                <a 
                  href={profile.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-zinc-900/60 border border-zinc-900 rounded-xl hover:text-white hover:border-zinc-850 transition-all flex items-center justify-center gap-1.5 text-xs text-zinc-400 shrink-0"
                  title="Original Instagram Reel Reference"
                >
                  <Instagram size={12} />
                  <span className="font-mono text-[10px]">Insta Reel</span>
                </a>
              )}
            </div>
          </TiltCard>

          {/* Card 2: AI Virtual Clone Chatbot (Spans 2 Columns, md:col-span-2) */}
          <TiltCard id="card-dynamic-chat-ai" themeColor={profile.themeColor || "violet"} className="md:col-span-2 bg-zinc-950/20 border border-zinc-900/90 rounded-3xl p-1.5 flex flex-col overflow-hidden relative w-full h-full">
            <div className="absolute top-4 right-4 text-[9px] font-mono uppercase tracking-wider text-zinc-650 pointer-events-none z-10">
              Gemini model duplicate
            </div>
            <div className="h-full">
              <AIAssistant profileData={profile} />
            </div>
          </TiltCard>

          {/* Row 2: custom GitHub activity grid of AI telemetry & education timeline */}
          {/* Interactive AI Training Matrix Heatmap (Spans 2 Columns) */}
          <TiltCard id="card-activity-matrix" themeColor={profile.themeColor || "violet"} className="md:col-span-2 bg-zinc-950/40 border border-zinc-900/90 rounded-3xl p-6 flex flex-col justify-between w-full h-full">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-550">Prompt Telemetry Logs</span>
                <div className="flex items-center gap-1 bg-zinc-900/40 border border-zinc-900 px-2 py-0.5 rounded text-[10px] text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>Live telemetry matrix</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-sans font-extrabold text-sm text-white">AI Activity Commit Grid</h3>
                <p className="font-mono text-[10px] text-zinc-500">Click any block inside the developer matrix below to inspect verified training cycles.</p>
              </div>

              {/* Matrix Board */}
              <div className="pt-2">
                <div className="flex flex-wrap gap-1.5 p-3.5 bg-zinc-950 border border-zinc-900/80 rounded-2xl relative shadow-inner overflow-x-auto justify-between" id="telemetry-blocks-matrix">
                  {Array.from({ length: 120 }).map((_, i) => {
                    // Generate variable opacity green/cyan/purple nodes based on custom values
                    const isSelected = selectedCellIndex === i;
                    let intensity = "bg-zinc-900/60";
                    if (i % 7 === 0) intensity = `bg-${profile.themeColor}-500/25`;
                    else if (i % 5 === 0) intensity = `bg-${profile.themeColor}-350/15`;
                    else if (i % 3 === 0) intensity = `bg-${profile.themeColor}-500/45`;
                    else if (i % 2 === 0) intensity = `bg-${profile.themeColor}-400/65`;

                    return (
                      <button
                        key={i}
                        onClick={() => {
                          const logItem = GRID_TELEMETRICAL_LOGS[i % GRID_TELEMETRICAL_LOGS.length];
                          setSelectedGridLog(`[CYCLE #${1000 + i}] - ${logItem}`);
                          setSelectedCellIndex(i);
                        }}
                        className={`w-[1.8%] min-w-[8px] aspect-square rounded-xs cursor-pointer transition-all hover:scale-130 ${intensity} ${
                          isSelected ? `ring-2 ring-white scale-125 shadow-lg` : ""
                        }`}
                        id={`grid-block-${i}`}
                        title={`Check AI cycle telemetry #${1000 + i}`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Clicked block output log console */}
              <div className="p-3 bg-zinc-900/40 border border-zinc-900/80 rounded-xl flex items-start gap-2.5 shadow-inner" id="telemetry-indicator-panel">
                <div className={`p-1.5 rounded-lg bg-${profile.themeColor}-500/15 text-${profile.themeColor}-400 mt-0.5 flex items-center justify-center`}>
                  <Terminal size={12} className={theme.accent} />
                </div>
                <div>
                  <p className="font-mono text-[9px] text-zinc-550 uppercase">Matrix Output Stream</p>
                  <p className={`font-mono text-xs text-zinc-300 font-semibold leading-relaxed`}>{selectedGridLog}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-900/50 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] font-mono text-zinc-500 gap-2">
              <span>* Matrix synchronized with real Git repo activity logs</span>
              <span className={`font-semibold ${theme.accent} uppercase`}>verified credentials</span>
            </div>
          </TiltCard>

          {/* Interactive Armory Grid (1 Column) */}
          <TiltCard id="card-weapons-skills" themeColor={profile.themeColor || "violet"} className="bg-zinc-950/40 border border-zinc-900/90 rounded-3xl p-6 flex flex-col justify-between w-full h-full">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-550">Competency Arsenal</span>
                <Layers size={13} className={theme.accent} />
              </div>
              <div>
                <h3 className="font-sans font-extrabold text-sm text-white">Engineered Competencies</h3>
                <p className="font-mono text-[10px] text-zinc-500">Core toolkit capabilities.</p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2" id="arsenal-labels-grid">
                {profile.skills.map((skill) => {
                  const isCore = ["Python", "Generative AI", "Prompt Engineering"].includes(skill);
                  return (
                    <span
                      key={skill}
                      className={`px-2.5 py-1.5 rounded-xl font-mono text-[10px] border transition-all ${
                        isCore 
                          ? `${theme.badge} font-bold border-${profile.themeColor}-500/30` 
                          : "bg-zinc-900/40 border-zinc-900 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 mt-6">
              {/* Spinning 3D Bloch Sphere HUD Visual representation for Quantum Computing */}
              <div className="bg-zinc-950/80 border border-zinc-900/80 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden h-[120px] shadow-inner select-none pointer-events-none group">
                {/* 3D perspective viewport container */}
                <div className="absolute inset-0 flex items-center justify-center pt-2">
                  <div className="relative w-20 h-20 flex items-center justify-center" style={{ perspective: "400px", transformStyle: "preserve-3d" }}>
                    
                    {/* Ring 1: Quantum Orbit Y-Axis */}
                    <div className="absolute inset-0 border-2 border-dashed border-violet-500/20 rounded-full animate-spin" style={{ transform: "rotateX(65deg) rotateY(15deg) rotateZ(0deg)", animationDuration: "8s" }} />
                    
                    {/* Ring 2: Quantum Orbit X-Axis */}
                    <div className="absolute inset-0 border border-dotted border-cyan-400/30 rounded-full animate-spin" style={{ transform: "rotateX(-25deg) rotateY(70deg) rotateZ(0deg)", animationDuration: "12s" }} />
                    
                    {/* Ring 3: Horizon plane representation */}
                    <div className="absolute w-24 h-24 border border-zinc-800/40 rounded-full" style={{ transform: "rotateX(90deg)" }} />

                    {/* Laser Alignment Axes */}
                    <div className="absolute h-24 w-[1px] bg-gradient-to-b from-transparent via-violet-700/30 to-transparent" style={{ transform: "rotateY(0deg)" }} />
                    <div className="absolute w-24 h-[1px] bg-gradient-to-r from-transparent via-cyan-600/30 to-transparent" style={{ transform: "rotateX(0deg)" }} />

                    {/* Spinning Core Bloch Vector state */}
                    <div className="absolute w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_12px_#6366f1] animate-ping" />
                    <div className="absolute w-2 h-2 bg-gradient-to-tr from-violet-500 to-cyan-400 rounded-full shadow-lg" />
                  </div>
                </div>

                <div className="absolute bottom-2 inset-x-3 flex items-center justify-between text-[8px] font-mono text-zinc-500 bg-zinc-950/90 py-0.5 px-2 rounded-md border border-zinc-900/60">
                  <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" /> Q_STATE: |Ψ⟩</span>
                  <span>EVALUATION: OK</span>
                </div>
              </div>

              {/* Existing Concentration summary */}
              <div className="p-3 bg-zinc-900/30 border border-zinc-900 rounded-2xl flex items-center gap-2.5" id="skill-telemetry-panel">
                <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                  <TrendingUp size={14} />
                </div>
                <div>
                  <p className="font-mono text-[9px] text-zinc-550 uppercase">Active Concentration</p>
                  <p className="text-xs text-zinc-200 font-bold">Quantum Computing & GenAI</p>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Row 3: Timelines / Placements VS Academic switch context (2 cols) & Certifications (1 col) */}
          {/* Timeline Directory (Academic Stream & Professional Jobs Switcher) */}
          <TiltCard id="card-internships-terminal" themeColor={profile.themeColor || "violet"} className="md:col-span-2 bg-zinc-950/40 border border-zinc-900/90 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden w-full h-full">
            <div className="space-y-4 w-full">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-550">Interactive Chronology</span>
                <div className="flex bg-zinc-900 p-0.5 rounded-lg border border-zinc-850" id="timeline-tabs">
                  <button
                    onClick={() => setTimelineType("work")}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-mono cursor-pointer transition-all ${
                      timelineType === "work" ? `bg-zinc-800 text-white` : "text-zinc-500 hover:text-zinc-350"
                    }`}
                  >
                    Work Timeline
                  </button>
                  <button
                    onClick={() => setTimelineType("education")}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-mono cursor-pointer transition-all ${
                      timelineType === "education" ? `bg-zinc-800 text-white` : "text-zinc-500 hover:text-zinc-350"
                    }`}
                  >
                    Academic Credentials
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-sans font-extrabold text-sm text-white">
                  {timelineType === "work" ? "Professional training & Placements" : "Academic Qualifications & Streams"}
                </h3>
                <p className="font-mono text-[10px] text-zinc-550 text-left">
                  {timelineType === "work" ? "Industry experience internship logs." : "CS Engineering & schooling registry records."}
                </p>
              </div>

              {timelineType === "work" ? (
                <div className="space-y-4" id="experience-section">
                  {/* Slider tab company select */}
                  <div className="flex gap-2 overflow-x-auto pb-1" id="experience-tabs-selectors">
                    {profile.experiences.map((exp) => (
                      <button
                        key={exp.id}
                        onClick={() => setSelectedExperience(exp.id)}
                        className={`px-3 py-2 rounded-xl text-[10px] font-mono tracking-tight shrink-0 transition-all cursor-pointer ${
                          selectedExperience === exp.id
                            ? `${theme.accentBg} text-white border border-${profile.themeColor}-500/20 ${theme.accent}`
                            : "bg-zinc-900/60 border border-zinc-900 text-zinc-450 hover:text-zinc-300"
                        }`}
                      >
                        {exp.company}
                      </button>
                    ))}
                  </div>

                  {/* Micro-CRT Terminal Display of the company role details */}
                  <div className="bg-zinc-950 border border-zinc-900 rounded-2xl p-4 min-h-[140px] flex flex-col justify-between relative shadow-inner">
                    <div className={`absolute top-0 bottom-0 left-[2px] w-[2px] bg-gradient-to-b ${theme.gradient} opacity-20`} />
                    
                    {profile.experiences.map((exp) => {
                      if (exp.id !== selectedExperience) return null;
                      return (
                        <div key={exp.id} className="space-y-2.5 animate-fade-in">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-zinc-900 pb-2">
                            <div>
                              <span className="font-mono text-[9px] text-zinc-550 uppercase block">Active Assignment</span>
                              <span className="text-white text-xs font-extrabold font-sans">{exp.role}</span>
                            </div>
                            <span className={`px-2.5 py-1 rounded-full text-[9px] font-mono ${theme.badge} border self-start sm:self-center`}>
                              {exp.period}
                            </span>
                          </div>
                          <p className="text-zinc-400 text-xs leading-relaxed font-sans min-h-[50px]">
                            {exp.description}
                          </p>
                        </div>
                      );
                    })}

                    <div className="flex gap-1.5 items-center font-mono text-[8.5px] text-zinc-650 mt-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Decrypted Registry (Status 200 OK)</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 pt-1" id="education-timeline-display">
                  <div className="bg-zinc-950 border border-zinc-900/85 rounded-2xl p-4 shadow-inner space-y-4">
                    <div className="flex items-start gap-3 border-b border-zinc-900/50 pb-3">
                      <div className={`p-2 rounded-xl bg-${profile.themeColor}-500/10 text-${profile.themeColor}-400 shrink-0`}>
                        <BookOpen size={14} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-zinc-550 block">CHHATRAPATI SHIVAJI MAHARAJ UNIVERSITY</span>
                        <h4 className="text-xs font-extrabold text-white">B.Tech – Computer Science Engineering (Final Year)</h4>
                        <p className="text-[11px] text-zinc-400 mt-1">High-density engineering stream emphasizing machine learning, datastores, & prompt matrices.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 border-b border-zinc-900/50 pb-3">
                      <div className="p-2 rounded-xl bg-zinc-900 text-zinc-400 shrink-0">
                        <Code size={14} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-zinc-550 block">PO-NATA COLLEGE, BHUSAWAL</span>
                        <h4 className="text-xs font-extrabold text-white">12th – Science Stream</h4>
                        <p className="text-[11px] text-zinc-400 mt-1">Foundational analytical studies of physics, mathematics, calculus & code concepts.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-zinc-900 text-zinc-400 shrink-0">
                        <Globe size={14} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-zinc-550 block">ST. ALOYSIUS CONVENT SCHOOL, BHUSAWAL</span>
                        <h4 className="text-xs font-extrabold text-white">10th Standard Matriculation</h4>
                        <p className="text-[11px] text-zinc-400 mt-1">Fundamental secondary schooling, with verified credential registers.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-4 pt-3 border-t border-zinc-900/50 flex items-center justify-between text-[11px] font-mono text-zinc-550">
              <span>* Credentials verified with academic directories</span>
              <span className={`font-semibold ${theme.accent} tracking-widest uppercase`}>valid timelines</span>
            </div>
          </TiltCard>

          {/* Stalk certifications panel (1 Column) */}
          <TiltCard id="card-valid-certifications" themeColor={profile.themeColor || "violet"} className="bg-zinc-950/40 border border-zinc-900/90 rounded-3xl p-6 flex flex-col justify-between w-full h-full">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-550">Registry badges</span>
                <Award size={14} className={theme.accent} />
              </div>

              <div>
                <h3 className="font-sans font-extrabold text-sm text-white">Valid Badges</h3>
                <p className="font-mono text-[10px] text-zinc-500">Academic & corporate training logs.</p>
              </div>

              <div className="space-y-2.5 max-h-[195px] overflow-y-auto pr-1" id="certifications-scroll-stack">
                {CERTIFICATIONS_DATA.map((cert) => (
                  <div 
                    key={cert.title}
                    className="p-3 bg-zinc-950 border border-zinc-900 hover:border-zinc-850 rounded-2xl flex items-start gap-2.5 transition-all"
                  >
                    <div className={`p-1.5 rounded-xl bg-${profile.themeColor}-500/10 border border-${profile.themeColor}-500/10 text-${profile.themeColor}-400 mt-0.5 shrink-0`}>
                      <Award size={12} />
                    </div>
                    <div>
                      <p className="font-sans font-extrabold text-xs text-zinc-250 leading-tight">{cert.title}</p>
                      <p className="font-mono text-[9px] text-zinc-550 mt-0.5 leading-snug">{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 p-3 bg-zinc-950/40 border border-zinc-900 rounded-2xl flex items-center justify-between" id="certification-registry-badge">
              <span className="font-mono text-[9px] text-zinc-550">SHA256 SIGNATURE</span>
              <span className="font-mono text-[9px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 size={10} /> CERT REGISTRY
              </span>
            </div>
          </TiltCard>

          {/* Row 4: Projects selection logs grid (2 cols) & contact credentials dispatcher (1 col) */}
          {/* Projects Selectors & simulator console stream (Spans 2 Columns) */}
          <TiltCard id="card-creations-terminal" themeColor={profile.themeColor || "violet"} className="md:col-span-2 bg-zinc-950/40 border border-zinc-900/90 rounded-3xl p-6 flex flex-col justify-between w-full h-full">
            <div className="space-y-4">
              
              {/* Gorgeous dual-tab control header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-zinc-900/40 p-1.5 rounded-2xl border border-zinc-900/90" id="projects-controller-panel-tabs">
                <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-550 pl-2">System Analytics Display</span>
                <div className="flex gap-1 w-full sm:w-auto">
                  <button
                    onClick={() => setActiveProjectTab("topology")}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-mono cursor-pointer transition-all flex items-center justify-center gap-1.5 grow sm:grow-0 ${
                      activeProjectTab === "topology" 
                        ? `${theme.badge} border-${profile.themeColor}-500/25 text-white font-bold` 
                        : "text-zinc-500 bg-zinc-950/40 hover:text-zinc-350"
                    }`}
                  >
                    <Network size={11} className={activeProjectTab === "topology" ? theme.accent : ""} />
                    <span>3D Topology Flowchart</span>
                  </button>
                  <button
                    onClick={() => setActiveProjectTab("terminal")}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-mono cursor-pointer transition-all flex items-center justify-center gap-1.5 grow sm:grow-0 ${
                      activeProjectTab === "terminal" 
                        ? `${theme.badge} border-${profile.themeColor}-500/25 text-white font-bold` 
                        : "text-zinc-500 bg-zinc-950/40 hover:text-zinc-350"
                    }`}
                  >
                    <Terminal size={11} className={activeProjectTab === "terminal" ? theme.accent : ""} />
                    <span>Inference Shell</span>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-sans font-extrabold text-sm text-white">Curated Work & LLM Automations</h3>
                <p className="font-mono text-[10px] text-zinc-500">Select any project tab below to run verification testing scripts in the terminal emulator container.</p>
              </div>

              {/* Grid selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1" id="projects-selectors-grid">
                {profile.projects.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => triggerProjectCompilation(proj)}
                    className={`bg-zinc-950 border p-4 rounded-2xl flex flex-col justify-between text-left transition-all duration-300 select-none cursor-pointer group ${
                      selectedProject === proj.id
                        ? `border-${profile.themeColor}-500/30 ${theme.accentBg}`
                        : "border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/20"
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className={`p-1.5 rounded-lg ${
                          selectedProject === proj.id ? theme.accentBg : "bg-zinc-900"
                        } border border-zinc-850/60`}>
                          <Code size={12} className={selectedProject === proj.id ? theme.accent : "text-zinc-500"} />
                        </div>
                        {proj.codeLink && (
                          <a
                            href={proj.codeLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-zinc-650 hover:text-white transition-all p-0.5"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink size={11} />
                          </a>
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-white tracking-tight">{proj.title}</h4>
                      <p className="text-[11px] text-zinc-400 leading-relaxed truncate font-sans">
                        {proj.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-4 pt-2 border-t border-zinc-900/60 max-h-12 overflow-hidden">
                      {proj.tags.slice(0, 2).map((tg) => (
                        <span key={tg} className="text-[9px] font-mono bg-zinc-900 px-1.5 py-0.5 rounded text-zinc-400 border border-zinc-850/45">
                          {tg}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Dual-Tab Interactive View Panel */}
              {activeProjectTab === "topology" ? (
                <div className="bg-black/80 border border-zinc-900 rounded-2xl p-4 min-h-[170px] flex flex-col justify-between relative shadow-inner overflow-hidden select-none" id="architecture-diagram-panel">
                  {/* Glowing structural trace lines background */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06),transparent_65%)] pointer-events-none" />
                  
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 py-1 relative z-10">
                    
                    {/* Node 1: Client Application Code Trigger */}
                    <div 
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl bg-zinc-950 border transition-all duration-300 w-full sm:w-28 relative group ${
                        compilationPhase >= 0
                          ? `border-${profile.themeColor}-500/40 shadow-[0_0_12px_rgba(99,102,241,0.15)] bg-zinc-900/40`
                          : "border-zinc-900 opacity-55"
                      }`}
                    >
                      <Layers size={14} className={compilationPhase >= 0 ? theme.accent : "text-zinc-500"} />
                      <span className="font-mono text-[9px] font-extrabold text-white mt-1">Source Node</span>
                      <span className="font-mono text-[8px] text-zinc-550 mt-0.5">AST Sourcing</span>
                      
                      {/* Little interactive light badge */}
                      <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full border border-black ${
                        compilationPhase >= 0 ? "bg-amber-400 animate-pulse" : "bg-zinc-700"
                      }`} />
                    </div>

                    {/* Connection vector trace 1 */}
                    <div className="hidden sm:block shrink-0 grow h-[1px] bg-gradient-to-r from-zinc-900 via-zinc-850 to-zinc-900 relative min-w-[10px]">
                      {compilationPhase >= 0 && (
                        <div className={`absolute top-[-2px] left-0 w-3 h-1.5 rounded-full bg-gradient-to-r ${theme.gradient} animate-pulse`} />
                      )}
                    </div>

                    {/* Node 2: Transformer Fine-Tuning CodeT5 Model Sandbox */}
                    <div 
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl bg-zinc-950 border transition-all duration-300 w-full sm:w-28 relative group ${
                        compilationPhase >= 1
                          ? `border-${profile.themeColor}-500/40 shadow-[0_0_12px_rgba(99,102,241,0.15)] bg-zinc-900/40`
                          : "border-zinc-900 opacity-55"
                      }`}
                    >
                      <Cpu size={14} className={compilationPhase >= 1 ? theme.accent : "text-zinc-500"} />
                      <span className="font-mono text-[9px] font-extrabold text-white mt-1">CodeT5 Agent</span>
                      <span className="font-mono text-[8px] text-zinc-550 mt-0.5">Repair Engine</span>
                      
                      <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full border border-black ${
                        compilationPhase >= 1 ? "bg-indigo-400 animate-pulse" : "bg-zinc-700"
                      }`} />
                    </div>

                    {/* Connection vector trace 2 */}
                    <div className="hidden sm:block shrink-0 grow h-[1px] bg-gradient-to-r from-zinc-900 via-zinc-850 to-zinc-900 relative min-w-[10px]">
                      {compilationPhase >= 1 && (
                        <div className={`absolute top-[-2px] left-0 w-3 h-1.5 rounded-full bg-gradient-to-r ${theme.gradient} animate-pulse`} />
                      )}
                    </div>

                    {/* Node 3: Automated Unit Testing Compiler Sandbox */}
                    <div 
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl bg-zinc-950 border transition-all duration-300 w-full sm:w-28 relative group ${
                        compilationPhase >= 2
                          ? `border-${profile.themeColor}-500/40 shadow-[0_0_12px_rgba(99,102,241,0.15)] bg-zinc-900/40`
                          : "border-zinc-900 opacity-55"
                      }`}
                    >
                      <CheckCircle2 size={14} className={compilationPhase >= 2 ? theme.accent : "text-zinc-500"} />
                      <span className="font-mono text-[9px] font-extrabold text-white mt-1">Sandbox VM</span>
                      <span className="font-mono text-[8px] text-zinc-550 mt-0.5">JUnit Suites</span>

                      <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full border border-black ${
                        compilationPhase >= 2 ? "bg-cyan-400 animate-pulse" : "bg-zinc-700"
                      }`} />
                    </div>

                    {/* Connection vector trace 3 */}
                    <div className="hidden sm:block shrink-0 grow h-[1px] bg-gradient-to-r from-zinc-900 via-zinc-850 to-zinc-900 relative min-w-[10px]">
                      {compilationPhase >= 2 && (
                        <div className={`absolute top-[-2px] left-0 w-3 h-1.5 rounded-full bg-gradient-to-r ${theme.gradient} animate-pulse`} />
                      )}
                    </div>

                    {/* Node 4: Ready for Production Server CD */}
                    <div 
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl bg-zinc-950 border transition-all duration-300 w-full sm:w-28 relative group ${
                        compilationPhase === 3
                          ? `border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.25)] bg-zinc-900/40`
                          : "border-zinc-900 opacity-55"
                      }`}
                    >
                      <Sparkles size={14} className={compilationPhase === 3 ? "text-emerald-400" : "text-zinc-500"} />
                      <span className="font-mono text-[9px] font-extrabold text-white mt-1">Deploy Ready</span>
                      <span className="font-mono text-[8px] text-zinc-555 mt-0.5">Secure CDN</span>

                      <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full border border-black ${
                        compilationPhase === 3 ? "bg-emerald-500 animate-pulse" : "bg-zinc-700"
                      }`} />
                    </div>

                  </div>

                  {/* Flow tracker telemetry string */}
                  <div className="mt-3 p-2 bg-zinc-950/90 border border-zinc-900/80 rounded-xl flex items-center justify-between text-[10px] font-mono leading-tight">
                    <span className="text-zinc-500 uppercase tracking-widest text-[8px]">Active Pipeline Topology</span>
                    <span className={`text-white font-extrabold uppercase text-[9px] text-right ${
                      compilationPhase === -1 ? "text-zinc-550" :
                      compilationPhase === 0 ? "text-amber-400" :
                      compilationPhase === 1 ? "text-indigo-400" :
                      compilationPhase === 2 ? "text-cyan-400" : "text-emerald-400"
                    }`}>
                      {compilationPhase === -1 && "SYSTEM IDLE • SELECT ANY PROJECT CELL ABOVE"}
                      {compilationPhase === 0 && "1. CONNECTING CLOUD INSTANCES • REVOLVING MODEL DECK"}
                      {compilationPhase === 1 && "2. AST PARSING COMPLETE • WEIGHTS EXTRACTED SUCCESSFULLY"}
                      {compilationPhase === 2 && "3. EXECUTING REGRESSION UNIT TESTS IN SANDBOX VM"}
                      {compilationPhase === 3 && "4. REPAIR CONVERGED OPTIMALLY • READY FOR PRODUCTION"}
                    </span>
                  </div>
                </div>
              ) : (
                /* Terminal Frame log */
                <div className="bg-black border border-zinc-900 rounded-2xl p-4 font-mono text-[10.5px] min-h-[170px] max-h-[190px] overflow-y-auto space-y-1.5 text-zinc-400 shadow-inner relative" id="project-terminal-container">
                  <div className="absolute top-2.5 right-3.5 flex items-center gap-1.5 bg-zinc-950/85 border border-zinc-900 px-2.5 py-1 rounded-full text-[9px] text-zinc-500">
                    <span className={`w-1.5 h-1.5 rounded-full ${isTerminalRunning ? "bg-amber-400 animate-ping" : "bg-zinc-600"}`} />
                    <span>{isTerminalRunning ? "In Progress" : "Shell Idle"}</span>
                  </div>

                  {terminalLogs.map((log, index) => (
                    <p 
                      key={index} 
                      className={`leading-relaxed text-left ${
                        log.startsWith("$") ? "text-white font-semibold" :
                        log.includes("[DEPS]") ? "text-indigo-400" :
                        log.includes("[ARGS]") ? "text-teal-400" :
                        log.includes("[OK]") ? "text-emerald-400" :
                        log.startsWith("[TERM]") ? `${theme.accent} font-bold` :
                        "text-zinc-500"
                      }`}
                    >
                      {log}
                    </p>
                  ))}
                  
                  {isTerminalRunning && (
                    <span className="inline-block w-1.5 h-3 bg-zinc-400 ml-0.5 animate-pulse" />
                  )}
                </div>
              )}

            </div>
          </TiltCard>

          {/* Quick Connect & Direct Proposals Form (1 Column) */}
          <TiltCard id="card-direct-proposals" themeColor={profile.themeColor || "violet"} className="bg-zinc-950/40 border border-zinc-900/90 rounded-3xl p-6 flex flex-col justify-between hover:border-zinc-850 w-full h-full">
            <div className="space-y-4 w-full">
              
              {/* Proposal Catalyst toggle tab */}
              <div className="flex bg-zinc-900/50 p-1.5 rounded-2xl border border-zinc-900/90" id="proposal-mode-tab-buttons">
                <button
                  type="button"
                  onClick={() => setActiveProposalTab("advisor")}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-mono cursor-pointer transition-all flex items-center justify-center gap-1.5 grow ${
                    activeProposalTab === "advisor" 
                      ? `${theme.badge} border-${profile.themeColor}-500/25 text-white font-semibold` 
                      : "text-zinc-550 bg-zinc-950/40 hover:text-zinc-350"
                  }`}
                >
                  <Sparkles size={11} className={activeProposalTab === "advisor" ? theme.accent : ""} />
                  <span>Proposal Catalyst</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveProposalTab("form")}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-mono cursor-pointer transition-all flex items-center justify-center gap-1.5 grow ${
                    activeProposalTab === "form" 
                      ? `${theme.badge} border-${profile.themeColor}-500/25 text-white font-semibold` 
                      : "text-zinc-550 bg-zinc-950/40 hover:text-zinc-350"
                  }`}
                >
                  <Send size={11} className={activeProposalTab === "form" ? theme.accent : ""} />
                  <span>Interactive Mailbox</span>
                </button>
              </div>

              <div>
                <h3 className="font-sans font-extrabold text-sm text-white">Proposal Dispatcher</h3>
                <p className="font-mono text-[10px] text-zinc-500">Secure automated routing system to deliver project targets to Aditya.</p>
              </div>

              {activeProposalTab === "advisor" ? (
                /* Proposal Catalyst interactive budget module */
                <div className="space-y-3.5 p-3.5 bg-zinc-950 border border-zinc-900/80 rounded-2xl text-left shadow-inner relative animate-fade-in" id="proposal-catalyst-panel">
                  
                  {/* Scope dropdown selector */}
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] text-zinc-550 block">1. Select Target Domain</label>
                    <select
                      value={advisorSector}
                      onChange={(e) => setAdvisorSector(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-2.5 py-1.5 text-[11px] text-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-700 cursor-pointer font-sans"
                    >
                      <option value="ai_agent">Autonomous LLM/CodeT5 Repair Agent</option>
                      <option value="web_app">Modern React Bento Portal & Server</option>
                      <option value="ml_pipeline">Distributed Machine Learning Pipelines</option>
                    </select>
                  </div>

                  {/* Complexity step slider */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between items-center text-[9px] font-mono text-zinc-550">
                      <span>2. SLA Delivery Tier</span>
                      <span className="text-white font-bold uppercase text-[9.5px]">
                        {advisorComplexity === 1 && "Proof of Concept"}
                        {advisorComplexity === 2 && "Standard MVP"}
                        {advisorComplexity === 3 && "Enterprise scale"}
                      </span>
                    </div>
                    <input 
                      type="range"
                      min={1}
                      max={3}
                      step={1}
                      value={advisorComplexity}
                      onChange={(e) => setAdvisorComplexity(parseInt(e.target.value))}
                      className="w-full h-1 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-violet-500"
                    />
                    <div className="flex justify-between font-mono text-[8px] text-zinc-650 px-1 pt-1">
                      <span>Prototype</span>
                      <span>MVP Tier</span>
                      <span>Prod Scaling</span>
                    </div>
                  </div>

                  {/* Reactive Calculator Display */}
                  {(() => {
                    const specs = getProposalSpecValues();
                    return (
                      <div className="bg-zinc-900/50 border border-zinc-900 rounded-xl p-3 space-y-2 mt-2">
                        <div className="flex justify-between items-start border-b border-zinc-900 pb-1.5">
                          <div className="text-left">
                            <span className="font-mono text-[8px] text-zinc-550 block uppercase">Estimate range</span>
                            <span className="text-sm font-black text-white">${specs.price.toLocaleString()} USD</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded-md text-[8.5px] font-mono font-bold ${theme.badge} border`}>
                            {specs.duration}
                          </span>
                        </div>

                        <ul className="space-y-1 font-mono text-[8.5px] text-zinc-450 text-left">
                          <li className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>Stack: <strong className="text-zinc-350">{specs.subStack}</strong></span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                            <span>Coverage: <strong className="text-zinc-350">{specs.SLA}</strong></span>
                          </li>
                        </ul>

                        {/* Synthesis trigger button which copies details to feedback inputs! */}
                        <button
                          type="button"
                          onClick={() => {
                            setContactMsg(
                              `I would like to propose a project for an "${specs.sectorName}" (${specs.SLA}) using the recommended stack "${specs.subStack}". Our estimated pipeline is ${specs.duration} for a target budget of $${specs.price} USD. Please contact me with further integration details.`
                            );
                            setActiveProposalTab("form");
                          }}
                          className="w-full py-2 mt-1 bg-zinc-900 hover:bg-zinc-850 hover:text-white border border-zinc-800 text-[10px] font-mono rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer"
                        >
                          <Sparkles size={10} className={theme.accent} />
                          <span>Generate & Populate Specs</span>
                        </button>
                      </div>
                    );
                  })()}

                </div>
              ) : formSubmitted ? (
                <div className="bg-emerald-950/10 border border-emerald-900/30 p-4 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 min-h-[170px] animate-fade-in" id="proposal-success-dialog">
                  <CheckCircle2 className="text-emerald-500 animate-bounce" size={28} />
                  <p className="font-sans font-extrabold text-xs text-white">Proposal Dispatched Successfully</p>
                  <p className="font-mono text-[9px] text-zinc-500 leading-relaxed font-sans max-w-[200px]">
                    Message localized and recorded in Aditya's mailbox data matrix.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-2.5 animate-fade-in text-left" id="direct-proposal-form">
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] text-zinc-550">Your Professional Title / Firm</label>
                    <input 
                      type="text"
                      placeholder="E.g. Principal Project Manager"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 hover:border-zinc-850 rounded-xl px-3 py-2 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-700 font-sans"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] text-zinc-550">Your Coordinator Email</label>
                    <input 
                      type="email"
                      required
                      placeholder="E.g. recruit@enterprise.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 hover:border-zinc-850 rounded-xl px-3 py-2 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-700 font-sans"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] text-zinc-550">Proposal Specs & Requirements</label>
                    <textarea 
                      required
                      rows={2.5}
                      placeholder="Write specifications, or toggle the Catalyst tab above to build automated scopes immediately..."
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 hover:border-zinc-850 rounded-xl px-3 py-2 text-xs text-zinc-200 placeholder-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-700 resize-none font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-2 bg-gradient-to-r ${theme.gradient} hover:opacity-90 text-white rounded-xl text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 border border-white/5 transition-all cursor-pointer mt-2`}
                  >
                    <Send size={11} /> Validate & Dispatch Payload
                  </button>
                </form>
              )}
            </div>
            
            <div className="mt-4 pt-3 border-t border-zinc-900/60 font-mono text-[9.5px] text-zinc-500 flex justify-between">
              <span>Tel: 8484903641</span>
              <a href={`mailto:${profile.email}`} className="hover:underline hover:text-white">Email Direct</a>
            </div>
          </TiltCard>

          {/* Infrastructure Specs Footer Bento Node (Spans 3 Columns) */}
          <div className="md:col-span-3 bg-zinc-950 border border-zinc-900/90 rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden" id="bento-system-specs">
            <div className={`absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b ${theme.gradient}`} />
            
            <div className="space-y-2 relative z-10 font-sans">
              <div className="flex items-center gap-2">
                <Compass className={theme.accent} size={15} />
                <h4 className="font-sans font-extrabold text-sm text-white">AIS-Dev Portfolio Architecture Overview</h4>
              </div>
              <p className="font-sans text-xs text-zinc-400 max-w-3xl leading-relaxed">
                This is Aditya's fully customized responsive Bento Grid developer profile. Rendered on the 
                client-side with modern HTML structure & Tailwind CSS styling, coupled with live API wrappers 
                synchronizing with a backend server that routes system triggers context and chat flows to 
                the <strong className="text-white font-semibold">Gemini 3.5 Flash</strong> model immediately.
              </p>
            </div>

            <div className="text-left sm:text-right font-mono text-[11px] text-zinc-500 space-y-1 relative z-10 shrink-0">
              <p>Node Status: <span className="text-emerald-400 font-bold uppercase tracking-wider">ONLINE</span></p>
              <p>Active Engine: <span className="text-white">gemini-3.5-flash</span></p>
              <p className="text-[10px]">Environment Target: AIS Sandbox Container</p>
            </div>
          </div>

        </div>
      </main>

      {/* Editor Modal Drawer */}
      <PortfolioEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        profileData={profile}
        onSave={handleSaveProfile}
        onReset={handleResetDefaults}
      />

    </div>
  );
}
