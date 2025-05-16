import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon, Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function EmployeeRowActions({
  t,
  onEditClick,
  onDeleteClick,
}: {
  t: ReturnType<typeof useTranslations>;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreVerticalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEditClick}>
          <Pencil className="mr-2 size-4 text-sky-500" />
          {t("edit")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDeleteClick}>
          <Trash2 className="mr-2 size-4 text-red-600" />
          {t("delete")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
