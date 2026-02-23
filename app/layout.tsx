import type { Metadata } from "next";
import { Oswald, Outfit } from 'next/font/google';
import "./globals.css";

const heading = Oswald({ subsets: ['latin'], variable: '--font-heading' });
const body = Outfit({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  title: "The 21st Accessories | Jewelries = MOOD ✨",
  description: "Trendy jewelries, sunglasses, scarfs, and bags in Lagos. Street-Luxe styles at the best prices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${heading.variable} ${body.variable} font-body antialiased text-white`}>
        {children}
      </body>
    </html>
  );
}