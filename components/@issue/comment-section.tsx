"use client";

import { useCallback, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CommentCard } from "./comment-card";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  createIssueComment,
  deleteIssueComment,
  getIssueComments,
  updateIssueComment,
} from "@/src/app/lib/actions/issue.actions";
import { IssueCommentItem, IssueItem } from "@/types/issue";
import { getUser } from "@/utils/api";
import { CommentSkeleton } from "./comment-skeleton";

export function CommentSection({ issue }: { issue: IssueItem }) {
  const t = useTranslations();
  const [input, setInput] = useState("");
  const [comments, setComments] = useState<IssueCommentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = getUser();

  const fetchComments = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await getIssueComments({ issue_id: issue.id });
      setComments(result);
    } catch (err) {
      console.error("Failed to load comments", err);
    } finally {
      setIsLoading(false);
    }
  }, [issue]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleAddComment = async () => {
    if (!input.trim()) return;
    await createIssueComment({
      user_id: user.id,
      comment: input.trim(),
      issue_id: issue.id,
    });
    setInput("");
    fetchComments();
  };

  const handleReply = async (reply: string, parentId: string) => {
    await createIssueComment({
      user_id: user.id,
      comment: reply,
      issue_id: issue.id,
      parent_id: parentId,
    });
    fetchComments();
  };

  const handleUpdate = async (item: IssueCommentItem, newText: string) => {
    await updateIssueComment({
      id: item.id,
      params: {
        ...item.attributes,
        comment: newText,
        issue_id: issue.id,
        user_id: user.id,
      },
    });
    fetchComments();
  };

  const handleDelete = async (commentId: string) => {
    await deleteIssueComment(commentId);
    fetchComments();
  };

  return (
    <div className="space-y-6">
      {isLoading
        ? Array.from({ length: 3 }).map((_, idx) => (
            <CommentSkeleton key={idx} />
          ))
        : comments?.map((c) => (
            <CommentCard
              key={c.id}
              comment={c}
              onReply={(text, parentId) => handleReply(text, parentId)}
              onUpdate={(text) => handleUpdate(c, text)}
              onDelete={() => handleDelete(c.id)}
              onUpdateReply={(replyId, text) =>
                handleUpdate(
                  c.attributes.replies.data.find((r) => r.id === replyId)!,
                  text
                )
              }
              onDeleteReply={(replyId) => handleDelete(replyId)}
            />
          ))}

      <div className="space-y-2">
        <Textarea
          placeholder={t("comment.write")}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="resize-none"
        />
        <Button onClick={handleAddComment} className="ml-auto block">
          <Send />
        </Button>
      </div>
    </div>
  );
}
