"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RecentApplicationsTable from "./RecentApplicationsTable";

interface Application {
  id: number;
  jobTitle: string;
  company: string;
  dateApplied: string;
  status: string;
}

const JobSeekerDashboard = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch recent applications data
    // For now, we'll use mock data
    const mockApplications = [
      {
        id: 1,
        jobTitle: "Frontend Developer",
        company: "TechCorp",
        dateApplied: "2024-03-15",
        status: "Pending",
      },
      {
        id: 2,
        jobTitle: "UX Designer",
        company: "DesignHub",
        dateApplied: "2024-03-10",
        status: "Reviewed",
      },
    ];

    setApplications(mockApplications);
    setIsLoading(false);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Recent Applications</h2>
        <Link href="/jobs">
          <Button>Browse Jobs</Button>
        </Link>
      </div>
      <RecentApplicationsTable
        applications={applications}
        isLoading={isLoading}
      />
    </div>
  );
};

export default JobSeekerDashboard;
