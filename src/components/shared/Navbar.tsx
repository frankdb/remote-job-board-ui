"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MdOutlineHandshake, MdMenu } from "react-icons/md";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();

  const getInitials = (name: string = "U") => {
    return name.charAt(0).toUpperCase();
  };

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

          <div className="flex items-center space-x-4">
            {/* Hide these links on mobile, show on md (768px) and up */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/jobs" className="text-sm font-medium">
                Jobs
              </Link>
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" className="text-sm font-medium">
                    Dashboard
                  </Link>
                  <Link href="/account" className="text-sm font-medium">
                    My Account
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/register" className="text-sm font-medium">
                    Register
                  </Link>
                  <Link href="/login" className="text-sm font-medium">
                    Login
                  </Link>
                </>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  {isAuthenticated ? (
                    <Avatar>
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        {getInitials(user?.email.charAt(0))}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <MdMenu className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem></DropdownMenuItem>
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
                    <DropdownMenuItem>
                      <Link href="/account" className="w-full">
                        My Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={logout}
                    >
                      Logout
                    </DropdownMenuItem>
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
