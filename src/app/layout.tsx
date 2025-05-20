import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

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
      <head>
      
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-9GE1FVQ2SS"
  strategy="afterInteractive"
/>
<Script id="gtag-init" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-9GE1FVQ2SS');
  `}
</Script>
        <meta
          name="google-site-verification"
          content="VNNPnKBIk5AEDRp1imx_OtP_SABAXSTQKTGMemzdT0E"
        />
      </head>
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
