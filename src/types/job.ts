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
