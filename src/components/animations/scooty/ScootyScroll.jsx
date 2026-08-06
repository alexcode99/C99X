  import { useLayoutEffect, useRef } from "react";
  import gsap from "gsap";
  import { ScrollTrigger, MotionPathPlugin } from "gsap/all";
  import "./ScootyScroll.css";
  import ScootyImg from "../../../assets/Home_Page_Assets/scooty.png";
  // Video
  import Smoke from '../../../assets/Home_Page_Assets/scooter_smoke.mp4'
  //gif
  import BulletPoint from '../../../assets/Home_Page_Assets/bullet-point.gif'
// import { title } from "framer-motion/client";
  gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

  const ScootyScroll = () => {

    const containerRef = useRef();
      useLayoutEffect(() => {
        let lastDirection = null;
        let curveIndex = -1;
        const ctx = gsap.context(() => {

  const path = containerRef.current.querySelector(".scooty-path");
  const video = containerRef.current.querySelector(".scooty-smoke");
  const isMobile = () => window.innerWidth <= 768;
  const curveCenters = [];
  let rawPath;

const totalWaves = 4;


for (let i = 0; i < totalWaves; i++) {
  const start = i / totalWaves;
  const end = (i + 1) / totalWaves;

  // const center = (start + end) / 2.2;
    const center = (start + end) / 2.5;

  curveCenters.push(center);
}

// console.log("Here We Have ",curveCenters);

function setupPath() {
   rawPath = MotionPathPlugin.getRawPath(path);
   const oldContent = containerRef.current.querySelectorAll(".mobile-curve-content");
oldContent.forEach(el => el.remove());

const oldBullets = containerRef.current.querySelectorAll(".curve-bullet");
oldBullets.forEach(el => el.remove());
  if (!path) return;
  rawPath = MotionPathPlugin.getRawPath(path);

 

  curveCenters.length = 0;

  const totalWaves = 4;

  for (let i = 0; i < totalWaves; i++) {
    const start = i / totalWaves;
    const end = (i + 1) / totalWaves;

    // curveCenters.push((start + end) / 2);
    curveCenters.push((start + end) / 2);
  }

}
setupPath();

//  resize fix
ScrollTrigger.addEventListener("refreshInit", setupPath);

// ------------------------------------------------
// function showBulletAt(progressPoint) {
//   const container = containerRef.current.querySelector(".scooty-inner");

//   const bullet = document.createElement("img");
//   bullet.src = BulletPoint;
//   bullet.className = "curve-bullet";

//   const pos = MotionPathPlugin.getPositionOnPath(rawPath, progressPoint);

//   // OFFSET FIX (adjust based on your scooty size)
//   const OFFSET_X = -20;
//   const OFFSET_Y = -20;

//   bullet.style.position = "absolute";
//   bullet.style.left = `${pos.x + OFFSET_X}px`;
//   bullet.style.top = `${pos.y + OFFSET_Y}px`;

//   container.appendChild(bullet);

//   gsap.fromTo(
//     bullet,
//     { scale: 0, opacity: 0 },
//     { scale: 1.2, opacity: 1, duration: 0.4, ease: "back.out(2)" }
//   );

//   gsap.to(bullet, {
//     opacity: 0,
//     delay: 1,
//     onComplete: () => bullet.remove()
//   });
// }
function showBulletAt(progressPoint) {
  const container = containerRef.current.querySelector(".scooty-inner");

  const bullet = document.createElement("img");
  bullet.src = BulletPoint;
  bullet.className = "curve-bullet";

  const pos = MotionPathPlugin.getPositionOnPath(rawPath, progressPoint);

  bullet.style.position = "absolute";
  bullet.style.left = `${pos.x}px`;
  bullet.style.top = `${pos.y}px`;
  bullet.style.transform = "translate(-50%, -50%)";
  bullet.style.width = "30px"; // adjust
  bullet.style.height = "30px";
  bullet.style.objectFit = "contain";

  container.appendChild(bullet);

  gsap.fromTo(
    bullet,
    { scale: 0, opacity: 0 },
    { scale: 1.2, opacity: 1, duration: 0.9, ease: "back.out(2)" }
  );

  gsap.to(bullet, {
    opacity: 0,
    delay: 3,
    onComplete: () => bullet.remove()
  });
}
ScrollTrigger.getAll().forEach(t => t.kill());
gsap.killTweensOf("*");
// ------------------------------------
function showCurveContent(index) {
  const data = contentData[index];
  if (!data) return;

  const rightEl = containerRef.current.querySelector(".scooty-content_right");
  const leftEl = containerRef.current.querySelector(".scooty-content_left");

  // normalize text (string OR array)
  let contentHTML = "";

  if (Array.isArray(data.text)) {
    contentHTML = data.text.map(item => `
     <div className="phone-content">
        <h3>${item.title}</h3>
        <p>${item.des}</p>
      </div>
    `).join("");
  } else {
    contentHTML = `
      ${data.title ? `<h3>${data.title}</h3>` : ""}
      <p>${data.text}</p>
    `;
  }

  if (index % 2 === 0) {
    rightEl.innerHTML = contentHTML;
    gsap.to(rightEl, { x: 0, opacity: 1, duration: 0.4 });
    gsap.to(leftEl, { x: -100, opacity: 0, duration: 0.4 });
  } else {
    leftEl.innerHTML = contentHTML;
    gsap.to(leftEl, { x: 0, opacity: 1, duration: 0.4 });
    gsap.to(rightEl, { x: 100, opacity: 0, duration: 0.4 });
  }
}
// function showCurveContent(index) {
//   const data = contentData[index];
//   if (!data) return;

//   const rightEl = containerRef.current.querySelector(".scooty-content_right");
//   const leftEl = containerRef.current.querySelector(".scooty-content_left");

//   // if (index % 2 === 0)
//   if (index % 2 === 0) // right
//      {
//     // rightEl.innerHTML = data.title;
//     rightEl.innerHTML = data.text;

//     gsap.to(rightEl, { x: 0, opacity: 1, duration: 0.4 });
//     gsap.to(leftEl, { x: -100, opacity: 0, duration: 0.4 });

//   } else {
//     leftEl.innerHTML = data.text;

//     gsap.to(leftEl, { x: 0, opacity: 1, duration: 0.4 });
//     gsap.to(rightEl, { x: 100, opacity: 0, duration: 0.4 });
//   }
// }
// --------------------------------------------------
function showMobileContent(index, progressPoint) {
  const container = containerRef.current.querySelector(".scooty-inner");
  const old = container.querySelectorAll(".mobile-curve-content");
old.forEach(el => el.remove());

  const data = contentData[index];
  if (!data) return;

  const content = document.createElement("div");
  content.className = "mobile-curve-content";

  // only h3 (as you said)
  content.innerHTML = `<h3>${data.title || (data.text?.[0]?.title || "")}</h3>`;

  const pos = MotionPathPlugin.getPositionOnPath(rawPath, progressPoint, true);

  //  Position near bullet
  content.style.position = "absolute";
  // content.style.left = `${pos.x + 20}px`; 
//   const offsetX = index % 2 === 0 ? 20 : -100;
// content.style.left = `${pos.x + offsetX}px`;
let left = pos.x + 20;

// prevent overflow
if (left > window.innerWidth - 150) {
  left = pos.x - 120;
}

content.style.left = `${left}px`;
  content.style.top = `${pos.y - 20}px`;

  container.appendChild(content);
console.log("Mobile:", isMobile());
  // animation
  gsap.fromTo(content,
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.4 }
  );

  // remove after some time
  gsap.to(content, {
    opacity: 0,
    delay: 1,
    onComplete: () => content.remove()
  });
}
// --------------------------------------------------

// function createSmokeTrail() {
//   const container = containerRef.current.querySelector(".scooty-image_container");

//   if (!container) return;

//   const trail = document.createElement("video");
//   trail.src = Smoke;
//   trail.className = "smoke-trail";

//   container.appendChild(trail);

//   // play small clip
//   trail.muted = true;
//   trail.play();

//   gsap.fromTo(trail,
//     {
//       opacity: 0.8,
//       scale: 0.6,
//       x: 0,
//       y: 0
//     },
//     {
//       opacity: 0,
//       scale: 1.5,
//       x: -30,
//       y: 20,
//       duration: 1.2,
//       ease: "power2.out",
//       onComplete: () => trail.remove()
//     }
//   );
// }

function createSmokeTrail() {
  const container = containerRef.current.querySelector(".scooty-inner");
  const scooty = containerRef.current.querySelector(".scooty-image_container");

  if (!container || !scooty) return;

  const rect = scooty.getBoundingClientRect();
  const parentRect = container.getBoundingClientRect();

  const trail = document.createElement("video");
  trail.src = Smoke;
  trail.className = "smoke-trail";

  // 🎯 Position EXACTLY behind scooty
  trail.style.position = "absolute";
  trail.style.left = `${rect.left - parentRect.left}px`;
  trail.style.top = `${rect.top - parentRect.top}px`;

  trail.style.transform = "translate(-30%, -10%)"; // tweak for back side
  trail.style.pointerEvents = "none";

  container.appendChild(trail);

  trail.muted = true;
  trail.play();

  gsap.fromTo(
    trail,
    {
      opacity: 0.8,
      scale: 0.6
    },
    {
      opacity: 0,
      scale: 1.5,
      duration: 1,
      ease: "power2.out",
      onComplete: () => trail.remove()
    }
  );
}

// -----------------------------------
function getDirection(progress) {
  const next = Math.min(progress + 0.001, 1); //  FIX

  const p1 = MotionPathPlugin.getPositionOnPath(rawPath, progress);
  const p2 = MotionPathPlugin.getPositionOnPath(rawPath, next);
  const direction = getDirection(progress);

// emit more smoke when moving fast/right
if (Math.abs(direction) > 0.5 && Math.random() < 0.3) {
  createSmokeTrail();
}


  

  if (!p1 || !p2) return 0; // safety

  return p2.x - p1.x;
}
let activeIndex = -1;
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top top",
      end: "+=4000",
      scrub: 4.5,
      pin: true,
      pinSpacing: true,
      invalidateOnRefresh: true,
// ---------------------------------------
// onUpdate: (self) => {
//   const progress = self.progress;

//   curveCenters.forEach((point, index) => {
//     if (
//       progress >= point - 0.02 &&
//       progress <= point + 0.02
//     ) {
//       if (activeIndex !== index) {
//         activeIndex = index;

//         showBulletAt(point);
//         showCurveContent(index); // direct mapping 
//       }
//     }
//   });
//   // Smoke  Viedo Play
//   if (progress > 0.15 && progress < 0.9) {
//     video.play();
//     gsap.to(video, { opacity: 1, duration: 0.2 });
//   } else {
//     video.pause();
//     gsap.to(video, { opacity: 0, duration: 0.2 });
//   }
// }

// ----------------------------------------
// onUpdate: (self) => {
//    let nearestIndex = 0;
//   const progress = self.progress;

//   // TOP EMPTY STATE
//   if (progress < 0.05) {
//     activeIndex = -1;

//     const rightEl = containerRef.current.querySelector(".scooty-content_right");
//     const leftEl = containerRef.current.querySelector(".scooty-content_left");

//     rightEl.innerHTML = "";
//     leftEl.innerHTML = "";
//     gsap.set([rightEl, leftEl], { opacity: 0 }); //  hide box
//      if (activeIndex !== nearestIndex) {
//   activeIndex = nearestIndex;

//   showBulletAt(curveCenters[nearestIndex]);
//   showCurveContent(nearestIndex);

//   gsap.to([rightEl, leftEl], { opacity: 1, duration: 0.3 }); //  show again
// }

//     return;
//   }

 

//   // FIND NEAREST CURVE
 
//   // let minDiff = 1;
//   let minDiff = Infinity;

//   curveCenters.forEach((point, index) => {
//     const diff = Math.abs(progress - point);
//     if (diff < minDiff) {
//       minDiff = diff;
//       nearestIndex = index;
//     }
//   });

//   if (activeIndex !== nearestIndex) {
//     activeIndex = nearestIndex;

//     showBulletAt(curveCenters[nearestIndex]);
//     showCurveContent(nearestIndex);
//   }

//   // VIDEO
//   if (progress > 0.15 && progress < 0.9) {
//     video.play();
//     gsap.to(video, { opacity: 1, duration: 0.2 });
//   } else {
//     video.pause();
//     gsap.to(video, { opacity: 0, duration: 0.2 });
//   }
// }

onUpdate: (self) => {
  const progress = self.progress;

  // TOP EMPTY STATE (EXIT EARLY)
  if (progress < 0.05) {
    activeIndex = -1;

    const rightEl = containerRef.current.querySelector(".scooty-content_right");
    const leftEl = containerRef.current.querySelector(".scooty-content_left");

    rightEl.innerHTML = "";
    leftEl.innerHTML = "";
    gsap.set([rightEl, leftEl], { opacity: 0 });

    return; //  STOP here (no nearestIndex logic)
  }

  //  DECLARE AFTER RETURN BLOCK
  let nearestIndex = 0;
  // let minDiff = 1;
  let minDiff = Infinity;

  curveCenters.forEach((point, index) => {
    const diff = Math.abs(progress - point);
    if (diff < minDiff) {
      minDiff = diff;
      nearestIndex = index;
    }
  });

  // if (activeIndex !== nearestIndex) 
    if (activeIndex !== nearestIndex && minDiff < 0.03){
    activeIndex = nearestIndex;

    // showBulletAt(curveCenters[nearestIndex]);
    // showCurveContent(nearestIndex);
    showBulletAt(curveCenters[nearestIndex]);

    if (isMobile()) {
      showMobileContent(nearestIndex, curveCenters[nearestIndex]);
    } else {
      showCurveContent(nearestIndex);
    }
  }

  // VIDEO
  // if (progress > 0.15 && progress < 0.9) {
  //   video.play();
  //   gsap.to(video, { opacity: 1, duration: 0.2 });
  // } else {
  //   video.pause();
  //   gsap.to(video, { opacity: 0, duration: 0.2 });
  // }

  // SMOKE TRAIL
if (progress > 0.1 && progress < 0.95) {
  if (Math.random() < 0.2) { // control density
    createSmokeTrail();
  }
}
}
// ------

// ------------------------
    }
  });

  tl.to(".scooty-path", {
    strokeDashoffset: 0,
    ease: "none"
  });

  
  tl.to(".scooty-image_container", {
  motionPath: {
    // path: path,
    // align: path,
    path: ".scooty-path", //  use selector instead of variable
    align: ".scooty-path",
    alignOrigin: [0.5, 0.5], //  center fix
    autoRotate: 260
  },
  ease: "none"
}, 0);

}, containerRef);



          gsap.set(".scooty-img", {
        transformOrigin: "50% 50%"
      });



 gsap.to(".scooty-smoke", {
  scale: 0.9,
  opacity: 0.8,
  repeat: -1,
  yoyo: true,
  duration: 0.4,
  ease: "sine.inOut"
});

// Phone Screen Responsive 
let mm = gsap.matchMedia();

mm.add("(min-width: 1200px) and (max-width: 1400px)", () => {
  gsap.set(".scooty-img", { scale: 1});
});

mm.add("(min-width: 576px) and (max-width: 786px)", () => {
  gsap.set(".scooty-img", { scale: 2 });
});

mm.add("(max-width: 575.99px)", () => {
  gsap.set(".scooty-img", { scale: 1 });
});
// const handleResize = () => {
//   ScrollTrigger.refresh();
// };
let resizeTimeout;

const handleResize = () => {
  clearTimeout(resizeTimeout);

  resizeTimeout = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 300); // wait for layout to settle
};

window.addEventListener("resize", handleResize);
      // return () => ctx.revert();
      return () => {
  ctx.revert();
  window.removeEventListener("resize", handleResize);
};

    }, []);

    const contentData = [
  { side: "right", title:"Conversion",text: "Focused strategies combine behavioral psychology, data insights, and optimized funnels to maximize lead generation, engagement, and revenue growth. " },
  { side: "left", text:[
    {title:"Seamless", des:"Digital experiences ensure frictionless user journeys, fast interactions, and intuitive navigation across platforms, enhancing satisfaction and conversion efficiency."}
  ]},
  { side: "right", title:"Mobile",text: "irst strategies prioritize speed, responsiveness, and user experience, ensuring optimal engagement, higher retention, and improved performance across all devices. " },
  { side: "left", title:"Data",text: "Decision-making leverages analytics, insights, and performance metrics to optimize campaigns, improve targeting accuracy, and drive measurable business outcomes. " }
];

    return (
      <>
      <div className="scooty-wrapper">
            <section className="scooty-section" ref={containerRef}>
              <div className="scootyscroll">

                <div className="scooty-content_right">

                </div>

                <div className="scooty_svg">
                  <div className="scooty-inner">
                    <svg width="800" height="3300" viewBox="0 0 800 3300">
                      <path
                        className="scooty-path"
                        d="M 555 3.20911 
                          C 381.167 78.8758 43.5 274.429 43.5 452.209 
                          C 43.5 686.209 500 788.709 514.5 1052.71 
                          C 514.5 1251.71 3.5 1467.21 3.5 1731.21 
                          C 77.9999 2114.71 735 2200.21 735 2419.71 
                          C 655.5 2740.71 271 2798.71 93.9999 3197.21"
                        stroke="white"
                        // stroke="red"
                        strokeWidth={4}
                        strokeDasharray="11 11"
                        fill="none"
                      />
                    </svg>

                    <div className="scooty-image_container">
                      <video
                        src={Smoke}
                        className="scooty-smoke"
                        muted
                        loop
                        playsInline
                      />
                      <img src={ScootyImg} alt="Scooty" className="scooty-img" />
                    </div>
                  </div>
                </div>

                <div className="scooty-content_left">
                </div>

              </div>
            </section>
      </div>   
      </>
    );
  };

  export default ScootyScroll;

