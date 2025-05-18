import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


const sourceSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});


export const metadata: Metadata = {
  title: "TextTube — Summarize & Converse with Any YouTube Video Using AI",
  description:
    "Transform any YouTube video into a concise summary and engage in intelligent, AI-powered conversations for deeper understanding.",
  icons: {
    icon: "/favicon.png", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sourceSans.variable} font-sans antialiased`}>
        <Navbar />
        {children}
        <SpeedInsights />
        <div className="">
          <Footer />
        </div>
      </body>
    </html>
  );
}
