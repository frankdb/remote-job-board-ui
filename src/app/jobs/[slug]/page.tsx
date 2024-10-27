import { notFound } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import JobDetailContent from "@/components/jobs/JobDetailContent";

// This is a mock function to simulate fetching job data
const getJobById = (id: string) => {
  const job = mockJobPosts.find((job) => job.id === parseInt(id));
  if (!job) {
    return null;
  }
  return job;
};

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = getJobById(params.id);

  if (!job) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 px-4">
        <JobDetailContent job={job} />
      </div>
    </>
  );
}

// Mock data (you should replace this with actual data fetching)
const mockJobPosts = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    salary: "$120,000 - $160,000",
    type: "Full-time",
    description:
      "We're seeking an experienced React developer to lead our front-end team. You'll be responsible for architecting and implementing complex user interfaces for our enterprise clients.",
    requirements: [
      "5+ years of experience with React",
      "Strong understanding of state management (Redux, MobX, etc.)",
      "Experience with TypeScript",
      "Familiarity with modern front-end build tools",
    ],
    benefits: [
      "Competitive salary",
      "Health, dental, and vision insurance",
      "401(k) matching",
      "Flexible work hours",
      "Remote work options",
    ],
    postedDate: "2024-03-15",
    applicationDeadline: "2024-04-15",
  },
  // Add more mock job posts here...
];
