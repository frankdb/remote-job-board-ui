"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "../ui/input";
import JobPostCard from "./JobPostCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "../ui/pagination";
import { Job, PaginatedResponse } from "@/types/job";

interface JobListProps {
  initialJobs: PaginatedResponse;
}

const JobList: React.FC<JobListProps> = ({ initialJobs }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobPosts, setJobPosts] = useState<Job[]>(initialJobs.results);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(initialJobs.count / 10)
  );
  const [isLoading, setIsLoading] = useState(false);

  const fetchJobs = async (page: number, search: string = "") => {
    setIsLoading(true);
    try {
      const response = await axios.get<PaginatedResponse>("/api/jobs", {
        params: {
          page,
          search,
        },
      });
      setJobPosts(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 10));
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (searchTerm || currentPage > 1) {
      fetchJobs(currentPage, searchTerm);
    }
  }, [currentPage, searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getPaginationItems = () => {
    const items = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          items.push(i);
        }
        items.push("...");
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          items.push(i);
        }
        items.push("...");
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          items.push(i);
        }
        items.push("...");
      }
    }
    return items;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-[768px] mx-auto mb-8">
        <Input
          type="text"
          placeholder="Search for jobs..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full"
        />
      </div>
      {isLoading ? (
        <div className="text-center">Loading jobs...</div>
      ) : (
        <div className="max-w-[768px] mx-auto space-y-6">
          {jobPosts.map((post) => (
            <JobPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => paginate(currentPage - 1)}
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>
          {getPaginationItems().map((item, index) => (
            <PaginationItem key={index}>
              {item === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() =>
                    typeof item === "number" ? paginate(item) : undefined
                  }
                  isActive={currentPage === item}
                >
                  {item}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => paginate(currentPage + 1)}
              aria-disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default JobList;
