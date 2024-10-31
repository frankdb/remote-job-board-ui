import Navbar from "@/components/shared/Navbar";
import { PrivacyPolicyContent } from "@/components/legal/PrivacyPolicyContent";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <PrivacyPolicyContent />
      </div>
    </>
  );
}
