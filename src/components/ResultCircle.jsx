import React, { useState, useEffect } from "react";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";
import DecryptedText from "./magicui/DecryptedText";
import { Link } from "react-router-dom";

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

  const baseRadius = 200;
  const baseStroke = 28;
  const radius = baseRadius * 0.8; // Smaller radius for smaller screens
  const stroke = baseStroke * 0.8; // Smaller stroke width for smaller screens
  const strokeDasharray = 2 * Math.PI * radius;
  const progress = (animatedPercentage / 100) * strokeDasharray;

  const getColor = () => {
    if (percentage >= 80) return "#4caf50";
    if (percentage >= 60) return "#ffc107";
    return "#f44336";
  };

  return (
    <div className="flex flex-col items-center justify-center gap-12 mt-8 md:flex-row md:gap-24">
      <div className="flex flex-col items-start text-left max-w-md">
        <p className="text-2xl md:text-3xl font-semibold">
          You scored {correct} out of {total}
        </p>
        <p className="text-xl md:text-2xl mt-3 italic">{getReview(percentage)}</p>

        <Link to="/leaderboard">
          <InteractiveHoverButton className="mt-5">
            Leaderboard
          </InteractiveHoverButton>
        </Link>
      </div>

      <div className="order-first md:order-last"> {/* Shift circle to bottom on smaller screens */}
        <svg width={radius * 2 + stroke} height={radius * 2 + stroke}>
          <circle
            cx={radius + stroke / 2}
            cy={radius + stroke / 2}
            r={radius}
            fill="none"
            stroke="#e6e6e6"
            strokeWidth={stroke}
          />
          <circle
            cx={radius + stroke / 2}
            cy={radius + stroke / 2}
            r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth={stroke}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDasharray - progress}
            strokeLinecap="round"
            transform={`rotate(-90 ${radius + stroke / 2} ${radius + stroke / 2})`}
          />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="40" // Smaller font size
            fontWeight="bold"
            fill="#333"
            transform={`translate(${radius + stroke / 2 - radius}, ${radius + stroke / 2 - radius})`} // Adjust text position
          >
            {animatedPercentage}%
          </text>
        </svg>
        {/* Vercel Push */}
      </div>
    </div>
  );
};

export default ResultCircle;