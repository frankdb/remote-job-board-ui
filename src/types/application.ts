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
