"use client";

import { useAuth } from "@/contexts/AuthContext";
import { JobSeekerProfile } from "@/components/profile/JobSeekerProfile";
import { EmployerProfile } from "@/components/profile/EmployerProfile";

export function ProfileClient() {
  const { user } = useAuth();

  return user?.user_type === "JS" ? <JobSeekerProfile /> : <EmployerProfile />;
}
