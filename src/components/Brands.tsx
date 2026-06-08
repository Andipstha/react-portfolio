import { useEffect, useRef } from "react";
import "./styles/Brands.css";

import logoDelite from "../assets/logo_delite.webp";
import logoSujal from "../assets/logo_sujal.webp";
import logoSafal from "../assets/logo_safal.png";
import logoTulip from "../assets/logo_tulip.webp";
import logoBigmart from "../assets/logo_bigmart.webp";
import logoMakita from "../assets/logo_makita.png";
import logoBoatslab from "../assets/logo_boatslab.png";
import logoJanaki from "../assets/logo_janaki.webp";
import logoD20labs from "../assets/logo_d20labs.webp";



interface Brand {
  id: string;
  name: string;
  logo: string;
}

const brandList: Brand[] = [
  { id: "delite", name: "Delite", logo: logoDelite },
  { id: "sujal", name: "Sujal", logo: logoSujal },
  { id: "safal", name: "Safal", logo: logoSafal },
  { id: "tulip", name: "Tulip", logo: logoTulip },
  { id: "bigmart", name: "Bigmart", logo: logoBigmart },
  { id: "makita", name: "Makita", logo: logoMakita },
  { id: "boatslab", name: "BoatsLab", logo: logoBoatslab },
  { id: "janaki", name: "Janaki", logo: logoJanaki },
  { id: "d20labs", name: "D20Labs", logo: logoD20labs },
];

// ── Constants ────────────────────────────────────────────────────────────────
const BASE_SPEED = 60;          // px / second — idle auto-scroll
const SCROLL_SPEED = 180;       // px / second — while user is scrolling
const RESUME_DELAY_MS = 400;    // ms after last wheel event before reverting to idle

/**
 * Direction convention
 *   +1 → content moves LEFT  (x increases → translateX goes more negative)
 *   -1 → content moves RIGHT (x decreases → translateX goes less negative)
 *
 * Default idle direction = -1 (RIGHT) — "opposite direction" from before.
 * Scroll-down overrides to +1 (LEFT), scroll-up overrides to -1 (RIGHT).
 */
const DEFAULT_DIR = -1;

const Brands = () => {
  // Two copies → seamless wrap in both directions
  const track = [...brandList, ...brandList];

  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const xRef = useRef(0);           // current pixel offset (always ≥ 0)
  const dirRef = useRef(DEFAULT_DIR); // +1 left | -1 right
  const speedRef = useRef(BASE_SPEED);  // current speed
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const halfWidthRef = useRef(0);

  useEffect(() => {
    const inner = innerRef.current;
    const wrapper = wrapperRef.current;
    if (!inner) return;

    // ── Measure one copy width ────────────────────────────────────────
    const measure = () => {
      halfWidthRef.current = inner.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(inner);

    // ── RAF loop ──────────────────────────────────────────────────────
    const tick = (now: number) => {
      if (lastTimeRef.current !== null) {
        const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05); // cap dt at 50 ms
        const half = halfWidthRef.current;

        if (half > 0) {
          xRef.current += dirRef.current * speedRef.current * dt;

          // Seamless wrap — works for both directions
          if (xRef.current >= half) xRef.current -= half;
          if (xRef.current < 0) xRef.current += half;

          inner.style.transform = `translateX(${-xRef.current}px)`;
        }
      }
      lastTimeRef.current = now;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    // ── Wheel: change direction & speed while scrolling ───────────────
    const onWheel = (e: WheelEvent) => {
      // deltaY > 0 = scrolling DOWN → move LEFT (+1)
      // deltaY < 0 = scrolling UP   → move RIGHT (-1)
      dirRef.current = e.deltaY > 0 ? 1 : -1;
      speedRef.current = SCROLL_SPEED;
      lastTimeRef.current = null; // reset dt to avoid spike

      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      resumeTimer.current = setTimeout(() => {
        // Revert to idle auto-scroll after user stops scrolling
        dirRef.current = DEFAULT_DIR;
        speedRef.current = BASE_SPEED;
        lastTimeRef.current = null;
      }, RESUME_DELAY_MS);
    };

    window.addEventListener("wheel", onWheel, { passive: true });

    // ── Hover: pause ──────────────────────────────────────────────────
    const onEnter = () => { speedRef.current = 0; };
    const onLeave = () => {
      speedRef.current = BASE_SPEED;
      lastTimeRef.current = null;
    };

    wrapper?.addEventListener("mouseenter", onEnter);
    wrapper?.addEventListener("mouseleave", onLeave);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      ro.disconnect();
      window.removeEventListener("wheel", onWheel);
      wrapper?.removeEventListener("mouseenter", onEnter);
      wrapper?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="brands-section" aria-label="Client Brands">
      <div className="brands-marquee-wrapper" ref={wrapperRef}>
        {/* Fade-edge masks */}
        <div className="brands-fade-left" />
        <div className="brands-fade-right" />

        <div className="brands-track-outer">
          <div className="brands-track" ref={innerRef}>
            {track.map((brand, i) => (
              <div
                className={`brand-card brand-${brand.id}`}
                key={`${brand.id}-${i}`}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="brand-img"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
