import { Input } from "@/components/ui/input";
import SiteLayout from "@/components/layouts/SiteLayout";

export default function WorkspaceListPage() {
  return (
    <SiteLayout>
      <div className=" mb-10 space-y-4 flex justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
        <div className="">
          <Input
            type="search"
            placeholder="Search workspaces"
            className="max-w-md w-full"
          />
        </div>
      </div>
    </SiteLayout>
  );
}
