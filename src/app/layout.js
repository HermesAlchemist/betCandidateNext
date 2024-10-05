// src/app/layout.js
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import localFont from "next/font/local";
import "./globals.css"; // Seu CSS personalizado

import AuthWrapper from '@/components/AuthWrapper'; // Importe o AuthWrapper

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "BetCandidate",
  description: "Apostas on-chain nas eleições americanas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head />
      <body>
        <AuthWrapper>
          {children}
        </AuthWrapper>
      </body>
    </html>
  );
}
