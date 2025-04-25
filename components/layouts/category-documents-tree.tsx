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
import clsx from "clsx";
import { useParams, usePathname } from "next/navigation";
import {
  createCategory,
  updateCategory,
} from "@/app/lib/actions/category.actions";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { useState } from "react";
import NewDocumentDialog from "../@documents/new-document-dialog";

interface CategoryDocumentsProps {
  item: MenuItemChildren;
}

const CategoryDocuments = ({ item }: CategoryDocumentsProps) => {
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(item.label);
  const [newDocDialogOpen, setNewDocDialogOpen] = useState(false);
  const pathname = usePathname();

  const handleRename = async () => {
    if (!newName || newName === item.label) return; // If no change or name is the same, do nothing
    try {
      if (item.id) {
        const updatedCategory = await updateCategory(item.id, {
          name: newName,
        });
        toast.success(
          `Category renamed to "${updatedCategory.attributes.name}"`
        );
        setIsEditing(false); // Exit editing mode after saving
      }
    } catch (err) {
      console.error("Error renaming category", err);
      toast.error("Failed to rename category");
    }
  };

  const handleCreateDocument = () => {
    setNewDocDialogOpen(true); // Open the new document dialog
  };

  // Handler to create a new category under this one
  const handleCreateCategory = async () => {
    try {
      const newCategory = await createCategory({
        name: "Untitled Category",
        parent_id: item.id,
        workspace_id: workspaceId,
      });
      toast.success(`Category created: "${newCategory.attributes.name}"`);
      // Optionally trigger refresh or reload of category tree
    } catch (err) {
      console.error("Error creating category", err);
      toast.error("Failed to create category");
    }
  };

  console.log("child ", item);

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
              className={clsx("peer", {
                " bg-sky-100 text-blue-600": pathname === item.uri,
              })}
              data-state-open={item.isCollapsed}
            >
              {item.collapsible && (
                <>
                  <div
                    className="transition-transform duration-200"
                    style={{
                      transform: item.isCollapsed
                        ? "rotate(90deg)"
                        : "rotate(0deg)",
                    }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </>
              )}
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="text-sm border-0"
                    autoFocus
                    onBlur={() => {
                      handleRename();
                      setIsEditing(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleRename();
                    }}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  {item.uri && (
                    <Link
                      href={item.uri || "#"}
                      className="flex items-center gap-1"
                    >
                      {item.icon && <item.icon />}
                      <span>{item.label}</span>
                    </Link>
                  )}
                </div>
              )}
            </SidebarMenuButton>
          </CollapsibleTrigger>

          {item.collapsible && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction className="invisible peer-hover:visible hover:visible transition-all duration-200">
                  <Ellipsis className="w-4 h-4 text-gray-700" />
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {/* Inline Rename */}
                <DropdownMenuItem onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4 mr-2 text-green-500" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleCreateCategory}>
                  <FolderPlus className="w-4 h-4 mr-2 text-blue-600" />
                  New Category
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleCreateDocument}>
                  <FileText className="w-4 h-4 mr-2 text-indigo-600" />
                  New Document
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => console.log("Delete item")}>
                  <Trash2 className="w-4 h-4 mr-2 text-red-600" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {item.collapsible && (
          <CollapsibleContent>
            {item.children && item.children.length > 0 ? (
              <SidebarMenuSub className="px-0 ml-1.5 mr-0">
                {item.children.map((child) => (
                  <SidebarMenuSubItem key={child.id}>
                    <CategoryDocuments item={child} />
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            ) : (
              <div className="ml-4 text-muted text-sm py-2">Loading...</div>
            )}
          </CollapsibleContent>
        )}
      </div>
      <NewDocumentDialog
        open={newDocDialogOpen}
        onOpenChange={setNewDocDialogOpen}
        categoryId={item.id || ""}
      />
    </Collapsible>
  );
};

export default CategoryDocuments;
