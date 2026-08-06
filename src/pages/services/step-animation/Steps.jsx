import './Steps.css';
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Steps() {
  const staircaseAnimation_containerRef = useRef(null);
  const ballRef = useRef(null);
  const staircaseAnimation_wrapperRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      const refresh = () => ScrollTrigger.refresh();

      window.addEventListener("resize", refresh);
      document.fonts?.ready.then(refresh);

      setTimeout(refresh, 300);
      requestAnimationFrame(() => ScrollTrigger.refresh());

      const steps = gsap.utils.toArray(".staircaseAnimation_step");

      const contentMap = [
        ".staircaseAnimation_content1",
        ".staircaseAnimation_content2",
        ".staircaseAnimation_content3",
        ".staircaseAnimation_content4",
        ".staircaseAnimation_content5",
      ];

      // 🔹 default all steps dim EXCEPT FIRST CHILD
      gsap.set(steps, { opacity: 0.045 });

      // ✅ FIRST STEP ALWAYS VISIBLE (NO ANIMATION)
      gsap.set(steps[0], { opacity: 1 });

      // FIX: first visible step active (skip spacer at index 0)
      gsap.set(steps[1], { opacity: 1 });
      gsap.set(steps[2], { opacity: 1 });

      gsap.set(".staircaseAnimation_content", {
        opacity: 0,
        display: "none"
      });

      gsap.set(".staircaseAnimation_content1", {
        opacity: 1,
        display: "block"
      });

      gsap.set(ballRef.current, {
        x: "1.5vw",
        y: "0px",
        opacity: 0,
      });

      const createAnimation = (positions) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: staircaseAnimation_containerRef.current,
            start: "top top",
            end: "+=1100",
            scrub: 2,

            onLeave: () => {
              gsap.set(".staircaseAnimation_content", { display: "none" });
            },
            onEnterBack: () => {
              gsap.set(".staircaseAnimation_content", { display: "none" });
            }
          },
        });

        positions.forEach((pos, i) => {

          tl.to(ballRef.current, {
            opacity: i === 0 ? 1 : undefined,
            x: pos.x,
            y: pos.y,
            ease: "none",
            duration: 1,
          });

          const stepIndex = Math.floor(i / 2);

          // ❗ IMPORTANT FIX: skip first step animation (index 0)
          if (steps[stepIndex] && i % 2 === 1 && stepIndex !== 0) {

            tl.fromTo(
              steps[stepIndex],
              { opacity: 0.045 },
              { opacity: 1, duration: 0.3 },
              "-=2"
            );

            contentMap.forEach((selector, idx) => {
              if (idx === stepIndex - 1) {
                tl.set(selector, { display: "block" }, "<");
                tl.fromTo(
                  selector,
                  { opacity: 0, y: 40 },
                  { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
                  "<"
                );
              } else {
                tl.set(selector, { display: "none" }, "<");
              }
            });
          }

          if (i === 12 && steps[stepIndex] && stepIndex !== 0) {
            tl.fromTo(
              steps[stepIndex],
              { opacity: 0.045 },
              { opacity: 1, duration: 0.3 },
              "-=2"
            );
          }
        });
      };

      const mm = gsap.matchMedia();

      const positions = [
        { x: "1.5vw", y: "0px" },
        { x: "4vw", y: "-42px" },
        { x: "6.5vw", y: "-42px" },
        { x: "9vw", y: "-87px" },
        { x: "12.5vw", y: "-87px" },
        { x: "16vw", y: "-132px" },
        { x: "19.5vw", y: "-132px" },
        { x: "22vw", y: "-180px" },
        { x: "25.5vw", y: "-180px" },
        { x: "28vw", y: "-222px" },
        { x: "31.5vw", y: "-222px" },
        { x: "35vw", y: "-270px" },
        { x: "36.5vw", y: "-270px" },
      ];

      mm.add("(max-width: 380px)", () => createAnimation(positions));
      mm.add("(min-width: 381px) and (max-width: 799px)", () => createAnimation(positions));
      mm.add("(min-width: 800px)", () => createAnimation(positions));

    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={staircaseAnimation_wrapperRef} className='staircaseAnimation_wrapper service-com-content'>

        <div className='staircaseAnimation_topContent'>
          <div className='staircaseAnimation_content staircaseAnimation_content1'>
            <h2>Enterprise Microservices</h2>
            <p>Modular, decoupled backend architectures engineered using Java and Node.js for high-speed processing and zero downtime.</p>
          </div>
          <div className='staircaseAnimation_content staircaseAnimation_content3'>
            <h2>API & Database Integration</h2>
            <p>Encrypted RESTful and GraphQL API pipelines connecting complex databases, payment systems, and third-party CRMs smoothly.</p>
          </div>
          <div className='staircaseAnimation_content staircaseAnimation_content5'>
            <h2>Real-Time Data Processing</h2>
            <p>Fast web sockets and event-driven architectures enabling instant data retrieval, live dashboards, and messaging.</p>
          </div>
        </div>

        <div ref={staircaseAnimation_containerRef} className="staircaseAnimation_container">
          <div className="staircaseAnimation_step"></div>

          <div className="staircaseAnimation_step">
            <span className="staircaseAnimation_stepText">Scalable</span>
          </div>

          <div className="staircaseAnimation_step">
            <span className="staircaseAnimation_stepText">Future</span>
          </div>

          <div className="staircaseAnimation_step">
            <span className="staircaseAnimation_stepText">Performance</span>
          </div>

          <div className="staircaseAnimation_step">
            <span className="staircaseAnimation_stepText">Intelligent</span>
          </div>

          <div className="staircaseAnimation_step">
            <span className="staircaseAnimation_stepText">Secure</span>
          </div>

          <div className="staircaseAnimation_step"></div>

          <div ref={ballRef} className="staircaseAnimation_glowBall"></div>
        </div>

        <div className='staircaseAnimation_bottomContent'>
          <div className='staircaseAnimation_content staircaseAnimation_content2'>
            <h2>Custom SaaS Engineering</h2>
            <p>Scalable cloud-native software-as-a-service platforms equipped with multi-tenant security and automated billing engines.</p>
          </div>
          <div className='staircaseAnimation_content staircaseAnimation_content4'>
            <h2>Cloud Infrastructure & Scale</h2>
            <p>AWS and Azure cloud deployment designed to handle high concurrent user traffic with automated load balancing.</p>
          </div>
        </div>

      </div>
    </>
  );
}

export default Steps;









// import './Steps.css';
// import { useLayoutEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// function Steps() {
//   const staircaseAnimation_containerRef = useRef(null);
//   const ballRef = useRef(null);
//   const staircaseAnimation_wrapperRef = useRef(null);

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {

//       const refresh = () => ScrollTrigger.refresh();

//       window.addEventListener("resize", refresh);
//       document.fonts?.ready.then(refresh);

//       setTimeout(refresh, 300);
//       requestAnimationFrame(() => ScrollTrigger.refresh());

//       const steps = gsap.utils.toArray(".staircaseAnimation_step");

//       const contentMap = [
//         ".staircaseAnimation_content1",
//         ".staircaseAnimation_content2",
//         ".staircaseAnimation_content3",
//         ".staircaseAnimation_content4",
//         ".staircaseAnimation_content5",
//       ];

//       gsap.set(steps, { opacity: 0.045 });
//       gsap.set(".staircaseAnimation_content", {
//         opacity: 0,
//         display: "none"
//       });

//       gsap.set(ballRef.current, {
//         x: "1.5vw",
//         y: "0px",
//         opacity: 0,
//       });

//       const createAnimation = (positions) => {
//         const tl = gsap.timeline({
//           scrollTrigger: {
//             trigger: staircaseAnimation_containerRef.current,
//             start: "top top",
//             end: "+=1100",
//             scrub: 2,

//             // 🔥 FIX: last content should disappear after scroll passes
//             onLeave: () => {
//               gsap.set(".staircaseAnimation_content", { display: "none" });
//             },
//             onEnterBack: () => {
//               gsap.set(".staircaseAnimation_content", { display: "none" });
//             }
//           },
//         });

//         positions.forEach((pos, i) => {

//           tl.to(ballRef.current, {
//             opacity: i === 0 ? 1 : undefined,
//             x: pos.x,
//             y: pos.y,
//             ease: "none",
//             duration: 1,
//           });

//           const stepIndex = Math.floor(i / 2);

//           if (steps[stepIndex] && i % 2 === 1) {

//             tl.fromTo(
//               steps[stepIndex],
//               { opacity: 0.045 },
//               { opacity: 1, duration: 0.3 },
//               "-=2"
//             );

//             contentMap.forEach((selector, idx) => {
//               if (idx === stepIndex - 1) {
//                 tl.set(selector, { display: "block" }, "<");
//                 tl.fromTo(
//                   selector,
//                   { opacity: 0, y: 40 },
//                   { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
//                   "<"
//                 );
//               } else {
//                 tl.set(selector, { display: "none" }, "<");
//               }
//             });
//           }

//           if (i === 12 && steps[stepIndex]) {
//             tl.fromTo(
//               steps[stepIndex],
//               { opacity: 0.045 },
//               { opacity: 1, duration: 0.3 },
//               "-=2"
//             );
//           }
//         });
//       };

//       const mm = gsap.matchMedia();

//       const positions = [
//         { x: "1.5vw", y: "0px" },
//         { x: "4vw", y: "-42px" },
//         { x: "6.5vw", y: "-42px" },
//         { x: "9vw", y: "-87px" },
//         { x: "12.5vw", y: "-87px" },
//         { x: "16vw", y: "-132px" },
//         { x: "19.5vw", y: "-132px" },
//         { x: "22vw", y: "-180px" },
//         { x: "25.5vw", y: "-180px" },
//         { x: "28vw", y: "-222px" },
//         { x: "31.5vw", y: "-222px" },
//         { x: "35vw", y: "-270px" },
//         { x: "36.5vw", y: "-270px" },
//       ];

//       mm.add("(max-width: 380px)", () => createAnimation(positions));
//       mm.add("(min-width: 381px) and (max-width: 799px)", () => createAnimation(positions));
//       mm.add("(min-width: 800px)", () => createAnimation(positions));

//     });

//     return () => ctx.revert();
//   }, []);

//   return (
//     <>
//       <div ref={staircaseAnimation_wrapperRef} className='staircaseAnimation_wrapper service-com-content'>

//         <div className='staircaseAnimation_topContent'>
//           <div className='staircaseAnimation_content staircaseAnimation_content1'>
//             <h2>Scalable</h2>
//             <p>systems are designed to grow with demand, ensuring consistent performance, flexibility.</p>
//           </div>
//           <div className='staircaseAnimation_content staircaseAnimation_content3'>
//             <h2>performance</h2>
//             <p>performance solutions deliver speed, efficiency, and reliability, optimizing user experience, system responsiveness.</p>
//           </div>
//           <div className='staircaseAnimation_content staircaseAnimation_content5'>
//             <h2>Secure</h2>
//             <p>Enterprise-grade security protocols ensure robust data protection, encrypted transactions, and consistent system integrity.</p>
//           </div>
//         </div>

//         <div ref={staircaseAnimation_containerRef} className="staircaseAnimation_container">
//           <div className="staircaseAnimation_step"></div>

//           <div className="staircaseAnimation_step">
//             <span className="staircaseAnimation_stepText">Scalable</span>
//           </div>

//           <div className="staircaseAnimation_step">
//             <span className="staircaseAnimation_stepText">Future</span>
//           </div>

//           <div className="staircaseAnimation_step">
//             <span className="staircaseAnimation_stepText">Performance</span>
//           </div>

//           <div className="staircaseAnimation_step">
//             <span className="staircaseAnimation_stepText">Intelligent</span>
//           </div>

//           <div className="staircaseAnimation_step">
//             <span className="staircaseAnimation_stepText">Secure</span>
//           </div>

//           <div className="staircaseAnimation_step"></div>

//           <div ref={ballRef} className="staircaseAnimation_glowBall"></div>
//         </div>

//         <div className='staircaseAnimation_bottomContent'>
//           <div className='staircaseAnimation_content staircaseAnimation_content2'>
//             <h2>Future</h2>
//             <p>solutions integrate emerging technologies, adaptability, and innovation to ensure long-term relevance, competitive advantage.</p>
//           </div>
//           <div className='staircaseAnimation_content staircaseAnimation_content4'>
//             <h2>Intelligent</h2>
//             <p>strategies leverage AI, automation, and data insights to enhance decision-making, personalize experiences, and drive smarter.</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Steps;


