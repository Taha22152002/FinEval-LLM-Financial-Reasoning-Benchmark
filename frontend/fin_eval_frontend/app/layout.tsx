import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "./normalize.css";
import Header from "@/components/Header";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "FinEval: LLM evaluation for Financial Reasoning",
  description:
    "Judge Model (Gemini-2.5-PRO) evaluates accuracy and reasoning quality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className={`${poppins.variable} antialiased p-4 md:p-8`}>
        <Header />
        <main id="app" className="flex flex-col lg:flex-row gap-6">
          {children}
        </main>
      </body>
    </html>
  );
}
