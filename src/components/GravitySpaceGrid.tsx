import React, { useEffect, useRef } from "react";

interface GravitySpaceGridProps {
  themeColor: string;
}

const THEME_HEX_MAP: Record<string, string> = {
  violet: "#a78bfa", // violet-400
  blue: "#60a5fa",   // blue-400
  teal: "#2dd4bf",   // teal-400
  emerald: "#34d399",// emerald-400
  amber: "#fbbf24",  // amber-400
  rose: "#f43f5e"    // rose-400
};

export default function GravitySpaceGrid({ themeColor }: GravitySpaceGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Limit particles on small mobile screens to stay extremely performant
    const isMobile = width < 768;
    const particleCount = isMobile ? 35 : 85;
    const maxDistance = isMobile ? 85 : 130;

    interface Particle {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }

    const particles: Particle[] = [];

    // Initialize particles across the viewport grid
    for (let i = 0; i < particleCount; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      particles.push({
        x: rx,
        y: ry,
        originX: rx,
        originY: ry,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.3 + 0.15
      });
    }

    // Capture mouse coordinates safely
    const mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      // Capture relative position
      mouse.x = e.clientX + window.scrollX;
      mouse.y = e.clientY + window.scrollY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const activeColor = THEME_HEX_MAP[themeColor] || THEME_HEX_MAP.violet;

    // Helper helper to convert hex to rgba
    const hexToRgba = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    // Drawing loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render connection lines (Lattice lines)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Slowly drift particles
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce files off walls
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Gravity mesh physics (attraction towards mouse cursor)
        if (mouse.active) {
          const dx = mouse.x - p1.x;
          const dy = mouse.y - p1.y;
          const distSq = dx * dx + dy * dy;
          const maxInfluence = 260; // Influence circle

          if (distSq < maxInfluence * maxInfluence) {
            const dist = Math.sqrt(distSq);
            // Gravity force intensity decreases with distance
            const force = (maxInfluence - dist) / maxInfluence;
            const pull = 0.55;
            
            p1.x += (dx / dist) * force * pull;
            p1.y += (dy / dist) * force * pull;
          }
        }

        // Draw active point
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = hexToRgba(activeColor, p1.alpha);
        ctx.fill();

        // Check proximity connection to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistance * maxDistance) {
            const dist = Math.sqrt(distSq);
            // Alpha of line fades out as points move further apart
            const lineAlpha = (1 - dist / maxDistance) * 0.12;
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = hexToRgba(activeColor, lineAlpha);
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Connect particles closer to mouse as highlight strands
        if (mouse.active) {
          const dx = mouse.x - p1.x;
          const dy = mouse.y - p1.y;
          const distSq = dx * dx + dy * dy;
          const mouseConnection = 150;

          if (distSq < mouseConnection * mouseConnection) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / mouseConnection) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = hexToRgba(activeColor, lineAlpha);
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [themeColor]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none select-none z-0"
      style={{ mixBlendMode: "screen", opacity: 0.55 }}
    />
  );
}
