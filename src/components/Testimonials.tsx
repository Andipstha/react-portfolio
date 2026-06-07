import { useRef, useEffect } from "react";
import "./styles/Testimonials.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  project: string;
}

const testimonialsData: Testimonial[] = [
  {
    quote:
      "Sandip consistently demonstrates a strong eye for design and a deep understanding of visual communication. His ability to transform ideas into compelling creative solutions, combined with his willingness to learn and adapt, makes him a valuable contributor to any creative team.",
    author: "Dibis Shahi",
    role: "Executive Creative Director",
    company: "D:20 Design Labs",
    project: "Creative Strategy & Art Direction",
  },
  {
    quote:
      "Working with Sandip has been a great experience. He understands how design supports marketing objectives and creates visuals that not only look appealing but also help brands communicate effectively with their audience.",
    author: "Sazeev Shahi",
    role: "Marketing Head",
    company: "D:20 Design Labs",
    project: "Brand Marketing & Visuals",
  },
  {
    quote:
      "Sandip brings creativity, professionalism, and attention to detail to every project. He collaborates well with teams and consistently delivers quality work while maintaining a positive attitude throughout the production process.",
    author: "Manys Shahi",
    role: "Production Manager",
    company: "Evince Studios",
    project: "Production & Collaboration",
  },
  {
    quote:
      "Sandip has a strong sense of visual storytelling and works thoughtfully to align design with content strategy. His creativity and dedication help turn concepts into engaging experiences that resonate with audiences.",
    author: "Kabita Khanal",
    role: "Content Strategist",
    company: "D:20 Design Labs",
    project: "Visual Storytelling & Strategy",
  },
];

const QuoteIcon = () => (
  <svg viewBox="0 0 24 24" className="testimonial-quote-svg" fill="currentColor">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const loopTweenRef = useRef<gsap.core.Tween | null>(null);
  const wheelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHoveringRef = useRef(false);

  // We duplicate the cards so the loop is seamless
  const allCards = [...testimonialsData, ...testimonialsData];

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      // Wait one frame for layout to be painted
      const raf = requestAnimationFrame(() => {
        const halfWidth = track.scrollWidth / 2;

        // Start the infinite auto-scroll loop
        loopTweenRef.current = gsap.to(track, {
          x: `-=${halfWidth}`,
          duration: 28,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x) => parseFloat(x) % halfWidth),
          },
        });
      });

      return () => {
        cancelAnimationFrame(raf);
        loopTweenRef.current?.kill();
      };
    },
    { scope: sectionRef }
  );

  // Mouse-wheel handler: speed up/reverse the loop
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onWheel = (e: WheelEvent) => {
      // Do NOT prevent default — let the page scroll normally.
      // We only piggyback on the event to steer the carousel loop speed.
      const loop = loopTweenRef.current;
      if (!loop || !isHoveringRef.current) return;

      // Prefer horizontal delta; fall back to vertical
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const direction = delta > 0 ? 1 : -1;

      // Nudge time scale in the scroll direction
      const currentRate = loop.timeScale();
      const boosted = currentRate + direction * 1.5;
      const clamped = Math.max(-6, Math.min(6, boosted));
      loop.timeScale(clamped);

      // After inactivity, ease back to default speed
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
      wheelTimeoutRef.current = setTimeout(() => {
        gsap.to(loop, { timeScale: 1, duration: 1.2, ease: "power2.out" });
      }, 250);
    };

    const onMouseEnter = () => {
      isHoveringRef.current = true;
    };
    const onMouseLeave = () => {
      isHoveringRef.current = false;
      // Ease back to normal speed when cursor leaves
      if (loopTweenRef.current) {
        gsap.to(loopTweenRef.current, {
          timeScale: 1,
          duration: 1.2,
          ease: "power2.out",
        });
      }
    };

    section.addEventListener("wheel", onWheel, { passive: true });
    section.addEventListener("mouseenter", onMouseEnter);
    section.addEventListener("mouseleave", onMouseLeave);

    return () => {
      section.removeEventListener("wheel", onWheel);
      section.removeEventListener("mouseenter", onMouseEnter);
      section.removeEventListener("mouseleave", onMouseLeave);
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    };
  }, []);

  return (
    <div className="testimonials-section" id="testimonials" ref={sectionRef}>
      <div className="testimonials-header">
        <h2>
          Client <span>Feedback</span>
        </h2>
        <p className="testimonials-subtitle">
          What the people I've worked with have to say
        </p>
      </div>

      <div className="testimonials-track-wrapper">
        {/* Gradient fade-out edges */}
        <div className="testimonials-fade-left" />
        <div className="testimonials-fade-right" />

        <div className="testimonials-track" ref={trackRef}>
          {allCards.map((item, index) => (
            <div className="testimonial-card" key={index}>
              <div className="testimonial-quote-icon">
                <QuoteIcon />
              </div>

              <p className="testimonial-quote-text">"{item.quote}"</p>

              <div className="testimonial-footer">
                <div className="testimonial-info">
                  <h4 className="testimonial-author">{item.author}</h4>
                  <p className="testimonial-role">
                    {item.role},{" "}
                    <span className="testimonial-company">{item.company}</span>
                  </p>
                </div>
                <div className="testimonial-project-tag">
                  <span>{item.project}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="testimonials-hint">
        <span>Scroll to explore</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

export default Testimonials;
