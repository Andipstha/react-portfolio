import { useState } from "react";
import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import WorkGallery, { type WorkProject } from "./WorkGallery";

import janaki_design1 from "../assets/works/janaki/design1.jpg";
import janaki_design2 from "../assets/works/janaki/design2.jpg";
import janaki_design3 from "../assets/works/janaki/design3.jpg";
import janaki_design4 from "../assets/works/janaki/design4.jpg";
import janaki_design5 from "../assets/works/janaki/design5.jpg";
import janaki_design6 from "../assets/works/janaki/design6.jpg";
import janaki_design7 from "../assets/works/janaki/design7.jpg";

import oraimo_design1 from "../assets/works/oraimo/design1.jpg";
import oraimo_design2 from "../assets/works/oraimo/design2.jpg";
import oraimo_design3 from "../assets/works/oraimo/design3.jpg";
import oraimo_design4 from "../assets/works/oraimo/design4.jpg";
import oraimo_design5 from "../assets/works/oraimo/design5.jpg";
import oraimo_design6 from "../assets/works/oraimo/design6.jpg";
import oraimo_design7 from "../assets/works/oraimo/design7.jpg";
import oraimo_design8 from "../assets/works/oraimo/design8.jpg";
import oraimo_design9 from "../assets/works/oraimo/design9.jpg";

import techno_design1 from "../assets/works/techno/design1.jpg";
import techno_design2 from "../assets/works/techno/design2.jpg";
import techno_design3 from "../assets/works/techno/design3.jpg";
import techno_design4 from "../assets/works/techno/design4.jpg";
import techno_design5 from "../assets/works/techno/design5.jpg";

import janvigroup_design1 from "../assets/works/janvigroup/design1.jpg";
import janvigroup_design2 from "../assets/works/janvigroup/design2.jpg";
import janvigroup_design3 from "../assets/works/janvigroup/design3.jpg";
import janvigroup_design4 from "../assets/works/janvigroup/design4.jpg";
import janvigroup_design5 from "../assets/works/janvigroup/design5.jpg";
import janvigroup_design6 from "../assets/works/janvigroup/design6.jpg";
import janvigroup_design7 from "../assets/works/janvigroup/design7.jpg";
import janvigroup_design8 from "../assets/works/janvigroup/design8.jpg";
import janvigroup_design9 from "../assets/works/janvigroup/design9.jpg";

import safalmilk_design1 from "../assets/works/safalmilk/design1.jpg";
import safalmilk_design2 from "../assets/works/safalmilk/design2.jpg";
import safalmilk_design3 from "../assets/works/safalmilk/design3.jpg";
import safalmilk_design4 from "../assets/works/safalmilk/design4.jpg";
import safalmilk_design5 from "../assets/works/safalmilk/design5.jpg";
import safalmilk_design6 from "../assets/works/safalmilk/design6.jpg";
import safalmilk_design7 from "../assets/works/safalmilk/design7.jpg";


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
    title: "Janaki Vinyl Flooring",
    category: "Social Media Post, 3D Modeling, Ad Concepting",
    tools: "Adobe Photoshop, Adobe Illustrator, Blender",
    thumbnail: janaki_design1,
    gallery: [
      { type: "image", src: janaki_design1, caption: "Hero Campaign Visual" },
      { type: "image", src: janaki_design2, caption: "Product Detail Shot" },
      { type: "image", src: janaki_design3, caption: "Social Media Banner" },
      { type: "image", src: janaki_design4, caption: "Lifestyle Photography" },
      { type: "image", src: janaki_design5, caption: "Packaging Concept" },
      { type: "image", src: janaki_design6, caption: "Packaging Concept" },
      { type: "image", src: janaki_design7, caption: "Packaging Concept" },
      // { type: "image", src: design6, caption: "Brand Collateral" },
      // {
      //   type: "video", src: "https://www.instagram.com/reel/DX_PBmQD_8F/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==", caption: "Brand Reel"
      // },
      // { type: "video", src: "/videos/CANDYs.mp4", poster: design1, caption: "..." }


      // Add your real assets here ↓
      // { type: "video", src: "https://www.youtube.com/embed/YOUR_ID", caption: "Brand Reel" },
    ],
  },
  {
    num: "02",
    title: "Oraimo",
    category: "Retail Branding & Marketing Campaign",
    tools: "Illustrator, Photoshop, Figma",
    thumbnail: oraimo_design1,
    gallery: [
      { type: "image", src: oraimo_design9, caption: "Billboard Mockup" },
      { type: "image", src: oraimo_design8, caption: "Billboard Mockup" },
      { type: "image", src: oraimo_design7, caption: "Billboard Mockup" },
      { type: "image", src: oraimo_design6, caption: "Billboard Mockup" },
      { type: "image", src: oraimo_design5, caption: "Social Kit" },
      { type: "image", src: oraimo_design4, caption: "Digital Banner" },
      { type: "image", src: oraimo_design3, caption: "Product Leaflet" },
      { type: "image", src: oraimo_design2, caption: "Store Branding" },
      { type: "image", src: oraimo_design1, caption: "Campaign Poster" },


    ],
  },
  {
    num: "03",
    title: "Techno Mobile",
    category: "Visual Identity & Marketing",
    tools: "Figma, Illustrator, After Effects",
    thumbnail: techno_design1,
    gallery: [
      { type: "image", src: techno_design1, caption: "Brand Identity" },
      { type: "image", src: techno_design2, caption: "Showroom Visuals" },
      { type: "image", src: techno_design3, caption: "Catalogue Design" },
      { type: "image", src: techno_design4, caption: "Instagram Post Series" },
      { type: "image", src: techno_design5, caption: "Product Brochure" },
    ],
  },
  {
    num: "04",
    title: "Janvi Group",
    category: "Packaging & Advertising Design",
    tools: "Illustrator, Photoshop",
    thumbnail: janvigroup_design1,
    gallery: [
      { type: "image", src: janvigroup_design1, caption: "Tool Packaging" },
      { type: "image", src: janvigroup_design2, caption: "Print Ad" },
      { type: "image", src: janvigroup_design3, caption: "Catalogue Spread" },
      { type: "image", src: janvigroup_design4, caption: "Point-of-Sale Display" },
      { type: "image", src: janvigroup_design5, caption: "Social Campaign" },
      { type: "image", src: janvigroup_design6, caption: "Banner Set" },
      { type: "image", src: janvigroup_design7, caption: "Banner Set" },
      { type: "image", src: janvigroup_design8, caption: "Banner Set" },
      { type: "image", src: janvigroup_design9, caption: "Banner Set" },
    ],
  },
  {
    num: "05",
    title: "Safal Milk",
    category: "Visual Identity & Confectionery Packaging",
    tools: "Illustrator, Photoshop, Blender",
    thumbnail: safalmilk_design1,
    gallery: [
      { type: "image", src: safalmilk_design1, caption: "Packaging System" },
      { type: "image", src: safalmilk_design2, caption: "Brand Guidelines" },
      { type: "image", src: safalmilk_design3, caption: "3D Product Render" },
      { type: "image", src: safalmilk_design4, caption: "Retail Display" },
      { type: "image", src: safalmilk_design5, caption: "Label Design" },
      { type: "image", src: safalmilk_design6, caption: "Gift Packaging" },
      { type: "image", src: safalmilk_design7, caption: "Gift Packaging" },
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
