import { notFound } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import JobDetailContent from "@/components/jobs/JobDetailContent";
import axios from "axios";

async function getJobBySlug(slug: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/slug/${slug}/`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching job:", error);
    return null;
  }
}

export default async function JobDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const resolvedParams = await params;
  const job = await getJobBySlug(resolvedParams.slug);

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
