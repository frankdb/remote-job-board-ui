export interface User {
  email: string;
  user_type: UserType;
  id: string;
}

export type UserType = "EM" | "JS";

export interface JobSeekerProfile {
  full_name: string;
  headline: string;
  bio?: string;
  skills: string[];
  experience_years: number;
  preferred_work_type: "remote" | "office" | "hybrid";
}

export interface EmployerProfile {
  company_name: string;
  company_size: string;
  industry: string;
  company_description: string;
  company_website?: string;
  company_location: string;
}

export interface OnboardingState {
  step: number;
  userType?: UserType;
  profile?: JobSeekerProfile | EmployerProfile;
}
