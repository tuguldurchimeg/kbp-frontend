import Link from "next/link";
import { workspaces } from "@/lib/dummyData";
import WorkspaceCard from "@/components/workspace/WorkspaceCard";
import { ROUTE } from "@/constants/route.constants";
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
        {workspaces.map((workspace) => (
          <Link
            key={workspace.id}
            href={ROUTE.WORKSPACES.WORKSPACE(workspace.id)}
          >
            <WorkspaceCard item={workspace} />
          </Link>
        ))}
      </div>
    </SiteLayout>
  );
}
