import { Skeleton } from "@/components/ui/skeleton";

export function BlogCardSkeleton() {
  return (
    <div className="flex gap-6 py-6 border-b border-gray-200">
      <div className="flex-1 space-y-3">
        <Skeleton className="h-3 w-32" />

        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />

        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />

        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-20 rounded-full" />

          <Skeleton className="h-4 w-10" />
        </div>
      </div>

      <Skeleton className="w-28 h-20 rounded-md flex-shrink-0" />
    </div>
  );
}