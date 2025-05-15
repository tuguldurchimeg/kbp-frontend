import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WorkspaceRoleItem } from "@/types/workspace";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function getColumns(
  t: (key: string) => string,
  onRoleChange: (id: string, action: string) => void
): ColumnDef<WorkspaceRoleItem>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected()
              ? true
              : table.getIsSomePageRowsSelected()
              ? "indeterminate"
              : false
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label={t("table.select_all")}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label={t("table.select_row")}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "employeeName",
      header: t("table.employee_name"),
      cell: ({ row }) => {
        const user = row.original.attributes.user.data;
        const firstname = user.attributes.firstname;
        const lastname = user.attributes.lastname;
        return (
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6 rounded-full ">
              <AvatarImage src={user?.attributes.avatar} alt={firstname} />
              <AvatarFallback className="text-xs ">
                {`${firstname?.[0] ?? ""}${lastname?.[0] ?? ""}`.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span>
              {lastname} {firstname}
            </span>
          </div>
        );
      },
    },
    {
      id: "userAccess",
      header: t("table.user_access"),
      cell: ({ row }) => {
        const userAccess = row.original.attributes.action;

        return (
          <Select
            value={userAccess}
            onValueChange={(value) => onRoleChange(row.original.id, value)}
          >
            <SelectTrigger>
              <SelectValue>{t(`roles.${userAccess}`)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="read">{t("roles.read")}</SelectItem>
              <SelectItem value="write">{t("roles.write")}</SelectItem>
              <SelectItem value="admin">{t("roles.admin")}</SelectItem>
            </SelectContent>
          </Select>
        );
      },
    },
  ];
}
