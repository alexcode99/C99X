import { useEffect, useRef } from "react";

const GlobalClickSpark = ({
  sparkColor = "#affe04",
  sparkSize = 13,
  sparkRadius = 25,
  sparkCount = 8,
  duration = 500
}) => {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    let animationId;

    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = time - spark.start;
        if (elapsed > duration) return false;

        const progress = elapsed / duration;
        const eased = progress * (2 - progress); // ease-out

        const dist = eased * sparkRadius;
        const len = sparkSize * (1 - eased);

        const x1 = spark.x + dist * Math.cos(spark.angle);
        const y1 = spark.y + dist * Math.sin(spark.angle);

        const x2 = spark.x + (dist + len) * Math.cos(spark.angle);
        const y2 = spark.y + (dist + len) * Math.sin(spark.angle);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;

        // glow 🔥
        ctx.shadowColor = sparkColor;
        ctx.shadowBlur = 12;

        ctx.stroke();

        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    // 🔥 GLOBAL CLICK + TOUCH
    const spawn = (x, y) => {
      const now = performance.now();

      const sparks = Array.from({ length: sparkCount }, (_, i) => ({
        x,
        y,
        angle: (2 * Math.PI * i) / sparkCount,
        start: now
      }));

      sparksRef.current.push(...sparks);
    };

    const handleClick = (e) => {
      spawn(e.clientX, e.clientY);
    };

    const handleTouch = (e) => {
      const touch = e.touches[0];
      if (touch) spawn(touch.clientX, touch.clientY);
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("touchstart", handleTouch);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchstart", handleTouch);
      cancelAnimationFrame(animationId);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none", // important!
        zIndex: 9999
      }}
    />
  );
};

export default GlobalClickSpark;