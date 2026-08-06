import React, { useRef, useEffect, useState } from "react";

const ParticleSphere = ({
  particleCount = 1200,
  radius = 80,
  rotationSpeed = 0.002,
  direction = 1,
  particleSize = 0.5,
  color = "#FFFFFF",
  hoverPause = false,
  enableDrag = true,
  dragSpeed = 0.005,
  interactionRadius = 180,
  interactionStrength = 0.15,
  clickForce = 2,
  scale = 1,
}) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const rotation = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);

  const [mouse, setMouse] = useState({ x: null, y: null, down: false });

  //  Create sphere points
  const createParticles = () => {
    const pts = [];

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      pts.push({ x, y, z });
    }

    particles.current = pts;
  };

  //  Rotate 3D
  const rotate = (p) => {
    let { x, y, z } = p;

    // Y axis
    let cosY = Math.cos(rotation.current.y);
    let sinY = Math.sin(rotation.current.y);
    let dx = cosY * x - sinY * z;
    let dz = sinY * x + cosY * z;

    // X axis
    let cosX = Math.cos(rotation.current.x);
    let sinX = Math.sin(rotation.current.x);
    let dy = cosX * y - sinX * dz;
    dz = sinX * y + cosX * dz;

    return { x: dx, y: dy, z: dz };
  };
// useEffect(() => {
//   const handleResize = () => {
//     canvas.width = container.offsetWidth;
//     canvas.height = container.offsetHeight;
//   };

//   window.addEventListener("resize", handleResize);

//   return () => window.removeEventListener("resize", handleResize);
// }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;

    //  ResizeObserver (BEST FIX)
    const resizeCanvas = () => {
      const parent = canvas.parentElement;

      width = parent.offsetWidth;
      height = parent.offsetHeight;

      canvas.width = width;
      canvas.height = height;

      createParticles(); //  re-create on resize
    };

    const observer = new ResizeObserver(() => {
      resizeCanvas();
    });

    observer.observe(canvas.parentElement);

    //  Delay initial render (VERY IMPORTANT)
    // setTimeout(() => {
      resizeCanvas();
    // }, 150);

    //  Animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Auto rotation
      if (!mouse.down && !hoverPause) {
        rotation.current.y += rotationSpeed * direction;
      }

      // particles.current.forEach((p) => {
      //   let rp = rotate(p);

      //   const perspective = 400;
      //   const scaleZ = perspective / (perspective + rp.z);

      //   const x = rp.x * scaleZ + width / 2;
      //   const y = rp.y * scaleZ + height / 2;

      //   //  Mouse interaction
      //   if (mouse.x !== null) {
      //     const dx = x - mouse.x;
      //     const dy = y - mouse.y;
      //     const dist = Math.sqrt(dx * dx + dy * dy);

      //     if (dist < interactionRadius) {
      //       const force = (interactionRadius - dist) / interactionRadius;
      //       //Mouse Interaction
      //       const angle = Math.atan2(dy, dx);

      //         rp.x += Math.cos(angle) * force * interactionStrength * clickForce * 20;
      //         rp.y += Math.sin(angle) * force * interactionStrength * clickForce * 20;
      //       // rp.x += dx * force * interactionStrength * clickForce;
      //       // rp.y += dy * force * interactionStrength * clickForce;
      //     }
      //   }

      //   ctx.beginPath();
      //   ctx.arc(x, y, particleSize * scaleZ * scale, 0, Math.PI * 2);
      //   ctx.fillStyle = color;
      //   ctx.fill();
      // });
      particles.current.forEach((p) => {
          let rp = rotate(p);

          const perspective = 400;
          let scaleZ = perspective / (perspective + rp.z);

          let x = rp.x * scaleZ + width / 2;
          let y = rp.y * scaleZ + height / 2;

          /* ---------------- MOUSE INTERACTION ---------------- */
          if (mouse.x !== null && mouse.y !== null) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;

            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < interactionRadius) {
              const force =
                (interactionRadius - dist) / interactionRadius;

              const angle = Math.atan2(dy, dx);

              // smooth push effect
              x += Math.cos(angle) * force * 25;
              y += Math.sin(angle) * force * 25;

              // optional glow size increase
              scaleZ += force * 0.2;
            }
          }

          /* ---------------- DRAW ---------------- */
          ctx.beginPath();
          ctx.arc(
            x,
            y,
            particleSize * scaleZ * scale,
            0,
            Math.PI * 2
          );

          ctx.fillStyle = color;
          ctx.fill();
});

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    //  Mouse events
    const handleMove = (e) => {
      const rect = canvas.getBoundingClientRect();

      setMouse((prev) => ({
        ...prev,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }));

      if (enableDrag && mouse.down) {
        rotation.current.y += e.movementX * dragSpeed;
        rotation.current.x += e.movementY * dragSpeed;
      }
    };

    const handleDown = () => setMouse((m) => ({ ...m, down: true }));
    const handleUp = () => setMouse((m) => ({ ...m, down: false }));
    const handleLeave = () =>
      setMouse({ x: null, y: null, down: false });

    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mousedown", handleDown);
    canvas.addEventListener("mouseup", handleUp);
    canvas.addEventListener("mouseleave", handleLeave);

    return () => {
      cancelAnimationFrame(animationRef.current);
      observer.disconnect();

      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mousedown", handleDown);
      canvas.removeEventListener("mouseup", handleUp);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, [radius]);

  return (
    <canvas
      ref={canvasRef}
      className="particle-sphere"
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
    />
  );
};

export default ParticleSphere;

