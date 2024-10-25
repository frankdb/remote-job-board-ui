"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import { Switch } from "@/components/ui/switch";
import AuthHeader from "./AuthHeader";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export function RegisterForm() {
  const [isEmployer, setIsEmployer] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({
      ...values,
      userType: isEmployer ? "employer" : "job seeker",
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <AuthHeader />
      <div className="w-full max-w-lg p-8 space-y-6 bg-card rounded-xl border border-primary/20">
        <h1 className="text-2xl font-bold text-center text-foreground mb-8">
          Create an Account
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel className="block text-left mb-1">Email</FormLabel>
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
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="user-type"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {isEmployer ? "Employer" : "Job Seeker"}
                </label>
                <Switch
                  id="user-type"
                  checked={isEmployer}
                  onCheckedChange={setIsEmployer}
                />
              </div>
              <p className="text-xs text-muted-foreground text-left">
                Switch between Job Seeker and Employer to choose your account
                type
              </p>
            </div>
            <Button type="submit" className="w-full">
              Register as {isEmployer ? "Employer" : "Job Seeker"}
            </Button>
          </form>
        </Form>
        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
