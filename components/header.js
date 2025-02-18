"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import "styles/header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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

      {/* Mobile Menu Button */}
      <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {/* Backdrop (Closes Drawer on Click) */}
      <div
        className={`backdrop ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Mobile Drawer */}
      <div className={`drawer ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setIsOpen(false)}>
          ×
        </button>
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
