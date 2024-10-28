"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PaymentsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Payment Methods</h2>
        <p className="text-sm text-muted-foreground">
          Manage your payment methods and billing information
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Payment Method</CardTitle>
          <CardDescription>Add a new credit or debit card</CardDescription>
        </CardHeader>
        <CardContent>Payments placeholder...</CardContent>
      </Card>
    </div>
  );
}
