"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { ISSUEDATA } from "@/constants/kb-placeholder-data";
import { CommentSection } from "@/components/@issue/comment-section";

export default function IssueDetailPage() {
  const pathname = usePathname();
  const issueId = pathname.split("/").pop();
  const issue = ISSUEDATA.find((item) => item.id === issueId);

  if (!issue) {
    return <div>Issue not found</div>;
  }

  return (
    <div className="space-y-8 p-4">
      {/* Issue Details */}
      <div className="flex space-x-8">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">{issue.attributes.title}</h1>
          <p className="text-sm text-gray-500">{`#${issue.id}`}</p>
          <div className="mt-4">
            <p>
              <strong>Status:</strong> {issue.attributes.status}
            </p>
            <p>
              <strong>Priority:</strong> {issue.attributes.priority}
            </p>
            <p>
              <strong>Type:</strong> {issue.attributes.issue_type}
            </p>
            <p className="mt-2">
              <strong>Description:</strong> {issue.attributes.description}
            </p>
          </div>
        </div>
        <div className="flex-none w-1/3">
          <h3 className="text-lg font-medium">Assigned User</h3>
          <div className="flex items-center mt-2">
            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
              {issue.attributes.created_by.data.attributes.firstname[0]}
            </div>
            <span className="ml-2">
              {issue.attributes.created_by.data.attributes.firstname}{" "}
              {issue.attributes.created_by.data.attributes.lastname}
            </span>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <CommentSection issueId={issue.id} />
    </div>
  );
}
