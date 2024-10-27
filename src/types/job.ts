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

export interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Job[];
}
