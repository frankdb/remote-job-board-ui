"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import UserInformationTab from "@/components/account/UserInformationTab";
import SecurityTab from "@/components/account/SecurityTab";
import PaymentsTab from "@/components/account/PaymentsTab";

export default function AccountContent() {
  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="user-info" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="user-info">User Information</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="user-info">
          <Card className="p-6">
            <UserInformationTab />
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="p-6">
            <SecurityTab />
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card className="p-6">
            <PaymentsTab />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
