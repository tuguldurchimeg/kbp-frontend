import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  ColumnAddLeftButton,
  ColumnAddRightButton,
  ColumnDeleteButton,
  RowAddTopButton,
  RowAddBottomButton,
  RowDeleteButton,
  TableDeleteButton,
  ToggleHeaderRowButton,
  ToggleHeaderColumnButton,
  MergeCellsButton,
  SplitCellsButton,
} from "./table-action-buttons";
import { Editor } from "@tiptap/react";
import { Button } from "@/components/tiptap-ui-primitive/button";
import { ChevronsDown } from "lucide-react";

const TableBubbleMenu = ({ editor }: { editor: Editor }) => {
  if (!editor || !editor.isEditable || !editor.isActive("table")) return null;
  return (
    <Popover>
      <PopoverTrigger>
        <Button className="bg-primary-light">
          <ChevronsDown />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="flex flex-wrap gap-2 p-2 bg-background shadow-lg border rounded-md"
        style={{ width: "auto", maxWidth: "250px" }}
        align="start"
        side="bottom"
      >
        <ColumnAddLeftButton editor={editor} />
        <ColumnAddRightButton editor={editor} />
        <RowAddTopButton editor={editor} />
        <RowAddBottomButton editor={editor} />
        <ColumnDeleteButton editor={editor} />
        <RowDeleteButton editor={editor} />
        <MergeCellsButton editor={editor} />
        <SplitCellsButton editor={editor} />
        <ToggleHeaderRowButton editor={editor} />
        <ToggleHeaderColumnButton editor={editor} />
        <TableDeleteButton editor={editor} />
      </PopoverContent>
    </Popover>
  );
};

export default TableBubbleMenu;
