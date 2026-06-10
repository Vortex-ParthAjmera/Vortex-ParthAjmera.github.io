import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { Compass, Sparkles, User, Info } from 'lucide-react';

export default function FaceReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showHelper, setShowHelper] = useState(true);

  // Motion values for cursor position inside image
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for smooth tracking
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  // 3D Tilt rotation spring values
  const rotateX = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });

  // Percentage values for spotlight clipPath
  const [clipPercentX, setClipPercentX] = useState(50);
  const [clipPercentY, setClipPercentY] = useState(50);

  // Track cursor spotlight clip-path coordinates
  useEffect(() => {
    const unsubscribeX = springX.on('change', (val) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const percent = ((val - rect.left) / rect.width) * 100;
        setClipPercentX(Math.max(0, Math.min(100, percent)));
      }
    });

    const unsubscribeY = springY.on('change', (val) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const percent = ((val - rect.top) / rect.height) * 100;
        setClipPercentY(Math.max(0, Math.min(100, percent)));
      }
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [springX, springY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Position of cursor relative to client viewport
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);

    // Calculate rotation for 3D card tilt
    const halfWidth = rect.width / 2;
    const halfHeight = rect.height / 2;
    const normX = (e.clientX - rect.left - halfWidth) / halfWidth; // -1 to 1
    const normY = (e.clientY - rect.top - halfHeight) / halfHeight; // -1 to 1

    rotateX.set(-normY * 12); // tilt up/down (inverted)
    rotateY.set(normX * 12);  // tilt left/right
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setShowHelper(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full" id="face-reveal-wrapper">
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-[340px] aspect-[4/6] rounded-xl overflow-hidden border border-custom cursor-crosshair group shadow-2xl bg-black"
        style={{
          perspective: 1000,
          transformStyle: "preserve-3d",
        }}
        id="avatar-3d-tilt-frame"
      >
        <motion.div
          className="w-full h-full relative"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          id="avatar-tilt-gantry"
        >
          {/* BOTTOM LAYER: Cyberpunk Mask image (default visible background) */}
          <img 
            src="/profile-mask.png"
            alt="Cyberpunk Mask"
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            id="avatar-masked-base-image"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Fallback to a styled dark placeholder or default cyberpunk styling if profile-mask.png is missing
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600";
            }}
          />

          {/* TOP LAYER: Real Face image, clipped on hover (lens spotlight) */}
          <motion.div 
            className="absolute inset-0 w-full h-full"
            style={{
              clipPath: isHovered 
                ? `circle(80px at ${clipPercentX}% ${clipPercentY}%)` 
                : 'circle(0% at 50% 50%)',
            }}
            id="avatar-real-clipper"
          >
            <img 
              src="/profile-real.png"
              alt="Parth Ajmera Real Face"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              id="avatar-real-image"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback to high-contrast Unsplash image if profile-real.png is missing
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600";
              }}
            />
          </motion.div>

          {/* Interactive HUD Sight Overlay inside 3D Perspective */}
          {isHovered && (
            <div 
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                transform: "translateZ(30px)",
              }}
              id="avatar-hud-plane"
            >
              {/* Target Aiming HUD Ring */}
              <motion.div
                className="absolute w-40 h-40 border-2 border-dashed border-white/45 rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${clipPercentX}%`,
                  top: `${clipPercentY}%`,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                id="hud-outer-ring"
              >
                <div className="w-4 h-4 border border-white/60 rounded-full" />
                {/* Horizontal & Vertical Crosshairs */}
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/20 -translate-y-1/2" />
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/20 -translate-x-1/2" />
              </motion.div>

              {/* Laser Pointer HUD dot */}
              <div 
                className="absolute w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]"
                style={{
                  left: `${clipPercentX}%`,
                  top: `${clipPercentY}%`,
                }}
              />

              {/* Cyber Coordinates HUD Label */}
              <div 
                className="absolute bg-black/80 px-2 py-0.5 border border-white/30 text-[8px] font-mono text-white select-none rounded -translate-x-1/2 mt-24"
                style={{
                  left: `${clipPercentX}%`,
                  top: `${clipPercentY}%`,
                }}
                id="hud-coordinates-tag"
              >
                REVEAL: X:{Math.round(clipPercentX)}% Y:{Math.round(clipPercentY)}%
              </div>
            </div>
          )}

          {/* Glitch Tech Corner Brackets */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-white pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-white pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-white pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-white pointer-events-none" />

          {/* Static Metadata tag inside Card */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-black/60 border border-white/10 rounded font-mono text-[9px] text-gray-400 tracking-widest uppercase pointer-events-none select-none">
            STRATOS CORE // REVEALER
          </div>
        </motion.div>

        {/* Hover activation instructions helper */}
        <AnimatePresence>
          {showHelper && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute inset-x-4 bottom-4 p-3 bg-black/90 border border-white/20 rounded-lg text-center backdrop-blur-md pointer-events-none z-30 flex items-center justify-center gap-2"
              id="reveal-helper-pane"
            >
              <Compass className="w-4 h-4 text-white animate-spin" />
              <span className="font-mono text-[9px] text-white uppercase tracking-widest">
                Hover to Scan Real Face
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-center space-y-1 select-none" id="avatar-label-deck">
        <h4 className="font-sans text-xs underline font-black text-white uppercase tracking-wider flex items-center justify-center gap-1">
          <User className="w-3.5 h-3.5" />
          <span>PARTH AJMERA SYSTEMS BIOMETRICS</span>
        </h4>
        <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
          COGNITIVE RECONSTRUCT INTERACTIVE LENS
        </p>
      </div>
    </div>
  );
}
