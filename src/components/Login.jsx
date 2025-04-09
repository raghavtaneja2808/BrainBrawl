import React, { useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
export default function Login({ setShowLogin,setShowRegister}) {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-black p-8 rounded-2xl shadow-lg max-w-md w-full border border-gray-200 dark:border-gray-700 relative"
      >
        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 text-xl hover:cursor-pointer"
        >
          <X className="w-5 h-5 hover:scale-110 hover:text-red-500 transition" />
        </button>

        <h2 className="text-3xl font-bold mb-4 text-black dark:text-white transition-all duration-500">
          Login
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 transition-all duration-500">
          Enter your email below to login to your account
        </p>

        <input
          type="email"
          placeholder="m@example.com"
          className="w-full p-3 mb-4 rounded-md border text-black dark:text-white 
              dark:bg-gray-800 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400 
              transition-all duration-500"
        />

        <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
          <label>Password</label>
          <a href="#" className="underline">
            Forgot your password?
          </a>
        </div>

        <input
          type="password"
          placeholder="Your password"
          className="w-full p-3 mb-4 rounded-md border text-black dark:text-white 
              dark:bg-gray-800 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400 
              transition-all duration-500"
        />

        <button
          className="w-full bg-black hover:bg-gray-900 text-white py-2 rounded-md 
              dark:bg-white dark:text-black dark:hover:bg-gray-200 font-medium mb-3 
              transition-all duration-500 hover:cursor-pointer"
        >
          Login
        </button>

        <button
          className="w-full flex items-center justify-center gap-2 border py-2 rounded-md 
              text-black dark:border-white dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 
              transition-all duration-500 hover:cursor-pointer"
        >
          Login with Google
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/022/484/503/small_2x/google-lens-icon-logo-symbol-free-png.png"
            alt="Google logo"
            className="w-5 h-5"
          />
        </button>

        <p className="mt-4 text-center text-gray-600 dark:text-gray-400 transition-all duration-500">
          Don’t have an account?{" "}
          <button onClick={()=>{setShowLogin(false);setShowRegister(true)}} className="underline hover:cursor-pointer">
            Sign up
          </button>
        </p>
      </motion.div>
    </div>
  );
}
