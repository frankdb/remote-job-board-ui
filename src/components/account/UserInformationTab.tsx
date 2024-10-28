"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function UserInformationTab() {
  const { user } = useAuth();

  const getEmploymentType = (type: string) => {
    switch (type) {
      case "JS":
        return "Job Seeker";
      case "EM":
        return "Employer";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Account Information</h2>
        <p className="text-sm text-muted-foreground">
          Your basic account details
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Email
          </label>
          <p className="mt-1">{user?.email}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Account Type
          </label>
          <p className="mt-1">
            {getEmploymentType(user?.user_type || "User account type not set")}
          </p>
        </div>
      </div>
    </div>
  );
}
