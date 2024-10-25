import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { MdOutlineHandshake } from "react-icons/md";

const Navbar = () => {
  return (
    <nav className="bg-primary text-primary-foreground w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <div className="flex flex-row text-2xl justify-center items-center space-x-1">
              <MdOutlineHandshake />
              <span className="text-2xl font-bold">Hirepod</span>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <a
              href="/"
              className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-secondary"
            >
              Home
            </a>
            <a
              href="/register"
              className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-secondary"
            >
              Register
            </a>
            <a
              href="/login"
              className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-secondary"
            >
              Login
            </a>
            <a
              href="/jobs"
              className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-secondary"
            >
              Job Search
            </a>
            <a
              href="#"
              className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-secondary"
            >
              About
            </a>
          </div>
          <div className="sm:hidden flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Home</DropdownMenuItem>
                <DropdownMenuItem>About</DropdownMenuItem>
                <DropdownMenuItem>Services</DropdownMenuItem>
                <DropdownMenuItem>Contact</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
