import DocumentViewer from "@/components/tiptap-editor/simple/document-viewer";
import Link from "next/link";
import content from "@/components/tiptap-editor/simple/data/content.json";

export default function DocumentPage({
  params,
}: {
  params: { workspaceId: string; docId: string };
}) {
  return (
    <div className="p-6">
      <DocumentViewer content={content} />
      <Link
        href={`/workspaces/${params.workspaceId}/documents/${params.docId}/edit`}
        className="mt-4 inline-block text-blue-600 underline"
      >
        Edit Document
      </Link>
    </div>
  );
}
