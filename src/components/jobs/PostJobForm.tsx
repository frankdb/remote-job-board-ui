"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import api from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  salary: z.string().min(1, "Salary is required"),
  employment_type: z.enum(["FT", "PT", "CT", "IN"]),
  description: z.string(),
  requirements: z.string(),
  application_url: z.string().url().optional().or(z.literal("")),
});

export function PostJobForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      salary: "",
      employment_type: "FT",
      description: "",
      requirements: "",
      application_url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await api.post("/api/jobs/", values);
      toast({
        title: "Success",
        description: "Job draft created successfully",
      });
      router.push(`/jobs/preview/${response.data.id}`);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create job draft. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="max-w-2xl mx-auto mt-4 mb-16">
      <CardHeader>
        <CardTitle>Post a New Job</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Senior Frontend Developer"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary Range</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. $60,000 - $80,000/year"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="employment_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FT">Full-time</SelectItem>
                      <SelectItem value="PT">Part-time</SelectItem>
                      <SelectItem value="CT">Contract</SelectItem>
                      <SelectItem value="IN">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter detailed job description..."
                      className="h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requirements</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter job requirements..."
                      className="h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="application_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>External Application URL (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/apply"
                      type="url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-sm text-muted-foreground">
                    If provided, applicants will be redirected to this URL
                    instead of using our internal application system.
                  </p>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Posting..." : "Post Job"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
