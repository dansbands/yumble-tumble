"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import "styles/header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Close the menu when Esc is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        console.log('e.key', e.key)
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
      setDarkMode(true);
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
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
        <Link href="/signup" passHref>
          <div className="link">Sign Up</div>
        </Link>
        <Link href="/login" passHref>
          <div className="link">Sign In</div>
        </Link>
        <div className="link" onClick={() => signOut()}>
          Log Out
        </div>
        <button className="link" onClick={toggleDarkMode}>
          {darkMode ? "🌙" : "☀️"}
        </button>
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
        <Link href="/signup" passHref>
          <div className="drawer-link">Sign Up</div>
        </Link>
        <Link href="/login" passHref>
          <div className="drawer-link">Sign In</div>
        </Link>
        <div className="drawer-link" onClick={() => signOut()}>
          Log Out
        </div>
        <div className="drawer-link" onClick={toggleDarkMode}>
          {darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </div>
      </div>
    </header>
  );
};

export default Header;
