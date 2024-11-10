/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProfileLayout } from "./ProfileLayout";
import { PencilIcon, MapPinIcon, LinkIcon, UserIcon } from "lucide-react";

// Dummy data - replace with real data from API
const profileData = {
  first_name: "John",
  last_name: "Doe",
  skills: ["React", "TypeScript", "Node.js", "Python", "AWS"],
  location: "Manila, Philippines",
  bio: "Full-stack developer with 5 years of experience building web applications.",
  experience_years: 5,
  github_url: "https://github.com/johndoe",
  linkedin_url: "https://linkedin.com/in/johndoe",
  avatar_url: null,
};

export function JobSeekerProfile() {
  return (
    <ProfileLayout title="Profile">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0">
              {profileData.avatar_url ? (
                <img
                  src={profileData.avatar_url}
                  alt={`${profileData.first_name}'s profile`}
                  className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <UserIcon className="w-12 h-12" />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                {profileData.first_name} {profileData.last_name}
              </h1>
              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <MapPinIcon size={16} />
                <span>{profileData.location}</span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <PencilIcon className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        {/* Bio Section */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">About</h2>
          <p className="text-muted-foreground">{profileData.bio}</p>
        </div>

        {/* Skills Section */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {profileData.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Links Section */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Links</h2>
          <div className="space-y-2">
            {profileData.github_url && (
              <a
                href={profileData.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary"
              >
                <LinkIcon size={16} />
                GitHub
              </a>
            )}
            {profileData.linkedin_url && (
              <a
                href={profileData.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary"
              >
                <LinkIcon size={16} />
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
