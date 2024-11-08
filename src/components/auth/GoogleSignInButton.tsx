"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

interface GoogleSignInButtonProps {
  isRegister?: boolean;
}

export function GoogleSignInButton({
  isRegister = false,
}: GoogleSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { handleGoogleSuccess } = useAuth();
  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        await handleGoogleSuccess(tokenResponse);
        toast({
          title: "Success",
          description: isRegister
            ? "Account created successfully"
            : "Signed in successfully",
        });
        router.push("/dashboard");
      } catch (error) {
        console.error("Google sign-in error:", error);
        toast({
          title: "Error",
          description: "Failed to sign in with Google.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to initialize Google sign-in.",
        variant: "destructive",
      });
    },
  });

  return (
    <Button
      variant="outline"
      type="button"
      disabled={isLoading}
      className="w-full"
      onClick={() => login()}
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
