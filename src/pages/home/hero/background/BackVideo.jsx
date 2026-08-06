import React from "react";
import GridLayout from "../../../../assets/Home_Page_Assets/GridGlow.mp4";
import './BackVideo.css'

const BackgroundVideo = ({ children }) => {
  return (
    <div className="home-video-container">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="home-background-video"
        // style={{position:"absolute", width:"100%",}}
      >
        <source src={GridLayout} type="video/mp4" />
      </video>

      <div className="home-grid-content">
        {children}
      </div>
    </div>
  );
};

export default BackgroundVideo;