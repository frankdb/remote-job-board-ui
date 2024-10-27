import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Job {
  id: number;
  title: string;
  datePosted: string;
  status: string;
}

interface PostedJobsTableProps {
  jobs: Job[];
  isLoading: boolean;
}

const PostedJobsTable = ({ jobs, isLoading }: PostedJobsTableProps) => {
  if (isLoading) {
    return <div>Loading posted jobs...</div>;
  }

  if (jobs.length === 0) {
    return <div>You haven't posted any jobs yet.</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Job Title</TableHead>
          <TableHead>Date Posted</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.id}>
            <TableCell>{job.title}</TableCell>
            <TableCell>{job.datePosted}</TableCell>
            <TableCell>{job.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PostedJobsTable;
