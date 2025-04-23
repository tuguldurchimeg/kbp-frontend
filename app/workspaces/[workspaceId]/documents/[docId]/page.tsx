import DocumentViewer from "@/components/tiptap-editor/simple/document-viewer";
import content from "@/components/tiptap-editor/simple/data/content.json";

export default function DocumentPage() {
  return (
    <div className="p-6">
      <DocumentViewer content={content} />
    </div>
  );
}
