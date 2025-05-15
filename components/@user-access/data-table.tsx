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
import { toast } from "sonner";

export default function WorkspaceUserTable() {
  const t = useTranslations("UserAccess");
  const { workspaceId } = useParams() as { workspaceId: string };

  const [data, setData] = useState<WorkspaceRoleItem[]>([]);
  const [rowSelection, setRowSelection] = useState({});
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
    }
  };

  const columns = getColumns(t, handleUpdateRole);

  const table = useReactTable({
    data,
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

  return (
    <div className="p-6 space-y-6 max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">{t("title")}</h2>
          <p className="text-muted-foreground">{t("description")}</p>
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
                  {t("noTemplates")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
