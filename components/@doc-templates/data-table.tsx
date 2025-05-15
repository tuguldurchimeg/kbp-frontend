/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { getColumns } from "./table-column";
import { useParams, usePathname, useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, FilePlus2, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import {
  getTemplateDocuments,
  createDocument,
  deleteDocument,
} from "@/src/app/lib/actions/document.actions";
import { DocumentItem } from "@/types/document";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import ConfirmDialog from "../confirm-dialog";

export default function TemplateTable() {
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<DocumentItem[]>();
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const columns = getColumns(pathname, t, locale, (item) =>
    setDeleteItem(item)
  );
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docs = await getTemplateDocuments({
          workspace_id: params.workspaceId as string,
        });
        setData(docs);
      } catch (err) {
        console.error("Failed to fetch templates:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateTemplate = async () => {
    try {
      const newDoc = await createDocument({
        title: "Untitled Template",
        is_template: true,
        workspace_id: params.workspaceId as string,
      });

      router.push(`${pathname}/${newDoc.id}`);
    } catch (error) {
      console.error("Template creation error:", error);
    }
  };

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getRowId: (row) => row.id.toString(),
  });

  const [deleteItem, setDeleteItem] = useState<DocumentItem | null>(null);
  const [deleting, setDeleting] = useState(false);
  const handleDelete = async () => {
    if (!deleteItem) return;
    setDeleting(true);
    try {
      await deleteDocument(deleteItem.id.toString());
      toast.success(t("SYSCOMMON.deleted_successfully"));
      const docs = await getTemplateDocuments({
        workspace_id: params.workspaceId as string,
      });
      setData(docs);
    } catch (err) {
      toast.error(t("SYSCOMMON.delete_failed"));
      console.error(err);
    } finally {
      setDeleting(false);
      setDeleteItem(null);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-3">
            <FilePlus2 />
            {t("Templates.title")}
          </h2>
          <p className="text-muted-foreground">{t("Templates.description")}</p>
        </div>

        <Button
          className="fixed bottom-15 right-15 h-12 w-12 rounded-xl hover:bg-purple-700"
          onClick={handleCreateTemplate}
          aria-label={t("SYSCOMMON.new")}
        >
          <Plus />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {t("SYSCOMMON.columns")}{" "}
              <ChevronDownIcon className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  checked={col.getIsVisible()}
                  onCheckedChange={(value) => col.toggleVisibility(!!value)}
                >
                  {typeof col.columnDef.header === "string"
                    ? col.columnDef.header
                    : col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  {t("SYSCOMMON.loading")}
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  {t("SYSCOMMON.empty")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <ConfirmDialog
        open={!!deleteItem}
        onOpenChange={(open) => !open && setDeleteItem(null)}
        title={t("SYSCOMMON.confirm_delete")}
        description={t("SYSCOMMON.confirm_delete_message")}
        confirmText={t("SYSCOMMON.confirm")}
        cancelText={t("SYSCOMMON.cancel")}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}
