import { Geist, Geist_Mono } from "next/font/google";
import Context from "./context.jsx";
import { Cart, Navigation } from "@/lib/components";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

function Topbar(props, children) {
  return (
    <div className="bg-[#ff5615] md:bg-[#ffffff] py-2 flex md:gap-6 text-sm md:text-sm justify-center text-black relative h-[30px] md:h-[36px] items-center">
      <span className="absolute lg:relative animate-fade1 lg:animate-none">
        ✓ Shipped within 24 hours
      </span>
      <span className="absolute lg:relative animate-fade2 lg:animate-none">
        ✓ Free samples with every order
      </span>
      <span className="absolute lg:relative animate-fade3 lg:animate-none">
        ✓ Free shipping from €50
      </span>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Topbar />
        <div className="container mx-auto">
          <Context>
            <Navigation />
            {children}
            <Cart />
          </Context>
        </div>
      </body>
    </html>
  );
}
