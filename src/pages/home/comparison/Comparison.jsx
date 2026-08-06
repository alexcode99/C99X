import React, {useEffect, useRef} from "react";
import "./Comparison.css";
import { IoCheckmarkOutline } from "react-icons/io5";
//images
import Logo from '../../../assets/Home_Page_Assets/c99x-logo.png'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const Comparision = () =>{
  const sectionRef = useRef();
  const leftRef = useRef();
  const rightRef = useRef();
  const vsRef = useRef();

  useEffect(() => {

  // LEFT BOX ROTATE
  gsap.fromTo(leftRef.current,
    {
      rotateY: -90,
      opacity: 0,
    },
    {
      rotateY: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "top 30%",
        scrub: true, // smooth scroll control
      }
    }
  );

  // RIGHT BOX ROTATE
  gsap.fromTo(rightRef.current,
    {
      rotateY: 90,
      opacity: 0,
    },
    {
      rotateY: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "top 30%",
        scrub: true,
      }
    }
  );

  // VS ZOOM EFFECT
  gsap.fromTo(vsRef.current,
    {
      scale: 0.5,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        end: "top 40%",
        scrub: true,
      }
    }
  );

}, []);

  return(
    <>
    <section className="home-comp section_gap">

      <div className="common-sect">
          <h2 className="common-sect-title"><span className="common-highlights">C99X</span>vs. Traditional Digital Agencies in Chennai  </h2>
          <p className="common-sect-des">Engineered for Speed, AI-Driven ROI, and Data Privacy.</p>
      </div>

      <div className="home-comp-container" ref={sectionRef}>

        {/* left side box */}
        <div className="home-comp-left" ref={leftRef}>

          <div className="home-com-img">
            <div  className="home-com-image">
              <img src={Logo} alt="Logo Image" className="home-com-im"/>
            </div>
          </div>

          <div>
            {/* <ul> */}
              <p><i className="home-comp-check"><IoCheckmarkOutline/></i> Dedicated Team</p>
              <p><i className="home-comp-check"><IoCheckmarkOutline/></i> 24/7 Support</p>
              <p><i className="home-comp-check"><IoCheckmarkOutline/></i> Custom Strategies</p>
              <p><i className="home-comp-check"><IoCheckmarkOutline/></i> Transparent Pricing</p>
              <p><i className="home-comp-check"><IoCheckmarkOutline/></i> Data-Driven Approach</p>
              <p><i className="home-comp-check"><IoCheckmarkOutline/></i> Local Chennai Expertise</p>
              <p><i className="home-comp-check"><IoCheckmarkOutline/></i> Quick Turnaround</p>
              <p><i className="home-comp-check"><IoCheckmarkOutline/></i> Monthly Reports</p>
            {/* </ul> */}
          </div>
        </div>

        {/* vs*/}
        <div className="home-comp-vs" ref={vsRef}>
          <div className="hone-comp-vs">
              <div className="vs-container">
              <div className="vs-pill">V/S</div>

              <svg className="vs-lines" viewBox="0 0 300 120">
                {/* Left Curve */}
                <path
                d="M100 45 C100 60, 110 90, 60 80"
                  // d="M100 20 C110 60, 110 80, 60 80"
                  stroke="#AFFE04"
                  strokeWidth="2"
                  fill="transparent"
                />

                {/* Right Curve */}
                <path
                  d="M150 45 C145 100, 170 80, 200 80"
                  stroke="#AFFE04"
                  strokeWidth="2"
                  fill="transparent"
                />

                {/* Left Circle (hollow) */}
                <circle
                  cx="60"
                  cy="80"
                  r="6"
                  stroke="#AFFE04"
                  strokeWidth="2"
                  fill="black"
                />

                {/* Right Circle (filled) */}
                <circle
                  cx="200"
                  cy="80"
                  r="6"
                  fill="#AFFE04"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* right side box */}
        <div className="home-comp-right" ref={rightRef}>
          
           <div className="home-com-head">
                <h4>Others</h4>
           </div>

           <div className="home-comp-list">
              <p><span className="home-comp-circle"></span>Dedicated Team</p>
              <p><span className="home-comp-circle"></span>24/7 Support</p>
              <p><span className="home-comp-circle"></span>Custom Strategies</p>
              <p><span className="home-comp-circle"></span>Transparent Pricing</p>
              <p> <i className="home-comp-check"><IoCheckmarkOutline/></i><span> </span>Data-Driven Approach</p>
              <p><span className="home-comp-circle"></span>Local Chennai Expertise</p>
              <p><span className="home-comp-circle"></span>Quick Turnaround</p>
              <p><i className="home-comp-check"><IoCheckmarkOutline/></i> Monthly Reports</p>
           </div>
          
        </div>

      </div>
    </section>
    </>
  )
}
export default Comparision;

// import React, { useRef, useEffect } from "react";
// import "./Comparision.css";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const Comparison = () => {

//   const sectionRef = useRef();
//   const leftRef = useRef();
//   const rightRef = useRef();
//   const vsRef = useRef();
//     console.log("Comparision Section is working ")
//   useEffect(() => {

    // gsap.from(leftRef.current, {
    //   x: -200,
    //   opacity: 0,
    //   duration: 1,
    //   scrollTrigger: {
    //     trigger: sectionRef.current,
    //     start: "top 70%",
    //   },
    // });

//     gsap.from(rightRef.current, {
//       rotateY: 90,
//       opacity: 0,
//       duration: 1,
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top 70%",
//       },
//     });

//     gsap.from(vsRef.current, {
//       scale: 0,
//       duration: 0.8,
//       ease: "back.out(2)",
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top 70%",
//       },
//     });

//   }, []);

//   return (
//     <section ref={sectionRef}>
//       <div className="comparison-container">

//         {/* LEFT */}
//         <div className="box left" ref={leftRef}>
//           <h2 className="logo">C9X</h2>

          // <ul>
          //   <li>✔ Dedicated Team</li>
          //   <li>✔ 24/7 Support</li>
          //   <li>✔ Custom Strategies</li>
          //   <li>✔ Transparent Pricing</li>
          //   <li>✔ Data-Driven Approach</li>
          //   <li>✔ Local Chennai Expertise</li>
          //   <li>✔ Quick Turnaround</li>
          //   <li>✔ Monthly Reports</li>
          // </ul>
//         </div>

//         {/* VS */}
//         <div className="vs" ref={vsRef}>
//           V/S
//         </div>

//         {/* RIGHT */}
//         <div className="box right" ref={rightRef}>
//           <h2>Others</h2>

//           <ul>
//             <li>○ Dedicated Team</li>
//             <li>○ 24/7 Support</li>
//             <li>○ Custom Strategies</li>
//             <li>○ Transparent Pricing</li>
//             <li className="active">✔ Data-Driven Approach</li>
//             <li>○ Local Chennai Expertise</li>
//             <li>○ Quick Turnaround</li>
//             <li className="active">✔ Monthly Reports</li>
//           </ul>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default Comparison;