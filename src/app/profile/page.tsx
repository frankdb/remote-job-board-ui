import Navbar from "@/components/shared/Navbar";
import { ProfileClient } from "@/components/profile/ProfileClient";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <Navbar />
      <div className="container mx-auto py-8">
        <ProfileClient />
      </div>
    </ProtectedRoute>
  );
}
