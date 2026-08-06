import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServicesData from "../../../pages/services/data/ServicesData";
import { useParams } from "react-router-dom";
import './PaidServices.css'

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function PaidServices({

    text = "Google Ads And Paid Advertising Services In Chennai",
    textColor = "#7A7A7A",
    shimmerColor = "#affe04",
    waveSpeed = 1.5,
    align = "center",

}) {

    const lettersRef = useRef([]);
    const words = useMemo(() => text.split(" "), [text]);
    const { slug } = useParams();
    const service = ServicesData.find(
        (item) => item.slug === slug || item.id === slug
    );
    const data = service || ServicesData[0];

    useEffect(() => {

        const letters = lettersRef.current.filter(Boolean);

        gsap.to(letters, {
            color: shimmerColor,
            scale: 1.1,
            duration: 1,
            stagger: {
                each: 0.05,
                repeat: -1,
                yoyo: true,
                ease: "power3.inOut",
            },
        });

        const seperate = new SplitText(".paidservice_content", { type: "words" });

        gsap.fromTo(
            seperate.words,
            { opacity: 0.2, color: "#666" },
            {
                opacity: 1,
                color: "#fff",
                stagger: 0.05,
                ease: "none",
                scrollTrigger: {
                    trigger: ".paidservice_content",
                    start: "top 80%",
                    end: "top 20%",
                    scrub: true
                }
            }
        );

        return () => {
            gsap.killTweensOf(letters);
            seperate.revert();
        };

    }, [shimmerColor, waveSpeed]);

    return (
        <section className="paidservice_section section_gap">
            <div className="paidservice_content_box">

                <h2 className="paidservice_tittle service-com-tittle" style={{ textAlign: align }}>
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

                <p className="paidservice_content service-com-content">
                    {data.ads_content1}
                </p>

                <p className="paidservice_content service-com-content">
                    {data.ads_content2}
                </p>

            </div>
        </section>
    )
}