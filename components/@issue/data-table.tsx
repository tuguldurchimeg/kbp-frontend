"use client";

import * as React from "react";
import Link from "next/link";
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  DragEndEvent,
  closestCenter,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
  SortingState,
  Row,
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
import { Checkbox } from "@/components/ui/checkbox";
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
import { formatDistanceToNow } from "date-fns";
import { IssueItem } from "@/types/issue";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useStatusAndPriorityMaps } from "@/constants/issue.constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CreateIssueDialog } from "./create-edit-dialog";
import { getIssues } from "@/src/app/lib/actions/issue.actions";

function DraggableRow({ row }: { row: Row<IssueItem> }) {
  const { setNodeRef, transform, transition } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      data-state={row.getIsSelected() && "selected"}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function DataTable() {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const pathname = usePathname();

  const [data, setData] = React.useState<IssueItem[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getIssues();
        setData(res);
      } catch (error) {
        console.error("Failed to fetch issues:", error);
      }
    };

    fetchData();
  }, []);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const dataIds = React.useMemo(() => data.map((d) => d.id.toString()), [data]);
  const { STATUS_MAP, PRIORITY_MAP, TYPE_MAP } = useStatusAndPriorityMaps();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };
  const t = useTranslations("Main");
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

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
      header: t("table.name"),
      cell: ({ row }) => (
        <Link
          href={`${pathname}/${row.original.id}`}
          className="text-blue-600 hover:underline"
        >
          {row.original.attributes.title}
        </Link>
      ),
    },
    {
      accessorKey: "attributes.status",
      header: t("table.status"),
      cell: ({ getValue }) => {
        const status = getValue<string>();
        const statusInfo = STATUS_MAP[status as keyof typeof STATUS_MAP];

        if (!statusInfo) {
          return <Badge variant="outline">{status}</Badge>;
        }

        const Icon = statusInfo.icon;
        return (
          <Badge
            className={`flex items-center gap-1 capitalize ${statusInfo.color}`}
          >
            <Icon className="h-3 w-3" />
            <span className="capitalize">{statusInfo.label}</span>
          </Badge>
        );
      },
    },
    {
      accessorKey: "attributes.priority",
      header: t("table.priority"),
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
      header: t("table.type"),
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
      header: t("table.created_by"),
      cell: ({ row }) => {
        const user = row.original.attributes.created_by.data.attributes;
        return (
          <div className="flex items-center gap-1">
            <Avatar className="h-6 w-6 rounded-full ">
              <AvatarImage src={user?.avatar} alt={user?.firstname} />
              <AvatarFallback className="bg-green-200 text-xs ">
                {`${user?.firstname?.[0] ?? ""}${
                  user?.lastname?.[0] ?? ""
                }`.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-foreground">{user.firstname}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "attributes.assignees",
      header: t("table.assignees"),
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
      header: t("table.docs"),
      cell: ({ getValue }) => (
        <Badge variant="outline">{getValue<number>()}</Badge>
      ),
    },
    {
      accessorKey: "attributes.updated_at",
      header: t("table.updated_at"),
      cell: ({ getValue }) => {
        const date = getValue<string>();
        return date
          ? formatDistanceToNow(new Date(date), { addSuffix: true })
          : "N/A";
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
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Delete</DropdownMenuItem>
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = dataIds.indexOf(active.id.toString());
      const newIndex = dataIds.indexOf(over.id.toString());
      const newData = arrayMove(data, oldIndex, newIndex);
      console.log("Reordered data:", newData);
    }
  };

  return (
    <div className="w-full space-y-4">
      <Button
        onClick={() => handleOpenDialog()}
        className="fixed bottom-15 right-15 h-12 w-12 rounded-xl hover:bg-emerald-600 z-99"
      >
        <Plus />
      </Button>
      <CreateIssueDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
      <div className="w-full overflow-x-auto rounded-md border p-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={dataIds}
            strategy={verticalListSortingStrategy}
          >
            <Table>
              <TableHeader>
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
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <DraggableRow key={row.id} row={row} />
                ))}
              </TableBody>
            </Table>
          </SortableContext>
          {/* pagination */}
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
        </DndContext>
      </div>
      <div className="flex items-center justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Columns <ChevronDownIcon className="ml-1 h-4 w-4" />
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
