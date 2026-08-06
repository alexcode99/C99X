  import { useLayoutEffect, useRef } from "react";
  import gsap from "gsap";
  import { ScrollTrigger, MotionPathPlugin } from "gsap/all";
  import "./Scooty.css";
  import ScootyImg from "../../../assets/Home_Page_Assets/scooty.png";
  // Video
  import Smoke from '../../../assets/Home_Page_Assets/scooter_smoke.mp4'
  //gif
  import BulletPoint from '../../../assets/Home_Page_Assets/bullet-point.gif'
// import { title } from "framer-motion/client";
  gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

  const Scooty = () => {

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



function setupPath() {
  if (!containerRef.current) return;

  if (!path) return;

  rawPath = MotionPathPlugin.getRawPath(path);

  const oldContent =
    containerRef.current.querySelectorAll(".mobile-curve-content");
  oldContent.forEach((el) => el.remove());

  const oldBullets =
    containerRef.current.querySelectorAll(".curve-bullet");
  oldBullets.forEach((el) => el.remove());

  curveCenters.length = 0;

  const totalWaves = 4;

  for (let i = 0; i < totalWaves; i++) {
    const start = i / totalWaves;
    const end = (i + 1) / totalWaves;

    curveCenters.push((start + end) / 2);
  }
}
setupPath();

//  resize fix
ScrollTrigger.addEventListener("refreshInit", setupPath);


function showBulletAt(progressPoint) {
  const container = containerRef.current.querySelector(".scooty-inner");

  const bullet = document.createElement("img");
  bullet.src = BulletPoint;
  bullet.className = "curve-bullet";

  const pos = MotionPathPlugin.getPositionOnPath(rawPath, progressPoint);

  bullet.style.position = "absolute";
  bullet.style.left = `${pos.x}px`;
  bullet.style.top = `${pos.y}px`;

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
// ScrollTrigger.getAll().forEach(t => t.kill());
// gsap.killTweensOf("*");
// ------------------------------------
function getOffsets() {
  const width = window.innerWidth;

  if (width <= 375) {
    return [
      { x: width * 0.2, y: 15 },
      { x: width * -0.30, y: -5 },
      { x: width * 0.15, y: -35 },
      { x: width * -0.30, y: 5 }
    ];
  }

  if (width <= 576) {
    return [
      { x: width * 0.20, y: 15 },
      { x: width * -0.45, y: 15 },
      { x: width * 0.15, y: -25 },
      { x: width * -0.45, y: 15 }
    ];
  }

  if (width <= 768) {
    return [
      { x: width * 0.25, y: -20 },
      { x: width * -0.85, y: -120 },
      { x: width * 0.25, y: -125 },
      { x: width * -0.80, y: -85 }
    ];
  }

  if (width <= 991) {
    return [
      { x: width * 0.3, y: -40 },
      { x: width * -0.90, y: -10 },
      { x: width * 0.35, y: -50 },
      { x: width * -0.90, y: 20 }
    ];
  }

  if (width <= 1200) {
    return [
      { x: width * 0.25, y: -50 },
      { x: width * -1.2, y: 20 },
      { x: width * 0.35, y: -50 },
      { x: width * -1.2, y: -20 }
    ];
  }

  if (width <= 1440) {
    return [
      { x: width * -0.98, y: -40 },
      { x: width * 0.18, y: -20 },
      { x: width * -1.05, y: -40 },
      { x: width * 0.18, y: -20 }
    ];
  }

  return [
    { x: width * -1.2, y: -40 },
    { x: width * 0.18, y: -20 },
    { x: width * -1.1, y: -40 },
    { x: width * 0.18, y: -20 }
  ];
}
// --------------------------------------------------
function showContentAtPoint(index, progressPoint) {
  const container =
    containerRef.current.querySelector(".scooty-inner");

  const old =
    container.querySelectorAll(".curve-content-box");

  old.forEach((el) => el.remove());

  const data = contentData[index];
  if (!data) return;

  const content = document.createElement("div");
  content.className = "curve-content-box";

  content.innerHTML = `
    <h3>${data.title || data.text?.[0]?.title || ""}</h3>
    <p>${data.text?.[0]?.des || data.text || ""}</p>
  `;

  const pos = MotionPathPlugin.getPositionOnPath(
    rawPath,
    progressPoint
  );

  const offsets = getOffsets();
  const offset = offsets[index] || {
    x: 60,
    y: -30
  };

  content.style.position = "absolute";
  content.style.left = `${pos.x + offset.x}px`;
  content.style.top = `${pos.y + offset.y}px`;

  container.appendChild(content);

  gsap.fromTo(
    content,
    {
      opacity: 0
    },
    {
      opacity: 1,
      duration: 0.3
    }
  );

  gsap.to(content, {
    opacity: 0,
    delay: 2,
    onComplete: () => content.remove()
  });
}
// --------------------------------------------------

function createSmokeTrail() {
  const container = containerRef.current.querySelector(".scooty-image_container");

  if (!container) return;

  const trail = document.createElement("video");
  trail.src = Smoke;
  trail.className = "smoke-trail";

  container.appendChild(trail);

  // play small clip
  trail.muted = true;
  trail.play();

  gsap.fromTo(trail,
    {
      opacity: 0.8,
      scale: 0.6,
      x: 0,
      y: 0
    },
    {
      opacity: 0,
      scale: 1.5,
      x: -30,
      y: 20,
      duration: 1.2,
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


  

  if (!p1 || !p2) return 0; // safety

  return p2.x - p1.x;
}
let activeIndex = -1;
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top 50%",
      end: "+=1000",
      scrub: 2,
      pin: false,
      pinSpacing: true,
      invalidateOnRefresh: true,


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

  showContentAtPoint(
    nearestIndex,
    curveCenters[nearestIndex]
  );
  }

  // VIDEO
  if (progress > 0.15 && progress < 0.9) {
    video.play();
    gsap.to(video, { opacity: 1, duration: 0.2 });
  } else {
    video.pause();
    gsap.to(video, { opacity: 0, duration: 0.2 });
  }
}


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
  { 
    side: "right", 
    title:"Conversion",
    text: "High-converting product layout architectures, single-page checkouts, and trust signals engineered to maximize revenue per visitor. " 
  },
  { 
    side: "left", 
    text:[
    {
      title:"Seamless", 
      des:"Smooth platform integrations connecting inventory management, logistics APIs, CRMs, and payment gateways effortlessly."
    }
  ]},
  { 
    side: "right", 
    title:"Mobile Friendly",
    text: "Fully responsive, m-commerce optimized shopping designs built for instant mobile browsing and quick digital wallet payments." 
  },
  { 
    side: "left", 
    title:"Data",
    text: "Real-time customer behavioral tracking, product sales analytics, and automated reporting systems driving continuous growth decisions. " 
  }
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

  export default Scooty;

