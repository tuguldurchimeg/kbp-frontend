import { ColumnDef } from "@tanstack/react-table";
import { GlossaryItem } from "@/types/document";
import { formatDistanceToNowStrict } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import GlossaryRowActions from "./glossary-row-actions";
import { enUS, mn } from "date-fns/locale";
import { useTranslations } from "next-intl";

export function getColumns(
  t: ReturnType<typeof useTranslations>,
  locale: string,
  onEditClick: (item: GlossaryItem) => void,
  onDelete: (item: GlossaryItem) => void
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
      cell: ({ row }) => (
        <span className="font-medium">{row.original.attributes.name}</span>
      ),
    },
    {
      accessorKey: "attributes.description",
      header: t("Main.table.description"),
      cell: ({ row }) => (
        <div className="max-w-xs truncate text-muted-foreground whitespace-pre-wrap">
          {row.original.attributes.content}
        </div>
      ),
    },
    {
      id: "createdAt",
      accessorFn: (row) => row.attributes.created_at,
      header: t("Main.table.created_at"),
      cell: ({ getValue }) => {
        const createdAt = getValue<string>();
        return formatDistanceToNowStrict(new Date(createdAt), {
          addSuffix: true,
          locale: locale === "mn" ? mn : enUS,
        });
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <GlossaryRowActions
          t={t}
          onEditClick={() => onEditClick(row.original)}
          onDeleteClick={() => onDelete(row.original)}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
  ];
}
