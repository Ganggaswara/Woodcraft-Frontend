import type { Metadata } from "next";
import { Montserrat, Geist_Mono } from "next/font/google";
import "./globals.css";
import RootProviders from "./providers/RootProviders";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Woodcraft Bali",
  description: "Eksplor furnitur kayu berkualitas dengan desain timeless dan finishing hangat.",
    icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${geistMono.variable} font-sans antialiased`}>
        <RootProviders>
          {children}
        </RootProviders>
      </body>
    </html>
  );
}
