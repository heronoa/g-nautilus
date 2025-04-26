import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"], // ajuste conforme necessário
});

export const metadata: Metadata = {
  title: "G Nautilus",
  description: "Github Clone for Educational Purpose",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${roboto.variable} bg-amber-50 antialiased`}>
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
