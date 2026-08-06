import { useEffect, useRef, useMemo } from "react"; // ✅ FIXED
import { gsap } from "gsap";
import "./ExpertServices.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { LuChevronRight } from "react-icons/lu";
import tick from "../../../assets/services/check.gif";
import ServicesData from "../../../pages/services/data/ServicesData";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function ExpertServices() {
  const { slug } = useParams();
  const service = ServicesData.find(
    (item) => item.slug === slug || item.id === slug
  );
  const data = service || ServicesData[0];

  const text = `${data.business_tittle}`;
  // "Leading Digital Marketing Service In Chennai For Business growth";
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
    const letters2 = []; // ✅ FIXED (avoid undefined)

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

    const seperate = new SplitText(".service_content", { type: "words" }); // ✅ FIXED

    gsap.from(seperate.words, {
      opacity: 0,
      y: 15,
      stagger: 0.06,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".service_content_box",
        start: "top 70%",
        toggleActions: "play none none reset"
      }
    });

    const button = document.querySelector(".magnetic-button");
    const flair = document.querySelector(".magnetic-button__flair");
    if (!button || !flair) return;

    const mapRange = (inMin, inMax, outMin, outMax, val) =>
      ((val - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;

    const clamp = (min, max, val) => Math.min(max, Math.max(min, val));

    const getXY = (e) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = clamp(0, 100, mapRange(0, width, 0, 100, e.clientX - left));
      const y = clamp(0, 100, mapRange(0, height, 0, 100, e.clientY - top));
      return { x, y };
    };

    const mouseEnter = (e) => {
      const { x, y } = getXY(e);
      flair.style.transition = "transform 0.4s cubic-bezier(0.23,1,0.32,1)";
      flair.style.left = `${x}%`;
      flair.style.top = `${y}%`;

      requestAnimationFrame(() => {
        flair.style.transform = "translate(-50%, -50%) scale(1)";
      });
    };

    const mouseMove = (e) => {
      const { x, y } = getXY(e);
      flair.style.transition =
        "top 0.4s cubic-bezier(0.23,1,0.32,1), left 0.4s cubic-bezier(0.23,1,0.32,1), transform 0.4s cubic-bezier(0.23,1,0.32,1)";
      flair.style.left = `${x}%`;
      flair.style.top = `${y}%`;
    };

    const mouseLeave = (e) => {
      const { x, y } = getXY(e);

      const exitX = x > 90 ? x + 20 : x < 10 ? x - 20 : x;
      const exitY = y > 90 ? y + 20 : y < 10 ? y - 20 : y;

      flair.style.transition =
        "top 0.3s cubic-bezier(0.23,1,0.32,1), left 0.3s cubic-bezier(0.23,1,0.32,1), transform 0.3s cubic-bezier(0.23,1,0.32,1)";

      flair.style.left = `${exitX}%`;
      flair.style.top = `${exitY}%`;
      flair.style.transform = "translate(-50%, -50%) scale(0)";
    };

    button.addEventListener("mouseenter", mouseEnter);
    button.addEventListener("mousemove", mouseMove);
    button.addEventListener("mouseleave", mouseLeave);

    return () => {
      button.removeEventListener("mouseenter", mouseEnter);
      button.removeEventListener("mousemove", mouseMove);
      button.removeEventListener("mouseleave", mouseLeave);

      seperate.revert(); // ✅ FIXED (removed split)
    };

  }, []);

  return (
    <section className="service_section">
      <div className="service_content_box">

        <h2 className="service_tittle service-com-tittle" style={{ textAlign: align }}>
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

        <p className="service_content service-com-content">
          {/* C99X stands as a trusted Digital Marketing Agency in Chennai known for
          strategic precision and measurable performance. We integrate analytics,
          creative execution, and automation workflows. Our Online Marketing
          Agency Chennai expertise ensures campaigns deliver revenue-focused
          outcomes rather than vanity metrics. */}
          {data.business_content}
        </p>
      </div>

      <div className="service_chart_box">
        <div className="service_chart_box1">

          <div className="service_mark_chart">
            <div className="tick_box"><img src={tick} alt="" className="mark_gif" /></div>
            <h3 className="mark_chart_text service-com-content">{data.business_point[0].points1}</h3>
          </div>

          <div className="service_mark_chart">
            <div className="tick_box"><img src={tick} alt="" className="mark_gif" /></div>
            <h3 className="mark_chart_text service-com-content">{data.business_point[1].points2}</h3>
          </div>

          <div className="service_mark_chart">
            <div className="tick_box"><img src={tick} alt="" className="mark_gif" /></div>
            <h3 className="mark_chart_text service-com-content">{data.business_point[2].points3}</h3>
          </div>

          <div className="service_mark_chart">
            <div className="tick_box"><img src={tick} alt="" className="mark_gif" /></div>
            <h3 className="mark_chart_text service-com-content">{data.business_point[3].points4}</h3>
          </div>

          <div className="service_mark_chart">
            <div className="tick_box"><img src={tick} alt="" className="mark_gif" /></div>
            <h3 className="mark_chart_text service-com-content">{data.business_point[4].points5}</h3>
          </div>

          <div className="service_mark_chart">
            <div className="tick_box"><img src={tick} alt="" className="mark_gif" /></div>
            <h3 className="mark_chart_text service-com-content">{data.business_point[5].points6}</h3>
          </div>

          <div className="service_mark_chart">
            <div className="tick_box"><img src={tick} alt="" className="mark_gif" /></div>
            <h3 className="mark_chart_text service-com-content">{data.business_point[6].points7}</h3>
          </div>

          <div className="service_mark_chart">
            <div className="tick_box"><img src={tick} alt="" className="mark_gif" /></div>
            <h3 className="mark_chart_text service-com-content">{data.business_point[7].points8}</h3>
          </div>

        </div>

        <div className="service_chart_box2 service-com-content">
          <h2 className="service_chart_titlle service-com-tittle">
            {/* Partner With Chennai’s Growth Leaders */}
            {data.business_box_tittle}
          </h2>

          <p className="sevice_chart_content service-com-content">
            {/* C99X unites strategists, SEO specialists, media buyers, and analysts dedicated to delivering measurable results. As a Digital Marketing Agency in Chennai, we understand local competition and opportunity gaps.Our approach blends global standards with Chennai market intelligence. Our Online Marketing Agency Chennai strategy builds long-term partnerships, not temporary campaigns. C99X structures campaigns aligned with ROI expectations. */}
            {data.business_box_content}
          </p>

          <div className="magnetic-button-wrapper">
            <button className="magnetic-button">
              <span className="magnetic-button__flair"></span>
              <Link to="/contact" className="hero-button__label">
                Get Free Marketing Audit <LuChevronRight />
              </Link>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}