'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ACHIEVEMENTS } from '@/lib/data';
import { useInView, usePrefersReducedMotion } from '@/lib/hooks';

export function Achievements() {
  const { ref: sectionRef, isInView } = useInView<HTMLElement>({ threshold: 0.15 });
  const prefersReduced = usePrefersReducedMotion();

  const trackRef = useRef<HTMLDivElement>(null);
  const isInteractingRef = useRef(false);
  const [isInteractingState, setIsInteractingState] = useState(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const draggedDistanceRef = useRef(0);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [travelPercent, setTravelPercent] = useState(0);

  // Initialize track to the middle set once mounted for seamless bi-directional scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const initScroll = () => {
      const singleSetWidth = track.scrollWidth / 3;
      if (singleSetWidth > 0) {
        track.scrollLeft = singleSetWidth;
      }
    };
    initScroll();
    const timer = setTimeout(initScroll, 200);
    return () => clearTimeout(timer);
  }, []);

  // Update travel progress for the progress bar and status counter
  const updateProgress = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const singleSetWidth = track.scrollWidth / 3;
    if (singleSetWidth > 0) {
      const progress = (track.scrollLeft % singleSetWidth) / singleSetWidth;
      setTravelPercent(Math.min(Math.max(progress, 0), 1));
    }
  }, []);

  // Continuous right-to-left auto-movement RAF loop
  useEffect(() => {
    if (prefersReduced) return;
    let rafId: number;
    let frameCount = 0;
    const speed = 0.6; // smooth, slow, continuous right-to-left drift

    const step = () => {
      const track = trackRef.current;
      if (track && !isInteractingRef.current) {
        track.scrollLeft += speed;
        const singleSetWidth = track.scrollWidth / 3;
        if (singleSetWidth > 0) {
          if (track.scrollLeft >= singleSetWidth * 2) {
            track.scrollLeft -= singleSetWidth;
          } else if (track.scrollLeft <= 5) {
            track.scrollLeft += singleSetWidth;
          }
        }
        frameCount++;
        if (frameCount % 6 === 0) {
          updateProgress();
        }
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [prefersReduced, updateProgress]);

  const pauseAndScheduleResume = (delay = 2000) => {
    isInteractingRef.current = true;
    setIsInteractingState(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
      setIsInteractingState(false);
    }, delay);
  };

  const handleMouseEnter = () => {
    isInteractingRef.current = true;
    setIsInteractingState(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const handleMouseLeave = () => {
    if (!isDraggingRef.current) {
      pauseAndScheduleResume(1200);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    const track = trackRef.current;
    if (!track) return;
    isDraggingRef.current = true;
    isInteractingRef.current = true;
    setIsInteractingState(true);
    startXRef.current = e.clientX;
    startScrollLeftRef.current = track.scrollLeft;
    draggedDistanceRef.current = 0;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !trackRef.current) return;
    const dx = e.clientX - startXRef.current;
    draggedDistanceRef.current += Math.abs(dx);
    trackRef.current.scrollLeft = startScrollLeftRef.current - dx;
    updateProgress();
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    pauseAndScheduleResume(1800);
  };

  const handleWheel = () => {
    pauseAndScheduleResume(2000);
    updateProgress();
  };

  const handleScroll = () => {
    updateProgress();
    const track = trackRef.current;
    if (!track) return;
    const singleSetWidth = track.scrollWidth / 3;
    if (singleSetWidth > 0) {
      if (track.scrollLeft >= singleSetWidth * 2) {
        track.scrollLeft -= singleSetWidth;
        if (isDraggingRef.current) {
          startScrollLeftRef.current -= singleSetWidth;
        }
      } else if (track.scrollLeft <= 5) {
        track.scrollLeft += singleSetWidth;
        if (isDraggingRef.current) {
          startScrollLeftRef.current += singleSetWidth;
        }
      }
    }
  };

  const handleNav = (direction: 'prev' | 'next') => {
    const track = trackRef.current;
    if (!track) return;
    pauseAndScheduleResume(2500);
    const stepAmount = 420;
    track.scrollBy({
      left: direction === 'next' ? stepAmount : -stepAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className={`relative w-full overflow-hidden py-16 sm:py-24 bg-[#f4f2ee] border-y border-[#0d0d0d]/10 flex flex-col justify-between gap-8 sm:gap-12 rv ${isInView ? 'is-in' : ''}`}
    >
      {/* Section Header & Progress Bar */}
      <div className="site-container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
          <div>
            <div className="font-mono-tag mb-2 flex items-center gap-2 text-xs">
              <span className="font-semibold text-[#0d0d0d]">06</span>
              <span className="text-[#a9a6a0]">—</span>
              <span>Hackathons & Honors</span>
            </div>
            <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl text-[#0d0d0d]">
              Competitive wins and{' '}
              <span className="font-serif-italic text-[#77756f] text-[1.12em] font-normal">
                podiums.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="font-mono text-xs text-[#77756f]">
              Scroll horizontally to explore ({ACHIEVEMENTS.length} milestones)
            </div>

            {/* Subtle previous / next navigation controls */}
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <button
                type="button"
                onClick={() => handleNav('prev')}
                aria-label="Previous milestone"
                className="h-7 w-7 rounded-full border border-[#0d0d0d]/15 hover:border-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-white text-[#0d0d0d] transition-colors flex items-center justify-center cursor-pointer bg-white"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => handleNav('next')}
                aria-label="Next milestone"
                className="h-7 w-7 rounded-full border border-[#0d0d0d]/15 hover:border-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-white text-[#0d0d0d] transition-colors flex items-center justify-center cursor-pointer bg-white"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Thin Progress Bar in Header */}
        <div className="w-full h-[2px] bg-[#0d0d0d]/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0d0d0d] transition-transform duration-75 origin-left"
            style={{ transform: `scaleX(${travelPercent})` }}
          />
        </div>
      </div>

      {/* Horizontal Continuous Scrolling Card Track */}
      <div className="my-auto overflow-hidden w-full relative">
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onTouchStart={() => pauseAndScheduleResume(2500)}
          onTouchEnd={() => pauseAndScheduleResume(1800)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onWheel={handleWheel}
          onScroll={handleScroll}
          className="achievements-track flex items-center gap-6 sm:gap-8 px-6 sm:px-12 md:px-20 overflow-x-auto select-none cursor-grab active:cursor-grabbing py-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            touchAction: 'pan-y',
          }}
        >
          {[0, 1, 2].map((setIdx) => (
            <React.Fragment key={`set-${setIdx}`}>
              {ACHIEVEMENTS.map((ach) => (
                <div
                  key={`${ach.id}-${setIdx}`}
                  style={{
                    width: 'clamp(340px, 40vw, 540px)',
                    height: 'clamp(260px, 36vh, 310px)',
                  }}
                  className="shrink-0 rounded-[28px] bg-white p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative select-none shadow-[0_10px_30px_-8px_rgba(13,13,13,0.06),inset_0_0_0_1px_rgba(13,13,13,0.08)] hover:-translate-y-2 hover:shadow-[0_24px_50px_-12px_rgba(13,13,13,0.14),inset_0_0_0_1px_rgba(13,13,13,0.12)]"
                >
                  {/* Top: 72px Logo Tile + Index */}
                  <div className="flex items-start justify-between">
                    <div className="relative w-[72px] h-[72px] rounded-2xl bg-neutral-100 flex items-center justify-center p-3 shadow-inner">
                      {/* Soft brand glow */}
                      <div
                        className="absolute inset-0 rounded-2xl blur-md opacity-40 transition-opacity"
                        style={{
                          backgroundColor:
                            ach.id === 'quantathon'
                              ? 'rgba(234, 179, 8, 0.4)'
                              : ach.id === 'promptwars'
                              ? 'rgba(66, 133, 244, 0.4)'
                              : 'rgba(13, 13, 13, 0.15)',
                        }}
                      />
                      <AchievementIcon id={ach.id} />
                    </div>

                    <div className="font-mono text-xs font-semibold text-[#a9a6a0]">
                      {ach.index}
                    </div>
                  </div>

                  {/* Bottom: Left Info & Right Animated Number */}
                  <div className="flex items-end justify-between gap-4 mt-auto">
                    {/* Left: Label, Title & Detail */}
                    <div className="max-w-[62%]">
                      <div className="font-mono text-[10px] text-[#77756f] uppercase tracking-wider mb-1">
                        {ach.label}
                      </div>
                      <h3 className="heading-display text-lg sm:text-xl font-bold text-[#0d0d0d] mb-1 leading-snug">
                        {ach.title}
                      </h3>
                      <p className="text-xs text-[#77756f] line-clamp-2 leading-relaxed">
                        {ach.detail}
                      </p>
                    </div>

                    {/* Right: Huge Animated Number */}
                    <div className="text-right">
                      <div className="font-mono text-[10px] text-[#a9a6a0] uppercase tracking-wider mb-0.5">
                        {ach.caption}
                      </div>
                      <div className="heading-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0d0d0d] tracking-tight">
                        <CountUp
                          value={ach.stat}
                          prefix={ach.statPrefix}
                          suffix={ach.statSuffix}
                          start={isInView}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* End Milestone Track Card: "and counting →" */}
              <div
                key={`milestone-${setIdx}`}
                style={{
                  width: 'clamp(260px, 24vw, 320px)',
                  height: 'clamp(260px, 36vh, 310px)',
                }}
                className="shrink-0 rounded-[28px] border-2 border-dashed border-[#0d0d0d]/20 bg-white/40 flex flex-col items-center justify-center p-8 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#0d0d0d] text-white flex items-center justify-center mb-4 text-lg">
                  →
                </div>
                <div className="font-mono text-sm text-[#0d0d0d] font-semibold tracking-wider uppercase">
                  and counting →
                </div>
                <p className="text-xs text-[#77756f] mt-2 font-mono">
                  Continuous participation in national hackathons
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="site-container flex items-center justify-between text-[11px] font-mono text-[#a9a6a0]">
        <span>Track Status: {isInteractingState ? 'Paused' : 'Synced'}</span>
        <span>Horizontal Travel: {Math.round(travelPercent * 100)}%</span>
      </div>

      <style jsx>{`
        .achievements-track::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

function CountUp({
  value,
  prefix,
  suffix,
  start,
}: {
  value: number;
  prefix: string;
  suffix: string;
  start: boolean;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    const duration = 1400; // 1.4s

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // easeOutQuart: 1 - pow(1 - t, 4)
      const ease = 1 - Math.pow(1 - progress, 4);
      setCurrent(Math.floor(ease * value));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCurrent(value);
      }
    };

    requestAnimationFrame(step);
  }, [start, value]);

  const formatted =
    value >= 1000 ? current.toLocaleString() : current.toString();

  return (
    <span>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

function AchievementIcon({ id }: { id: string }) {
  if (id === 'quantathon') {
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0d0d0d" strokeWidth="1.5">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.45 1-1 1H7" />
        <path d="M14 14.66V17c0 .55.45 1 1 1h2" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    );
  }

  if (id === 'ai-impact') {
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0d0d0d" strokeWidth="1.5">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    );
  }

  if (id === 'promptwars') {
    return (
      <img
        src="/logos/google.svg"
        alt="Google for Developers"
        width={36}
        height={36}
        className="w-9 h-9 object-contain"
      />
    );
  }

  // Medals / Podium trophy glyph
  return (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#0d0d0d" strokeWidth="1.5">
      <circle cx="12" cy="9" r="6" />
      <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
    </svg>
  );
}
