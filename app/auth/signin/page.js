"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function SignInPage() {
  const { data: session } = useSession();
  console.log("session", session);
  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {session ? (
        <>
          <p>Signed in as {session.user.email}</p>
          <button
            className="px-4 py-2 bg-red-500 text-white"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <p>You are not signed in.</p>
          <button
            className="px-4 py-2 bg-blue-500 text-white"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        </>
      )}
    </div>
  );
}
