import Link from "next/link";
import { workspaces } from "@/app/lib/dummyData";
import WorkspaceCard from "@/components/WorkspaceCard";
import { ROUTE } from "@/constants/route.constants";

export default function WorkspaceListPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {workspaces.map((workspace) => (
        <Link
          key={workspace.id}
          href={ROUTE.WORKSPACES.WORKSPACE(workspace.id)}
        >
          <WorkspaceCard item={workspace} />
        </Link>
      ))}
    </div>
  );
}
