"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) setTheme(stored);
    document.documentElement.setAttribute("data-theme", stored || "light");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  return (
    <button
      className="btn btn-outline btn-sm"
      onClick={toggleTheme}
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}