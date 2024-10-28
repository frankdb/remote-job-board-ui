import { Suspense } from "react";
import JobsClient from "@/components/jobs/JobsClient";
import { JobsLoadingSkeleton } from "@/components/jobs/JobsLoadingSkeleton";
import { JobsResponse } from "@/types/job";
import Navbar from "@/components/shared/Navbar";

async function getJobs(searchParams: {
  [key: string]: string | string[];
}): Promise<JobsResponse> {
  // Ensure we're working with resolved params
  const resolvedParams = await Promise.resolve(searchParams);
  const params = new URLSearchParams();

  // Handle each param properly
  Object.entries(resolvedParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else {
      params.append(key, value);
    }
  });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/jobs?${params.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return { count: 0, results: [], next: null, previous: null };
  }
}

export default async function JobsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // Ensure searchParams is an object and await it
  const params = await Promise.resolve(searchParams ?? {});

  // Convert undefined values to empty strings and arrays to comma-separated strings
  const sanitizedParams = Object.fromEntries(
    Object.entries(params).map(([key, value]) => [
      key,
      Array.isArray(value) ? value.join(",") : value ?? "",
    ])
  );

  const initialData = await getJobs(sanitizedParams);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Suspense fallback={<JobsLoadingSkeleton />}>
          <JobsClient
            initialData={initialData}
            initialParams={sanitizedParams}
          />
        </Suspense>
      </div>
    </>
  );
}
