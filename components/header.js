"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import "styles/header.css";
import MenuContent from "./MenuContent";
import { useTheme } from "@/context/theme";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  // Close the menu when Esc is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        console.log("e.key", e.key);
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Load dark mode from localStorage
  useEffect(() => {
    const storedMode = localStorage.getItem("darkMode");
    if (storedMode === "true") {
      document.documentElement.classList.add("dark-mode");
      toggleDarkMode();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Toggle dark mode
  const switchDarkMode = () => {
    const newMode = !darkMode;
    toggleDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    document.documentElement.classList.toggle("dark-mode", newMode);
  };

  return (
    <header className="header">
      {/* Left Section */}
      <div className="header__left">
        <Link href="/" passHref>
          <div className="title">Header</div>
        </Link>
      </div>

      {/* Center & Right - Desktop */}
      <nav className="header__center">
        <MenuContent darkMode={darkMode} toggleDarkMode={switchDarkMode} />
      </nav>

      {/* Animated Hamburger Button */}
      <button
        className={`menu-btn ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={`bar-container ${isOpen ? "open" : ""}`}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </button>

      {/* Backdrop (Closes Drawer on Click) */}
      <div
        className={`backdrop ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Mobile Drawer */}
      <div className={`drawer ${isOpen ? "open" : ""}`}>
        <MenuContent
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          isDrawer
        />
      </div>
    </header>
  );
};

export default Header;
