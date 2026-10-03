'use client';

import React, { useRef, useState, useEffect } from 'react';
import { PROFILE } from '@/lib/data';
import { useScroll } from '@/lib/scroll';

export function Hero() {
  const { scrollToTarget } = useScroll();
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  // Initialize video autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt to play with sound first
    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch(() => {
          // Autoplay with sound was blocked; fallback to muted
          video.muted = true;
          video.play().then(() => {
            setIsPlaying(true);
            setIsMuted(true);
          }).catch((err) => {
            console.warn('Video autoplay failed:', err);
          });
        });
    }

    // Unlock sound on first user gesture
    const unlockSound = () => {
      setHasInteracted(true);
      if (videoRef.current && videoRef.current.muted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
      window.removeEventListener('pointerdown', unlockSound);
      window.removeEventListener('keydown', unlockSound);
      window.removeEventListener('touchend', unlockSound);
    };

    window.addEventListener('pointerdown', unlockSound, { once: true });
    window.addEventListener('keydown', unlockSound, { once: true });
    window.addEventListener('touchend', unlockSound, { once: true });

    return () => {
      window.removeEventListener('pointerdown', unlockSound);
      window.removeEventListener('keydown', unlockSound);
      window.removeEventListener('touchend', unlockSound);
    };
  }, []);

  // IntersectionObserver: Pause video when < 35% visible, resume when >= 35% visible
  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.intersectionRatio >= 0.35;
        setIsHeroVisible(visible);

        if (videoRef.current) {
          if (visible) {
            videoRef.current.play().catch(() => {});
            setIsPlaying(true);
          } else {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      {
        threshold: [0, 0.2, 0.35, 0.5, 0.8, 1.0],
      }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  // Toggle sound manually
  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      setIsMuted(false);
      video.play().catch(() => {});
      setIsPlaying(true);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[100svh] flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-[#f4f2ee]"
    >
      {/* Giant outlined ghost word behind the person (z-0) */}
      <div
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-[17vw] lg:text-[18vw] font-black uppercase tracking-tight text-transparent leading-none"
          style={{
            WebkitTextStroke: '1.5px rgba(13, 13, 13, 0.08)',
          }}
        >
          {PROFILE.firstName}
        </span>
      </div>

      {/* Main Hero Content Area: Left Text + Right Video */}
      <div className="site-container relative flex-1 flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12 my-auto py-4">
        {/* Left Column: Role Pill, Heading & CTAs */}
        <div className="w-full lg:max-w-[54%] flex flex-col justify-center text-left relative z-20">
          {/* Avatar + Role pill */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#0d0d0d]/15 shadow-2xs shrink-0 bg-white">
              <img
                src="/profile-dp.png"
                alt={PROFILE.name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-mono text-xs text-[#77756f] tracking-widest uppercase">
                Software Engineer & AI Undergraduate
              </div>
              <div className="text-xs font-semibold text-[#0d0d0d]">
                {PROFILE.name}
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="heading-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#0d0d0d] leading-[1.08] tracking-tight">
            Software{' '}
            <span className="font-serif-italic text-[#77756f] text-[1.12em] font-normal">
              Developer.
            </span>
          </h1>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 mt-6 sm:mt-8">
            <button
              type="button"
              onClick={() => scrollToTarget('#work')}
              className="btn-primary"
            >
              Explore work
            </button>
            <button
              type="button"
              onClick={() => scrollToTarget('#contact')}
              className="btn-secondary"
            >
              Let&apos;s talk
            </button>
            <a
              href="/resume.pdf"
              download="Priyan_I_ATS_Resume.pdf"
              className="btn-secondary"
              title="Download Résumé PDF"
            >
              Résumé ↓
            </a>
          </div>
        </div>

        {/* Right Column: Hero Video */}
        <div className="w-full lg:w-auto flex items-center justify-center lg:justify-end mix-blend-multiply pointer-events-none">
          <div
            className="relative max-w-full flex items-center justify-center mix-blend-multiply"
            style={{
              height: 'clamp(380px, 78svh, 840px)',
              aspectRatio: '768 / 960',
            }}
          >
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="auto"
              poster="/portrait-bust.webp"
              className="w-full h-full object-contain pointer-events-auto mix-blend-multiply contrast-[1.05] brightness-[1.02]"
              style={{
                maxHeight: 'clamp(380px, 78svh, 840px)',
              }}
            >
              <source src="/hero/hero.webm" type="video/webm" />
              <source src="/hero/hero.mp4" type="video/mp4" />
              Your browser does not support HTML video.
            </video>

            {/* Sound Control Button: 46px round solid ink */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 pointer-events-auto">
              <div className="relative">
                {/* Soft ping ring while muted or autoplay blocked */}
                {isMuted && (
                  <span
                    className="absolute inset-0 rounded-full bg-[#0d0d0d]/15 animate-ping pointer-events-none"
                    aria-hidden="true"
                  />
                )}
                <button
                  type="button"
                  onClick={toggleSound}
                  className="relative w-[46px] h-[46px] rounded-full bg-[#0d0d0d] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
                  aria-label={isMuted ? 'Unmute video voice intro' : 'Mute video voice intro'}
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="ml-0.5"
                      aria-hidden="true"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  ) : (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
