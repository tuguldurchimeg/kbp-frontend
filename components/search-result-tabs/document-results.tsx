import { FolderCog } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DocumentItem } from "@/types/document";
import { JSONContent } from "@tiptap/react";
import Link from "next/link";
import { ROUTE } from "@/constants/route.constants";

function extractTextFromTiptap(json: JSONContent | undefined): string {
  if (!json) return "";
  let result = "";
  function recurse(node: JSONContent) {
    if (node.type === "text") result += node.text + " ";
    if (node.content) node.content.forEach(recurse);
  }
  recurse(json);
  return result.trim();
}

export function DocumentResults({ data }: { data: DocumentItem[] }) {
  return (
    <div className="space-y-2">
      {data.map((doc) => {
        const contentText = extractTextFromTiptap(doc.attributes.content);

        return (
          <Card key={doc.id}>
            <CardContent className="space-y-1 text-sm">
              <Link
                href={ROUTE.BASE.DOCUMENT.DETAIL(
                  doc.attributes.workspace_id,
                  doc.id
                )}
                className="text-foreground-2 font-semibold hover:underline"
              >
                {doc.attributes.title}
              </Link>

              {doc.attributes.category?.data?.attributes?.name && (
                <div className="flex items-center gap-1 text-xs text-primary">
                  <FolderCog className="w-3 h-3" />
                  {doc.attributes.category.data.attributes.name}
                </div>
              )}

              {contentText && (
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {contentText}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
