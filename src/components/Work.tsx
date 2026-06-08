import { useState } from "react";
import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import WorkGallery, { type WorkProject } from "./WorkGallery";

import design1 from "../assets/design1.jpg";
import design2 from "../assets/design2.jpg";
import design3 from "../assets/design3.jpg";
import design4 from "../assets/design4.jpg";
import design5 from "../assets/design5.jpg";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ──────────────────────────────────────────────────────────────────────
   WORK DATA
   Each project has a `thumbnail` shown on the card and a `gallery`
   array that populates the Instagram-style grid inside the modal.

   ▶ To add images: import them at the top and push into `gallery`.
   ▶ To add local videos: put the file in /public/videos/ and use
       { type: "video", src: "/videos/myfile.mp4", poster: someImg, caption: "..." }
   ▶ To embed YouTube/Vimeo: use the embed URL
       { type: "video", src: "https://www.youtube.com/embed/VIDEO_ID", caption: "..." }
   ──────────────────────────────────────────────────────────────────── */
const designWorks: WorkProject[] = [
  {
    num: "01",
    title: "BoatsLab",
    category: "Product Launch & Art Direction",
    tools: "Adobe Photoshop",
    thumbnail: design1,
    gallery: [
      { type: "image", src: design1, caption: "Hero Campaign Visual" },
      { type: "image", src: design2, caption: "Product Detail Shot" },
      { type: "image", src: design3, caption: "Social Media Banner" },
      { type: "image", src: design4, caption: "Lifestyle Photography" },
      { type: "image", src: design5, caption: "Packaging Concept" },
      { type: "image", src: design1, caption: "Brand Collateral" },
      {
        type: "video", src: "https://www.instagram.com/reel/DX_PBmQD_8F/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", caption: "Brand Reel"
      },
      { type: "video", src: "/videos/CANDYs.mp4", poster: design1, caption: "..." }


      // Add your real assets here ↓
      // { type: "video", src: "https://www.youtube.com/embed/YOUR_ID", caption: "Brand Reel" },
    ],
  },
  {
    num: "02",
    title: "Tulip Appliances",
    category: "Retail Branding & Marketing Campaign",
    tools: "Illustrator, Photoshop, Figma",
    thumbnail: design2,
    gallery: [
      { type: "image", src: design2, caption: "Campaign Poster" },
      { type: "image", src: design3, caption: "Store Branding" },
      { type: "image", src: design4, caption: "Product Leaflet" },
      { type: "image", src: design5, caption: "Digital Banner" },
      { type: "image", src: design1, caption: "Social Kit" },
      { type: "image", src: design2, caption: "Billboard Mockup" },
    ],
  },
  {
    num: "03",
    title: "Janaki Vinyl Flooring",
    category: "Visual Identity & Marketing",
    tools: "Figma, Illustrator, After Effects",
    thumbnail: design3,
    gallery: [
      { type: "image", src: design3, caption: "Brand Identity" },
      { type: "image", src: design4, caption: "Showroom Visuals" },
      { type: "image", src: design5, caption: "Catalogue Design" },
      { type: "image", src: design1, caption: "Instagram Post Series" },
      { type: "image", src: design2, caption: "Product Brochure" },
      { type: "image", src: design3, caption: "Motion Teaser" },
    ],
  },
  {
    num: "04",
    title: "Makita",
    category: "Packaging & Advertising Design",
    tools: "Illustrator, Photoshop",
    thumbnail: design4,
    gallery: [
      { type: "image", src: design4, caption: "Tool Packaging" },
      { type: "image", src: design5, caption: "Print Ad" },
      { type: "image", src: design1, caption: "Catalogue Spread" },
      { type: "image", src: design2, caption: "Point-of-Sale Display" },
      { type: "image", src: design3, caption: "Social Campaign" },
      { type: "image", src: design4, caption: "Banner Set" },
    ],
  },
  {
    num: "05",
    title: "Unilab",
    category: "Visual Identity & Confectionery Packaging",
    tools: "Illustrator, Photoshop, Blender",
    thumbnail: design5,
    gallery: [
      { type: "image", src: design5, caption: "Packaging System" },
      { type: "image", src: design1, caption: "Brand Guidelines" },
      { type: "image", src: design2, caption: "3D Product Render" },
      { type: "image", src: design3, caption: "Retail Display" },
      { type: "image", src: design4, caption: "Label Design" },
      { type: "image", src: design5, caption: "Gift Packaging" },
    ],
  },
];

/* ── Component ───────────────────────────────────────────────────── */

const Work = () => {
  const [activeProject, setActiveProject] = useState<WorkProject | null>(null);

  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const workContainer = document.querySelector(".work-container");
      if (!box.length || !workContainer) return;

      const rectLeft = workContainer.getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      const padding = parseInt(window.getComputedStyle(box[0]).padding) / 2 || 0;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", { x: -translateX, ease: "none" });

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
                onClick={() => setActiveProject(item)}
              >
                <div className="work-card">
                  <div className="work-image-wrapper">
                    <img src={item.thumbnail} alt={item.title} />
                    <div className="work-image-overlay">
                      <span>View Gallery</span>
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

      {/* Gallery modal — rendered outside the pinned section so it's always full-screen */}
      {activeProject && (
        <WorkGallery
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  );
};

export default Work;
