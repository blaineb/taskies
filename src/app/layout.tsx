import React from 'react';
import { StateProvider } from '@/context/StateProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StateProvider>
            {children}
          </StateProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
