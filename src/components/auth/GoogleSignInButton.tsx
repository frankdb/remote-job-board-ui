"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

interface GoogleSignInButtonProps {
  isRegister?: boolean;
}

export function GoogleSignInButton({
  isRegister = false,
}: GoogleSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      // Replace this URL with your actual Google OAuth endpoint
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/`;
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast({
        title: "Error",
        description: "Failed to initialize Google sign-in.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      type="button"
      disabled={isLoading}
      className="w-full"
      onClick={handleGoogleSignIn}
    >
      <FcGoogle className="mr-2 h-4 w-4" />
      {isLoading
        ? "Loading..."
        : isRegister
        ? "Sign up with Google"
        : "Sign in with Google"}
    </Button>
  );
}
