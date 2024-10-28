import Navbar from "@/components/shared/Navbar";
import { PostJobForm } from "@/components/jobs/PostJobForm";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function PostJobPage() {
  return (
    <ProtectedRoute>
      <Navbar />
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Post a New Job</h1>
        <div className="max-w-3xl mx-auto">
          <PostJobForm />
        </div>
      </div>
    </ProtectedRoute>
  );
}
