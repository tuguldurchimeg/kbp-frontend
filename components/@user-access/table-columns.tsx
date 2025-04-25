"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AccessItem } from "@/types/document";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import RowActions from "./access-row-actions";

export function getColumns(): ColumnDef<AccessItem>[] {
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
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "employeeName",
      header: "Employee Name",
      cell: ({ row }) => {
        const name = row.original.attributes.user.data.attributes.firstname;
        return <span>{name}</span>;
      },
    },
    {
      id: "userAccess",
      header: "User Access",
      cell: ({ row }) => {
        const userAccess = row.original.attributes.role || "Reader";
        return (
          <Select
            value={userAccess}
            onValueChange={(value: string) => {
              row.original.attributes.role = value;
            }}
          >
            <SelectTrigger>
              <span>{userAccess}</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="reader">Reader</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        return <RowActions item={row.original} />;
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];
}
