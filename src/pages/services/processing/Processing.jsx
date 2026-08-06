import { useEffect, useRef, useMemo } from "react"; // ✅ FIXED
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import meta from "../../../assets/services/meta-img.webp";
import "./Processing.css";
import { useParams } from "react-router-dom";
import ServicesData from "../../../pages/services/data/ServicesData";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Processing() {
   const { slug } = useParams();
      const service = ServicesData.find(
          (item) => item.slug === slug || item.id === slug
      );
    const data = service || ServicesData[0];
    
  const text = `${data.process_tittle}`;
  // "Loading Digital Marketing Service In Chennai For Business growth";
  const textColor = "#7A7A7A";
  const shimmerColor = "#affe04";
  const waveSpeed = 1.5;
  const align = "center";

  const lettersRef = useRef([]);
  // const lettersRef2 = useRef([]); // second h2

  const words = useMemo(() => text.split(" "), [text]);
 

  useEffect(() => {

    // 🔥 TITLE ANIMATION ONLY
    const letters1 = lettersRef.current.filter(Boolean);
    const letters2 = [];

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

    const seperate = new SplitText(".process_section_content", { type: "words" });

    gsap.from(seperate.words, {
      opacity: 0,
      y: 15,
      stagger: 0.06,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".process_content_box",
        start: "top 70%",
        toggleActions: "play none none reset"
      }
    });

    gsap.to(".round_anime1", {
      delay: 1,
      height: 140,
      width: 140,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      opacity: 0
    });

    gsap.to(".round_anime2", {
      height: 170,
      width: 170,
      delay: 1.1,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      opacity: 0
    });

    gsap.to(".round_anime3", {
      delay: 1.2,
      height: 220,
      width: 220,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      opacity: 0
    });

    gsap.to(".moving_light1", {
      delay: 2,
      x: -250,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      opacity: 0
    });

    gsap.to(".moving_light2", {
      delay: 2,
      x: 250,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      opacity: 0
    });

    gsap.to(".moving_light3", {
      delay: 2,
      y: -250,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      opacity: 0
    });

    gsap.to(".moving_light4", {
      delay: 2,
      y: 250,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      opacity: 0
    });

    return () => {
      seperate.revert(); // ✅ FIXED cleanup
    };

  }, []);

  return (
    <section className="process_section">

      <div className="process_content_box">

        <h2 className="process_section_tittle service-com-tittle" style={{ textAlign: align }}>
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

        <p className="process_section_content service-com-content">
          {/* C99X follows a systematic Digital Marketing Agency in Chennai execution
          model ensuring strategic clarity and measurable performance. */}
          {data.process_content}
        </p>
      </div>

      <div className="process_wave_box">

        <div className="process_wave_box1">

          <div className="wave_line_box1 wave">
            <div className="wave_anime_no"><h2>1</h2></div>

            <div className="anime_wave_box1">
              <h3 className="wave_anime_head service-com-content">{data.anime_box1_tittle}</h3>
              <p className="wave_anime_content service-com-content">
               {data.anime_box1_content}
              </p>
            </div>
          </div>

          <div className="wave_line_box2 wave">
            <div className="wave_anime_no"><h2>2</h2></div>

            <div className="anime_wave_box2">
              <h3 className="wave_anime_head service-com-content">{data.anime_box2_tittle}</h3>
              <p className="wave_anime_content service-com-content">
                {data.anime_box2_content}
              </p>
            </div>
          </div>

        </div>

        <div className="process_wave_box2">

          <div className="wave_line_box3 wave">
            <div className="wave_anime_no"><h2>3</h2></div>

            <div className="anime_wave_box3">
              <h3 className="wave_anime_head service-com-content">{data.anime_box3_tittle}</h3>
              <p className="wave_anime_content service-com-content">
                {data.anime_box3_content}
              </p>
            </div>
          </div>

          <div className="wave_line_box4 wave">
            <div className="wave_anime_no"><h2>4</h2></div>

            <div className="anime_wave_box4">
              <h3 className="wave_anime_head service-com-content">{data.anime_box4_tittle}</h3>
              <p className="wave_anime_content service-com-content">
                {data.anime_box4_content}
              </p>
            </div>
          </div>

        </div>

        <img src={meta} alt="" className="meta" />

        <div className="round_anime1"></div>
        <div className="round_anime2"></div>
        <div className="round_anime3"></div>

        <div className="moving_light1"></div>
        <div className="moving_light2"></div>
        <div className="moving_light3"></div>
        <div className="moving_light4"></div>

      </div>
    </section>
  );
}