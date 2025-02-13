"use client";

import "../styles/page.module.css";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const session = useSession();
  console.log("session", session);

  return (
    <div>
      {session?.data ? (
        <div>I am your new app!!!</div>
      ) : (
        <>
          <h3>You are not Logged In</h3>
          <Link href="/signup" passHref>
            <div className="link">Sign Up</div>
          </Link>
          <Link href="/login" passHref>
            <div className="link">Sign In</div>
          </Link>
        </>
      )}
    </div>
  );
}
