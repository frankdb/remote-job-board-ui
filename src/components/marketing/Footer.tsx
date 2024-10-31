import Link from "next/link";
import { MdOutlineHandshake } from "react-icons/md";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <MdOutlineHandshake className="text-3xl" />
              <span className="text-2xl font-bold">Hirepod</span>
            </Link>
            <p className="mt-2 text-sm">
              Connecting Filipino talent with global opportunities.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-secondary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-secondary">
                  Job Search
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-secondary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-secondary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-secondary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-secondary">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:text-secondary">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="hover:text-secondary">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/10 text-center text-sm">
          <p>&copy; 2024 Hirepod. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
