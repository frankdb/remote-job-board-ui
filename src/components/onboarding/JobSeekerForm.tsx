/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  //   FormControl,
  //   FormField,
  //   FormItem,
  //   FormLabel,
  //   FormMessage,
} from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

const formSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  headline: z.string().min(1, "Professional headline is required"),
  bio: z.string().optional(),
  skills: z.string().transform((str) => str.split(",")),
  experience_years: z.string().transform(Number),
  preferred_work_type: z.enum(["remote", "office", "hybrid"]),
});

export default function JobSeekerForm({
  onSubmit,
}: {
  onSubmit: (data: any) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      headline: "",
      bio: "",
      //   skills: "",
      //   experience_years: "",
      preferred_work_type: "remote",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl font-bold text-center">
          Complete Your Profile
        </h2>

        {/* Form fields here - similar to the registration form structure */}

        <Button type="submit" className="w-full">
          Complete Profile
        </Button>
      </form>
    </Form>
  );
}
