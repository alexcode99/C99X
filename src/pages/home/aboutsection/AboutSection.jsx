import React from "react";
import { useEffect, useState } from "react";
import './AboutSection.css'
//aos css
import Aos from "aos";
import "aos/dist/aos.css";
//icons
import { FaTv } from "react-icons/fa";
import { LuRadioReceiver } from "react-icons/lu";
import { FaLaptop } from "react-icons/fa";
import { IoLayersOutline } from "react-icons/io5";
import { FaFingerprint } from "react-icons/fa";
import { TfiLayoutCtaCenter } from "react-icons/tfi";
import { easeInOut } from "framer-motion";
import AnimatedSquareBorder from "./dotsanimation/AnimatedSquareBorder";
//icon 
import { MdHealthAndSafety } from "react-icons/md";
import { div } from "framer-motion/client";
const AboutSection = () => {

    const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768.99); // mobile breakpoint
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);
    // animation for scroll up when page is appear
    useEffect( () =>{
        Aos.init({
            duration:2000,
            once:false, // animation runs every scroll
            delay:300,
            easing: "ease-in-out",
            mirror: true
        })
    })
    const IconMarquee = [
        <MdHealthAndSafety/>,
        <MdHealthAndSafety/>,
        <MdHealthAndSafety/>,
        <MdHealthAndSafety/>,
        <MdHealthAndSafety/>
    ];
    const MarqueeIcons = [...IconMarquee, ...IconMarquee,  ...IconMarquee, ...IconMarquee]
        console.log("Here We Have Data $$x", MarqueeIcons)
        // const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkScreen = () => {
//       setIsMobile(window.innerWidth <= 768); // mobile breakpoint
//     };

//     checkScreen();
//     window.addEventListener("resize", checkScreen);

//     return () => window.removeEventListener("resize", checkScreen);
//   }, []);

    return(
        < >
        <div  style={{background:"black"}}>
             <div  > <h2 className="home-title">About</h2>
                

            <section className="home-about-grid home-about-back"
            //  data-aos="flip-down"
             data-aos={!isMobile ? "flip-down" : ""}
             >
                
            
            
            {/* column 1 */}
            <div  className="home-about-layout1">
                <div className="home-vision-box home-grid-background home-grid-overlay">
                    <h3 className="aboutSection_h2">The Vision Behind C99X</h3>
                    <p className="content_font">
                    C99X was created to revolutionize how modern businesses build, scale, and automate their digital presence. Instead of relying on traditional, fragmented IT services, we build interconnected ecosystems combining conversion psychology, cutting-edge software architecture, and predictive AI analytics. Our vision is simple: empower businesses worldwide with fast, secure, and predictable revenue-generating platforms.
                    </p>
                </div>
                {/* ----- */}
                <div className="home-col-card">

                    <div className="home-enterprise-card ">
                        {/* icons */}
                        
                        <div className="home-icon-box home-grid-background home-grid-overlay">

                        {/* DOT BORDER */}
                        <AnimatedSquareBorder
                            color="#Affe04"
                            size={4}
                            gap={10}
                            speed={6}
                        />

                        {/* DOT GRID BACKGROUND (small dots like video) */}
                        <div className="dot-bg"></div>

                        {/* ICONS */}
                        <div className="icon-layout">

                            <div className="home-icon home-top-left"><FaTv/></div>
                            <div className="home-icon home-top-right"><FaLaptop/></div>

                            <div classNamxe="home-icon home-center ">
                               <i> <IoLayersOutline className="inteligent-center"/></i>

                                {/* WAVE ANIMATION */}
                                <div className="home-wave">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>

                            <div className="home-icon home-bottom-left"><TfiLayoutCtaCenter/></div>
                            <div className="home-icon home-bottom-right"><FaLaptop/></div>

                        </div>

                    </div>

                        <h3 className="aboutSection_h2">Intelligent Frontend Engineering</h3>
                        <p className="content_font">We craft lightning-fast, highly responsive user interfaces utilizing HTML5, CSS3, dynamic JavaScript frameworks, and SEO-optimized web standards to deliver ultra-smooth user experiences across every screen size.</p>
                    </div>

                    <div className="home-frontend-card "> 
                        
                        <div className="home-frocard-icon home-grid-background home-grid-overlay">
                            <i style={{textAlign:"center", position:"absolute"}}><FaFingerprint/></i>
                            
                            {/* WAVE ANIMATION */}
                                <div className="home-wave-1">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                {/* CIRCLE ROTATE */}
                                {/* <div> */}
                                    {/* <div className="home-frontend-circle">
                                        <div className="about-Circle_rotate">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div> */}
                                {/* </div> */}
                        </div>
                        {/* content */}
                       <div>
                         <h3 className="aboutSection_h2">Advanced Data Protection</h3>
                        <p className="content_font">Backed by military-grade encryption, secure API authentication layers, and proactive vulnerability scanning, C99X ensures your user data, payment gateways, and backend communications remain completely protected.</p>
                       </div>
                    </div>

                </div>
                
            </div>
            

            {/* column -2 */}

            <div className="home-about-layout2 ">
                {/* Icons Review carousel */}
                {/* <div>
                    
                </div> */}
                <div className="home-data-card">
                    <div className=" home-grid-background home-grid-overlay">
                        <div className="home-card-icon">
                            <i><LuRadioReceiver/></i>
                        </div>
                        <div className="home-wave-2">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    
                   <div>
                     <h3 className="aboutSection_h2">Enterprise Backend Infrastructure</h3>
                    <p className="content_font">Our backend engineering frameworks are designed for high-concurrency performance, zero-downtime reliability, and rock-solid cloud scalability. Powered by secure microservice architectures, Python-driven AI integrations, and optimized database pipelines, C99X delivers enterprise-grade software built to handle heavy user traffic without compromising speed or data integrity.</p>
                   </div>
                </div>

                <div className="home-growth-card  ">
                    <div className="home-grid-background home-grid-overlay">
                        <div>
                            <i><FaLaptop/></i>
                        </div>
                    </div>
                  <div>
                    <h3 className="aboutSection_h2">Growth Support Hub</h3>
                  <p className="content_font">Enjoy round-the-clock technical monitoring, seamless client portal updates, and proactive post-launch maintenance designed to keep your digital platforms running at peak efficiency continuously.</p>
                  </div>
                </div>
            </div>

        </section>
        </div>
        </div>
        {/* --------------------- */}
        {/* <div style={{height:"100px", width:"100%", background:"red",}}>
            {MarqueeIcons.map((item, index) => {
                            <div key={index}>
                                <i>{item}</i>
                            </div>
                        })}
        </div> */}
        {/* <div className="home-frontend-circle">
            <div className="about-Circle_rotate">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div> */}

        {/* ------------- */}
        
        
        </>
    )
}
export default AboutSection;