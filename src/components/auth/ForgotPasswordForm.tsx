/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import AuthHeader from "@/components/auth/AuthHeader";
import { toast } from "@/hooks/use-toast";
import api from "@/services/api";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await api.post("/api/password/reset/", {
        email: values.email,
      });
      setIsSubmitted(true);
      toast({
        title: "Reset link sent",
        description: "Please check your email for password reset instructions.",
      });
    } catch (error: any) {
      console.error(error);
      let errorMessage = "An unexpected error occurred.";
      if (error.response?.status === 404) {
        errorMessage = "No account found with this email address.";
      }
      toast({
        title: "Error",
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
        {isSubmitted ? (
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-foreground">
              Check Your Email
            </h1>
            <p className="text-muted-foreground">
              We&apos;ve sent you instructions to reset your password. Please
              check your email inbox.
            </p>
            <div className="pt-4">
              <Link href="/login" className="text-primary hover:underline">
                Return to Login
              </Link>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-center text-foreground">
              Reset Password
            </h1>
            <p className="text-center text-sm text-muted-foreground">
              Enter your email address and we&apos;ll send you instructions to
              reset your password.
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            </Form>
            <div className="text-center">
              <Link href="/login" className="text-primary hover:underline">
                Back to Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
