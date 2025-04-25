import SiteLayout from "@/components/layouts/SiteLayout";
import CreateWorkspaceForm from "@/components/@workspace/WorkspaceCreateForm";
import WorkspaceCardList from "@/components/@workspace/WorkspaceCardList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PrivateRoute from "@/components/PrivateRoute";
import { Button } from "@/components/ui/button";

export default function WorkspaceListPage() {
  return (
    <PrivateRoute>
      <SiteLayout>
        <div className=" my-10 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Workspaces</h1>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button>+ Create</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Workspace</DialogTitle>
                </DialogHeader>
                <CreateWorkspaceForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <WorkspaceCardList />
      </SiteLayout>
    </PrivateRoute>
  );
}
