import React from "react";
import { motion } from "framer-motion";

const HoverLetters = ({ text }) => {

  const letters = text.split("");

  const container = {
    initial: {},
    hover: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const letterTop = {
    initial: { y: "0%" },
    hover: { y: "-100%" }
  };

  const letterBottom = {
    initial: { y: "100%" },
    hover: { y: "0%" }
  };

  return (
    <motion.span
      variants={container}
      initial="initial"
      whileHover="hover"
      style={{
        display: "inline-flex",
        overflow: "hidden",
        alignItems: "center"
      }}
    >
      {letters.map((char, i) => (
        <span
          key={i}
          style={{
            position: "relative",
            display: "inline-block",
            height: "1.2em",
            lineHeight: "1.2em",
            overflow: "hidden"
          }}
        >
          <motion.span
            variants={letterTop}
            transition={{ duration: 0.3 }}
            style={{ display: "block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>

          <motion.span
            variants={letterBottom}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              display: "block"
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export default HoverLetters;