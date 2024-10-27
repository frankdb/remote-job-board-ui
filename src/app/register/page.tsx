import Navbar from "@/components/shared/Navbar";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 max-w-md">
        <RegisterForm />
      </div>
    </>
  );
}
