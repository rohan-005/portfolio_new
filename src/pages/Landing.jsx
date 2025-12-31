import React, { useState, useEffect } from "react";
import "../css/landing.css";
import Antigravity from "../components/Antigravity"; // Adjust path if needed

// Import Images
import fullstackImg from "../assets/fullstack.png";
import gameImg from "../assets/game.png";

const Landing = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // --- CONFIGURATION ---
  // Change this ONE value to resize both the cursor ring and the reveal hole
  const CURSOR_RADIUS = 10; 
  
  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      className="hero-container"
      style={{ 
        "--x": `${mousePos.x}px`, 
        "--y": `${mousePos.y}px`,
        "--radius": `${700}px` // Pass radius to CSS
      }}
    >
      {/* 1. BOTTOM LAYER (The Reveal / Game Dev) */}
      <div 
        className="bg-layer reveal-layer"
        style={{ backgroundImage: `url(${gameImg})` }}
      />

      {/* 2. TOP LAYER (The Surface / Full Stack) */}
      {/* We apply the SVG filter here via CSS to make the hole 'wobbly' */}
      <div 
        className="bg-layer surface-layer"
        style={{ backgroundImage: `url(${fullstackImg})` }}
      />

      {/* 3. THE CURSOR (Antigravity) */}
      <div className="antigravity-wrapper">
         <Antigravity 
            magnetRadius={5} 
            // We pass the same radius here so they match perfectly
            ringRadius={CURSOR_RADIUS} 
         />
      </div>

      {/* 4. TEXT CONTENT */}
      {/* <div className="content-wrapper">
        <div className="hero-text">
          <h1 className="title">Rohan Dhanerwal</h1>
          <p className="subtitle">Interactive Portfolio</p>
        </div>
      </div> */}

      {/* --- SVG FILTER FOR UNEVEN EDGES --- */}
      {/* This is hidden visually but used by the CSS 'filter' property */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="liquid-filter">
            {/* Creates noise/texture */}
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.01" 
              numOctaves="3" 
              result="noise" 
            />
            {/* Uses that noise to distort the image (and the mask edge) */}
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale="30" /* Higher scale = More 'wobbly' and uneven */
            />
          </filter>
        </defs>
      </svg>

    </section>
  );
};

export default Landing;