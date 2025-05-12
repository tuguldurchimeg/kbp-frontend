"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TagItem } from "@/types/document";
import { formatDistanceToNowStrict } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "../ui/badge";
import TagRowActions from "./tag-row-actions";
import { useTranslations } from "next-intl";
import { enUS, mn } from "date-fns/locale";

export function getColumns(
  t: ReturnType<typeof useTranslations>,
  locale: string,
  onUpdate: (item: TagItem) => void
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
        const tag = row.original.attributes;
        return (
          <div className="flex items-center gap-2">
            {tag.color && (
              <span
                className="inline-block w-4 h-4 rounded-md border"
                style={{ backgroundColor: tag.color }}
              />
            )}
            <span>{tag.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "attributes.description",
      header: t("SYSCOMMON.description"),
      cell: ({ row }) => {
        const tag = row.original.attributes;
        return <span>{tag.description}</span>;
      },
    },
    {
      id: "createdAt",
      accessorFn: (row) => row.attributes.created_at,
      header: t("SYSCOMMON.created_at"),
      cell: ({ getValue }) => {
        const updatedAt = getValue<string>();
        return formatDistanceToNowStrict(new Date(updatedAt), {
          addSuffix: true,
          locale: locale === "mn" ? mn : enUS,
        });
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
      cell: ({ row }) => (
        <TagRowActions t={t} onEditClick={() => onUpdate(row.original)} />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];
}
