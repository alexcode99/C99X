// Hero.jsx
import React, { useRef, useEffect } from "react";
import ParticleText from "./ParticleText";
import "./Hero.css";
import GridGlow from "./background/GridGlow";
import Lights from "../../../assets/Home_Page_Assets/Lights.png";
import { RxChevronRight } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import BackgroundVideo from "./background/BackVideo";

const Hero = () => {
  const particleSize =
    window.innerWidth < 480 ? 1 : window.innerWidth < 768 ? 1.3 : 1.6;

  const navigate = useNavigate();

  const services = [
    "UI/UX DESIGN",
    "LEAD GENERATION",
    "VIDEO EDITOR",
    "DIGITAL MARKETING",
    "WEB DEVELOPMENT",
  ];

  const buttonRef = useRef(null);
  const flairRef = useRef(null);

  useEffect(() => {
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
      flair.style.left = `${x}%`;
      flair.style.top = `${y}%`;
      flair.style.transform = "translate(-50%, -50%) scale(1)";
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
      button.removeEventListener("mouseenter", mouseEnter);
      button.removeEventListener("mousemove", mouseMove);
      button.removeEventListener("mouseleave", mouseLeave);
    };
  }, []);

  return (
    <>
      {/* <GridGlow> */}
      <BackgroundVideo>
        <section className="home-hero">
          <div className="home-hero-agency">
            Best Digital Marketing Agency in Chennai
          </div>

          <div className="home-particles">
            <ParticleText
              text1="C99"
              text2="X"
              color1="white"
              color2="#95C924"
              particleSize={particleSize}
            />
          </div>
          
          <h1> Best Digital Marketing & Web Development Agency in Chennai</h1>
          <p>
            C99X empowers ambitious brands with AI-powered marketing strategies, 
            high-performance web development, and custom web applications engineered for predictable revenue growth.
          </p>

          <div className="section_1_btn">
            <div className="hero-button-wrapper">
              <button className="hero-button home-hero-btn-1" ref={buttonRef}>
                <span className="hero-button__flair" ref={flairRef}></span>
                <span className="hero-button__label">
                  Get Started <RxChevronRight />
                </span>
              </button>
            </div>

            <button className="home-hero-btn-2">Learn More</button>
          </div>
        </section>
        </BackgroundVideo>
      {/* </GridGlow> */}

      <section className="home-carousel  section_gap">
        <div className="home-ligh-back">
          <img src={Lights} alt="Top Light" />
        </div>

        <section className="hero-marquee-scroll">
          <div className="marquee-track">
            <div className="hero-marquee">
              {/* {services.map((item, index) => (
                <React.Fragment key={index}>
                  <span className="marquee-text">{item}</span>
                  {index !== services.length - 1 && (
                    <div className="maquee-circle"></div>
                  )}
                </React.Fragment>
              ))} */}
              {services.map((item, index) => (
                <React.Fragment key={index}>
                  <span className="marquee-text">{item}</span>
                  <div className="maquee-circle"></div>
                </React.Fragment>
              ))}
            </div>

            <div className="hero-marquee">
              {/* {services.map((item, index) => (
                <React.Fragment key={`dup-${index}`}>
                  <span className="marquee-text">{item}</span>
                  {index !== services.length - 1 && (
                    <div className="maquee-circle"></div>
                  )}
                </React.Fragment>
              ))} */}
              {services.map((item, index) => (
                <React.Fragment key={`dup-${index}`}>
                  <span className="marquee-text">{item}</span>
                  <div className="maquee-circle"></div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        <div className="home-ligh-back-1">
          <img src={Lights} alt="Bottom Light" />
        </div>
      </section>
    </>
  );
};

export default Hero;


// import React from "react";
// import ParticleText from "./ParticleText";
// import "./Hero.css";
// import GridGlow from "./background/GridGlow";
// //image
// import Lights from '../../../assets/Home_Page_Assets/Lights.png'
// //icons
// import { RxChevronRight } from "react-icons/rx";
// import { useNavigate } from "react-router-dom";
// import { useRef,useEffect } from "react";

// const Hero = () => {

//   const particleSize =
//     window.innerWidth < 480 ? 1 :
//       window.innerWidth < 768 ? 1.3 : 1.6;
//   const navigate = useNavigate();
//   const Serivces = [
//     // "Digital Marketing",
//     // "Web Development",
//     // "web Design",
//     // "E-CommerceSite",
//     // "Viedo & Design Editing"
//     "UI/UX DESIGN", "LEAD GENERATION", "VIDEO EDITOR", "DIGITAL MARKETING", "DEVELOPMENT"
//   ];
//   const services = [
//     "UI/UX DESIGN",
//     "LEAD GENERATION",
//     "VIDEO EDITOR",
//     "DIGITAL MARKETING",
//     "DEVELOPMENT",
//   ];
//   const MarqueData = [...Serivces, ...Serivces,];


//   //  text hover 

//   // refs
//   const buttonRef = useRef(null);
//   const flairRef = useRef(null);

//   //  FIXED: moved to useEffect
//   useEffect(() => {
//     const button = buttonRef.current;
//     const flair = flairRef.current;

//     if (!button || !flair) return;

//     const mapRange = (inMin, inMax, outMin, outMax, val) =>
//       ((val - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;

//     const clamp = (min, max, val) =>
//       Math.min(max, Math.max(min, val));

//     const getXY = (e) => {
//       const { left, top, width, height } = button.getBoundingClientRect();

//       const x = clamp(0, 100, mapRange(0, width, 0, 100, e.clientX - left));
//       const y = clamp(0, 100, mapRange(0, height, 0, 100, e.clientY - top));

//       return { x, y };
//     };

//     const mouseEnter = (e) => {
//       const { x, y } = getXY(e);

//       flair.style.transition = "transform 0.4s cubic-bezier(0.23,1,0.32,1)";
//       flair.style.left = `${x}%`;
//       flair.style.top = `${y}%`;

//       requestAnimationFrame(() => {
//         flair.style.transform = "translate(-50%, -50%) scale(1)";
//       });
//     };

//     const mouseMove = (e) => {
//       const { x, y } = getXY(e);
//       flair.style.left = `${x}%`;
//       flair.style.top = `${y}%`;
//     };

//     const mouseLeave = (e) => {
//       const { x, y } = getXY(e);

//       flair.style.left = `${x}%`;
//       flair.style.top = `${y}%`;
//       flair.style.transform = "translate(-50%, -50%) scale(0)";
//     };

//     button.addEventListener("mouseenter", mouseEnter);
//     button.addEventListener("mousemove", mouseMove);
//     button.addEventListener("mouseleave", mouseLeave);

//     return () => {
//       button.removeEventListener("mouseenter", mouseEnter);
//       button.removeEventListener("mousemove", mouseMove);
//       button.removeEventListener("mouseleave", mouseLeave);
//     };
//   }, []);

//   return (
//     <>
//       <GridGlow>
//         <section className="home-hero ">
//           <div className="home-hero-agency">Best Digital Marketing Agency in Chennai</div>
//           <div className="home-particles">
//             <ParticleText
//               text1="C99"
//               text2="X"
//               color1="white"
//               color2="#95C924"
//               particleSize={particleSize}
//             />
//           </div>

//           <p>
//             C99X is recognized as the Best Digital Marketing Agency in Chennai,
//             empowering brands with AI-powered strategies, predictive analytics,
//             and measurable revenue growth systems.
//           </p>

//           {/* <div className="hero-buttons"> */}

//           <div className="section_1_btn">
//             <div className="hero-button-wrapper">
//               <button className="hero-button" ref={buttonRef}>
//                 <span className="hero-button__flair" ref={flairRef}></span>

//                 <span className="hero-button__label">
//                   Get Started <RxChevronRight />
//                 </span>
//               </button>
//             </div>


//             <button className="home-hero-btn-2">Learn More</button>
//           </div>


          

          

//         </section>
//       </GridGlow>

//       {/*   CAROUSEL */}
//       <section className="home-carousel">

//         {/* BACKGROUND LIGHT IMAGE BEFORE */}
//           <div className="home-ligh-back">
//             <div>
//               <img src={Lights} alt="Light Image" />
//             </div>
//           </div>
          
//           {/* -----marquee ----- */}
//           <div className="home-ligh-back">
//             <div>
//               <img src={Lights} alt="Light Image" />
//             </div>
//           </div>
//           {/* ---------------------- */}


//           {/* MARQUEE CAROUSEL  */}
//           <section className="hero-marquee-scroll">
//             <div className="marquee-track">

//               {/* ORIGINAL */}
//               <div className="hero-marquee">
//                 {services.map((item, index) => (
//                   <React.Fragment key={index}>
//                     <span className="marquee-text">{item}</span>
//                     {index !== services.length - 1 && (
//                       <div className="maquee-circle"></div>
//                     )}
//                   </React.Fragment>
//                 ))}
//               </div>

//               {/* DUPLICATE */}
//               <div className="hero-marquee">
//                 {services.map((item, index) => (
//                   <React.Fragment key={"dup-" + index}>
//                     <span className="marquee-text">{item}</span>
//                     {index !== services.length - 1 && (
//                       <div className="maquee-circle"></div>
//                     )}
//                   </React.Fragment>
//                 ))}
//               </div>

//             </div>
//           </section>


//           {/* MBACKGROUND LIGHT IMAGE AFTER */}
//           <div className="home-ligh-back-1">
//             <div>
//               <img src={Lights} alt="Light Image" />
//             </div>
//           </div>
                
//       </section>
//     </>
//   );
// };

// export default Hero;