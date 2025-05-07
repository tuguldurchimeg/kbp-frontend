import Link from "next/link";
import { Paperclip, FileText, ArrowDownToLine } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FileItem } from "@/types/document";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ROUTE } from "@/constants/route.constants";

export function FileResults({ data }: { data: FileItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((file) => (
        <FileCard key={file.id} file={file} />
      ))}
    </div>
  );
}

function FileCard({ file }: { file: FileItem }) {
  const documents = file.attributes.documents?.data ?? [];
  const firstDoc = documents[0];
  const restDocs = documents.slice(1);
  const hasExtra = documents.length > 1;

  return (
    <Card className="rounded-xl border p-4 text-sm flex flex-col justify-between gap-2">
      <CardContent className="space-y-1 p-0 flex flex-col h-full">
        {/* File name with tooltip */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-2">
              <Link
                href={file.attributes.url}
                target="_blank"
                className="flex items-center gap-2 text-foreground-2 font-medium hover:underline truncate"
              >
                <Paperclip className="w-4 h-4 min-w-4 shrink-0" />
                <span className="truncate">{file.attributes.name}</span>
              </Link>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top">{file.attributes.name}</TooltipContent>
        </Tooltip>

        {/* Document link with dropdown for extras */}
        <div className="space-y-1 text-xs text-muted-foreground ml-0.5 mt-0.5">
          {firstDoc && (
            <div className="flex items-center gap-2 truncate">
              <FileText className="w-3 h-3 min-w-3 shrink-0" />
              <Link
                href={ROUTE.BASE.DOCUMENT.DETAIL(
                  firstDoc.attributes.workspace_id,
                  firstDoc.id
                )}
                className="truncate hover:underline"
              >
                {firstDoc.attributes.title}
              </Link>
            </div>
          )}

          {hasExtra && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className="pl-4 text-muted-foreground text-xs italic hover:underline cursor-pointer">
                  +{restDocs.length}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-45 px-2 space-y-1 text-xs text-muted-foreground">
                {restDocs.map((doc) => (
                  <DropdownMenuItem
                    key={doc.id}
                    asChild
                    className="flex items-start gap-2 cursor-pointer"
                  >
                    <Link
                      href={ROUTE.BASE.DOCUMENT.DETAIL(
                        doc.attributes.workspace_id,
                        doc.id
                      )}
                      className="hover:underline break-words whitespace-normal text-sm"
                    >
                      <div className="flex items-start gap-2">
                        <FileText className="w-3 h-3 min-w-3 shrink-0 mt-0.5" />
                        {doc.attributes.title}
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-0 border-t [.border-t]:pt-2 text-xs text-muted-foreground flex justify-between">
        <div>
          <span>{file.attributes.size ?? "-"}</span>{" "}
          <span>.{file.attributes.fileType ?? "Unknown"}</span>
        </div>
        <Link
          href={file.attributes.url}
          download
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowDownToLine className="w-4 h-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
