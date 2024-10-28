import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function JobsLoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <Card key={i} className="p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-6">
              <Skeleton className="h-16 w-16 rounded-full" />
            </div>
            <div className="flex-grow">
              <Skeleton className="h-6 w-1/3 mb-2" />
              <Skeleton className="h-4 w-1/4 mb-4" />
              <div className="flex gap-2 mb-3">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Skeleton className="h-4 w-32" />
          </div>
        </Card>
      ))}
    </div>
  );
}
