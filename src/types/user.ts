export interface User {
  email: string;
  user_type: UserType;
  id: string;
}

export type UserType = "EM" | "JS";
