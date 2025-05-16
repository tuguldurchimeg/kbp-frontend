import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import EmployeeRowActions from "./employee-row-actions";
import { useTranslations } from "next-intl";
import { UserItem } from "@/types/user";
import { Badge } from "../ui/badge";

export function getColumns(
  t: ReturnType<typeof useTranslations>
): ColumnDef<UserItem>[] {
  return [
    {
      id: "avatar",
      header: "",
      cell: ({ row }) => {
        const user = row.original.attributes;
        return (
          <Avatar className="ml-3 h-7 w-7 rounded-full">
            <AvatarImage src={user.avatar} alt={user.firstname} />
            <AvatarFallback className="text-xs">
              {`${user.firstname?.[0] ?? ""}${
                user.lastname?.[0] ?? ""
              }`.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        );
      },
    },
    {
      id: "firstname",
      header: t("table.firstname"),
      accessorFn: (row) => row.attributes.firstname,
      cell: ({ row }) => {
        const user = row.original.attributes;
        return user.firstname;
      },
    },
    {
      id: "lastname",
      header: t("table.lastname"),
      accessorFn: (row) => row.attributes.lastname,
      cell: ({ row }) => {
        const user = row.original.attributes;
        return user.lastname;
      },
    },
    {
      id: "email",
      header: t("table.email"),
      accessorFn: (row) => row.attributes.email,
      cell: ({ row }) => {
        const user = row.original.attributes;
        return user.email;
      },
    },
    {
      id: "issues",
      header: t("table.issues"),
      cell: ({ row }) => {
        const issues = row.original.attributes.issues;
        return <Badge variant="outline">{issues}</Badge>;
      },
    },
    {
      id: "actions",
      header: "",
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      cell: ({ row }) => (
        <EmployeeRowActions
          t={t}
          // onEditClick={() => onUpdate(row.original)}
          // onDeleteClick={() => onDelete(row.original)}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];
}
