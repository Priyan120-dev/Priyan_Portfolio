'use client';

import React, { useState, useEffect, useRef } from 'react';
import { NAV, PROFILE } from '@/lib/data';
import { useScroll } from '@/lib/scroll';
import { useScrollProgress } from '@/lib/hooks';

export function Navigation() {
  const { scrollToTarget } = useScroll();
  const scrollProgress = useScrollProgress();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
  const navListRef = useRef<HTMLUListElement>(null);

  // Track scroll position for header appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section with IntersectionObserver rootMargin: -45% 0px -50% 0px
  useEffect(() => {
    const sectionIds = NAV.map((item) => item.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Update sliding indicator position
  useEffect(() => {
    if (!navListRef.current) return;
    const activeItem = navListRef.current.querySelector(`[data-section="${activeSection}"]`) as HTMLElement;
    if (activeItem) {
      setIndicatorStyle({
        left: activeItem.offsetLeft,
        width: activeItem.offsetWidth,
      });
    }
  }, [activeSection]);

  // Lock body scroll when mobile menu is open & handle Esc key
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToTarget(href);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* 2px ink scroll-progress bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#0d0d0d] z-50 origin-left transition-transform duration-75"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      {/* Main Top Navigation Bar */}
      <header
        className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 md:px-10 py-4 transition-all duration-300"
      >
        <div className="max-w-[1320px] mx-auto flex items-center justify-between">
          {/* Left: Initials mark + Name */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group flex items-center gap-3 select-none"
            aria-label={`${PROFILE.name} - Home`}
          >
            <div
              className="w-10 h-10 rounded-full overflow-hidden border border-[#0d0d0d]/20 shadow-xs flex items-center justify-center transition-all duration-500 ease-out group-hover:rotate-[360deg] group-hover:scale-105 shrink-0 bg-white"
            >
              <img
                src="/profile-dp.png"
                alt={PROFILE.name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className={`font-semibold tracking-tight text-sm text-[#0d0d0d] transition-all duration-300 ${
                scrolled ? 'opacity-0 -translate-x-2 pointer-events-none' : 'opacity-100 translate-x-0'
              }`}
            >
              {PROFILE.name}
            </span>
          </a>

          {/* Desktop Center/Right Nav Pill */}
          <nav
            aria-label="Primary"
            className={`hidden md:block p-1.5 rounded-full transition-all duration-300 ${
              scrolled
                ? 'bg-white/75 backdrop-blur-md shadow-[0_4px_24px_-4px_rgba(13,13,13,0.08)] border border-[#0d0d0d]/10'
                : 'bg-white/40 backdrop-blur-sm border border-[#0d0d0d]/5'
            }`}
          >
            <ul ref={navListRef} className="relative flex items-center gap-1 m-0 p-0 list-none">
              {/* Sliding indicator pill */}
              <div
                className="absolute top-0 bottom-0 rounded-full bg-[#0d0d0d] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                  opacity: indicatorStyle.width > 0 ? 1 : 0,
                }}
                aria-hidden="true"
              />

              {NAV.map((item) => {
                const id = item.href.replace('#', '');
                const isActive = activeSection === id;
                return (
                  <li key={item.href} data-section={id}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`relative z-10 block px-4 py-2 text-xs font-medium tracking-tight rounded-full transition-colors duration-200 ${
                        isActive ? 'text-white' : 'text-[#3a3a3a] hover:text-[#0d0d0d]'
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase bg-white/80 backdrop-blur-md border border-[#0d0d0d]/10 shadow-sm text-[#0d0d0d] active:scale-95 transition-transform"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Overlay with clip-path */}
      <div
        className={`fixed inset-0 z-50 bg-[#f4f2ee] flex flex-col justify-between p-8 md:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto [clip-path:circle(150%_at_calc(100%-40px)_40px)]'
            : 'opacity-0 pointer-events-none [clip-path:circle(0%_at_calc(100%-40px)_40px)]'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="font-mono text-xs tracking-widest text-[#77756f]">MENU</div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="w-10 h-10 rounded-full border border-[#0d0d0d]/15 flex items-center justify-center text-sm font-mono hover:bg-[#0d0d0d] hover:text-white transition-colors"
            aria-label="Close navigation menu"
          >
            ✕
          </button>
        </div>

        <nav aria-label="Mobile Navigation" className="my-auto py-8">
          <ul className="space-y-4">
            {NAV.map((item, idx) => (
              <li
                key={item.href}
                className="transform transition-all duration-500"
                style={{
                  transitionDelay: `${mobileMenuOpen ? idx * 45 + 100 : 0}ms`,
                  transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                  opacity: mobileMenuOpen ? 1 : 0,
                }}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="flex items-baseline gap-4 group py-2"
                >
                  <span className="font-mono text-xs text-[#a9a6a0] group-hover:text-[#0d0d0d] transition-colors">
                    {item.index}
                  </span>
                  <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0d0d0d] group-hover:translate-x-2 transition-transform">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-[#0d0d0d]/10 pt-6 flex flex-col gap-2 font-mono text-xs text-[#77756f]">
          <div>{PROFILE.email}</div>
          <div className="text-[10px] text-[#a9a6a0]">Press ESC to close</div>
        </div>
      </div>
    </>
  );
}
