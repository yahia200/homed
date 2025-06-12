import type { Metadata } from "next";
import { Funnel_Display } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/Navbar";

const funnel = Funnel_Display({
  variable: "--font-funnel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Homed",
  description: "An app to help care for your loved ones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${funnel.variable} antialiased`}
      >
				<Navbar />
				<Toaster />
        {children}
      </body>
    </html>
  );
}
