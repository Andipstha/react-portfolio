import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type SplitMode = "chars" | "words";

export interface SimpleSplitText {
  chars: HTMLElement[];
  words: HTMLElement[];
  revert: () => void;
}

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  split?: SimpleSplitText;
}

gsap.registerPlugin(ScrollTrigger);

function resolveTargets(targets: Array<string | HTMLElement>) {
  return targets
    .map((target) =>
      typeof target === "string"
        ? (document.querySelector(target) as HTMLElement | null)
        : target
    )
    .filter((target): target is HTMLElement => target !== null);
}

function splitElementText(element: HTMLElement, mode: SplitMode): SimpleSplitText {
  const originalHTML = element.innerHTML;
  const originalText = element.textContent ?? "";
  const fragments: HTMLElement[] = [];

  element.innerHTML = "";

  if (mode === "chars") {
    Array.from(originalText).forEach((char) => {
      const fragment = document.createElement("span");
      fragment.style.display = "inline-block";
      fragment.textContent = char === " " ? "\u00A0" : char;
      fragments.push(fragment);
      element.appendChild(fragment);
    });
  } else {
    const parts = originalText.split(/(\s+)/).filter((part) => part.length > 0);
    parts.forEach((part) => {
      if (/\s+/.test(part)) {
        element.appendChild(document.createTextNode(part));
        return;
      }

      const fragment = document.createElement("span");
      fragment.style.display = "inline-block";
      fragment.textContent = part;
      fragments.push(fragment);
      element.appendChild(fragment);
    });
  }

  return {
    chars: fragments,
    words: fragments,
    revert: () => {
      element.innerHTML = originalHTML;
    },
  };
}

export function splitTextTargets(
  targets: Array<string | HTMLElement>,
  mode: SplitMode
) {
  return resolveTargets(targets).map((element) => splitElementText(element, mode));
}

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;
  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    if (para.anim) {
      para.anim.progress(1).kill();
      para.split?.revert();
    }

    para.split = new SplitText(para, {
      type: "lines,words",
      linesClass: "split-line",
    });

    para.anim = gsap.fromTo(
      para.split.words,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });
  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.progress(1).kill();
      title.split?.revert();
    }
    title.split = new SplitText(title, {
      type: "chars,lines",
      linesClass: "split-line",
    });
    title.anim = gsap.fromTo(
      title.split.chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });
}
