"use client";

import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  console.log('session', session)

  return (
    <div>
      {session ? (
        <>
          <h1>Welcome, {session.user.name}</h1>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <>
          <div>
            <a href="/auth/signin">Sign In</a>
          </div>
          <div>
            <a href="/auth/signup">Sign Up</a>
          </div>
        </>
      )}
    </div>
  );
}
