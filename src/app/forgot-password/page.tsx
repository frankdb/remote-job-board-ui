import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import Navbar from "@/components/shared/Navbar";

export default function ForgotPasswordPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 max-w-md">
        <ForgotPasswordForm />
      </div>
    </>
  );
}
