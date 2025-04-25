/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input } from "@/components/ui/input";
import SiteLayout from "@/components/layouts/SiteLayout";
import { Button } from "@/components/ui/button";
import CreateWorkspaceForm from "@/components/@workspace/WorkspaceCreateForm";
import WorkspaceGrid from "@/components/@workspace/WorkspaceGrid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function WorkspaceListPage() {
  return (
    <SiteLayout>
      <div className="mb-10 flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Workspaces</h1>
        <div className="flex gap-2">
          {/* <Input
            type="search"
            placeholder="Search workspaces"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md w-full"
          /> */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>+ Create</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Workspace</DialogTitle>
              </DialogHeader>
              {/* <CreateWorkspaceForm /> */}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <WorkspaceGrid />
    </SiteLayout>
  );
}
