import { useEffect, useRef } from "react";
import p5 from "p5";
import sketch from "../sketch";

const P5Wrapper = ({ sharedRef }) => { // This component wraps the p5.js sketch and allows it to access shared state
  const canvasRef = useRef(null); // Reference to the p5 canvas instance
  useEffect(() => { // Initialize the p5 sketch with the sharedRef
    canvasRef.current = new p5(
      (p) => sketch(p, sharedRef), // Pass the sketch function and sharedRef to p5
      document.getElementById("p5-container") // Attach the p5 instance to a specific DOM element
    );
    return () => {
      if (canvasRef.current) canvasRef.current.remove(); // Cleanup the p5 instance on component unmount
    };
  }, [sharedRef]);

  return <div id="p5-container" />;
};

export default P5Wrapper;