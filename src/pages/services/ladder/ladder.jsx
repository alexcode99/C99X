import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./ladder.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const START_FRAME = 108313;
const END_FRAME = 108532;
const TOTAL_FRAMES = END_FRAME - START_FRAME + 1;

function Ladder() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const contentRefs = useRef([]);
  const images = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let triggerInstance;
    let activeIndex = -1;

    // ======================
    // CANVAS SIZE
    // ======================
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(0);
    };

    // ======================
    // DRAW FRAME (FULL VISIBLE - NO ZOOM)
    // ======================
    const drawFrame = (index) => {
      const img = images.current[index];
      if (!img || !img.complete) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ✅ FULL VISIBILITY MODE (NO CROPPING)
      const scale = Math.min(
        canvas.width / img.width,
        canvas.height / img.height
      );

      const w = img.width * scale;
      const h = img.height * scale;

      const x = (canvas.width - w) / 2;
      const y = (canvas.height - h) / 2;

      ctx.drawImage(img, x, y, w, h);
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // ======================
    // LOAD IMAGES
    // ======================
    const loadedImages = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const frameNumber = START_FRAME + i;

      const img = new Image();
      img.src = `/sequence/ladder_test_${frameNumber}.png`;

      if (i === 0) {
        img.onload = () => drawFrame(0);
      }

      loadedImages.push(img);
    }

    images.current = loadedImages;

    // ======================
    // GSAP CONTENT LOGIC (UNCHANGED)
    // ======================
    const setup = () => {
      const contents = contentRefs.current;

      gsap.set(contents, { opacity: 0, y: 100 });

      const show = (el) =>
        gsap.to(el, { opacity: 1, y: 0, duration: 0.35 });

      const hide = (el) =>
        gsap.to(el, { opacity: 0, y: 100, duration: 0.25 });

const timing = [
  { start: 0.22, end: 0.45 }, // UI & UX
  { start: 0.46, end: 0.75 }, // Web Development
  { start: 0.76, end: 0.96 }, // Digital Marketing
  { start: 0.97, end: 1.20 }, // Client Handling
];

      triggerInstance = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=2400",
        scrub: true,
        pin: true,
        pinSpacing: false,

        anticipatePin: 1,
        invalidateOnRefresh: true,

        onUpdate: (self) => {
          const progress = self.progress;

          const frameIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.floor(progress * (TOTAL_FRAMES - 1))
          );

          drawFrame(frameIndex);

          let newIndex = -1;

          for (let i = 0; i < timing.length; i++) {
            if (
              progress >= timing[i].start &&
              progress <= timing[i].end
            ) {
              newIndex = i;
              break;
            }
          }

          if (newIndex !== activeIndex) {
            if (activeIndex !== -1) hide(contents[activeIndex]);
            if (newIndex !== -1) show(contents[newIndex]);
            activeIndex = newIndex;
          }
        },
      });

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    };

    setup();

    return () => {
      if (triggerInstance) triggerInstance.kill();
      window.removeEventListener("resize", setCanvasSize);
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section className="overall section_gap service-com-content">
      <section ref={containerRef} className="scroll-section">

        <div className="scroll-box-1">
          <div ref={(el) => (contentRefs.current[1] = el)} className="anime-content acon1">
            <h2>Web Development</h2>
            <p>Modern, pixel-perfect code engineered using HTML5, CSS3, JavaScript frameworks, and secure backend architectures.</p>
          </div>

          <div ref={(el) => (contentRefs.current[3] = el)} className="anime-content acon2">
            <h2>Dedicated Client Handling</h2>
            <p> Smooth communication, real-time progress updates, and transparent project milestones managed through our support hub.</p>
          </div>
        </div>

        {/*  ONLY CANVAS (VIDEO REMOVED) */}
        <canvas ref={canvasRef} className="video" />

        <div className="scroll-box-2">
          <div ref={(el) => (contentRefs.current[0] = el)} className="anime-content acon3">
            <h2>UI/UX Design</h2>
            <p> User-centric wireframes and intuitive interface designs crafted to maximize engagement and streamline navigation.</p>
          </div>

          <div ref={(el) => (contentRefs.current[2] = el)} className="anime-content acon4">
            <h2>Digital Marketing Integration</h2>
            <p>Native SEO architecture and conversion-focused landing structures built directly into every web build.</p>
          </div>
        </div>

      </section>

      <div className="ladder-spacer"></div>
    </section>
  );
}

export default Ladder;