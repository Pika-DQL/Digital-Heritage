
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  z: number; // Simulated depth for fly-in
  vx: number;
  vy: number;
  size: number;
  color: string;
}

interface Props {
    text?: string;
    small?: boolean;
}

const ParticleTitle: React.FC<Props> = ({ text = "CRAFTING HERITAGE", small = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const initParticles = () => {
      particlesRef.current = [];
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;

      // 1. Draw Text to offscreen buffer
      ctx.fillStyle = '#ffffff';
      
      // Dynamic font size calculation
      // INCREASED SIZES for better readability
      const baseSize = small ? 80 : 130; 
      const charLimit = small ? 25 : 12;
      const scaleFactor = Math.min(1, charLimit / text.length);
      const fontSize = Math.min(width / (text.length * 0.5), baseSize * scaleFactor);
      
      // Use "Rajdhani" with max weight for thick strokes
      ctx.font = `900 ${fontSize}px "Rajdhani"`; 
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      ctx.fillText(text, width / 2, height / 2);

      // 2. Scan pixel data
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      // DENSITY ADJUSTMENT
      // Step 2 for small titles = High Density (Solid look)
      // Step 4 for hero = Medium Density (Particle cloud look)
      const step = small ? 2 : 4; 

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 128) {
            // Found a pixel of text
            particlesRef.current.push({
              x: Math.random() * width, 
              y: Math.random() * height,
              targetX: x,
              targetY: y,
              z: Math.random() * 1000, 
              vx: 0,
              vy: 0,
              // Larger particles for readability
              size: Math.random() * (small ? 1.8 : 2.0) + (small ? 1.0 : 0.5),
              // Brighter colors: mostly white with some cyan
              color: Math.random() > 0.7 ? '#00f3ff' : '#ffffff' 
            });
          }
        }
      }
      // Clear initial draw
      ctx.clearRect(0, 0, width, height);
    };

    initParticles();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const particles = particlesRef.current;
      
      // Physics Constants
      const ease = 0.08; // Snappier return
      const friction = 0.90;
      const mouseRadius = small ? 40 : 80;
      const scrambleForce = 20;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Move towards target (Homing)
        if (p.z > 0.1) {
            p.z *= 0.95;
        } else {
            p.z = 0;
        }

        const targetX = p.targetX;
        const targetY = p.targetY;

        // 2. Mouse Interaction
        let forceX = 0;
        let forceY = 0;

        if (mouse.active) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouseRadius) {
                const angle = Math.atan2(dy, dx);
                const force = (mouseRadius - distance) / mouseRadius;
                forceX = -Math.cos(angle) * force * scrambleForce;
                forceY = -Math.sin(angle) * force * scrambleForce;
            }
        }

        p.vx += forceX;
        p.vy += forceY;

        // Homing
        p.vx += (targetX - p.x) * ease;
        p.vy += (targetY - p.y) * ease;

        // Friction
        p.vx *= friction;
        p.vy *= friction;

        // Update
        p.x += p.vx;
        p.y += p.vy;

        // 3. Draw
        const scale = 1 / (1 + p.z / 200);
        
        ctx.fillStyle = p.color;
        // Don't fade out small titles too much, keep them bright
        if (scale < 1) ctx.globalAlpha = small ? Math.max(0.8, scale) : scale;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => initParticles();
    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current.x = e.clientX - rect.left;
        mouseRef.current.y = e.clientY - rect.top;
        mouseRef.current.active = true;
    };
    const handleMouseLeave = () => {
        mouseRef.current.active = false;
    }

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [text, small]);

  return (
    <div className={`w-full ${small ? 'h-[100px]' : 'h-[150px] md:h-[250px]'} relative flex items-center justify-center overflow-hidden interactive`}>
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
    </div>
  );
};

export default ParticleTitle;
