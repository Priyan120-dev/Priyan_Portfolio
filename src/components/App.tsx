'use client';

import React, { useEffect } from 'react';
import { Navigation } from './Navigation';
import { Hero } from './hero/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Work } from './sections/Work';
import { Certifications } from './sections/Certifications';
import { Experience } from './sections/Experience';
import { Achievements } from './sections/Achievements';
import { Contact } from './sections/Contact';

export function App() {
  // Global RevealObserver for any child elements marked with .rv
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.rv:not(.is-in), .rv-mask:not(.is-in)');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-[#f4f2ee]">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Certifications />
        <Experience />
        <Achievements />
        <Contact />
      </main>
    </div>
  );
}
