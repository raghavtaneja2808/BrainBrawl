import React, { useContext, useState } from 'react';
import { Button } from './ui/button';
import { ChevronRight, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import AuthContext from '@/assets/AuthContext';
import Avatar from './Avatar';

const BlogBattleNav = ({ faqRef }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  let { user, refreshUser } = useContext(AuthContext);

  const handleFaqClick = () => {
    if (faqRef?.current) {
      faqRef.current.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false); // Close mobile menu after clicking FAQ
    }
  };

  return (
    <>
      <div className="pt-20">
        <nav className="fixed top-0 left-0 w-full bg-white/50 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:bg-black dark:border-gray-700 z-50">
          <div className="flex items-center justify-between px-4 md:px-8 py-2">

            <div className="flex items-center gap-2">
              <img
                className="w-10 h-10"
                src="https://cdn-icons-png.freepik.com/512/12477/12477433.png"
                alt="logo"
              />
<a href="http://localhost:8000/blogbattle" className="text-2xl font-bold ubuntu-bold">Blog Battle</a>
</div>

            <div className="hidden md:flex items-center gap-10">
              <p className="text-xl font-ubuntu text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <a href='http://localhost:8000/blogbattle/start' className="text-lg text-gray-700 dark:text-gray-300">Quiz</a>
              </p>
              <a href='http://localhost:8000/blogverse/blogs' className="text-lg text-gray-700 dark:text-gray-300">Blogs</a>
              <a href='http://localhost:8000/blogverse' className="text-lg text-gray-700 dark:text-gray-300 hover:cursor-pointer"><Button className="hover:cursor-pointer">Back to Home</Button></a>
             
            </div>

            <div className="flex items-center gap-2">
              
              <ThemeToggle />

              <button
                className="md:hidden ml-2 text-black dark:text-white"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="md:hidden flex flex-col gap-4 bg-white dark:bg-black px-6 py-4">
              <a href='http://localhost:8000/blogbattle/start' className="text-lg text-gray-700 dark:text-gray-300">Quiz</a>
              <a href='http://localhost:8000/blogverse/blogs' className="text-lg text-gray-700 dark:text-gray-300">Blogs</a>
              <a href='http://localhost:8000/blogverse' className="text-lg text-gray-700 dark:text-gray-300 hover:cursor-pointer"><Button className="hover:cursor-pointer">Back to Home</Button></a>
            </div>
          )}
        </nav>
      </div>
      {showLogin && (
        <Login setShowLogin={setShowLogin} setShowRegister={setShowRegister} />
      )}
      {showRegister && (
        <Signup setShowRegister={setShowRegister} setShowLogin={setShowLogin} />
      )}
    </>
  );
};

export default BlogBattleNav;
