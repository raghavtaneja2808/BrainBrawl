import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ui/footer";
import TriviaQuizSec from "@/components/TriviaQuizSec";
import CustomQuizSec from "@/components/CustomQuizSec";
import GenQuiz from "@/components/GenQuiz";
import Aurora from "../../y/Aurora/Aurora";

export default function CreateQuiz() {
  return (
    <div className="bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Aurora
            colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
            blend={1}
            amplitude={0.8}
            speed={1.7}
          />
        </div>

        <div className="relative z-10 px-6 md:px-12 pt-20">
          <h1 className="text-center text-4xl sm:text-5xl font-extrabold mb-12 leading-tight">
            <span className="bg-gradient-to-r from-[#00ffcc] via-[#3366ff] to-[#cc00ff] bg-clip-text text-transparent">
              Choose Your Quiz Creation Style
            </span>
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-evenly gap-10 mb-16">
            {/* Trivia Mode */}
            <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-md">
              <h2 className="text-xl font-bold text-center mb-4">Trivia Quiz</h2>
              <p className="text-sm text-muted-foreground text-center mb-6">
                Create quizzes using popular trivia categories and topics.
              </p>
              <TriviaQuizSec />
            </div>

            {/* Custom Mode */}
            <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-md">
              <h2 className="text-xl font-bold text-center mb-4">Custom Quiz</h2>
              <p className="text-sm text-muted-foreground text-center mb-6">
                Add your own questions and categories. <br />
                <span className="text-rose-500 font-semibold">
                  Tip: You must define a category to continue!
                </span>
              </p>
              <CustomQuizSec />
            </div>
          </div>

          <div className="my-12 h-1 w-full rounded-full border-0 bg-gradient-to-r from-[#00ffcc] via-[#3366ff] to-[#cc00ff] shadow-[0_0_10px_#00ffcc]" />
          <GenQuiz />
        </div>
      </div>

      <Footer />
    </div>
  );
}
