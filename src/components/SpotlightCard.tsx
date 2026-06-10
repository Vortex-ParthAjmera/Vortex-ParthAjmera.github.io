import React, { useState, useRef } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  id?: string;
  key?: React.Key;
  as?: React.ElementType;
  // Support safe standard anchor attributes just in case
  href?: string;
  target?: string;
  rel?: string;
}

export default function SpotlightCard({
  children,
  className = '',
  id,
  as: Component = 'div',
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Component
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`glass-box relative overflow-hidden group ${className}`}
      id={id}
      {...props}
    >
      {/* Interactive Aurora Spotlight Backer */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500 ease-out z-0 opacity-0 group-hover:opacity-100"
        style={{
          background: `
            radial-gradient(
              325px circle at ${coords.x}px ${coords.y}px,
              rgba(16, 185, 129, 0.12) 0%,
              rgba(6, 182, 212, 0.15) 35%,
              rgba(99, 102, 241, 0.08) 70%,
              transparent 100%
            )
          `,
        }}
      />

      {/* Subtle Aurora accent border highlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] border border-emerald-500/5 group-hover:border-emerald-400/20 transition-colors duration-500 z-0"
      />

      {/* Actual content overlay */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </Component>
  );
}
