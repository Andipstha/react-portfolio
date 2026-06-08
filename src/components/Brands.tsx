import { useRef, useEffect } from "react";
import "./styles/Brands.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import logoDelite from "../assets/logo_delite.webp";
import logoSujal from "../assets/logo_sujal.webp";
import logoTulip from "../assets/logo_tulip.webp";
import logoBigmart from "../assets/logo_bigmart.webp";
import logoJanaki from "../assets/logo_janaki.webp";
import logoD20labs from "../assets/logo_d20labs.webp";
import logoEvince from "../assets/logo_evince.webp";

gsap.registerPlugin(useGSAP);

interface Brand {
  id: string;
  name: string;
  logo: string;
}

const brandList: Brand[] = [
  { id: "delite",  name: "Delite",  logo: logoDelite  },
  { id: "sujal",   name: "Sujal",   logo: logoSujal   },
  { id: "tulip",   name: "Tulip",   logo: logoTulip   },
  { id: "bigmart", name: "Bigmart", logo: logoBigmart  },
  { id: "janaki",  name: "Janaki",  logo: logoJanaki  },
  { id: "d20labs", name: "D20 Labs",logo: logoD20labs  },
  { id: "evince",  name: "Evince",  logo: logoEvince  },
];

// Duplicate list for a seamless loop
const allBrands = [...brandList, ...brandList];

const Brands = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const tweenRef   = useRef<gsap.core.Tween | null>(null);
  const wheelTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    /** Start the GSAP infinite loop once we know the real track width. */
    const kickoff = () => {
      const halfWidth = track.scrollWidth / 2;
      if (halfWidth <= 0) return;

      tweenRef.current?.kill();

      // from -halfWidth → 0: track drifts right → logos appear to move LEFT-to-RIGHT.
      // On each repeat GSAP snaps back to -halfWidth, which shows identical content
      // (the duplicate set), so the loop is visually seamless — no modifier needed.
      tweenRef.current = gsap.fromTo(
        track,
        { x: -halfWidth },
        {
          x: 0,
          duration: 30,
          ease: "none",
          repeat: -1,
        }
      );
    };

    // Only start after every logo image has finished loading so scrollWidth is correct.
    const images = Array.from(track.querySelectorAll<HTMLImageElement>("img"));
    const pending = images.filter((img) => !img.complete);

    if (pending.length === 0) {
      // All cached / already loaded – still defer one frame so layout is painted
      requestAnimationFrame(kickoff);
    } else {
      let doneCount = 0;
      const onLoad = () => {
        doneCount++;
        if (doneCount >= pending.length) requestAnimationFrame(kickoff);
      };
      pending.forEach((img) => {
        img.addEventListener("load",  onLoad, { once: true });
        img.addEventListener("error", onLoad, { once: true }); // count errors too
      });
    }

    return () => { tweenRef.current?.kill(); };
  }, { scope: sectionRef });

  // Wheel: steer loop speed without blocking page scroll
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onWheel = (e: WheelEvent) => {
      const tween = tweenRef.current;
      if (!tween) return;

      const dir     = e.deltaY > 0 ? 1 : -1;   // scroll-down → speed up leftward
      const current = tween.timeScale();
      tween.timeScale(gsap.utils.clamp(-5, 5, current + dir * 1.8));

      if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
      wheelTimeout.current = setTimeout(() => {
        gsap.to(tween, { timeScale: 1, duration: 1, ease: "power2.out" });
      }, 220);
    };

    // passive: true — we never call preventDefault, so the page scrolls normally
    section.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      section.removeEventListener("wheel", onWheel);
      if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
    };
  }, []);

  return (
    <section className="brands-section" aria-label="Client Brands" ref={sectionRef}>
      <div className="brands-marquee-wrapper">
        <div className="brands-fade-left"  aria-hidden="true" />
        <div className="brands-fade-right" aria-hidden="true" />

        <div className="brands-track" ref={trackRef}>
          {allBrands.map((brand, i) => (
            <div
              className={`brand-card brand-${brand.id}`}
              key={`${brand.id}-${i}`}
              aria-label={brand.name}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="brand-img"
                draggable={false}
                // help browser cache before JS runs
                loading={i < brandList.length ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
