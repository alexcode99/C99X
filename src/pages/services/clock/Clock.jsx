import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './Clock.css'

gsap.registerPlugin(ScrollTrigger);

const items = ["SEO", "SEM", "SMM", "SMO", "PPC", "CONTENT", "EMAIL", "AFFILIATE", "INFLUENCER", "MOBILE", "VIDEO", "ANALYTICS"];

export default function Clock() {

  const radialAnimation_containerRef = useRef(null);
  const lineWrapperRef = useRef(null);
  const lineInnerRef = useRef(null);
  const lineBoxesRef = useRef([]);
  const leftContentRef = useRef([]);
  const rightContentRef = useRef([]);
  const dotsRef = useRef([]);
  const textsRef = useRef([]);
  const currentActiveIndex = useRef(-1);
  const triggeredRef = useRef([]);
  const isDesktop = window.innerWidth >= 901;
  const width = window.innerWidth;

  lineBoxesRef.current = [];
  dotsRef.current = [];
  textsRef.current = [];

  useLayoutEffect(() => {

    const total = items.length;
    const step = 360 / total;
    let radius;
    let gap = isDesktop ? 6 : 5;

    if (width >= 600 && width <= 750) {
      radius = 60;
      gap = 4;
    } else if (width >= 901) {
      radius = 100;
      gap = 6;
    } else {
      radius = 80;
      gap = 5;
    }



    const refresh = () => ScrollTrigger.refresh();

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        refresh();
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    if (document.fonts) {
      document.fonts.ready.then(() => refresh());
    }

    requestAnimationFrame(() => refresh());
    setTimeout(() => refresh(), 300);
    setTimeout(() => refresh(), 600);

    gsap.set(lineBoxesRef.current, {
      x: 0,
      y: (i) => -i * gap
    });

    gsap.set(dotsRef.current, {
      x: 0,
      y: 0,
      scale: 0,
      opacity: 0
    });

    gsap.set(textsRef.current, {
      x: 0,
      y: 0,
      opacity: 0
    });

    // ✅ FIXED (opacity 0)
    gsap.set([...leftContentRef.current, ...rightContentRef.current], {
      y: 500,
      opacity: 0
    });


    gsap.set(textsRef.current[0], {
      x: 0,
      y: -165,
      rotate: -90,
      opacity: 0.3
    });

    gsap.set(rightContentRef.current[0], {
      y: isDesktop ? 100 : 62,
      opacity: 1
    });

    currentActiveIndex.current = 0;

    const ctx = gsap.context(() => {

      ScrollTrigger.create({
        trigger: radialAnimation_containerRef.current,
        start: "top top",
        end: "+=6000",
        scrub: 6,
        pin: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,

        onLeaveBack: () => {
          gsap.set(lineInnerRef.current, {
            rotation: 0,
            scaleY: 1,
          });

          gsap.set(dotsRef.current, {
            x: 0,
            y: 0,
            scale: 0,
            opacity: 0,
          });
          gsap.set(textsRef.current[0], {
            x: 0,
            y: -165,
            rotate: -90,
            opacity: 0.3
          });
        },
        onUpdate: (self) => {

          const progress = self.progress;

          const rotation = gsap.utils.wrap(0, 360, progress * 320);
          const scaleY = gsap.utils.clamp(0, 1, 1 - progress);

          gsap.set(lineInnerRef.current, {
            rotation,
            scaleY,
          });

          const lastIndex = lineBoxesRef.current.length - 1;
          const lastBox = lineBoxesRef.current[lastIndex];

          let tipX = 0;
          let tipY = 0;

          if (lastBox) {
            const rect = lastBox.getBoundingClientRect();
            const parentRect = radialAnimation_containerRef.current.getBoundingClientRect();

            tipX = rect.left - parentRect.left + rect.width / 2 - parentRect.width / 2;
            tipY = rect.top - parentRect.top + rect.height / 2 - parentRect.height / 2;
          }

          items.forEach((item, i) => {

            const angle = step * i;
            const rad = ((angle - 90) * Math.PI) / 180;

            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;

            const itemStart = i / total;
            const itemEnd = (i + 1) / total;

            let itemProgress = (progress - itemStart) / (itemEnd - itemStart);
            itemProgress = Math.max(0, Math.min(1, itemProgress));

            const shootProgress = Math.max(0, Math.min(1, itemProgress * 1.2));

            if (dotsRef.current[i]) {
              gsap.set(dotsRef.current[i], {
                x: tipX + (x - tipX) * shootProgress + 0.9,
                y: tipY + (y - tipY) * shootProgress + 17,
                scale: 1,
                opacity: itemProgress,
              });
            }

            const offset = isDesktop ? 75 : 55;
            const isInfluencer = item === "INFLUENCER";
            const extraGap = isInfluencer ? (isDesktop ? 12 : 10) : 0;

            gsap.set(textsRef.current[i], {
              x: x + Math.cos(rad) * (offset + extraGap),
              y: y + Math.sin(rad) * (offset + extraGap),
              opacity: itemProgress,
              rotate: i <= 5 ? angle - 90 : angle + 90,
            });

            if (item === "EMAIL" || item === "AFFILIATE" || item === "INFLUENCER" || item === "VIDEO" || item === "MOBILE" || item === "ANALYTICS") {
              gsap.set(textsRef.current[i], {
                textAlign: "end",
              });
            }


            // ✅ FIXED TRIGGER LOGIC
            const newIndex = Math.floor(progress * total);

            if (
              newIndex !== currentActiveIndex.current &&
              newIndex >= 0 &&
              newIndex < total
            ) {

              const prev = currentActiveIndex.current;

              // hide previous
              if (prev !== -1) {
                const prevRight = rightContentRef.current[prev];
                const prevLeft = leftContentRef.current[prev - 6];

                if (prevRight) {
                  gsap.to(prevRight, { opacity: 0, duration: 0.2, overwrite: true });
                }

                if (prevLeft) {
                  gsap.to(prevLeft, { opacity: 0, duration: 0.2, overwrite: true });
                }
              }

              // show current
              const currentRight = rightContentRef.current[newIndex];
              const currentLeft = leftContentRef.current[newIndex - 6];

              if (currentRight) {
                gsap.killTweensOf(currentRight);

                gsap.fromTo(currentRight,
                  { y: 500, opacity: 0 },
                  {
                    y: isDesktop ? 100 : 62,
                    opacity: 1,
                    duration: 0.4,
                    overwrite: true
                  }
                );
              }

              if (currentLeft) {
                gsap.killTweensOf(currentLeft);

                gsap.fromTo(currentLeft,
                  { y: 600, opacity: 0 },
                  {
                    y: 500,
                    opacity: 1,
                    duration: 0.4,
                    overwrite: true
                  }
                );
              }

              currentActiveIndex.current = newIndex;
            }

          });
        }
      });

    }, radialAnimation_containerRef);

    return () => {
      ctx.revert();
    }

  }, []);

  return (
    <>
      <div ref={radialAnimation_containerRef} className="radialAnimation_wrapper service-com-content">
        <div className="radialAnimation_leftContentDiv">
          <div ref={(el) => (leftContentRef.current[0] = el)} className="radialAnimation_content radialAnimation_leftContent1 radialAnimation_leftContent">
            <h5>Email Marketing & Automation</h5>
            <div>
              Drive high customer lifetime value with personalized automated drip sequences and promotional newsletters.
            </div>
          </div>
          <div ref={(el) => (leftContentRef.current[1] = el)} className="radialAnimation_content radialAnimation_leftContent2 radialAnimation_leftContent">
            <h5>Affiliate Marketing </h5>
            <div>
              Expand your digital sales network through high-performing partner ecosystems and performance-based tracking
            </div>
          </div>
          <div ref={(el) => (leftContentRef.current[2] = el)} className="radialAnimation_content radialAnimation_leftContent3 radialAnimation_leftContent">
            <h5>Influencer Marketing</h5>
            <div>
              Connect with high-impact creators to build immediate trust and tap into targeted regional audiences.
            </div>
          </div>
          <div ref={(el) => (leftContentRef.current[3] = el)} className="radialAnimation_content radialAnimation_leftContent4 radialAnimation_leftContent">
            <h5>Mobile Marketing</h5>
            <div>
              Engage mobile users directly through localized SMS, in-app ad placements, and push notifications.
            </div>
          </div>
          <div ref={(el) => (leftContentRef.current[4] = el)} className="radialAnimation_content radialAnimation_leftContent5 radialAnimation_leftContent">
            <h5>Video Marketing</h5>
            <div>
              Produce scroll-stopping promotional videos and reels engineered to drive viral attention and clicks.
            </div>
          </div>
          <div ref={(el) => (leftContentRef.current[5] = el)} className="radialAnimation_content radialAnimation_leftContent6 radialAnimation_leftContent">
            <h5>Analytics & Attribution</h5>
            <div>
              Track every rupee spent with transparent ROI dashboards and multi-channel marketing attribution.
            </div>
          </div>
        </div>

        <div className="radialAnimation_centerDiv">
          {/* //🔥 BOX LINE  */}
          <div ref={lineWrapperRef} className="radialAnimation_lineWrapper">
            <div ref={lineInnerRef} className="radialAnimation_lineInner">
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  ref={(el) => (lineBoxesRef.current[i] = el)}
                  className="radialAnimation_lineBox"
                />
              ))}
            </div>
          </div>

          {/* // dots + text  */}
          {items.map((text, i) => (
            <React.Fragment key={i}>
              <div
                ref={(el) => (dotsRef.current[i] = el)}
                className={`radialAnimation_dot radialAnimation_dot-${i}`}
              ></div>

              <div
                ref={(el) => (textsRef.current[i] = el)}
                className="radialAnimation_text"
              >
                <span >{text}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="radialAnimation_rightContentDiv">
          <div ref={(el) => (rightContentRef.current[0] = el)} className="radialAnimation_content radialAnimation_rightContent1 radialAnimation_rightContent">
            <h5>SEO</h5>
            <div>
              Rank on page one for high-intent keywords using AI search optimization and localized authority building.
            </div>
          </div>
          <div ref={(el) => (rightContentRef.current[1] = el)} className="radialAnimation_content radialAnimation_rightContent2 radialAnimation_rightContent">
            <h5>SEM</h5>
            <div>
              Capture immediate buyer demand with hyper-targeted Google search ads engineered for maximum ROI.
            </div>
          </div>
          <div ref={(el) => (rightContentRef.current[2] = el)} className="radialAnimation_content radialAnimation_rightContent3 radialAnimation_rightContent">
            <h5>SMM</h5>
            <div>
              Build loyal brand communities and drive organic engagement across Meta, LinkedIn, and Instagram.
            </div>
          </div>
          <div ref={(el) => (rightContentRef.current[3] = el)} className="radialAnimation_content radialAnimation_rightContent4 radialAnimation_rightContent">
            <h5>SMO</h5>
            <div>
              Fine-tune your social profiles, visual branding, and content algorithms for peak reach.
            </div>
          </div>
          <div ref={(el) => (rightContentRef.current[4] = el)} className="radialAnimation_content radialAnimation_rightContent5 radialAnimation_rightContent">
            <h5>PPC</h5>
            <div>
              Lower your customer acquisition costs through real-time bid optimization and automated ad platforms.
            </div>
          </div>
          <div ref={(el) => (rightContentRef.current[5] = el)} className="radialAnimation_content radialAnimation_rightContent6 radialAnimation_rightContent">
            <h5>Content Marketing</h5>
            <div>
              Publish conversion-focused articles, landing pages, and pitch decks that position your brand as an industry leader.
            </div>
          </div>

        </div>

      </div>
    </>
  );
}