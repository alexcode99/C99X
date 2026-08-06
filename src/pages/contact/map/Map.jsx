import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

function Map() {

  // gsap.registerPlugin(ScrollTrigger);
  // useEffect(() => {
  //   gsap.fromTo(".getInTouch_iframe",
  //     { y: 250 },
  //     {
  //       y: -100,
  //       scrollTrigger: {
  //         trigger: ".getInTouch_mapContainer",
  //         start: "top center",
  //         end: "+=1000",
  //         scrub: 2
  //       }
  //     }
  //   )
  // });



  return (
    <>
      <div className="getInTouch_mapContainer section_gap">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9364977803198!2d80.21896167442785!3d12.975913414784996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d70050d495f%3A0xe1b0d7791146206d!2sCode99%20IT%20Academy!5e0!3m2!1sen!2sin!4v1773232042282!5m2!1sen!2sin"
          width="90%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="getInTouch_iframe"
        ></iframe>
      </div>
    </>


  );
}

export default Map;