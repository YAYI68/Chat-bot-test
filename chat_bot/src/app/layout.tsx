import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider, ReactToaster } from "@/lib/components";
import { ChatManagerWrapper } from "./context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat Bot",
  description: "Chat bot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ChatManagerWrapper>
      <ReactQueryProvider>
        <ReactToaster />
        {children}
        </ReactQueryProvider>
        </ChatManagerWrapper>
        </body>
    </html>
  );
}
