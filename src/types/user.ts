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
