'use client';

import React, { useEffect, useRef } from 'react';
import { CERTIFICATIONS } from '@/lib/data';
import { useInView, usePrefersReducedMotion } from '@/lib/hooks';

export function Certifications() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 });
  const prefersReduced = usePrefersReducedMotion();

  const trackRef = useRef<HTMLDivElement>(null);
  const isInteractingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const draggedDistanceRef = useRef(0);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Triple the items for a completely seamless, gap-free infinite loop in both directions
  const TRIPLE_CERTIFICATIONS = [...CERTIFICATIONS, ...CERTIFICATIONS, ...CERTIFICATIONS];

  // Initialize track to the middle set once mounted
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
    // Re-check after images/fonts settle
    const timer = setTimeout(initScroll, 200);
    return () => clearTimeout(timer);
  }, []);

  // Continuous auto-movement RAF loop
  useEffect(() => {
    if (prefersReduced) return;
    let rafId: number;
    const speed = 0.55; // gentle, steady continuous drift

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
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [prefersReduced]);

  const pauseAndScheduleResume = (delay = 2000) => {
    isInteractingRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, delay);
  };

  const handleMouseEnter = () => {
    isInteractingRef.current = true;
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
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    pauseAndScheduleResume(2000);
  };

  const handleWheel = () => {
    pauseAndScheduleResume(2000);
  };

  const handleScroll = () => {
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

  const handleClickCapture = (e: React.MouseEvent) => {
    if (draggedDistanceRef.current > 6) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleNav = (direction: 'prev' | 'next') => {
    const track = trackRef.current;
    if (!track) return;
    pauseAndScheduleResume(2500);
    const stepAmount = 380;
    track.scrollBy({
      left: direction === 'next' ? stepAmount : -stepAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className={`bg-white border-y border-[#0d0d0d]/10 py-20 md:py-28 rv ${isInView ? 'is-in' : ''}`}
    >
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky Heading & Count */}
          <div className="lg:sticky lg:top-32">
            <div className="font-mono-tag mb-4 flex items-center gap-2 text-xs">
              <span className="font-semibold text-[#0d0d0d]">04</span>
              <span className="text-[#a9a6a0]">—</span>
              <span>Certifications</span>
            </div>

            <h2 className="heading-display text-4xl sm:text-5xl text-[#0d0d0d] mb-4">
              Always{' '}
              <span className="font-serif-italic text-[#77756f] text-[1.12em] font-normal">
                learning.
              </span>
            </h2>

            <p className="text-[#77756f] text-sm leading-relaxed mb-6">
              Continuous rigorous specialization in AI, Python computational analytics, prompt engineering, and problem solving.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <div className="font-mono text-xs text-[#0d0d0d] border-l-2 border-[#0d0d0d] pl-3 py-1">
                {CERTIFICATIONS.length} Verified Credentials
              </div>

              {/* Minimal Previous / Next Navigation Controls */}
              <div className="flex items-center gap-1.5 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => handleNav('prev')}
                  aria-label="Previous certificate"
                  className="h-7 px-2.5 rounded-full border border-[#0d0d0d]/15 hover:border-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-white text-[#0d0d0d] transition-colors flex items-center gap-1 cursor-pointer bg-white"
                >
                  <span>←</span>
                  <span className="hidden sm:inline">prev</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('next')}
                  aria-label="Next certificate"
                  className="h-7 px-2.5 rounded-full border border-[#0d0d0d]/15 hover:border-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-white text-[#0d0d0d] transition-colors flex items-center gap-1 cursor-pointer bg-white"
                >
                  <span className="hidden sm:inline">next</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Horizontal Certificate Carousel */}
          <div className="min-w-0 w-full relative">
            <div
              ref={trackRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onWheel={handleWheel}
              onScroll={handleScroll}
              onClickCapture={handleClickCapture}
              className="carousel-track flex gap-4 sm:gap-6 overflow-x-auto select-none cursor-grab active:cursor-grabbing pb-3 pt-1"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                touchAction: 'pan-y',
              }}
            >
              {TRIPLE_CERTIFICATIONS.map((cert, idx) => (
                <a
                  key={`${cert.index}-${idx}`}
                  href={cert.certificateUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                  title={`Open certificate: ${cert.title}`}
                  className="cert-row group block relative w-[300px] sm:w-[380px] shrink-0 border border-[#0d0d0d]/10 bg-white p-6 sm:p-7 overflow-hidden cursor-pointer transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d] no-underline"
                >
                  <div className="relative z-10 flex flex-col justify-between h-full min-h-[170px] sm:min-h-[190px]">
                    {/* Header: Index, Date & Slide-in Arrow */}
                    <div className="flex items-center justify-between gap-4 font-mono text-xs">
                      <span className="font-semibold text-[#a9a6a0] group-hover:text-neutral-400 transition-colors duration-300">
                        {cert.index}
                      </span>
                      <div className="flex items-center gap-3 text-[#a9a6a0] group-hover:text-neutral-300 transition-colors duration-300">
                        <span>{cert.dateOrYear}</span>
                        <span className="text-base text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
                          ↗
                        </span>
                      </div>
                    </div>

                    {/* Body: Title & Issuer */}
                    <div className="mt-6">
                      <h3 className="text-base sm:text-lg font-semibold text-[#0d0d0d] group-hover:text-white transition-colors duration-300 line-clamp-2">
                        {cert.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#77756f] group-hover:text-neutral-300 transition-colors duration-300 mt-2 line-clamp-2">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .carousel-track::-webkit-scrollbar {
          display: none;
        }
        .cert-row::before {
          content: '';
          position: absolute;
          inset: 0;
          background-color: #0d0d0d;
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 0;
        }
        .cert-row:hover::before,
        .cert-row:focus-visible::before {
          transform: scaleX(1);
        }
      `}</style>
    </section>
  );
}
