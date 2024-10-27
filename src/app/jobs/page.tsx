import JobList from "@/components/jobs/JobList";
import Navbar from "@/components/shared/Navbar";

export default function JobsPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>
        <JobList />
      </div>
    </>
  );
}
