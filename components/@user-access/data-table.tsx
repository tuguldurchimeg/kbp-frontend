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
  getWorkspaceUsers,
  updateWorkspaceRole,
} from "@/src/app/lib/actions/workspace.actions";
import { WorkspaceRoleItem } from "@/types/workspace";

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
import { toast } from "sonner";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Search,
  User,
} from "lucide-react";
import { Label } from "../ui/label";

export default function WorkspaceUserTable() {
  const t = useTranslations("UserAccess");
  const { workspaceId } = useParams() as { workspaceId: string };

  const [data, setData] = useState<WorkspaceRoleItem[]>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  const fetchData = async () => {
    try {
      const result = await getWorkspaceUsers({ workspace_id: workspaceId });
      setData(result);
    } catch (err) {
      console.error("Failed to fetch workspace users", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [workspaceId]);

  const handleUpdateRole = async (rowId: string, action: string) => {
    try {
      await updateWorkspaceRole({ id: rowId, params: { action } });
      fetchData();
      toast.success(t("role_update_success"));
    } catch (err) {
      console.error("Failed to update role", err);
      toast.error(t("role_update_failed"));
    }
  };
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });

  const columns = getColumns(t, handleUpdateRole);

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
    <div className="p-6 space-y-4 max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <Label className="text-2xl font-semibold">
            <User />
            {t("title")}
          </Label>
          <Label className="text-sm mt-0.5 text-muted-foreground">
            {t("description")}
          </Label>
        </div>
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("filter_placeholder")}
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="pl-10"
          />
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
                  {t("noData")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end pt-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {t("page")} {table.getState().pagination.pageIndex + 1} {" / "}
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
    </div>
  );
}
