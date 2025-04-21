import React, { useState } from "react";
import { BotIcon } from "lucide-react";
import axios from "axios";

export default function AIAgentQuizSec() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleCallAgent = async () => {
    if (!phoneNumber) {
      alert("Please enter a phone number.");
      return;
    }

  }

  return (
    <div className="flex justify-center"> {/* Added justify-center here */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-md w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-4 flex items-center justify-center gap-2">
          <BotIcon className="w-6 h-7 text-blue-500" />
          AI Agent Quiz
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Let an AI agent ask you quiz questions! Ideal for hands-free practice.
        </p>

        <input
          type="text"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-full shadow-sm focus:outline-none"
        />

        <div className="flex justify-center">
          <button
            onClick={handleCallAgent}
            className="bg-gradient-to-r from-[#00ffcc] to-[#cc00ff] hover:from-[#00ffaa] hover:to-[#aa00ff] text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-all duration-300"
          >
            Start AI Quiz
          </button>
        </div>
      </div>
    </div>
  );
}