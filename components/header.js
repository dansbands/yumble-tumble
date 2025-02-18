"use client";

import React from "react";
import Link from "next/link";
import "styles/header.css";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const session = useSession();

  return (
    <div className="header">
      <div className="header__left">
        <Link href="/" passHref>
          <div className="title">Header</div>
        </Link>
      </div>
      <div className="header__center">
        {session?.data ? (
          <>
            <Link href="/dashboard" passHref>
              <div className="link">Dashboard</div>
            </Link>
            <Link href="/profile" passHref>
              <div className="link">Profile</div>
            </Link>
          </>
        ) : (
          <>
            <Link href="/signup" passHref>
              <div className="link">Sign Up</div>
            </Link>
            <Link href="/login" passHref>
              <div className="link">Sign In</div>
            </Link>
          </>
        )}
      </div>
      <div className="header__right">
        {session?.data && (
          <div className="link" onClick={() => signOut()}>
            Log Out
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
