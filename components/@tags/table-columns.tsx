"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TagItem } from "@/types/document";
import { formatDistanceToNow } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Badge } from "../ui/badge";
import TagRowActions from "./tag-row-actions";
import { useTranslations } from "next-intl";

export function getColumns(
  pathname: string,
  t: ReturnType<typeof useTranslations>
): ColumnDef<TagItem>[] {
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
      accessorKey: "attributes.title",
      header: t("SYSCOMMON.name"),
      cell: ({ row }) => {
        const title = row.original.attributes.name;
        const id = row.original.id;
        return (
          <Link
            href={`${pathname}/${id}`}
            className="text-blue-600 hover:underline"
          >
            {title}
          </Link>
        );
      },
    },
    {
      id: "createdAt",
      accessorFn: (row) => row.attributes.created_at,
      header: t("SYSCOMMON.created_at"),
      cell: ({ getValue }) => {
        const updatedAt = getValue<string>();
        return updatedAt
          ? formatDistanceToNow(new Date(updatedAt), { addSuffix: true })
          : "N/A";
      },
      sortingFn: "datetime",
    },
    {
      id: "documents",
      header: t("SYSCOMMON.documents"),
      cell: ({ row }) => {
        const documents = row.original.attributes.documents?.data;
        return <Badge variant="outline">{documents?.length}</Badge>;
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        return <TagRowActions item={row.original} />;
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];
}
