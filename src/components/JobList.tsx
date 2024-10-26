"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
}

const JobList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // In a real application, you would fetch jobs from an API here
    const mockJobs: Job[] = [
      {
        id: 1,
        title: "Frontend Developer",
        company: "TechCorp",
        location: "Remote",
        description: "We're looking for an experienced Frontend Developer...",
      },
      {
        id: 2,
        title: "Backend Engineer",
        company: "DataSystems",
        location: "Manila, Philippines",
        description: "Join our team as a Backend Engineer to build scalable...",
      },
      // Add more mock jobs as needed
    ];

    setJobs(mockJobs);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <Card key={job.id}>
          <CardHeader>
            <CardTitle>{job.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">{job.company}</p>
            <p className="text-sm text-muted-foreground">{job.location}</p>
            <p className="mt-2">{job.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JobList;
