import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./RounBall.css";

gsap.registerPlugin(ScrollTrigger);

const items = [
  "Research",
  "Wireframing",
  "Design",
  "Testing",
  "Interaction",
  "Prototyping",
  "Validation",
  "Deployment"
];

//  DESKTOP POSITIONS
const desktopPositions = [
  { x: 60, y: -30, rotate: 0 },
  { x: 25, y: 35, rotate: 50 },
  { x: -10, y: 40, rotate: 90 },
  { x: -55, y: 25, rotate: -50 },
  { x: -100, y: -25, rotate: 0 },
  { x: -80, y: -80, rotate: 40 },
  { x: -20, y: -100, rotate: -90 },
  { x: 35, y: -85, rotate: -45 }
];

//  MOBILE POSITIONS
const mobilePositions = [
  { x: 0, y: -60, rotate: 0 },
  { x: 15, y: 35, rotate: 50 },
  { x: -5, y: 30, rotate: 90 },
  { x: -40, y: 20, rotate: -50 },
  { x: -20, y: -60, rotate: 0 },
  { x: -70, y: -60, rotate: 40 },
  { x: -13, y: -85, rotate: -90 },
  { x: 20, y: -65, rotate: -45 }
];

export default function RoundBall() {
  const containerRef = useRef(null);
  const centerRef = useRef(null);
  const itemsRef = useRef([]);

  useLayoutEffect(() => {

    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize"
    });

    let isUpdating = false;
    let resizeTimeout = null;

    const updatePositions = () => {
      if (isUpdating) return;
      isUpdating = true;

      const total = items.length;
      const minSide = Math.min(window.innerWidth, window.innerHeight);
      const w = window.innerWidth;

      let radius = minSide / 3.5;
      let centerDotSize = minSide / 15;
      let baseGap = 50;

      if (w <= 930 && w > 550) {
        radius = minSide / 5.5;
        centerDotSize = minSide / 20;
        baseGap = 45;
      }

      if (w >= 930 && w < 1440) {
        radius = minSide / 4.5;
        centerDotSize = minSide / 18;
        baseGap = 50;
      }

      if (w >= 1440) {
        radius = minSide / 4.5;
        centerDotSize = minSide / 18;
        baseGap = 50;
      }

      if (w > 1441) {
        radius = minSide / 4.5;
        centerDotSize = minSide / 18;
        baseGap = 50;
      }

      radius = Math.max(110, Math.min(radius, 260));

      //  RESPONSIVE POSITION SWITCH (MAIN FIX)

      const isMobile = w <= 650;
      const activePositions = isMobile ? mobilePositions : desktopPositions;

      items.forEach((_, i) => {
        const item = itemsRef.current[i];

        const angle = (360 / total) * i;
        const rad = (angle * Math.PI) / 180;

        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;

        gsap.set(item, { x, y });

        const text = item.querySelector(".text-light-ball");

        gsap.set(text, {
          x: activePositions[i].x,
          y: activePositions[i].y,
          rotate: activePositions[i].rotate,
          force3D: true
        });
      });

      isUpdating = false;
    };

    // 🔥 SAFE RESIZE HANDLER
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);

      resizeTimeout = setTimeout(() => {
        updatePositions();
        requestAnimationFrame(() => {
          ScrollTrigger.refresh(true);
        });
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    updatePositions();

    gsap.set(".glow-round-content", { opacity: 0 });

    gsap.set(centerRef.current, {
      opacity: 1,
      scale: 1
    });

    const ctx = gsap.context(() => {
      const total = items.length;

      gsap.to(centerRef.current, {
        rotate: 320,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2000",
          scrub: true,

          onUpdate: (self) => {
            const direction = self.direction;
            const activeIndex = Math.floor(self.progress * total);

            itemsRef.current.forEach((item, i) => {

              const dot = item.querySelector(".dot");
              const text = item.querySelector(".text-light-ball");

              if (i === 0) {
                gsap.set(dot, { opacity: 1, scale: 1 });
                gsap.set(text, { opacity: 1 });
              }

              if (direction === 1 && i <= activeIndex) {
                dot.style.backgroundImage =
                  "linear-gradient(to top, grey, white)";

                gsap.to(dot, {
                  opacity: 1,
                  scale: 1,
                  duration: 0.3
                });

                gsap.to(text, {
                  opacity: 1,
                  duration: 0.3
                });
              }

              if (direction === -1 && i > activeIndex) {
                dot.style.backgroundImage = "none";

                gsap.to(dot, {
                  opacity: 0.5,
                  scale: 0.7,
                  duration: 0.3
                });

                gsap.to(text, {
                  opacity: 0,
                  duration: 0.3
                });
              }
            });

            const right = document.querySelectorAll(".glow-content2 .glow-round-content");
            const left = document.querySelectorAll(".glow-content1 .glow-round-content");

            let ordered = [];

            if (window.innerWidth <= 650) {
              ordered = [...right, ...left];
            } else {
              for (let i = 0; i < total; i++) {
                if (i % 2 === 0) ordered.push(right[i / 2]);
                else ordered.push(left[Math.floor(i / 2)]);
              }
            }

            ordered.forEach((el, i) => {
              if (!el) return;

              if (i === activeIndex) {
                gsap.to(el, {
                  opacity: 1,
                  y: 0,
                  duration: 0.5
                });
              } else {
                gsap.to(el, {
                  opacity: 0,
                  y: i < activeIndex ? -60 : 60,
                  duration: 0.4
                });
              }
            });
          }
        }
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=2000",
        pin: true
      });

    }, containerRef);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };

  }, []);

  return (
    <div className="page service-com-content">
      <div ref={containerRef} className="wrapper">

        <div className="glow-content2">
          <div className="glow-round-content">
            <h2>Research</h2>
            <p>In-depth user persona mapping, target market discovery, and usability gap analysis to inform intuitive design decisions.</p>
          </div>
          <div className="glow-round-content">
            <h2>Design</h2>
            <p>Visually stunning, pixel-perfect user interface designs crafted to reflect brand identity and modern design aesthetics.</p>
          </div>
          <div className="glow-round-content">
            <h2>Interaction</h2>
            <p>Dynamic micro-interactions, responsive touch states, and smooth interface transitions that enhance digital engagement.</p>
          </div>
          <div className="glow-round-content">
            <h2>Validation</h2>
            <p>User-centric feedback loops and data-driven usability validation to refine product interfaces for maximum retention.</p>
          </div>
        </div>

        <div ref={centerRef} className="centerDot">
          <div className="center-line1"></div>
        </div>

        {items.map((text, i) => (
          <div
            key={i}
            ref={(el) => (itemsRef.current[i] = el)}
            className="orbit-item"
          >
            <div className="dot"></div>

            <div
              className="text-light-ball"
              style={{
                transform: `translate(-50%, -50%) 
                translate(${desktopPositions[i].x}px, ${desktopPositions[i].y}px)`
              }}
            >
              {text}
            </div>
          </div>
        ))}

        <div className="glow-content1">
          <div className="glow-round-content">
            <h2>Wireframing</h2>
            <p>Low-fidelity and high-fidelity skeletal layouts designed to structure seamless user journeys and feature hierarchies.</p>
          </div>
          <div className="glow-round-content">
            <h2>Testing</h2>
            <p>Rigorous usability audits and visual testing to eliminate navigation friction and ensure smooth interaction flows.</p>
            </div>
          <div className="glow-round-content">
            <h2>Prototyping</h2>
            <p>Interactive, clickable prototypes that simulate real user interactions and validate workflows before development starts.</p>
          </div>
          <div className="glow-round-content">
            <h2>Deployment</h2>
            <p>Production-ready developer handoffs with complete UI component libraries, design systems, and asset documentation.</p>
          </div>
        </div>

      </div>
    </div>
  );
}