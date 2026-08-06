import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Platforms.css";
import { useParams } from "react-router-dom";
import ServicesData from "../../../pages/services/data/ServicesData";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Platform({
    text, // ✅ FIXED (removed data reference here)
    textColor = "#7A7A7A",
    shimmerColor = "#affe04",
    waveSpeed = 1.5,
}) {

    const lettersRef = useRef([]);
    const contentRef = useRef(null);
    const globalIndex = useRef(0);

    const { slug } = useParams();
    const service = ServicesData.find(
        (item) => item.slug === slug || item.id === slug
    );
    const data = service || ServicesData[0];

    const finalText = text || data.platform_tittle; // ✅ FIX ADDED

    const words = useMemo(() => (finalText || "").split(" "), [finalText]); // ✅ SAFE FIX

    useEffect(() => {
        const letters = lettersRef.current;

        const shimmerAnim = gsap.to(letters, {
            color: shimmerColor,
            scale: 1.2,
            stagger: {
                each: 0.05,
                repeat: -1,
                yoyo: true,
                ease: "power3.inOut",
            },
            duration: waveSpeed,
            ease: "power1.inOut",
        });

        const flow = new SplitText(contentRef.current, { type: "words" });

        const textAnim = gsap.from(flow.words, {
            opacity: 0,
            y: 15,
            stagger: 0.06,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: contentRef.current,
                start: "top 70%",
                toggleActions: "play none none reset",
            },
        });

        return () => {
            shimmerAnim.kill();
            textAnim.kill();
            flow.revert();
        };
    }, [shimmerColor, waveSpeed, data]); // ✅ dependency fix

    // 🔥 kept as is (no removal)
    lettersRef.current = [];
    globalIndex.current = 0;

    return (
        <section className="platform_section">
            <div className="platform_content_box">

                <h2 className="platform_head_tittle service-com-tittle">
                    {words.map((word, wIndex) => (
                        <span key={wIndex} className="word">
                            {word.split("").map((char, cIndex) => {
                                const index = globalIndex.current++;

                                return (
                                    <span
                                        key={cIndex}
                                        ref={(el) => (lettersRef.current[index] = el)}
                                        className="shimmer-letter"
                                        style={{ color: textColor }}
                                    >
                                        {char}
                                    </span>
                                );
                            })}
                            &nbsp;
                        </span>
                    ))}
                </h2>

                <p ref={contentRef} className="platform_content service-com-content">
                    {data.platform_content}
                </p>

                <div className="platform_btn_section">

                    <div className="platform_btn_section1 psl-track">
                        {[
                            "Google Ads",
                            "Facebook Ads",
                            "Instagram Ads",
                            "LinkedIn Ads",
                            "YouTube Ads",
                            "Google Ads",
                            "Facebook Ads",
                        ].map((item, i) => (
                            <div className="platform_btn_box" key={"l-" + i}>
                                <div className="platform_btn_glow"></div>
                                <button className="platform_btn" type="button">
                                    {item}
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="platform_btn_section2 psl-track">
                        {[
                            "Ahrefs",
                            "HubSpot",
                            "Mailchimp",
                            "Hootsuite",
                            "Facebook Ads",
                        ].map((item, i) => (
                            <div className="platform_btn_box" key={"r-" + i}>
                                <div className="platform_btn_glow"></div>
                                <button className="platform_btn" type="button">
                                    {item}
                                </button>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
}