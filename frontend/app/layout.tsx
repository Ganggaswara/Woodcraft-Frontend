import type { Metadata } from "next";
import Script from "next/script";
import { Montserrat, Geist_Mono } from "next/font/google";
import "./globals.css";
import RootProviders from "./providers/RootProviders";
import GAProvider from "./providers/GAProvider";

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
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}',{page_path:window.location.pathname});`}
            </Script>
          </>
        ) : null}
        <RootProviders>
          <GAProvider />
          {children}
        </RootProviders>
      </body>
    </html>
  );
}
