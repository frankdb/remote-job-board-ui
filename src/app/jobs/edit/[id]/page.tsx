import { notFound } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import EditJobForm from "@/components/jobs/EditJobForm";

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

export default async function EditJobPage({
  params,
}: {
  params: { id: string };
}) {
  const job = await getJob(params.id);

  if (!job) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Edit Job Post</h1>
        <EditJobForm job={job} />
      </div>
    </>
  );
}
