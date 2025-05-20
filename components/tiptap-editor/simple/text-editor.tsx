"use client";

import * as React from "react";
import {
  EditorContent,
  EditorContext,
  useEditor,
  BubbleMenu,
  Editor,
} from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Underline } from "@tiptap/extension-underline";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";

// --- Custom Extensions ---
import { Link } from "@/components/tiptap-extension/link-extension";
import { Selection } from "@/components/tiptap-extension/selection-extension";
import { TrailingNode } from "@/components/tiptap-extension/trailing-node-extension";

// --- UI Primitives ---
import { Button } from "@/components/tiptap-ui-primitive/button";
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button";
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu";
import { NodeButton } from "@/components/tiptap-ui/node-button";
import {
  HighlightPopover,
  HighlightContent,
  HighlighterButton,
} from "@/components/tiptap-ui/highlight-popover";
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@/components/tiptap-ui/link-popover";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";
import { TextAlignPopover } from "@/components/tiptap-ui/text-align-button/text-align-popover";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";

// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/components/tiptap-icons/link-icon";

// --- Hooks ---
import { useIsMobile } from "@/hooks/use-mobile";
import { useWindowSize } from "@/hooks/use-window-size";

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";

// --- Styles ---
import "@/components/tiptap-editor/simple/text-editor.scss";
import {
  TextColorButton,
  TextColorContent,
  TextColorPopover,
} from "@/components/tiptap-ui/textcolor-popover/textcolor-popover";
import {
  FileCheck,
  Palette,
  Pencil,
  Plus,
  MoreVertical,
  Trash,
  XIcon,
} from "lucide-react";
import { DocumentItem, TagCreateParams, TagItem } from "@/types/document";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNowStrict } from "date-fns";
import { Button as CNButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  delDocumentTag,
  deleteDocument,
  setDocumentTag,
  updateDocument,
} from "@/src/app/lib/actions/document.actions";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { TAG_COLORS } from "@/constants/color.constants";
import clsx from "clsx";
import InsertTableButton from "@/components/tiptap-ui/table";
import TableBubbleMenu from "@/components/tiptap-ui/table/table-bubble-menu";
import { ResizableImage } from "tiptap-extension-resizable-image";
import {
  createTag,
  getTags,
  updateTag,
} from "@/src/app/lib/actions/tag.actions";
import { useLocale, useTranslations } from "next-intl";
import { enUS, mn } from "date-fns/locale";
import ExportButton from "@/components/tiptap-ui/export-button";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ROUTE } from "@/constants/route.constants";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useWorkspaceStore } from "@/src/stores/workspace.store";

type Props = {
  document: DocumentItem;
  fetchDoc: () => void;
};

const MainToolbarContent = ({
  editor,
  title,
  onHighlighterClick,
  onTextColorClick,
  onLinkClick,
  isMobile,
}: {
  editor: Editor;
  title: string;
  onHighlighterClick: () => void;
  onTextColorClick: () => void;
  onLinkClick: () => void;
  isMobile: boolean;
}) => {
  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} />
        <ListDropdownMenu types={["bulletList", "orderedList", "taskList"]} />
        <NodeButton type="codeBlock" />
        <NodeButton type="blockquote" />
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="underline" />
      </ToolbarGroup>
      <ToolbarSeparator />

      <ToolbarGroup>
        {!isMobile ? (
          <HighlightPopover />
        ) : (
          <HighlighterButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? (
          <TextColorPopover />
        ) : (
          <TextColorButton onClick={onTextColorClick} />
        )}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text="" />
      </ToolbarGroup>

      <ToolbarGroup>
        <InsertTableButton />
      </ToolbarGroup>

      <ToolbarGroup>
        <ExportButton editor={editor} title={title} />
      </ToolbarGroup>

      <Spacer />

      {isMobile && <ToolbarSeparator />}
    </>
  );
};

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link" | "textcolor";
  onBack: () => void;
}) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {getEditorIcon(type)}
      </Button>
    </ToolbarGroup>
    <ToolbarSeparator />

    {getEditorContent(type)}
  </>
);

const getEditorIcon = (type: "highlighter" | "link" | "textcolor") => {
  switch (type) {
    case "highlighter":
      return <HighlighterIcon className="tiptap-button-icon" />;
    case "textcolor":
      return <Palette className="tiptap-button-icon w-4 h-4" />;
    case "link":
      return <LinkIcon className="tiptap-button-icon" />;
    default:
      return null;
  }
};

const getEditorContent = (type: "highlighter" | "link" | "textcolor") => {
  switch (type) {
    case "highlighter":
      return <HighlightContent />;
    case "link":
      return <LinkContent />;
    case "textcolor":
      return <TextColorContent />;
    default:
      return null;
  }
};

export function MyTextEditor({ document, fetchDoc }: Props) {
  const isMobile = useIsMobile();
  const windowSize = useWindowSize();
  const [mobileView, setMobileView] = useState<
    "main" | "highlighter" | "link" | "textcolor"
  >("main");
  const [rect, setRect] = useState<
    Pick<DOMRect, "x" | "y" | "width" | "height">
  >({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const toolbarRef = useRef<HTMLDivElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateRect = () => {
      if (editorContainerRef.current) {
        const bounds = editorContainerRef.current.getBoundingClientRect();
        setRect({
          x: bounds.x,
          y: bounds.y,
          width: bounds.width,
          height: bounds.height,
        });
      }
    };

    updateRect();

    const resizeObserver = new ResizeObserver(updateRect);
    if (editorContainerRef.current) {
      resizeObserver.observe(editorContainerRef.current);
    }

    window.addEventListener("scroll", updateRect);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", updateRect);
    };
  }, []);

  const [isEditable, setEditable] = useState(false);
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [title, setTitle] = useState<string>("");
  const t = useTranslations("SYSCOMMON");
  const router = useRouter();

  const editor = useEditor({
    editable: isEditable,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
      },
    },
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      TextStyle,
      Color,
      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        translate: t,
        upload: (file, onProgress, signal) =>
          handleImageUpload(file, document.id, onProgress, signal),
        onError: (error) => console.error("Upload failed:", error),
      }),
      ResizableImage,
      TrailingNode,
      Link.configure({ openOnClick: false }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "tiptap-table",
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: "",
  });

  useEffect(() => {
    const checkCursorVisibility = () => {
      if (!editor || !toolbarRef.current) return;

      const { state, view } = editor;
      if (!view.hasFocus()) return;

      const { from } = state.selection;
      const cursorCoords = view.coordsAtPos(from);

      if (windowSize.height < rect.height) {
        if (cursorCoords && toolbarRef.current) {
          const toolbarHeight =
            toolbarRef.current.getBoundingClientRect().height;
          const isEnoughSpace =
            windowSize.height - cursorCoords.top - toolbarHeight > 0;

          if (!isEnoughSpace) {
            const scrollY =
              cursorCoords.top - windowSize.height / 2 + toolbarHeight;
            window.scrollTo({
              top: scrollY,
              behavior: "smooth",
            });
          }
        }
      }
    };

    checkCursorVisibility();
  }, [editor, rect.height, windowSize.height]);

  useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);
  const hasInitializedContent = useRef(false);

  const initializeEditorContent = useCallback(() => {
    if (!document?.attributes || !editor || hasInitializedContent.current)
      return;

    setTitle(document.attributes.title);
    editor.commands.setContent(document.attributes.content ?? "");
    hasInitializedContent.current = true;
  }, [document, editor]);

  useEffect(() => {
    initializeEditorContent();
  }, [initializeEditorContent]);

  const handleToggleEditable = () => {
    if (editor) {
      editor.setEditable(!isEditable);
    }
    setEditable(!isEditable);
  };

  const handleDocUpdate = async () => {
    if (!editor || !document) return;
    const updatedContent = editor.getJSON();

    try {
      await updateDocument(document.id, {
        title,
        content: updatedContent,
      });
      editor.setEditable(false);
      setEditable(false);
      toast.success(t("updated_successfully"));
    } catch (error) {
      console.error("Failed to update document", error);
      toast.error(t("update_failed"));
    }
  };

  const handleDocumentDelete = async (doc_id: string) => {
    try {
      await deleteDocument(doc_id);
      toast.success(t("deleted_successfully"));
      router.push(ROUTE.WORKSPACES.WORKSPACE(document.attributes.workspace_id));
    } catch {
      toast.error(t("delete_failed"));
    }
  };

  const [tagOpen, setTagOpen] = useState(false);
  const [tagInputValue, setTagInputValue] = useState("");
  const [allTags, setAllTags] = useState<TagItem[]>();
  const locale = useLocale();

  const fetchTags = useCallback(async () => {
    try {
      const tags = await getTags({
        workspace_id: document.attributes.workspace_id,
      });
      setAllTags(tags);
    } catch (error) {
      console.error("Failed to fetch tags", error);
    }
  }, [document.attributes.workspace_id]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const handleSelectTag = async (tag: TagItem) => {
    try {
      await setDocumentTag({
        document_id: document.id,
        tag_id: tag.id,
      });

      setTagInputValue("");
      setTagOpen(false);
      fetchDoc();
    } catch (error) {
      console.error("Failed to set document tag:", error);
    }
  };

  const handleDeleteTagDoc = async (tag: TagItem) => {
    try {
      await delDocumentTag({ document_id: document.id, tag_id: tag.id });
      fetchDoc();
    } catch (error) {
      console.error("Failed to del document tag:", error);
    }
  };

  const handleCreateTag = async (name: string) => {
    const newTag: TagCreateParams = {
      name,
      color: TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)],
      workspace_id: document.attributes.workspace_id,
    };

    try {
      const created = await createTag(newTag);
      await handleSelectTag(created);
      fetchTags();
    } catch (error) {
      console.error("Failed to create tag:", error);
    }
  };

  const handleTagColorChange = async (tag: TagItem, newColor: string) => {
    try {
      await updateTag({
        id: tag.id,
        params: {
          name: tag.attributes?.name,
          workspace_id: document.attributes.workspace_id,
          color: newColor,
        },
      });
      fetchDoc();
      console.log("Color updated");
    } catch (err) {
      console.error("Failed to update color", err);
    }
  };

  const applyAlpha = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const { role } = useWorkspaceStore();

  return (
    <EditorContext.Provider value={{ editor }}>
      {isEditable && (
        <Toolbar ref={toolbarRef} variant="floating">
          {mobileView === "main" ? (
            <MainToolbarContent
              editor={editor!}
              title={title}
              onHighlighterClick={() => setMobileView("highlighter")}
              onTextColorClick={() => setMobileView("textcolor")}
              onLinkClick={() => setMobileView("link")}
              isMobile={isMobile}
            />
          ) : (
            <MobileToolbarContent
              type={mobileView}
              onBack={() => setMobileView("main")}
            />
          )}
        </Toolbar>
      )}

      {isEditable && (
        <CNButton
          onClick={() => handleDocUpdate()}
          size="lg"
          className={clsx(
            "fixed bottom-15 right-15 h-12 w-12 shadow-lg rounded-xl z-10",
            isMobile && "right-5 bottom-13"
          )}
          aria-label="Update document"
        >
          <FileCheck className="w-5 h-5 " />
        </CNButton>
      )}
      {!isEditable && (role == "admin" || role == "write") && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <CNButton
              size="icon"
              className={clsx(
                "fixed bottom-15 right-15 z-10 h-12 w-12 rounded-xl shadow-lg",
                isMobile && "right-5 bottom-13"
              )}
              aria-label="Open document menu"
            >
              <MoreVertical className="w-5 h-5" />
            </CNButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="end" className="w-40">
            <DropdownMenuItem
              onClick={handleToggleEditable}
              className="flex items-center gap-3"
            >
              <Pencil className="w-4 h-4 text-indigo-600" />
              {t("edit")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDocumentDelete(document.id)}
              className="flex items-center gap-3"
            >
              <Trash className="w-4 h-4  text-red-600" />
              {t("delete")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <div className="simple-editor-title">
        {isEditable && isTitleEditing ? (
          <Input
            type="text"
            value={title}
            onChange={(e) =>
              // setDocument((prev) =>
              //   prev ? { ...prev, title: e.target.value } : prev
              // )
              setTitle(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setIsTitleEditing(false);
                // Focus the Tiptap editor
                editor?.commands.focus("start");
              }
            }}
            onBlur={() => {
              setIsTitleEditing(false);
              editor?.commands.focus("start");
            }}
            className="text-black dark:text-white bg-transparent font-bold text-lg w-full resize-none border-none outline-none focus:ring-0 focus-visible:ring-0"
            placeholder={t("untitled_document")}
          />
        ) : (
          <h1
            className="text-4xl font-bold text-foreground cursor-pointer"
            onClick={() => {
              if (isEditable) setIsTitleEditing(true);
            }}
          >
            {title}
          </h1>
        )}
        {!isEditable && (
          <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
            {document.attributes?.user?.data.attributes && (
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={document.attributes?.user.data.attributes?.avatar}
                  />
                  <AvatarFallback>
                    {document.attributes?.user.data.attributes?.firstname?.[0]}
                    {document.attributes?.user.data.attributes?.lastname?.[0]}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-foreground-2">
                  {document.attributes?.user.data.attributes?.firstname}{" "}
                  {document.attributes?.user.data.attributes?.lastname}
                </span>
              </div>
            )}
            <span className="text-xs text-gray-500">
              •{" "}
              {document.attributes?.created_at &&
                formatDistanceToNowStrict(
                  new Date(document.attributes.created_at),
                  {
                    addSuffix: true,
                    locale: locale === "mn" ? mn : enUS,
                  }
                )}
            </span>
          </div>
        )}
      </div>
      <div
        className={clsx(
          "mt-4 flex flex-wrap gap-1",
          isMobile && "ml-8 mt-3",
          isEditable && "mt-0"
        )}
      >
        {Array.isArray(document.attributes?.tags?.data) &&
          document.attributes.tags.data.length > 0 &&
          document.attributes.tags.data.map((tag) => (
            <Badge
              key={tag.id}
              className="text-xs font-medium rounded-lg px-4 justify-between items-center"
              style={{
                backgroundColor: applyAlpha(tag.attributes?.color, 0.2),
                color: tag.attributes?.color,
              }}
            >
              {tag.attributes?.name}
              {isEditable && (
                <CNButton
                  variant="ghost"
                  size="xs"
                  onClick={() => handleDeleteTagDoc(tag)}
                  className="p-0 hover:bg-transparent hover:font-bold h-2 mt-0.5"
                >
                  <XIcon className="size-2.5" />
                </CNButton>
              )}
            </Badge>
          ))}

        {isEditable && (
          <Popover open={tagOpen} onOpenChange={setTagOpen}>
            <PopoverTrigger asChild>
              <CNButton
                variant="ghost"
                size="xs"
                className="text-xs font-medium rounded-lg px-4 bg-muted hover:bg-muted/80"
              >
                {`+ ${t("tag")}`}
              </CNButton>
            </PopoverTrigger>
            <PopoverContent className="w-[240px] py-1 px-0">
              <Command>
                <CommandInput
                  placeholder={t("search")}
                  value={tagInputValue}
                  onValueChange={setTagInputValue}
                />
                <CommandList>
                  {allTags?.map((tag) => (
                    <CommandItem
                      key={tag?.id}
                      className="flex text-sm items-center gap-2.5 px-2 py-1 hover:bg-muted rounded-sm"
                    >
                      <Popover>
                        <PopoverTrigger asChild>
                          <button
                            className="w-3 h-3 rounded-sm border ml-2"
                            style={{ backgroundColor: tag.attributes?.color }}
                            aria-label={`Change color of ${tag.attributes?.name}`}
                          />
                        </PopoverTrigger>
                        <PopoverContent className="w-[180px] p-2 grid grid-cols-5 gap-1">
                          {TAG_COLORS.map((color) => (
                            <Button
                              key={color}
                              className={`w-4 h-4 rounded-sm border hover:ring-2 hover:ring-offset-2 transition-colors p-0`}
                              style={{ backgroundColor: color }}
                              onClick={() => handleTagColorChange(tag, color)}
                            />
                          ))}
                        </PopoverContent>
                      </Popover>
                      <div
                        className="cursor-pointer"
                        onClick={() => handleSelectTag(tag)}
                      >
                        <span>{tag.attributes?.name}</span>
                      </div>
                    </CommandItem>
                  ))}

                  {tagInputValue &&
                    !allTags?.some(
                      (tag) =>
                        tag.attributes?.name.toLowerCase() ===
                        tagInputValue.toLowerCase()
                    ) && (
                      <CommandItem
                        onSelect={() => handleCreateTag(tagInputValue)}
                        className="pl-3.5"
                      >
                        <Plus className="w-3 h-3" />
                        <span>
                          {t("create")} “{tagInputValue}”
                        </span>
                      </CommandItem>
                    )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      </div>

      <div className="content-wrapper py-4">
        {editor && (
          <BubbleMenu
            editor={editor}
            tippyOptions={{ duration: 150, placement: "top-start" }}
            className="tiptap-bubble-menu"
          >
            <div className="bubble-toolbar flex items-center gap-1 fit-content">
              <MarkButton type="bold" />
              <MarkButton type="italic" />
              <MarkButton type="strike" />
              <MarkButton type="underline" />
              <HighlightPopover editor={editor} />
              <TextColorPopover editor={editor} />
              <LinkPopover />
              <TextAlignPopover editor={editor} />
            </div>
          </BubbleMenu>
        )}

        {editor && <TableBubbleMenu editor={editor} />}

        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content h-full"
        />
      </div>
    </EditorContext.Provider>
  );
}
