"use client";

import * as React from "react";
import { Editor, isNodeSelection } from "@tiptap/react";

// --- UI ---
import { Button, ButtonProps } from "@/components/tiptap-ui-primitive/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/tiptap-ui-primitive/popover";
import { Separator } from "@/components/tiptap-ui-primitive/separator";

// --- Icons ---
import { BanIcon } from "@/components/tiptap-icons/ban-icon";
import { Palette } from "lucide-react";

// --- Hooks & Utils ---
import { useMenuNavigation } from "@/hooks/use-menu-navigation";
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";
import { isMarkInSchema } from "@/app/lib/tiptap-utils";

// --- Types ---
export interface TextColor {
  label: string;
  value: string;
  border?: string;
}

export const DEFAULT_TEXT_COLORS: TextColor[] = [
  { label: "Black", value: "#000000" },
  { label: "Red", value: "#ef4444" },
  { label: "Blue", value: "#3b82f6" },
  { label: "Green", value: "#22c55e" },
  { label: "Purple", value: "#8b5cf6" },
];

export const useTextColor = (editor: Editor | null) => {
  const markAvailable = isMarkInSchema("textStyle", editor);

  const getActiveColor = React.useCallback(() => {
    if (!editor) return null;
    const attrs = editor.getAttributes("textStyle");
    return attrs?.color ?? null;
  }, [editor]);

  const setTextColor = React.useCallback(
    (color: string) => {
      if (!editor) return;
      if (color === "none") {
        editor.chain().focus().unsetMark("textStyle").run();
      } else {
        editor.chain().focus().setColor(color).run();
      }
    },
    [editor]
  );

  return {
    markAvailable,
    getActiveColor,
    setTextColor,
  };
};

export const TextColorButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => (
    <Button
      type="button"
      className={className}
      data-style="ghost"
      data-appearance="default"
      role="button"
      tabIndex={-1}
      aria-label="Text color"
      tooltip="Text color"
      ref={ref}
      {...props}
    >
      {children || <Palette className="tiptap-button-icon w-4 h-4" />}
    </Button>
  )
);

TextColorButton.displayName = "TextColorButton";

export function TextColorContent({
  editor: providedEditor,
  colors = DEFAULT_TEXT_COLORS,
  onClose,
}: {
  editor?: Editor | null;
  colors?: TextColor[];
  onClose?: () => void;
}) {
  const editor = useTiptapEditor(providedEditor);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { getActiveColor, setTextColor } = useTextColor(editor);
  const activeColor = getActiveColor();

  const menuItems = [...colors, { label: "Remove text color", value: "none" }];
  const { selectedIndex } = useMenuNavigation({
    containerRef,
    items: menuItems,
    orientation: "both",
    onSelect: (item) => {
      setTextColor(item.value);
      onClose?.();
    },
    onClose,
    autoSelectFirstItem: false,
  });

  return (
    <div ref={containerRef} className="tiptap-highlight-content" tabIndex={0}>
      <div className="tiptap-button-group" data-orientation="horizontal">
        {colors.map((color, index) => (
          <Button
            key={color.value}
            type="button"
            role="menuitem"
            data-active-state={activeColor === color.value ? "on" : "off"}
            aria-label={`${color.label} text color`}
            tabIndex={index === selectedIndex ? 0 : -1}
            data-style="ghost"
            onClick={() => setTextColor(color.value)}
            data-highlighted={selectedIndex === index}
          >
            <span
              className="tiptap-button-highlight"
              style={
                { "--highlight-color": color.value } as React.CSSProperties
              }
            />
          </Button>
        ))}
      </div>

      <Separator />

      <div className="tiptap-button-group">
        <Button
          onClick={() => setTextColor("none")}
          aria-label="Remove text color"
          tabIndex={selectedIndex === colors.length ? 0 : -1}
          type="button"
          role="menuitem"
          data-style="ghost"
          data-highlighted={selectedIndex === colors.length}
        >
          <BanIcon className="tiptap-button-icon" />
        </Button>
      </div>
    </div>
  );
}

export function TextColorPopover({
  editor: providedEditor,
  colors = DEFAULT_TEXT_COLORS,
  hideWhenUnavailable = false,
  ...props
}: {
  editor?: Editor | null;
  colors?: TextColor[];
  hideWhenUnavailable?: boolean;
}) {
  const editor = useTiptapEditor(providedEditor);
  const { markAvailable } = useTextColor(editor);
  const [isOpen, setIsOpen] = React.useState(false);

  const isDisabled =
    !editor ||
    !markAvailable ||
    editor.isActive("code") ||
    editor.isActive("codeBlock") ||
    editor.isActive("imageUpload");

  const canSetMark = editor?.can().setColor?.("red") ?? false;

  const show =
    !hideWhenUnavailable ||
    (canSetMark && !isNodeSelection(editor?.state.selection));

  if (!show || !editor || !editor.isEditable) {
    return null;
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <TextColorButton
          disabled={isDisabled}
          data-active-state={editor?.isActive("textStyle") ? "on" : "off"}
          data-disabled={isDisabled}
          aria-pressed={editor?.isActive("textStyle")}
          {...props}
        />
      </PopoverTrigger>
      <PopoverContent side="bottom" align="center" aria-label="Text colors">
        <TextColorContent
          editor={editor}
          colors={colors}
          onClose={() => setIsOpen(false)}
        />
      </PopoverContent>
    </Popover>
  );
}
