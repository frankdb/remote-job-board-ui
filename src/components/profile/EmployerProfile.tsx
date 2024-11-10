/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { ProfileLayout } from "./ProfileLayout";
import { PencilIcon, MapPinIcon, LinkIcon, BuildingIcon } from "lucide-react";

// Dummy data - replace with real data from API
const profileData = {
  company_name: "TechCorp Solutions",
  description:
    "Leading software development company specializing in enterprise solutions.",
  website: "https://techcorp.com",
  location: "Makati, Philippines",
  industry: "Information Technology",
  company_size: "50-200 employees",
  founded_year: 2015,
  logo_url: null,
};

export function EmployerProfile() {
  return (
    <ProfileLayout title="Company Profile">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0">
              {profileData.logo_url ? (
                <img
                  src={profileData.logo_url}
                  alt={`${profileData.company_name} logo`}
                  className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary/10 text-primary flex items-center justify-center text-3xl font-bold">
                  {profileData.company_name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{profileData.company_name}</h1>
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

        {/* About Section */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">About</h2>
          <p className="text-muted-foreground">{profileData.description}</p>
        </div>

        {/* Company Details */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Company Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium">Industry</h3>
              <p className="text-muted-foreground">{profileData.industry}</p>
            </div>
            <div>
              <h3 className="font-medium">Company Size</h3>
              <p className="text-muted-foreground">
                {profileData.company_size}
              </p>
            </div>
            <div>
              <h3 className="font-medium">Founded</h3>
              <p className="text-muted-foreground">
                {profileData.founded_year}
              </p>
            </div>
            <div>
              <h3 className="font-medium">
                <BuildingIcon size={16} />
                Website
              </h3>
              <a
                href={profileData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary"
              >
                <LinkIcon size={16} />
                {profileData.website}
              </a>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
