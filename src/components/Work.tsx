import { useState } from "react";
import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MdClose } from "react-icons/md";

import design1 from "../assets/design1.jpg";
import design2 from "../assets/design2.jpg";
import design3 from "../assets/design3.jpg";
import design4 from "../assets/design4.jpg";
import design5 from "../assets/design5.jpg";

gsap.registerPlugin(useGSAP);

const designWorks = [
  {
    num: "01",
    title: "BoatsLab",
    category: "Product Launch & Art Direction",
    tools: "Adobe Photoshop",
    image: design1,
  },
  {
    num: "02",
    title: "Tulip Appliances",
    category: "Retail Branding & Marketing Campaign",
    tools: "Illustrator, Photoshop, Figma",
    image: design2,
  },
  {
    num: "03",
    title: "Janaki Vinyl Flooring",
    category: "Fintech Platform UI/UX Design",
    tools: "Figma, Illustrator, After Effects",
    image: design3,
  },
  {
    num: "04",
    title: "Makita",
    category: "Packaging & Advertising Design",
    tools: "Illustrator, Photoshop",
    image: design4,
  },
  {
    num: "05",
    title: "Unilab",
    category: "Visual Identity & Confectionery Packaging",
    tools: "Illustrator, Photoshop, Blender",
    image: design5,
  },
];

const Work = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);

  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const workContainer = document.querySelector(".work-container");
      if (!box.length || !workContainer) return;

      const rectLeft = workContainer.getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding = parseInt(window.getComputedStyle(box[0]).padding) / 2 || 0;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`, // Use actual scroll width
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    // Clean up
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <>
      <div className="work-section" id="work">
        <div className="work-container section-container">
          <h2>
            My <span>Work</span>
          </h2>
          <div className="work-flex">
            {designWorks.map((item, index) => (
              <div
                className="work-box"
                key={index}
                onClick={() => {
                  setSelectedImage(item.image);
                  setSelectedTitle(item.title);
                }}
              >
                <div className="work-card">
                  <div className="work-image-wrapper">
                    <img src={item.image} alt={item.title} />
                    <div className="work-image-overlay">
                      <span>Expand View</span>
                    </div>
                  </div>
                  <div className="work-card-info">
                    <div className="work-card-header">
                      <span className="work-card-num">{item.num}</span>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.category}</p>
                      </div>
                    </div>
                    <div className="work-card-tools">
                      <span>{item.tools}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedImage && (
        <div className="lightbox-backdrop" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={() => setSelectedImage(null)}>
              <MdClose />
            </button>
            <img src={selectedImage} alt={selectedTitle || "Design Artwork"} />
            {selectedTitle && <div className="lightbox-caption">{selectedTitle}</div>}
          </div>
        </div>
      )}
    </>
  );
};

export default Work;

