export interface Job {
  id: number;
  title: string;
  company: string;
  company_name: string;
  location: string;
  salary: string;
  type: string;
  slug: string;
  description: string;
  requirements: string;
  benefits: string[];
  posted_date: string;
  applicationDeadline: string;
  employment_type: string;
  status: string;
  logo_url?: string;
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

export interface JobFormData {
  title: string;
  company_name: string;
  location: string;
  salary: string;
  employment_type: EmploymentType;
  description: string;
  requirements: string;
  benefits?: string[];
}
