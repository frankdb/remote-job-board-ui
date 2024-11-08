/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserType, OnboardingState } from "@/types/user";
import JobSeekerForm from "@/components/onboarding/JobSeekerForm";
import EmployerForm from "@/components/onboarding/EmployerForm";
import { toast } from "@/hooks/use-toast";
import api, {
  setUserType,
  updateJobSeekerProfile,
  updateEmployerProfile,
} from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

export function OnboardingFlow() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [state, setState] = useState<OnboardingState>({
    step: 1,
  });

  const handleUserTypeSelect = async (type: UserType) => {
    try {
      const response = await setUserType(type);
      if (user) {
        updateUser({ ...user, user_type: type });
      }
      setState((prev) => ({ ...prev, step: 2, userType: type }));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user type. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleProfileSubmit = async (profileData: any) => {
    try {
      if (state.userType === "JS") {
        await updateJobSeekerProfile(profileData);
      } else {
        await updateEmployerProfile(profileData);
      }

      toast({
        title: "Success",
        description: "Profile created successfully!",
      });

      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress indicator */}
        <div className="mb-6 flex justify-center">
          <div className="flex items-center space-x-2">
            <div
              className={`h-3 w-3 rounded-full ${
                state.step === 1 ? "bg-primary" : "bg-gray-300"
              }`}
            />
            <div className="h-0.5 w-8 bg-gray-300" />
            <div
              className={`h-3 w-3 rounded-full ${
                state.step === 2 ? "bg-primary" : "bg-gray-300"
              }`}
            />
          </div>
        </div>

        <Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 shadow-xl border-0">
          <CardContent className="pt-8 px-8">
            {state.step === 1 ? (
              <div className="space-y-8">
                <div className="text-center space-y-4">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Welcome to Hirepod!
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Let&apos;s get started by setting up your account. Are you
                    looking to hire or find work?
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-40 group hover:scale-105 transition-all duration-200 hover:border-primary/50 hover:shadow-lg"
                    onClick={() => handleUserTypeSelect("EM")}
                  >
                    <div className="space-y-4">
                      <div className="text-4xl group-hover:scale-110 transition-transform duration-200">
                        👔
                      </div>
                      <div className="text-lg font-semibold">
                        I&apos;m an Employer
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Post jobs and find talent
                      </div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-40 group hover:scale-105 transition-all duration-200 hover:border-primary/50 hover:shadow-lg"
                    onClick={() => handleUserTypeSelect("JS")}
                  >
                    <div className="space-y-4">
                      <div className="text-4xl group-hover:scale-110 transition-transform duration-200">
                        💼
                      </div>
                      <div className="text-lg font-semibold">
                        I&apos;m a Job Seeker
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Find your next opportunity
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="py-4">
                {state.userType === "JS" ? (
                  <JobSeekerForm onSubmit={handleProfileSubmit} />
                ) : (
                  <EmployerForm onSubmit={handleProfileSubmit} />
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
