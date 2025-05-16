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
import { useLocale, useTranslations } from "next-intl";
import { getColumns } from "./table-columns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Tag,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  getTags,
  createTag,
  updateTag,
  deleteTag,
} from "@/src/app/lib/actions/tag.actions";
import { TagItem, TagUpdateParams } from "@/types/document";
import TagCreateForm from "./tag-create-form";
import { toast } from "sonner";
import TagEditForm from "./tag-edit-form";
import ConfirmDialog from "../confirm-dialog";
import { useWorkspaceStore } from "@/src/stores/workspace.store";

export default function TagTable() {
  const [tags, setTags] = useState<TagItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [editItem, setEditItem] = useState<TagItem | null>(null);

  const t = useTranslations();
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  const locale = useLocale();

  const [deleteItem, setDeleteItem] = useState<TagItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchTags = async () => {
    try {
      const data = await getTags({ workspace_id: workspaceId });
      setTags(data);
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleTagCreate = async (data: {
    name: string;
    description?: string;
  }) => {
    setCreating(true);
    try {
      await createTag({
        ...data,
        workspace_id: workspaceId,
      });
      toast.success(t("SYSCOMMON.created_successfully"));
      await fetchTags();
    } catch (err) {
      toast.error(t("SYSCOMMON.create_failed"));
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  const handleTagUpdate = async (data: TagUpdateParams) => {
    try {
      await updateTag(data);
      toast.success(t("SYSCOMMON.updated_successfully"));
      setEditItem(null);
      await fetchTags();
    } catch (error) {
      toast.error(t("SYSCOMMON.update_failed"));
      console.error("Tag update failed:", error);
    }
  };

  const handleTagDelete = async () => {
    if (!deleteItem) return;
    setDeleting(true);
    try {
      await deleteTag(deleteItem.id.toString());
      toast.success(t("SYSCOMMON.deleted_successfully"));
      await fetchTags();
    } catch (error) {
      toast.error(t("SYSCOMMON.delete_failed"));
      console.error("Tag delete failed:", error);
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
  console.log("role here ", role);

  const columns = getColumns(
    t,
    locale,
    (item) => setEditItem(item),
    (item) => setDeleteItem(item),
    role
  );

  const table = useReactTable({
    data: tags,
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
            <Tag />
            {t("Tags.title")}
          </h2>
          <p className="text-muted-foreground">{t("Tags.description")}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {t("SYSCOMMON.columns")}
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
      {(role == "admin" || role == "write") && (
        <TagCreateForm onSubmit={handleTagCreate} loading={creating} />
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

      {editItem && (
        <TagEditForm
          tagItem={editItem}
          onUpdate={handleTagUpdate}
          open={!!editItem}
          setOpen={(open) => !open && setEditItem(null)}
        />
      )}

      <ConfirmDialog
        open={!!deleteItem}
        onOpenChange={(confirmOpen) => !confirmOpen && setDeleteItem(null)}
        title={t("SYSCOMMON.confirm_delete")}
        description={t("SYSCOMMON.confirm_delete_message")}
        confirmText={t("SYSCOMMON.confirm")}
        cancelText={t("SYSCOMMON.cancel")}
        onConfirm={handleTagDelete}
        loading={deleting}
      />
    </div>
  );
}
