'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { usePrefersReducedMotion } from './hooks';

interface ScrollContextType {
  lenis: Lenis | null;
  scrollToTarget: (target: string | HTMLElement, options?: { offset?: number; immediate?: boolean }) => void;
}

const ScrollContext = createContext<ScrollContextType>({
  lenis: null,
  scrollToTarget: () => {},
});

export const useScroll = () => useContext(ScrollContext);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced || typeof window === 'undefined') {
      return;
    }

    try {
      // Resolve Lenis constructor safely across ESM / CJS bundlers
      const LenisConstructor = (Lenis as unknown as { default?: typeof Lenis }).default || Lenis;
      if (typeof LenisConstructor !== 'function') {
        return;
      }

      const lenis = new LenisConstructor({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
      });

      lenisRef.current = lenis;

      let rafId: number;
      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);

      return () => {
        if (rafId) cancelAnimationFrame(rafId);
        lenis.destroy();
        lenisRef.current = null;
      };
    } catch (err) {
      console.warn('Lenis initialization skipped:', err);
    }
  }, [prefersReduced]);

  const scrollToTarget = (target: string | HTMLElement, options?: { offset?: number; immediate?: boolean }) => {
    if (typeof window === 'undefined') return;

    if (prefersReduced || !lenisRef.current) {
      if (typeof target === 'string') {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    try {
      lenisRef.current.scrollTo(target, {
        offset: options?.offset ?? -40,
        immediate: options?.immediate ?? false,
        duration: 1.1,
      });
    } catch {
      if (typeof target === 'string') {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <ScrollContext.Provider value={{ lenis: lenisRef.current, scrollToTarget }}>
      {children}
    </ScrollContext.Provider>
  );
}
