import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import './TrustedBusiness.css'
import { useEffect, useRef, useMemo } from "react";
import bg from "../../../assets/services/count-bg.png";
import light from '../../../assets/services/Light.png'
import { useParams } from "react-router-dom";
import ServicesData from "../../../pages/services/data/ServicesData";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function TrustedBusiness() {
      const { slug } = useParams();
    const service = ServicesData.find(
        (item) => item.slug === slug || item.id === slug
    );
  const data = service || ServicesData[0];
    const text = `${data.service_tittle}`;
    //  "Trusted By Chennai Businesses For Marketing Excelent";
    const textColor = "#7A7A7A";
    const shimmerColor = "#affe04";
    const waveSpeed = 1.5;
    const align = "center";

    const lettersRef = useRef([]);
    const lettersRef2 = useRef([]); // 🔥 second heading ref

    const words = useMemo(() => text.split(" "), [text]);
   
  
    useEffect(() => {

        const letters1 = lettersRef.current.filter(Boolean);
        const letters2 = lettersRef2.current.filter(Boolean);

        gsap.to([...letters1, ...letters2], {
            color: shimmerColor,
            scale: 1.1,
            stagger: {
                each: 0.05,
                repeat: -1,
                yoyo: true,
                ease: "power3.inOut",
            },
            duration: waveSpeed,
            ease: "power1.inOut",
        });

        const seperate = new SplitText(".business_content1", { type: "words" });

        gsap.fromTo(
            seperate.words,
            { opacity: 0.2, color: "#666" },
            {
                opacity: 1,
                color: "#fff",
                stagger: 0.05,
                ease: "none",
                scrollTrigger: {
                    trigger: ".business_content1",
                    start: "top 80%",
                    end: "top 20%",
                    scrub: true
                }
            }
        );

        ScrollTrigger.refresh();

        gsap.utils.toArray(".counter").forEach((counter) => {

            let target = counter.getAttribute("data-target");
            let symbol = counter.getAttribute("data-symbol");

            let obj = { val: 0 };

            gsap.to(obj, {
                val: target,
                duration: 3,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: counter,
                    start: "top 80%",
                },
                onUpdate: () => {
                    counter.innerHTML = Math.floor(obj.val) + symbol;
                }
            });

        });
        const flow = new SplitText(".business_content", { type: "words" });

        gsap.from(flow.words, {
            opacity: 0,
            y: 15,
            stagger: 0.06,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".platform_content",
                start: "top 60%",
                toggleActions: "play none none reset"
            }
        });

        return () => {
            gsap.killTweensOf([...letters1, ...letters2]);
            seperate.revert();
        };

    }, []);

    // 🔥 reset refs (important)
    lettersRef.current = [];
    lettersRef2.current = [];

    return (
        <section className="business_section">
            <div className="scalableSuccess_container">

                {/* FIRST H2 */}
                <h2 className="business_tittle service-com-tittle" style={{ textAlign: align }}>
                    {words.map((word, wIndex) => (
                        <span key={wIndex} className="word">
                            {word.split("").map((char, cIndex) => {
                                const index = wIndex * 20 + cIndex;

                                return (
                                    <span
                                        key={cIndex}
                                        ref={(el) => (lettersRef.current[index] = el)}
                                        className="letter"
                                        style={{ color: textColor }}
                                    >
                                        {char}
                                    </span>
                                );
                            })}
                        </span>
                    ))}
                </h2>

                <p className="business_content service-com-content">
                    “Performance credibility built through consistent measurable outcomes.”
                </p>

                <img src={light} alt="" className="light_bg" />

                <div className="scalableSuccess_boxCountDiv">

                    <div className="scalableSuccess_box" style={{
                        backgroundImage: `url(${bg})`,
                        backgroundSize: "cover",
                        objectFit: "cover",
                        backgroundPosition: "center"
                    }}>
                        <h1 data-target="500" className="counter" data-symbol="+">0</h1>
                        <p>Chennai Clients</p>
                    </div>

                    <div className="scalableSuccess_box" style={{
                        backgroundImage: `url(${bg})`,
                        backgroundSize: "cover",
                        objectFit: "cover",
                        backgroundPosition: "center"
                    }}>
                        <h1 data-target="10" className="counter" data-symbol="M+">0</h1>
                        <p>Leads Generated</p>
                    </div>

                    <div className="scalableSuccess_box" style={{
                        backgroundImage: `url(${bg})`,
                        backgroundSize: "cover",
                        objectFit: "cover",
                        backgroundPosition: "center"
                    }}>
                        <h1 data-target="300" className="counter" data-symbol="%">0</h1>
                        <p>Average ROI</p>
                    </div>

                    <div className="scalableSuccess_box" style={{
                        backgroundImage: `url(${bg})`,
                        backgroundSize: "cover",
                        objectFit: "cover",
                        backgroundPosition: "center"
                    }}>
                        <h1 data-target="8" className="counter" data-symbol="+">0</h1>
                        <p>Years Experience</p>
                    </div>

                </div>

                {/* SECOND H2 */}
                <h2 className="business_tittle service-com-tittle">
                    {"Expert SEO Services For Chennai Business By C99X"
                        .split(" ")
                        .map((word, wIndex) => (
                            <span key={wIndex} className="word">
                                {word.split("").map((char, cIndex) => {
                                    const index = wIndex * 20 + cIndex;

                                    return (
                                        <span
                                            key={cIndex}
                                            ref={(el) => (lettersRef2.current[index] = el)}
                                            className="letter"
                                            style={{ color: textColor }}
                                        >
                                            {char}
                                        </span>
                                    );
                                })}
                            </span>
                        ))}
                </h2>

                <p className="business_content1 service-com-content">
                    {/* SEO remains foundational for sustainable digital growth. As a Digital Marketing Agency in Chennai, C99X builds structured ranking systems. We focus on technical optimization, semantic content architecture, and authority development. Our Online Marketing Agency Chennai strategy ensures consistent organic lead flow. */}
                {data.service_content1}
                </p>

                <p className="business_content1 service-com-content">
                    {/* Local SEO strengthens visibility across Google Maps and Chennai-based searches. C99X enhances location signals, citation building, and geo-intent targeting.we improve search prominence. The Best Digital Marketing Company in Chennai ensures strong local conversion opportunities. */}
                    {data.service_content2}
                </p>

            </div>
        </section>
    );
}