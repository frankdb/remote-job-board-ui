"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const NewsletterSubscription = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log("Subscribing email:", email);
    toast({
      title: "Subscribed!",
      description: "You've successfully subscribed to our newsletter.",
    });
    setEmail("");
  };

  return (
    <div className="bg-background text-foreground py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Subscribe to our newsletter
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Stay updated with the latest job opportunities and career tips.
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-6 sm:flex sm:max-w-md sm:mx-auto"
          >
            <Input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-64"
            />
            <Button
              type="submit"
              className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscription;
