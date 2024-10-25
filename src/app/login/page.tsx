import { LoginForm } from "@/components/LoginForm";
import Navbar from "@/components/Navbar";

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
