import { useEffect, useRef, useState, useCallback } from "react";

export default function ParticleText({
  text1 = "C99",
  text2 = "X",
  color1 = "#ffffff",
  color2 = "#95C924",
  particleSize = 0.1,
  particleDensity = 0,
  mouseRadius = 50,
  returnSpeed = 0.01,
  fontSize = 350,
  fontWeight = "600",
  fontFamily = "JetBrains Mono",
  style = {},
}) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef(null);
  const particleSizeRef = useRef(particleSize);

  const screenWidth = window.innerWidth;
  const effectiveMouseRadius = screenWidth < 991 ? 10 : mouseRadius;

  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 475.99
  );

  /* -------- HANDLE RESIZE -------- */
  useEffect(() => {
    const handleResize = () => {
      // setIsMobile(window.innerWidth < 991);
      setIsMobile(window.innerWidth < 475.99);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* -------- GENERATE PARTICLES -------- */
  const generateParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.resetTransform();
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    ctx.clearRect(0, 0, width, height);

    ctx.textBaseline = "middle";
    ctx.textAlign = "left";

    const screenWidth = window.innerWidth;
    const isMobileScreen = screenWidth < 991;

    let responsiveFontSize = fontSize;

    if (screenWidth < 375) {
      responsiveFontSize = 130;
    } else if (screenWidth < 768) {
      responsiveFontSize = 150;
    } else if (screenWidth < 1200) {
      responsiveFontSize = 220;
    }

    ctx.font = `${fontWeight} ${responsiveFontSize}px ${fontFamily}`;

    let responsiveParticleSize;

    if (screenWidth < 475) {
      responsiveParticleSize = 1.8;
    } else if (screenWidth < 768) {
      responsiveParticleSize = 2;
    } else {
      responsiveParticleSize = particleSize;
    }

    particleSizeRef.current = responsiveParticleSize;

    const gap = Math.max(1, Math.floor(responsiveFontSize / 120));

    const width1 = ctx.measureText(text1).width;
    const width2 = ctx.measureText(text2).width;

    const totalWidth = width1 + width2;
    const startX = width / 2 - totalWidth / 2;
    const centerY = height / 2;

    const particles = [];

    /*  MOBILE: ONLY DRAW TEXT */

    if (isMobileScreen) {
      ctx.fillStyle = color1;
      ctx.fillText(text1, startX, centerY);

      ctx.fillStyle = color2;
      ctx.fillText(text2, startX + width1, centerY);

      setReady(false);
      return;
    }

    /* TEXT 1 */

    ctx.fillStyle = color1;
    ctx.fillText(text1, startX, centerY);

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let pixels = imageData.data;

    for (let y = 0; y < canvas.height; y += gap) {
      for (let x = 0; x < canvas.width; x += gap) {
        const index = (y * canvas.width + x) * 4;
        const alpha = pixels[index + 3];

        if (alpha > 50) {
          particles.push({
            x: x / dpr,
            y: y / dpr,
            baseX: x / dpr,
            baseY: y / dpr,
            vx: 0,
            vy: 0,
            color: color1,
          });
        }
      }
    }

    /* TEXT 2 */
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = color2;
    ctx.fillText(text2, startX + width1, centerY);

    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    pixels = imageData.data;

    for (let y = 0; y < canvas.height; y += gap) {
      for (let x = 0; x < canvas.width; x += gap) {
        const index = (y * canvas.width + x) * 4;
        const alpha = pixels[index + 3];

        if (alpha > 50) {
          particles.push({
            x: x / dpr,
            y: y / dpr,
            baseX: x / dpr,
            baseY: y / dpr,
            vx: 0,
            vy: 0,
            color: color2,
          });
        }
      }
    }

    particlesRef.current = particles;
    setReady(true);
  }, [
    text1,
    text2,
    particleDensity,
    fontSize,
    fontWeight,
    fontFamily,
    color1,
    color2,
    particleSize,
  ]);

  /* -------- INIT + RESIZE -------- */
  useEffect(() => {
    const init = async () => {
      await document.fonts.ready;
      generateParticles();
    };

    init();

    const resizeObserver = new ResizeObserver(() => {
      generateParticles();
    });

    if (canvasRef.current) {
      resizeObserver.observe(canvasRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [generateParticles]);

  /* -------- ANIMATION -------- */
  useEffect(() => {
    if (!ready || isMobile) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);

      particlesRef.current.forEach((p) => {
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < effectiveMouseRadius) {
          const force = (effectiveMouseRadius - distance) / effectiveMouseRadius;
          const angle = Math.atan2(dy, dx);

          const strength = force * 6;

          p.vx += Math.cos(angle) * strength;
          p.vy += Math.sin(angle) * strength;

          const wave = Math.sin(
            distance * 0.05 - performance.now() * 0.005
          );

          p.vx += wave * 0.6;
          p.vy += wave * 0.6;
        }

        p.vx += (p.baseX - p.x) * 0.03;
        p.vy += (p.baseY - p.y) * 0.03;

        p.vx *= 0.92;
        p.vy *= 0.92;

        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, particleSizeRef.current, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationRef.current);
  }, [ready, effectiveMouseRadius, returnSpeed, isMobile]);

  /* -------- MOUSE -------- */
  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();

    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -500, y: -500 };
  };

  /* -------- UI -------- */
  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: isMobile ? "114%" : "100%",
        // height: isMobile
        //   ? "139px"
        //   : "clamp(150px,25vw,420px)",
        height: isMobile
          ? "139px"
          : "clamp(150px,36vw,420px)",
        display: "block",
        padding: isMobile ? "20px" : "40px",
        fontFamily: "JetBrains Mono",
        position: isMobile ? "absolute" : "relative",
        transform: isMobile
          ? "translate(-10%, 0%)"
          : "translate(0, 0)",
        ...style,
      }}
    />
  );
}

// -------------------------------------------------------------------

// import { useEffect, useRef, useState, useCallback } from "react";

// export default function ParticleText({
//   text1 = "C99",
//   text2 = "X",
//   color1 = "#ffffff",
//   color2 = "#95C924",
//   particleSize = 0.1,
//   particleDensity = 0,

//   // changed default mouseRadius
//   mouseRadius = 50,

//   returnSpeed = 0.01,
//   fontSize = 350,
//   fontWeight = "600",
//   fontFamily = "JetBrains Mono",
//   style = {},
// }) {
//   const canvasRef = useRef(null);
//   const particlesRef = useRef([]);
//   const mouseRef = useRef({ x: -1000, y: -1000 });
//   const animationRef = useRef(null);
//   const particleSizeRef = useRef(particleSize);

//   // animation useEffect kulla itha add pannu
//   const screenWidth = window.innerWidth;
//   // phone screen vandha mattum mouseRadius = 10
//   const effectiveMouseRadius = screenWidth < 991 ? 10 : mouseRadius;


//   const [ready, setReady] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

//   /* -------- HANDLE RESIZE -------- */
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 991);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   /* -------- GENERATE PARTICLES -------- */
//   const generateParticles = useCallback(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d", { willReadFrequently: true });
//     if (!ctx) return;

//     const rect = canvas.getBoundingClientRect();
//     const dpr = window.devicePixelRatio || 1;

//     canvas.width = rect.width * dpr;
//     canvas.height = rect.height * dpr;

//     ctx.resetTransform();
//     ctx.scale(dpr, dpr);

//     const width = rect.width;
//     const height = rect.height;

//     ctx.clearRect(0, 0, width, height);

//     ctx.textBaseline = "middle";
//     ctx.textAlign = "left";

//     const screenWidth = window.innerWidth;

//     let responsiveFontSize = fontSize;

//     if (screenWidth < 375) {
//       responsiveFontSize = 130;
//     } else if (screenWidth < 768) {
//       responsiveFontSize = 150;
//     } else if (screenWidth < 1200) {
//       responsiveFontSize = 220;
//     }

//     ctx.font = `${fontWeight} ${responsiveFontSize}px ${fontFamily}`;

//     let responsiveParticleSize;

//     if (screenWidth < 475) {
//       responsiveParticleSize = 1.8;
//     } else if (screenWidth < 768) {
//       responsiveParticleSize = 2;
//     } else {
//       responsiveParticleSize = particleSize;
//     }

//     particleSizeRef.current = responsiveParticleSize;

//     const gap = Math.max(1, Math.floor(responsiveFontSize / 120));

//     const width1 = ctx.measureText(text1).width;
//     const width2 = ctx.measureText(text2).width;

//     const totalWidth = width1 + width2;
//     const startX = width / 2 - totalWidth / 2;
//     const centerY = height / 2;

//     const particles = [];

//     /* TEXT 1 */
//     ctx.fillStyle = color1;
//     ctx.fillText(text1, startX, centerY);

//     let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     let pixels = imageData.data;

//     for (let y = 0; y < canvas.height; y += gap) {
//       for (let x = 0; x < canvas.width; x += gap) {
//         const index = (y * canvas.width + x) * 4;
//         const alpha = pixels[index + 3];

//         if (alpha > 50) {
//           particles.push({
//             x: x / dpr,
//             y: y / dpr,
//             baseX: x / dpr,
//             baseY: y / dpr,
//             vx: 0,
//             vy: 0,
//             color: color1,
//           });
//         }
//       }
//     }

//     /* TEXT 2 */
//     ctx.clearRect(0, 0, width, height);

//     ctx.fillStyle = color2;
//     ctx.fillText(text2, startX + width1, centerY);

//     imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//     pixels = imageData.data;

//     for (let y = 0; y < canvas.height; y += gap) {
//       for (let x = 0; x < canvas.width; x += gap) {
//         const index = (y * canvas.width + x) * 4;
//         const alpha = pixels[index + 3];

//         if (alpha > 50) {
//           particles.push({
//             x: x / dpr,
//             y: y / dpr,
//             baseX: x / dpr,
//             baseY: y / dpr,
//             vx: 0,
//             vy: 0,
//             color: color2,
//           });
//         }
//       }
//     }

//     particlesRef.current = particles;
//     setReady(true);
//   }, [
//     text1,
//     text2,
//     particleDensity,
//     fontSize,
//     fontWeight,
//     fontFamily,
//     color1,
//     color2,
//     particleSize,
//   ]);

//   /* -------- INIT + RESIZE -------- */
//   useEffect(() => {
//     const init = async () => {
//       await document.fonts.ready;
//       generateParticles();
//     };

//     init();

//     const resizeObserver = new ResizeObserver(() => {
//       generateParticles();
//     });

//     if (canvasRef.current) {
//       resizeObserver.observe(canvasRef.current);
//     }

//     return () => resizeObserver.disconnect();
//   }, [generateParticles]);

//   /* -------- ANIMATION -------- */
//   useEffect(() => {
//     if (!ready) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     const rect = canvas.getBoundingClientRect();

//     const animate = () => {
//       ctx.clearRect(0, 0, rect.width, rect.height);

//       particlesRef.current.forEach((p) => {
//         const dx = p.x - mouseRef.current.x;
//         const dy = p.y - mouseRef.current.y;
//         const distance = Math.sqrt(dx * dx + dy * dy);

//         if (distance < effectiveMouseRadius) {
//           const force = (effectiveMouseRadius - distance) / effectiveMouseRadius;
//           const angle = Math.atan2(dy, dx);

//           const strength = force * 6;

//           p.vx += Math.cos(angle) * strength;
//           p.vy += Math.sin(angle) * strength;

//           const wave = Math.sin(
//             distance * 0.05 - performance.now() * 0.005
//           );

//           p.vx += wave * 0.6;
//           p.vy += wave * 0.6;
//         }

//         p.vx += (p.baseX - p.x) * 0.03;
//         p.vy += (p.baseY - p.y) * 0.03;

//         p.vx *= 0.92;
//         p.vy *= 0.92;

//         p.x += p.vx;
//         p.y += p.vy;

//         ctx.fillStyle = p.color;
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, particleSizeRef.current, 0, Math.PI * 2);
//         ctx.fill();
//       });

//       animationRef.current = requestAnimationFrame(animate);
//     };

//     animate();

//     return () => cancelAnimationFrame(animationRef.current);
//   }, [ready, effectiveMouseRadius, returnSpeed]);

//   /* -------- MOUSE -------- */
//   const handleMouseMove = (e) => {
//     const rect = canvasRef.current.getBoundingClientRect();

//     mouseRef.current = {
//       x: e.clientX - rect.left,
//       y: e.clientY - rect.top,
//     };
//   };

//   const handleMouseLeave = () => {
//     mouseRef.current = { x: -500, y: -500 };
//   };

//   /* -------- UI -------- */
//   return (
//     <canvas
//       ref={canvasRef}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       style={{
//         width: isMobile ? "114%" : "100%",
//         height: isMobile
//           ? "139px"
//           : "clamp(150px,25vw,420px)",
//         display: "block",
//         padding: isMobile ? "20px" : "40px",
//         fontFamily: "JetBrains Mono",

//         // mobile screen style apply
//         position: isMobile ? "absolute" : "relative",
//         transform: isMobile
//           ? "translate(-10%, 0%)"
//           : "translate(0, 0)",

//         ...style,
//       }}
//     />
//   );
// }
