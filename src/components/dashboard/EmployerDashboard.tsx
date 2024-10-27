import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PostedJobsTable from "@/components/dashboard/PostedJobsTable";
import { Job } from "@/types/job";
import api from "@/services/api";

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/employer/`
        );
        const jobsWithStatus = response.data.results;
        setJobs(jobsWithStatus);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
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
