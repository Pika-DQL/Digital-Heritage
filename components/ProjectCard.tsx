
import React, { useState } from 'react';
import { ProjectSection } from '../types';
import { Activity, ExternalLink, Award, ShieldCheck, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import ParticleTitle from './ParticleTitle';

interface Props {
  data: ProjectSection;
  index: number;
}

const ProjectCard: React.FC<Props> = ({ data, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine Grid Layout based on media count
  const renderMediaGrid = () => {
    // SPECIAL LAYOUT FOR PROFILE: Honors List Only (No Image)
    if (data.honors && data.honors.length > 0) {
        return (
            <div className="flex flex-col h-full border border-tech-dim bg-black/60 backdrop-blur-sm relative overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                {/* Header */}
                <div className="p-4 border-b border-tech-dim bg-tech-surface/80 flex justify-between items-center relative z-10">
                    <h4 className="font-display text-white text-lg flex items-center gap-2 tracking-wide">
                        <Award size={18} className="text-tech-cyan" /> 
                        CREDENTIALS_LOG
                    </h4>
                    <div className="flex gap-1.5">
                         <ShieldCheck size={14} className="text-tech-accent" />
                         <span className="text-[9px] font-mono text-stone-400">VERIFIED</span>
                    </div>
                </div>

                {/* Decorative Scan Line */}
                <div className="absolute top-12 left-0 w-full h-[1px] bg-tech-cyan/20"></div>
                
                {/* List - Scrollable */}
                <div className="flex-1 p-5 space-y-4 overflow-y-auto custom-scrollbar relative z-10">
                    {data.honors.map((honor, idx) => (
                        <div key={idx} className="relative group p-4 border border-white/5 bg-white/5 hover:bg-tech-cyan/5 hover:border-tech-cyan/30 transition-all duration-300">
                            {/* Decorative Corners */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-tech-cyan transition-colors"></div>
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-tech-cyan transition-colors"></div>
                            
                            <div className="flex flex-col gap-1">
                                <span className="font-mono text-tech-cyan/60 text-[10px] uppercase tracking-wider">Achievement 0{idx + 1}</span>
                                <span className="text-sm font-sans text-stone-200 group-hover:text-white transition-colors leading-snug">
                                    {honor}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Tech Visual to fill space */}
                <div className="p-3 border-t border-tech-dim bg-tech-surface/50 relative z-10">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] font-mono text-stone-500">TOTAL_AWARDS: {data.honors.length}</span>
                        <Cpu size={12} className="text-tech-dim" />
                    </div>
                    {/* Animated Noise Bar */}
                    <div className="h-6 w-full bg-black border border-white/5 relative overflow-hidden rounded-sm">
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#00f3ff_2px,#00f3ff_4px)] opacity-10"></div>
                        <div className="absolute inset-0 bg-tech-cyan/5 w-1/2 animate-[scan_2s_linear_infinite]"></div>
                    </div>
                </div>
            </div>
        );
    }

    const mediaItems = [...data.images];
    let showVideo = false;
    let videoUrl = "";

    if (data.video) {
        showVideo = true;
        videoUrl = `https://www.youtube.com/embed/${data.video}?controls=0&modestbranding=1&rel=0`;
    }
    
    const totalSlots = mediaItems.length + (showVideo ? 1 : 0);
    const isThree = totalSlots === 3;
    const isFourWithoutVideo = totalSlots === 4 && !showVideo;

    const gridLayoutClass = isFourWithoutVideo
        ? 'grid-cols-2'
        : 'grid-cols-2 grid-rows-2';
    
    const heightClass = isFourWithoutVideo ? '' : 'h-full';

    return (
        <div className={`grid gap-2 w-full ${heightClass} ${gridLayoutClass}`}>
            {showVideo && (
                 <div className="relative border border-tech-dim bg-tech-surface overflow-hidden group/media w-full h-full min-h-[150px]">
                    <iframe 
                        width="100%" 
                        height="100%" 
                        src={videoUrl} 
                        title="Video"
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="opacity-80 group-hover/media:opacity-100 transition-opacity pointer-events-auto"
                    ></iframe>
                     <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 text-[8px] text-tech-cyan border border-tech-cyan/50 z-10">VIDEO_FEED</div>
                 </div>
            )}
            
            {mediaItems.map((img, idx) => {
                let spanClass = "";
                if (isThree && !showVideo && idx === 0) spanClass = "col-span-2 row-span-1"; 
                
                return (
                    <div key={idx} className={`relative border border-tech-dim bg-tech-surface overflow-hidden group/media ${spanClass} min-h-[150px]`}>
                         <img 
                            src={img} 
                            alt={`Detail ${idx}`}
                            className="w-full h-full object-cover opacity-60 grayscale contrast-125 group-hover/media:opacity-100 group-hover/media:grayscale-0 transition-all duration-500"
                        />
                         <div className="absolute inset-0 bg-tech-cyan/10 mix-blend-overlay group-hover/media:bg-transparent transition-all"></div>
                         <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 text-[8px] text-tech-cyan border border-tech-cyan/50 opacity-0 group-hover/media:opacity-100 transition-opacity">CAM_0{idx+1}</div>
                    </div>
                )
            })}
        </div>
    )
  };

  return (
    <section 
        id={data.id} 
        className="min-h-screen flex items-center justify-center py-24 relative overflow-hidden project-section"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Background Grid for Section - Reduced opacity to let particles shine */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
        
        {/* LEFT: Media Grid (Or Honors) */}
        <motion.div 
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
           className="relative group lg:order-1 order-2 h-[500px] lg:h-auto"
        >
             {/* Tech Frame */}
             <div className="h-full relative backdrop-blur-sm bg-black/20">
                {/* Corner Markers */}
                <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-tech-cyan z-20"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 border-t border-r border-tech-cyan z-20"></div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b border-l border-tech-cyan z-20"></div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-tech-cyan z-20"></div>

                {renderMediaGrid()}

                <div className="hidden lg:block absolute bottom-[-20px] left-0 font-mono text-[9px] text-stone-500">
                    DATA_SEQ_ID: {data.id.toUpperCase()}<br/>
                </div>
            </div>
        </motion.div>

        {/* RIGHT: Info Panel */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center lg:order-2 order-1"
        >
          {/* Header Data */}
          <div className="flex items-center gap-3 mb-2 font-mono text-xs text-tech-dim">
             <span className="text-tech-cyan">FILE_0{index + 1}</span>
             <span className="w-8 h-[1px] bg-tech-dim"></span>
             <span className="uppercase">{data.tags[0]}</span>
          </div>
          
          {/* Particle Title instead of plain Text */}
          <div className="w-full mb-4">
            <ParticleTitle text={data.title} small={true} />
          </div>
          
          <h3 className="font-serif text-stone-400 text-lg italic mb-8 border-l-2 border-tech-cyan pl-4">
            {data.subtitle}
          </h3>

          <div className="text-stone-300 font-mono text-sm leading-relaxed mb-8 text-justify bg-black/50 p-6 border border-white/5 whitespace-pre-line relative overflow-hidden">
             {/* Subtle background tech line */}
             <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-white/10 rounded-tr-3xl"></div>
            {data.description}
          </div>

          {/* Details Grid - Tech Style */}
          <div className="grid grid-cols-1 gap-0 border border-white/10 mb-8 bg-black/40 backdrop-blur-md">
            {data.details.map((detail, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-b border-white/10 hover:bg-white/5 transition-colors group/item interactive relative overflow-hidden">
                
                <div className="flex items-start gap-3 relative z-10 flex-1">
                    <Activity size={14} className="text-tech-cyan opacity-50 group-hover/item:opacity-100 flex-shrink-0 mt-1" />
                    <p className="text-stone-300 text-xs font-mono leading-relaxed group-hover/item:text-white">
                      {detail.text}
                    </p>
                </div>

                {/* Action Button - Prominent Style */}
                {detail.link && (
                    <a 
                        href={detail.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex-shrink-0 relative z-20 flex items-center gap-2 px-4 py-2 bg-tech-cyan text-black text-[10px] font-bold font-mono uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_15px_rgba(0,243,255,0.4)]"
                    >
                        {data.honors ? "READ PAPER" : "ACCESS DATA"} <ExternalLink size={12} />
                    </a>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {data.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-tech-cyan/5 border border-tech-cyan/20 text-[10px] font-mono text-tech-cyan uppercase tracking-wider hover:bg-tech-cyan hover:text-black transition-colors cursor-default backdrop-blur-sm">
                {tag}
              </span>
            ))}
            
            {/* Main Link for Data Section - Prominent Button */}
            {data.mainLink && (
                <a 
                    href={data.mainLink}
                    target="_blank"
                    rel="noreferrer" 
                    className="ml-auto flex items-center gap-2 px-6 py-2 bg-transparent border border-tech-cyan text-tech-cyan font-bold font-mono text-xs uppercase hover:bg-tech-cyan hover:text-black transition-all interactive shadow-[0_0_10px_rgba(0,243,255,0.1)]"
                >
                    <ExternalLink size={14} /> View Details
                </a>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ProjectCard;
