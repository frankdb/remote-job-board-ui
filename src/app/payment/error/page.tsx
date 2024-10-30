"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

export default function PaymentErrorPage() {
  const router = useRouter();

  return (
    <div className="container max-w-lg mx-auto px-4 py-16">
      <Card className="p-6">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <XCircle className="w-16 h-16 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold">Payment Failed</h1>
          <p className="text-muted-foreground">
            Something went wrong with your payment. Please try again or contact
            support if the problem persists.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => router.back()}>Try Again</Button>
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              Go to Dashboard
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
