"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { WorkspaceItem } from "@/types/workspace";
import WorkspaceCard from "@/components/@workspace/WorkspaceCard";
import { ROUTE } from "@/constants/route.constants";
import { getWorkspaces } from "@/app/lib/actions/workspace.actions";

export default function WorkspaceGrid() {
  const [workspaces, setWorkspaces] = useState<WorkspaceItem[]>([]);

  useEffect(() => {
    getWorkspaces().then(setWorkspaces);
  }, []);

  return (
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
  );
}
