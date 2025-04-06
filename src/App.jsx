import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import CreateQuiz from './pages/CreateQuiz';
import { useEffect } from 'react';
import ScrollToTop from './components/ScrollToTop';
import Quiz from './pages/Quiz';
import Loading from './components/Loading';

function App() {
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = localStorage.theme || (prefersDark ? "dark" : "light");

    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path='/create-quiz' element={<CreateQuiz/>}/>
        <Route path="/quiz/trivia" element={<Quiz />} />
        <Route path="/quiz/custom" element={<Quiz />} />
        <Route path='loading' element={<Loading/>}/>
      </Routes>

   
   
    </BrowserRouter>
    
  );
}

export default App;
