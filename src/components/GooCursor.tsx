import React, { useEffect, useRef } from 'react';
import { useMotionValue, useSpring } from 'motion/react';

export default function GooCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const numBlobs = 8;
  const blobRefs = useRef<HTMLDivElement[]>([]);

  // Array to hold historical pointer positions
  const coords = useRef({ x: 0, y: 0 });
  const points = useRef<{ x: number; y: number }[]>(
    Array.from({ length: numBlobs }).map(() => ({ x: 0, y: 0 }))
  );

  useEffect(() => {
    // Hide native cursor for authentic futuristic feel, but only if device supports cursor/mouse
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) {
      document.body.style.cursor = 'none';
      // Make links of any interactive hover element change cursor pointer style customizer
      const styleNode = document.createElement('style');
      styleNode.innerHTML = `
        a, button, select, input, textarea, [role="button"], .cursor-crosshair, .cursor-pointer {
          cursor: none !important;
        }
      `;
      document.head.appendChild(styleNode);
    }

    const handleMouseMove = (e: MouseEvent) => {
      coords.current.x = e.clientX;
      coords.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;

    const updatePosition = () => {
      let { x, y } = coords.current;

      points.current.forEach((point, index) => {
        // Stagger/delay circles behind each other
        const nextPoint = points.current[index + 1] || points.current[0];
        
        point.x = x;
        point.y = y;

        const domNode = blobRefs.current[index];
        if (domNode) {
          // Centered position
          const size = 32 - index * 1.8; // Decreasing size
          domNode.style.width = `${size}px`;
          domNode.style.height = `${size}px`;
          domNode.style.left = `${point.x - size / 2}px`;
          domNode.style.top = `${point.y - size / 2}px`;
        }

        // The next circle gets interpolated towards the current one
        x += (nextPoint.x - x) * 0.35;
        y += (nextPoint.y - y) * 0.35;
      });

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* Absolute master SVG Goo filter to merge the trail divs */}
      <svg xmlns="http://www.w3.org/2000/svg" className="absolute w-0 h-0 pointer-events-none" version="1.1" id="svg-goo-filter">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
          </filter>
        </defs>
      </svg>

      {/* Goo-filtered cursor container */}
      <div 
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden"
        style={{ filter: 'url(#goo)' }}
        id="cyber-goo-container"
      >
        {Array.from({ length: numBlobs }).map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) blobRefs.current[index] = el;
            }}
            className="absolute bg-white rounded-full transition-shadow duration-[0.1s] ease-out pointer-events-none shadow-[0_0_12px_2px_rgba(255,255,255,0.4)]"
            style={{
              opacity: 1 - index * 0.08,
            }}
          />
        ))}
      </div>
    </>
  );
}
