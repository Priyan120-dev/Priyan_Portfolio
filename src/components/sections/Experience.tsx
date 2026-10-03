'use client';

import React, { useRef, useState, useEffect } from 'react';
import { TIMELINE } from '@/lib/data';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useInView } from '@/lib/hooks';

export function Experience() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 });
  const timelineRef = useRef<HTMLDivElement>(null);
  const [spineHeight, setSpineHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = timelineRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far down the timeline we have scrolled
      const start = windowHeight * 0.7; // triggers when top reaches 70% of viewport
      const total = rect.height;
      const current = start - rect.top;

      const progress = Math.min(Math.max(current / total, 0), 1);
      setSpineHeight(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className={`section-padding site-container rv ${isInView ? 'is-in' : ''}`}
    >
      <SectionHeader
        index="05"
        tag="Trajectory & Timeline"
        title="Education and experience as one continuous"
        italicWord="path."
      />

      <div ref={timelineRef} className="relative max-w-4xl mx-auto pt-6 pb-12">
        {/* Background Grey Spine */}
        <div
          className="absolute left-4 sm:left-1/2 top-0 bottom-24 w-[2px] bg-[#0d0d0d]/10 -translate-x-1/2"
          aria-hidden="true"
        />

        {/* Dynamic Inking Spine that draws on scroll */}
        <div
          className="absolute left-4 sm:left-1/2 top-0 w-[2px] bg-[#0d0d0d] -translate-x-1/2 origin-top transition-transform duration-100 ease-out"
          style={{
            height: 'calc(100% - 96px)',
            transform: `scaleY(${spineHeight})`,
          }}
          aria-hidden="true"
        />

        {/* Timeline Stops */}
        <div className="space-y-12 sm:space-y-16">
          {TIMELINE.map((item, idx) => {
            const isEven = idx % 2 === 0;
            const itemThreshold = (idx + 0.3) / TIMELINE.length;
            const isLit = spineHeight >= itemThreshold;

            return (
              <div
                key={idx}
                className="relative flex flex-col sm:flex-row items-start sm:items-center group"
              >
                {/* Center Node / Dot */}
                <div
                  className={`absolute left-4 sm:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 z-10 transition-all duration-400 ease-out ${
                    isLit
                      ? 'bg-[#0d0d0d] ring-4 ring-white shadow-sm scale-110'
                      : 'bg-white border-2 border-[#0d0d0d]/20 scale-90'
                  }`}
                  aria-hidden="true"
                />

                {/* Content Card (alternating left/right on desktop) */}
                <div
                  className={`w-full sm:w-[calc(50%-36px)] pl-12 sm:pl-0 ${
                    isEven ? 'sm:mr-auto sm:text-right' : 'sm:ml-auto sm:text-left'
                  }`}
                >
                  <div
                    className={`card-base p-6 sm:p-7 transition-all duration-500 ${
                      isLit
                        ? 'border border-[#0d0d0d]/15 shadow-[0_8px_30px_rgba(0,0,0,0.04)]'
                        : 'border border-[#0d0d0d]/5 opacity-70'
                    }`}
                  >
                    {/* Year / Date Pill */}
                    <div
                      className={`inline-block font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-3 ${
                        isLit
                          ? 'bg-[#0d0d0d] text-white'
                          : 'bg-neutral-100 text-[#77756f]'
                      }`}
                    >
                      {item.year}
                    </div>

                    <h3 className="heading-display text-xl font-bold text-[#0d0d0d] mb-1">
                      {item.title}
                    </h3>

                    <div className="font-mono text-xs text-[#77756f] mb-4 font-medium">
                      {item.place}
                    </div>

                    <p className="text-xs sm:text-sm text-[#3a3a3a] leading-relaxed font-normal">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* End Stop: Dashed "Next — Your team?" card */}
        <div className="mt-16 relative flex flex-col items-center">
          {/* Final Node */}
          <div
            className={`w-5 h-5 rounded-full border-2 border-dashed border-[#0d0d0d]/40 bg-white mb-6 z-10 flex items-center justify-center transition-all ${
              spineHeight >= 0.95 ? 'border-[#0d0d0d] scale-110' : ''
            }`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d]" />
          </div>

          <div className="w-full max-w-md border-2 border-dashed border-[#0d0d0d]/25 rounded-[24px] p-8 text-center bg-white/50 backdrop-blur-xs hover:border-[#0d0d0d] hover:bg-white transition-all duration-300">
            <span className="font-mono text-xs text-[#77756f] uppercase tracking-wider block mb-2">
              Opportunities & Impact
            </span>
            <h4 className="heading-display text-2xl font-bold text-[#0d0d0d] mb-2">
              Next — Your team?
            </h4>
            <p className="text-xs sm:text-sm text-[#3a3a3a] mb-5 leading-relaxed">
              Available for full stack engineering roles, AI system integrations, and high-impact development challenges.
            </p>
            <a href="#contact" className="btn-primary text-xs">
              Start a Conversation →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
