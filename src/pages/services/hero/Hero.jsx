import React, { useEffect, useRef } from "react";
import "./Hero.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LuChevronRight } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import moon from "../../../assets/services/moon.png";
import leftShade from "../../../assets/services/shade_left.png";
import rightShade from "../../../assets/services/shade_right.png";

import ServicesData from "../../../pages/services/data/ServicesData";

export default function Hero() {

  const { slug } = useParams();

  const buttonRef = useRef(null);
  const flairRef = useRef(null);

  const service = ServicesData.find(
    (item) => item.slug === slug || item.id === slug
  );

  const data = service ?? ServicesData?.[0] ?? {};

  // 🔥 Highlight Function
  const renderTitle = (title, highlight, color) => {
    if (!highlight) return title;

    const parts = title.split(highlight);

    return (
      <>
        {parts[0]}
        <span style={{ color: color }} className="highlight">
          {highlight}
        </span>
        {parts[1]}
      </>
    );
  };

  useEffect(() => {

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      gsap.fromTo(".section_1_moon",
        { y: 150, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
      );

      gsap.fromTo(".digital_hero",
        { y: 200, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5 }
      );

      gsap.fromTo(".digital_content",
        { y: 200, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5 }
      );

      gsap.fromTo(".section_1_btn",
        { y: 200, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5 }
      );

    });

    // 🔥 BUTTON HOVER EFFECT (YOUR ORIGINAL STYLE - IMPROVED)
    const button = buttonRef.current;
    const flair = flairRef.current;

    if (!button || !flair) return;

    const mapRange = (inMin, inMax, outMin, outMax, val) =>
      ((val - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;

    const clamp = (min, max, val) =>
      Math.min(max, Math.max(min, val));

    const getXY = (e) => {
      const { left, top, width, height } = button.getBoundingClientRect();

      const x = clamp(0, 100, mapRange(0, width, 0, 100, e.clientX - left));
      const y = clamp(0, 100, mapRange(0, height, 0, 100, e.clientY - top));

      return { x, y };
    };

    const mouseEnter = (e) => {
      const { x, y } = getXY(e);

      flair.style.transition = "transform 0.4s cubic-bezier(0.23,1,0.32,1)";
      flair.style.left = `${x}%`;
      flair.style.top = `${y}%`;

      requestAnimationFrame(() => {
        flair.style.transform = "translate(-50%, -50%) scale(1)";
      });
    };

    const mouseMove = (e) => {
      const { x, y } = getXY(e);
      flair.style.left = `${x}%`;
      flair.style.top = `${y}%`;
    };

    const mouseLeave = (e) => {
      const { x, y } = getXY(e);

      flair.style.left = `${x}%`;
      flair.style.top = `${y}%`;
      flair.style.transform = "translate(-50%, -50%) scale(0)";
    };

    button.addEventListener("mouseenter", mouseEnter);
    button.addEventListener("mousemove", mouseMove);
    button.addEventListener("mouseleave", mouseLeave);

    return () => {
      ctx.revert();

      button.removeEventListener("mouseenter", mouseEnter);
      button.removeEventListener("mousemove", mouseMove);
      button.removeEventListener("mouseleave", mouseLeave);
    };

  }, [slug]);

  return (
    <section className="digital_section_1">

      <img src={leftShade} alt="" className="left_shade shades" />
      <img src={rightShade} alt="" className="right_shade shades" />

      <div className="section_1_content">

        {/* 🔥 TITLE WITH COLOR */}
        <h1 className="digital_hero service-com-tittle">
          {renderTitle(
            data.hero_title,
            data.highlight,
            data.highlightColor
          )}
        </h1>

        <p className="digital_content service-com-content">
          {data.hero_content}
        </p>

      </div>

      <div className="section_1_btn">
        <div className="hero-button-wrapper">
          <button className="hero-button" ref={buttonRef}>
            <span className="hero-button__flair" ref={flairRef}></span>

            <Link to="/contact" className="hero-button__label">
              Get Free Marketing Audit <LuChevronRight />
            </Link>
          </button>
        </div>
        <Link to="/about" className="section_1_btn2">
          Our Success Stories
        </Link>
      </div>

      <div className="section_1_groundlight">
        <img src={moon} alt="" className="section_1_moon" />
      </div>

    </section>
  );
}