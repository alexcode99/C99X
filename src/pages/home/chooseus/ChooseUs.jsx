import React, { useState } from "react";
import './ChooseUs.css'
import reviewData from './reviewData'

// icons
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ChooseUs = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === reviewData.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? reviewData.length - 1 : prev - 1
    );
  };

  const currentReview = reviewData[currentIndex];

  return (
    <section className="home-chooseus section_gap">
      <div className="common-sect">
                <h2 className="common-sect-title">Why Market Leaders Choose <span className="common-highlights">C99X</span></h2>
                <p className="common-sect-des">Results. Transparency. Long-term growth partnerships.</p>
      </div>
      <div className="home-choose">

        {/* LEFT */}
        <div className="home-choose-left">
          <p>Review Summary</p>
          <h3>4.9/5</h3>
          <p>Loved by developers around the globe</p>
        </div>

        {/* RIGHT */}
        <div className="home-choose-right">
          <img src={currentReview.image} alt="image" />

          <p>{currentReview.text}</p>

          <div>
            <p>{currentReview.name}</p>

            {/* Stars */}
            <div>
              {[...Array(currentReview.rating)].map((_, i) => (
                <i key={i}>
                  <FaStar />
                </i>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ARROWS */}
      <div className="home-choose-arrow">
        <i onClick={prevSlide}>
          <FaArrowLeft />
        </i>

        <i onClick={nextSlide}>
          <FaArrowRight />
        </i>
      </div>
    </section>
  );
};

export default ChooseUs;