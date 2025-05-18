"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";
import {
  getGlossaries,
  createGlossary,
  updateGlossary,
  deleteGlossary,
} from "@/src/app/lib/actions/glossary.actions";
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
  BookOpen,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Search,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale, useTranslations } from "next-intl";
import {
  GlossaryCreateParams,
  GlossaryItem,
  GlossaryUpdateParams,
} from "@/types/document";
import { getColumns } from "./table-columns";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import GlossaryCreateForm from "./glossary-create-form";
import GlossaryEditForm from "./glossary-edit-form";
import ConfirmDialog from "../confirm-dialog";
import { useWorkspaceStore } from "@/src/stores/workspace.store";
import { Input } from "../ui/input";

export default function GlossaryTable() {
  const [data, setData] = useState<GlossaryItem[]>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [editItem, setEditItem] = useState<GlossaryItem | null>(null);
  const t = useTranslations();
  const params = useParams();
  const locale = useLocale();

  const fetchData = useCallback(async () => {
    try {
      const glossaries = await getGlossaries({
        workspace_id: params.workspaceId as string,
      });
      setData(glossaries);
    } catch (error) {
      toast.error("Failed to fetch glossaries.");
      console.error(error);
    } finally {
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreate = async (formData: GlossaryCreateParams) => {
    try {
      await createGlossary({
        ...formData,
        workspace_id: params.workspaceId as string,
      });
      toast.success(t("SYSCOMMON.created_successfully"));
      await fetchData();
    } catch {
      toast.error(t("SYSCOMMON.create_failed"));
    }
  };

  const handleEdit = async (formData: GlossaryUpdateParams) => {
    try {
      await updateGlossary(formData);
      toast.success(t("SYSCOMMON.updated_successfully"));
      setEditItem(null);
      await fetchData();
    } catch {
      toast.error(t("SYSCOMMON.update_failed"));
    }
  };

  const [deleteItem, setDeleteItem] = useState<GlossaryItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteItem) return;
    setDeleting(true);
    try {
      await deleteGlossary(deleteItem.id.toString());
      toast.success(t("SYSCOMMON.deleted_successfully"));
      await fetchData();
    } catch {
      toast.error(t("SYSCOMMON.delete_failed"));
    } finally {
      setDeleting(false);
      setDeleteItem(null);
    }
  };
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const { role } = useWorkspaceStore();

  const columns = getColumns(
    t,
    locale,
    (item) => setEditItem(item),
    (item) => setDeleteItem(item),
    role
  );

  const table = useReactTable({
    data,
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

  return (
    <div className="p-6 space-y-6 max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-3">
            <BookOpen />
            {t("Glossaries.title")}
          </h2>
          <p className="text-muted-foreground">{t("Glossaries.description")}</p>
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
                <ChevronDownIcon className="size-4" />
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

      {(role == "admin" || role == "write") && (
        <GlossaryCreateForm onSubmit={handleCreate} />
      )}
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
            {table.getRowModel().rows.length ? (
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
                  {t("Main.empty")}
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

      {editItem && (
        <GlossaryEditForm
          glossaryItem={editItem}
          open={!!editItem}
          setOpen={(open) => !open && setEditItem(null)}
          onEdit={handleEdit}
          t={t}
        />
      )}

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
