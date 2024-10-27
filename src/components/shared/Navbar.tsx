"use client";

import Link from "next/link";
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
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-primary text-primary-foreground w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="flex flex-row text-2xl justify-center items-center space-x-1"
            >
              <MdOutlineHandshake />
              <span className="text-2xl font-bold">Hirepod</span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:justify-center sm:items-center">
            <Link
              href="/"
              className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/jobs"
              className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium"
            >
              Jobs
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Button onClick={logout} variant="ghost">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium"
                >
                  Register
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium"
                >
                  Login
                </Link>
              </>
            )}
          </div>
          <div className="sm:hidden flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Menu className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/" className="w-full">
                    Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/jobs" className="w-full">
                    Jobs
                  </Link>
                </DropdownMenuItem>
                {isAuthenticated ? (
                  <>
                    <DropdownMenuItem>
                      <Link href="/dashboard" className="w-full">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>
                      <Link href="/register" className="w-full">
                        Register
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/login" className="w-full">
                        Login
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;