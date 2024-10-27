"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Application {
  id: number;
  jobTitle: string;
  company: string;
  dateApplied: string;
  status: string;
}

interface RecentApplicationsTableProps {
  applications: Application[];
  isLoading: boolean;
}

const RecentApplicationsTable = ({
  applications,
  isLoading,
}: RecentApplicationsTableProps) => {
  if (isLoading) {
    return <div>Loading recent applications...</div>;
  }

  if (applications.length === 0) {
    return <div>You haven&apos;t applied to any jobs yet.</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Job Title</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Date Applied</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((application) => (
          <TableRow key={application.id}>
            <TableCell>{application.jobTitle}</TableCell>
            <TableCell>{application.company}</TableCell>
            <TableCell>{application.dateApplied}</TableCell>
            <TableCell>{application.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecentApplicationsTable;
