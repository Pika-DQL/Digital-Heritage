
import React, { useEffect, useState, useRef } from 'react';
import Navigation from './components/Navigation';
import AsciiLandscape from './components/AsciiLandscape';
import ProjectCard from './components/ProjectCard';
import CustomCursor from './components/CustomCursor';
import ParticleTitle from './components/ParticleTitle';
import { HERO_DATA, PROJECTS } from './constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';

const BootSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [lines, setLines] = useState<string[]>([]);
    
    useEffect(() => {
        const sequence = [
            "INITIALIZING KERNEL...",
            "LOADING ASSETS...",
            "CONNECTING TO ARCHIVE [CN_GARDEN_DB]...",
            "VERIFYING INTEGRITY...",
            "SYSTEM READY."
        ];
        
        let i = 0;
        const interval = setInterval(() => {
            if (i < sequence.length) {
                setLines(prev => [...prev, sequence[i]]);
                i++;
            } else {
                clearInterval(interval);
                setTimeout(onComplete, 500);
            }
        }, 150);
        
        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center font-mono text-xs text-tech-cyan">
            <div className="w-64">
                {lines.map((line, idx) => (
                    <div key={idx} className="mb-1">> {line}</div>
                ))}
                <div className="animate-pulse">_</div>
            </div>
        </div>
    );
};

const HUD: React.FC = () => (
    <div className="fixed inset-0 pointer-events-none z-30 hidden md:block">
        <div className="absolute top-24 left-6 text-[9px] font-mono text-stone-600 flex flex-col gap-1">
            <span>FPS: 60.0</span>
            <span>MEM: 24GB</span>
        </div>
        <div className="absolute top-24 right-6 text-[9px] font-mono text-tech-cyan opacity-50 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-tech-cyan animate-pulse"></div>
            <span>LIVE CONNECTION</span>
        </div>
        <div className="absolute bottom-6 left-6 font-mono text-[9px] text-stone-600 border-l border-stone-800 pl-2">
            LAT: 31.2304 N<br/>
            LON: 121.4737 E
        </div>
        <div className="absolute bottom-6 right-6 font-mono text-[9px] text-stone-600 border-r border-stone-800 pr-2 text-right">
            HERITAGE_DB_V2.0<br/>
            UNAUTHORIZED ACCESS LOGGED
        </div>
    </div>
);

const App: React.FC = () => {
  const [booted, setBooted] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  // Track scrolling to update background shape
  useEffect(() => {
      const handleScroll = () => {
          const sections = document.querySelectorAll('section');
          const header = document.querySelector('header');
          const scrollPos = window.scrollY + window.innerHeight / 2;

          // Check Header (Section 0)
          if (header && scrollPos < header.offsetHeight) {
              setActiveSection(0);
              return;
          }

          // Check Projects (Sections 1+)
          sections.forEach((section, index) => {
              if (section instanceof HTMLElement) {
                  if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                      setActiveSection(index + 1);
                  }
              }
          });
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!booted && <motion.div exit={{ opacity: 0 }}><BootSequence onComplete={() => setBooted(true)} /></motion.div>}
      </AnimatePresence>

      <div className={`min-h-screen w-full bg-black text-white font-sans selection:bg-tech-cyan selection:text-black overflow-x-hidden relative ${!booted ? 'h-screen overflow-hidden' : ''}`}>
        
        <CustomCursor />
        <AsciiLandscape activeSection={activeSection} />
        <HUD />
        
        {/* Vignette Overlay */}
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] z-[5]"></div>

        <Navigation />

        {/* Hero Section */}
        <header id="hero" className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 z-10 py-20">
            {/* Tech Decoration Box */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[400px] border border-white/5 rounded-lg border-dashed opacity-50 pointer-events-none"></div>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: booted ? 1 : 0, scale: booted ? 1 : 0.9 }}
                transition={{ duration: 1 }}
                className="text-center max-w-5xl relative flex flex-col items-center w-full"
            >
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="h-[1px] w-12 bg-tech-cyan"></div>
                    <span className="font-mono text-xs text-tech-cyan tracking-[0.5em] uppercase">System Online</span>
                    <div className="h-[1px] w-12 bg-tech-cyan"></div>
                </div>

                {/* 3D Particle Text Title */}
                <div className="w-full mb-4">
                    <ParticleTitle text="CRAFTING HERITAGE" />
                </div>

                <p className="font-serif italic text-2xl text-stone-400 mb-8 mt-2">
                    Digital Pathways to Classical Gardens
                </p>

                <div className="max-w-xl mx-auto backdrop-blur-sm bg-black/50 border border-white/10 p-6 rounded-sm">
                    <p className="font-mono text-xs text-stone-300 leading-relaxed text-justify">
                       {HERO_DATA.abstract}
                    </p>
                </div>
            </motion.div>

            {/* Scroll Trigger */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: booted ? 1 : 0 }}
                transition={{ delay: 2 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-tech-cyan"></div>
                <span className="font-mono text-[10px] text-tech-cyan animate-pulse">INITIATE SCROLL</span>
            </motion.div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 space-y-0">
            {PROJECTS.map((project, index) => (
                <ProjectCard key={project.id} data={project} index={index} />
            ))}
        </main>

        {/* Footer */}
        <footer className="py-24 border-t border-tech-cyan/20 bg-black/80 backdrop-blur-lg relative z-10">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                <div className="mb-6 md:mb-0">
                    <h2 className="font-display text-4xl text-white mb-2">DONG QIANLI</h2>
                    <p className="font-mono text-xs text-stone-500">DIGITAL HERITAGE ARCHIVE // TERMINAL 01</p>
                </div>
                
                <a href="mailto:qianli@u.nus.edu" className="flex items-center gap-2 text-stone-400 hover:text-tech-cyan transition-colors font-mono text-sm interactive group">
                    <Mail size={16} className="text-tech-cyan/70 group-hover:text-tech-cyan" /> 
                    qianli@u.nus.edu
                </a>
            </div>
            {/* Bottom Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-black via-tech-cyan to-black opacity-50"></div>
        </footer>

      </div>
    </>
  );
};

export default App;
