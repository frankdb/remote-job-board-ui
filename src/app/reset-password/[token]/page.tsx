import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import Navbar from "@/components/shared/Navbar";

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const resolvedParams = await params;
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 max-w-md">
        <ResetPasswordForm token={resolvedParams.token} />
      </div>
    </>
  );
}
