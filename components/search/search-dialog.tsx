import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import clsx from "clsx";
import { SidebarMenuButton } from "../ui/sidebar";
import { SearchResults } from "./search-result";
import { searchWorkspace } from "@/src/app/lib/actions/workspace.actions";
import { useParams } from "next/navigation";
import { WorkspaceSearchResponse } from "@/types/workspace";

export function SearchDialog() {
  const t = useTranslations("Search");
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<WorkspaceSearchResponse | null>(null);

  const { workspaceId } = useParams() as { workspaceId: string };

  const hasQuery = query.trim().length > 0;

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (!hasQuery) return;
      try {
        const res = await searchWorkspace({
          keyword: query,
          workspace_id: workspaceId,
        });
        setResult(res);
      } catch (err) {
        console.error("Search error", err);
        setResult(null);
      }
    }, 200);

    return () => clearTimeout(delayDebounce);
  }, [query, workspaceId]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <SidebarMenuButton className="w-full justify-start text-muted-foreground shadow-sm border">
          <Search className="size-4 text-muted-foreground mr-2" />
          {t("title")}
        </SidebarMenuButton>
      </DialogTrigger>

      <DialogContent className={clsx("w-full max-w-10xl p-0 transition-all")}>
        <div className="space-y-4 p-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              {t("title")}
            </DialogTitle>
          </DialogHeader>

          <Input
            autoFocus
            placeholder={t("inputPlaceholder")}
            className="h-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {hasQuery && result && <SearchResults data={result} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
