/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";
import { EmployerProfile, JobSeekerProfile, UserType } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

const refreshTokenRequest = async (refresh_token: string) => {
  const response = await api.post("/api/token/refresh/", {
    refresh_token: refresh_token,
  });
  return response.data;
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }
        const { access_token } = await refreshTokenRequest(refreshToken);
        localStorage.setItem("access_token", access_token);
        api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure (e.g., logout user)
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        // Redirect to login page or dispatch a logout action
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const login = async (email: string, password: string) => {
  const response = await api.post("/api/login/", { email, password });
  return response.data;
};

export const register = async (email: string, password: string) => {
  const response = await api.post("/api/register/", {
    email,
    password,
  });
  return response.data;
};

export const refreshToken = refreshTokenRequest;

export const requestPasswordReset = async (email: string) => {
  const response = await api.post("/api/password/reset/", { email });
  return response.data;
};

export const resetPassword = async (token: string, newPassword: string) => {
  const response = await api.post("/api/password/reset/confirm/", {
    token,
    new_password: newPassword,
  });
  return response.data;
};

export const handleGoogleCallback = async (code: string) => {
  const response = await api.post("/api/auth/google/callback/", { code });
  return response.data;
};

export const setUserType = async (userType: UserType) => {
  const response = await api.post("/api/user/type/", {
    user_type: userType,
  });
  return response.data;
};

export const updateJobSeekerProfile = async (
  jobseekerProfileData: JobSeekerProfile
) => {
  const response = await api.patch(
    "/api/job-seeker/profile/",
    jobseekerProfileData
  );
  return response.data;
};

export const updateEmployerProfile = async (
  employerProfileData: EmployerProfile
) => {
  const response = await api.patch(
    "/api/employer/profile/",
    employerProfileData
  );
  return response.data;
};

export default api;
