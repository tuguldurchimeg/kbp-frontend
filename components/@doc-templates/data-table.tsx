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
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  FilePlus2,
  Plus,
  Search,
} from "lucide-react";
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
import { useWorkspaceStore } from "@/src/stores/workspace.store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function TemplateTable() {
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<DocumentItem[]>();
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();
  const { role } = useWorkspaceStore();
  const columns = getColumns(
    pathname,
    t,
    locale,
    (item) => setDeleteItem(item),
    role
  );
  const params = useParams();
  const workspaceId = params.workspaceId as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docs = await getTemplateDocuments({
          workspace_id: workspaceId,
        });
        setData(docs);
      } catch (err) {
        console.error("Failed to fetch templates:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [workspaceId]);

  const handleCreateTemplate = async () => {
    try {
      const newDoc = await createDocument({
        title: t("SYSCOMMON.untitled_template"),
        is_template: true,
        workspace_id: params.workspaceId as string,
      });

      router.push(`${pathname}/${newDoc.id}`);
    } catch (error) {
      console.error("Template creation error:", error);
    }
  };
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      rowSelection,
      pagination,
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
      {(role == "admin" || role == "write") && (
        <Button
          className="fixed bottom-5 right-10 h-12 w-12 rounded-xl"
          onClick={handleCreateTemplate}
          aria-label={t("SYSCOMMON.new")}
        >
          <Plus />
        </Button>
      )}
      <div className="flex justify-between items-center">
        <div>
          <Label className="text-2xl font-semibold flex items-center gap-3">
            <FilePlus2 />
            {t("Templates.title")}
          </Label>
          <Label className="text-sm text-muted-foreground">
            {t("Templates.description")}
          </Label>
        </div>
        <div className="flex gap-2">
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("Main.filter_placeholder")}
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="pl-10"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <ChevronDownIcon className="h-4 w-4" />
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
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {t("Main.page")} {table.getState().pagination.pageIndex + 1} {" / "}
            {table.getPageCount()}
          </span>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeftIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRightIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
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
