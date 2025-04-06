import React, { useState, useEffect } from "react";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import DecryptedText from "./magicui/DecryptedText";

const getReview = (percentage) => {
  if (percentage === 100) return "Perfect! 🔥";
  if (percentage >= 80) return "Excellent! 🎯";
  if (percentage >= 60) return "Good job! 👍";
  if (percentage >= 40) return "Keep going! 💪";
  return "Try again! 💡";
};

const ResultCircle = ({ correct, total }) => {
  const percentage = Math.round((correct / total) * 100);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current > percentage) {
        clearInterval(interval);
      } else {
        setAnimatedPercentage(current);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [percentage]);

  const radius = 200;
  const stroke = 28;
  const strokeDasharray = 2 * Math.PI * radius;
  const progress = (animatedPercentage / 100) * strokeDasharray;

  const getColor = () => {
    if (percentage >= 80) return "#4caf50";
    if (percentage >= 60) return "#ffc107";
    return "#f44336";
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-24 mt-8">
      <div className="flex flex-col items-start text-left max-w-md">
        <p className="text-3xl font-semibold">
        You scored {correct} out of {total}
        </p>
        <p className="text-2xl mt-3 italic">{getReview(percentage)}</p>

        <InteractiveHoverButton className="mt-5">
          Leaderboard
        </InteractiveHoverButton>
      </div>

      <div>
        <svg width="440" height="440">
          <circle
            cx="220"
            cy="220"
            r={radius}
            fill="none"
            stroke="#e6e6e6"
            strokeWidth={stroke}
          />
          <circle
            cx="220"
            cy="220"
            r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth={stroke}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDasharray - progress}
            strokeLinecap="round"
            transform="rotate(-90 220 220)"
          />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="60"
            fontWeight="bold"
            fill="#333"
          >
            {animatedPercentage}%
          </text>
        </svg>
      </div>
    </div>
  );
};

export default ResultCircle;
