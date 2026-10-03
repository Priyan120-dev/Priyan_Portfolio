import React from 'react';

interface SectionHeaderProps {
  index: string;
  tag: string;
  title?: string;
  italicWord?: string;
  className?: string;
}

export function SectionHeader({
  index,
  tag,
  title,
  italicWord,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`${title ? 'mb-12 md:mb-16' : 'mb-6 md:mb-8'} ${className}`}>
      {/* Mono Section Tag: e.g. 03 — Selected work */}
      <div className="font-mono-tag mb-4 flex items-center gap-2 text-xs tracking-wider">
        <span className="font-semibold text-[#0d0d0d]">{index}</span>
        <span className="text-[#a9a6a0]">—</span>
        <span>{tag}</span>
      </div>

      {/* Main Heading with Instrument Serif italic accent word in --mute */}
      {title && (
        <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] tracking-tight text-[#0d0d0d]">
          {title}{' '}
          {italicWord && (
            <span className="font-serif-italic text-[#77756f] text-[1.12em] font-normal">
              {italicWord}
            </span>
          )}
        </h2>
      )}
    </div>
  );
}
