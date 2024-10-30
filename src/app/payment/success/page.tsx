"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      router.push("/dashboard");
    }
  }, [sessionId, router]);

  return (
    <div className="container max-w-lg mx-auto px-4 py-16">
      <Card className="p-6">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold">Payment Successful!</h1>
          <p className="text-muted-foreground">
            Your job post has been published successfully. It will be visible on
            the job board shortly.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => router.push("/dashboard")}>
              Go to Dashboard
            </Button>
            <Button variant="outline" onClick={() => router.push("/jobs")}>
              View Job Board
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
