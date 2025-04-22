import content from "@/components/tiptap-editor/simple/data/content.json";
import { DocumentItem } from "@/types/document";

export async function getDocumentById(
  workspaceId: string,
  docId: string
): Promise<DocumentItem> {
  // In real app, fetch from DB (e.g., Prisma, Mongo, Postgres)
  // For now, just return mock data
  return {
    id: docId,
    title: `Sample Document (${docId})`,
    content: content,
  };
}
