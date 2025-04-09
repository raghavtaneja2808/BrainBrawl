import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Star, MessageCircle } from 'lucide-react'
import axios from 'axios';

function Avatar({ user, onLogout }) {
    const [isOpen, setIsOpen] = useState(false);
    const profileRef = useRef(null);
    const Logout = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
            withCredentials: true,
          });
      
          if (res.data.message) {
            console.log("Logout successful");
            setTimeout(() => {
              window.location = "/";
            }, 300); // small delay to ensure cookie/session clears
          } else {
            console.log("Logout response invalid");
          }
        } catch (err) {
          console.error("Logout error:", err);
        }
      };
          useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block" ref={profileRef}>
            <div
                className={`w-10 h-10 rounded-full cursor-pointer border-2 
                ${isOpen ? 'border-primary' : 'border-gray-300'}`}
                onClick={() => setIsOpen(!isOpen)}
                dangerouslySetInnerHTML={{ __html: user.photo }}
            />

            <AnimatePresence>
                {isOpen && (
                     <motion.div
                     initial={{ opacity: 0, y: -10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     transition={{
                       duration: 0.4,
                       ease: "easeOut",
                     }}
                     className="absolute top-12 right-0 bg-white shadow-lg 
                       border-2 border-black p-4 rounded-xl w-60 z-10 
                       dark:bg-black dark:border-blue-500"
                   >
                        <p className="font-bold dark:text-white text-center">{user?.name || 'Guest'}</p>
                        <p className="text-sm text-gray-500 dark:text-white text-center">{user?.email || 'No Email'}</p>
                        <div className="flex flex-col gap-1 mt-3">
  <Link to="/leaderboard">
    <Button
      variant="ghost"
      className="w-full justify-start text-sm dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 hover:cursor-pointer"
    >
      <Star className="w-4 h-4 mr-2" />
      Leaderboard
    </Button>
  </Link>

  <Link to="/profile">
    <Button
      variant="ghost"
      className="w-full justify-start text-sm dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 hover:cursor-pointer"
    >
      <User className="w-4 h-4 mr-2" />
      Account
    </Button>
  </Link>

  <Link to="/feedback">
    <Button
      variant="ghost"
      className="w-full justify-start text-sm dark:text-white hover:bg-primary/10 dark:hover:bg-primary/20 hover:cursor-pointer"
    >
      <MessageCircle className="w-4 h-4 mr-2" />
      Feedback
    </Button>
  </Link>
<Button className="mt-3 w-full bg-primary text-white pointer dark:text-black hover:cursor-pointer" onClick={Logout}                 >
                            Logout 
                        </Button>
</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Avatar;
