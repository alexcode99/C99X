import './AnimatedSquareBorder.css'
export default function AnimatedSquareBorder({
  color = "#Affe04",
  size = 6,
  gap = 12,
  speed = 4
}) {
  return (
    <div className="square-container">
      
      {/* Top */}
      <div
        className="line top"
        style={{
          height: `${size}px`,
          background: `repeating-linear-gradient(
            to right,
            ${color} 0px,
            ${color} ${size}px,
            transparent ${size}px,
            transparent ${size + gap}px
          )`,
          animationDuration: `${speed}s`,
          borderRadius:"25%",
        }}
        // style={{
  // height: `${size}px`,
  // backgroundImage: `radial-gradient(circle, ${color} 60%, transparent 61%)`,
  // backgroundSize: `${size + gap}px ${size + gap}px`,
  // backgroundRepeat: "repeat",
  // animationDuration: `${speed}s, transparent ${size + gap}px`
  // -----------------------
  // height: "8px",
  //           backgroundImage: "radial-gradient(circle, rgb(175, 254, 4) 60%, transparent 61%)",
  //           backgroundSize: "9px 8px",
  //           backgroundRepeat: "repeat",
  //           animationDuration: "5s",
            
  
// }}
      />

      {/* Right */}
      <div
        className="line right"
        style={{
          width: `${size}px`,
          background: `repeating-linear-gradient(
            to bottom,
            ${color} 0px,
            ${color} ${size}px,
            transparent ${size}px,
            transparent ${size + gap}px
          )`,
          animationDuration: `${speed}s`
            //   height: "10px",
            // backgroundImage: "radial-gradient(circle, rgb(175, 254, 4) 60%, transparent 61%)",
            // backgroundSize: "9px 8px",
            // backgroundRepeat: "repeat",
            // animationDuration: "5s",
}
        }
      />

      {/* Bottom */}
      <div
        className="line bottom"
        style={{
          height: `${size}px`,
          background: `repeating-linear-gradient(
            to right,
            ${color} 0px,
            ${color} ${size}px,
            transparent ${size}px,
            transparent ${size + gap}px
          )`,
          animationDuration: `${speed}s`
        }}
      />

      {/* Left */}
      <div
        className="line left"
        style={{
          width: `${size}px`,
          background: `repeating-linear-gradient(
            to bottom,
            ${color} 0px,
            ${color} ${size}px,
            transparent ${size}px,
            transparent ${size + gap}px
          )`,
          animationDuration: `${speed}s`
        }}
      />

      {/* X-mark-1 */}
      {/* <div
        className="line wrong-1"
        style={{
          width: `${size}px`,
          background: `repeating-linear-gradient(
            to bottom,
            ${color} 0px,
            ${color} ${size}px,
            transparent ${size}px,
            transparent ${size + gap}px
          )`,
          animationDuration: `${speed}s`
        }}
      /> */}


    </div>
  );
}
