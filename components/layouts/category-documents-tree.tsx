import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuAction,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  ChevronRight,
  FolderPlus,
  FileText,
  Ellipsis,
  Edit,
  Copy,
  Move,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { MenuItemChildren } from "@/constants/menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface CategoryDocumentsProps {
  item: MenuItemChildren;
}

const CategoryDocuments = ({ item }: CategoryDocumentsProps) => {
  const isCollapsible = item.collapsible;

  return (
    <Collapsible
      key={item.label}
      defaultOpen={item.isCollapsed}
      className="group/collapsible"
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between w-full">
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              className="peer"
              data-state-open={item.isCollapsed}
            >
              {isCollapsible ? (
                <div className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 ml-auto transition-transform duration-200" />
                  {/* <ChevronRight className="w-4 h-4 ml-auto group-data-[state=closed]/collapsible:hidden" /> */}
                  {/* <ChevronDown className="w-4 h-4 ml-auto group-data-[state=open]/collapsible:hidden" /> */}
                  <span className="truncate whitespace-nowrap ellipsis">
                    {item.label}
                  </span>
                </div>
              ) : (
                <Link
                  href={item.uri || "#"}
                  className="flex items-center gap-1"
                >
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              )}
            </SidebarMenuButton>
          </CollapsibleTrigger>

          {isCollapsible && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction className="invisible peer-hover:visible hover:visible transition-all duration-200">
                  <Ellipsis className="w-4 h-4 text-gray-700" />
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => console.log("Rename item")}>
                  <Edit className="w-4 h-4 mr-2 text-green-500" /> Rename
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("Copy item")}>
                  <Copy className="w-4 h-4 mr-2 text-purple-500" /> Copy
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("Move item")}>
                  <Move className="w-4 h-4 mr-2 text-yellow-500" /> Move
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => console.log("New Category")}>
                  <FolderPlus className="w-4 h-4 mr-2 text-blue-600" /> New
                  Category
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("New Document")}>
                  <FileText className="w-4 h-4 mr-2 text-indigo-600" /> New
                  Document
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => console.log("Delete item")}>
                  <Trash2 className="w-4 h-4 mr-2 text-red-600" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {isCollapsible && item.children && (
          <CollapsibleContent>
            <SidebarMenuSub className="px-0 ml-1.5 mr-0">
              {item.children.map((child) => (
                <SidebarMenuSubItem key={child.label}>
                  <CategoryDocuments item={child} />
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        )}
      </div>
    </Collapsible>
  );
};

export default CategoryDocuments;
