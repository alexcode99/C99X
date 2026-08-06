import { useEffect, useRef, useMemo } from "react";
import { useParams } from "react-router-dom"; // ✅ ADD
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Comprehensive.css";
// ✅ IMPORT DATA
import ServicesData from "../../../pages/services/data/ServicesData";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function Comprehensive() {

    const { slug } = useParams(); // ✅ GET SLUG

    // ✅ FIND DATA
    const service = ServicesData.find(
        (item) => item.slug === slug || item.id === slug
    );

    const data = service || ServicesData[0];

    // ✅ DYNAMIC TEXT
    const text = data.comp_tittle;
    const text2 = data.comp_tittle2;

    const textColor = "#7A7A7A";
    const shimmerColor = "#affe04";
    const waveSpeed = 1.5;
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
                ease: "power3.inOut",
            },
            duration: waveSpeed,
            ease: "power1.inOut",
        });

                const seperate = new SplitText(".comp_content", { type: "words" });

        gsap.fromTo(
            seperate.words,
            { opacity: 0.2, color: "#666" },
            {
                opacity: 1,
                color: "#fff",
                stagger: 0.05,
                ease: "none",
                scrollTrigger: {
                    trigger: ".comp_content",
                    start: "top 80%",
                    end: "top 20%",
                    scrub: true
                }
            }
        );


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
            // splitInstances.forEach(split => split.revert());
            flow.revert();
        };

    }, []);

    lettersRef.current = [];
    lettersRef2.current = [];
    const items = [
        {
            title: data?.comp_chart_box1_tittle,
            content: data?.comp_chart_box1_content,
            gif: data?.comp_gif1,
            className: "digital_gif_1"
        },
        {
            title: data?.comp_chart_box2_tittle,
            content: data?.comp_chart_box2_content,
            gif: data?.comp_gif4,
            className: "digital_gif_3"
        },
        {
            title: data?.comp_chart_box3_tittle,
            content: data?.comp_chart_box3_content,
            gif: data?.comp_gif2,
            className: "digital_gif_1"
        },
        {
            title: data?.comp_chart_box4_tittle,
            content: data?.comp_chart_box4_content,
            gif: data?.comp_gif5,
            className: "digital_gif_4"
        },
        {
            title: data?.comp_chart_box5_tittle,
            content: data?.comp_chart_box5_content,
            gif: data?.comp_gif3,
            className: "digital_gif_2"
        },
        {
            title: data?.comp_chart_box6_tittle,
            content: data?.comp_chart_box6_content,
            gif: data?.comp_gif6,
            className: "digital_gif_4"
        }
    ].filter(item => item.content?.trim());
    return (
        <section className="comp_section">
            <div className="comp_content_box">

                {/* ✅ TITLE 1 */}
                <h2 className="comp_tittle service-com-tittle" style={{ textAlign: align }}>
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

                {/* ✅ CONTENT 1 */}
                <p className="comp_content service-com-content">
                    {data.comp_content1}
                </p>

                {/* ✅ CONTENT 2 */}
                <p className="comp_content service-com-content">
                    {data.comp_content2}
                </p>

                {/* ✅ TITLE 2 */}
                <h2 className="comp_tittle service-com-tittle" style={{ textAlign: align }}>
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

                {/* ✅ CONTENT 3 */}
                <p className="comp_content_2 service-com-content">
                    {data.comp_content3}
                </p>

                {/* ✅ CHART */}
                {/* <div className="comp_chart">

                    <div className="comp_chart_1">
                        {data?.comp_chart_box1_content?.trim() && (
                            <div className="comp_chart_content">
                                {console.log(data.comp_gif1)}
                                <img src={data.comp_gif1} alt="" className="digital_gif_1 gifs" />
                                <h3>{data.comp_chart_box1_tittle}</h3>
                                <p>{data.comp_chart_box1_content}</p>
                            </div>)}

                        {data?.comp_chart_box3_content?.trim() && (
                            <div className="comp_chart_content">
                                {console.log(data.comp_gif1)}
                                <img src={data.comp_gif2} alt="" className="digital_gif_2 gifs" />
                                <h3>{data.comp_chart_box3_tittle}</h3>
                                <p>{data.comp_chart_box3_content}</p>
                            </div>)}

                        <div
                            className="comp_chart_content"
                            style={{
                                display: data?.comp_chart_box4_content?.trim() ? "block" : "none",
                            }}
                        >
                            <img src={data.comp_gif5} alt="" className="digital_gif_5 gifs" />
                            <h3>{data.comp_chart_box4_tittle}</h3>
                            <p>{data.comp_chart_box4_content}</p>
                        </div>
                    </div>

                    <div className="comp_chart_2">
                        {data?.comp_chart_box2_content?.trim() && (
                            <div className="comp_chart_content">
                                <img src={data.comp_gif3} alt="" className="digital_gif_3 gifs" />
                                <h3>{data.comp_chart_box2_tittle}</h3>
                                <p>{data.comp_chart_box2_content}</p>
                            </div>)}

                        {data?.comp_chart_box4_content?.trim() && (
                            <div className="comp_chart_content">
                                <img src={data.comp_gif4} alt="" className="digital_gif_4 gifs" />
                                <h3>{data.comp_chart_box4_tittle}</h3>
                                <p>{data.comp_chart_box4_content}</p>
                            </div>)}

                        <div
                            className="comp_chart_content"
                            style={{
                                display: data?.comp_chart_box4_content?.trim() ? "block" : "none",
                            }}
                        >
                            <img src={data.comp_gif6} alt="" className="digital_gif_6 gifs" />
                            <h3>{data.comp_chart_box4_tittle}</h3>
                            <p>{data.comp_chart_box4_content}</p>
                        </div>
                    </div>
                </div> */}
                <div className="comp_chart">
                    {items.map((item, index) => (
                        <div key={index} className="comp_chart_content">
                            <img src={item.gif} alt="" className={`${item.className} gifs`} />
                            <h3 className="service-com-content">{item.title}</h3>
                            <p className="service-com-content">{item.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}



// import { useEffect, useRef, useMemo } from "react";
// import { useParams } from "react-router-dom"; // ✅ ADD
// import { gsap } from "gsap";
// import { SplitText } from "gsap/SplitText";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import "./Comprehensive.css";
// // ✅ IMPORT DATA
// import ServicesData from "../../../pages/services/data/ServicesData";

// gsap.registerPlugin(SplitText, ScrollTrigger);

// export default function Component() {

//     const { slug } = useParams(); // ✅ GET SLUG

//     // ✅ FIND DATA
//     const service = ServicesData.find(
//         (item) => item.slug === slug || item.id === slug
//     );

//     const data = service || ServicesData[0];

//     // ✅ DYNAMIC TEXT
//     const text = data.comp_tittle;
//     const text2 = data.comp_tittle2;

//     const textColor = "#7A7A7A";
//     const shimmerColor = "#affe04";
//     const waveSpeed = 1;
//     const align = "center";

//     const lettersRef = useRef([]);
//     const lettersRef2 = useRef([]);

//     const words = useMemo(() => text.split(" "), [text]);
//     const words2 = useMemo(() => text2.split(" "), [text2]);

//     useEffect(() => {

//         const letters1 = lettersRef.current.filter(Boolean);
//         const letters2 = lettersRef2.current.filter(Boolean);

//         gsap.to([...letters1, ...letters2], {
//             color: shimmerColor,
//             scale: 1.1,
//             stagger: {
//                 each: 0.05,
//                 repeat: -1,
//                 yoyo: true,
//             },
//             duration: waveSpeed,
//             ease: "power1.inOut",
//         });

//         const contents = gsap.utils.toArray(".comp_content");

//         const splitInstances = contents.map((el) =>
//             SplitText.create(el, { type: "words" })
//         );

//         splitInstances.forEach((split) => {
//             gsap.fromTo(
//                 split.words,
//                 { opacity: 0.2 },
//                 {
//                     opacity: 1,
//                     color: "#fff",
//                     duration: 1,
//                     stagger: 0.05,
//                     scrollTrigger: {
//                         trigger: split.elements[0],
//                         start: "top 80%",
//                         end: "top 20%",
//                         scrub: true,
//                         toggleActions: "play play reverse reverse"
//                     }
//                 }
//             );
//         });

//         const flow = SplitText.create(".comp_content_2", { type: "words" });

//         gsap.from(flow.words, {
//             opacity: 0,
//             y: 15,
//             stagger: 0.06,
//             duration: 1,
//             ease: "power2.out",
//             scrollTrigger: {
//                 trigger: ".comp_content_2",
//                 start: "top 70%",
//                 toggleActions: "play none none reset"
//             }
//         });

//         return () => {
//             gsap.killTweensOf([...letters1, ...letters2]);
//             splitInstances.forEach(split => split.revert());
//             flow.revert();
//         };

//     }, []);

//     lettersRef.current = [];
//     lettersRef2.current = [];

//     return (
//         <section className="comp_section section_gap">
//             <div className="comp_content_box">

//                 {/* ✅ TITLE 1 */}
//                 <h2 className="comp_tittle" style={{ textAlign: align }}>
//                     {words.map((word, wIndex) => (
//                         <span key={wIndex} className="word">
//                             {word.split("").map((char, cIndex) => {
//                                 const index = wIndex * 20 + cIndex;

//                                 return (
//                                     <span
//                                         key={cIndex}
//                                         ref={(el) => (lettersRef.current[index] = el)}
//                                         className="letter"
//                                         style={{ color: textColor }}
//                                     >
//                                         {char}
//                                     </span>
//                                 );
//                             })}
//                         </span>
//                     ))}
//                 </h2>

//                 {/* ✅ CONTENT 1 */}
//                 <p className="comp_content">
//                     {data.comp_content1}
//                 </p>

//                 {/* ✅ CONTENT 2 */}
//                 <p className="comp_content">
//                     {data.comp_content2}
//                 </p>

//                 {/* ✅ TITLE 2 */}
//                 <h2 className="comp_tittle" style={{ textAlign: align }}>
//                     {words2.map((word, wIndex) => (
//                         <span key={wIndex} className="word">
//                             {word.split("").map((char, cIndex) => {
//                                 const index = wIndex * 20 + cIndex;

//                                 return (
//                                     <span
//                                         key={cIndex}
//                                         ref={(el) => (lettersRef2.current[index] = el)}
//                                         className="letter"
//                                         style={{ color: textColor }}
//                                     >
//                                         {char}
//                                     </span>
//                                 );
//                             })}
//                         </span>
//                     ))}
//                 </h2>

//                 {/* ✅ CONTENT 3 */}
//                 <p className="comp_content_2">
//                     {data.comp_content3}
//                 </p>

//                 {/* ✅ CHART */}
//                 <div className="comp_chart">
                    
//                     <div className="comp_chart_1">
//                         {data.comp_chart_box1_content && (
//                         <div className="comp_chart_content">
//                               {console.log(data.comp_gif1)}
//                             <img src={data.comp_gif1} alt="" className="digital_gif_1 gifs" />
//                             <h3>{data.comp_chart_box1_tittle}</h3>
//                             <p>{data.comp_chart_box1_content}</p>
//                         </div>)}

//                         {data.comp_chart_box3_content && (
//                         <div className="comp_chart_content">
//                               {console.log(data.comp_gif1)}
//                             <img src={data.comp_gif2} alt="" className="digital_gif_1 gifs" />
//                             <h3>{data.comp_chart_box3_tittle}</h3>
//                             <p>{data.comp_chart_box3_content}</p>
//                         </div>)}
                        
//                         {data.comp_chart_box5_content && (
//                         <div className="comp_chart_content">
//                             <img src={data.comp_gif3} alt="" className="digital_gif_2 gifs" />
//                             <h3>{data.comp_chart_box5_tittle}</h3>
//                             <p>{data.comp_chart_box5_content}</p>
//                         </div>)}
//                     </div>

//                     <div className="comp_chart_2">
//                         {data.comp_chart_box2_content && (
//                         <div className="comp_chart_content">
//                             <img src={data.comp_gif4} alt="" className="digital_gif_3 gifs" />
//                             <h3>{data.comp_chart_box2_tittle}</h3>
//                             <p>{data.comp_chart_box2_content}</p>
//                         </div>)}

//                         {data.comp_chart_box4_content && (
//                         <div className="comp_chart_content">
//                             <img src={data.comp_gif5} alt="" className="digital_gif_4 gifs" />
//                             <h3>{data.comp_chart_box4_tittle}</h3>
//                             <p>{data.comp_chart_box4_content}</p>
//                         </div>)}

//                         {data.comp_chart_box6_content && (
//                         <div className="comp_chart_content">
//                             {console.log(data.comp_gif1)}
//                             <img src={data.comp_gif6} alt="" className="digital_gif_4 gifs" />
//                             <h3>{data.comp_chart_box6_tittle}</h3>
//                             <p>{data.comp_chart_box6_content}</p>
//                         </div>)}
//                     </div>
//                 </div>

//             </div>
//         </section>
//     );
// }