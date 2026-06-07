import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  useEffect(() => {
    let links = document.querySelectorAll(".header ul a");
    const handleLinkClick = (e: Event) => {
      if (window.innerWidth <= 1024) return;
      e.preventDefault();
      const element = e.currentTarget as HTMLAnchorElement;
      const section = element.getAttribute("data-href");
      if (!section) return;
      document.querySelector(section)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    links.forEach((elem) => {
      elem.addEventListener("click", handleLinkClick);
    });

    return () => {
      links.forEach((elem) => {
        elem.removeEventListener("click", handleLinkClick);
      });
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          SANDIP
        </a>
        <a
          href="mailto:sandip.stha120@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          sandip.stha120@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
