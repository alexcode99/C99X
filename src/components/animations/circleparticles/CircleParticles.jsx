import React, { useEffect, useRef, useLayoutEffect, useState } from "react";
import './CircleParticles.css'
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import MotionPathHelper from "gsap/MotionPathHelper";
import ScrollTrigger from "gsap/ScrollTrigger";


//images
import Web from '../../../assets/Home_Page_Assets/Service_Icon/Web_application.gif'
import UIUX from '../../../assets/Home_Page_Assets/Service_Icon/ui_ux.gif'
import Digital from "../../../assets/Home_Page_Assets/Service_Icon/Digital_marketing.gif"
import Ecommerce from '../../../assets/Home_Page_Assets/Service_Icon/E_commerce.gif'
import VideoEdit from '../../../assets/Home_Page_Assets/Service_Icon/video-editing.gif'
import WebDevelopment from '../../../assets/Home_Page_Assets/Service_Icon/Web_Deveolopment.gif'
import { div } from "framer-motion/client";
import CosmicParticles from "./CosmicParticles";
import ParticleSphere from "./ParticleSphere";


gsap.registerPlugin(MotionPathPlugin, MotionPathHelper, ScrollTrigger);

const CircleParticles = () => {

//   const particleRef = useRef(null);
  const itemsRef = useRef([]);
  const contentRef = useRef(null);
  const activeIndexRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [radius, setRadius] = useState(80);
  // const path = "M1583.996,520.80099 C1583.996,551.77699 1361.342,62.03999 774.396,59.80199 259.116,57.83199 -32.584,521.59999 -1.602,521.59999";

  //Particles

  // useEffect(() => {
  //   const update = () => {
  //     const handleResize = () => {
  //   ScrollTrigger.refresh();
    
  // };
  //     const w = window.innerWidth;

  //     if (w < 375) setRadius(70);
  //     else if (w < 576) setRadius(120);
  //     else if(w < 768 ) setRadius(200)
  //     else setRadius(180); //  BIG desktop sphere
  //   };

  //   update();
  //   window.addEventListener("resize", update);

  //   return () => window.removeEventListener("resize", update);
  // }, []);
  useEffect(() => {
  const update = () => {
    const w = window.innerWidth;

    if (w < 480.99) setRadius(60);
    else if (w < 768.99) setRadius(90);
    else if (w < 1024.99) setRadius(130);
    else setRadius(160); //  BIG desktop sphere
    // if (w < 375) setRadius(70);
    // else if (w < 576) setRadius(70);
    // else if (w < 768) setRadius(100);
    // else setRadius(180);

    // ScrollTrigger.refresh(); //  IMPORTANT
  };

  update();
  window.addEventListener("resize", update);

  return () => window.removeEventListener("resize", update);
}, []);
  
  // ----------------------------------------
//   useEffect(() => {
//   const handleResize = () => {
//     ScrollTrigger.refresh();
//   };

//   window.addEventListener("resize", handleResize);

//   return () => window.removeEventListener("resize", handleResize);
// }, []);


  //RESPONSIVE GSAP
useLayoutEffect(() => {
  let ctx;
  let resizeTimeout;

  const init = () => {
    ctx && ctx.revert(); //  OLD animation remove

    ctx = gsap.context(() => {

      const getScale = () => (window.innerWidth < 575 ? 0.5 : 1);

      let multiplier =
        window.innerWidth < 600 ? 400 :
        window.innerWidth < 1024 ? 600 : 800;

      let tl = gsap.timeline({
        scrollTrigger: {
          // trigger: ".particles-circle",
          // start: "top top",
          // end: "+=" + ((itemsRef.current.length + 1) * multiplier),
          // scrub: 1.2,
          // pin: true,
          // pinSpacing: true,
          // anticipatePin: 1,
           trigger: ".particles-circle",
          start: "top top",
          end: "+=" + ((itemsRef.current.length + 1) * multiplier),
          scrub: 1.2,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          // invalidateOnRefresh: true,
          refreshPriority:2,
          // // invalidateOnRefresh: false,
          // // markers: true,
          onUpdate: (self) => {
  let total = itemsRef.current.length;

  let segment = 1 / total;

  //  if we reduce offset means it trigger early
  let triggerOffset = 0.3; // try 0.2 - 0.4

  let index = Math.floor((self.progress + segment * triggerOffset) / segment);

  index = Math.min(index, total - 1);

  if (activeIndexRef.current !== index) {
    activeIndexRef.current = index;

    gsap.to(contentRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        setActiveIndex(index);

        gsap.fromTo(contentRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3 }
        );
      }
    });
  }
}
          //  onUpdate: (self) => {
          //     let total = itemsRef.current.length;
          //     let index = Math.round(self.progress * (total - 1));

          //     if (activeIndexRef.current !== index) {
          //       activeIndexRef.current = index;

          //       gsap.to(contentRef.current, {
          //         y: -20,
          //         opacity: 0,
          //         duration: 0.2,
          //         onComplete: () => {
          //           setActiveIndex(index);

          //           gsap.fromTo(contentRef.current,
          //             { y: 20, opacity: 0 },
          //             { y: 0, opacity: 1, duration: 0.3 }
          //           );
          //         }
          //       });
          //     }
          //   }
        }
      });
      

      //  FIRST ITEM CENTER
      gsap.set(itemsRef.current[0], {
        motionPath: {
          path: ".motion-path",
          align: ".motion-path",
          alignOrigin: [0.5, 0.5],
          start: 0.5,
          end: 0.5,
          
        },
        opacity: 1,
        scale: getScale()
      });

      setActiveIndex(0);
      activeIndexRef.current = 0;

      gsap.set(contentRef.current, {
        opacity: 1,
        y: 0
      });

      // ---------------------------
      

      //   LOOP
      itemsRef.current.forEach((el, i) => {

        if (i === 0) {
          tl.to(el, {
            motionPath: {
              path: ".motion-path",
              align: ".motion-path",
              alignOrigin: [0.5, 0.5],
              start: 0.5,
              end: 1
            },
            opacity: 0,
            scale: getScale(),
            duration: 1,
            immediateRender: false
          });
          return;
        }

        tl.fromTo(el,
          { opacity: 0, scale: getScale() },
          {
            motionPath: {
              path: ".motion-path",
              align: ".motion-path",
              alignOrigin: [0.5, 0.5],
              start: 0,
              end: 0.5
            },
            opacity: 1,
            scale: getScale(),
            duration: 1,
          //   onUpdate: function () {
          //     let progress = this.progress();
          // // let index = Math.round(self.progress * (total - 1));
          //     // if (Math.abs(progress - 0.5) < 0.05) 
          //     // if (progress >= 0.48 && progress <= 0.52)
          //     if (progress >= 0.95 && progress <= 0.99)
          //       {
          //       if (activeIndexRef.current !== i) {

          //         activeIndexRef.current = i;

          //         gsap.to(contentRef.current, {
          //           y: -20,
          //           opacity: 0,
          //           duration: 0.2,
          //           onComplete: () => {
          //             setActiveIndex(i);

          //             gsap.fromTo(contentRef.current,
          //               { y: 20, opacity: 0 },
          //               { y: 0, opacity: 1, duration: 0.3 }
          //             );
          //           }
          //         });
          //       }
          //     }
          //   }
          }
        );

        if (i !== itemsRef.current.length - 1) {
          tl.to(el, {
            motionPath: {
              path: ".motion-path",
              align: ".motion-path",
              alignOrigin: [0.5, 0.5],
              start: 0.5,
              end: 1
            },
            opacity: 0,
            scale: getScale(),
            duration: 1
          });
        }

      });

      tl.to({}, { duration: 1 });
 

    });
  };
  

  //  INIT FIRST
  init();

  //  RESIZE FIX (debounce)
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      init(); //  recreate animation
      ScrollTrigger.refresh();
    }, 300);
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
    ctx && ctx.revert();
  };

}, []);

    const ParicleData = [
      // {image:"", title:"",content1:"", content2:""},
      { 
        image:Digital, title:"Digital Marketing & AI Growth",
        content1:"Dominate search rankings with AI-powered SEO, hyper-targeted Google & Meta ads, and automated lead generation funnels built for maximum ROI.", 
        // content2:"Lead generation funnels, automation Workflows and ROI optimization systems"
      },
      {
        image: WebDevelopment, 
        title:"Custom Web Development",
        content1:"Fast, mobile-responsive, and SEO-optimized websites built using modern HTML5, CSS3, and JavaScript frameworks for high conversion rates.", 
        // content2:"Custom CMS Platform with secure architecture and optimized performance."
      },
      {
        image:Ecommerce, 
        title:"E-Commerce Solutions",
        content1:"Scalable online stores equipped with secure payment gateways, inventory sync, and seamless checkout flows that drive sales.", 
        // content2:"Secure checkout systems and intelligent product management solutions"
      },
      {
        image: UIUX, 
        title:" UI & UX Designing",
        content1:"User-centric interface designs and conversion-focused wireframes that enhance engagement and deliver intuitive user journeys.", 
        // content2:"Wireframing, protoyping, and  useability optimization frameworks "
        },
        {
        image:Web, 
        title:"Enterprise Web Applications",
        content1:" High-concurrency web apps powered by secure Java microservices, Python AI backends, and scalable cloud architectures.", 
        // content2:"Secure API integrations with cloud-based automation infrastructure"
       },
      {
        image:VideoEdit, 
        title:"Design & Video Editing",
        content1:"Scroll-stopping graphic designs and high-impact video edits that build brand authority and multiply audience engagement. ", 
        // content2:"Profession editing for social media, ads, and digital campaigns"
      },
      
      
      
      
    ]
    const [isMobiled, setIsMobiled] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobiled(window.innerWidth <= 475); // mobile breakpoint
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <>
     <div style={{background:"#000202"}}>
      <h2 className="home-title">Services</h2>
     </div>
    <section className="particles-circle">
     
      <CosmicParticles className="particles-bg"
        // quantity={1000}
        // quantity={ !isMobiled ? 300 : 150}
        // ease={10}
        color={["#ffffff", "#5353d1", "#affe04"]}
        // size={1}
          quantity={!isMobiled ? 100 : 150}
          staticity={30}
          ease={80}
          size={0.01}
          // color={["#ffffff", "#7dd3fc", "#c084fc"]}
          vx={0.1}
          vy={0.05}
        
        />

      <div className="circle-container">
        {/* <div className="particle">
          {ParicleData.map((item, i) => (
            <div
            
              className="particle-content"
              key={i}
              ref={(el) => (itemsRef.current[i] = el)}
            >
              <div className="particle-content-box">
                <h4>{item.title}</h4>
                <img src={item.image} className="Particle-gif" />
              </div>
            </div>
          ))}
        </div> */}
        <div className="particle">
          
          {ParicleData.map((item, i) => (
            <div
              className="particle-content"
              key={i}
              ref={(el) => (itemsRef.current[i] = el)}
            >
              
              {/*  PARTICLES (BACKGROUND OF EACH ITEM) */}
              <div className="Particle-spherescoll">
                {/* <ParticleSphere
                className="item-particles"
                particleCount={420}
                // radius={80}
                radius={window.innerWidth < 375 ? 60 : 80}
                particleSize={0.5}
                color="white"
              /> */}
              <ParticleSphere
                particleCount={window.innerWidth < 768 ? 500 : 1500}
                radius={radius}
                particleSize={0.5}
                color="#FFFFFF"
                rotationSpeed={0.0015}
                interactionRadius={180}
                clickForce={2}
                interactionStrength={0.15}
              />
              </div>

              {/*  ACTUAL CONTENT */}
              <div className="particle-content-box">
                <h4>{item.title}</h4>
                <img src={item.image} className="Particle-gif" />
              </div>

            </div>
          ))}
        </div>
{/* --------------------------------- */}
        {/* SVG Path (visual reference) */}
        <svg className="half-circle" viewBox="0 0 1600 600">
          <path
          className="motion-path"
            d="M1583.996,520.80099 C1583.996,551.77699 1361.342,62.03999 774.396,59.80199 259.116,57.83199 -32.584,521.59999 -1.602,521.59999"
            stroke="White"
            fill="none"
          />
        </svg>

        
            
      </div>

      {/* CONTENT  */}
        <section className="particle-des">

            <div className="content-section" ref={contentRef}>
              <h5>{activeIndex !== null && ParicleData[activeIndex]?.title}</h5>
              {/* <ul> */}
                {/* <li>{ParicleData[activeIndex]?.content1} </li>
                <li>{ParicleData[activeIndex]?.content2}</li> */}
                <p>{activeIndex !== null && ParicleData[activeIndex]?.content1}</p>
                {/* <li>{activeIndex !== null && ParicleData[activeIndex]?.content2}</li> */}
              {/* </ul> */}
              {/* <p></p>
              <p></p> */}
            </div>

        </section>

    </section>
    </>
  );
};

export default CircleParticles;

