import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Cursor.css";

export default function MouseFollower() {
    const ballRef = useRef(null);

    useEffect(() => {
        const ball = ballRef.current;

        // center align
        gsap.set(ball, { xPercent: -50, yPercent: -50 });

        let pos = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        };

        let mouse = { ...pos };
        const speed = 0.1;

        const OFFSET_Y = -3; 
        const OFFSET_X = 0; 

        const xSet = gsap.quickSetter(ball, "x", "px");
        const ySet = gsap.quickSetter(ball, "y", "px");

        const handleMouseMove = (e) => {
            mouse.x = e.clientX + OFFSET_X;
            mouse.y = e.clientY + OFFSET_Y;
        };

        window.addEventListener("mousemove", handleMouseMove);

        const update = () => {
            const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

            pos.x += (mouse.x - pos.x) * dt;
            pos.y += (mouse.y - pos.y) * dt;

            xSet(pos.x);
            ySet(pos.y);
        };

        gsap.ticker.add(update);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            gsap.ticker.remove(update);
        };
    }, []);

    return (
        <div className="altura">
            <div className="con">
                <span
                    ref={ballRef}
                    className="cursor-ball"
                ></span>
            </div>
        </div>
    );
}


// import { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import "./Cursor.css";

// export default function MouseFollower() {
//     const ballRef = useRef(null);
//     const [isMobile, setIsMobile] = useState(false);

//     useEffect(() => {
//         const checkScreen = () => {
//             setIsMobile(window.innerWidth <= 768);
//         };

//         checkScreen();
//         window.addEventListener("resize", checkScreen);

//         return () => window.removeEventListener("resize", checkScreen);
//     }, []);

//     useEffect(() => {
//         if (isMobile) return; // 👉 mobileனா animation run ஆகாது

//         const ball = ballRef.current;

//         gsap.set(ball, { xPercent: -50, yPercent: -50 });

//         let pos = {
//             x: window.innerWidth / 2,
//             y: window.innerHeight / 2,
//         };

//         let mouse = { ...pos };
//         const speed = 0.1;

//         const xSet = gsap.quickSetter(ball, "x", "px");
//         const ySet = gsap.quickSetter(ball, "y", "px");

//         const handleMouseMove = (e) => {
//             mouse.x = e.clientX;
//             mouse.y = e.clientY;
//         };

//         window.addEventListener("mousemove", handleMouseMove);

//         const update = () => {
//             const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

//             pos.x += (mouse.x - pos.x) * dt;
//             pos.y += (mouse.y - pos.y) * dt;

//             xSet(pos.x);
//             ySet(pos.y);
//         };

//         gsap.ticker.add(update);

//         return () => {
//             window.removeEventListener("mousemove", handleMouseMove);
//             gsap.ticker.remove(update);
//         };
//     }, [isMobile]);

//     // mobileனா renderவே ஆகாது
//     if (isMobile) return null;

//     return (
//         <div className="altura">
//             <div className="con">
//                 <span ref={ballRef} className="ball"></span>
//             </div>
//         </div>
//     );
// }