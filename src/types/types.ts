export interface User {
  email: string;
  user_type?: UserType | null;
  id: string;
}

export type UserType = "EM" | "JS";

export interface JobSeekerProfile {
  first_name?: string;
  last_name?: string;
  skills?: string;
}

export interface EmployerProfile {
  company_name?: string;
  description?: string;
  website?: string;
  location?: string;
}

export interface OnboardingState {
  step: number;
  userType?: UserType;
  profile?: JobSeekerProfile | EmployerProfile;
}

export interface Job {
  id: number;
  title: string;
  company_name: string;
  location: string;
  salary: string;
  slug: string;
  description: string;
  requirements: string;
  posted_date: string;
  employment_type: string;
  status: "DRAFT" | "PENDING" | "ACTIVE";
  logo_url?: string;
  application_url?: string;
}

export interface JobsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Job[];
}

export interface FilterParams {
  employment_type: string;
}

export type EmploymentType = "FT" | "PT" | "CT" | "IN";

export interface Application {
  id: string;
  applied_date: string;
  job_title: string;
  company_name: string;
  status: string;
}

export interface ApplicationsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Application[];
}
