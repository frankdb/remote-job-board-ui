/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AuthHeader from "@/components/auth/AuthHeader";
import { register } from "@/services/api";
import { toast } from "@/hooks/use-toast";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await register(values.email, values.password);
      toast({
        title: "Registration successful",
        description:
          "Your account has been created successfully. Please log in.",
      });
      setRegistrationSuccess(true);
    } catch (error: any) {
      let errorMessage = "An unexpected error occurred during registration.";
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = "Invalid input. Please check your email and password.";
        } else if (error.response.status === 409) {
          errorMessage = "An account with this email already exists.";
        } else if (error.response.status === 500) {
          errorMessage = "Server error. Please try again later.";
        }
      } else if (error.request) {
        errorMessage =
          "No response from server. Please check your internet connection.";
      }
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <AuthHeader />
      <div className="w-full max-w-lg p-8 space-y-6 bg-card rounded-xl border border-primary/20">
        {registrationSuccess ? (
          <div className="text-center">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Registration Successful!
            </h1>
            <p className="text-muted-foreground mb-6">
              Your account has been created successfully. Please log in to
              access your account.
            </p>
            <Link href="/login" className="text-primary hover:underline">
              Go to Login Page
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-center text-foreground mb-8">
              Create an Account
            </h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="text-left">
                      <FormLabel className="block text-left mb-1">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormDescription className="text-xs mt-1">
                        We&apos;ll never share your email with anyone else.
                      </FormDescription>
                      <FormMessage className="text-xs mt-1" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="text-left">
                      <FormLabel className="block text-left mb-1">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormDescription className="text-xs mt-1">
                        Your password must be at least 8 characters long.
                      </FormDescription>
                      <FormMessage className="text-xs mt-1" />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Registering..." : "Create Account"}
                </Button>
              </form>
            </Form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <GoogleSignInButton isRegister />

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
