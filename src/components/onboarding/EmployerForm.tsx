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

const formSchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  company_size: z.string().min(1, "Company size is required"),
  industry: z.string().min(1, "Industry is required"),
  company_description: z.string().min(1, "Company description is required"),
  company_website: z.string().url().optional(),
  company_location: z.string().min(1, "Company location is required"),
});

export default function EmployerForm({
  onSubmit,
}: {
  onSubmit: (data: any) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: "",
      company_size: "",
      industry: "",
      company_description: "",
      company_website: "",
      company_location: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Company Information</h2>

        {/* Form fields here - similar to the registration form structure */}

        <Button type="submit" className="w-full">
          Complete Profile
        </Button>
      </form>
    </Form>
  );
}
