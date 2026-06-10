import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import {
  Terminal as TerminalIcon,
  Brain,
  Cpu,
  Layers,
  Award,
  BookOpen,
  Mail,
  Linkedin,
  Github,
  Phone,
  ArrowUpRight,
  Globe,
  Sparkles,
  Code,
  GraduationCap,
  Star,
  Send,
  FileText,
  User,
  Heart,
  ChevronRight,
  Menu,
  X,
  Compass,
  TrendingUp
} from 'lucide-react';
import { EXPERIENCES, EDUCATIONS, TECHNICAL_SKILLS, SOFT_SKILLS, CERTIFICATIONS, ACHIEVEMENTS, PUBLICATIONS } from './data';
import { Experience } from './types';
import Loader from './components/Loader';
import FaceReveal from './components/FaceReveal';
import GooCursor from './components/GooCursor';
import AnimatedText from './components/AnimatedText';
import GitHubRepos from './components/GitHubRepos';
import SpotlightCard from './components/SpotlightCard';
import HeroParticles from './components/HeroParticles';
import TechMarquee from './components/TechMarquee';

export default function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pubSearch, setPubSearch] = useState('');
  const [pubSortOrder, setPubSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [terminalInput, setTerminalInput] = useState('');
  const [headerGlitch, setHeaderGlitch] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vortex_terminal_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const terminalInputRef = useRef<HTMLInputElement>(null);

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [systemActive, setSystemActive] = useState(true);

  // Simulated terminal typing
  useEffect(() => {
    const logs = [
      'Initializing quantum system core...',
      'Mapping neural weights... OK',
      'Establishing connection to Doon University cloud nodes...',
      'Synchronizing Parth Ajmera database core...',
      'Google Developer Ecosystem: Connected',
      'Team Gemini engine: ONLINE',
      'Ready to explore. Type "help" to view terminal commands.'
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logs.length) {
        setTerminalLogs(prev => [...prev, `[system@vortex ~]$ ${logs[currentLogIndex]}`]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
      }
    }, 900);

    return () => clearInterval(interval);
  }, []);

  // Automated scroll top-up and cyber glitch trigger when logs update
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
    if (terminalLogs.length > 0) {
      setHeaderGlitch(true);
      const timer = setTimeout(() => setHeaderGlitch(false), 320);
      return () => clearTimeout(timer);
    }
  }, [terminalLogs]);

  // Terminal Command Logic
  const handleTerminalSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const rawInput = terminalInput;
      const cmd = rawInput.trim();
      const lowerCmd = cmd.toLowerCase();

      // Clear input
      setTerminalInput('');

      if (!cmd) {
        // If empty enter, just print an empty prompt line
        setTerminalLogs(prev => [...prev, '[vortex@nexus ~]$']);
        return;
      }

      // Add to logs
      setTerminalLogs(prev => [...prev, `[vortex@nexus ~]$ ${rawInput}`]);

      // Add to command history
      const newHistory = [...commandHistory, rawInput];
      setCommandHistory(newHistory);
      try {
        localStorage.setItem('vortex_terminal_history', JSON.stringify(newHistory));
      } catch (err) {
        console.error('Failed to save terminal history', err);
      }
      setHistoryPointer(-1);

      // Execute commands
      if (lowerCmd === 'clear') {
        setTerminalLogs([]);
      } else if (lowerCmd === 'help') {
        setTerminalLogs(prev => [
          ...prev,
          'Available Commands:',
          '  help        - Show available console commands',
          '  clear       - Reset console logs & activity stream',
          '  about       - View full bio summary & scientific focus',
          '  experience  - List professional archive highlights',
          '  skills      - Query active industry technological stacks',
          '  achieve     - Show key developmental & academic accolades',
          '  contact     - Reveal active network uplink vectors'
        ]);
      } else if (lowerCmd === 'about' || lowerCmd === 'bio') {
        setTerminalLogs(prev => [
          ...prev,
          'Parth Ajmera — System Bio Metrics:',
          '  - Applied Machine Learning & Agentic System Builder.',
          '  - Studying B.Tech CSE (Class of \'29) at Doon University.',
          '  - Building multi-agent pipelines & high-frequency quantitative engines.'
        ]);
      } else if (lowerCmd === 'experience') {
        setTerminalLogs(prev => [
          ...prev,
          'Professional Chronicles:',
          '  - Google Student Ambassador: Educating hundreds on GenAI & Cloud systems.',
          '  - Co-Founder & CFO (Shastra): Leading strategic financials & operations.',
          '  - ex Student Council President: Governing 1500+ student body.',
          'Type "clear" to empty history logs.'
        ]);
      } else if (lowerCmd === 'skills') {
        setTerminalLogs(prev => [
          ...prev,
          'Priority Infrastructure & Technologies:',
          '  - Languages : C/C++, Python, SQL, JS/TS, Bash Scripts',
          '  - Platforms : Linux OS, Docker, Kubernetes, Git Versioning',
          '  - Systems   : LLM Workflows, PyTorch, Multi-agent Ecosystems'
        ]);
      } else if (lowerCmd === 'achieve') {
        setTerminalLogs(prev => [
          ...prev,
          'High-Tier System Accolades:',
          '  - Top 1500 candidate globally in Google Big Code 2026.',
          '  - Top 19% rank in IMC Prosperity 4 out of 18,809 squads.',
          '  - Vidyalaya Ratna: Peak high-school leadership & scholarship trophy.'
        ]);
      } else if (lowerCmd === 'contact') {
        setTerminalLogs(prev => [
          ...prev,
          'Active Interface Coordinates:',
          '  - Email    : ajmeraparth.official@gmail.com',
          '  - LinkedIn : linkedin.com/in/ajmeraparthofficial',
          '  - GitHub   : github.com/Vortex-ParthAjmera',
          '  - Phone    : +91 97600 10213'
        ]);
      } else {
        setTerminalLogs(prev => [
          ...prev,
          `SYS_ERROR: Command not recognized: "${rawInput}". Type "help" for guidelines.`
        ]);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextPointer = historyPointer === -1 ? commandHistory.length - 1 : historyPointer - 1;
      if (nextPointer >= 0) {
        setHistoryPointer(nextPointer);
        setTerminalInput(commandHistory[nextPointer]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer === -1) return;
      const nextPointer = historyPointer + 1;
      if (nextPointer < commandHistory.length) {
        setHistoryPointer(nextPointer);
        setTerminalInput(commandHistory[nextPointer]);
      } else {
        setHistoryPointer(-1);
        setTerminalInput('');
      }
    }
  };

  // Update navigation reading line on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'experience', 'education', 'skills', 'projects', 'achievements', 'publications', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailTo = `mailto:ajmeraparth.official@gmail.com?subject=${encodeURIComponent(formSubject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Hi Parth,\n\nName: ${formName}\nEmail: ${formEmail}\n\n${formMsg}\n\nSent via Space-Tech Portfolio Client.`)}`;
    
    // Fallback/Open browser mailto
    window.location.href = mailTo;
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 5000);
  };

  // Helper to accurately parse and convert publication date strings (e.g., 'Oct 2025', 'Jan 2024') to standard comparable values
  const parsePublicationDate = (dateStr: string) => {
    const parts = dateStr.trim().split(/\s+/);
    if (parts.length < 2) return 0;
    const [monthName, yearStr] = parts;
    const year = parseInt(yearStr, 10) || 0;
    const monthsMap: Record<string, number> = {
      jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
      jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12
    };
    const month = monthsMap[monthName.toLowerCase()] || 1;
    return year * 100 + month;
  };

  const filteredPublications = PUBLICATIONS.filter(pub =>
    pub.title.toLowerCase().includes(pubSearch.toLowerCase()) ||
    pub.medium.toLowerCase().includes(pubSearch.toLowerCase())
  );

  const sortedPublications = [...filteredPublications].sort((a, b) => {
    const valA = parsePublicationDate(a.date);
    const valB = parsePublicationDate(b.date);
    return pubSortOrder === 'newest' ? valB - valA : valA - valB;
  });

  if (loading) {
    return <Loader onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans antialiased selection:bg-[#00d4ff]/30 selection:text-[#00d4ff]" id="app-root">
      
      {/* Viewport Scroll Progress Indicator -- GPU Accelerated */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-[#00d4ff] to-indigo-500 origin-[0%] z-[9999]"
        style={{ scaleX }}
        id="scroll-progress-bar"
      />

      {/* Dynamic 3D fluid goo tracking custom cursor follower */}
      <GooCursor />

      {/* Dynamic interactive nano particles background underlaying all components */}
      <HeroParticles />
      
      {/* GLOWING AMBIENT BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" id="ambient-overlay">
        {/* Animated Brutalist Grid */}
        <div 
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '55px 55px',
            maskImage: 'radial-gradient(ellipse 65% 55% at 50% 50%, #000 50%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 65% 55% at 50% 50%, #000 50%, transparent 100%)'
          }}
          id="grid-layer"
        />
        
        {/* Subdued Elegant Atmosphere Lights */}
        <div className="absolute top-[15%] left-[55%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-[#00d4ff]/3 to-transparent blur-[140px] animate-pulse" style={{ animationDuration: '10s' }} id="nebula-cyan" />
      </div>

      {/* COGNITIVE TOP BRUTALIST NAVIGATION HEADER */}
      <header className="sticky top-0 z-50 bg-[#0d0d0d]/90 backdrop-blur-md border-b border-custom" id="header-hud">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 border border-custom flex items-center justify-center text-white font-bold font-mono tracking-tighter text-sm rounded-full cursor-default hover:bg-white hover:text-[#0d0d0d] transition-colors duration-300" id="brand-indicator">
              PA
            </div>
            <a href="#hero" className="font-mono text-sm tracking-[0.25em] text-white hover:text-gray-300 transition-colors font-bold uppercase" id="brand-logo">
              STRATOS<span className="text-gray-500"> / VORTEX</span>
            </a>
          </motion.div>

          {/* Desktop Bold Navigation Links */}
          <nav className="hidden md:flex items-center gap-10" id="desktop-nav-links">
            {['about', 'experience', 'education', 'skills', 'projects', 'achievements', 'publications', 'contact'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                id={`nav-${section}`}
                className={`font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-200 relative py-1 ${
                  activeSection === section ? 'text-white' : 'text-gray-500 hover:text-white'
                }`}
              >
                {section}
                {activeSection === section && (
                  <motion.span
                    layoutId="current-nav"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full"
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Direct CTA Link */}
          <div className="hidden md:block" id="nav-cta-panel">
            <a
              href="#contact"
              className="w-10 h-10 border border-custom flex items-center justify-center rounded-full cursor-pointer hover:bg-white hover:text-black transition-colors duration-300 relative text-sm group"
              id="initiate-connection-btn"
              title="Connect Node"
            >
              &rarr;
            </a>
          </div>

          {/* Mobile responsive toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-gray-400 transition-colors"
            aria-label="Toggle Navigation HUD"
            id="mobile-nav-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Live reading indicator bar */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" id="scroll-level-bar" />
      </header>

      {/* MOBILE HUD OVERLAY NAVIGATION */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[77px] bottom-0 bg-[#0d0d0d]/98 z-40 md:hidden border-t border-custom flex flex-col p-6 overflow-y-auto"
            id="mobile-hud-overlay"
          >
            <div className="flex flex-col gap-6 py-6 mutual-links">
              {['about', 'experience', 'education', 'skills', 'projects', 'achievements', 'publications', 'contact'].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  id={`mob-nav-${section}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-mono text-lg uppercase tracking-widest pb-3 border-b border-custom flex items-center justify-between ${
                    activeSection === section ? 'text-white font-bold' : 'text-gray-500'
                  }`}
                >
                  <span>{section}</span>
                  <ChevronRight className="w-4 h-4 text-white/50" />
                </a>
              ))}
            </div>

            <div className="mt-auto space-y-4 pt-6 border-t border-custom">
              <div className="text-center font-mono text-[10px] text-gray-500 tracking-widest">
                SYSTEM PORT: 3000 // ACTIVE CONSOLE
              </div>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 bg-transparent border border-custom hover:bg-white hover:text-black text-white font-mono text-sm tracking-wider text-center uppercase rounded-full block transition-colors duration-300"
                id="mob-connect-btn"
              >
                Send Encryption Memo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="viewport-container">
        
        {/* HERO SECTION DECK */}
        <section className="min-h-[85vh] flex flex-col justify-center py-20 relative overflow-hidden" id="hero">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* INTRO BIO CARD */}
            <div className="lg:col-span-12 xl:col-span-7 space-y-8 text-left" id="hero-profile-cell">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-custom rounded-full"
                id="hero-tagline-container"
              >
                <div className="relative flex h-2 w-2" id="live-beacon-group">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </div>
                <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-emerald-400 font-semibold uppercase">
                  AVAILABLE --  INTERNSHIPS & COLLABORATIONS
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="space-y-4"
                id="hero-header-block"
              >
                <h1 className="huge-text font-black text-white leading-none tracking-tighter uppercase flex flex-col">
                  <AnimatedText text="PARTH" delay={0.2} />
                  <AnimatedText text="AJMERA." className="huge-outline" delay={0.4} />
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl font-light tracking-wide font-sans leading-relaxed">
                  Agentic AI builder. Applied ML engineer. Strategist. B.Tech CSE '29 at Doon University. Building at the intersection of LLM systems, product strategy, and quantitative finance from multi-agent pipelines to algorithmic trading engines.
                </p>
              </motion.div>

              {/* CORE HIGHLIGHTS BENTO BADGES */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-2.5 max-w-2xl"
                id="hero-bento-badges"
              >
                <div className="px-3 py-1.5 bg-white/3 border border-custom tracking-wider text-white hover:bg-white hover:text-black font-mono text-[10px] sm:text-xs uppercase rounded transition-all duration-300 cursor-pointer flex items-center gap-1.5" id="badge-ambassador">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                  <span>Google Student Ambassador</span>
                </div>
                <div className="px-3 py-1.5 bg-white/5 border border-white/20 tracking-wider text-white hover:bg-white hover:text-black font-mono text-[10px] sm:text-xs uppercase rounded transition-all duration-300 cursor-pointer flex items-center gap-1.5" id="badge-bigcode">
                  <Award className="w-3.5 h-3.5 text-cyan-400 fill-current" />
                  <span>Top 1500 // Google Big Code 2026</span>
                </div>
                <div className="px-3 py-1.5 bg-[#131313] border border-emerald-500/30 text-emerald-300 font-mono text-[10px] sm:text-xs tracking-wider rounded hover:border-emerald-400/50 transition-all duration-300 cursor-help flex items-center gap-1.5" id="badge-prosperity-live">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Top 19% // IMC Prosperity 4 (18,809 Teams)</span>
                </div>
                <div className="px-3 py-1.5 bg-[#131313] border border-cyan-950/50 text-cyan-200 font-mono text-[10px] sm:text-xs tracking-wide rounded hover:border-cyan-400/30 transition-all duration-300 cursor-help" id="badge-astro">
                  <span>🌌 Astrophysics Interest</span>
                </div>
                <div className="px-3 py-1.5 bg-[#131313] border border-custom text-gray-300 font-mono text-[10px] sm:text-xs tracking-wide rounded" id="badge-uni">
                  B.Tech CSE @ Doon University
                </div>
                <div className="px-3 py-1.5 bg-[#131313] border border-custom text-white font-mono text-[10px] sm:text-xs tracking-wider rounded font-bold flex items-center gap-1" id="badge-gpa">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span>SGPA 8.86 / 10</span>
                </div>
                <div className="px-3 py-1.5 bg-[#131313] border border-custom text-gray-400 font-mono text-[10px] sm:text-xs tracking-wide rounded" id="badge-gsoc">
                  GSoC Core Aspirant
                </div>
                <div className="px-3 py-1.5 bg-[#131313] border border-custom text-white font-mono text-[10px] sm:text-xs tracking-widest uppercase rounded hover:border-white transition-colors" id="badge-shastra">
                  Co-Founder & CFO — Shastra
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex gap-4 pt-4"
                id="hero-actions"
              >
                <a
                  href="#contact"
                  className="px-8 py-4 bg-white text-black font-mono text-xs font-bold tracking-widest uppercase rounded hover:bg-gray-200 transition-all duration-300"
                  id="primary-link-node-btn"
                >
                  Connect Node &rarr;
                </a>
                <a
                  href="#experience"
                  className="px-8 py-4 border border-custom text-white hover:bg-white/5 font-mono text-xs tracking-widest uppercase rounded transition-all duration-300"
                  id="secondary-view-matrix-btn"
                >
                  Explore Matrices
                </a>
              </motion.div>
            </div>

            {/* LIVE COMPUTER TERMINAL CONSOLE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-12 xl:col-span-5 w-full flex justify-center relative"
              id="hero-terminal-deck"
            >
              {/* Absolute vertical rail aligner on hero right */}
              <div className="absolute right-[-4vw] top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-8">
                <div className="vertical-rail text-[9px] uppercase tracking-[0.55em] text-gray-500 font-bold border-r border-custom pr-4 py-8">
                  SCROLL TO EXPLORE — EST. 2026
                </div>
              </div>

              <div 
                className="w-full max-w-md bg-[#111111] border border-custom rounded-lg shadow-2xl relative overflow-hidden flex flex-col group hover:border-white/20 transition-colors"
                style={{ height: '340px' }}
                id="cyber-terminal-card"
              >
                {/* HUD Top Bar */}
                <div 
                  className={`px-4 py-3 bg-[#181818] border-b border-custom flex items-center justify-between relative overflow-hidden select-none transition-all duration-150 ${headerGlitch ? 'cyber-glitch-active bg-red-950/20 border-red-500/30' : ''}`} 
                  id="terminal-top"
                >
                  {/* Scanline active during glitches */}
                  {headerGlitch && (
                    <div className="absolute inset-0 bg-red-500/5 pointer-events-none mix-blend-overlay">
                      <div className="w-full h-[2px] bg-red-400/40 absolute top-0 left-0 animate-scan" />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[8px] font-bold text-red-500 tracking-widest uppercase opacity-75">
                        ALRT_RECV
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5 z-10" id="terminal-lights">
                    <span className={`w-2 h-2 rounded-full transition-colors duration-150 ${headerGlitch ? 'bg-red-500' : 'bg-white/20'}`} />
                    <span className={`w-2 h-2 rounded-full transition-colors duration-150 ${headerGlitch ? 'bg-red-500 animate-pulse' : 'bg-white/20'}`} />
                    <span className={`w-2 h-2 rounded-full transition-colors duration-150 ${headerGlitch ? 'bg-red-400' : 'bg-white'}`} style={{ animation: headerGlitch ? 'bounce 0.15s infinite' : '' }} />
                  </div>
                  <div className="font-mono text-[10px] text-gray-500 tracking-wider uppercase flex items-center gap-1 z-10" id="terminal-info">
                    <TerminalIcon className={`w-3 h-3 transition-colors duration-150 ${headerGlitch ? 'text-red-400' : 'text-white'}`} />
                    <span className={`transition-colors duration-150 ${headerGlitch ? 'text-red-400 font-bold tracking-widest' : ''}`}>
                      {headerGlitch ? 'vortex@cyberdeck:~/stream_packet' : 'stratos@cyberdeck:~/parth_config'}
                    </span>
                  </div>
                  <div className="w-5 z-10" />
                </div>

                {/* Interactive Terminal Stream */}
                <div 
                  ref={terminalBodyRef}
                  onClick={() => terminalInputRef.current?.focus()}
                  className="p-4 flex-1 font-mono text-xs text-left text-gray-300 space-y-2 overflow-y-auto overflow-x-hidden scrollbar-thin cursor-text" 
                  id="terminal-output-body"
                >
                  <div className="text-gray-600 text-[10px] border-b border-custom pb-1 mb-2 flex justify-between select-none">
                    <span>PARTH-STRATOS-ENGINE v3.4.6-ACCELERATED</span>
                    <span className="text-emerald-500/80">ONLINE</span>
                  </div>
                  {terminalLogs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="break-words text-gray-300"
                    >
                      {log}
                    </motion.div>
                  ))}
                  <div className="flex items-center gap-1 text-white pr-2" id="terminal-prompt-caret">
                    <span className="text-emerald-400 font-bold select-none shrink-0">[vortex@nexus ~]$</span>
                    <input
                      ref={terminalInputRef}
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      onKeyDown={handleTerminalSubmit}
                      className="bg-transparent border-none outline-none flex-1 font-mono text-xs text-white p-0 m-0 focus:ring-0 focus:outline-none min-w-0"
                      autoComplete="off"
                      autoCapitalize="off"
                      spellCheck="false"
                    />
                  </div>
                </div>

                {/* HUD Footer Status */}
                <div className="px-4 py-2 bg-[#181818] border-t border-custom flex justify-between items-center text-[10px] font-mono text-gray-500" id="terminal-stats-meter">
                  <span className="flex items-center gap-1">
                    <Globe className="w-3 h-3 text-white animate-spin" style={{ animationDuration: '6s' }} />
                    UTC: {new Date().toISOString().substring(11, 19)}
                  </span>
                  <button 
                    onClick={() => setLoading(true)} 
                    className="hover:text-cyan-400 text-white/70 active:scale-95 transition-all font-bold tracking-widest flex items-center gap-1 font-mono cursor-pointer uppercase" 
                    title="Click here to replay the animated booting loading screen"
                  >
                    🚀 RESTORE SEQUENCE ⟳
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Animated multi-color flow ribbons and infinite horizontal marquee inspired by Yashvardhan's workspace design elements */}
        <div className="space-tech-strip my-2" id="hero-divider-ribbon-top" />
        <TechMarquee />
        <div className="space-tech-strip mt-2 mb-20" id="hero-divider-ribbon-bottom" />

        {/* 01 // ABOUT ME DECK */}
        <motion.section
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="py-24 border-t border-custom scroll-mt-10"
          id="about"
        >
          <div className="space-y-12">
            
            {/* Sector Header */}
            <div className="space-y-4 text-left" id="about-title-block">
              <span className="font-mono text-xs text-gray-500 tracking-[0.3em] uppercase block">// SECTION 01</span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white uppercase">
                <AnimatedText text="ABOUT COGNITIVE CONSTRUCT" />
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="about-columns">
              
              {/* Bio Narrative & Stats */}
              <div className="lg:col-span-12 xl:col-span-7 space-y-6 text-left" id="about-narrative-card">
                <p className="text-base text-gray-400 leading-relaxed font-sans">
                  I am a focused <strong className="text-white font-bold">Computer Science undergraduate</strong> based in Dehradun, specializing in building rigorous, low-level algorithmic components and high-efficiency structures. I bridge technical systems theory with real-world, scalable software architecture.
                </p>
                <p className="text-base text-gray-400 leading-relaxed font-sans">
                  Expanding from classical algorithm design to broad <strong className="text-white font-bold">open-source networks</strong>, I develop in C, Python, and Unix systems, laying the groundwork for key technical ecosystems. I actively drive local coding groups while positioning for significant open-source achievements like <strong className="text-white underline font-bold">Google Summer of Code (GSoC)</strong>.
                </p>
                <p className="text-base text-gray-400 leading-relaxed font-sans">
                  As a leading student voice on campus, I serve as a <strong className="text-white font-bold">Google Student Ambassador</strong>, facilitating high-tech educational workshops on generative technology and cloud intelligence for hundreds of students.
                </p>

                {/* Metric Bento Cells */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6" id="about-stats-bento">
                  <SpotlightCard className="border border-custom p-6 group hover:border-white transition-colors duration-300" id="stat-publications">
                    <span className="block font-sans text-4xl font-black text-white">6+</span>
                    <span className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mt-2">Publications</span>
                  </SpotlightCard>
                  <SpotlightCard className="border border-custom p-6 group hover:border-white transition-colors duration-300" id="stat-cups">
                    <span className="block font-sans text-4xl font-black text-white">8+</span>
                    <span className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mt-2">Oratory Cups</span>
                  </SpotlightCard>
                  <SpotlightCard className="border border-custom p-6 group hover:border-white transition-colors duration-300" id="stat-sgpa">
                    <span className="block font-sans text-4xl font-black text-white">8.86</span>
                    <span className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mt-2">Semester SGPA</span>
                  </SpotlightCard>
                </div>
              </div>

              {/* Sidebar Metadata Blocks */}
              <div className="lg:col-span-12 xl:col-span-5 space-y-6" id="about-sidebar-cards">
                
                {/* 3D PROFILE REVEAL PHOTO DECK */}
                <SpotlightCard className="border border-custom p-6 flex justify-center text-center" id="card-facereveal">
                  <FaceReveal />
                </SpotlightCard>
                
                {/* Physical Location */}
                <SpotlightCard className="border border-custom border-l-4 border-l-white p-6 text-left" id="card-location">
                  <h4 className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-1.5">Geolocation Coordinate</h4>
                  <p className="text-white text-sm font-semibold flex items-center gap-2">
                    <Compass className="w-4 h-4 text-white" />
                    <span>Dehradun, Uttarakhand, India 🇮🇳</span>
                  </p>
                </SpotlightCard>

                {/* Structured Tech Matrix */}
                <SpotlightCard className="border border-custom border-l-4 border-l-white p-6 text-left" id="card-techmatrix">
                  <h4 className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-3">Priority Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {['C / C++', 'Python', 'Linux OS', 'Bash scripting', 'Git/GitHub', 'Docker', 'Kubernetes', 'React', 'SQL'].map(pill => (
                      <span key={pill} className="px-2.5 py-1 bg-white/5 border border-custom hover:border-white text-gray-300 hover:text-white text-xs font-mono transition-all">
                        {pill}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>

                {/* Linguistic Profiles */}
                <SpotlightCard className="border border-custom border-l-4 border-l-white p-6 text-left" id="card-languages">
                  <h4 className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-2.5">Linguistic Channels</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 bg-white/5 text-gray-200 text-xs font-mono uppercase tracking-wider border border-custom">English</span>
                    <span className="px-2.5 py-1 bg-white/5 text-gray-200 text-xs font-mono uppercase tracking-wider border border-custom">Hindi</span>
                    <span className="px-2.5 py-1 bg-white/5 text-gray-200 text-xs font-mono uppercase tracking-wider border border-custom">Japanese</span>
                  </div>
                </SpotlightCard>

                {/* Areas of Interest */}
                <SpotlightCard className="border border-custom border-l-4 border-l-white p-6 text-left" id="card-interests">
                  <h4 className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-2">Scientific Fields of Focus</h4>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {['AI / ML Systems', 'Quantum Supercomputing', 'Deep Astrophysics', 'Competitive Programming', 'Debating'].map(v => (
                      <span key={v} className="text-xs font-mono text-gray-400 hover:text-white transition-colors" id={`interest-${v}`}>
                        # {v}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>

              </div>
            </div>

          </div>
        </motion.section>

        {/* 02 // CHRONICLED EXPERIENCES */}
        <motion.section
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="py-24 border-t border-custom scroll-mt-10"
          id="experience"
        >
          <div className="space-y-12">
            
            {/* Sector Header */}
            <div className="space-y-4 text-left" id="experience-title-block">
              <span className="font-mono text-xs text-gray-500 tracking-[0.3em] uppercase block">// SECTION 02</span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white uppercase">
                <AnimatedText text="CHRONICLED DISPATCH & ROLES" />
              </h2>
            </div>

            {/* Vertical Flow Architecture (PCB Traced Line Style) */}
            <div className="relative border-l border-custom pl-6 sm:pl-10 ml-2 space-y-12 text-left" id="experience-timeline">
              
              {EXPERIENCES.map((exp, idx) => (
                <div key={exp.id} className="relative group" id={`exp-row-${exp.id}`}>
                  {/* Glowing Node Point */}
                  <span className={`absolute -left-[31px] sm:-left-[47px] top-1 w-4 h-4 rounded-full border-2 bg-[#0d0d0d] transition-all duration-300 ${
                    exp.isActive 
                      ? 'border-white bg-white' 
                      : 'border-white/20 group-hover:border-white'
                  }`} />

                  {/* Body Deck */}
                  <SpotlightCard className="border border-custom hover:border-white p-6 space-y-4 transition-all duration-350" id={`exp-body-${exp.id}`}>
                    
                    {/* Corner flash on active roles */}
                    {exp.isActive && (
                      <div className="absolute top-0 right-0 h-16 w-16 overflow-hidden pointer-events-none">
                        <div className="absolute top-2 right-[-24px] bg-white text-black font-mono text-[8px] font-bold py-1 px-8 text-center rotate-45 tracking-widest uppercase">
                          ACTIVE
                        </div>
                      </div>
                    )}

                    {/* Meta Header */}
                    <div className="flex flex-wrap items-start justify-between gap-2" id="exp-meta">
                      <div className="space-y-1">
                        <h3 className="font-sans text-base md:text-lg font-bold text-white group-hover:text-gray-300 transition-colors uppercase tracking-tight">
                          {exp.role}
                        </h3>
                        <p className="text-xs font-mono text-gray-400 flex items-center gap-2">
                          <span className="text-white font-medium">{exp.organization}</span>
                          <span className="px-2 py-0.5 text-[9px] bg-white/5 text-gray-300 border border-custom rounded font-bold uppercase tracking-wider">
                            {exp.type}
                          </span>
                        </p>
                      </div>
                      <span className="text-xs font-mono text-gray-500">
                        {exp.period}
                      </span>
                    </div>

                    {/* Detailed Actions (List structure) */}
                    <ul className="space-y-2 text-sm text-gray-400 list-none font-sans" id="exp-bullets">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="relative pl-5 before:content-['—'] before:absolute before:left-0 before:text-white">
                          {bullet}
                        </li>
                      ))}
                    </ul>

                  </SpotlightCard>
                </div>
              ))}

            </div>
          </div>
        </motion.section>

        {/* 03 // EDUCATION MATRIX */}
        <motion.section
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="py-24 border-t border-custom scroll-mt-10"
          id="education"
        >
          <div className="space-y-12">
            
            {/* Sector Header */}
            <div className="space-y-4 text-left" id="education-title-block">
              <span className="font-mono text-xs text-gray-500 tracking-[0.3em] uppercase block">// SECTION 03</span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white uppercase">
                <AnimatedText text="ACADEMIC BLUEPRINT REGISTRY" />
              </h2>
            </div>

            {/* Side-by-Side Dual Deck Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left" id="education-grid">
              {EDUCATIONS.map((edu) => (
                <SpotlightCard 
                  key={edu.id} 
                  className="border border-custom hover:border-white p-6 flex flex-col justify-between transition-all duration-300"
                  id={`edu-card-${edu.id}`}
                >
                  <div className="space-y-4" id="edu-content-block">
                    {/* Title */}
                    <div>
                      <span className="font-mono text-[10px] text-gray-400 tracking-[0.2em] uppercase block mb-1">
                        {edu.period}
                      </span>
                      <h3 className="font-sans text-lg font-bold text-white uppercase tracking-tight">
                        {edu.degree}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {edu.school}
                      </p>
                    </div>

                    {/* GPA Highlight */}
                    <div className="py-2.5 px-4 bg-white/5 border border-custom rounded inline-block cursor-default" id="edu-score">
                      <span className="block font-sans text-2xl font-black text-white">
                        {edu.gpa}
                      </span>
                      <span className="block text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                        {edu.gpaLabel}
                      </span>
                    </div>

                    {/* Bullets details */}
                    <ul className="space-y-2 py-2 text-xs text-gray-400 font-sans">
                      {edu.bullets.map((bullet, idx) => (
                        <li key={idx} className="relative pl-4 before:content-['—'] before:absolute before:left-0 before:text-white text-left">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-custom flex items-center gap-1.5 text-gray-500 text-[10px] font-mono uppercase tracking-widest mt-6" id="edu-footer-tag">
                    <GraduationCap className="w-3.5 h-3.5 text-white" />
                    <span>VERIFIED RECORD // SYSTEMS ENGINEER</span>
                  </div>
                </SpotlightCard>
              ))}
            </div>

          </div>
        </motion.section>

        {/* 04 // INDUSTRIAL TECHNICAL SKILLS */}
        <motion.section
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="py-24 border-t border-custom scroll-mt-10"
          id="skills"
        >
          <div className="space-y-12">
            
            {/* Sector Header */}
            <div className="space-y-4 text-left" id="skills-title-block">
              <span className="font-mono text-xs text-gray-500 tracking-[0.3em] uppercase block">// SECTION 04</span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white uppercase">
                <AnimatedText text="SKILLS MATRIX & CORE SPECS" />
              </h2>
            </div>

            {/* Split layout for technical graphs and lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left" id="skills-arena">
              
              {/* Technical bar charts */}
              <div className="space-y-6" id="skills-bar-deck">
                <h3 className="font-mono text-xs text-gray-400 uppercase tracking-widest border-b border-custom pb-3">
                  SYSTEM LANGUAGES & RUNTIME PROFICIENCIES
                </h3>
                
                <div className="space-y-4" id="skill-bars-elements">
                  {TECHNICAL_SKILLS.map((skill, idx) => (
                    <div key={idx} className="space-y-2" id={`skill-item-${idx}`}>
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-white font-medium uppercase tracking-wider">{skill.name}</span>
                        <span className="text-gray-400 font-bold">{skill.percentage}%</span>
                      </div>
                      
                      {/* Interactive Bar Indicator */}
                      <div className="h-2 bg-white/5 border border-custom overflow-hidden" id="bar-track">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.percentage}%` }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                          viewport={{ once: true }}
                          className="h-full bg-white"
                          id="bar-fill"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pill stacks for other competencies */}
              <div className="space-y-8" id="skills-pills-deck">
                {/* Soft Skills & Leadership traits */}
                <div className="space-y-3">
                  <h3 className="font-mono text-xs text-gray-400 uppercase tracking-widest border-b border-custom pb-3">
                    STRATEGIC EXECUTION & SOFT MATRICES
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-1" id="soft-pills">
                    {SOFT_SKILLS.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-white/5 border border-custom hover:border-white text-gray-400 hover:text-white text-xs font-mono rounded cursor-default transition-all">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cyber Certifications */}
                <div className="space-y-3">
                  <h3 className="font-mono text-xs text-gray-400 uppercase tracking-widest border-b border-custom pb-3">
                    VERIFIED CREDENTIALS & CERTS
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-1" id="certifications-pills">
                    {CERTIFICATIONS.map((cert, idx) => {
                      const glowColors = [
                        'hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:text-emerald-300',
                        'hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:text-cyan-300',
                        'hover:border-indigo-500/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] hover:text-indigo-300',
                        'hover:border-teal-500/50 hover:shadow-[0_0_15px_rgba(20,184,166,0.15)] hover:text-teal-300',
                        'hover:border-yellow-500/50 hover:shadow-[0_0_15px_rgba(234,179,8,0.15)] hover:text-yellow-300',
                      ];
                      const currentGlow = glowColors[idx % glowColors.length];
                      return (
                        <span 
                          key={idx} 
                          className={`px-3 py-1.5 bg-white/3 border border-custom text-gray-400 text-xs font-mono rounded cursor-pointer transition-all duration-300 flex items-center gap-2 ${currentGlow}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse shrink-0" />
                          <Award className="w-3.5 h-3.5 stroke-[1.5]" />
                          <span>{cert}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </motion.section>

        {/* 05 // LIVE GITHUB SOURCE CODE REGISTRY */}
        <motion.section
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="py-24 border-t border-custom scroll-mt-10"
          id="projects"
        >
          <div className="space-y-12">
            
            {/* Sector Header */}
            <div className="space-y-4 text-left" id="projects-title-block">
              <span className="font-mono text-xs text-gray-500 tracking-[0.3em] uppercase block">// SECTION 05</span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white uppercase font-sans">
                <AnimatedText text="GITHUB DIGITAL PORTFOLIO" />
              </h2>
            </div>

            <GitHubRepos />

          </div>
        </motion.section>

        {/* 06 // SYSTEM ACHIEVEMENTS */}
        <motion.section
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="py-24 border-t border-custom scroll-mt-10"
          id="achievements"
        >
          <div className="space-y-12">
            
            {/* Sector Header */}
            <div className="space-y-4 text-left" id="achievements-title-block">
              <span className="font-mono text-xs text-gray-500 tracking-[0.3em] uppercase block">// SECTION 06</span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white uppercase">
                <AnimatedText text="MILESTONES & SCIENTIFIC ACCOLADES" />
              </h2>
            </div>

            {/* Bento Grid layout of accolades */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left" id="achievements-grid">
              {ACHIEVEMENTS.map((ach, idx) => (
                <motion.div
                  key={ach.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full"
                >
                  <SpotlightCard 
                    className="border border-custom hover:border-white p-6 flex flex-col justify-between gap-4 transition-all duration-300 h-full group"
                    id={`ach-card-${ach.id}`}
                  >
                    <div className="space-y-3" id="ach-header">
                      <div className="flex items-center justify-between" id="ach-badge-line">
                        <span className="text-2xl" role="img" aria-label="achievement icon">{ach.icon}</span>
                        <span className="px-2 py-0.5 bg-white/10 text-white border border-custom text-[9px] font-mono uppercase rounded font-bold tracking-wider">
                          {ach.tag}
                        </span>
                      </div>

                      <h3 className="font-sans text-sm md:text-base font-bold text-white group-hover:text-gray-300 uppercase tracking-tight transition-colors leading-snug">
                        {ach.title}
                      </h3>
                    </div>

                    <p className="text-xs text-gray-400 leading-relaxed font-sans" id="ach-desc">
                      {ach.description}
                    </p>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>

          </div>
        </motion.section>

        {/* 07 // SCHOLARLY RESEARCH PUBLICATIONS */}
        <motion.section
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="py-24 border-t border-custom scroll-mt-10"
          id="publications"
        >
          <div className="space-y-12">
            
            {/* Sector Header */}
            <div className="space-y-4 text-left" id="publications-title-block">
              <span className="font-mono text-xs text-gray-500 tracking-[0.3em] uppercase block">// SECTION 07</span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white uppercase">
                <AnimatedText text="SCHOLARLY PUBLICATIONS" />
              </h2>
              <p className="text-xs text-gray-400 font-mono uppercase tracking-widest leading-relaxed">
                6 Sanatan Yatra Special Volumes (Registered RNI: UPBIL05206)
              </p>
            </div>

            {/* Integrated Live Filter Search Interface */}
            <div className="space-y-6" id="publications-ledger-box">
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end justify-between" id="search-filter-hud">
                <div className="flex-1 max-w-md text-left" id="search-input-col">
                  <label htmlFor="pub-search-input" className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2.5">
                    Query Library Index (Instant Search)
                  </label>
                  <input
                    type="text"
                    id="pub-search-input"
                    value={pubSearch}
                    onChange={(e) => setPubSearch(e.target.value)}
                    placeholder="Filter by title (Vedas, Ramayana, Nausar)..."
                    className="w-full px-4 py-2.5 bg-white/5 border border-custom focus:border-white rounded text-sm text-white font-sans outline-none transition-colors"
                  />
                </div>

                <div className="w-full sm:w-56 text-left" id="sort-dropdown-col">
                  <label htmlFor="pub-sort-select" className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2.5">
                    Sort Chronology
                  </label>
                  <div className="relative">
                    <select
                      id="pub-sort-select"
                      value={pubSortOrder}
                      onChange={(e) => setPubSortOrder(e.target.value as 'newest' | 'oldest')}
                      className="w-full appearance-none px-4 py-2.5 bg-white/5 border border-custom focus:border-white rounded text-sm text-white font-mono outline-none transition-colors cursor-pointer pr-10"
                    >
                      <option value="newest" className="bg-[#0d0d0d] text-white">NEWEST FIRST</option>
                      <option value="oldest" className="bg-[#0d0d0d] text-white">OLDEST FIRST</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                      <span className="text-xs font-mono select-none">▼</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Biblio list */}
              <div className="space-y-4 text-left" id="biblio-list">
                <AnimatePresence mode="popLayout">
                  {sortedPublications.map((pub, idx) => (
                    <motion.div
                      key={pub.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-20px" }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, delay: idx * 0.06 }}
                    >
                      <SpotlightCard
                        className="border border-custom hover:border-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
                        id={`pub-row-${pub.id}`}
                      >
                        <div className="space-y-1.5" id="pub-main">
                          <div className="flex items-center gap-2" id="pub-tagline">
                            <span className="font-mono text-xs text-white font-bold">
                              #{String(idx + 1).padStart(2, '0')}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                            <span className="text-[10px] font-mono text-gray-500 uppercase">
                              Published: {pub.date}
                            </span>
                          </div>
                          <h4 className="text-sm md:text-base font-bold text-white uppercase tracking-tight leading-normal font-sans">
                            {pub.title}
                          </h4>
                          <p className="text-xs text-gray-400 font-mono">
                            {pub.medium}
                          </p>
                        </div>

                        <a
                          href={pub.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="self-start sm:self-center px-4 py-2 bg-white/5 border border-custom text-xs font-mono text-white rounded pointer-events-auto hover:bg-white hover:text-black transition-all flex items-center gap-1.5 whitespace-nowrap"
                          id={`pub-link-${pub.id}`}
                        >
                          <span>Access Archive</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </SpotlightCard>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {sortedPublications.length === 0 && (
                  <div className="py-12 text-center bg-white/3 border border-dashed border-custom rounded text-gray-500 font-mono text-xs" id="no-pub-indicator">
                    NO PUBLICATIONS CORES MATCHED YOUR GIVEN CRITERIA.
                  </div>
                )}
              </div>
            </div>

          </div>
        </motion.section>

        {/* 08 // INTEGRATION & CONTACT DECK */}
        <motion.section
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="py-24 border-t border-custom scroll-mt-10"
          id="contact"
        >
          <div className="space-y-12">
            
            {/* Sector Header */}
            <div className="space-y-4 text-left" id="contact-title-block">
              <span className="font-mono text-xs text-gray-500 tracking-[0.3em] uppercase block">// SECTION 08</span>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-white uppercase">
                <AnimatedText text="ESTABLISH SYSTEM UPLINK" />
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="contact-mesh">
              
              {/* Direct links & visual cues on the left */}
              <div className="lg:col-span-12 xl:col-span-6 space-y-6 text-left" id="contact-info-cell">
                <p className="text-base text-gray-400 leading-relaxed font-sans">
                  I welcome inquiries related to system optimization workloads, AI pipelines, experimental astrophysics research roles, co-foundry activities, or active scientific collaborations. Connect securely below.
                </p>

                {/* Structured contact buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="direct-uplink-buttons">
                  
                  {/* Email */}
                  <SpotlightCard
                    as="a"
                    href="mailto:ajmeraparth.official@gmail.com"
                    className="flex items-center gap-4 p-4 border border-custom hover:border-white text-gray-300 hover:text-white rounded transition-all duration-300 group"
                    id="contact-btn-email"
                  >
                    <div className="w-10 h-10 border border-custom flex items-center justify-center text-white bg-white/5" id="icon-container">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Email Node</div>
                      <div className="text-xs font-semibold font-mono text-white">
                        ajmeraparth.official@gmail.com
                      </div>
                    </div>
                  </SpotlightCard>

                  {/* LinkedIn */}
                  <SpotlightCard
                    as="a"
                    href="https://linkedin.com/in/ajmeraparthofficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 border border-custom hover:border-white text-gray-300 hover:text-white rounded transition-all duration-300 group"
                    id="contact-btn-linkedin"
                  >
                    <div className="w-10 h-10 border border-custom flex items-center justify-center text-white bg-white/5" id="icon-container">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">LinkedIn ID</div>
                      <div className="text-xs font-semibold font-mono text-white">
                        /ajmeraparthofficial
                      </div>
                    </div>
                  </SpotlightCard>

                  {/* GitHub */}
                  <SpotlightCard
                    as="a"
                    href="https://github.com/Vortex-ParthAjmera"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 border border-custom hover:border-white text-gray-300 hover:text-white rounded transition-all duration-300 group"
                    id="contact-btn-github"
                  >
                    <div className="w-10 h-10 border border-custom flex items-center justify-center text-white bg-white/5" id="icon-container">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">GitHub Index</div>
                      <div className="text-xs font-semibold font-mono text-white">
                        /Vortex-ParthAjmera
                      </div>
                    </div>
                  </SpotlightCard>

                  {/* Phone */}
                  <SpotlightCard
                    as="a"
                    href="tel:+919760010213"
                    className="flex items-center gap-4 p-4 border border-custom hover:border-white text-gray-300 hover:text-white rounded transition-all duration-300 group"
                    id="contact-btn-phone"
                  >
                    <div className="w-10 h-10 border border-custom flex items-center justify-center text-white bg-white/5" id="icon-container">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">Hot-uplinking</div>
                      <div className="text-xs font-semibold font-mono text-white">
                        +91 97600 10213
                      </div>
                    </div>
                  </SpotlightCard>

                </div>
              </div>

              {/* Secure message transmitter form */}
              <SpotlightCard className="lg:col-span-12 xl:col-span-6 border border-custom rounded p-6 hover:border-white transition-colors" id="contact-form-container">
                <form onSubmit={handleFormSubmit} className="space-y-5 text-left" id="system-transit-form">
                  <div className="font-mono text-xs text-white tracking-widest border-b border-custom pb-3 uppercase flex items-center gap-2 font-bold" id="form-tag">
                    <Code className="w-4 h-4" />
                    <span>Secure Transmission Core (RFC 822)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="form-personal-data">
                    <div className="space-y-1">
                      <label htmlFor="form-input-name" className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">
                        Sender Handle
                      </label>
                      <input
                        type="text"
                        id="form-input-name"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Your Handle/Name"
                        className="w-full px-4 py-2.5 bg-white/5 border border-custom focus:border-white rounded text-sm text-white font-sans outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="form-input-email" className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">
                        Return Node IP/Email
                      </label>
                      <input
                        type="email"
                        id="form-input-email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full px-4 py-2.5 bg-white/5 border border-custom focus:border-white rounded text-sm text-white font-sans outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1" id="form-subject-container">
                    <label htmlFor="form-input-subject" className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">
                      Transmission Protocol Subject
                    </label>
                    <input
                      type="text"
                      id="form-input-subject"
                      required
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                      placeholder="e.g. Systems & AI Integration Proposal"
                      className="w-full px-4 py-2.5 bg-white/5 border border-custom focus:border-white rounded text-sm text-white font-sans outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1" id="form-subject-container">
                    <label htmlFor="form-input-msg" className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">
                      Context Memo
                    </label>
                    <textarea
                      id="form-input-msg"
                      required
                      value={formMsg}
                      onChange={(e) => setFormMsg(e.target.value)}
                      placeholder="Compose detailed memo packet..."
                      rows={4}
                      className="w-full px-4 py-2.5 bg-white/5 border border-custom focus:border-white rounded text-sm text-white font-sans outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submission and response feedback lines */}
                  <div className="pt-2" id="form-trigger">
                    <button
                      type="submit"
                      className="w-full py-4 bg-white hover:bg-gray-200 text-black font-mono text-xs font-bold tracking-widest uppercase rounded flex items-center justify-center gap-2 transition-colors duration-300"
                      id="submit-form-button"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Dispatch Secured Query Package</span>
                    </button>
                  </div>

                  <AnimatePresence>
                    {formSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-3 bg-white/5 border border-white/20 text-xs font-mono text-white rounded text-center"
                        id="form-status-alert"
                      >
                        ✓ TRANSMISSION COMPLETED SUCCESSFULLY.
                      </motion.div>
                    )}
                  </AnimatePresence>

                </form>
              </SpotlightCard>

            </div>

          </div>
        </motion.section>

      </main>

      {/* Cybernetic Footer Deck */}
      <footer className="border-t border-custom py-12 mt-20 relative z-10 text-center" id="footer-hud">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 md:text-left" id="footer-brand-info">
            <p className="text-xs font-mono text-gray-500">
              © 2026 Parth Ajmera. Crafted with bold minimalism & precision.
            </p>
            <p className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">
              STATUS // ACTIVE DECK PORT 3000
            </p>
          </div>

          {/* Social indexes links */}
          <div className="flex flex-wrap gap-4 items-center justify-center text-gray-500" id="footer-social-indices">
            <a href="https://github.com/Vortex-ParthAjmera" target="_blank" rel="noreferrer noopener" className="hover:text-white text-xs font-mono transition-colors">
              GitHub Catalog
            </a>
            <span className="text-custom cursor-default">|</span>
            <a href="https://linkedin.com/in/ajmeraparthofficial" target="_blank" rel="noreferrer noopener" className="hover:text-white text-xs font-mono transition-colors">
              LinkedIn ID
            </a>
            <span className="text-custom cursor-default">|</span>
            <a href="https://orcid.org/0009-0002-2649-526X" target="_blank" rel="noreferrer noopener" className="hover:text-white text-xs font-mono transition-colors">
              ORCID Profile
            </a>
            <span className="text-custom cursor-default">|</span>
            <a href="https://leetcode.com/u/GF5NqJQsY2" target="_blank" rel="noreferrer noopener" className="hover:text-white text-xs font-mono transition-colors">
              LeetCode Index
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
