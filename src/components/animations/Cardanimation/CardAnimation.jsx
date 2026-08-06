/*//card animation.jsx*/
import "./CardAnimation.css";
import { useEffect } from "react";
import gsap from "gsap";

import greenCard from "../../../assets/about/greenCard.png";
import greyCard from "../../../assets/about/greyCard.png";

export default function CardAnimation() {
    const totalCards = 12;

    useEffect(() => {
        const cards = gsap.utils.toArray(".cardAnimation_card");
        const rest = cards.slice(1);
        const isMobile = window.innerWidth < 450;

        const tl = gsap.timeline({
            repeat: -1,
            repeatDelay: 1
    });

        // 1️⃣ circular motion
        tl.to(cards, {
            offsetDistance: isMobile ? "+=5%" : "+=30%",
            duration: 1.5,
            stagger: 0.15,
            ease: "power1.inOut",
            onUpdate: () => {
                cards.forEach((card) => {
                    const distance = gsap.getProperty(card, "offsetDistance");
                    gsap.set(card, {
                        zIndex: Math.round(distance)
                    });
                });
            }
        })

            // 2️⃣ stack
            .to(cards, {
                x: -120,
                y: -60,
                duration: 1,
                ease: "power1.out",
                // onStart: () => {
                //     rest.forEach((card, i) => {
                //         gsap.set(card, { zIndex: -i });
                //     });
                // },
            })

            // 3️⃣ expand
            .to(cards, {
                x: 0,
                y: 0,
                scale: isMobile ? 0.85 : 1,
                rotationX: 160,
                duration: 1,
                ease: "back.out(1.2)",
            })

            // 4️⃣ reset
            .to(cards, {
                rotationX: 0,
                scale: 0.9,
                duration: 1.2,
                ease: "back.out(1.2)",
            });

        // wrapper rotate
        gsap.to(".cardAnimation_wrapper", {
            delay: 6,
            rotateZ: -270,
            duration: 1.5,
            ease: "power2.inOut",
        });
    }, []);

    return (
        <div className="cardAnimation_overAll">
            <div className="cardAnimation_container">
                <div
                    className="cardAnimation_wrapper"
                    style={{ "--total": totalCards }}
                >
                    {Array.from({ length: totalCards }).map((_, index) => (
                        <div
                            className="cardAnimation_card"
                            key={index}
                            style={{
                                "--i": index,
                                // zIndex: totalCards - index,
                            }}
                        >
                            <img
                                src={index % 2 === 0 ? greenCard : greyCard}
                                alt="card"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}