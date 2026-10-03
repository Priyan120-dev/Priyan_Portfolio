'use client';

import React, { useState } from 'react';
import { PROJECTS, Project } from '@/lib/data';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TechLogo } from '@/components/ui/TechLogo';
import { useInView } from '@/lib/hooks';

export function Work() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 });
  const [activeId, setActiveId] = useState<string>(PROJECTS[0].id);

  return (
    <section
      id="work"
      ref={sectionRef}
      className={`section-padding site-container rv ${isInView ? 'is-in' : ''}`}
    >
      <SectionHeader
        index="03"
        tag="Selected Work"
        title="Products, architectures, and platforms I have"
        italicWord="shipped."
      />

      {/* Accordion Gallery */}
      <div className="hidden lg:flex flex-row gap-3 h-[min(78svh,620px)] w-full">
        {PROJECTS.map((project) => {
          const isOpen = activeId === project.id;

          return (
            <div
              key={project.id}
              tabIndex={0}
              role="button"
              aria-expanded={isOpen}
              aria-label={`${project.title} project panel`}
              onClick={() => setActiveId(project.id)}
              onFocus={() => setActiveId(project.id)}
              onMouseEnter={() => setActiveId(project.id)}
              style={{
                flex: isOpen ? 8 : 1,
              }}
              className={`relative card-base overflow-hidden transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d] ${
                isOpen ? 'bg-white p-8' : 'bg-neutral-100 hover:bg-neutral-200/70 p-4'
              }`}
            >
              {isOpen ? (
                /* EXPANDED PANEL */
                <div className="w-full h-full flex flex-row gap-8 animate-[fadeIn_0.5s_cubic-bezier(0.16,1,0.3,1)]">
                  {/* Left Column: Metadata & Features */}
                  <div className="flex-1 flex flex-col justify-between overflow-y-auto pr-2">
                    <div>
                      {/* Number & Kicker */}
                      <div className="font-mono text-xs text-[#77756f] uppercase tracking-wider mb-2 flex items-center gap-2">
                        <span className="font-bold text-[#0d0d0d]">{project.index}</span>
                        <span>/</span>
                        <span>{project.kicker}</span>
                      </div>

                      {/* Project Title */}
                      <h3 className="heading-display text-3xl font-bold text-[#0d0d0d] mb-4">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[#3a3a3a] text-sm leading-relaxed mb-6 font-normal">
                        {project.description}
                      </p>

                      {/* 2-Column Feature List */}
                      <div className="mb-6">
                        <div className="font-mono text-[10px] text-[#a9a6a0] uppercase tracking-wider mb-2">
                          Key Architecture & Features
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#3a3a3a]">
                          {project.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#0d0d0d] font-mono mt-0.5">•</span>
                              <span className="leading-snug">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Chips */}
                      <div>
                        <div className="font-mono text-[10px] text-[#a9a6a0] uppercase tracking-wider mb-2">
                          Stack
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 border border-[#0d0d0d]/10 text-xs font-medium text-[#0d0d0d]"
                            >
                              <TechLogo name={t} size={14} />
                              <span>{t}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action CTAs */}
                    <div className="pt-6 border-t border-[#0d0d0d]/10 flex items-center gap-3 mt-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-xs"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View on GitHub ↗
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary text-xs"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Live Demo ↗
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Illustrative Mini-UI */}
                  <div className="flex-1 rounded-2xl bg-[#0d0d0d] text-white p-6 relative overflow-hidden flex flex-col justify-between shadow-inner">
                    {/* Badge: Illustrative UI */}
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-3 z-10">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-mono text-[10px] tracking-wider uppercase text-neutral-400">
                          Interactive Preview
                        </span>
                      </div>
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 uppercase tracking-widest">
                        Illustrative UI
                      </span>
                    </div>

                    {/* Component Visualization based on UI type */}
                    <div className="my-auto py-4">
                      <IllustrativeUI type={project.uiType} />
                    </div>

                    {/* Mini-UI Footer */}
                    <div className="border-t border-neutral-800 pt-3 flex items-center justify-between font-mono text-[10px] text-neutral-500 z-10">
                      <span>SYS · {project.title.toUpperCase().replace(/\s+/g, '_')}</span>
                      <span>ACTIVE</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* COLLAPSED SLIM SPINE */
                <div className="w-full h-full flex flex-col justify-between items-center py-6 select-none">
                  {/* Project Number */}
                  <span className="font-mono text-xs font-bold text-[#0d0d0d]">
                    {project.index}
                  </span>

                  {/* Vertical Rotated Title */}
                  <div className="[writing-mode:vertical-rl] rotate-180 font-bold text-sm tracking-tight text-[#3a3a3a] whitespace-nowrap">
                    {project.title}
                  </div>

                  {/* Rotating "+" Button */}
                  <div className="w-8 h-8 rounded-full border border-[#0d0d0d]/20 flex items-center justify-center font-mono text-xs text-[#0d0d0d] group-hover:rotate-90 transition-transform duration-300">
                    +
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Vertical Accordion */}
      <div className="lg:hidden flex flex-col gap-4">
        {PROJECTS.map((project) => {
          const isOpen = activeId === project.id;

          return (
            <div
              key={project.id}
              className="card-base p-6 transition-all duration-300 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setActiveId(isOpen ? '' : project.id)}
                className="w-full flex items-center justify-between text-left"
              >
                <div>
                  <div className="font-mono text-xs text-[#77756f] uppercase tracking-wider mb-1">
                    {project.index} — {project.kicker}
                  </div>
                  <h3 className="heading-display text-xl font-bold text-[#0d0d0d]">
                    {project.title}
                  </h3>
                </div>
                <div
                  className={`w-8 h-8 rounded-full border border-[#0d0d0d]/20 flex items-center justify-center font-mono text-sm text-[#0d0d0d] transition-transform duration-300 ${
                    isOpen ? 'rotate-45' : ''
                  }`}
                >
                  +
                </div>
              </button>

              {isOpen && (
                <div className="mt-6 pt-6 border-t border-[#0d0d0d]/10 space-y-6 animate-[fadeIn_0.3s_ease]">
                  <p className="text-sm text-[#3a3a3a] leading-relaxed">
                    {project.description}
                  </p>

                  <div>
                    <div className="font-mono text-[10px] text-[#a9a6a0] uppercase tracking-wider mb-2">
                      Key Highlights
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#3a3a3a]">
                      {project.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#0d0d0d] font-mono">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Illustrative mini-UI container */}
                  <div className="rounded-xl bg-[#0d0d0d] text-white p-4">
                    <div className="flex items-center justify-between mb-3 text-[10px] font-mono text-neutral-400">
                      <span>Simulated Interface</span>
                      <span className="bg-neutral-800 px-2 py-0.5 rounded text-[8px] uppercase">
                        Illustrative UI
                      </span>
                    </div>
                    <IllustrativeUI type={project.uiType} />
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-xs"
                      >
                        GitHub ↗
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-xs"
                      >
                        Live Demo ↗
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

function IllustrativeUI({ type }: { type: Project['uiType'] }) {
  if (type === 'stadium') {
    return (
      <div className="space-y-3 font-mono text-xs text-neutral-300">
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
            <div className="text-[10px] text-neutral-500">AGENT STATUS</div>
            <div className="text-white font-semibold flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Evac Engine Active
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
            <div className="text-[10px] text-neutral-500">DIJKSTRA ROUTE</div>
            <div className="text-white font-semibold mt-0.5">0.42 ms / Gate C</div>
          </div>
        </div>
        <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
          <div className="flex justify-between text-[10px] text-neutral-400 mb-1">
            <span>Zone B Density</span>
            <span>72% Nominal</span>
          </div>
          <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
            <div className="w-[72%] h-full bg-neutral-400" />
          </div>
        </div>
        <div className="flex items-center justify-between text-[11px] p-2 bg-neutral-800/60 rounded border border-neutral-700">
          <span>Human Approval Gate</span>
          <span className="text-emerald-400 font-bold">VERIFIED ✓</span>
        </div>
      </div>
    );
  }

  if (type === 'adaptiq') {
    return (
      <div className="space-y-3 font-mono text-xs text-neutral-300">
        <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
          <div className="text-[10px] text-neutral-500">STUDENT CURRICULUM</div>
          <div className="text-white font-semibold mt-0.5">B.Tech AI & Data Science</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 rounded bg-neutral-800/80 border border-neutral-700">
            <div className="text-[9px] text-neutral-400">RETENTION RATE</div>
            <div className="text-lg font-bold text-white">91.4%</div>
          </div>
          <div className="p-2 rounded bg-neutral-800/80 border border-neutral-700">
            <div className="text-[9px] text-neutral-400">GEMINI MODEL</div>
            <div className="text-lg font-bold text-white">Active</div>
          </div>
        </div>
        <div className="p-2 bg-neutral-900 rounded border border-neutral-800 text-[10px] space-y-1">
          <div className="text-neutral-500">ADAPTIVE TOPIC PATH</div>
          <div className="text-neutral-300">Neural Graph &gt; Backpropagation &gt; Evaluation</div>
        </div>
      </div>
    );
  }

  if (type === 'sentinel') {
    return (
      <div className="space-y-3 font-mono text-xs text-neutral-300">
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-center">
            <div className="text-[9px] text-neutral-500">UPTIME</div>
            <div className="text-white font-bold">99.98%</div>
          </div>
          <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-center">
            <div className="text-[9px] text-neutral-500">LATENCY</div>
            <div className="text-white font-bold">3.8 ms</div>
          </div>
          <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-center">
            <div className="text-[9px] text-neutral-500">ALERTS</div>
            <div className="text-white font-bold">0 Pending</div>
          </div>
        </div>
        <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 font-mono text-[10px] space-y-1">
          <div className="text-neutral-400 flex items-center justify-between">
            <span>POST /api/v1/telemetry</span>
            <span className="text-emerald-400">200 OK</span>
          </div>
          <div className="text-neutral-500 flex items-center justify-between">
            <span>GET /metrics/system</span>
            <span className="text-emerald-400">200 OK</span>
          </div>
        </div>
        <div className="h-6 flex items-end gap-1 px-1">
          {[40, 65, 30, 80, 50, 90, 75, 45, 60, 85, 35, 95].map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-neutral-600 rounded-t-sm"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (type === 'portfolio') {
    return (
      <div className="space-y-3 font-mono text-xs text-neutral-300">
        <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-between">
          <span>Three.js Canvas</span>
          <span className="text-neutral-400 text-[10px]">60 FPS · WebGL</span>
        </div>
        <div className="h-20 border border-dashed border-neutral-700 rounded-lg flex items-center justify-center relative overflow-hidden bg-neutral-950">
          <div className="w-12 h-12 border border-neutral-500 rounded-full animate-spin [animation-duration:8s] flex items-center justify-center">
            <div className="w-6 h-6 border border-neutral-400 rounded" />
          </div>
          <span className="absolute bottom-1 right-2 text-[9px] text-neutral-600">
            3D Spatial Render
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="p-1.5 bg-neutral-900 rounded border border-neutral-800">
            Shaders: PBR Standard
          </div>
          <div className="p-1.5 bg-neutral-900 rounded border border-neutral-800">
            Asset Size: 130 kB
          </div>
        </div>
      </div>
    );
  }

  // coldchain
  return (
    <div className="space-y-3 font-mono text-xs text-neutral-300">
      <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-between">
        <div>
          <div className="text-[9px] text-neutral-500">CHAMBER TEMPERATURE</div>
          <div className="text-2xl font-bold text-white mt-0.5">3.4°C</div>
        </div>
        <div className="text-right">
          <span className="inline-block px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-800">
            SAFE [2°C - 8°C]
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-[10px]">
        <div className="p-2 bg-neutral-900 rounded border border-neutral-800">
          <span className="text-neutral-500 block">SENSOR</span>
          <span className="text-white">DS18B20 1-Wire</span>
        </div>
        <div className="p-2 bg-neutral-900 rounded border border-neutral-800">
          <span className="text-neutral-500 block">BOARD</span>
          <span className="text-white">ESP32 Wi-Fi</span>
        </div>
      </div>
      <div className="p-2 bg-neutral-900 rounded border border-neutral-800 text-[10px] flex justify-between">
        <span>Blynk Cloud Sync</span>
        <span className="text-neutral-400">Every 1000ms</span>
      </div>
    </div>
  );
}
