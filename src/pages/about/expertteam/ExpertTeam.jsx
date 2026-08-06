import { useEffect, useRef, useMemo } from "react";
import { useParams } from "react-router-dom"; //  ADD
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ExpertTeam.css";
//  IMPORT DATA
import ServicesData from "../../../pages/services/data/ServicesData";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function ExpertTeam() {

    const { slug } = useParams(); //  GET SLUG

    //  FIND DATA
    const service = ServicesData.find(
        (item) => item.slug === slug || item.id === slug
    );

    const data = service || ServicesData[0];

    //  DYNAMIC TEXT
    const text = data.comp_tittle;
    const text2 = data.comp_tittle2;

    const textColor = "#7A7A7A";
    const shimmerColor = "#affe04";
    const waveSpeed = 1;
    const align = "center";

    const lettersRef = useRef([]);
    const lettersRef2 = useRef([]);

    const words = useMemo(() => text.split(" "), [text]);
    const words2 = useMemo(() => text2.split(" "), [text2]);

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
            },
            duration: waveSpeed,
            ease: "power1.inOut",
        });

        const contents = gsap.utils.toArray(".comp_content");

        const splitInstances = contents.map((el) =>
            SplitText.create(el, { type: "words" })
        );

        splitInstances.forEach((split) => {
            gsap.fromTo(
                split.words,
                { opacity: 0.2 },
                {
                    opacity: 1,
                    color: "#fff",
                    duration: 1,
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: split.elements[0],
                        start: "top 80%",
                        end: "top 20%",
                        scrub: true,
                        toggleActions: "play play reverse reverse"
                    }
                }
            );
        });

        const flow = SplitText.create(".comp_content_2", { type: "words" });

        gsap.from(flow.words, {
            opacity: 0,
            y: 15,
            stagger: 0.06,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".comp_content_2",
                start: "top 70%",
                toggleActions: "play none none reset"
            }
        });

        return () => {
            gsap.killTweensOf([...letters1, ...letters2]);
            splitInstances.forEach(split => split.revert());
            flow.revert();
        };

    }, []);

    lettersRef.current = [];
    lettersRef2.current = [];
    const items = [
        {
            title: "Digital Growth Architect",
            content: "Leads integrated performance marketing systems, aligning SEO, paid campaigns, automation, and analytics frameworks to deliver scalable, revenue-driven digital growth.",
            gif: data?.comp_gif1,
            className: "digital_gif_1"
        },
        {
            title: "Brand Experience Architect",
            content: "Drives visual storytelling strategy, brand identity systems, and high-conversion creative assets engineered for engagement, emotional connection, and digital authority.",
            gif: data?.comp_gif4,
            className: "digital_gif_3"
        },
        {
            title: "Technology Systems Architect",
            content: "Designs secure, scalable web infrastructures combining backend intelligence, API integrations, cloud deployment, and performance optimization frameworks.",
            gif: data?.comp_gif2,
            className: "digital_gif_1"
        },
        {
            title: "Content Intelligence Strategist",
            content: "Builds semantic content ecosystems using search intent mapping, NLP optimization, AI-driven insights, and structured authority-building frameworks.",
            gif: data?.comp_gif5,
            className: "digital_gif_4"
        },
        // {
        //     title: data?.comp_chart_box5_tittle,
        //     content: data?.comp_chart_box5_content,
        //     gif: data?.comp_gif3,
        //     className: "digital_gif_2"
        // },
        // {
        //     title: data?.comp_chart_box6_tittle,
        //     content: data?.comp_chart_box6_content,
        //     gif: data?.comp_gif6,
        //     className: "digital_gif_4"
        // }
    ].filter(item => item.content?.trim());
    return (
        <section className="comp_section">
            <div className="comp_content_box">

                {/*  TITLE 1
                <h2 className="comp_tittle" style={{ textAlign: align }}>
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

                CONTENT 1 
                <p className="comp_content">
                    {data.comp_content1}
                </p>

                 CONTENT 2 
                <p className="comp_content">
                    {data.comp_content2}
                </p> */}

                {/*  TITLE 2 */}
                <h2 className="comp_tittle" style={{ textAlign: align }}>
                    {words2.map((word, wIndex) => (
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

                {/*  CONTENT 3 */}
                <p className="comp_content_2">
                    {data.comp_content3}
                </p>


                <div className="comp_chart">
                    {items.map((item, index) => (
                        <div key={index} className="comp_chart_content">
                            <img src={item.gif} alt="" className={`${item.className} gifs`} />
                            <h3>{item.title}</h3>
                            <p>{item.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}



