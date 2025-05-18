"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DocumentItem } from "@/types/document";
import { formatDistanceToNowStrict } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useTranslations } from "next-intl";
import { enUS, mn } from "date-fns/locale";

export function getColumns(
  pathname: string,
  t: ReturnType<typeof useTranslations>,
  locale: string,
  onDeleteClick: (item: DocumentItem) => void,
  role: string | null
): ColumnDef<DocumentItem>[] {
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
      id: "name",
      accessorKey: "attributes.title",
      header: t("Main.table.name"),
      cell: ({ row }) => {
        const title = row.original.attributes.title;
        const id = row.original.id;
        return (
          <Link href={`${pathname}/${id}`} className="hover:underline">
            {title}
          </Link>
        );
      },
    },
    {
      id: "createdBy",
      header: t("Main.table.created_by"),
      cell: ({ row }) => {
        const user = row.original.attributes.user?.data?.attributes;
        const name = user?.firstname ?? "";
        return (
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6 rounded-full">
              <AvatarImage src={user?.avatar} alt={user?.firstname} />
              <AvatarFallback>
                {`${user?.firstname?.[0] ?? ""}${
                  user?.lastname?.[0] ?? ""
                }`.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span>{name}</span>
          </div>
        );
      },
    },
    {
      id: "lastUpdated",
      accessorFn: (row) => row.attributes.updated_at,
      header: t("Main.table.updated_at"),
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
      id: "actions",
      header: "",
      cell: ({ row }) => {
        if (!role) return null;

        const item = row.original;
        if (["admin", "write"].includes(role)) {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreVerticalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link href={`${pathname}/${item.id}`} passHref>
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    {t("SYSCOMMON.edit")}
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => onDeleteClick(item)}>
                  <Trash2 className="mr-2 h-4 w-4 text-red-600" />
                  {t("SYSCOMMON.delete")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];
}
