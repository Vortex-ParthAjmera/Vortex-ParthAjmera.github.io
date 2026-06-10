import React, { useEffect, useRef } from 'react';

export default function HeroParticles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Interactive mouse state
    const mouse = { 
      x: -9999, 
      y: -9999, 
      active: false,
      overCard: false,
      interactionType: 'default' as 'repel' | 'attract' | 'default'
    };

    // Eased group coordinates to create cohesive flowing swarm movement
    const groupNode = {
      x: -9999,
      y: -9999
    };

    // Particle class definition
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      decay: number;
      isMouseTrail: boolean;
      angle: number;
      spinSpeed: number;
      pulseRate: number;
      pulsePhase: number;

      constructor(x: number, y: number, isMouseTrail = false) {
        this.x = x;
        this.y = y;
        this.isMouseTrail = isMouseTrail;
        this.angle = Math.random() * Math.PI * 2;
        this.spinSpeed = (Math.random() - 0.5) * 0.05;
        this.pulseRate = Math.random() * 0.02 + 0.01;
        this.pulsePhase = Math.random() * Math.PI;

        if (isMouseTrail) {
          // Nano trail particles scatter with elastic structure coordinates
          this.vx = (Math.random() - 0.5) * 1.8;
          this.vy = (Math.random() - 0.5) * 1.8;
          this.size = Math.random() * 2 + 1.2;
          this.decay = Math.random() * 0.012 + 0.008;
          this.alpha = 1.0;
        } else {
          // Ambient nano nodes drift calmly in deep lattice space
          this.vx = (Math.random() - 0.5) * 0.28;
          this.vy = (Math.random() - 0.5) * 0.28;
          this.size = Math.random() * 1.8 + 0.6;
          this.decay = 0;
          this.alpha = Math.random() * 0.45 + 0.2;
        }

        // Color palettes fitting the premium space-tech theme (green, cyan, indigo)
        const rand = Math.random();
        if (rand < 0.45) {
          this.color = '16, 185, 129'; // Emerald Green (Agentic Core)
        } else if (rand < 0.8) {
          this.color = '0, 212, 255';  // Cyber Cyan (Vortex)
        } else {
          this.color = '99, 102, 241'; // Space Indigo (Stratos)
        }
      }

      update(mouseX: number, mouseY: number, groupX: number, groupY: number, mode: 'repel' | 'attract' | 'default') {
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.spinSpeed;
        this.pulsePhase += this.pulseRate;

        if (this.isMouseTrail) {
          this.alpha -= this.decay;
        } else {
          // Handle screen boundary wrap for ambient molecular nodes
          if (this.x < 0) {
            this.x = 0;
            this.vx = Math.abs(this.vx);
          } else if (this.x > width) {
            this.x = width;
            this.vx = -Math.abs(this.vx);
          }
          if (this.y < 0) {
            this.y = 0;
            this.vy = Math.abs(this.vy);
          } else if (this.y > height) {
            this.y = height;
            this.vy = -Math.abs(this.vy);
          }

          if (mouseX !== -9999) {
            const dx = this.x - mouseX;
            const dy = this.y - mouseY;
            const dist = Math.hypot(dx, dy);

            if (mode === 'repel') {
              // High response repulsion when hovering over tactical cards/badges
              const repelRadius = 160;
              if (dist < repelRadius) {
                const force = (repelRadius - dist) / repelRadius;
                const pushX = (dx / (dist || 1)) * force * 3.5;
                const pushY = (dy / (dist || 1)) * force * 3.5;
                
                this.x += pushX;
                this.y += pushY;
                this.vx += (dx / (dist || 1)) * force * 0.12;
                this.vy += (dy / (dist || 1)) * force * 0.12;
              }
            } else if (mode === 'attract') {
              // High sensitivity orbiting group attraction when over cards
              const attractRadius = 260;
              if (dist < attractRadius) {
                const force = (attractRadius - dist) / attractRadius;
                const pullX = groupX - this.x;
                const pullY = groupY - this.y;
                const pullDist = Math.hypot(pullX, pullY) || 1;

                this.vx += (pullX / pullDist) * force * 0.38;
                this.vy += (pullY / pullDist) * force * 0.38;

                // Circular vortex rotational swirl force
                const orbitX = -pullY / pullDist;
                const orbitY = pullX / pullDist;
                this.vx += orbitX * force * 0.45;
                this.vy += orbitY * force * 0.45;

                // Easing frictional dampener
                this.vx *= 0.94;
                this.vy *= 0.94;
              }
            } else {
              // Default peaceful tracking towards cohesive center
              const trackRadius = 150;
              if (dist < trackRadius) {
                const force = (trackRadius - dist) / trackRadius;
                const pullX = groupX - this.x;
                const pullY = groupY - this.y;
                const pullDist = Math.hypot(pullX, pullY) || 1;

                this.vx += (pullX / pullDist) * force * 0.09;
                this.vy += (pullY / pullDist) * force * 0.09;

                this.vx *= 0.98;
                this.vy *= 0.98;
              }
            }
          }

          // Strict speed ceiling to maintain sleek movement rhythm without turbulence
          const speed = Math.hypot(this.vx, this.vy);
          const maxSpeed = mode === 'attract' ? 4.2 : 1.8;
          if (speed > maxSpeed) {
            this.vx = (this.vx / speed) * maxSpeed;
            this.vy = (this.vy / speed) * maxSpeed;
          }
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        const animatedAlpha = this.isMouseTrail ? this.alpha : this.alpha * (0.85 + Math.sin(this.pulsePhase) * 0.15);
        c.globalAlpha = Math.max(0, animatedAlpha);
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fillStyle = `rgb(${this.color})`;
        
        if (this.isMouseTrail) {
          c.shadowBlur = 8;
          c.shadowColor = `rgb(${this.color})`;
        }
        c.fill();

        // Draw intricate micro nano-structures (tiny hexagon / orbital indicators) on occasional nodes
        if (!this.isMouseTrail && this.size > 1.8) {
          c.strokeStyle = `rgba(${this.color}, 0.25)`;
          c.lineWidth = 0.5;
          c.beginPath();
          // Draw tiny orbiting ring to signify sub-atomic structural telemetry
          c.arc(this.x, this.y, this.size * 3.5, 0, Math.PI * 2);
          c.stroke();

          // Delicate tick marks on the nodes
          c.beginPath();
          c.moveTo(this.x - this.size * 4.5, this.y);
          c.lineTo(this.x - this.size * 2.5, this.y);
          c.moveTo(this.x + this.size * 2.5, this.y);
          c.lineTo(this.x + this.size * 4.5, this.y);
          c.stroke();
        }

        c.restore();
      }
    }

    const particles: Particle[] = [];
    const MAX_AMBIENT = 100; // Increased to cover global viewport comfortably

    // Handle high DPI retina screen resolution mapping
    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Re-fill ambient nodes density according to viewport size
      particles.length = 0;
      const densityCount = Math.floor((width * height) / 14000);
      const limitParticles = Math.max(40, Math.min(MAX_AMBIENT, densityCount));
      for (let i = 0; i < limitParticles; i++) {
        particles.push(new Particle(Math.random() * width, Math.random() * height, false));
      }
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    handleResize();

    // Spawn trail particles on mouse move over the entire screen
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;

      // Smart targeting of interactive components in parent DOM
      const target = e.target as HTMLElement | null;
      const card = target ? target.closest?.('.spotlight-card, #cyber-terminal-card, [id^="card-"], [id^="badge-"], [id^="hero-divider-ribbon-"], button, a, tr') : null;

      if (card) {
        mouse.overCard = true;
        const idStr = (card.id || '').toLowerCase();
        const classStr = (card.className || '').toLowerCase();
        
        // Define clean repulsion / attraction mappings
        if (
          idStr.includes('terminal') || 
          idStr.includes('badge') ||
          idStr.includes('ribbon') ||
          classStr.includes('tech-marquee') ||
          classStr.includes('glow-accent')
        ) {
          mouse.interactionType = 'repel';
        } else {
          mouse.interactionType = 'attract';
        }
      } else {
        mouse.overCard = false;
        mouse.interactionType = 'default';
      }

      // Constrained organic trail spawning in group stream
      if (Math.random() < 0.4) {
        particles.push(new Particle(mouse.x + (Math.random() - 0.5) * 6, mouse.y + (Math.random() - 0.5) * 6, true));
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.active = false;
      mouse.overCard = false;
      mouse.interactionType = 'default';
    };

    // Listen globally on window to capture gestures moving across cards seamlessly
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Connect particles near each other to create space-tech constellation web
    const drawConstellations = (c: CanvasRenderingContext2D) => {
      const count = particles.length;
      for (let i = 0; i < count; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < count; j++) {
          const p2 = particles[j];

          // Mouse trail nodes connect to each other to form a highly visible organic "nano filament structure"
          if (p1.isMouseTrail && p2.isMouseTrail) {
            const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
            if (dist < 65) {
              const alpha = (1 - dist / 65) * 0.42 * Math.min(p1.alpha, p2.alpha);
              c.strokeStyle = `rgba(16, 185, 129, ${alpha})`; // Emerald polymer lines
              c.lineWidth = 0.72;
              c.beginPath();
              c.moveTo(p1.x, p1.y);
              c.lineTo(p2.x, p2.y);
              c.stroke();
            }
            continue;
          }

          // Ambient nodes and trail-to-ambient molecular bounds
          const limitDist = 85;
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < limitDist) {
            const alpha = (1 - dist / limitDist) * 0.16 * Math.min(p1.alpha, p2.alpha);
            // Draw gradient-like structure bridges
            c.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
            c.lineWidth = 0.45;
            c.beginPath();
            c.moveTo(p1.x, p1.y);
            c.lineTo(p2.x, p2.y);
            c.stroke();
          }
        }
      }
    };

    // Keep state machine ticking at fluid rendering intervals
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate the swarming group center towards mouse coordinates for inertia movement
      if (mouse.active && mouse.x !== -9999) {
        if (groupNode.x === -9999) {
          groupNode.x = mouse.x;
          groupNode.y = mouse.y;
        } else {
          // Flow drag coefficient mapping (higher is faster, lower creates gorgeous group sweep trails)
          groupNode.x += (mouse.x - groupNode.x) * 0.075;
          groupNode.y += (mouse.y - groupNode.y) * 0.075;
        }
      } else {
        groupNode.x = -9999;
        groupNode.y = -9999;
      }

      // Mutate and draw each particle
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update(mouse.x, mouse.y, groupNode.x, groupNode.y, mouse.interactionType);

        if (p.isMouseTrail && p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          p.draw(ctx);
        }
      }

      // Draw custom interactive webs
      drawConstellations(ctx);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      id="hero-particles-sandbox"
    >
      <canvas
        ref={canvasRef}
        className="block bg-transparent"
      />
    </div>
  );
}
