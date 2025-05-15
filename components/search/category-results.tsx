import { CategoryItem } from "@/types/document";
import { FolderCog } from "lucide-react";

export function CategoryResults({ data }: { data: CategoryItem[] }) {
  return (
    <div className="space-y-1  mx-3">
      {data.map((cat) => (
        <div
          key={cat.id}
          className="flex items-center gap-2 text-sm text-foreground-2 hover:underline cursor-pointer"
        >
          <FolderCog className="w-4 h-4" />
          {cat.attributes.name}
        </div>
      ))}
    </div>
  );
}
