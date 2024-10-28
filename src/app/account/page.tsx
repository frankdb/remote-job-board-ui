import Navbar from "@/components/shared/Navbar";
import AccountContent from "@/components/account/AccountContent";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function AccountPage() {
  return (
    <ProtectedRoute>
      <Navbar />
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-6">My Account</h1>
        <AccountContent />
      </div>
    </ProtectedRoute>
  );
}
