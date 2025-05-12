import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon, Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function GlossaryRowActions({
  t,
  onEditClick,
}: {
  t: ReturnType<typeof useTranslations>;
  onEditClick: () => void;
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
          {t("SYSCOMMON.edit")}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trash2 className="mr-2 size-4 text-red-600" />
          {t("SYSCOMMON.delete")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
