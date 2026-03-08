import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Anthony Baker | Frontend Developer",
  description:
    "Frontend developer specializing in React and Next.js applications.",
  openGraph: {
    title: "Anthony Baker | Frontend Developer",
    description:
      "Frontend developer specializing in React and Next.js applications.",
    url: "https://anthony-baker-portfolio.vercel.app",
    siteName: "Anthony Baker Portfolio",
    images: [
      {
        url: "https://anthony-baker-portfolio.vercel.app/images/metaData/og-image.png",
        width: 1200,
        height: 630,
        alt: "Anthony Baker Portfolio Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anthony Baker | Frontend Developer",
    description:
      "Frontend developer specializing in React and Next.js applications.",
    images: [
      "https://anthony-baker-portfolio.vercel.app/images/metaData/og-image.png",
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navigation />
        <main className="mainContent">{children}</main>
      </body>
    </html>
  );
}
