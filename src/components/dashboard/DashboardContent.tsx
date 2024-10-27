"use client";

import { useAuth } from "@/contexts/AuthContext";
import JobSeekerDashboard from "./JobSeekerDashboard";
import EmployerDashboard from "./EmployerDashboard";

const DashboardContent = () => {
  const { user } = useAuth();

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {user?.user_type === "JS" ? (
        <JobSeekerDashboard />
      ) : user?.user_type === "EM" ? (
        <EmployerDashboard />
      ) : (
        <div>Invalid user type</div>
      )}
    </>
  );
};

export default DashboardContent;
