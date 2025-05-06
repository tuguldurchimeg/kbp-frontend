/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import {
  EditorContent,
  EditorContext,
  useEditor,
  BubbleMenu,
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

// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/components/tiptap-icons/link-icon";

// --- Hooks ---
import { useIsMobile } from "@/hooks/use-mobile";
import { useWindowSize } from "@/hooks/use-window-size";

// --- Components ---
import { ThemeToggle } from "@/components/tiptap-editor/simple/theme-toggle";

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";

// --- Styles ---
import "@/components/tiptap-editor/simple/text-editor.scss";
import {
  TextColorButton,
  TextColorContent,
  TextColorPopover,
} from "@/components/tiptap-ui/textcolor-popover/textcolor-popover";
import { FileCheck, Palette, Pencil, Plus } from "lucide-react";
import { DocumentItem, TagCreateParams, TagItem } from "@/types/document";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // adjust the path if needed
import { formatDistanceToNow } from "date-fns";
import { Button as CNButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateDocument } from "@/src/app/lib/actions/document.actions";
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
import { TAG_PLACEHOLDERS } from "@/constants/kb-placeholder-data";
import { TAG_COLORS } from "@/constants/color.constants";
import clsx from "clsx";

type Props = {
  document: DocumentItem;
};

const MainToolbarContent = ({
  onHighlighterClick,
  onTextColorClick,
  onLinkClick,
  isMobile,
}: {
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
        <ImageUploadButton text="Add" />
      </ToolbarGroup>

      <Spacer />

      {isMobile && <ToolbarSeparator />}

      <ToolbarGroup>
        <ThemeToggle />
      </ToolbarGroup>
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

export function SimpleEditor({ document }: Props) {
  const isMobile = useIsMobile();
  const windowSize = useWindowSize();
  const [mobileView, setMobileView] = React.useState<
    "main" | "highlighter" | "link" | "textcolor"
  >("main");
  const [rect, setRect] = React.useState<
    Pick<DOMRect, "x" | "y" | "width" | "height">
  >({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const toolbarRef = React.useRef<HTMLDivElement>(null);

  const editorContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
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

  const [isEditable, setEditable] = React.useState(false);
  const [isTitleEditing, setIsTitleEditing] = React.useState(false);
  const [title, setTitle] = React.useState<string>(document.attributes.title);

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
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
      TrailingNode,
      Link.configure({ openOnClick: false }),
    ],
    content: document.attributes.content,
  });

  React.useEffect(() => {
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

          // If not enough space, scroll until the cursor is the middle of the screen
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

  React.useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  const handleToggleEditable = () => {
    if (editor) {
      editor.setEditable(!isEditable);
    }
    setEditable(!isEditable);
  };

  const handleDocUpdate = async () => {
    if (!editor) return;
    const updatedContent = editor.getJSON();

    const success = await updateDocument(document.id, {
      ...document.attributes,
      content: updatedContent,
    });

    if (success) {
      console.log("Document updated successfully");
      editor.setEditable(false);
      setEditable(false);
    } else {
      console.error("Failed to update document");
    }
  };

  const [tagOpen, setTagOpen] = React.useState(false);
  const [tagInputValue, setTagInputValue] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState<string | null>(null);
  const [selectedTag, setSelectedTag] = React.useState<TagItem>();
  const [allTags, setAllTags] = React.useState<TagItem[]>(TAG_PLACEHOLDERS);
  React.useEffect(() => {
    const fetchTags = async () => {
      // Replace this with real API call later
      const mockTags: TagItem[] = TAG_PLACEHOLDERS;
      setAllTags(mockTags);
    };
    fetchTags();
  }, []);

  const handleSelectTag = (tag: TagItem) => {
    setSelectedTag(tag);
    setSelectedValue(tag.attributes?.name);
    setTagInputValue("");
    setTagOpen(false);
  };

  const handleCreateTag = (name: string) => {
    // const newTag: TagCreateParams = {
    //   name,
    //   description: "",
    //   color: "bg-purple-100 text-purple-800",
    // };
    // createTag(newTag);
    console.log(" Creating tag:", name);
  };

  const handleTagColorChange = async (tag: TagItem, newColor: string) => {
    try {
      // await updateTag(tag.attributes?.id, { ...tag, color: newColor });
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

  return (
    <EditorContext.Provider value={{ editor }}>
      {isEditable && (
        <Toolbar ref={toolbarRef}>
          {mobileView === "main" ? (
            <MainToolbarContent
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

      {isEditable ? (
        <CNButton
          onClick={() => handleDocUpdate()}
          size="lg"
          className={clsx(
            "fixed bottom-15 right-15 h-12 w-12 rounded-xl z-99",
            isMobile && "right-5 bottom-13"
          )}
          aria-label="Update document"
        >
          <FileCheck className="w-5 h-5 " />
        </CNButton>
      ) : (
        <CNButton
          onClick={() => handleToggleEditable()}
          size="lg"
          className={clsx(
            "fixed bottom-15 right-15 h-12 w-12 rounded-xl",
            isMobile && "right-5 bottom-13"
          )}
          aria-label="Toggle edit mode"
        >
          <Pencil className="w-5 h-5 " />
        </CNButton>
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
            placeholder="Untitled document"
          />
        ) : (
          <h1
            className="text-4xl font-bold text-gray-900 cursor-pointer"
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
                <span className="font-medium text-gray-700">
                  {document.attributes?.user.data.attributes?.firstname}{" "}
                  {document.attributes?.user.data.attributes?.lastname}
                </span>
              </div>
            )}
            <span className="text-xs text-gray-500">
              •{" "}
              {document.attributes?.created_at &&
                formatDistanceToNow(new Date(document.attributes?.created_at), {
                  addSuffix: true,
                })}
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
        {(document.attributes.tags?.data.length ?? 0) > 0 &&
          document.attributes.tags?.data.map((tag) => (
            <Badge
              key={tag.id}
              className="text-xs font-medium rounded-lg px-4"
              style={{
                backgroundColor: applyAlpha(tag.attributes?.color, 0.2),
                color: tag.attributes?.color,
              }}
            >
              {tag.attributes?.name}
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
                {selectedValue || "+ Add tag"}
              </CNButton>
            </PopoverTrigger>
            <PopoverContent className="w-[240px] py-1 px-0">
              <Command>
                <CommandInput
                  placeholder="Search tags..."
                  value={tagInputValue}
                  onValueChange={setTagInputValue}
                />
                <CommandList>
                  {allTags.map((tag) => (
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
                            <button
                              key={color}
                              className={`w-6 h-6 rounded-sm border hover:ring-2 hover:ring-offset-2 transition-colors`}
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
                        <span>Create tag “{tagInputValue}”</span>
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
              <LinkButton onClick={() => setMobileView("link")} />
              <TextAlignPopover editor={editor} />
            </div>
          </BubbleMenu>
        )}

        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content h-full"
        />
      </div>
    </EditorContext.Provider>
  );
}
