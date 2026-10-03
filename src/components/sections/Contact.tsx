'use client';

import React, { useState } from 'react';
import { PROFILE } from '@/lib/data';
import { useScroll } from '@/lib/scroll';
import { useInView } from '@/lib/hooks';

export function Contact() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 });
  const { scrollToTarget } = useScroll();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const line1 = "Let's build";
  const line2 = "something together.";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`pt-24 pb-12 site-container rv ${isInView ? 'is-in' : ''}`}
    >
      <div className="font-mono-tag mb-4 flex items-center gap-2 text-xs">
        <span className="font-semibold text-[#0d0d0d]">07</span>
        <span className="text-[#a9a6a0]">—</span>
        <span>Initiate contact</span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 mb-16">
        <div>
          {/* Hopping Heading: each letter bounces on hover */}
          <h2 className="heading-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#0d0d0d] tracking-tight leading-[1.05]">
            <div className="flex flex-wrap">
              {line1.split('').map((char, i) => (
                <span
                  key={i}
                  className="letter-hop inline-block cursor-default transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-3"
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap">
              {line2.split('').map((char, i) => (
                <span
                  key={i}
                  className="letter-hop inline-block cursor-default transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-3"
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>
          </h2>

          {/* Email with Copy Chip */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${PROFILE.email}`}
              className="text-xl sm:text-2xl md:text-3xl font-medium text-[#0d0d0d] underline underline-offset-8 decoration-1 decoration-[#0d0d0d]/30 hover:decoration-[#0d0d0d] transition-colors"
            >
              {PROFILE.email}
            </a>

            <button
              type="button"
              onClick={copyEmail}
              className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-white border border-[#0d0d0d]/15 shadow-2xs hover:bg-[#0d0d0d] hover:text-white transition-all active:scale-95"
              aria-label="Copy email address"
            >
              <span aria-live="polite">
                {copied ? 'Copied ✓' : 'Copy email'}
              </span>
            </button>
          </div>

          {/* Contact Details & Links */}
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm">
            <a
              href={PROFILE.phoneHref}
              className="font-mono text-xs text-[#3a3a3a] hover:text-[#0d0d0d] underline underline-offset-4"
            >
              +91 {PROFILE.phone}
            </a>
            <span className="text-[#a9a6a0]" aria-hidden="true">•</span>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-[#3a3a3a] hover:text-[#0d0d0d] underline underline-offset-4"
            >
              GitHub ↗
            </a>
            <span className="text-[#a9a6a0]" aria-hidden="true">•</span>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-[#3a3a3a] hover:text-[#0d0d0d] underline underline-offset-4"
            >
              LinkedIn ↗
            </a>
            <span className="text-[#a9a6a0]" aria-hidden="true">•</span>
            <span className="font-mono text-xs text-[#77756f]">
              {PROFILE.location}
            </span>
          </div>
        </div>

        {/* Spinning Circular "say hello" badge */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 shrink-0 flex items-center justify-center self-center lg:self-start">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full animate-[spin_18s_linear_infinite]"
            aria-hidden="true"
          >
            <path
              id="circlePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="none"
            />
            <text className="font-mono text-[9px] uppercase tracking-[0.22em] fill-[#0d0d0d]">
              <textPath href="#circlePath">
                SAY HELLO · GET IN TOUCH · LET&apos;S COLLABORATE ·
              </textPath>
            </text>
          </svg>
          <div className="absolute w-12 h-12 rounded-full bg-[#0d0d0d] text-white flex items-center justify-center font-bold text-sm shadow-md">
            ↗
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <footer className="pt-10 border-t border-[#0d0d0d]/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#77756f]">
        <div>
          © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
        </div>

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => scrollToTarget('#hero')}
            className="hover:text-[#0d0d0d] underline underline-offset-4"
          >
            Back to top ↑
          </button>
          <span>Built with Next.js</span>
        </div>
      </footer>
    </section>
  );
}
