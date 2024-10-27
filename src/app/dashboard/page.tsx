import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardContent from "@/components/dashboard/DashboardContent";
import Navbar from "@/components/shared/Navbar";

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <Navbar />
      <div className="container mx-auto mt-8 p-4">
        <DashboardContent />
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
