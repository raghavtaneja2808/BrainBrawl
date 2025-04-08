import React, { useState } from "react";
import ThemeToggle from "../components/ThemeToggle";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setError("");
      alert("Account created!");

    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] dark:from-[#0a0a0a] dark:to-[#1a1a1a]
      transition-all duration-500 ease-in-out"
    >
   
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="bg-white dark:bg-black p-8 rounded-2xl shadow-2xl max-w-md w-full z-10
        border border-gray-200 dark:border-gray-700 transition-all duration-500 ease-in-out">
        <h2 className="text-3xl font-bold mb-4 text-black dark:text-white transition-all duration-500">Sign Up</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 transition-all duration-500">
          Create your account to get started
        </p>

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-4 rounded-md border text-black dark:text-white dark:bg-gray-800 
              dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400 
              transition-all duration-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
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
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md 
              dark:bg-white dark:text-black dark:hover:bg-gray-200 font-medium 
              transition-all duration-500"
          >
            Create Account
          </button>
        </form>

        <p className="mt-4 text-center text-gray-700 dark:text-gray-400 transition-all duration-500">
          Already have an account?{" "}
          <a href="/login" className="underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
