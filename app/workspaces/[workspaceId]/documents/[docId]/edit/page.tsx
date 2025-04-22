import { SimpleEditor } from "@/components/tiptap-editor/simple/simple-editor";
import content from "@/components/tiptap-editor/simple/data/content.json";

export default function DocumentEditPage() {
  return (
    <div className="p-6">
      <SimpleEditor content={content} />
    </div>
  );
}
