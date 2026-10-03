'use client';

import React, { useState } from 'react';
import { SKILL_GROUPS, SKILL_FAMILIES, SkillElement } from '@/lib/data';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TechLogo } from '@/components/ui/TechLogo';
import { useInView } from '@/lib/hooks';

export function Skills() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 });
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [activeSkill, setActiveSkill] = useState<SkillElement>(SKILL_GROUPS[0]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`section-padding site-container rv ${isInView ? 'is-in' : ''}`}
    >
      <SectionHeader
        index="02"
        tag="Capabilities & Stack"
        title="The periodic table of my"
        italicWord="stack."
      />

      {/* Family Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 mb-8" role="tablist">
        {SKILL_FAMILIES.map((family) => {
          const isActive = selectedFamily === family;
          return (
            <button
              key={family}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedFamily(family)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-tight transition-all duration-300 ${
                isActive
                  ? 'bg-[#0d0d0d] text-white shadow-sm'
                  : 'bg-white/80 text-[#3a3a3a] border border-[#0d0d0d]/10 hover:border-[#0d0d0d]/30'
              }`}
            >
              {family}
            </button>
          );
        })}
      </div>

      {/* Main Container: Periodic Grid + Sticky Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
        {/* Periodic Table Grid: 4 cols mobile, 8 cols desktop */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 sm:gap-3">
          {SKILL_GROUPS.map((skill, idx) => {
            const cols = 8;
            const row = Math.floor(idx / cols);
            const col = idx % cols;
            const delay = (row + col) * 40;

            const isMatching = selectedFamily === 'All' || skill.family === selectedFamily;
            const isCurrent = activeSkill.name === skill.name;

            return (
              <button
                key={skill.name}
                type="button"
                onMouseEnter={() => setActiveSkill(skill)}
                onFocus={() => setActiveSkill(skill)}
                onClick={() => setActiveSkill(skill)}
                style={{
                  transitionDelay: `${isInView ? delay : 0}ms`,
                }}
                className={`group relative aspect-square p-2 rounded-2xl flex flex-col justify-between text-left transition-all duration-300 ${
                  isMatching
                    ? 'opacity-100 scale-100 cursor-pointer'
                    : 'opacity-25 grayscale scale-95 pointer-events-none'
                } ${
                  isCurrent
                    ? 'bg-white shadow-[0_12px_28px_-6px_rgba(13,13,13,0.15)] ring-2 ring-[#0d0d0d] -translate-y-1'
                    : 'bg-white/80 hover:bg-white border border-[#0d0d0d]/10 hover:border-[#0d0d0d]/25 hover:shadow-md hover:-translate-y-0.5'
                }`}
              >
                {/* Atomic number & Family indicator */}
                <div className="flex items-center justify-between w-full font-mono text-[9px] text-[#77756f]">
                  <span>{skill.number}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d]/30 group-hover:bg-[#0d0d0d] transition-colors" />
                </div>

                {/* 2-letter Symbol */}
                <div className="text-center font-bold text-lg sm:text-xl font-mono text-[#0d0d0d] group-hover:scale-110 transition-transform">
                  {skill.symbol}
                </div>

                {/* Skill Name */}
                <div className="text-[10px] font-medium text-[#3a3a3a] truncate text-center w-full">
                  {skill.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Sticky Inspector Panel (320px wide) */}
        <aside
          aria-label="Skill details inspector"
          className="card-base p-6 lg:sticky lg:top-24 w-full flex flex-col justify-between border border-[#0d0d0d]/10"
        >
          <div>
            <div className="font-mono text-xs text-[#77756f] uppercase tracking-widest mb-4 flex items-center justify-between">
              <span>Element Inspector</span>
              <span>#{activeSkill.number}</span>
            </div>

            {/* Large 150px Logo with Pop Animation */}
            <div className="w-full h-44 rounded-2xl bg-neutral-100 border border-[#0d0d0d]/5 flex items-center justify-center relative overflow-hidden mb-6 group">
              <div
                key={activeSkill.name}
                className="animate-[scalePop_0.4s_cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center"
              >
                <TechLogo
                  name={activeSkill.logoKey}
                  size={110}
                  showGlow
                  className="filter drop-shadow-md"
                />
              </div>

              {/* Background watermark symbol */}
              <div className="absolute right-2 bottom-1 font-mono text-5xl font-black text-neutral-300/40 select-none pointer-events-none">
                {activeSkill.symbol}
              </div>
            </div>

            {/* Name, Symbol & Family */}
            <div className="mb-4">
              <div className="flex items-baseline gap-2 mb-1">
                <h3 className="heading-display text-2xl font-bold text-[#0d0d0d]">
                  {activeSkill.name}
                </h3>
                <span className="font-mono text-sm text-[#77756f]">
                  ({activeSkill.symbol})
                </span>
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#0d0d0d]/5 text-[#3a3a3a] text-xs font-mono">
                {activeSkill.family}
              </span>
            </div>

            {/* Associated Projects */}
            <div className="border-t border-[#0d0d0d]/10 pt-4 mt-4">
              <div className="font-mono text-[10px] text-[#a9a6a0] uppercase tracking-wider mb-2">
                Applied in Projects & Work
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeSkill.projects.map((proj) => (
                  <span
                    key={proj}
                    className="text-xs px-2.5 py-1 rounded-md bg-white border border-[#0d0d0d]/10 text-[#0d0d0d] font-medium"
                  >
                    {proj}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-[#0d0d0d]/10 flex items-center justify-between text-[11px] font-mono text-[#77756f]">
            <span>Type: {activeSkill.isBrand ? 'Official Technology' : 'Engineering Principle'}</span>
            <span>At. No: {activeSkill.number}</span>
          </div>
        </aside>
      </div>

      <style jsx>{`
        @keyframes scalePop {
          0% {
            transform: scale(0.85);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
