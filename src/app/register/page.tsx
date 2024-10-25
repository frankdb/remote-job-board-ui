import Navbar from "@/components/Navbar";
import { RegisterForm } from "@/components/RegisterForm";

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
