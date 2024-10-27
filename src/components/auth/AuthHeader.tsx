import Link from "next/link";
import { MdOutlineHandshake } from "react-icons/md";

const AuthHeader = () => {
  return (
    <div className="flex justify-center mb-8">
      <Link href="/" className="flex items-center space-x-2">
        <MdOutlineHandshake className="text-4xl text-primary" />
        <span className="text-3xl font-bold text-primary">Hirepod</span>
      </Link>
    </div>
  );
};

export default AuthHeader;
