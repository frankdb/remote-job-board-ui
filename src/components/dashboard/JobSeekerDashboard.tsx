"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ApplicationListingTableCard from "./ApplicationListingTableCard";
import { ApplicationsResponse } from "@/types/application";
import api from "@/services/api";

const JobSeekerDashboard = () => {
  const [applications, setApplications] = useState<ApplicationsResponse>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get("/api/job-seeker/applications/");
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Recent Applications</h2>
        <Link href="/jobs">
          <Button>Browse Jobs</Button>
        </Link>
      </div>
      <ApplicationListingTableCard
        applications={applications.results}
        isLoading={isLoading}
      />
    </div>
  );
};

export default JobSeekerDashboard;
