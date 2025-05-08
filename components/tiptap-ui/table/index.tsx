"use client";

import * as React from "react";
import { type Editor } from "@tiptap/react";

// --- Hooks ---
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";

// --- UI Primitives ---
import { Button, ButtonProps } from "@/components/tiptap-ui-primitive/button";
import { TableProperties } from "lucide-react";
import { useTranslations } from "next-intl";
import "./table-style.scss";

export interface InsertTableProps extends ButtonProps {
  editor?: Editor | null;
  text?: string;
}

function insertTable(editor: Editor | null): boolean {
  if (!editor) return false;

  return editor
    .chain()
    .focus()
    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
    .run();
}

function useInsertTableButton(
  editor: Editor | null,
  disabled: boolean = false
) {
  const isActive = editor?.isActive("table") ?? false;

  const handleInsert = React.useCallback(() => {
    if (disabled) return false;
    return insertTable(editor);
  }, [editor, disabled]);

  return {
    isActive,
    handleInsert,
  };
}

export const InsertTableButton = React.forwardRef<
  HTMLButtonElement,
  InsertTableProps
>(
  (
    {
      editor: providedEditor,
      text,
      className = "",
      disabled,
      onClick,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const editor = useTiptapEditor(providedEditor);
    const { isActive, handleInsert } = useInsertTableButton(editor, disabled);
    const t = useTranslations("Editor");

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e);
        if (!e.defaultPrevented && !disabled) {
          handleInsert();
        }
      },
      [onClick, disabled, handleInsert]
    );

    if (!editor || !editor.isEditable) {
      return null;
    }

    return (
      <Button
        ref={ref}
        type="button"
        className={className.trim()}
        data-style="ghost"
        data-active-state={isActive ? "on" : "off"}
        role="button"
        tabIndex={-1}
        aria-label={t("add_table")}
        aria-pressed={isActive}
        tooltip={t("add_table")}
        onClick={handleClick}
        {...buttonProps}
      >
        {children || (
          <>
            <TableProperties className="tiptap-button-icon" />
            {text && <span className="tiptap-button-text">{text}</span>}
          </>
        )}
      </Button>
    );
  }
);

InsertTableButton.displayName = "InsertTableButton";

export default InsertTableButton;
