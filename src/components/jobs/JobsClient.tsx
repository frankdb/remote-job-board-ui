"use client";

import {
  useState,
  useEffect,
  useCallback,
  Fragment,
  useTransition,
} from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import JobPostCard from "@/components/jobs/JobPostCard";
import { JobsLoadingSkeleton } from "@/components/jobs/JobsLoadingSkeleton";
import { Job, JobsResponse, FilterParams } from "@/types/job";

interface JobsClientProps {
  initialData: JobsResponse;
  initialParams: { [key: string]: string };
}

export default function JobsClient({ initialData }: JobsClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [jobs, setJobs] = useState<Job[]>(initialData.results);
  const [totalCount, setTotalCount] = useState(initialData.count);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [filters, setFilters] = useState<FilterParams>({
    employment_type: searchParams.get("employment_type") || "",
  });
  const currentPage = parseInt(searchParams.get("page") || "1");
  const pageSize = 10;
  const totalPages = Math.ceil(totalCount / pageSize);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs?${searchParams.toString()}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data: JobsResponse = await response.json();
      setJobs(data.results);
      setTotalCount(data.count);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  const updateUrl = useCallback(
    (newParams: Record<string, string>) => {
      startTransition(() => {
        const params = new URLSearchParams(searchParams);
        Object.entries(newParams).forEach(([key, value]) => {
          if (value && value !== "all") {
            params.set(key, value);
          } else {
            params.delete(key);
          }
        });
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [pathname, router, searchParams]
  );

  const handleSearch = () => {
    updateUrl({ page: "1", search: searchTerm });
  };

  const handleFilterChange = (name: keyof FilterParams, value: string) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    updateUrl({ page: "1", [name]: value });
  };

  const handlePageChange = (newPage: number) => {
    updateUrl({ page: newPage.toString() });
  };

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          {/* Search Section */}
          <div className="flex gap-4 mb-6">
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search jobs..."
              className="flex-1"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button
              onClick={handleSearch}
              disabled={isPending}
              variant="default"
            >
              Search
            </Button>
          </div>

          <Separator className="my-4" />

          {/* Filters Section */}
          <div className="grid grid-cols-1 gap-4">
            <Select
              value={filters.employment_type}
              onValueChange={(value) =>
                handleFilterChange("employment_type", value)
              }
              disabled={isPending}
            >
              <SelectTrigger>
                <SelectValue placeholder="Employment Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="FT">Full Time</SelectItem>
                <SelectItem value="PT">Part Time</SelectItem>
                <SelectItem value="CT">Contract</SelectItem>
                <SelectItem value="IN">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Jobs List */}
      <div className="space-y-4 mt-6">
        {loading || isPending ? (
          <JobsLoadingSkeleton />
        ) : jobs.length > 0 ? (
          jobs.map((job) => <JobPostCard key={job.id} post={job} />)
        ) : (
          <Card className="p-6">
            <p className="text-center text-muted-foreground">
              No jobs found matching your criteria
            </p>
          </Card>
        )}
      </div>

      {/* Pagination */}
      {totalCount > 0 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isPending}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              return (
                page === 1 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 2
              );
            })
            .map((page, index, array) => {
              if (index > 0 && page - array[index - 1] > 1) {
                return (
                  <Fragment key={`ellipsis-${page}`}>
                    <span className="px-2">...</span>
                    <Button
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => handlePageChange(page)}
                      disabled={isPending}
                    >
                      {page}
                    </Button>
                  </Fragment>
                );
              }
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => handlePageChange(page)}
                  disabled={isPending}
                >
                  {page}
                </Button>
              );
            })}
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isPending}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
}
