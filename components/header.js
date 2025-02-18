import React from "react";
import Link from "next/link";
import "styles/header.css";
import { signOut } from "next-auth/react";

const Header = () => {
  return (
    <div className="header">
      <div className="header__left">
        <Link href="/" passHref>
          <div className="title">Header</div>
        </Link>
      </div>
      <div className="header__center">
        <Link href="/signup" passHref>
          <div className="link">Sign Up</div>
        </Link>
        <Link href="/login" passHref>
          <div className="link">Sign In</div>
        </Link>
      </div>
      <div className="header__right">
        <div className="link" onClick={() => signOut()}>
          Log Out
        </div>
      </div>
    </div>
  );
};

export default Header;
