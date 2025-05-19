"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
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
import { Input } from "@/components/ui/input";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Ellipsis,
  Plus,
  Search,
} from "lucide-react";
import {
  createEmployee,
  deleteUser,
  getUsers,
  updateEmployee,
} from "@/src/app/lib/actions/user.actions";
import {
  EmployeeCreateParams,
  EmployeeUpdateParams,
  UserItem,
} from "@/types/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import EmployeeEditForm from "./employee-edit-form";
import ConfirmDialog from "../confirm-dialog";
import { toast } from "sonner";
import EmployeeAddForm from "./employee-add-form";

export default function EmployeesTable() {
  const t = useTranslations();
  const { workspaceId } = useParams() as { workspaceId: string };

  const [data, setData] = useState<UserItem[]>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [editItem, setEditItem] = useState<UserItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<UserItem | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const fetchData = async () => {
    try {
      const result = await getUsers();
      setData(result);
    } catch (err) {
      console.error("Failed to fetch workspace users", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [workspaceId]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 6,
  });

  const columns = getColumns(
    t,
    (item) => setEditItem(item),
    (item) => setDeleteItem(item)
  );

  const handleEmployeeCreate = async (data: EmployeeCreateParams) => {
    try {
      await createEmployee(data);
      toast.success(t("SYSCOMMON.created_successfully"));
      await fetchData();
    } catch (err) {
      toast.error(t("SYSCOMMON.create_failed"));
      console.error(err);
      setCreateDialogOpen(false);
    }
  };

  const handleUpdate = async (data: EmployeeUpdateParams) => {
    try {
      await updateEmployee(data);
      toast.success(t("SYSCOMMON.updated_successfully"));
      setEditItem(null);
      fetchData();
    } catch (error) {
      toast.error(t("SYSCOMMON.update_failed"));
      console.error("Employee update failed:", error);
    }
    setEditItem(null);
  };

  const handleEmployeeDelete = async () => {
    if (!deleteItem) return;
    setDeleting(true);
    try {
      await deleteUser(deleteItem.id.toString());
      toast.success(t("SYSCOMMON.deleted_successfully"));
      fetchData();
    } catch (error) {
      toast.error(t("SYSCOMMON.delete_failed"));
      console.error("Employee delete failed:", error);
    } finally {
      setDeleting(false);
      setDeleteItem(null);
    }
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      rowSelection,
      globalFilter,
      pagination,
    },
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
    getRowId: (row) => row.id.toString(),
    globalFilterFn: "includesString",
  });

  return (
    <div className="space-y-4 max-w-screen-xl mx-auto">
      <div className="flex justify-between gap-2">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("Main.filter_placeholder")}
            value={
              (table.getColumn("firstname")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("firstname")?.setFilterValue(event.target.value)
            }
            className="pl-10"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Ellipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setCreateDialogOpen(true)}>
              <Plus className="mr-2 size-4 text-green-600" />
              {t("SYSCOMMON.add")}
            </DropdownMenuItem>
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
                  {t("Main.noData")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end pt-4">
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
        <EmployeeEditForm
          open={!!editItem}
          setOpen={(open) => !open && setEditItem(null)}
          userItem={editItem}
          onUpdate={handleUpdate}
        />
      )}
      <EmployeeAddForm
        open={createDialogOpen}
        setOpen={setCreateDialogOpen}
        onCreate={handleEmployeeCreate}
      />
      <ConfirmDialog
        open={!!deleteItem}
        onOpenChange={(confirmOpen) => !confirmOpen && setDeleteItem(null)}
        title={t("SYSCOMMON.confirm_delete")}
        description={t("SYSCOMMON.confirm_delete_message")}
        confirmText={t("SYSCOMMON.confirm")}
        cancelText={t("SYSCOMMON.cancel")}
        onConfirm={handleEmployeeDelete}
        loading={deleting}
      />
    </div>
  );
}
