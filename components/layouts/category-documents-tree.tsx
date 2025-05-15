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
  ChevronDown,
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
import { useParams } from "next/navigation";
import { Input } from "../ui/input";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { JSONContent } from "@tiptap/react";

interface CategoryDocumentsProps {
  item: MenuItemChildren;
  setNewDocDialogOpen: (value: boolean) => void;
  onCategoryCreate: (parent_id?: string) => void;
  onCategoryRename: (id: string, name: string) => void;
  setSelectedCategoryId: (id: string) => void;
  onDocumentCreate: (
    title: string,
    category_id: string,
    content?: JSONContent
  ) => void;
  onCategoryDelete: (id: string) => void;
}

const CategoryDocuments = ({
  item,
  setNewDocDialogOpen,
  setSelectedCategoryId,
  onCategoryCreate,
  onCategoryRename,
  onDocumentCreate,
  onCategoryDelete,
}: CategoryDocumentsProps) => {
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(item.label);
  const documentIdFromUrl = params.docId as string;
  const isActive =
    !!documentIdFromUrl &&
    item.id?.toString() === documentIdFromUrl &&
    !item.collapsible;
  const t = useTranslations("SYSCOMMON");
  const [itemCollapsed, setItemCollapse] = useState(item.isCollapsed);

  const handleRename = () => {
    if (item.id) onCategoryRename(item.id, newName);
    setIsEditing(false);
  };

  return (
    <Collapsible
      key={item.label}
      defaultOpen={itemCollapsed}
      onOpenChange={() => setItemCollapse(!itemCollapsed)}
      className="group/collapsible"
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between w-full">
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              className={clsx(
                "peer flex gap-2 px-3 py-2 rounded-lg transition-colors",
                isActive
                  ? "bg-primary-light text-primary font-medium pointer-events-none"
                  : "text-foreground-2 hover:bg-muted"
              )}
              data-state-open={item.isCollapsed}
            >
              {item.collapsible && (
                <>
                  {itemCollapsed ? (
                    <ChevronDown className="size-4" />
                  ) : (
                    <ChevronRight className="size-4" />
                  )}
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="text-sm border-0"
                        autoFocus
                        onBlur={handleRename}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleRename();
                        }}
                      />
                    </div>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </>
              )}

              <div className="flex items-center gap-1">
                {item.uri && (
                  <Link
                    href={item.uri || "#"}
                    className="flex items-center gap-1"
                  >
                    {item.icon && (
                      <item.icon
                        className={clsx(
                          isActive ? "text-primary" : "text-transparent"
                        )}
                      />
                    )}
                    <span>{item.label}</span>
                  </Link>
                )}
              </div>
            </SidebarMenuButton>
          </CollapsibleTrigger>

          {item.collapsible && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction className="invisible peer-hover:visible hover:visible transition-all duration-200">
                  <Ellipsis className="w-4 h-4 text-foreground" />
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {/* Inline Rename */}
                <DropdownMenuItem onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4 mr-2 text-green-500" />
                  {t("rename")}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => item.id && onCategoryCreate(item.id)}
                >
                  <FolderPlus className="w-4 h-4 mr-2 text-blue-600" />
                  {t("new_category")}
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => {
                    setNewDocDialogOpen(true);
                    setSelectedCategoryId(item.id || "");
                  }}
                >
                  <FileText className="w-4 h-4 mr-2 text-indigo-600" />
                  {t("new_document")}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => item.id && onCategoryDelete(item.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2 text-red-600" />
                  {t("delete")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {item.collapsible && (
          <CollapsibleContent>
            {item.children && item.children.length > 0 && (
              <SidebarMenuSub className="px-0 ml-1.5 mr-0">
                {item.children.map((child) => (
                  <SidebarMenuSubItem
                    key={child.id || `${child.label}-${child.uri ?? "no-uri"}`}
                  >
                    <CategoryDocuments
                      item={child}
                      setNewDocDialogOpen={setNewDocDialogOpen}
                      onCategoryCreate={onCategoryCreate}
                      onCategoryRename={onCategoryRename}
                      onDocumentCreate={onDocumentCreate}
                      setSelectedCategoryId={setSelectedCategoryId}
                      onCategoryDelete={onCategoryDelete}
                    />
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            )}
          </CollapsibleContent>
        )}
      </div>
    </Collapsible>
  );
};

export default CategoryDocuments;
