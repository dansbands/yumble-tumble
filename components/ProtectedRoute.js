"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (!isMounted || status === "loading") return null; // Prevents hydration issues

  return session ? children : null;
};

export default ProtectedRoute;
