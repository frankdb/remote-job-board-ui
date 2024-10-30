"use client";

/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  MapPinIcon,
  BriefcaseIcon,
  Banknote,
} from "lucide-react";
import { formatPostedDate } from "@/utils/date";
import { formatEmploymentType } from "@/utils/misc";
import { Job } from "@/types/job";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ApplicationForm } from "./ApplicationForm";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface JobDetailContentProps {
  job: Job;
  preview?: boolean;
}

const JobDetailContent: React.FC<JobDetailContentProps> = ({
  job,
  preview = false,
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const handleApply = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to apply for this job.",
        variant: "destructive",
      });
      router.push("/login");
      return;
    }

    if (job.application_url) {
      window.open(job.application_url, "_blank");
    } else {
      setShowApplicationForm(true);
    }
  };

  const handleApplicationSuccess = () => {
    router.refresh();
  };

  const showApplyButton = !preview && (!user || user.user_type === "JS");

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-6">
              <div className="flex-shrink-0">
                {job.logo_url ? (
                  <img
                    src={job.logo_url}
                    alt={`${job.company_name} logo`}
                    className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                  />
                ) : (
                  <span className="bg-primary/10 text-primary rounded-full w-24 h-24 flex items-center justify-center text-3xl font-bold">
                    {job.company_name.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <CardTitle className="text-3xl font-bold mb-2">
                  {job.title}
                </CardTitle>
                <p className="text-xl text-muted-foreground mb-4">
                  {job.company_name}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <MapPinIcon size={16} /> {job.location}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <BriefcaseIcon size={16} />{" "}
                    {formatEmploymentType(job.employment_type)}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Banknote size={16} /> {job.salary}
                  </Badge>
                </div>
              </div>
            </div>
            {showApplyButton && (
              <Button size="lg" onClick={handleApply}>
                Apply Now
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-2">Job Description</h2>
              <p>{job.description}</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-2">Requirements</h2>
              <ul className="list-disc pl-5 space-y-1">{job.requirements}</ul>
            </section>
            <section className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CalendarIcon size={16} />
                <span>{formatPostedDate(job.posted_date)}</span>
              </div>
              {/* <div className="flex items-center gap-2">
                <CalendarIcon size={16} />
                <span>
                  Apply by:{" "}
                  {new Date(job.applicationDeadline).toLocaleDateString()}
                </span>
              </div> */}
            </section>
          </div>
        </CardContent>
      </Card>

      <ApplicationForm
        jobId={job.id}
        isOpen={showApplicationForm}
        onClose={() => setShowApplicationForm(false)}
        onSuccess={handleApplicationSuccess}
      />
    </div>
  );
};

export default JobDetailContent;
