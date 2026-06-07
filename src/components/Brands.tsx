import { useRef } from "react";
import "./styles/Brands.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Brand {
  id: string;
  logo: React.ReactNode;
}

const brandList: Brand[] = [
  {
    id: "bigmart",
    logo: (
      <svg viewBox="0 0 160 50" className="brand-svg-logo">
        <text x="10" y="38" className="bigmart-text-logo" fontFamily="'Inter', 'Arial Black', sans-serif" fontWeight="900" fontSize="38" letterSpacing="-2px">
          <tspan className="big-part" fill="currentColor">Big</tspan>
          <tspan className="mart-part" fill="currentColor">mart</tspan>
        </text>
      </svg>
    ),
  },
  {
    id: "boatslab",
    logo: (
      <svg viewBox="0 0 180 50" className="brand-svg-logo">
        <g className="boatslab-icon" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 32h26l-3-8H15l-3 8z" />
          <path d="M25 24V14l-5 4h5" />
          <circle cx="25" cy="28" r="1.5" fill="currentColor" />
        </g>
        <text x="52" y="36" className="boatslab-text" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="24" letterSpacing="0.5px" fill="currentColor">
          BoatsLab
        </text>
      </svg>
    ),
  },
  {
    id: "tulip",
    logo: (
      <svg viewBox="0 0 160 50" className="brand-svg-logo">
        <g className="tulip-icon" fill="currentColor">
          <path d="M22 12c-3 0-5 3-5 7 0 3 2 5 5 5s5-2 5-5c0-4-2-7-5-7z" />
          <path d="M17 19c0 3 2 5 5 5s5-2 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M22 24v12" fill="none" stroke="currentColor" strokeWidth="2" />
        </g>
        <text x="42" y="36" className="tulip-text" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="26" letterSpacing="2px" fill="currentColor">
          TULIP
        </text>
      </svg>
    ),
  },
  {
    id: "janaki",
    logo: (
      <svg viewBox="0 0 180 50" className="brand-svg-logo">
        <g className="janaki-icon" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="10" y="12" width="26" height="26" rx="3" />
          <path d="M10 21h26M10 30h26M19 12v26M28 12v26" />
        </g>
        <text x="48" y="36" className="janaki-text" fontFamily="'Inter', sans-serif" fontWeight="850" fontSize="26" letterSpacing="1.5px" fill="currentColor">
          JANAKI
        </text>
      </svg>
    ),
  },
  {
    id: "makita",
    logo: (
      <svg viewBox="0 0 160 50" className="brand-svg-logo">
        <text x="10" y="38" className="makita-text" fontFamily="'Impact', 'Arial Black', sans-serif" fontStyle="italic" fontWeight="900" fontSize="38" letterSpacing="-1px">
          <tspan className="makita-part" fill="currentColor">makita</tspan>
        </text>
      </svg>
    ),
  },
  {
    id: "unilab",
    logo: (
      <svg viewBox="0 0 180 50" className="brand-svg-logo">
        <g className="unilab-icon" stroke="currentColor" strokeWidth="3" fill="none">
          <circle cx="25" cy="25" r="18" className="unilab-circle" />
          <path d="M18 20v8a7 7 0 0 0 14 0v-8" className="unilab-u" strokeWidth="4" />
        </g>
        <text x="55" y="36" className="unilab-text" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="28" letterSpacing="1px" fill="currentColor">
          UNILAB
        </text>
      </svg>
    ),
  },
  {
    id: "figma",
    logo: (
      <svg viewBox="0 0 140 50" className="brand-svg-logo">
        <g className="figma-icon" fill="currentColor">
          <path className="figma-p1" d="M18 14.5c0-2.5-2-4.5-4.5-4.5S9 12 9 14.5s2 4.5 4.5 4.5h4.5v-4.5z" />
          <path className="figma-p2" d="M9 23.5c0-2.5 2-4.5 4.5-4.5H18v9h-4.5c-2.5 0-4.5-2-4.5-4.5z" />
          <path className="figma-p3" d="M9 32.5c0-2.5 2-4.5 4.5-4.5h4.5v4.5c0 2.5-2 4.5-4.5 4.5S9 35 9 32.5z" />
          <path className="figma-p4" d="M18 19h4.5c2.5 0 4.5-2 4.5-4.5S25 10 22.5 10H18v9z" />
          <path className="figma-p5" d="M18 28h4.5c2.5 0 4.5-2 4.5-4.5S25 19 22.5 19H18v9z" />
        </g>
        <text x="36" y="36" className="figma-text" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="26" letterSpacing="-0.5px" fill="currentColor">
          Figma
        </text>
      </svg>
    ),
  },
  {
    id: "photoshop",
    logo: (
      <svg viewBox="0 0 170 50" className="brand-svg-logo">
        <rect x="10" y="10" width="30" height="30" rx="4" fill="none" stroke="currentColor" strokeWidth="2.5" className="ps-rect" />
        <text x="16" y="31" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="16" fill="currentColor" className="ps-letters">Ps</text>
        <text x="50" y="36" className="ps-text" fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="24" letterSpacing="0.5px" fill="currentColor">
          Photoshop
        </text>
      </svg>
    ),
  },
  {
    id: "illustrator",
    logo: (
      <svg viewBox="0 0 170 50" className="brand-svg-logo">
        <rect x="10" y="10" width="30" height="30" rx="4" fill="none" stroke="currentColor" strokeWidth="2.5" className="ai-rect" />
        <text x="17" y="31" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="16" fill="currentColor" className="ai-letters">Ai</text>
        <text x="50" y="36" className="ai-text" fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="24" letterSpacing="0.5px" fill="currentColor">
          Illustrator
        </text>
      </svg>
    ),
  },
  {
    id: "blender",
    logo: (
      <svg viewBox="0 0 160 50" className="brand-svg-logo">
        <g className="blender-icon" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="22" cy="25" r="10" />
          <circle cx="22" cy="25" r="3.5" fill="currentColor" />
          <path d="M22 15V8M22 35v7M12 25H5M39 25h-7" />
        </g>
        <text x="44" y="36" className="blender-text" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="24" letterSpacing="-0.5px" fill="currentColor">
          blender
        </text>
      </svg>
    ),
  },
];

const Brands = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const flexRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!flexRef.current || !containerRef.current) return;

    gsap.fromTo(
      flexRef.current,
      { x: -1500 },
      {
        x: -100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div className="brands-section" ref={containerRef}>
      <div className="brands-container">
        <div className="brands-flex" ref={flexRef}>
          {brandList.map((brand, index) => (
            <div className={`brand-logo-card brand-${brand.id}`} key={index}>
              {brand.logo}
            </div>
          ))}
          {/* Duplicate to ensure a continuous layout */}
          {brandList.map((brand, index) => (
            <div className={`brand-logo-card duplicate brand-${brand.id}`} key={`dup-${index}`}>
              {brand.logo}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
