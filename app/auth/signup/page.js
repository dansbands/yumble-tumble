'use client'

import { signUp } from "next-auth/react";

export default function SignUp() {
  return (
    <div>
      <h1>Sign Up</h1>
      <button
        onClick={() =>
          signUp("credentials", {
            email: "test@example.com",
            password: "password",
          })
        }
      >
        Sign up with Email
      </button>
    </div>
  );
}
