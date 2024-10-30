/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import api from "@/services/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const formSchema = z.object({
  cover_letter: z.string().optional(),
});

interface ApplicationFormProps {
  jobId: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ApplicationForm({
  jobId,
  isOpen,
  onClose,
  onSuccess,
}: ApplicationFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cover_letter: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await api.post("/api/applications/", {
        job: jobId,
        cover_letter: values.cover_letter,
      });

      toast({
        title: "Success",
        description: "Your application has been submitted successfully!",
      });
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Error:", error);
      const errorMessage =
        error.response?.data?.error ||
        "Failed to submit application. Please try again.";

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });

      if (
        error.response?.status === 403 ||
        (error.response?.status === 400 &&
          error.response?.data?.error?.includes("already applied"))
      ) {
        onClose();
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Submit Application</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="cover_letter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Letter (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us why you're interested in this position..."
                      className="h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
