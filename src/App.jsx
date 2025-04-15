
import "./App.css";
import Landing from "./pages/Landing";
import CreateQuiz from "./pages/CreateQuiz";
import { useEffect, useState } from "react";
import ScrollToTop from "./components/ScrollToTop";
import Quiz from "./pages/Quiz";
import Loading from "./components/Loading";
import Leaderboard from "./pages/Leaderboard";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import OtpVerification from "./components/OtpVerification";
import { AuthProvider } from "./assets/AuthContext";
import Profile from "./pages/Profile";
import axios from "axios";
import FeedbackPage from "./pages/FeedbackPage";
import Payment from "./components/Payment";
import ChatPage from "./components/ChatPage";
import AnotherUser from "./pages/AnotherUser";

function App() {
  axios.defaults.withCredentials=true
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const theme = localStorage.theme || (prefersDark ? "dark" : "light");

    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/create-quiz" element={<CreateQuiz />} />
          <Route path="/quiz/trivia" element={<Quiz />} />
          <Route path="/quiz/custom" element={<Quiz />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/user/:userId" element={<AnotherUser/>}/>
          <Route path="/chat/:otherUserId" element={<ChatPage />} />
          <Route path="/feedback" element={< FeedbackPage />} />
          <Route path="/chatpage" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
