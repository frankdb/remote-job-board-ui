import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  MapPinIcon,
  BriefcaseIcon,
  Banknote,
} from "lucide-react";
import { formatEmploymentType, formatPostedDate } from "@/utils/date";

interface JobPost {
  id: number;
  title: string;
  company_name: string;
  location: string;
  salary: string;
  type: string;
  slug: string;
  description: string;
  logoUrl?: string;
  posted_date: string;
  employment_type: string;
}

const JobPostCard: React.FC<{ post: JobPost }> = ({ post }) => {
  return (
    <Link href={`/jobs/${post.slug}`}>
      <div className="bg-card hover:bg-accent text-card-foreground border rounded-lg p-6 shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg cursor-pointer my-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-6">
            {post.logoUrl ? (
              <img
                src={post.logoUrl}
                alt={`${post.company_name} logo`}
                className="w-16 h-16 rounded-full object-cover border-2 border-primary"
              />
            ) : (
              <span className="bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold">
                {post.company_name?.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex-grow">
            <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
            <p className="text-sm text-muted-foreground mb-2">
              {post.company_name}
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant="secondary" className="flex items-center gap-1">
                <MapPinIcon size={12} /> {post.location}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <BriefcaseIcon size={12} />{" "}
                {formatEmploymentType(post.employment_type)}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Banknote size={12} /> {post.salary}
              </Badge>
            </div>
            {/* <p className="text-sm text-muted-foreground line-clamp-2">
              {post.description}
            </p> */}
          </div>
        </div>
        <div className="flex justify-end items-center mt-4 text-sm text-muted-foreground">
          <CalendarIcon size={14} className="mr-1" />
          <span>{formatPostedDate(post.posted_date)}</span>
        </div>
      </div>
    </Link>
  );
};

export default JobPostCard;
