import { motion } from "framer-motion";
import "./GridGlow.css";

export default function GridGlow({ children }) {
  return (
    <div className="gridContainer">

      {/* Background */}
      <div className="grid"></div>

      {/* Animations */}
      <motion.div
        className="glowLine horizontal"
        initial={{ x: "-100%" }}
        animate={{ x: "100vw" }}
        // style={{top:"50%"}}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="glowLine horizontal1"
        initial={{ x: "100vw" }}
        animate={{ x: "-100%" }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="glowLine vertical"
        initial={{ y: "-100%" }}
        animate={{ y: "100vh" }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="glowLine verticalUp"
        initial={{ y: "100vh" }}
        animate={{ y: "-100%" }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/*  CONTENT LAYER */}
      <div className="content">
        {children}
      </div>

    </div>
  );
}