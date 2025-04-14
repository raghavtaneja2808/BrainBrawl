import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const MotivationCard = () => {
  const [quote, setQuote] = useState("Loading motivation...");

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch("https://api.quotable.io/random");
        const data = await res.json();
        setQuote(`“${data.content}” – ${data.author}`);
      } catch {
        setQuote("“Stay motivated, keep going!” 💪");
      }
    };
    fetchQuote();
  }, []);

  return (
    <div
      className="relative max-h-[100%] w-full p-6 rounded-3xl shadow-2xl transition-all duration-500
        bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-2 border-gray-300 dark:border-gray-600 hover:scale-105"
    >
   
      <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full shadow-xl transform rotate-45">
        <Sparkles className="w-6 h-6 text-white" />
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />
        <h2 className="text-2xl font-bold">💡 Daily Motivation</h2>
      </div>
      
      <p className="text-md font-medium leading-relaxed italic">{quote}</p>
      
      <div className="absolute bottom-[-20] left-4 text-xs opacity-50">
        <p>Stay inspired! 🌟</p>
      </div>
    </div>
  );
};

export default MotivationCard;

