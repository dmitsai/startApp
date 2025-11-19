"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme =
      (localStorage.getItem("theme") as "light" | "dark") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className={'flex'}>
      <button
        type="button"
        onClick={toggleTheme}
        className="group relative rounded-lg bg-primary px-6 py-3 text-white shadow-md transition-all duration-300 hover:bg-primary-hover hover:shadow-lg active:bg-primary-active"
        aria-label="Переключить тему"
      >
        <span className="flex items-center gap-2">
          {theme === "light" ? "🌙" : "☀️"}
          <span className="font-medium">
            {theme === "light" ? "Темная тема" : "Светлая тема"}
          </span>
        </span>
      </button>
    </div>
  );
}
