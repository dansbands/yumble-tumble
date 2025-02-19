"use client";

import "styles/globals.css";
import Header from "components/header";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/context/theme";

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <html lang="en">
          <body>
            <Header />
            {children}
          </body>
        </html>
      </ThemeProvider>
    </SessionProvider>
  );
}
