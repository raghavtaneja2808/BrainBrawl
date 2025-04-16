import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import QuestionsCard from "@/components/QuestionsCard";
import Footer from "@/components/ui/footer";
import ResultCircle from "@/components/ResultCircle";
import AuthContext from "@/assets/AuthContext";
import BlogBattleNav from "@/components/BlogBattleNav";

const BlogBattle = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const {user,refreshUser}=useContext(AuthContext)
  const num = searchParams.get("num");
  const category = searchParams.get("category");
  const difficulty = searchParams.get("difficulty");
  const type = searchParams.get("type");

  const [loading, setLoading] = useState(true);
  const [questionData, setQuestionData] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const didFetchRef = useRef(false);
  const startTimeRef = useRef(Date.now());

  const isTriviaMode = location.pathname.includes("trivia");
  const isCustomMode = location.pathname.includes("custom");

  // Trivia mode
  useEffect(() => {
    if (!isTriviaMode || didFetchRef.current) return;
    didFetchRef.current = true;

    const apiUrl = new URL("https://opentdb.com/api.php");
    apiUrl.searchParams.set("amount", num);
    if (type) apiUrl.searchParams.set("type", type);
    if (difficulty) apiUrl.searchParams.set("difficulty", difficulty);
    if (category) apiUrl.searchParams.set("category", category);

    fetch(apiUrl)
      .then((res) => res.json())
      .then((json) => {
        setQuestionData(json.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setLoading(false);
      });
  }, [isTriviaMode, num, type, difficulty, category]);

  // Custom mode
  useEffect(() => {
    if (!isCustomMode || didFetchRef.current) return;
    didFetchRef.current = true;

    fetch(`${import.meta.env.VITE_API_URL}/api/generate-quiz`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        numQuestions: num,
        difficulty: difficulty,
        description: category,
        type: type,
      }),
    }).then((response) => {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      function read() {
        reader.read().then(({ done, value }) => {
          if (done) return;
          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;
          const lines = buffer.split("\n");
          buffer = lines.pop();

          for (const line of lines) {
            if (!line.trim()) continue;
            try {
              const data = JSON.parse(line);
              setQuestionData((prev) => [...prev, data]);
              setLoading(false);
            } catch (err) {
              console.error("JSON parse error:", err, "Line:", line);
            }
          }
          read();
        });
      }

      read();
    });
  }, [isCustomMode, num, type, difficulty, category]);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => prev + 1);

  };

  const submitResult = async () => {
    if (submitted) return;
    setSubmitted(true);

    const payload = {
      score: score,
      correctAnswers: score,
      totalQuestions: questionData.length,
      timeSpent: Math.floor((Date.now() - startTimeRef.current) / 60000), // in minutes
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/quiz/submit`, payload);
      console.log("Submitted:", res.data);
    } catch (error) {
      console.error("Error submitting quiz result:", error);
    }
  };

  // ✅ Call submit when quiz ends
  useEffect(() => {
    if (questionData.length > 0 && currentQuestionIndex >= questionData.length) {
      submitResult();
    }
  }, [currentQuestionIndex, questionData]);
  const quizCompleted = currentQuestionIndex >= questionData.length;
  if (loading) return <Loading text={"Generating Questions for You"} />;

  if (!questionData || questionData.length === 0) {
    return <p className="text-center mt-20 text-xl">No questions found.</p>;
  }

  const currentQuestion = questionData[currentQuestionIndex];
  return (
    <div>
      <BlogBattleNav/>
      <div className="flex justify-between items-start px-4 py-10">

        {/* Trivia Mode Section (Right side) */}
        <div className="w-full md:w-2/3">
          {!quizCompleted ? (
            <QuestionsCard
              questionData={currentQuestion}
              onOptionSelect={handleNextQuestion}
              Index={currentQuestionIndex}
              onNext={handleNextQuestion}
              onCorrect={() => setScore((prev) => prev + 1)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6">
                Quiz Complete 🎉
              </h2>
              <ResultCircle correct={score} total={questionData.length} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogBattle;
