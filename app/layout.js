"use client";

import "styles/globals.css";
import Header from "components/header";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
          <Header />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
