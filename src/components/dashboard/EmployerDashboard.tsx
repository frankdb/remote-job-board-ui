import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PostedJobsTable from "@/components/dashboard/PostedJobsTable";

interface Job {
  id: number;
  title: string;
  datePosted: string;
  status: string;
}

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch posted jobs data
    // For now, we'll use mock data
    const mockJobs = [
      {
        id: 1,
        title: "Senior Frontend Developer",
        datePosted: "2024-03-01",
        status: "Active",
      },
      {
        id: 2,
        title: "UX/UI Designer",
        datePosted: "2024-02-28",
        status: "Closed",
      },
    ];

    setJobs(mockJobs);
    setIsLoading(false);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Posted Jobs</h2>
        <Link href="/post-job">
          <Button>Post a Job</Button>
        </Link>
      </div>
      <PostedJobsTable jobs={jobs} isLoading={isLoading} />
    </div>
  );
};

export default EmployerDashboard;
