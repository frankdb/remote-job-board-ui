import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { AuthProviderWrapper } from "@/components/auth/AuthProviderWrapper";
import { Toaster } from "@/components/ui/toaster";
import { GoogleOAuthProvider } from "@react-oauth/google";

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
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <AuthProviderWrapper>
            {children}
            <Toaster />
          </AuthProviderWrapper>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
