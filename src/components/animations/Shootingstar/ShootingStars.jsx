import { section } from "framer-motion/client";
import "./ShootingStars.css";

const ShootingStars = () => {
    return (
        <section className="shootingstar">
            <div className="stars-section">
                {Array.from({ length: 10 }).map((_, i) => (
                    <span key={i}></span>
                ))}
            </div>
            <div class="star-field"></div>
        </section>

    );
};

export default ShootingStars;