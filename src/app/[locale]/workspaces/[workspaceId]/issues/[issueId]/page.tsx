"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getIssue, updateIssue } from "@/src/app/lib/actions/issue.actions";
import { getUsers } from "@/src/app/lib/actions/user.actions";
import { IssueItem, IssueUpdateParams } from "@/types/issue";
import { UserItem } from "@/types/user";
import { DocumentItem } from "@/types/document";

import { useStatusAndPriorityMaps } from "@/constants/issue.constants";
import { useTranslations } from "next-intl";

import { SettingsIcon, Plus, Pencil } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommentSection } from "@/components/@issue/comment-section";
import DocumentCard from "@/components/@documents/document-card";
import { Label } from "@/components/ui/label";
import { EditIssueDialog } from "@/components/@issue/edit-issue-dialog";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

export default function IssuePage() {
  const params = useParams();
  const id = params?.issueId as string;
  const t = useTranslations("ISSUE");

  const [issue, setIssue] = useState<IssueItem | null>(null);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [editOpen, setEditOpen] = useState(false);

  const { STATUS_MAP, PRIORITY_MAP, TYPE_MAP } = useStatusAndPriorityMaps();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [issueRes, userList] = await Promise.all([
          getIssue(id),
          getUsers(),
        ]);
        setIssue(issueRes);
        setUsers(userList);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (!issue) return null;

  const {
    title,
    description,
    status,
    priority,
    issue_type,
    created_by,
    assignees,
    documents_count,
    documents,
    created_at,
  } = issue.attributes;

  const stat = STATUS_MAP[status as keyof typeof STATUS_MAP];
  const prio = PRIORITY_MAP[priority as keyof typeof PRIORITY_MAP];
  const type = TYPE_MAP[issue_type as keyof typeof TYPE_MAP];

  const handleUpdatedIssue = async (updated: IssueUpdateParams) => {
    try {
      await updateIssue(updated).then((res) => {
        setIssue(res);
      });
    } catch (error) {
      toast.error(t("SYSCOMMON.update_failed"));
      console.error("Tag update failed:", error);
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto px-4 py-10 space-y-12">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div className="flex-1 space-y-4">
          <div className="flex-1">
            <div className="flex gap-3 items-center">
              <h1 className="text-3xl font-semibold break-words">{title}</h1>
              <Button
                onClick={() => setEditOpen(true)}
                variant="secondary"
                size="icon"
              >
                <Pencil />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("issue_id")}#{issue.id}
            </p>
          </div>

          <p className="text-sm text-foreground-2 mt-2 break-words">
            {description}
          </p>

          <div className="flex flex-wrap gap-4">
            <div>
              <Label className="text-xs text-muted-foreground font-medium mb-1">
                {t("status")}
              </Label>
              <Button variant="outline">
                <stat.icon className={`${stat.textColor}`} />
                {stat.label}
              </Button>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground font-medium mb-1">
                {t("priority")}
              </Label>
              <Button variant="outline">
                <SettingsIcon className={`text-${prio.color}`} />
                {prio.label}
              </Button>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground font-medium mb-1">
                {t("type")}
              </Label>
              <Button variant="outline">
                <type.icon className={`text-${type.color}`} />
                {type.label}
              </Button>
            </div>
          </div>
        </div>

        <div className="hidden md:block w-px h-45 bg-muted mx-2" />

        <div className="flex flex-col items-start justify-between flex-wrap gap-8 ">
          <div>
            <Label className="text-sm text-muted-foreground font-medium my-2">
              {t("created")}
            </Label>
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={created_by.data.attributes.avatar || undefined}
                />
                <AvatarFallback>
                  {created_by.data.attributes.firstname[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">
                  {created_by.data.attributes.firstname}{" "}
                  {created_by.data.attributes.lastname}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(created_at), "PPPp")}
                </p>
              </div>
            </div>
          </div>

          {assignees?.data?.length > 0 && (
            <div>
              <Label className="text-sm text-muted-foreground font-medium my-2">
                {t("assignees")}
              </Label>
              <div className="flex items-center gap-2">
                {assignees.data.map((user: UserItem) => (
                  <Avatar
                    key={user.id}
                    className="size-8"
                    title={`${user.attributes.firstname} ${user.attributes.lastname}`}
                  >
                    <AvatarImage src={user.attributes.avatar} />
                    <AvatarFallback>
                      {user.attributes.firstname[0]}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Separator />
      {/* Documents */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">
            {t("documents")} ({documents_count})
          </h3>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            {t("connect_document")}
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {documents?.data?.map((doc: DocumentItem) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      </div>

      <CommentSection issue={issue} />

      {/* Edit Dialog */}
      <EditIssueDialog
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        issue={issue}
        users={users}
        onUpdate={handleUpdatedIssue}
      />
    </div>
  );
}
