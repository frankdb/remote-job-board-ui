import { LoginForm } from "@/components/auth/LoginForm";
import Navbar from "@/components/shared/Navbar";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 max-w-md">
        <LoginForm />
      </div>
    </>
  );
}
