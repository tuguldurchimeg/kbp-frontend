import DataTable from "@/components/@tags/data-table";
import TagCreateForm from "@/components/@tags/tag-create-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Tag } from "lucide-react";

export default function Page() {
  return (
    <main className="w-full px-10">
      <DataTable />

      <Dialog>
        <DialogTrigger asChild>
          <Button className="fixed bottom-15 right-15 h-12 w-12 rounded-xl hover:bg-purple-700">
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-primary flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Create New Tag
            </DialogTitle>
          </DialogHeader>
          <TagCreateForm />
        </DialogContent>
      </Dialog>
    </main>
  );
}
