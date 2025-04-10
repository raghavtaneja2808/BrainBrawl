import React, { useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import OtpVerification from "./OtpVerification";
import AlertMessage from "./AlertMessage";

export default function Signup({setShowRegister,setShowLogin}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOtp,setShowOtp]=useState(false)
  const [error, setError] = useState("");
  const [message,setMessage]=useState("")
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      const userData = {
        name: name,
        email: email, 
        password: password,
      };
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/sign-up`, userData);
        console.log("Response:", response.data);
          if(response.data.status==true){
            setShowOtp(true)
            
          }
        else{alert(response.data.message)}
      } catch (error) {
        console.error("Error signing up:", error.response?.data || error.message);
      
      }
    };

    }
  

  return (
<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">

<motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-black p-8 rounded-2xl shadow-lg max-w-md w-full border border-gray-200 dark:border-gray-700 relative overflow-hidden"
      >  
        <button
          onClick={() => setShowRegister(false)}
          className="absolute top-4 right-4 text-xl hover:cursor-pointer z-20"
        >
          <X className="w-5 h-5 hover:scale-110 hover:text-red-500 transition" />
        </button>
        {showOtp?(<><AlertMessage message={message}/><OtpVerification email={email}/></>):(
      <div>
     
        <h2 className="text-3xl font-bold mb-4 text-black dark:text-white transition-all duration-500">Sign Up</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 transition-all duration-500">
          Create your account to get started
        </p>

        <form>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            id="name"
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-4 rounded-md border text-black dark:text-white dark:bg-gray-800 
              dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400 
              transition-all duration-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 rounded-md border text-black dark:text-white dark:bg-gray-800 
              dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400 
              transition-all duration-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 rounded-md border text-black dark:text-white dark:bg-gray-800 
              dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400 
              transition-all duration-500"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 mb-4 rounded-md border text-black dark:text-white dark:bg-gray-800 
              dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400 
              transition-all duration-500"
            required
          />

          {error && (
            <div className="text-red-600 dark:text-red-400 mb-4 text-sm transition-all duration-500">
              {error}
            </div>
          )}

          <button
          type="button"
            className="w-full bg-black hover:bg-gray-700 text-white py-2 rounded-md 
              dark:bg-white dark:text-black dark:hover:bg-gray-200 font-medium 
              transition-all duration-500 mb-3 hover:cursor-pointer"
              onClick={handleSignup}
          >
            Create Account
          </button>
          <button type="button"
          className="w-full flex items-center justify-center gap-2 border py-2 rounded-md 
              text-black dark:border-white dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 
              transition-all duration-500 hover:cursor-pointer" onClick={handleGoogleLogin}
        >
          Continue with Google 
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/022/484/503/small_2x/google-lens-icon-logo-symbol-free-png.png"
            alt="Google logo"
            className="w-5 h-5"
          />
        </button>
        </form>

        <p className="mt-4 text-center text-gray-700 dark:text-gray-400 transition-all duration-500">
          Already have an account?{" "}
          <button  className="underline hover:cursor-pointer"onClick={()=>{setShowRegister(false);setShowLogin(true)}}>
            Login
          </button>
        </p>
        </div>)}
      </motion.div>
    </div>
  );
}
