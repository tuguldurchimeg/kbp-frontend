"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { exportToDocx, exportToPdf } from "@/lib/doc-export-utils";
import { Editor } from "@tiptap/react";
import { Button as TButton } from "../tiptap-ui-primitive/button";

type Props = {
  editor: Editor;
  title: string;
};

export default function ExportButton({ editor, title }: Props) {
  const t = useTranslations("EXPORT");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <TButton data-style="ghost" aria-label={t("buttonLabel")}>
          <Download className="size-4" />
        </TButton>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-2 flex flex-col gap-1">
        <Button
          variant="ghost"
          className="justify-start text-xs"
          onClick={() => {
            if (!editor) return;
            const html = editor.getHTML();
            exportToPdf(html, title);
          }}
        >
          <Download className="size-3.5 text-red-500 mr-2" />
          {t("pdf")}
        </Button>
        <Button
          variant="ghost"
          className="justify-start text-xs"
          onClick={() => {
            if (!editor) return;
            const html = editor.getHTML();
            exportToDocx(html, title);
          }}
        >
          <Download className="size-3.5 text-blue-500 mr-2" />
          {t("docx")}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
