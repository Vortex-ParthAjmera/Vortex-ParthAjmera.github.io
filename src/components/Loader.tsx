import React, { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const titleLettersRef = useRef<HTMLDivElement>(null);
  const gridCellsRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  
  const [percent, setPercent] = useState(0);
  const [terminalMessage, setTerminalMessage] = useState('BOOTING_COGNITIVE_DECK...');

  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<any>(null);
  const onCompleteRef = useRef(onComplete);

  // Sync onComplete reference safely
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    startTimeRef.current = Date.now();

    // Elegant morphing zoom-in entry animation
    if (loaderRef.current) {
      animate(loaderRef.current, {
        scale: [0.92, 1],
        opacity: [0, 1],
        borderRadius: ['40px', '0px'],
        duration: 1200,
        easing: 'easeOutCubic'
      });
    }

    // Interactive circular pulsing scale for the microchip trace flow
    const circuitLoader = document.getElementById('circuit-microchip-loader');
    if (circuitLoader) {
      animate(circuitLoader, {
        scale: [0.96, 1.04, 0.96],
        duration: 2500,
        loop: true,
        easing: 'easeInOutSine'
      });
    }

    const triggerExitSequence = () => {
      if (loaderRef.current) {
        animate(loaderRef.current, {
          scale: [1, 1.12],
          borderRadius: ['0px', '120px'],
          opacity: [1, 0],
          duration: 600,
          easing: 'easeInOutQuint',
          complete: () => {
            onCompleteRef.current();
          }
        });
      } else {
        onCompleteRef.current();
      }
    };

    // 1. Progress count animation - set to take exactly 2400ms (part of the 3.0-second fixed block)
    const progressObj = { value: 0 };
    animate(progressObj, {
      value: 100,
      round: 1,
      duration: 2400,
      easing: 'easeInOutQuad',
      update: () => {
        setPercent(progressObj.value);
        if (progressObj.value < 20) {
          setTerminalMessage('INIT_STRATOS_SYS_CORE... [0x3B]');
        } else if (progressObj.value < 45) {
          setTerminalMessage('LOADING_ASTROPHYSICAL_COORDINATES... [OK]');
        } else if (progressObj.value < 75) {
          setTerminalMessage('RANKING_1500_GOOGLE_BIG_CODE_GRID_SYNC... [SUCCESS]');
        } else if (progressObj.value < 90) {
          setTerminalMessage('BUILDING_NEURAL_PORTFOLIO_ARRAYS... [OK]');
        } else {
          setTerminalMessage('ESTABLISHING_DECK_UPLINK... READY');
        }
      },
      complete: () => {
        const elapsed = Date.now() - startTimeRef.current;
        const remaining = Math.max(0, 3000 - elapsed);
        if (remaining > 0) {
          timerRef.current = setTimeout(triggerExitSequence, remaining);
        } else {
          triggerExitSequence();
        }
      }
    });

    // 2. Title letters staggered bounce
    if (titleLettersRef.current) {
      const letters = titleLettersRef.current.querySelectorAll('.char');
      animate(letters, {
        translateY: [-20, 0],
        opacity: [0, 1],
        delay: stagger(100),
        duration: 1000,
        easing: 'easeOutElastic(1, .6)'
      });
    }

    // 3. Background interactive particle/grid cells staggered fade
    if (gridCellsRef.current) {
      const cells = gridCellsRef.current.querySelectorAll('.grid-cell');
      animate(cells, {
        opacity: [0.03, 0.2, 0.03],
        delay: stagger(40, { grid: [8, 8], from: 'center' }),
        duration: 2000,
        loop: true,
        easing: 'easeInOutQuad'
      });
    }

    // 4. Progress line fill matching the 2400ms duration
    if (progressLineRef.current) {
      animate(progressLineRef.current, {
        width: ['0%', '100%'],
        duration: 2400,
        easing: 'easeInOutQuad'
      });
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={loaderRef}
      className="fixed inset-0 bg-[#070707] z-[9999] flex flex-col justify-center items-center overflow-hidden"
      id="custom-neuro-loader"
    >
      {/* 8x8 staggered grid cells animated with anime.js */}
      <div 
        ref={gridCellsRef}
        className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1 opacity-20 pointer-events-none"
        id="loader-matrix-backdrop"
      >
        {Array.from({ length: 64 }).map((_, i) => (
          <div 
            key={i} 
            className="grid-cell border border-white/5 bg-transparent w-full h-full"
          />
        ))}
      </div>

      {/* Dynamic Microchip Circuit Board Trace Loader markup */}
      <div className="w-full max-w-[420px] px-6 pointer-events-none mb-10 relative" id="circuit-microchip-loader">
        <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <defs>
            <linearGradient id="chipGradientReact" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2d2d2d" />
              <stop offset="100%" stopColor="#0f0f0f" />
            </linearGradient>

            <linearGradient id="textGradientReact" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#eeeeee" />
              <stop offset="100%" stopColor="#888888" />
            </linearGradient>

            <linearGradient id="pinGradientReact" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor="#bbbbbb" />
              <stop offset="50%" stopColor="#888888" />
              <stop offset="100%" stopColor="#555555" />
            </linearGradient>
          </defs>

          <g id="react-traces">
            <path d="M100 100 H200 V210 H326" className="trace-bg" />
            <path d="M100 100 H200 V210 H326" className="trace-flow purple" />

            <path d="M80 180 H180 V230 H326" className="trace-bg" />
            <path d="M80 180 H180 V230 H326" className="trace-flow blue" />

            <path d="M60 260 H150 V250 H326" className="trace-bg" />
            <path d="M60 260 H150 V250 H326" className="trace-flow yellow" />

            <path d="M100 350 H200 V270 H326" className="trace-bg" />
            <path d="M100 350 H200 V270 H326" className="trace-flow green" />

            <path d="M700 90 H560 V210 H474" className="trace-bg" />
            <path d="M700 90 H560 V210 H474" className="trace-flow blue" />

            <path d="M740 160 H580 V230 H474" className="trace-bg" />
            <path d="M740 160 H580 V230 H474" className="trace-flow green" />

            <path d="M720 250 H590 V250 H474" className="trace-bg" />
            <path d="M720 250 H590 V250 H474" className="trace-flow red" />

            <path d="M680 340 H570 V270 H474" className="trace-bg" />
            <path d="M680 340 H570 V270 H474" className="trace-flow yellow" />
          </g>

          <rect
            x="330"
            y="190"
            width="140"
            height="100"
            rx="20"
            ry="20"
            fill="url(#chipGradientReact)"
            stroke="#222"
            strokeWidth={3}
            filter="drop-shadow(0 0 6px rgba(0,0,0,0.8))"
            className="glow-chip"
          />

          <g>
            <rect x="322" y="205" width="8" height="10" fill="url(#pinGradientReact)" rx="2" />
            <rect x="322" y="225" width="8" height="10" fill="url(#pinGradientReact)" rx="2" />
            <rect x="322" y="245" width="8" height="10" fill="url(#pinGradientReact)" rx="2" />
            <rect x="322" y="265" width="8" height="10" fill="url(#pinGradientReact)" rx="2" />
          </g>

          <g>
            <rect x="470" y="205" width="8" height="10" fill="url(#pinGradientReact)" rx="2" />
            <rect x="470" y="225" width="8" height="10" fill="url(#pinGradientReact)" rx="2" />
            <rect x="470" y="245" width="8" height="10" fill="url(#pinGradientReact)" rx="2" />
            <rect x="470" y="265" width="8" height="10" fill="url(#pinGradientReact)" rx="2" />
          </g>

          {/* Integrated Loading Percentage Directly into Microchip Center */}
          <text
            x="400"
            y="245"
            fontFamily="monospace, Courier, sans-serif"
            fontSize="14"
            fontWeight="bold"
            fill="url(#textGradientReact)"
            textAnchor="middle"
            alignmentBaseline="middle"
            letterSpacing="1"
          >
            {percent === 100 ? "SYNCED" : `SYNCING ${percent}%`}
          </text>

          <circle cx="100" cy="100" r="5" fill="#4ade80" filter="drop-shadow(0 0 3px #4ade80)" />
          <circle cx="80" cy="180" r="5" fill="#22d3ee" filter="drop-shadow(0 0 3px #22d3ee)" />
          <circle cx="60" cy="260" r="5" fill="#fde047" filter="drop-shadow(0 0 3px #fde047)" />
          <circle cx="100" cy="350" r="5" fill="#c084fc" filter="drop-shadow(0 0 3px #c084fc)" />

          <circle cx="700" cy="90" r="5" fill="#22d3ee" filter="drop-shadow(0 0 3px #22d3ee)" />
          <circle cx="740" cy="160" r="5" fill="#4ade80" filter="drop-shadow(0 0 3px #4ade80)" />
          <circle cx="720" cy="250" r="5" fill="#f87171" filter="drop-shadow(0 0 3px #f87171)" />
          <circle cx="680" cy="340" r="5" fill="#fde047" filter="drop-shadow(0 0 3px #fde047)" />
        </svg>
      </div>

      {/* Brand & title container */}
      <div className="space-y-4 max-w-sm w-full text-center px-4" id="loader-hud-brand">
        <div 
          ref={titleLettersRef}
          className="flex justify-center gap-1.5 text-2xl font-black tracking-widest text-white font-mono uppercase"
          id="loader-title-group"
        >
          {Array.from("STRATOS").map((char, i) => (
            <span key={`stratos-${i}`} className="char inline-block">{char}</span>
          ))}
          <span className="text-gray-500 char inline-block">/</span>
          {Array.from("VORTEX").map((char, i) => (
            <span key={`vortex-${i}`} className="char inline-block text-gray-500">{char}</span>
          ))}
        </div>

        {/* Live system diagnostic typings */}
        <div className="bg-black/80 border border-white/10 rounded px-4 py-2.5 max-w-sm mx-auto text-left" id="loader-diagnostic-hud">
          <div className="flex items-center gap-2 mb-1.5" id="loader-diagnostics-header">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">UPLINK STREAM</span>
          </div>
          <div className="font-mono text-[10px] text-white tracking-widest h-4 overflow-hidden uppercase">
            &gt; {terminalMessage}
          </div>
        </div>

        {/* Flat single-line system progress bar loader */}
        <div className="w-64 h-[1px] bg-white/10 mx-auto rounded overflow-hidden relative" id="loader-progress-track">
          <div 
            ref={progressLineRef}
            className="absolute top-0 bottom-0 left-0 bg-white"
          />
        </div>
      </div>

      <div className="absolute bottom-6 font-mono text-[8px] text-gray-600 tracking-[0.4em] uppercase" id="loader-credits">
        ACTIVE INTEL // DOON UNIV CSE NETWORK EST.2026
      </div>
    </div>
  );
}
