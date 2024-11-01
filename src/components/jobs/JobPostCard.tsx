/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  MapPinIcon,
  BriefcaseIcon,
  Banknote,
  ArrowRightIcon,
} from "lucide-react";
import { formatPostedDate } from "@/utils/date";
import { formatEmploymentType } from "@/utils/misc";
import { Job } from "@/types/job";

const JobPostCard: React.FC<{ post: Job }> = ({ post }) => {
  return (
    <Link href={`/jobs/${post.slug}`}>
      <div className="group relative bg-card hover:bg-accent/5 text-card-foreground rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out border border-border/50 hover:border-primary/20 my-8">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative flex items-start gap-6">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <div className="relative">
              {post.logo_url ? (
                <img
                  src={post.logo_url}
                  alt={`${post.company_name} logo`}
                  className="w-16 h-16 rounded-xl object-cover border border-border/50 group-hover:border-primary/20 transition-colors duration-300"
                />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl font-bold border border-primary/20">
                  {post.company_name?.charAt(0)}
                </div>
              )}
              {/* Status dot - optional */}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-grow space-y-3">
            {/* Header */}
            <div>
              <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {post.company_name}
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className="flex items-center gap-1.5 px-3 py-1 bg-secondary/30 hover:bg-secondary/40"
              >
                <MapPinIcon size={12} className="text-primary" />
                {post.location}
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1.5 px-3 py-1 bg-secondary/30 hover:bg-secondary/40"
              >
                <BriefcaseIcon size={12} className="text-primary" />
                {formatEmploymentType(post.employment_type)}
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1.5 px-3 py-1 bg-secondary/30 hover:bg-secondary/40"
              >
                <Banknote size={12} className="text-primary" />
                {post.salary}
              </Badge>
            </div>

            {/* Description - optional */}
            <p className="text-sm text-muted-foreground line-clamp-2 pr-4">
              {post.description}
            </p>
          </div>

          {/* Right Arrow - appears on hover */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <ArrowRightIcon className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* Footer */}
        <div className="relative flex justify-between items-center mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon size={14} className="mr-1.5" />
            <span>{formatPostedDate(post.posted_date)}</span>
          </div>

          {/* Optional: Add application deadline or other metadata */}
          {/* <div className="text-sm text-muted-foreground">
            <span>10 applications</span>
          </div> */}
        </div>
      </div>
    </Link>
  );
};

export default JobPostCard;
