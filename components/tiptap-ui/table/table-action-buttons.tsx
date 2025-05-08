"use client";

import * as React from "react";
import { Editor } from "@tiptap/react";
import { useTranslations } from "next-intl";

import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  ArrowUpFromLine,
  ArrowDownFromLine,
  Trash,
  Rows3,
  Columns3,
  TableCellsMerge,
  TableCellsSplit,
  TableColumnsSplit,
  TableRowsSplit,
} from "lucide-react";

import { Button } from "@/components/tiptap-ui-primitive/button";

export const ColumnAddLeftButton = ({ editor }: { editor: Editor }) => {
  const t = useTranslations("Editor");
  return (
    <Button
      type="button"
      data-style="ghost"
      className="w-8 h-8"
      onClick={() => editor.chain().focus().addColumnBefore().run()}
      tooltip={t("add_column_before")}
    >
      <ArrowLeftFromLine className="w-4 h-4" />
    </Button>
  );
};

export const ColumnAddRightButton = ({ editor }: { editor: Editor }) => {
  const t = useTranslations("Editor");
  return (
    <Button
      type="button"
      data-style="ghost"
      className="w-8 h-8"
      onClick={() => editor.chain().focus().addColumnAfter().run()}
      tooltip={t("add_column_after")}
    >
      <ArrowRightFromLine className="w-4 h-4" />
    </Button>
  );
};

export const ColumnDeleteButton = ({ editor }: { editor: Editor }) => {
  const t = useTranslations("Editor");
  return (
    <Button
      type="button"
      data-style="ghost"
      className="w-8 h-8"
      onClick={() => editor.chain().focus().deleteColumn().run()}
      tooltip={t("delete_column")}
    >
      <TableColumnsSplit className="w-4 h-4" />
    </Button>
  );
};

export const RowAddTopButton = ({ editor }: { editor: Editor }) => {
  const t = useTranslations("Editor");
  return (
    <Button
      type="button"
      data-style="ghost"
      className="w-8 h-8"
      onClick={() => editor.chain().focus().addRowBefore().run()}
      tooltip={t("add_row_before")}
    >
      <ArrowUpFromLine className="w-4 h-4" />
    </Button>
  );
};

export const RowAddBottomButton = ({ editor }: { editor: Editor }) => {
  const t = useTranslations("Editor");
  return (
    <Button
      type="button"
      data-style="ghost"
      className="w-8 h-8"
      onClick={() => editor.chain().focus().addRowAfter().run()}
      tooltip={t("add_row_after")}
    >
      <ArrowDownFromLine className="w-4 h-4" />
    </Button>
  );
};

export const RowDeleteButton = ({ editor }: { editor: Editor }) => {
  const t = useTranslations("Editor");
  return (
    <Button
      type="button"
      data-style="ghost"
      className="w-8 h-8"
      onClick={() => editor.chain().focus().deleteRow().run()}
      tooltip={t("delete_row")}
    >
      <TableRowsSplit className="w-4 h-4" />
    </Button>
  );
};

export const TableDeleteButton = ({ editor }: { editor: Editor }) => {
  const t = useTranslations("Editor");
  return (
    <Button
      type="button"
      data-style="ghost"
      className="w-8 h-8"
      onClick={() => editor.chain().focus().deleteTable().run()}
      tooltip={t("delete_table")}
    >
      <Trash className="w-4 h-4" />
    </Button>
  );
};

export const ToggleHeaderRowButton = ({ editor }: { editor: Editor }) => {
  const t = useTranslations("Editor");
  return (
    <Button
      type="button"
      data-style="ghost"
      className="w-8 h-8"
      onClick={() => editor.chain().focus().toggleHeaderRow().run()}
      tooltip={t("toggle_header_row")}
    >
      <Rows3 className="w-4 h-4" />
    </Button>
  );
};

export const ToggleHeaderColumnButton = ({ editor }: { editor: Editor }) => {
  const t = useTranslations("Editor");
  return (
    <Button
      type="button"
      data-style="ghost"
      className="w-8 h-8"
      onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
      tooltip={t("toggle_header_column")}
    >
      <Columns3 className="w-4 h-4" />
    </Button>
  );
};

export const MergeCellsButton = ({ editor }: { editor: Editor }) => {
  const t = useTranslations("Editor");
  return (
    <Button
      type="button"
      data-style="ghost"
      className="w-8 h-8"
      onClick={() => editor.chain().focus().mergeCells().run()}
      tooltip={t("merge_cells")}
    >
      <TableCellsMerge className="w-4 h-4" />
    </Button>
  );
};

export const SplitCellsButton = ({ editor }: { editor: Editor }) => {
  const t = useTranslations("Editor");
  return (
    <Button
      type="button"
      data-style="ghost"
      className="w-8 h-8"
      onClick={() => editor.chain().focus().splitCell().run()}
      tooltip={t("split-cells")}
    >
      <TableCellsSplit className="w-4 h-4" />
    </Button>
  );
};
