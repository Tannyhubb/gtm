import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import NoiseOverlay from "@/components/NoiseOverlay";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Instrument Serif isn't available in next/font/google, so we load it via a local fallback
// and inject the Google Fonts link in <head>
const instrumentSerif = localFont({
  src: [
    {
      path: "./fonts/InstrumentSerif-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/InstrumentSerif-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "buildyour.company",
  description:
    "We architect go-to-market strategies that turn ambitious products into market leaders. Strategy, positioning, demand generation, and revenue operations.",
  openGraph: {
    title: "buildyour.company",
    description:
      "We architect go-to-market strategies that turn ambitious products into market leaders.",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body className="antialiased bg-bg text-fg">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <SmoothScroll>
            <NoiseOverlay />
            <CustomCursor />
            <ThemeSwitcher />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
