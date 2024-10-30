"use client";

import { Button } from "@/components/ui/button";
import { Job } from "@/types/job";
import JobDetailContent from "@/components/jobs/JobDetailContent";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { createCheckoutSession } from "@/services/stripe";
import { useAuth } from "@/contexts/AuthContext";

interface JobPreviewProps {
  job: Job;
}

export default function JobPreview({ job }: JobPreviewProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleEdit = () => {
    router.push(`/jobs/edit/${job.id}`);
  };

  const handlePublish = async () => {
    setIsLoading(true);
    try {
      if (!user) {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
        throw new Error("Cannot publish job without user");
      }
      const checkoutUrl = await createCheckoutSession(job.id, user.id);
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              This is a preview of your job post. Please review the details
              before publishing.
            </p>
          </div>
        </div>
      </div>

      <JobDetailContent job={job} preview={true} />

      <div className="flex justify-end space-x-4 mt-6">
        <Button variant="outline" onClick={handleEdit} disabled={isLoading}>
          Edit Post
        </Button>
        <Button onClick={handlePublish} disabled={isLoading}>
          {isLoading ? "Processing..." : "Publish Job ($99)"}
        </Button>
      </div>
    </div>
  );
}
