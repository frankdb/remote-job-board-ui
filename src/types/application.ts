export interface JobApplication {
  id?: number;
  job_id: number;
  cover_letter?: string;
  status?: string;
  created_at?: string;
}

export interface ApplicationFormData {
  cover_letter: string;
}
