import React, { useEffect, useRef, useState } from "react";

/* ---------------- MOUSE HOOK ---------------- */
function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return mousePosition;
}

/* ---------------- UTIL ---------------- */
function hexToRgb(hex) {
  hex = hex.replace("#", "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }

  const num = parseInt(hex, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

/* ---------------- COMPONENT ---------------- */
const CosmicParticles = ({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.1,
  color = "#ffffff",
  vx = 0,
  vy = 0,
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const context = useRef(null);
  const circles = useRef([]);

  const mousePosition = useMousePosition();
  const mouse = useRef({ x: 0, y: 0 });
  const canvasSize = useRef({ w: 0, h: 0 });

  const rafID = useRef(null);
  const dpr = window.devicePixelRatio || 1;

  const colors = Array.isArray(color) ? color : [color];

  /* ---------------- INIT ---------------- */
  useEffect(() => {
    if (!canvasRef.current) return;

    context.current = canvasRef.current.getContext("2d");
    if (!context.current) return;

    initCanvas();
    animate();

    /*  BEST: ResizeObserver (no bugs) */
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        initCanvas();
      });
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (rafID.current) cancelAnimationFrame(rafID.current);
      resizeObserver.disconnect();
    };
  }, []);

  /* ---------------- MOUSE ---------------- */
  useEffect(() => {
    handleMouseMove();
  }, [mousePosition]);

  const handleMouseMove = () => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const { w, h } = canvasSize.current;

    const x = mousePosition.x - rect.left - w / 2;
    const y = mousePosition.y - rect.top - h / 2;

    mouse.current.x = x;
    mouse.current.y = y;
  };

  /* ---------------- CANVAS RESIZE ---------------- */
  const resizeCanvas = () => {
    if (!containerRef.current || !canvasRef.current) return;

    if (!context.current) {
      context.current = canvasRef.current.getContext("2d");
      if (!context.current) return;
    }

    const rect = containerRef.current.getBoundingClientRect();

    const oldW = canvasSize.current.w;
    const oldH = canvasSize.current.h;

    canvasSize.current.w = rect.width;
    canvasSize.current.h = rect.height;

    canvasRef.current.width = rect.width * dpr;
    canvasRef.current.height = rect.height * dpr;

    canvasRef.current.style.width = rect.width + "px";
    canvasRef.current.style.height = rect.height + "px";

    context.current.setTransform(1, 0, 0, 1, 0, 0);
    context.current.scale(dpr, dpr);

    context.current.clearRect(0, 0, rect.width, rect.height);

    /*  RESPONSIVE PARTICLE COUNT */
    const area = rect.width * rect.height;
    const density = 9000; // lower = more particles
    // const newQuantity = Math.min(600, Math.floor(area / density));
    const newQuantity = quantity;
    if (oldW === 0 || oldH === 0) {
      circles.current = [];
      for (let i = 0; i < newQuantity; i++) {
        circles.current.push(createCircle());
      }
    } else {
      circles.current.forEach((circle) => {
        circle.x = (circle.x / oldW) * rect.width;
        circle.y = (circle.y / oldH) * rect.height;
      });
    }
  };

  const initCanvas = () => {
    resizeCanvas();
  };

  /* ---------------- PARTICLES ---------------- */
  // const createCircle = () => {
  //   const randomColor =
  //     colors[Math.floor(Math.random() * colors.length)];

  //   return {
  //     x: Math.random() * canvasSize.current.w,
  //     y: Math.random() * canvasSize.current.h,
  //     translateX: 0,
  //     translateY: 0,
  //     size: Math.random() * 2 + size,
  //     alpha: 0,
  //     targetAlpha: Math.random() * 0.6 + 0.1,
  //     dx: (Math.random() - 0.5) * 0.3,
  //     dy: (Math.random() - 0.5) * 0.3,
  //     magnetism: 0.1 + Math.random() * 4,
  //     color: randomColor,
  //   };
  // };

  const clear = () => {
    if (!context.current) return;

    context.current.clearRect(
      0,
      0,
      canvasSize.current.w,
      canvasSize.current.h
    );
  };

  const drawCircle = (circle) => {
    if (!context.current) return;

    const rgb = hexToRgb(circle.color);

    context.current.beginPath();
    context.current.arc(
      circle.x + circle.translateX,
      circle.y + circle.translateY,
      circle.size,
      0,
      Math.PI * 2
    );

    context.current.fillStyle = `rgba(${rgb.join(",")}, ${circle.alpha})`;
    context.current.shadowBlur = 8;
    context.current.shadowColor = circle.color;

    context.current.fill();
  };

  const createCircle = () => {
  const randomColor =
    colors[Math.floor(Math.random() * colors.length)];

  const angle = Math.random() * Math.PI * 2;
  // const speed = Math.random() * 0.8 + 0.2;
  const speed = Math.random() * 1.5 + 0.8;

  return {
    x: Math.random() * canvasSize.current.w,
    y: Math.random() * canvasSize.current.h,

    translateX: 0,
    translateY: 0,

    size: Math.random() * 2 + size,

    alpha: 0,
    targetAlpha: Math.random() * 0.5 + 0.3,

    // smoother floating motion
    dx: Math.cos(angle) * speed,
    dy: Math.sin(angle) * speed,

    magnetism: 0.5 + Math.random() * 2,

    color: randomColor,

    // for soft breathing animation
    pulse: Math.random() * Math.PI * 2,
  };
};

  /* ---------------- ANIMATION ---------------- */
  // const animate = () => {
  //   clear();

  //   circles.current.forEach((circle, i) => {
  //     circle.alpha += (circle.targetAlpha - circle.alpha) * 0.02;

  //     circle.x += circle.dx + vx;
  //     circle.y += circle.dy + vy;

  //     circle.translateX +=
  //       (mouse.current.x / (staticity / circle.magnetism) -
  //         circle.translateX) /
  //       ease;

  //     circle.translateY +=
  //       (mouse.current.y / (staticity / circle.magnetism) -
  //         circle.translateY) /
  //       ease;

  //     drawCircle(circle);

  //     if (
  //       circle.x < -circle.size ||
  //       circle.x > canvasSize.current.w + circle.size ||
  //       circle.y < -circle.size ||
  //       circle.y > canvasSize.current.h + circle.size
  //     ) {
  //       circles.current[i] = createCircle();
  //     }
  //   });

  //   rafID.current = requestAnimationFrame(animate);
  // };

  const animate = () => {
  clear();

  circles.current.forEach((circle, i) => {
    // smooth alpha animation
    circle.pulse += 0.02;
    circle.alpha =
      0.3 + Math.sin(circle.pulse) * 0.2;

    // floating movement
    circle.x += circle.dx + vx;
    circle.y += circle.dy + vy;

    // mouse interaction
    circle.translateX +=
      (
        mouse.current.x /
          (staticity / circle.magnetism) -
        circle.translateX
      ) / ease;

    circle.translateY +=
      (
        mouse.current.y /
          (staticity / circle.magnetism) -
        circle.translateY
      ) / ease;

    drawCircle(circle);

    // smooth edge reset
    if (circle.x > canvasSize.current.w + 50) {
      circle.x = -50;
    }

    if (circle.x < -50) {
      circle.x = canvasSize.current.w + 50;
    }

    if (circle.y > canvasSize.current.h + 50) {
      circle.y = -50;
    }

    if (circle.y < -50) {
      circle.y = canvasSize.current.h + 50;
    }
  });

  rafID.current = requestAnimationFrame(animate);
};

  /* ---------------- JSX ---------------- */
  return (
    <div
      ref={containerRef}
      className={`pointer-events-none ${className}`}
      style={{ width: "100%", height: "100%" }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
};

export default CosmicParticles;


// import React, { useEffect, useRef, useState } from "react";

// function useMousePosition() {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (event) => {
//       setMousePosition({ x: event.clientX, y: event.clientY });
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   return mousePosition;
// }

// function hexToRgb(hex) {
//   hex = hex.replace("#", "");

//   if (hex.length === 3) {
//     hex = hex
//       .split("")
//       .map((c) => c + c)
//       .join("");
//   }

//   const num = parseInt(hex, 16);
//   return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
// }

// const CosmicParticles = ({
//   className = "",
//   quantity = 500,
//   staticity = 50,
//   ease = 50,
//   size = 0.4,
//   refresh = false,
//   color = "#ffffff",
//   vx = 0,
//   vy = 0,
// }) => {
//   const canvasRef = useRef(null);
//   const containerRef = useRef(null);
//   const context = useRef(null);
//   const circles = useRef([]);

//   const mousePosition = useMousePosition();
//   const mouse = useRef({ x: 0, y: 0 });
//   const canvasSize = useRef({ w: 0, h: 0 });

//   const dpr = window.devicePixelRatio || 1;
//   const rafID = useRef(null);

//   const colors = Array.isArray(color) ? color : [color];

//   // useEffect(() => {
//   //   if (canvasRef.current) {
//   //     context.current = canvasRef.current.getContext("2d");
//   //   }

//   //   initCanvas();
//   //   animate();

//   //   // window.addEventListener("resize", initCanvas);
//   //   let resizeTimeout;

//   // const handleResize = () => {
//   //   clearTimeout(resizeTimeout);

//   //   resizeTimeout = setTimeout(() => {
//   //     initCanvas();
//   //   }, 200);
//   // };

//   //   return () => {
//   //     if (rafID.current) cancelAnimationFrame(rafID.current);
//   //     window.removeEventListener("resize", initCanvas, handleResize);
//   //   };
//   // }, [color]);

//   useEffect(() => {
//   if (canvasRef.current) {
//     context.current = canvasRef.current.getContext("2d");
//   }

//   initCanvas();
//   animate();

//   let resizeTimeout;

//   const handleResize = () => {
//     clearTimeout(resizeTimeout);

//     resizeTimeout = setTimeout(() => {
//       requestAnimationFrame(() => {
//         initCanvas();
//       });
//     }, 200);
//   };

//   window.addEventListener("resize", handleResize);

//   return () => {
//     if (rafID.current) cancelAnimationFrame(rafID.current);
//     window.removeEventListener("resize", handleResize);
//   };
// }, []);


//   useEffect(() => {
//   if (canvasRef.current) {
//     context.current = canvasRef.current.getContext("2d");
//   }

//   initCanvas();
//   animate();

//   let resizeTimeout;

//   const handleResize = () => {
//   clearTimeout(resizeTimeout);

//   resizeTimeout = setTimeout(() => {
//     requestAnimationFrame(() => {
//       initCanvas();
//     });
//   }, 150);
// };

//   //  ADD THIS
//   window.addEventListener("resize", handleResize);

//   return () => {
//     if (rafID.current) cancelAnimationFrame(rafID.current);

//     //  FIX REMOVE
//     window.removeEventListener("resize", handleResize);
//   };
// }, [color]);

//   useEffect(() => {
//     handleMouseMove();
//   }, [mousePosition]);

//   useEffect(() => {
//     initCanvas();
//   }, [refresh, quantity]);

//   const handleMouseMove = () => {
//     if (!canvasRef.current) return;
//     containerRef.current.offsetHeight; // force reflow
//     const rect = canvasRef.current.getBoundingClientRect();
//     const { w, h } = canvasSize.current;

//     const x = mousePosition.x - rect.left - w / 2;
//     const y = mousePosition.y - rect.top - h / 2;

//     if (Math.abs(x) < w / 2 && Math.abs(y) < h / 2) {
//       mouse.current.x = x;
//       mouse.current.y = y;
//     }
//   };
// // const resizeCanvas = () => {
// //   if (!containerRef.current || !canvasRef.current || !context.current) return;

// //   const oldW = canvasSize.current.w;
// //   const oldH = canvasSize.current.h;

// //   canvasSize.current.w = containerRef.current.offsetWidth;
// //   canvasSize.current.h = containerRef.current.offsetHeight;

// //   canvasRef.current.width = canvasSize.current.w * dpr;
// //   canvasRef.current.height = canvasSize.current.h * dpr;
// //   canvasRef.current.style.width = canvasSize.current.w + "px";
// //   canvasRef.current.style.height = canvasSize.current.h + "px";

// //   // context.current.scale(dpr, dpr);
// //   context.current.setTransform(1, 0, 0, 1, 0, 0); // reset
// // context.current.scale(dpr, dpr); // apply fresh

  
// //   if (oldW === 0 || oldH === 0) {
// //   circles.current = [];
// //   for (let i = 0; i < quantity; i++) {
// //     circles.current.push(createCircle());
// //   }
// // } else {
// //   circles.current.forEach((circle) => {
// //     circle.x = (circle.x / oldW) * canvasSize.current.w;
// //     circle.y = (circle.y / oldH) * canvasSize.current.h;
// //   });
// // }
// // };
// const resizeCanvas = () => {
//   if (!containerRef.current || !canvasRef.current) return;

//   //  ensure context exists
//   if (!context.current) {
//     context.current = canvasRef.current.getContext("2d");
//     if (!context.current) return; // still null → exit safely
//   }

//   // force reflow
//   containerRef.current.offsetHeight;

//   const rect = containerRef.current.getBoundingClientRect();

//   const oldW = canvasSize.current.w;
//   const oldH = canvasSize.current.h;

//   canvasSize.current.w = rect.width;
//   canvasSize.current.h = rect.height;

//   canvasRef.current.width = rect.width * dpr;
//   canvasRef.current.height = rect.height * dpr;

//   canvasRef.current.style.width = rect.width + "px";
//   canvasRef.current.style.height = rect.height + "px";

//   context.current.setTransform(1, 0, 0, 1, 0, 0);
//   context.current.scale(dpr, dpr);

//   //  SAFE CLEAR
//   context.current.clearRect(0, 0, rect.width, rect.height);

//   if (oldW === 0 || oldH === 0) {
//     circles.current = [];
//     for (let i = 0; i < quantity; i++) {
//       circles.current.push(createCircle());
//     }
//   } else {
//     circles.current.forEach((circle) => {
//       circle.x = (circle.x / oldW) * rect.width;
//       circle.y = (circle.y / oldH) * rect.height;
//     });
//   }
// };

// // const resizeCanvas = () => {
// //   if (!containerRef.current || !canvasRef.current || !context.current) return;
// //   containerRef.current.getBoundingClientRect();

// //   canvasSize.current.w = containerRef.current.offsetWidth;
// //   canvasSize.current.h = containerRef.current.offsetHeight;

// //   canvasRef.current.width = canvasSize.current.w * dpr;
// //   canvasRef.current.height = canvasSize.current.h * dpr;
// //   canvasRef.current.style.width = canvasSize.current.w + "px";
// //   canvasRef.current.style.height = canvasSize.current.h + "px";

// //   context.current.setTransform(1, 0, 0, 1, 0, 0);
// //   context.current.scale(dpr, dpr);

// //   //  ALWAYS recreate particles
// //   circles.current = [];
// //   for (let i = 0; i < quantity; i++) {
// //     circles.current.push(createCircle());
// //   }
// // };
// // -------------------------------
  

//   const createCircle = () => {
//     const randomColor =
//       colors[Math.floor(Math.random() * colors.length)];

//     return {
//       x: Math.random() * canvasSize.current.w,
//       y: Math.random() * canvasSize.current.h,
//       translateX: 0,
//       translateY: 0,
//       size: Math.random() * 2 + size,
//       alpha: 0,
//       targetAlpha: Math.random() * 0.6 + 0.1,
//       dx: (Math.random() - 0.5) * 0.3,
//       dy: (Math.random() - 0.5) * 0.3,
//       magnetism: 0.1 + Math.random() * 4,
//       color: randomColor,
//     };
//   };

//   const clear = () => {
//     context.current?.clearRect(
//       0,
//       0,
//       canvasSize.current.w,
//       canvasSize.current.h
//     );
//   };

//   const drawCircle = (circle) => {
//     if (!context.current) return;

//     const rgb = hexToRgb(circle.color);

//     context.current.beginPath();
//     context.current.arc(
//       circle.x + circle.translateX,
//       circle.y + circle.translateY,
//       circle.size,
//       0,
//       Math.PI * 2
//     );

//     context.current.fillStyle = `rgba(${rgb.join(",")}, ${circle.alpha})`;

//     //  optional glow
//     context.current.shadowBlur = 8;
//     context.current.shadowColor = circle.color;

//     context.current.fill();
//   };

//   const animate = () => {
//     clear();

//     circles.current.forEach((circle, i) => {
//       circle.alpha += (circle.targetAlpha - circle.alpha) * 0.02;

//       circle.x += circle.dx + vx;
//       circle.y += circle.dy + vy;

//       circle.translateX +=
//         (mouse.current.x / (staticity / circle.magnetism) -
//           circle.translateX) /
//         ease;

//       circle.translateY +=
//         (mouse.current.y / (staticity / circle.magnetism) -
//           circle.translateY) /
//         ease;

//       drawCircle(circle);

//       if (
//         circle.x < -circle.size ||
//         circle.x > canvasSize.current.w + circle.size ||
//         circle.y < -circle.size ||
//         circle.y > canvasSize.current.h + circle.size
//       ) {
//         circles.current[i] = createCircle();
//       }
//     });

//     rafID.current = requestAnimationFrame(animate);
//   };

//   const initCanvas = () => {
//     resizeCanvas();
//   };

//   return (
//     <div
//       ref={containerRef}
//       className={`pointer-events-none ${className}`}
//     >
//       <canvas ref={canvasRef} style={{ width: "100%", height: "100%", }} />
//     </div>
//   );
// };

// export default CosmicParticles;