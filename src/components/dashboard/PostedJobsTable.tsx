import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/utils/date";
import { formatEmploymentType } from "@/utils/misc";
import { Job } from "@/types/job";
import { Badge } from "@/components/ui/badge";
import { ReactElement } from "react";

interface PostedJobsTableProps {
  jobs: Job[];
  isLoading: boolean;
}

export const formatJobStatus = (status: string): ReactElement | null => {
  switch (status) {
    case "ACTIVE":
      return <Badge variant="default">Active</Badge>;
    case "EXPIRED":
      return <Badge variant="destructive">Expired</Badge>;
    case "DRAFT":
    case "PENDING":
      return <Badge variant="secondary">Draft</Badge>;
    default:
      return null;
  }
};

const PostedJobsTable = ({ jobs, isLoading }: PostedJobsTableProps) => {
  if (isLoading) {
    return <Card className="p-6">Loading posted jobs...</Card>;
  }

  if (jobs.length === 0) {
    return <Card className="p-6">You haven&apos;t posted any jobs yet.</Card>;
  }

  return (
    <Card className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Posted Date</TableHead>
            <TableHead>Employment Type</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.title}</TableCell>
              <TableCell>{formatDate(job.posted_date)}</TableCell>
              <TableCell>{formatEmploymentType(job.employment_type)}</TableCell>
              <TableCell>{formatJobStatus(job.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default PostedJobsTable;
