"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import JobPostCard from "./JobPostCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

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
  },
  {
    id: 2,
    title: "Data Scientist",
    company: "AI Innovations Inc.",
    location: "New York, NY",
    salary: "$100,000 - $140,000",
    type: "Full-time",
    description:
      "Join our cutting-edge AI team to develop machine learning models for predictive analytics. Strong background in statistics and Python required.",
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "Creative Designs Co.",
    location: "Remote",
    salary: "$80,000 - $120,000",
    type: "Contract",
    description:
      "We're looking for a talented UX/UI designer to create intuitive and visually appealing interfaces for our mobile apps. Experience with Figma and user research is a plus.",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudScale Technologies",
    location: "Seattle, WA",
    salary: "$110,000 - $150,000",
    type: "Full-time",
    description:
      "Help us build and maintain our cloud infrastructure. Experience with AWS, Docker, and Kubernetes is required. You'll be working on scaling our systems to handle millions of users.",
  },
  {
    id: 5,
    title: "Product Manager",
    company: "InnovateTech",
    location: "Austin, TX",
    salary: "$90,000 - $130,000",
    type: "Full-time",
    description:
      "Lead the development of our flagship SaaS product. You'll work closely with engineering, design, and marketing teams to define and execute the product roadmap.",
  },
  // Add more job posts to reach at least 20 total
];

const JobList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Filter job posts based on search term
  const filteredPosts = mockJobPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-[768px] mx-auto mb-8">
        <Input
          type="text"
          placeholder="Search for jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="max-w-[768px] mx-auto space-y-6">
        {currentPosts.map((post) => (
          <JobPostCard key={post.id} post={post} />
        ))}
      </div>
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => paginate(currentPage - 1)}
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>
          {Array.from(
            { length: Math.ceil(filteredPosts.length / postsPerPage) },
            (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => paginate(i + 1)}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationNext
              onClick={() => paginate(currentPage + 1)}
              aria-disabled={
                currentPage === Math.ceil(filteredPosts.length / postsPerPage)
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default JobList;
