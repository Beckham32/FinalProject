import { useEffect, useRef } from "react";
import p5 from "p5";
import sketch from "../sketch";

const P5Wrapper = ({ sharedRef }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    canvasRef.current = new p5(
      (p) => sketch(p, sharedRef),
      document.getElementById("p5-container")
    );
    return () => {
      if (canvasRef.current) canvasRef.current.remove();
    };
  }, [sharedRef]);

  return <div id="p5-container" />;
};

export default P5Wrapper;