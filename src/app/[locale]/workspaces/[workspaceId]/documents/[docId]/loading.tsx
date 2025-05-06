import { Skeleton } from "@/components/ui/skeleton";
// import { Loader2 } from "lucide-react";
// import { cn } from "@/app/lib/utils";

export default function Loading() {
  return (
    <div className="space-y-4 mt-4">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-60 w-full rounded" />
    </div>
  );
}
