import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-xl bg-gray-800 text-white dark:bg-white dark:text-black 
        shadow-lg transition-all duration-500 ease-in-out"
    >
      Toggle Theme
    </button>
  );
}
