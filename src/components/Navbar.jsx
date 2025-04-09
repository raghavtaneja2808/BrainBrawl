import React, { useState } from 'react'
import { Button } from './ui/button'
import { ChevronRight, Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { Link } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLogin,setShowLogin]=useState(false)
  const [showRegister,setShowRegister]=useState(false)
  return (
    <>
    <div className="pt-20">
      <nav className="fixed top-0 left-0 w-full bg-white/50 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:bg-black dark:border-gray-700 z-50">
        <div className="flex items-center justify-between px-4 md:px-8 py-2">

          <div className="flex items-center gap-2">
            <img
              className="w-12 h-12"
              src="https://static.vecteezy.com/system/resources/thumbnails/010/789/831/small_2x/cute-cartoon-brain-brain-illustration-png.png"
              alt="logo"
            />
            <a href="/" className="text-2xl font-bold ubuntu-bold">Brain Brawl</a>
          </div>

          <div className="hidden md:flex items-center gap-10">
            <p className="text-xl font-ubuntu text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Link to="/create-quiz">Quiz</Link>
            </p>
            <a href="#pricing" className="text-xl font-ubuntu text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Pricing</a>
            <a href="#feature" className="text-xl font-ubuntu text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Use cases</a>
            <a href="#footer" className="text-xl font-ubuntu text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Contact us</a>
            <p className="text-xl font-ubuntu text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">FAQ</p>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={()=>{setShowLogin(true)}} variant="ghost" className="bg-white text-black border border-gray-500 hover:bg-gray-100 m-1 dark:bg-black dark:text-white hover:cursor-pointer" >
              Login
            </Button>
            <Button className="hidden hover:cursor-pointer sm:block">
              Get Brain+ 
            </Button>
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
            <Link to="/create-quiz" className="text-lg text-gray-700 dark:text-gray-300">Quiz</Link>
            <a href="#pricing" className="text-lg text-gray-700 dark:text-gray-300">Pricing</a>
            <a href="#feature" className="text-lg text-gray-700 dark:text-gray-300">Use cases</a>
            <a href="#footer" className="text-lg text-gray-700 dark:text-gray-300">Contact us</a>
            <p className="text-lg text-gray-700 dark:text-gray-300">FAQ</p>
          </div>
        )}
      </nav>
    </div>
    {showLogin &&
    <Login setShowLogin={setShowLogin} setShowRegister={setShowRegister}/>}
    {showRegister && <Signup setShowRegister={setShowRegister} setShowLogin={setShowLogin}/>}
    </>
  )
}

export default Navbar
