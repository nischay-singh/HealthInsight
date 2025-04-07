import React, { useEffect, useRef } from "react";
import WordCloud from "wordcloud";

export default function SymptomWordCloud({words}) {
  const canvasRef = useRef();
  
  useEffect(() => {
    if (canvasRef.current && words && words.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      WordCloud(canvasRef.current, {
        list: words,
        gridSize: 6,
        weightFactor: (size) => Math.min(size * 2.5, 70),
        fontFamily: "Inter, sans-serif",
        color: () => {
            const colors = [
              "#f87171", "#34d399", "#60a5fa", "#fbbf24",
              "#a78bfa", "#f472b6", "#38bdf8", "#4ade80"
            ];
            return colors[Math.floor(Math.random() * colors.length)];
          },
        rotateRatio: 0.2,
        rotationSteps: 2,
        backgroundColor: "transparent",
        origin: [600, 450],
      });
    }
  }, [words]);

  return (
    <div className="flex justify-center my-6">
      <canvas ref={canvasRef} width="1200" height="900" />
    </div>
  );
}
