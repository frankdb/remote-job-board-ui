import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  MapPinIcon,
  BriefcaseIcon,
  CurrencyIcon,
} from "lucide-react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  applicationDeadline: string;
}

interface JobDetailContentProps {
  job: Job;
}

const JobDetailContent: React.FC<JobDetailContentProps> = ({ job }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold mb-2">
                {job.title}
              </CardTitle>
              <p className="text-xl text-muted-foreground mb-4">
                {job.company}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <MapPinIcon size={16} /> {job.location}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <BriefcaseIcon size={16} /> {job.type}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <CurrencyIcon size={16} /> {job.salary}
                </Badge>
              </div>
            </div>
            <Button size="lg">Apply Now</Button>
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
              <ul className="list-disc pl-5 space-y-1">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-2">Benefits</h2>
              <ul className="list-disc pl-5 space-y-1">
                {job.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </section>
            <section className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CalendarIcon size={16} />
                <span>
                  Posted: {new Date(job.postedDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon size={16} />
                <span>
                  Apply by:{" "}
                  {new Date(job.applicationDeadline).toLocaleDateString()}
                </span>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobDetailContent;
