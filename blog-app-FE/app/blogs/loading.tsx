
import { BlogCardSkeleton } from "@/components/BlogCardSkeleton";

export default function Loading() {


  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {Array.from({ length: 5 }).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}

