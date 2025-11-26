
import React, { useEffect, useRef } from 'react';

interface Props {
  activeSection: number;
}

// --- Math Generators (Keep Existing) ---
const getArchimedean = (i: number, total: number) => {
  const t = (i / total) * 100;
  const r = t * 15;
  const theta = t * 0.5;
  const spread = (Math.random() - 0.5) * 50;
  const x = (r + spread) * Math.cos(theta);
  const z = (r + spread) * Math.sin(theta);
  const y = (Math.random() - 0.5) * 800 - 200;
  return { x, y, z };
};

const getRose = (i: number, total: number) => {
  const theta = (i / total) * Math.PI * 100;
  const k = 4; 
  const rBase = 800 * Math.cos(k * theta);
  const spread = (Math.random() - 0.5) * 100;
  const r = rBase + spread;
  const x = r * Math.cos(theta);
  const y = r * Math.sin(theta);
  const z = (Math.random() - 0.5) * 600;
  return { x, y, z };
};

const getHeart = (i: number, total: number) => {
  const t = (i / total) * Math.PI * 200;
  const scale = 35;
  const x = scale * 16 * Math.pow(Math.sin(t), 3);
  const y = -scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
  const z = (Math.random() - 0.5) * 400 * (1 - Math.abs(y)/600); 
  return { x, y: y + 200, z };
};

const getButterfly = (i: number, total: number) => {
  const t = (i / total) * 24 * Math.PI;
  const e = 2.71828;
  const term1 = Math.pow(e, Math.cos(t));
  const term2 = 2 * Math.cos(4 * t);
  const term3 = Math.pow(Math.sin(t / 12), 5);
  const r = 250 * (term1 - term2 + term3);
  const x = r * Math.sin(t);
  const y = -r * Math.cos(t);
  const z = r * Math.sin(t * 2);
  return { x: x * 1.5, y: y * 1.5, z };
};

const getKoch = (i: number, total: number) => {
    const layer = Math.floor(i / (total / 5));
    const segment = i % (total / 5);
    const radius = 600 - layer * 100;
    const theta = (segment / (total/5)) * Math.PI * 2;
    const noise = Math.sin(segment * 0.1) * 50;
    let r = radius + (Math.cos(theta * 3) * 200);
    if (layer % 2 === 0) r = radius + (Math.cos(theta * 3 + Math.PI) * 200);
    r += Math.cos(theta * 12) * 40; 
    const x = r * Math.cos(theta);
    const z = r * Math.sin(theta);
    const y = (layer - 2.5) * 150 + noise;
    return { x, y, z };
};

const getDNA = (i: number, total: number) => {
    const strand = i % 2 === 0 ? 1 : -1; 
    const t = (i / total) * Math.PI * 20; 
    const radius = 250;
    const x = radius * Math.cos(t + (strand * Math.PI)); 
    const y = (i / total) * 1200 - 600; 
    const z = radius * Math.sin(t + (strand * Math.PI));
    if (i % 10 === 0) {
        return { x: x * Math.random(), y: y, z: z * Math.random() };
    }
    return { x, y, z };
}

const AsciiLandscape: React.FC<Props> = ({ activeSection }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Float32Array | null>(null); 
  const starsRef = useRef<Float32Array | null>(null); 
  const nebulaRef = useRef<Float32Array | null>(null); // New: Milky Way Nebula
  
  const particleCount = 25000;
  const starCount = 4000; 
  const nebulaCount = 400; // Cloud particles

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // --- 1. Main Interaction Particles ---
    if (!particlesRef.current) {
      particlesRef.current = new Float32Array(particleCount * 7);
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 7;
        const { x, y, z } = getArchimedean(i, particleCount);
        particlesRef.current[idx] = x;
        particlesRef.current[idx + 1] = y;
        particlesRef.current[idx + 2] = z;
        particlesRef.current[idx + 3] = x;
        particlesRef.current[idx + 4] = y;
        particlesRef.current[idx + 5] = z;
        particlesRef.current[idx + 6] = Math.random(); 
      }
    }

    // --- 2. Stars (Background) ---
    if (!starsRef.current) {
        starsRef.current = new Float32Array(starCount * 4); 
        for (let i = 0; i < starCount; i++) {
            const idx = i * 4;
            // Spread stars widely in the background
            starsRef.current[idx] = (Math.random() - 0.5) * 6000; 
            starsRef.current[idx + 1] = (Math.random() - 0.5) * 4000; 
            starsRef.current[idx + 2] = (Math.random()) * 4000 + 500; 
            starsRef.current[idx + 3] = Math.random() * Math.PI * 2; 
        }
    }

    // --- 3. Milky Way Nebula (Clouds) ---
    if (!nebulaRef.current) {
        nebulaRef.current = new Float32Array(nebulaCount * 5); // x, y, z, size, colorType
        for (let i = 0; i < nebulaCount; i++) {
            const idx = i * 5;
            // Generate along a diagonal band
            const t = Math.random() * Math.PI * 2;
            const radius = Math.random() * 2000 + 500;
            const bandWidth = (Math.random() - 0.5) * 800;
            
            // Diagonal rotation for the galaxy band
            const xBase = Math.cos(t) * radius * 2; // Stretch X
            const yBase = Math.sin(t) * radius * 0.5; // Compress Y
            
            // Rotate the band 45 degrees
            const x = xBase * 0.7 - yBase * 0.7 + bandWidth;
            const y = xBase * 0.7 + yBase * 0.7 + bandWidth;
            
            nebulaRef.current[idx] = x;
            nebulaRef.current[idx + 1] = y;
            nebulaRef.current[idx + 2] = Math.random() * 3000 + 1000; // Deep background
            nebulaRef.current[idx + 3] = Math.random() * 300 + 100; // Huge particles
            nebulaRef.current[idx + 4] = Math.random(); // Color choice
        }
    }

    let animationFrameId: number;
    let rotationY = 0;
    let rotationX = 0;
    let time = 0;

    const render = () => {
      time += 0.005;
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // --- Deep Cosmic Background ---
      // Not just black, but a very deep gradient
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, canvas.width);
      gradient.addColorStop(0, '#050515');   // Center: Deep Blue
      gradient.addColorStop(0.5, '#02020a'); // Mid: Dark Void
      gradient.addColorStop(1, '#000000');   // Edge: Black
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.globalCompositeOperation = 'lighter';
      
      // Rotations
      rotationY += 0.001;
      rotationX = Math.sin(rotationY * 0.5) * 0.1; 
      
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);

      // --- LAYER 1: NEBULA CLOUDS (Furthest) ---
      const nebula = nebulaRef.current!;
      for(let i=0; i<nebulaCount; i++) {
          const idx = i*5;
          let x = nebula[idx];
          let y = nebula[idx+1];
          let z = nebula[idx+2];
          const size = nebula[idx+3];
          const type = nebula[idx+4];

          // Slow drift
          const rot = -rotationY * 0.2; // Move differently than foreground
          const sx = x * Math.cos(rot) - z * Math.sin(rot);
          const sz = z * Math.cos(rot) + x * Math.sin(rot);

          const fov = 1000;
          const scale = fov / (fov + sz);
          
          if (sz > 0) {
              const screenX = cx + sx * scale;
              const screenY = cy + y * scale;
              
              // Nebula Colors
              if (type > 0.6) ctx.fillStyle = `rgba(60, 20, 80, 0.03)`; // Deep Purple
              else if (type > 0.3) ctx.fillStyle = `rgba(20, 40, 90, 0.03)`; // Deep Blue
              else ctx.fillStyle = `rgba(0, 100, 100, 0.02)`; // Teal hint
              
              ctx.beginPath();
              ctx.arc(screenX, screenY, size * scale, 0, Math.PI * 2);
              ctx.fill();
          }
      }

      // --- LAYER 2: STARS ---
      const stars = starsRef.current!;
      for (let i = 0; i < starCount; i++) {
        const idx = i * 4;
        let x = stars[idx];
        let y = stars[idx + 1];
        let z = stars[idx + 2];
        const phase = stars[idx + 3];

        const starRotY = rotationY * 0.05;
        const sx = x * Math.cos(starRotY) - z * Math.sin(starRotY);
        const sz = z * Math.cos(starRotY) + x * Math.sin(starRotY);
        
        const fov = 800;
        const scale = fov / (fov + sz);
        const screenX = cx + sx * scale;
        const screenY = cy + y * scale;

        if (sz > 0 && screenX > 0 && screenX < canvas.width && screenY > 0 && screenY < canvas.height) {
            const brightness = (Math.sin(time * 2 + phase) + 1) / 2; 
            const alpha = Math.max(0.1, brightness * (1 - sz/5000)); 

            // Star Colors
            if (i % 15 === 0) ctx.fillStyle = `rgba(180, 200, 255, ${alpha})`; // Blue giant
            else if (i % 30 === 0) ctx.fillStyle = `rgba(255, 200, 180, ${alpha})`; // Red dwarf
            else ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;

            ctx.beginPath();
            ctx.rect(screenX, screenY, scale * 2, scale * 2);
            ctx.fill();
        }
      }

      // --- LAYER 3: MAIN PARTICLES (Foreground Shapes) ---
      const data = particlesRef.current!;
      const ease = 0.04;

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 7;
        
        data[idx] += (data[idx + 3] - data[idx]) * ease;
        data[idx + 1] += (data[idx + 4] - data[idx + 1]) * ease;
        data[idx + 2] += (data[idx + 5] - data[idx + 2]) * ease;

        let x = data[idx];
        let y = data[idx + 1];
        let z = data[idx + 2];

        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        const fov = 1000;
        const scale = fov / (fov + z2 + 1000); 
        
        const screenX = cx + x1 * scale;
        const screenY = cy + y2 * scale;

        if (z2 > -900) {
            const size = scale * 1.8;
            const alpha = Math.min(1, scale * scale * 0.9);
            const colorSeed = data[idx + 6];
            
            if (colorSeed > 0.95) {
                 ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            } else if (colorSeed > 0.6) {
                ctx.fillStyle = `rgba(0, 243, 255, ${alpha * 0.9})`;
            } else if (colorSeed > 0.3) {
                ctx.fillStyle = `rgba(80, 100, 255, ${alpha * 0.6})`;
            } else {
                ctx.fillStyle = `rgba(0, 243, 255, ${alpha * 0.3})`;
            }
            
            ctx.beginPath();
            ctx.fillRect(screenX, screenY, size, size);
        }
      }
      
      ctx.globalCompositeOperation = 'source-over'; 
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Update Morph Targets
  useEffect(() => {
    if (!particlesRef.current) return;
    const data = particlesRef.current;
    
    for (let i = 0; i < particleCount; i++) {
        const idx = i * 7;
        let target;
        
        switch (activeSection) {
            case 0: target = getArchimedean(i, particleCount); break; 
            case 1: target = getRose(i, particleCount); break; 
            case 2: target = getHeart(i, particleCount); break;
            case 3: target = getButterfly(i, particleCount); break;
            case 4: target = getKoch(i, particleCount); break;
            case 5: target = getDNA(i, particleCount); break;
            default: target = getArchimedean(i, particleCount);
        }

        data[idx + 3] = target.x;
        data[idx + 4] = target.y;
        data[idx + 5] = target.z;
    }
  }, [activeSection]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};

export default AsciiLandscape;
