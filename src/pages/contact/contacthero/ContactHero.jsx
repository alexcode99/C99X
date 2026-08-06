import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useEffect } from "react";

function ContactHero() {
    useEffect(()=>{
            const split = SplitText.create(".contact_hero_content_p", { type: "words" });

    gsap.from(split.words, {
      opacity: 0,
      y: 20,
      stagger: 0.05,
      duration: 0.6,
      delay: 0.2,   
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".contact_hero_content_p",
        start: "top 80%",
      }
    });

  }, []);

    return (
        <>
            <div className="contact_hero_container section_gap">
                <div className="contact_hero_content">
                    <h1>Contact <span>C99X</span></h1>
                    <p className="contact_hero_content_p">Ready to elevate your digital growth journey? Connect with the Best Digital Marketing Agency in Chennai 2026 and unlock scalable, AI-driven business success.</p>
                </div>
            </div>
                
        </>
    );

}

export default ContactHero;