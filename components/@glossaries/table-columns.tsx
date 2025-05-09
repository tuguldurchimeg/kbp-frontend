"use client";

import { ColumnDef } from "@tanstack/react-table";
import { GlossaryItem } from "@/types/document";
import { formatDistanceToNow } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import GlossaryRowActions from "./glossary-row-actions";
import { useTranslations } from "next-intl";

export function getColumns(
  t: ReturnType<typeof useTranslations>
): ColumnDef<GlossaryItem>[] {
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
      accessorKey: "attributes.name",
      header: t("Main.table.name"),
      cell: ({ row }) => {
        const title = row.original.attributes.name;
        return <span className="font-medium">{title}</span>;
      },
    },
    {
      accessorKey: "attributes.description",
      header: t("Main.table.description"),
      cell: ({ row }) => {
        const content = row.original.attributes.content;
        return (
          <div className="max-w-xs truncate whitespace-pre-wrap text-muted-foreground">
            {content}
          </div>
        );
      },
    },
    {
      id: "createdAt",
      accessorFn: (row) => row.attributes.created_at,
      header: t("Main.table.created_at"),
      cell: ({ getValue }) => {
        const updatedAt = getValue<string>();
        return updatedAt
          ? formatDistanceToNow(new Date(updatedAt), { addSuffix: true })
          : "N/A";
      },
      sortingFn: "datetime",
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        return <GlossaryRowActions item={row.original} />;
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];
}
