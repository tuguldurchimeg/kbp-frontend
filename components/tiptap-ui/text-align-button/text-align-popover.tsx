"use client";

import * as React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/tiptap-ui-primitive/popover";
import { Button } from "@/components/tiptap-ui-primitive/button";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";
import { Editor } from "@tiptap/react";
import { EllipsisVertical } from "lucide-react";

export interface TextAlignPopoverProps {
  editor?: Editor | null;
}

export function TextAlignPopover({ editor }: TextAlignPopoverProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  if (!editor || !editor.isEditable) return null;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          data-style="ghost"
          data-appearance="default"
          role="button"
          tabIndex={-1}
          aria-label="More text options"
          tooltip="More"
          data-active-state={isOpen ? "on" : "off"}
        >
          <EllipsisVertical className="tiptap-button-icon w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="bottom"
        className="tiptap-bubble-popover"
        aria-label="Text alignment options"
      >
        <div className="tiptap-button-group" data-orientation="horizontal">
          <TextAlignButton editor={editor} align="left" />
          <TextAlignButton editor={editor} align="center" />
          <TextAlignButton editor={editor} align="right" />
          <TextAlignButton editor={editor} align="justify" />
        </div>
      </PopoverContent>
    </Popover>
  );
}
