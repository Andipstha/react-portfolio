import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type SplitMode = "chars" | "words";

export interface SimpleSplitText {
  chars: HTMLElement[];
  words: HTMLElement[];
  lines?: HTMLElement[];
  revert: () => void;
}

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  split?: SplitText;
}

gsap.registerPlugin(ScrollTrigger);

export class SplitText {
  chars: HTMLElement[] = [];
  words: HTMLElement[] = [];
  lines: HTMLElement[] = [];
  private originalHTML: string;
  private element: HTMLElement;

  constructor(element: HTMLElement, options: { type?: string; linesClass?: string } = {}) {
    this.element = element;
    this.originalHTML = element.innerHTML;

    const type = options.type || "chars,words,lines";
    const linesClass = options.linesClass || "";

    const hasChars = type.includes("chars");
    const hasWords = type.includes("words");
    const hasLines = type.includes("lines");

    function getFragments(
      node: Node,
      parentClasses: string[] = [],
      parentStyle = "",
      parentAttrs: Record<string, string> = {}
    ): Array<{
      text: string;
      className: string;
      style: string;
      attributes: Record<string, string>;
    }> {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || "";
        if (text) {
          return [{
            text,
            className: parentClasses.join(" "),
            style: parentStyle,
            attributes: { ...parentAttrs }
          }];
        }
        return [];
      }

      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        if (el.tagName === "SCRIPT" || el.tagName === "STYLE") {
          return [];
        }

        const currentClasses = [...parentClasses];
        if (el.className) {
          currentClasses.push(...el.className.split(/\s+/).filter(Boolean));
        }

        let currentStyle = parentStyle;
        const inlineStyle = el.getAttribute("style");
        if (inlineStyle) {
          currentStyle = (currentStyle ? currentStyle + ";" : "") + inlineStyle;
        }

        const currentAttrs = { ...parentAttrs };
        for (let i = 0; i < el.attributes.length; i++) {
          const attr = el.attributes[i];
          if (attr.name !== "class" && attr.name !== "style") {
            currentAttrs[attr.name] = attr.value;
          }
        }

        const res: Array<{
          text: string;
          className: string;
          style: string;
          attributes: Record<string, string>;
        }> = [];
        node.childNodes.forEach(child => {
          res.push(...getFragments(child, currentClasses, currentStyle, currentAttrs));
        });
        return res;
      }

      return [];
    }

    const fragments: Array<{
      text: string;
      className: string;
      style: string;
      attributes: Record<string, string>;
    }> = [];
    element.childNodes.forEach(child => {
      fragments.push(...getFragments(child, [], "", {}));
    });

    element.innerHTML = "";

    interface WordItem {
      type: "word";
      element: HTMLElement;
      chars: HTMLElement[];
      lineIndex: number;
    }

    interface SpaceItem {
      type: "space";
      text: string;
      element: Text;
    }

    const items: (WordItem | SpaceItem)[] = [];
    const allWordSpans: HTMLElement[] = [];
    const spanToWordItem = new Map<HTMLElement, WordItem>();

    function applyStyling(span: HTMLElement, className: string, styleStr: string, attrs: Record<string, string>) {
      if (className) {
        span.className = className;
      }
      if (styleStr) {
        span.setAttribute("style", styleStr);
      }
      for (const [key, val] of Object.entries(attrs)) {
        span.setAttribute(key, val);
      }
      span.style.display = "inline-block";
      if (!span.style.position) {
        span.style.position = "relative";
      }
    }

    fragments.forEach(frag => {
      const tokens = frag.text.split(/(\s+)/).filter(Boolean);
      tokens.forEach(token => {
        if (/\s+/.test(token)) {
          const textNode = document.createTextNode(token);
          element.appendChild(textNode);
          items.push({
            type: "space",
            text: token,
            element: textNode
          });
        } else {
          const wordSpan = document.createElement("span");
          applyStyling(wordSpan, frag.className, frag.style, frag.attributes);

          const charsInWord: HTMLElement[] = [];
          if (hasChars) {
            Array.from(token).forEach(char => {
              const charSpan = document.createElement("span");
              charSpan.textContent = char;
              applyStyling(charSpan, frag.className, frag.style, frag.attributes);
              wordSpan.appendChild(charSpan);
              charsInWord.push(charSpan);
              this.chars.push(charSpan);
            });
          } else {
            wordSpan.textContent = token;
          }

          element.appendChild(wordSpan);
          allWordSpans.push(wordSpan);

          const wordItem: WordItem = {
            type: "word",
            element: wordSpan,
            chars: charsInWord,
            lineIndex: 0
          };
          items.push(wordItem);
          spanToWordItem.set(wordSpan, wordItem);
          if (hasWords) {
            this.words.push(wordSpan);
          }
        }
      });
    });

    if (hasLines && allWordSpans.length > 0) {
      let currentLineIndex = 0;
      let currentTop = allWordSpans[0].offsetTop;

      allWordSpans.forEach(span => {
        const top = span.offsetTop;
        if (Math.abs(top - currentTop) > 8) {
          currentLineIndex++;
          currentTop = top;
        }
        const item = spanToWordItem.get(span);
        if (item) {
          item.lineIndex = currentLineIndex;
        }
      });
    }

    element.innerHTML = "";

    let currentLineDiv: HTMLElement | null = null;
    let lastLineIndex = -1;

    items.forEach(item => {
      if (item.type === "word") {
        if (hasLines) {
          if (item.lineIndex !== lastLineIndex || !currentLineDiv) {
            lastLineIndex = item.lineIndex;
            currentLineDiv = document.createElement("div");
            if (linesClass) {
              currentLineDiv.className = linesClass;
            }
            currentLineDiv.style.display = "block";
            currentLineDiv.style.position = "relative";
            element.appendChild(currentLineDiv);
            this.lines.push(currentLineDiv);
          }
        }

        const container = currentLineDiv || element;

        if (hasWords) {
          container.appendChild(item.element);
        } else {
          item.chars.forEach(charSpan => {
            container.appendChild(charSpan);
          });
        }
      } else {
        const container = currentLineDiv || element;
        container.appendChild(item.element);
      }
    });
  }

  revert() {
    this.element.innerHTML = this.originalHTML;
  }
}

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

// Automatically refresh ScrollTrigger layout when splitText triggers
ScrollTrigger.addEventListener("refresh", () => setSplitText());