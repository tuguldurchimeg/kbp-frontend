import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { WorkspaceItem } from "@/types/workspace";
import Link from "next/link";
import { ROUTE } from "@/constants/route.constants";
import { cn } from "@/lib/utils";
import WorkspaceEditForm from "./workspace-edit-form";

interface WorkspaceCardProps {
  item: WorkspaceItem;
  onUpdate: (
    id: string,
    updatedValues: { name: string; description?: string; image_url?: string }
  ) => void;
}

export default function WorkspaceCard({ item, onUpdate }: WorkspaceCardProps) {
  const description = item.attributes.description || "";
  const isClamped = description.length > 80;
  const handleSubmit = async (updatedValues: {
    name: string;
    description?: string;
    image_url?: string;
  }) => {
    await onUpdate(item.id, updatedValues);
  };
  return (
    <Card className="w-full max-w-xs rounded-xl shadow-md p-0 pb-2 gap-1">
      <CardHeader className="p-0 relative group">
        <div className="relative h-20 w-full">
          <Image
            src={item.attributes.image_url || "/workspace_placeholder.jpg"}
            alt={item.attributes.name}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "top",
            }}
            className="rounded-t-xl"
          />
        </div>

        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-3">
          <WorkspaceEditForm workspace={item} onSubmit={handleSubmit} />
        </div>
      </CardHeader>

      <Link href={ROUTE.WORKSPACES.WORKSPACE(item.id)}>
        <CardContent className="flex justify-between items-start px-4">
          <div className="w-[80%] overflow-hidden">
            <CardTitle className="text-base font-semibold truncate">
              {item.attributes.name}
            </CardTitle>

            <CardDescription
              className={cn(
                "text-xs min-h-8 line-clamp-2 relative",
                isClamped && "cursor-help"
              )}
              title={isClamped ? description : ""}
            >
              {description}
            </CardDescription>
          </div>
          {/* <Star className="size-5 text-muted-foreground hover:text-yellow-500 cursor-pointer flex-shrink-0 mt-1" /> */}
        </CardContent>
        <CardFooter />
      </Link>
    </Card>
  );
}
