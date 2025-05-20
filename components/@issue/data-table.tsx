"use client";

import * as React from "react";
import Link from "next/link";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
  SortingState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  MoreVerticalIcon,
  Plus,
} from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";
import { IssueCreateParams, IssueItem } from "@/types/issue";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useParams, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useStatusAndPriorityMaps } from "@/constants/issue.constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CreateIssueDialog } from "./create-issue-dialog";
import {
  createIssue,
  deleteIssue,
  getIssues,
} from "@/src/app/lib/actions/issue.actions";
import { enUS, mn } from "date-fns/locale";
import { Checkbox } from "@radix-ui/react-checkbox";
import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";
import ConfirmDialog from "../confirm-dialog";

export function DataTable() {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const pathname = usePathname();
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  const [data, setData] = React.useState<IssueItem[]>([]);
  const fetchData = useCallback(async () => {
    try {
      const res = await getIssues({ workspace_id: workspaceId });
      setData(res);
    } catch (error) {
      console.error("Failed to fetch issues:", error);
    }
  }, [workspaceId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const { STATUS_MAP, PRIORITY_MAP, TYPE_MAP } = useStatusAndPriorityMaps();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };
  const t = useTranslations();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const locale = useLocale();

  const handleIssueCreate = async (data: IssueCreateParams) => {
    try {
      await createIssue({ ...data });
      toast.success(t("SYSCOMMON.created_successfully"));
      await fetchData();
    } catch {
      toast.error(t("SYSCOMMON.create_failed"));
    }
  };

  const [deleteItem, setDeleteItem] = useState<IssueItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleIssueDelete = async () => {
    if (!deleteItem) return;
    setDeleting(true);
    try {
      await deleteIssue(deleteItem.id.toString());
      toast.success(t("SYSCOMMON.deleted_successfully"));
      const updated = await getIssues({ workspace_id: workspaceId });
      setData(updated);
    } catch (error) {
      toast.error(t("SYSCOMMON.delete_failed"));
      console.error("Issue delete failed:", error);
    } finally {
      setDeleting(false);
      setDeleteItem(null);
    }
  };

  const columns: ColumnDef<IssueItem>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "attributes.title",
      header: t("Main.table.name"),
      cell: ({ row }) => (
        <Link
          href={`${pathname}/${row.original.id}`}
          className="hover:underline"
        >
          {row.original.attributes.title}
        </Link>
      ),
    },
    {
      accessorKey: "attributes.status",
      header: t("Main.table.status"),
      cell: ({ getValue }) => {
        const status = getValue<string>();
        const statusInfo = STATUS_MAP[status as keyof typeof STATUS_MAP];

        if (!statusInfo) {
          return <Badge variant="outline">{status}</Badge>;
        }

        const Icon = statusInfo.icon;
        return (
          <Badge
            className={`flex items-center gap-1 capitalize ${statusInfo.backColor} ${statusInfo.textColor}`}
          >
            <Icon className="h-3 w-3" />
            <span className="capitalize">{statusInfo.label}</span>
          </Badge>
        );
      },
    },
    {
      accessorKey: "attributes.priority",
      header: t("Main.table.priority"),
      cell: ({ getValue }) => {
        const priority = getValue<string>();
        const priorityInfo =
          PRIORITY_MAP[priority as keyof typeof PRIORITY_MAP];
        return (
          <Badge className={`capitalize ${priorityInfo.color}`}>
            {priorityInfo.label}
          </Badge>
        );
      },
    },
    {
      accessorKey: "attributes.issue_type",
      header: t("Main.table.type"),
      cell: ({ getValue }) => {
        const type = getValue<string>();
        const typeInfo = TYPE_MAP[type as keyof typeof TYPE_MAP];
        const Icon = typeInfo.icon;

        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Icon className={`h-4 w-4 text-${typeInfo.color}`} />
              </TooltipTrigger>
              <TooltipContent side="bottom">{typeInfo.label}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
    {
      accessorKey: "attributes.created_by",
      header: t("Main.table.created_by"),
      cell: ({ row }) => {
        const user = row.original.attributes.created_by.data.attributes;
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="h-6 w-6 rounded-full ">
                  <AvatarImage src={user?.avatar} alt={user?.firstname} />
                  <AvatarFallback className="text-xs ">
                    {`${user?.firstname?.[0] ?? ""}${
                      user?.lastname?.[0] ?? ""
                    }`.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="top">{user.firstname}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
    {
      accessorKey: "attributes.assignees",
      header: t("Main.table.assignees"),
      cell: ({ row }) => {
        const assignees = row.original.attributes.assignees.data;
        const visible = assignees.slice(0, 1);
        const remaining = assignees.length - visible.length;

        return (
          <div className="flex items-center gap-0.5">
            {visible.map((a) => (
              <Avatar
                key={a.id}
                className="h-6 w-6 rounded-full"
                title={`${a.attributes.firstname} ${a.attributes.lastname}`}
              >
                <AvatarImage
                  src={a.attributes.avatar}
                  alt={`${a.attributes.firstname} ${a.attributes.lastname}`}
                />
                <AvatarFallback className="bg-muted text-xs">
                  {`${a.attributes.firstname[0] ?? ""}${
                    a.attributes.lastname[0] ?? ""
                  }`}
                </AvatarFallback>
              </Avatar>
            ))}

            {remaining > 0 && (
              <div
                className="h-6 w-6 rounded-full bg-muted text-xs flex items-center justify-center"
                title={`${remaining} more`}
              >
                +{remaining}
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "attributes.documents_count",
      header: t("Main.table.docs"),
      cell: ({ getValue }) => (
        <Badge variant="outline">{getValue<number>()}</Badge>
      ),
    },
    {
      accessorKey: "attributes.created_at",
      header: t("Main.table.created_at"),
      cell: ({ getValue }) => {
        const date = getValue<string>();
        if (!date) return "N/A";

        return formatDistanceToNowStrict(new Date(date), {
          addSuffix: true,
          locale: locale === "mn" ? mn : enUS,
        });
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVerticalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`${pathname}/${row.original.id}`}>
              <DropdownMenuItem>{t("SYSCOMMON.edit")}</DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => setDeleteItem(row.original)}>
              {t("SYSCOMMON.delete")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      columnVisibility,
      sorting,
      pagination,
    },
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getRowId: (row) => row.id.toString(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
  });

  return (
    <div className="w-full space-y-4">
      <Button
        onClick={() => handleOpenDialog()}
        className="fixed bottom-10 right-10 h-12 w-12 rounded-xl hover:bg-emerald-600 z-10"
      >
        <Plus />
      </Button>
      <CreateIssueDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCreate={handleIssueCreate}
        workspaceId={workspaceId}
      />
      <ConfirmDialog
        open={!!deleteItem}
        onOpenChange={(confirmOpen) => !confirmOpen && setDeleteItem(null)}
        title={t("SYSCOMMON.confirm_delete")}
        description={t("SYSCOMMON.confirm_delete_message")}
        confirmText={t("SYSCOMMON.confirm")}
        cancelText={t("SYSCOMMON.cancel")}
        onConfirm={handleIssueDelete}
        loading={deleting}
      />

      <div className="w-full overflow-x-auto rounded-md border">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="**:data-[slot=table-cell]:first:w-8">
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
                  {t("SYSCOMMON.empty")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* pagination */}
        <div className="flex items-center justify-end pt-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {t("Main.page")} {table.getState().pagination.pageIndex + 1}{" "}
              {" / "}
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
      <div className="flex items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {t("Main.columns")} <ChevronDownIcon className="ml-1 h-4 w-4" />
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
  );
}
