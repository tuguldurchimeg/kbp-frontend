import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import { WorkspaceItem } from "@/types/workspace";
import Link from "next/link";
import { ROUTE } from "@/constants/route.constants";

interface WorkspaceCardProps {
  item: WorkspaceItem;
}

export default function WorkspaceCard({ item }: WorkspaceCardProps) {
  return (
    <Link href={ROUTE.WORKSPACES.WORKSPACE(item.id)}>
      <Card className="w-full max-w-xs rounded-xl shadow-md p-0 pb-2 gap-1">
        <CardHeader className="p-0">
          <div className="relative h-20 w-full">
            <Image
              src={"/workspace_placeholder.jpg"}
              alt={item.attributes.name}
              fill
              style={{
                objectFit: "cover",
                objectPosition: "top",
              }}
              className="rounded-t-xl"
            />
          </div>
        </CardHeader>

        <CardContent className="flex justify-between items-start px-4">
          <div className="w-[80%] overflow-hidden">
            <CardTitle className="text-base font-semibold truncate">
              {item.attributes.name}
            </CardTitle>
            <CardDescription className="text-xs min-h-4 line-clamp-2">
              {item.attributes.description}
            </CardDescription>
          </div>
          <Star className="size-5 text-muted-foreground hover:text-yellow-500 cursor-pointer flex-shrink-0 mt-1" />
        </CardContent>

        <CardFooter />
      </Card>
    </Link>
  );
}
