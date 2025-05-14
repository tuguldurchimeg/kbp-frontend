"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Send,
  Reply,
  ChevronDown,
  ChevronRight,
  Pencil,
  Trash,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { IssueCommentItem } from "@/types/issue";
import { format, parseISO } from "date-fns";

type CommentProps = {
  comment?: IssueCommentItem;
  onReply?: (reply: string, parentId: string) => void;
  onUpdate?: (text: string) => void;
  onDelete?: () => void;
  onUpdateReply?: (replyId: string, newText: string) => void;
  onDeleteReply?: (replyId: string) => void;
};

export function CommentCard({
  comment,
  onReply,
  onUpdate,
  onDelete,
  onUpdateReply,
  onDeleteReply,
}: CommentProps) {
  const t = useTranslations("comment");
  const commenter = comment?.attributes.user.data.attributes;
  const replies = comment?.attributes.replies?.data ?? [];

  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment?.attributes.comment ?? "");
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editingReplyText, setEditingReplyText] = useState("");

  const handleEdit = () => {
    if (editText.trim()) {
      onUpdate?.(editText.trim());
      setIsEditing(false);
    }
  };

  return (
    <Card className="bg-background px-4 py-3 space-y-2">
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={commenter?.avatar} />
          <AvatarFallback>{commenter?.lastname[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="text-sm font-medium flex items-center justify-between">
            <span>
              {commenter?.lastname[0]} {commenter?.firstname}
            </span>
            <span className="text-xs text-muted-foreground ml-2">
              {comment?.attributes.created_at &&
                format(parseISO(comment.attributes.created_at), "PPpp")}
            </span>
          </div>

          {isEditing ? (
            <>
              <Textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleEdit}>
                  {t("save")}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setEditText(comment?.attributes.comment ?? "");
                    setIsEditing(false);
                  }}
                >
                  {t("cancel")}
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-foreground mt-1">
                {comment?.attributes.comment}
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs px-2"
                    onClick={() => setShowReplyBox(true)}
                  >
                    <Reply className="w-4 h-4 mr-1" />
                    {t("reply")}
                  </Button>
                  {replies.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs px-2 mt-2"
                      onClick={() => setShowReplies((prev) => !prev)}
                    >
                      {showReplies ? (
                        <ChevronDown className="w-4 h-4 mr-1" />
                      ) : (
                        <ChevronRight className="w-4 h-4 mr-1" />
                      )}
                      {showReplies
                        ? t("hideReplies")
                        : `${t("showReplies")} (${replies.length})`}
                    </Button>
                  )}
                </div>
                <div className="space-x-2">
                  <Button
                    variant="ghost"
                    size="xs"
                    className="px-2"
                    onClick={() => setIsEditing(true)}
                  >
                    <Pencil className="size-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    className="px-2"
                    onClick={onDelete}
                  >
                    <Trash className="size-3" />
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* Replies */}
          {showReplies &&
            replies.map((reply) => {
              const isReplyEditing = editingReplyId === reply.id;
              const replier = reply.attributes.user.data.attributes;
              return (
                <div
                  key={reply.id}
                  className="flex items-start py-1 px-2 gap-3 shadow-sm bg-card rounded-xl"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={replier?.avatar} />
                    <AvatarFallback>{replier?.lastname[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="text-sm font-medium flex items-center justify-between">
                      <span>
                        {replier?.lastname[0]} {replier?.firstname}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {reply?.attributes.created_at &&
                          format(parseISO(reply.attributes.created_at), "PPpp")}
                      </span>
                    </div>

                    {isReplyEditing ? (
                      <>
                        <Textarea
                          value={editingReplyText}
                          onChange={(e) => setEditingReplyText(e.target.value)}
                          className="text-sm resize-none mt-1"
                        />
                        <div className="flex gap-2 mt-1">
                          <Button
                            size="sm"
                            onClick={() => {
                              onUpdateReply?.(
                                reply.id,
                                editingReplyText.trim()
                              );
                              setEditingReplyId(null);
                            }}
                            disabled={!editingReplyText.trim()}
                          >
                            {t("save")}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditingReplyId(null);
                              setEditingReplyText("");
                            }}
                          >
                            {t("cancel")}
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between">
                        <p className="text-sm mt-1">
                          {reply.attributes.comment}
                        </p>
                        <div className="flex gap-2 mt-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs px-1"
                            onClick={() => {
                              setEditingReplyId(reply.id);
                              setEditingReplyText(reply.attributes.comment);
                            }}
                          >
                            <Pencil className="size-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs px-1"
                            onClick={() => onDeleteReply?.(reply.id)}
                          >
                            <Trash className="size-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

          {showReplyBox && (
            <div className="space-y-2">
              <Textarea
                rows={2}
                placeholder={t("writeReply")}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="text-sm resize-none"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    if (replyText.trim()) {
                      if (comment) {
                        onReply?.(replyText.trim(), comment.id);
                      }
                      setReplyText("");
                      setShowReplyBox(false);
                    }
                  }}
                  disabled={!replyText.trim()}
                >
                  <Send className="w-4 h-4 mr-1" />
                  {t("send")}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setReplyText("");
                    setShowReplyBox(false);
                  }}
                >
                  {t("cancel")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
