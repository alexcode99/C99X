
import { useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import './StepScrollAnimation.css'

gsap.registerPlugin(ScrollTrigger);

const StepScrollAnimation = () => {
  const containerRef = useRef();

 useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      const layers = gsap.utils.toArray(".scroll");

      let maxWords = 0;
      layers.forEach(layer => {
        const count = layer.querySelectorAll(".scroll-word").length;
        if (count > maxWords) maxWords = count;
      });

      let tl = gsap.timeline({
  scrollTrigger: {
    trigger: containerRef.current,
    // start: "top+=70px top",
    start:"top top",
    // end: () => {
    //   if (window.innerWidth < 600) {
    //     return "+=" + (maxWords * 140);
    //   } else if (window.innerWidth < 1024) {
    //     return "+=" + (maxWords * 120);
    //   } else {
    //     return "+=" + (maxWords * 150);
    //   }
    // },
    end:"+=3500",
    scrub: 1,
    pin: true,
    pinSpacing: true,
    // pinSpacing: false,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    refreshPriority :2
  }
});

      layers.forEach((layer) => {
        const words = layer.querySelectorAll(".scroll-word");
        let mm = gsap.matchMedia();

mm.add({
  isMobileXS: "(max-width: 375.99px)",
  isMobileSM: "(min-width: 376px) and (max-width: 575.99px)",
  isTablet: "(min-width: 576px) and (max-width: 768.99px)",
  isLaptop: "(min-width: 769px) and (max-width: 991.99px)",
  isDesktop: "(min-width: 992px) and (max-width: 1200.99px)",
  isLarge: "(min-width: 1201px) and (max-width: 1440.99px)",
  isLargeScreen: "(min-width: 1440px) and (max-width: 1700.99px)",
  isExtrascreen:"(min-width: 1700px) and (max-width: 2000px)",
}, (context) => {

  let { isMobileXS, isMobileSM, isTablet, isLaptop, isDesktop, isLarge, isLargeScreen, isExtrascreen } = context.conditions;

  let yValue = 43; // default

  if (isMobileXS) yValue = 43;
  else if (isMobileSM) yValue = 42;
  else if (isTablet) yValue = 42;
  else if (isLaptop) yValue = 41;
  else if (isDesktop) yValue = 41;
  else if (isLarge) yValue = 43;
  else if (isLargeScreen) yValue = 43;
  else if (isExtrascreen) yValue = 43;

  tl.to(words, {
    yPercent: - yValue * (words.length - 1),
    ease: "none"
  }, 0);

});

        // tl.to(words, {
        //   yPercent: -43 * (words.length - 1),
        //   ease: "none"
        // }, 0);
      });

    }, containerRef);

    //  initial refresh
    ScrollTrigger.refresh();

    return () => ctx.revert();

  }, []);

  // LOAD FIX (THIS IS WHAT YOU ASKED)
  useLayoutEffect(() => {
    const handleLoad = () => ScrollTrigger.refresh();

    window.addEventListener("load", handleLoad);

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  const data = [
    ["UI/UX DESIGN","UI/UX DESIGN", "WEB DEVELOPER", "DIGITAL MARKETING", "E-COMMERCE SITE", "WEB APPLICATION","VIDEO EDITING"
      //  "Co ntent", "Ads","Web Development", "React JS", "Node JS", "API", "MongoDB"

    ]
  ];
  const markdata= [
    [
      // "UI/UX DESIGN",
      "UI/UX DESIGN", 
      // "WEB DEVELOPER",
      "WEB DEVELOPER", "DIGITAL MARKETING", "E-COMMERCE SITE", "WEB APPLICATION","VIDEO EDITING","UI/UX DESIGN"],
  ]
  const datalist = [
    [
      // "UI/UX DESIGN",
      // "UI/UX DESIGN", 
      "WEB DEVELOPER",
      // "DIGITAL MARKETING",
       "DIGITAL MARKETING", "E-COMMERCE SITE", "WEB APPLICATION","VIDEO EDITING","UI/UX DESIGN","WEB DEVELOPER", ]
  ]

  return (
    <>
    <div className="staircase-scroll">
      <section className="parent-scroll" 
        ref={containerRef}
        >
          <div className="sticky">

            {/* layers here */}
            {/* Layer 1 */}
            <div className="layer">
              <div className="scroll">
                {data[0].map((item, i) => (
                  <div className="scroll-word" key={i} style={{margin:"-35px",}}>{item}</div>
                ))}
              </div>
            </div>

            {/* Layer 2 */}
            <div className="layer">
              <div className="scroll">
                {markdata[0].map((item, i) => (
                  <div className="scroll-word" key={i} style={{margin:"-35px"}}>{item}</div>
                ))}
              </div>
            </div>

            {/* Layer 3 */}
              <div className="layer layer-3">
                <div className="scroll">
                  {datalist[0].map((item, i) => (
                    <div className="scroll-word" key={i} style={{margin:"-35px"}}>{item}</div>
                  ))}
                </div>
              </div>

          </div>
        </section>
    </div>
    </>
  );
};

export default StepScrollAnimation;

// ---------------------------------------------------


// import { useEffect, useRef, useLayoutEffect } from "react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import './StepScrollAnimation.css'

// gsap.registerPlugin(ScrollTrigger);

// const StepScrollAnimation = () => {
//   const containerRef = useRef();

//  useLayoutEffect(() => {
//     let ctx = gsap.context(() => {

//       const layers = gsap.utils.toArray(".scroll");

//       let maxWords = 0;
//       layers.forEach(layer => {
//         const count = layer.querySelectorAll(".scroll-word").length;
//         if (count > maxWords) maxWords = count;
//       });

//       let tl = gsap.timeline({
//   scrollTrigger: {
//     trigger: containerRef.current,
//     // start: "top+=70px top",
//     start:"top top",
//     end: () => {
//       if (window.innerWidth < 600) {
//         return "+=" + (maxWords * 140);
//       } else if (window.innerWidth < 1024) {
//         return "+=" + (maxWords * 120);
//       } else {
//         return "+=" + (maxWords * 150);
//       }
//     },
//     scrub: 4,
//     fastScrollEnd: true,
//     pin: true,
//     // pinSpacing:true,
//     pinSpacing: false,
//     anticipatePin: 1,
//     invalidateOnRefresh: true,
//     refreshPriority :2
//   }
// });

//       layers.forEach((layer) => {
//         const words = layer.querySelectorAll(".scroll-word");

//         tl.to(words, {
//           yPercent: -100 * (words.length - 1),
//           ease: "none"
//         }, 0);

        
//       });

//     }, containerRef);

//     //  initial refresh
//     ScrollTrigger.refresh();

//     return () => ctx.revert();

//   }, []);

//   // LOAD FIX (THIS IS WHAT YOU ASKED)
//   useLayoutEffect(() => {
//     const handleLoad = () => ScrollTrigger.refresh();

//     window.addEventListener("load", handleLoad);

//     return () => window.removeEventListener("load", handleLoad);
//   }, []);
//     const data = [
//     ["UI/UX DESIGN","UI/UX DESIGN", "WEB DEVELOPER", "DIGITAL MARKETING", "E-COMMERCE SITE", "WEB APPLICATION","VIDEO EDITING","UI/UX DESIGN",,"WEB DEVELOPER",
//     ]
//   ];
//   const markdata= [
//     [
//       "UI/UX DESIGN", 
//       "WEB DEVELOPER", "DIGITAL MARKETING", "E-COMMERCE SITE", "WEB APPLICATION","VIDEO EDITING","UI/UX DESIGN", ,"WEB DEVELOPER", "DIGITAL MARKETING",],
//   ]
//   const datalist = [
//     [ 
//       "WEB DEVELOPER",
//        "DIGITAL MARKETING", "E-COMMERCE SITE", "WEB APPLICATION","VIDEO EDITING","UI/UX DESIGN","WEB DEVELOPER", "DIGITAL MARKETING","E-COMMERCE SITE",]
//   ]
//   // const data = [
//   //   ["UI/UX DESIGN","UI/UX DESIGN", "WEB DEVELOPER", "DIGITAL MARKETING", "E-COMMERCE SITE", "WEB APPLICATION","VIDEO EDITING"
//   //     //  "Co ntent", "Ads","Web Development", "React JS", "Node JS", "API", "MongoDB"

//   //   ]
//   // ];
//   // const markdata= [
//   //   [
//   //     // "UI/UX DESIGN",
//   //     "UI/UX DESIGN", 
//   //     // "WEB DEVELOPER",
//   //     "WEB DEVELOPER", "DIGITAL MARKETING", "E-COMMERCE SITE", "WEB APPLICATION","VIDEO EDITING","UI/UX DESIGN"],
//   // ]
//   // const datalist = [
//   //   [
//   //     // "UI/UX DESIGN",
//   //     // "UI/UX DESIGN", 
//   //     "WEB DEVELOPER",
//   //     // "DIGITAL MARKETING",
//   //      "DIGITAL MARKETING", "E-COMMERCE SITE", "WEB APPLICATION","VIDEO EDITING","UI/UX DESIGN","WEB DEVELOPER", ]
//   // ]

//   return (
//     <>
//     <div className="staircase-scroll">
//       <section className="parent-scroll" 
//         ref={containerRef}
//         >
//           <div className="sticky">

//             {/* layers here */}
//             {/* Layer 1 */}
//             <div className="layer">
//               <div className="scroll">
//                 {data[0].map((item, i) => (
//                   <div className="scroll-word" key={i} style={{margin:"-35px",}}>{item}</div>
//                 ))}
//               </div>
//             </div>

//             {/* Layer 2 */}
//             <div className="layer">
//               <div className="scroll">
//                 {markdata[0].map((item, i) => (
//                   <div className="scroll-word" key={i} style={{margin:"-35px"}}>{item}</div>
//                 ))}
//               </div>
//             </div>

//             {/* Layer 3 */}
//               <div className="layer layer-3">
//                 <div className="scroll">
//                   {datalist[0].map((item, i) => (
//                     <div className="scroll-word" key={i} style={{margin:"-35px"}}>{item}</div>
//                   ))}
//                 </div>
//               </div>

//           </div>
//         </section>
//     </div>
//     </>
//   );
// };

// export default StepScrollAnimation;

// // ---------------------------------------------------


// // import { useEffect, useRef, useLayoutEffect } from "react";
// // import gsap from "gsap";
// // import ScrollTrigger from "gsap/ScrollTrigger";
// // import './StepScrollAnimation.css'

// // gsap.registerPlugin(ScrollTrigger);

// // const StepScrollAnimation = () => {
// //   const containerRef = useRef();


// // useEffect(() => {
// //   let timeout;

// //   const handleResize = () => {
// //     clearTimeout(timeout);
// //     timeout = setTimeout(() => {
// //       ScrollTrigger.refresh();
// //     }, 200);
// //   };

// //   window.addEventListener("resize", handleResize);

// //   return () => window.removeEventListener("resize", handleResize);
// // }, []);


// // // ------------------------------------------
// //  useLayoutEffect(() => {
// //     let ctx = gsap.context(() => {

// //       const layers = gsap.utils.toArray(".scroll-word");
// //       const container = containerRef.current;

// //       const firstLayer = container.querySelector(".scroll-word");
// //       const word = firstLayer.querySelector(".staircase-word");

// //       const wordHeight = word.offsetHeight - 35;
// //       const totalWords = firstLayer.querySelectorAll(".staircase-word").length;

// //       const totalScrollHeight = wordHeight * (totalWords - 1);

// //       let maxWords = 0;
// //       layers.forEach(layer => {
// //         const count = layer.querySelectorAll(".staircase-word").length;
// //         if (count > maxWords) maxWords = count;
// //       });

// //     let tl = gsap.timeline({
// //   scrollTrigger: {
// //     trigger: containerRef.current,
// //     start: "top top",
// //     // start:"top center",
// //     // start: "top+=100% top",

// //     end: () => {
// //       const firstLayer = containerRef.current.querySelector(".scroll-word");
// //       const word = firstLayer.querySelector(".staircase-word");
// //       const wordHeight = word.offsetHeight - 35;
// //       const totalWords = firstLayer.querySelectorAll(".staircase-word").length;

// //       let multiplier;

// //       if (window.innerWidth < 600) {
// //         multiplier = 2.5; //  mobile (short height)
// //       } else if (window.innerWidth < 1024) {
// //         multiplier = 3.5; //  tablet
// //       } else {
// //         multiplier = 4.5; //  desktop (slow but compact)
// //       }

// //       //  PERFECT BALANCE (slow + less height)
// //       // return "+=" + (wordHeight * (totalWords - 1) * 3);
// //       return "+=" + (wordHeight * (totalWords - 1));
// //     },

// //     scrub: 2.5, //  smooth but not too long
// //     pin: true,
// //     anticipatePin: 1,
// //     pinSpacing: true,
// //     markers: true,
// //     invalidateOnRefresh: true,
// //     fastScrollEnd: true
// //   }
// // });

// // const speeds = [1, 0.75, 0.5];


// // ScrollTrigger.config({
// //   ignoreMobileResize: true
// // });
// //     // ------------------------------------

// //       layers.forEach((layer) => {
// //         const words = layer.querySelectorAll(".staircase-word");
// //         const word = layer.querySelector(".staircase-word");
// //         const wordHeight = word.offsetHeight;

// //         tl.to(words, {
// //           y: -wordHeight * (words.length - 1),
// //           ease: "none",
// //           duration: 3
// //         }, 0);

// //       });

// //     }, containerRef);

// //     //  initial refresh
// //     ScrollTrigger.refresh();

// //     return () => ctx.revert();

// //   }, []);

// //   // LOAD FIX (THIS IS WHAT YOU ASKED)
// //   useLayoutEffect(() => {
// //     const handleLoad = () => ScrollTrigger.refresh();

// //     window.addEventListener("load", handleLoad);

// //     return () => window.removeEventListener("load", handleLoad);
// //   }, []);

//   // const data = [
//   //   ["UI/UX DESIGN","UI/UX DESIGN", "WEB DEVELOPER", "DIGITAL MARKETING", "E-COMMERCE SITE", "WEB APPLICATION","VIDEO EDITING","UI/UX DESIGN",,"WEB DEVELOPER",
//   //   ]
//   // ];
//   // const markdata= [
//   //   [
//   //     "UI/UX DESIGN", 
//   //     "WEB DEVELOPER", "DIGITAL MARKETING", "E-COMMERCE SITE", "WEB APPLICATION","VIDEO EDITING","UI/UX DESIGN", ,"WEB DEVELOPER", "DIGITAL MARKETING",],
//   // ]
//   // const datalist = [
//   //   [ 
//   //     "WEB DEVELOPER",
//   //      "DIGITAL MARKETING", "E-COMMERCE SITE", "WEB APPLICATION","VIDEO EDITING","UI/UX DESIGN","WEB DEVELOPER", "DIGITAL MARKETING","E-COMMERCE SITE",]
//   // ]

// //     const baseWords = [
// //   "UI/UX DESIGN",
// //   "WEB DEVELOPER",
// //   "DIGITAL MARKETING",
// //   "E-COMMERCE SITE",
// //   "WEB APPLICATION",
// //   "VIDEO EDITING"
// // ];

// // // repeat pattern
// // const repeatCount = 1;

// // const words = Array.from({ length: repeatCount })
// //   .flatMap(() => baseWords);
  

// //   return (
// //     <>
// //     <div className="staircase-scroll">
// //       <div>
// //         <section className="parent-scroll" 
// //           ref={containerRef}
// //           >
// //             <div className="sticky">

// //               {/* layers here */}
// //               {/* Layer 1 */}
// //               <div className="layer">
// //                 <div className="scroll-word">
// //                   {data[0].map((item, i) => (
// //                     <div className="staircase-word" key={i} style={{margin:"-35px",}}>{item}</div>
// //                   ))}
// //                 </div>
// //               </div>

// //               {/* Layer 2 */}
// //               <div className="layer">
// //                 <div className="scroll-word">
// //                   {markdata[0].map((item, i) => (
// //                     <div className="staircase-word" key={i} style={{margin:"-35px"}}>{item}</div>
// //                   ))}
// //                 </div>
// //               </div>

// //               {/* Layer 3 */}
// //                 <div className="layer layer-3">
// //                   <div className="scroll-word">
// //                     {datalist[0].map((item, i) => (
// //                       <div className="staircase-word" key={i} style={{margin:"-35px"}}>{item}</div>
// //                     ))}
// //                   </div>
// //                 </div>

// //             </div>
// //           </section>
// //       </div>
// //     </div>
// //     </>
// //   );
// // };

// // export default StepScrollAnimation;

// // // ---------------------------------------------------
