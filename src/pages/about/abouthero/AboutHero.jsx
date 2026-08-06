// *//AboutHero.jsx*
import React, { useEffect } from "react";
import './AboutHero.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useParams } from "react-router-dom";
import leftShade from "../../../assets/about/shade_left.png";
import rightShade from "../../../assets/about/shade_right.png";
import CardAnimation from "../../../components/animations/Cardanimation/CardAnimation";
//icons
import { RxChevronRight } from "react-icons/rx";


//  IMPORT DATA
// import ServicesData from "../../../pages/services/data/ServicesData";

export default function AboutHero() {

  useEffect(() => {

    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".section_1_moon",
      { y: 150, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power4.out" }
    );

    gsap.fromTo(".digital_hero",
      { y: 200, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5 }
    );

    gsap.fromTo(".aboutHero_digital_content",
      { y: 200, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5 }
    );

  }, []);

  return (
    <section className="digital_section_1 section_gap">
      <img src={leftShade} alt="" className="left_shade shades" />
      <img src={rightShade} alt="" className="right_shade shades" />

      <div className="section_1_content">
        {/*  DYNAMIC TITLE */}
        <h1 className="digital_hero">
          {/* About <span>C99X</span> */}
           Engineering Next-Generation <span>Digital Products & AI Growth Engines</span> 
        </h1>

        {/*  DYNAMIC CONTENT */}

        <p className="aboutHero_digital_content">
          C99X is a full-service IT solutions and digital growth agency empowering ambitious brands with high-performance web applications, scalable software architectures, and data-driven marketing systems. We bridge the gap between intelligent tech engineering and measurable business revenue.
        </p>
      </div>

      {/* BUTTONS */}
      
      <CardAnimation />
      <div className="aboutHero-buttons">
        <button className="about-hero-btn-1">Start Your Project Today<RxChevronRight /></button>
        <button className="about-hero-btn-2">Explore Our Process</button>
      </div>
    </section>
  );
}