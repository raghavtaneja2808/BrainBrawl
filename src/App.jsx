// src/App.jsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import CreateQuiz from './pages/CreateQuiz';
import { useEffect, useState } from 'react';
import ScrollToTop from './components/ScrollToTop';
import Quiz from './pages/Quiz';
import Loading from './components/Loading';
<<<<<<< HEAD
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './pages/Profile';
=======
import Profile from './components/Profile';
import OtpVerification from './components/OtpVerification';
import { AuthProvider } from './assets/AuthContext';
>>>>>>> b09948db5659400f8540bfb81ca493fca6ebc439

function App() {
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
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
        <Route path='/otp' element={<OtpVerification/>}/>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
