import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./WaveBall.css";

gsap.registerPlugin(ScrollTrigger);

const Waveball = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const ballRef = useRef(null);
  const contentRefs = useRef([]);

  const sizeRef = useRef({
    width: window.innerWidth,
    height: Math.max(420, window.innerHeight * 0.55),
  });

  contentRefs.current = [];

  const addToRefs = (el) => {
    if (el && !contentRefs.current.includes(el)) {
      contentRefs.current.push(el);
    }
  };

  useLayoutEffect(() => {
    gsap.ticker.lagSmoothing(0);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const state = { progress: 0, waveOffset: 0 };

    const amplitudeBase = 30;
    const frequency = 0.025;

    const setCanvasSize = () => {
      canvas.width = sizeRef.current.width;
      canvas.height = sizeRef.current.height;
    };

    const getAmplitude = () =>
      window.innerWidth < 600 ? 50 : amplitudeBase;

    const getBounds = () => {
      let waveWidth = sizeRef.current.width * 0.7;
      if (sizeRef.current.width <= 800) waveWidth = sizeRef.current.width;

      const startX = (sizeRef.current.width - waveWidth) / 2;
      const endX = startX + waveWidth;

      return { startX, endX };
    };

    const getWaveY = (x) =>
      sizeRef.current.height / 2 +
      getAmplitude() *
      Math.sin((x + state.waveOffset) * frequency);

    const drawWave = () => {
      const { startX, endX } = getBounds();

      ctx.beginPath();
      ctx.strokeStyle = "#444";
      ctx.lineWidth = 1.2;

      for (let x = startX; x <= endX; x++) {
        const y = getWaveY(x);
        x === startX ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }

      ctx.stroke();
    };

    const drawWaveText = () => {
      const texts = [
        "Dominance",
        "Visual Funnels",
        "Automation",
        "Identity Systems",
        "Story telling",
      ];

      const index = Math.min(
        texts.length - 1,
        Math.floor(state.progress * texts.length)
      );

      const text = texts[index];

      // 👇 alternate up/down
      const isBelow = index % 2 === 1;

      const letters = text.split("");
      const spacing = 15;

      const { startX, endX } = getBounds();
      const baseX =
        (startX + endX) / 2 - (letters.length * spacing) / 2;

      ctx.font = "18px Inter, sans-serif";
      ctx.fillStyle = "#affe04";

      let lastLetterX = 0;

      letters.forEach((letter, i) => {
        const x = baseX + i * spacing;
        const waveY = getWaveY(x);

        const y = isBelow ? waveY + 25 : waveY - 20;

        const slope =
          getAmplitude() *
          frequency *
          Math.cos((x + state.waveOffset) * frequency);

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.atan(slope));
        ctx.fillText(letter, 0, 0);
        ctx.restore();

        if (i === letters.length - 1) lastLetterX = x;
      });

      return lastLetterX;
    };

    const updateContent = () => {
      const thresholds = [0, 0.2, 0.4, 0.6, 0.8, 1];

      contentRefs.current.forEach((el, i) => {
        if (
          state.progress >= thresholds[i] &&
          state.progress < thresholds[i + 1]
        ) {
          gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.4 });
        } else {
          gsap.to(el, { autoAlpha: 0, y: 40, duration: 0.4 });
        }
      });
    };

    const render = () => {
      const st = ScrollTrigger.getById("waveTrigger");
      if (st) state.progress = st.progress;

      ctx.clearRect(
        0,
        0,
        sizeRef.current.width,
        sizeRef.current.height
      );

      drawWave();
      const lastX = drawWaveText();

      if (ballRef.current) {
        const slope =
          getAmplitude() *
          frequency *
          Math.cos((lastX + state.waveOffset) * frequency);

        const angle = Math.atan(slope);
        const gap = 35;

        const x = lastX + Math.cos(angle) * gap;
        const y = getWaveY(lastX) + Math.sin(angle) * gap;

        ballRef.current.style.transform =
          `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }

      updateContent();
    };

    gsap.ticker.add(render);

    let animation;

    const initAnimation = () => {
      animation = gsap.to(state, {
        waveOffset: 700, // little longer for smoothness
        ease: "none",
        scrollTrigger: {
          id: "waveTrigger",
          trigger: containerRef.current,
          start: "top top",
          end: () => "+=" + window.innerHeight * 3, // 🔥 more scroll
          scrub: 1,
          pin: true,
        },
      });
    };

    setCanvasSize();
    initAnimation();

    const handleResize = () => {
      const scrollY = window.scrollY;

      sizeRef.current.width = window.innerWidth;
      sizeRef.current.height = Math.max(
        420,
        window.innerHeight * 0.55
      );

      setCanvasSize();

      const st = ScrollTrigger.getById("waveTrigger");
      if (st) st.kill();
      if (animation) animation.kill();

      initAnimation();

      window.scrollTo(0, scrollY);
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      gsap.ticker.remove(render);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="wave-container service-com-content">
        <canvas ref={canvasRef} className="wave-canvas" />
        <div ref={ballRef} className="ball"></div>

        <div className="runball-content-box">
          <div ref={addToRefs} className="runball-content">
            <h2>Commercial Shoots</h2>
            <p>Professional on-location and studio video production equipped with cinematic lighting, high-end cameras, and expert direction.</p>
          </div>

          <div ref={addToRefs} className="runball-content">
            <h2>Cinematic Editing</h2>
            <p>Scroll-stopping video post-production incorporating seamless transitions, color grading, visual effects, and crisp audio design.</p>
          </div>

          <div ref={addToRefs} className="runball-content">
            <h2>Motion Graphics</h2>
            <p>2D and 3D animations, title graphics, and kinetic typography that transform complex brand ideas into engaging visual content.</p>
          </div>

          <div ref={addToRefs} className="runball-content">
            <h2>Brand Graphic Design</h2>
            <p> High-impact visual assets, ad creatives, social media graphics, and marketing collaterals engineered to build brand authority.</p>
          </div>

          <div ref={addToRefs} className="runball-content">
            <h2>Content Strategy</h2>
            <p>Data-driven video scripts, storyboards, and short-form video hooks designed specifically to maximize organic social reach and ad conversions.</p>
          </div>
        </div>
      </div>

      <div className="after-section"></div>
    </>
  );
};

export default Waveball;