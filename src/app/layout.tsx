import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { AuthProviderWrapper } from "@/components/auth/AuthProviderWrapper";
import { Toaster } from "@/components/ui/toaster";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hirepod",
  description: "Remote job board for Filipino workers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <AuthProviderWrapper>
          {children}
          <Toaster />
        </AuthProviderWrapper>
      </body>
    </html>
  );
}
