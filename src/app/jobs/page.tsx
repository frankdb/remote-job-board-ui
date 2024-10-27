import JobList from "@/components/jobs/JobList";
import Navbar from "@/components/shared/Navbar";
import axios from "axios";

async function getJobs(page = 1, search = "") {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/jobs`,
    {
      params: { page, search },
    }
  );
  return response.data;
}

export default async function JobsPage() {
  const initialJobs = await getJobs();

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>
        <JobList initialJobs={initialJobs} />
      </div>
    </>
  );
}
