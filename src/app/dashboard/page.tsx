import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <Navbar />
      <div className="container mx-auto mt-8 p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>
          Welcome to your dashboard. This page is only visible to authenticated
          users.
        </p>
        {/* Add more dashboard content here */}
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
