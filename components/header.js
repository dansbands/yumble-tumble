"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import "styles/header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const session = useSession();

  const MenuContent = ({ isDrawer }) => (
    <>
      {session?.data ? (
        <>
          <Link href="/dashboard" passHref>
            <div className={isDrawer ? "drawer-link" : "link"}>Dashboard</div>
          </Link>
          <Link href="/profile" passHref>
            <div className={isDrawer ? "drawer-link" : "link"}>Profile</div>
          </Link>
          <div
            className={isDrawer ? "drawer-link" : "link"}
            onClick={() => signOut()}
          >
            Log Out
          </div>
          <button
            className={isDrawer ? "drawer-link" : "link"}
            onClick={toggleDarkMode}
          >
            {isDrawer
              ? darkMode
                ? "🌙 Dark Mode"
                : "☀️ Light Mode"
              : darkMode
              ? "🌙"
              : "☀️"}
          </button>
        </>
      ) : (
        <>
          <Link href="/signup" passHref>
            <div className={isDrawer ? "drawer-link" : "link"}>Sign Up</div>
          </Link>
          <Link href="/login" passHref>
            <div className={isDrawer ? "drawer-link" : "link"}>Sign In</div>
          </Link>
        </>
      )}
    </>
  );

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
        <MenuContent />
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
        <MenuContent isDrawer />
      </div>
    </header>
  );
};

export default Header;
