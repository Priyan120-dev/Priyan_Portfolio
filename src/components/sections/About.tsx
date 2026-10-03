'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PROFILE } from '@/lib/data';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useInView } from '@/lib/hooks';

export function About() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [swingAngle, setSwingAngle] = useState(0);

  const cardContainerRef = useRef<HTMLDivElement>(null);
  const lastMouseX = useRef<number | null>(null);
  const lastTime = useRef<number>(Date.now());
  const velocity = useRef<number>(0);
  const currentAngle = useRef<number>(0);
  const rafId = useRef<number | null>(null);

  // Pendulum physics & idle sway
  useEffect(() => {
    let idleTime = 0;

    const animate = () => {
      idleTime += 0.03;

      // Spring damping physics
      const spring = 0.05;
      const damping = 0.92;
      const targetAngle = 0;
      const force = (targetAngle - currentAngle.current) * spring;

      velocity.current = (velocity.current + force) * damping;
      currentAngle.current += velocity.current;

      // Subtle idle sway when resting
      const idleSway = Math.sin(idleTime) * 1.8;
      const totalAngle = currentAngle.current + idleSway;

      setSwingAngle(totalAngle);
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    const handlePointerMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = Math.max((now - lastTime.current) / 1000, 0.016);

      if (lastMouseX.current !== null) {
        const dx = e.clientX - lastMouseX.current;
        const v = dx / dt;
        // Inject impulse into pendulum (damped)
        velocity.current += Math.max(Math.min(v * 0.006, 12), -12);
      }

      lastMouseX.current = e.clientX;
      lastTime.current = now;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', handlePointerMove);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsFlipped((prev) => !prev);
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`section-padding site-container rv ${isInView ? 'is-in' : ''}`}
    >
      <SectionHeader
        index="01"
        tag="Profile & background"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] gap-8 items-stretch">
        {/* Left Column: Summary & Bio */}
        <div className="card-base p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="font-mono text-xs text-[#77756f] tracking-widest uppercase mb-3">
              Summary
            </div>
            <h3 className="heading-display text-2xl sm:text-3xl text-[#0d0d0d] mb-6">
              Hi, I&apos;m {PROFILE.name.split(' ')[0]}.
            </h3>
            <p className="text-[#3a3a3a] leading-relaxed text-sm sm:text-base mb-6 font-normal">
              {PROFILE.resumeSummary}
            </p>
            <p className="text-[#77756f] leading-relaxed text-xs sm:text-sm border-l-2 border-[#0d0d0d]/15 pl-4 font-mono">
              {PROFILE.shortBio}
            </p>
          </div>

          <div className="pt-8 border-t border-[#0d0d0d]/10 flex flex-wrap gap-3 mt-6">
            <a
              href="/resume.pdf"
              download="Priyan_I_ATS_Resume.pdf"
              className="btn-primary text-xs"
              title="Download Résumé"
            >
              Résumé ↓
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs"
              title="GitHub Profile"
            >
              GitHub ↗
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs"
              title="LinkedIn Profile"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        {/* Center Column: Hanging Lanyard ID Card */}
        <div
          ref={cardContainerRef}
          className="flex flex-col items-center justify-start select-none relative py-2"
        >
          {/* Lanyard Strap: 30x56 px with scrolling text ending in metal clip */}
          <div className="flex flex-col items-center z-20">
            <div className="w-[30px] h-[56px] bg-[#0d0d0d] rounded-t-sm overflow-hidden flex flex-col justify-center items-center shadow-inner relative">
              {/* Strap vertical texture */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,#0d0d0d_0px,#1a1a1a_2px,#0d0d0d_4px)] opacity-50" />
              <div className="relative font-mono text-[8px] text-neutral-400 uppercase tracking-widest rotate-90 whitespace-nowrap">
                DSU · DEV
              </div>
            </div>

            {/* Metal Swivel Clip */}
            <div className="w-7 h-4 bg-gradient-to-b from-neutral-300 via-neutral-100 to-neutral-400 rounded-sm shadow-sm border border-neutral-400 flex items-center justify-center -mt-0.5">
              <div className="w-3.5 h-1.5 bg-neutral-600 rounded-full" />
            </div>
            <div className="w-1.5 h-3 bg-gradient-to-r from-neutral-400 to-neutral-200 border-x border-neutral-500 -mt-0.5" />
          </div>

          {/* Damped Pendulum Swing Wrapper */}
          <div
            className="w-full flex justify-center origin-top transition-transform duration-75"
            style={{
              transform: `rotate(${swingAngle}deg)`,
            }}
          >
            {/* 3D Card Flipper */}
            <div
              tabIndex={0}
              role="button"
              aria-label="Developer ID Card. Click or press Enter to flip."
              onClick={() => setIsFlipped(!isFlipped)}
              onKeyDown={handleKeyDown}
              onMouseEnter={() => setIsFlipped(true)}
              onMouseLeave={() => setIsFlipped(false)}
              className="w-[300px] h-[404px] [perspective:1000px] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d] rounded-[24px]"
            >
              <div
                className={`relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isFlipped ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                {/* FRONT SIDE */}
                <div className="absolute inset-0 w-full h-full bg-white rounded-[24px] shadow-[0_16px_40px_-8px_rgba(13,13,13,0.12),inset_0_0_0_1px_rgba(13,13,13,0.1)] p-5 flex flex-col justify-between [backface-visibility:hidden] overflow-hidden">
                  {/* Top punch slot & band */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-2 rounded-full bg-neutral-200 border border-neutral-300 mb-2 shadow-inner" />
                    <div className="w-full bg-[#0d0d0d] text-white py-1.5 px-3 rounded-lg flex items-center justify-between font-mono text-[9px] tracking-widest uppercase">
                      <span>DEVELOPER ID</span>
                      <span className="text-neutral-400">DSU / 2026</span>
                    </div>
                  </div>

                  {/* Centered highlighted portrait */}
                  <div className="flex flex-col items-center my-auto">
                    <div className="relative group/pic w-[140px] h-[140px] rounded-full overflow-hidden border-2 border-white shadow-[0_6px_20px_rgba(0,0,0,0.08)] ring-1 ring-black/10 flex items-center justify-center bg-neutral-100">
                      <img
                        src="/profile-dp.png"
                        alt={PROFILE.name}
                        className="w-full h-full object-cover group-hover/pic:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="mt-3 text-center">
                      <div className="heading-display text-base font-bold text-[#0d0d0d]">
                        {PROFILE.name}
                      </div>
                      <div className="font-mono text-[10px] text-[#77756f] uppercase tracking-wider">
                        {PROFILE.role}
                      </div>
                    </div>
                  </div>

                  {/* Bottom rows + Barcode & Hologram */}
                  <div>
                    <div className="grid grid-cols-3 gap-1 border-t border-b border-[#0d0d0d]/10 py-2 my-2 font-mono text-[9px]">
                      <div>
                        <span className="text-[#a9a6a0] block text-[8px]">ID NO.</span>
                        <span className="text-[#0d0d0d] font-semibold">2025-AI</span>
                      </div>
                      <div>
                        <span className="text-[#a9a6a0] block text-[8px]">DEPT</span>
                        <span className="text-[#0d0d0d] font-semibold">AI & DS</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[#a9a6a0] block text-[8px]">VALID TILL</span>
                        <span className="text-[#0d0d0d] font-semibold">{PROFILE.validTill}</span>
                      </div>
                    </div>

                    {/* Barcode and Holographic badge */}
                    <div className="flex items-center justify-between pt-1">
                      {/* Barcode lines */}
                      <div
                        className="h-6 w-36 flex items-center gap-[2px] opacity-75"
                        aria-hidden="true"
                      >
                        <div className="w-[2px] h-full bg-[#0d0d0d]" />
                        <div className="w-[1px] h-full bg-[#0d0d0d]" />
                        <div className="w-[3px] h-full bg-[#0d0d0d]" />
                        <div className="w-[1px] h-full bg-[#0d0d0d]" />
                        <div className="w-[2px] h-full bg-[#0d0d0d]" />
                        <div className="w-[1px] h-full bg-[#0d0d0d]" />
                        <div className="w-[4px] h-full bg-[#0d0d0d]" />
                        <div className="w-[2px] h-full bg-[#0d0d0d]" />
                        <div className="w-[1px] h-full bg-[#0d0d0d]" />
                        <div className="w-[3px] h-full bg-[#0d0d0d]" />
                        <div className="w-[1px] h-full bg-[#0d0d0d]" />
                        <div className="w-[2px] h-full bg-[#0d0d0d]" />
                        <div className="w-[1px] h-full bg-[#0d0d0d]" />
                      </div>

                      {/* Silver holographic sticker */}
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-neutral-200 via-neutral-100 to-neutral-300 border border-neutral-300 shadow-inner flex items-center justify-center font-mono text-[7px] text-neutral-500 uppercase tracking-tighter">
                        AUTH
                      </div>
                    </div>
                  </div>
                </div>

                {/* BACK SIDE */}
                <div className="absolute inset-0 w-full h-full bg-[#0d0d0d] text-[#f4f2ee] rounded-[24px] shadow-[0_16px_40px_-8px_rgba(13,13,13,0.16)] p-6 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <div>
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
                      <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                        SECURITY CREDENTIAL
                      </span>
                      <span className="font-mono text-[10px] text-neutral-500">DSU-01</span>
                    </div>

                    <div className="space-y-3 font-mono text-[11px] text-neutral-300">
                      <div>
                        <span className="text-neutral-500 text-[9px] block uppercase tracking-wider">
                          What I am
                        </span>
                        <span className="font-semibold text-white">Full Stack Software Engineer</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 text-[9px] block uppercase tracking-wider">
                          Degree & CGPA
                        </span>
                        <span>B.Tech AI & Data Science (8.29 / 10)</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 text-[9px] block uppercase tracking-wider">
                          Hackathons & Honours
                        </span>
                        <span>Quantathon Winner · 1st Prize AI Impact</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 text-[9px] block uppercase tracking-wider">
                          Key Systems
                        </span>
                        <span>Stadium OS · AdaptIQ · SENTINEL</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-neutral-800 pt-4">
                    {/* Signature simulation */}
                    <div className="font-serif-italic text-neutral-300 text-lg tracking-wide mb-2 italic">
                      Priyan I.
                    </div>
                    <div className="font-mono text-[9px] text-neutral-400">
                      If found, say hello ·{' '}
                      <span className="text-white underline">{PROFILE.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 font-mono text-[10px] text-[#a9a6a0] tracking-wider uppercase text-center">
            Hover or tap to flip card
          </div>
        </div>

        {/* Right Column: Quick Facts & Quote */}
        <div className="card-base p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="font-mono text-xs text-[#77756f] tracking-widest uppercase mb-4">
              Quick Facts
            </div>

            <div className="divide-y divide-[#0d0d0d]/10">
              <div className="py-3">
                <span className="font-mono text-xs text-[#a9a6a0] block uppercase">Location</span>
                <span className="text-sm font-medium text-[#0d0d0d]">{PROFILE.location}</span>
              </div>
              <div className="py-3">
                <span className="font-mono text-xs text-[#a9a6a0] block uppercase">Education</span>
                <span className="text-sm font-medium text-[#0d0d0d]">{PROFILE.degree}</span>
                <span className="text-xs text-[#77756f] block">{PROFILE.institution}</span>
              </div>
              <div className="py-3">
                <span className="font-mono text-xs text-[#a9a6a0] block uppercase">Current Role</span>
                <span className="text-sm font-medium text-[#0d0d0d]">{PROFILE.currentRole}</span>
              </div>
              <div className="py-3">
                <span className="font-mono text-xs text-[#a9a6a0] block uppercase">Email</span>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="text-sm font-medium text-[#0d0d0d] hover:underline"
                >
                  {PROFILE.email}
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#0d0d0d]/10 mt-6">
            <blockquote className="text-xs sm:text-sm text-[#3a3a3a] italic leading-relaxed">
              &ldquo;{PROFILE.quote}&rdquo;
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
