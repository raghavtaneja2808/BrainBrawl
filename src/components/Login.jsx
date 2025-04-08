import React from "react";
import ThemeToggle from "../components/ThemeToggle";

export default function Login() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4 
      bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] dark:from-[#0f0f0f] dark:to-[#1a1a1a] 
      transition-all duration-500 ease-in-out"
    >
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="bg-white dark:bg-black p-8 rounded-2xl shadow-lg max-w-md w-full
        transition-all duration-500 ease-in-out border border-gray-200 dark:border-gray-700">
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
          <a href="#" className="underline">Forgot your password?</a>
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
            transition-all duration-500"
        >
          Login
        </button>

        <button
          className="w-full flex items-center justify-center gap-2 border py-2 rounded-md 
            text-black dark:border-white dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 
            transition-all duration-500"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          Login with Google
        </button>

        <p className="mt-4 text-center text-gray-600 dark:text-gray-400 transition-all duration-500">
          Don’t have an account? <a href="/signup" className="underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}
