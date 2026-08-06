import React from "react";
import { useEffect, useState } from "react";
import "./Cta.css";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";

import shape1 from "../../../../src/assets/Home_Page_Assets/Cta.png"; // left blob
import shape2 from "../../../../src/assets/Home_Page_Assets/Cta.png"; // right blob
import { div } from "framer-motion/client";
//icons
import { MdArrowOutward } from "react-icons/md";
import { RxChevronRight } from "react-icons/rx";
import ServicesData from "../../../pages/services/data/ServicesData";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
     

const Cta = () => {
   const { slug } = useParams();
   const navigate = useNavigate();

  const service = slug
    ? ServicesData.find((item) => item.slug === slug)
    : ServicesData[0]
    
  // const fullText = "Let’s Engineer Your Digital Breakthrough";
  // const splitIndex = fullText.indexOf(service?.slug);
  const serviceName = service?.highlight || "Digital";

const fullText = `Let’s Engineer Your ${serviceName} Breakthrough`;

const splitIndex = fullText.indexOf(serviceName);

// const whitePart = displayText.slice(0, splitIndex);
// const greenPart = displayText.slice(splitIndex);



  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
  let timeout;

  if (!isDeleting && displayText.length < fullText.length) {
    // Typing forward
    timeout = setTimeout(() => {
      setDisplayText(fullText.slice(0, displayText.length + 1));
    }, 300);
  } 
  else if (!isDeleting && displayText.length === fullText.length) {
    // Pause before deleting
    timeout = setTimeout(() => {
      setIsDeleting(true);
    }, 1500);
  } 
  else if (isDeleting && displayText.length > 0) {
    // Deleting
    timeout = setTimeout(() => {
      setDisplayText(fullText.slice(0, displayText.length - 1));
    }, 500);
  } 
  else if (isDeleting && displayText.length === 0) {
    // Restart typing
    setIsDeleting(false);
  }

  return () => clearTimeout(timeout);
}, [displayText, isDeleting]);

  // Split for color
  const whitePart = displayText.slice(0, splitIndex);
const greenPart = displayText.slice(splitIndex);
//   const whitePart = displayText.slice(0, 23);
//   const greenPart = displayText.slice(23);

  const handleContactClick = () => {
      navigate("/contact");
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
  };

  return (
    <>
    <div className="cta">
        <section className="hero">

            {/* LEFT SHAPE */}
            <img src={shape1} alt="" className="shape shape-left" />

            {/* RIGHT SHAPE */}
            <img src={shape2} alt="" className="shape shape-right" />

            <div className="hero-content">
                <h1 className="heading">
                    <span className="white">{whitePart}</span>
                    <span className="green">{greenPart}</span>
                    <span className="cursor">|</span>
                </h1>

                <p>
                Transform your business with AI-powered marketing systems.
                </p>

                {/* <button className="hero-btn" onClick={()=>navigate("/contact")} > */}
                <button className="hero-btn" onClick={handleContactClick} >
                Contact Us Today <MdArrowOutward className="cta-arrow"/>
                </button>
                


            </div>
            </section>
    </div>
    </>
  );
};

export default Cta;