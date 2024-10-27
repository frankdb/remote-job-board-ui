import React from "react";
import Link from "next/link";

interface JobPost {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  logoUrl?: string;
}

const JobPostCard: React.FC<{ post: JobPost }> = ({ post }) => {
  //   const truncateDescription = (text: string, maxLength: number) => {
  //     if (text.length <= maxLength) return text;
  //     return text.slice(0, maxLength) + "...";
  //   };

  return (
    <Link href={`/jobs/${post.id}`}>
      <div className="bg-card text-card-foreground border-2 rounded-lg p-6 text-left flex w-[768px] h-36 overflow-hidden cursor-pointer my-4">
        <div className="flex-shrink-0 mr-6">
          <img
            src={post.logoUrl}
            alt={`${post.company} logo`}
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col flex-grow overflow-hidden">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-xl font-semibold truncate">{post.title}</h2>
              <p className="text-sm text-muted-foreground truncate">
                {post.company} - {post.location}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{post.salary}</p>
              <p className="text-sm">{post.type}</p>
            </div>
          </div>
          {/* <p className="text-sm flex-grow">
            {truncateDescription(post.description, 150)}
          </p> */}
          {/* <div className="flex justify-right mt-4"> */}
          {/* <Button className="px-6">Apply Now</Button> */}
          <p className="text-sm text-muted-foreground mt-4 flex justify-end">
            Posted 2 days ago
          </p>
          {/* </div> */}
        </div>
      </div>
    </Link>
  );
};

export default JobPostCard;
