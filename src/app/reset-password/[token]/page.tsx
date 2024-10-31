import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import Navbar from "@/components/shared/Navbar";

export default function ResetPasswordPage({
  params,
}: {
  params: { token: string };
}) {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 max-w-md">
        <ResetPasswordForm token={params.token} />
      </div>
    </>
  );
}
