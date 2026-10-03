import React from 'react';

interface TechLogoProps {
  name: string;
  size?: number;
  className?: string;
  showGlow?: boolean;
}

const BRAND_MAP: Record<string, { src: string; glow: string }> = {
  python: { src: '/logos/python.svg', glow: 'rgba(55, 118, 171, 0.2)' },
  javascript: { src: '/logos/javascript.svg', glow: 'rgba(247, 223, 30, 0.2)' },
  typescript: { src: '/logos/typescript.svg', glow: 'rgba(49, 120, 198, 0.2)' },
  cplusplus: { src: '/logos/cplusplus.svg', glow: 'rgba(0, 89, 156, 0.2)' },
  sql: { src: '/logos/postgresql.svg', glow: 'rgba(51, 103, 145, 0.2)' },
  react: { src: '/logos/react.svg', glow: 'rgba(97, 218, 251, 0.2)' },
  nextjs: { src: '/logos/nextjs.svg', glow: 'rgba(0, 0, 0, 0.15)' },
  html5: { src: '/logos/html5.svg', glow: 'rgba(227, 79, 38, 0.2)' },
  css3: { src: '/logos/css3.svg', glow: 'rgba(21, 114, 182, 0.2)' },
  tailwindcss: { src: '/logos/tailwindcss.svg', glow: 'rgba(56, 189, 248, 0.2)' },
  framermotion: { src: '/logos/framermotion.svg', glow: 'rgba(0, 85, 255, 0.2)' },
  threejs: { src: '/logos/threejs.svg', glow: 'rgba(0, 0, 0, 0.2)' },
  nodejs: { src: '/logos/nodejs.svg', glow: 'rgba(51, 153, 51, 0.2)' },
  express: { src: '/logos/express.svg', glow: 'rgba(0, 0, 0, 0.15)' },
  fastapi: { src: '/logos/fastapi.svg', glow: 'rgba(5, 153, 139, 0.2)' },
  mongodb: { src: '/logos/mongodb.svg', glow: 'rgba(71, 162, 72, 0.2)' },
  postgresql: { src: '/logos/postgresql.svg', glow: 'rgba(51, 103, 145, 0.2)' },
  sqlite: { src: '/logos/sqlite.svg', glow: 'rgba(0, 59, 87, 0.2)' },
  firebase: { src: '/logos/firebase.svg', glow: 'rgba(255, 202, 40, 0.2)' },
  supabase: { src: '/logos/supabase.svg', glow: 'rgba(62, 207, 142, 0.2)' },
  gemini: { src: '/logos/gemini.svg', glow: 'rgba(94, 91, 229, 0.25)' },
  git: { src: '/logos/git.svg', glow: 'rgba(240, 80, 50, 0.2)' },
  github: { src: '/logos/github.svg', glow: 'rgba(36, 41, 46, 0.2)' },
  vercel: { src: '/logos/vercel.svg', glow: 'rgba(0, 0, 0, 0.15)' },
  render: { src: '/logos/render.svg', glow: 'rgba(70, 227, 183, 0.2)' },
  netlify: { src: '/logos/netlify.svg', glow: 'rgba(0, 199, 183, 0.2)' },
  google: { src: '/logos/google.svg', glow: 'rgba(66, 133, 244, 0.2)' },
};

export function isBrand(key: string): boolean {
  return key.toLowerCase() in BRAND_MAP;
}

export function TechLogo({ name, size = 24, className = '', showGlow = false }: TechLogoProps) {
  const key = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const brand = BRAND_MAP[key];

  if (brand) {
    return (
      <div
        className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        {showGlow && (
          <div
            className="absolute inset-0 rounded-full blur-md opacity-70 pointer-events-none transition-opacity duration-300"
            style={{ backgroundColor: brand.glow }}
          />
        )}
        <img
          src={brand.src}
          alt={`${name} logo`}
          width={size}
          height={size}
          className="relative z-10 w-full h-full object-contain"
          loading="lazy"
        />
      </div>
    );
  }

  // Concept / Line icons for DSA, REST APIs, JWT, Generative AI, Machine Learning, etc.
  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 text-[#0d0d0d] ${className}`}
      style={{ width: size, height: size }}
    >
      <ConceptIcon concept={key} size={size} />
    </div>
  );
}

function ConceptIcon({ concept, size }: { concept: string; size: number }) {
  const strokeWidth = 1.5;

  if (concept.includes('rest') || concept.includes('api')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
        <rect x="2" y="6" width="20" height="12" rx="4" />
        <path d="M6 12h.01M10 12h.01M14 12h4" />
      </svg>
    );
  }

  if (concept.includes('jwt') || concept.includes('auth')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
        <circle cx="12" cy="16" r="1.5" />
      </svg>
    );
  }

  if (concept.includes('genai') || concept.includes('generative')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
        <path d="M12 2v4m0 12v4M2 12h4m12 0h4" />
        <path d="M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }

  if (concept.includes('ml') || concept.includes('machinelearning')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    );
  }

  if (concept.includes('analysis') || concept.includes('data')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    );
  }

  if (concept.includes('viz') || concept.includes('visualization')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
        <path d="M3 3v18h18" />
        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
      </svg>
    );
  }

  // Default clean concept glyph
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}
