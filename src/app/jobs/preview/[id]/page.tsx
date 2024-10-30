import { notFound } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import JobPreview from "@/components/jobs/JobPreview";

async function getJob(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}/`,
      { next: { revalidate: 0 } }
    );
    if (!response.ok) throw new Error("Failed to fetch job");
    return response.json();
  } catch (error) {
    console.error("Error fetching job:", error);
    return null;
  }
}

export default async function JobPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const job = await getJob(resolvedParams.id);

  if (!job) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Preview Job Post</h1>
        <JobPreview job={job} />
      </div>
    </>
  );
}