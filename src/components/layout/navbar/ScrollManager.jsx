import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    // ✅ Only kill triggers (NOT full reset)
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // ✅ Scroll instantly
    window.scrollTo(0, 0);

  }, [pathname]);

  return null;
}