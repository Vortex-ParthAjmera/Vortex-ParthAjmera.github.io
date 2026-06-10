import React from 'react';

const TRACK_SPECIALTIES = [
  { text: 'Agentic AI Pipelines', color: 'text-emerald-400' },
  { text: 'Systems Engineering', color: 'text-cyan-400' },
  { text: 'Quantitative Trading Systems', color: 'text-indigo-400' },
  { text: 'Google Student Ambassador (#TeamGemini)', color: 'text-emerald-500' },
  { text: 'Applied Machine Learning', color: 'text-cyan-300' },
  { text: 'Astrophysics Research Models', color: 'text-indigo-300' },
  { text: 'Docker Containerization', color: 'text-teal-400' },
  { text: 'Financial Strategy & Forecasting', color: 'text-emerald-300' },
  { text: 'Multi-Agent Orchestration', color: 'text-cyan-400' },
];

export default function TechMarquee() {
  // Render thrice for seamless looping transition
  const thriceRender = [...TRACK_SPECIALTIES, ...TRACK_SPECIALTIES, ...TRACK_SPECIALTIES];

  return (
    <div className="tech-marquee-container relative z-10 w-full" id="premium-tech-marquee">
      <div className="tech-marquee-track">
        {thriceRender.map((spec, idx) => (
          <div key={idx} className="flex items-center gap-4 px-12 shrink-0 select-none font-mono text-xs font-bold tracking-widest uppercase">
            <span className={spec.color}>{spec.text}</span>
            <span className="text-gray-600 font-sans tracking-normal font-black text-xs select-none">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}
