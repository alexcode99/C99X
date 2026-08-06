import React from 'react';
import './HomeCarousel.css'
import Lights from "../../../../assets/Home_Page_Assets/Lights.png";

import BackgroundVideo from "../background/BackVideo";

const HomeCarousel = () => {

    const services = [
    "UI/UX DESIGN",
    "LEAD GENERATION",
    "VIDEO EDITOR",
    "DIGITAL MARKETING",
    "WEB DEVELOPMENT",
  ];

    return(
        <>
        <section className="home-carousel  section_gap">
            <div className="home-ligh-back">
            <img src={Lights} alt="Top Light" />
            </div>

            <section className="hero-marquee-scroll">
            {/* <div className="marquee-track"> */}
                {/* <div className="hero-marquee"> */}
                {/* {services.map((item, index) => (
                    <React.Fragment key={index}>
                    <span className="marquee-text">{item}</span>
                    {index !== services.length - 1 && (
                        <div className="maquee-circle"></div>
                    )}
                    </React.Fragment>
                ))} */}

                {/* {services.map((item, index) => (
                    <React.Fragment key={index}>
                    <span className="marquee-text">{item}</span>
                    <div className="maquee-circle"></div>
                    </React.Fragment>
                ))} */}
                {/* </div> */}
                {/* <div className="marquee-track">
                {[...Array(3)].map((_, i) => (
                <div className="hero-marquee" key={i}>
                    {services.map((item, index) => (
                    <React.Fragment key={index}>
                        <span className="marquee-text">{item}</span>
                        <div className="maquee-circle"></div>
                    </React.Fragment>
                    ))}
                </div>
                ))}
            </div> */}

                {/* <div className="hero-marquee"> */}
                {/* {services.map((item, index) => (
                    <React.Fragment key={`dup-${index}`}>
                    <span className="marquee-text">{item}</span>
                    {index !== services.length - 1 && (
                        <div className="maquee-circle"></div>
                    )}
                    </React.Fragment>
                ))} */}
                {/* {services.map((item, index) => (
                    <React.Fragment key={`dup-${index}`}>
                    <span className="marquee-text">{item}</span>
                    <div className="maquee-circle"></div>
                    </React.Fragment>
                ))}
                </div>
            </div> */}

            <section className="hero-marquee-scroll">
  <div className="marquee-track">
    {[1, 2, 3].map((itemIndex) => (
      <div className="hero-marquee" key={itemIndex}>
        {services.map((item, index) => (
          <div
            className="marquee-item"
            key={`${itemIndex}-${index}`}
          >
            <span className="marquee-text">{item}</span>
            <div className="maquee-circle"></div>
          </div>
        ))}
      </div>
    ))}
  </div>
</section>
            </section>

            <div className="home-ligh-back-1">
            <img src={Lights} alt="Bottom Light" />
            </div>
        </section>
        </>
    )
}
export default HomeCarousel;