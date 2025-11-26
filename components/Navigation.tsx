import React, { useState } from 'react';
import { NAV_ITEMS } from '../constants';
import { Menu, X, Terminal } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop HUD Header */}
      <nav className="fixed top-0 w-full z-40 border-b border-tech-cyan/20 bg-tech-bg/90 backdrop-blur-sm">
        <div className="w-full px-6 py-4 flex justify-between items-end">
          
          {/* Brand / System ID */}
          <div 
              className="group cursor-pointer flex flex-col interactive"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="flex items-center gap-2 text-tech-cyan mb-1">
                <Terminal size={14} />
                <span className="font-mono text-[10px] tracking-widest">SYS_ID: DONG_QL</span>
            </div>
            <h1 className="font-display font-bold text-2xl tracking-tight text-white group-hover:text-tech-cyan transition-colors">
                DONG QIANLI
            </h1>
          </div>

          {/* System Menu */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item, index) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.targetId)}
                className="relative px-6 py-2 group overflow-hidden interactive"
              >
                {/* Button Background Hover */}
                <span className="absolute inset-0 bg-tech-cyan/10 translate-y-full group-hover:translate-y-0 transition-transform duration-200"></span>
                
                {/* Border markers */}
                <span className="absolute top-0 left-0 w-[2px] h-2 bg-tech-cyan opacity-0 group-hover:opacity-100"></span>
                <span className="absolute bottom-0 right-0 w-[2px] h-2 bg-tech-cyan opacity-0 group-hover:opacity-100"></span>

                <div className="flex flex-col items-start relative z-10">
                    <span className="font-mono text-[9px] text-stone-500 group-hover:text-tech-cyan transition-colors">0{index + 1} //</span>
                    <span className="font-display font-medium text-sm tracking-wider uppercase">{item.label.split('. ')[1]}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-tech-cyan interactive border border-tech-cyan/30 p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        {/* Decorative Progress Line */}
        <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-tech-cyan/50 w-1/3 animate-[scan_3s_linear_infinite] opacity-50"></div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Terminal Style */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-tech-bg z-30 flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
            {NAV_ITEMS.map((item, index) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.targetId)}
                className="font-display text-4xl text-white hover:text-tech-cyan hover:bg-white/5 w-full py-4 text-center border-y border-white/5 interactive uppercase tracking-wider"
              >
                <span className="text-sm font-mono text-tech-dim mr-4">0{index+1}</span>
                {item.label.split('. ')[1]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;