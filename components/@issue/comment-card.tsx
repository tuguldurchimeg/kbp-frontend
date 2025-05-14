"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useState } from "react";

type CommentProps = {
  user: string;
  avatar?: string;
  message: string;
  timestamp?: string;
};

export function CommentCard({
  user,
  avatar,
  message,
  timestamp = "Now",
}: CommentProps) {
  const [reply, setReply] = useState("");

  return (
    <Card className="bg-muted/40 p-4 space-y-3">
      <div className="flex items-start gap-3">
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>{user[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="text-sm font-semibold">
            {user}{" "}
            <span className="text-xs text-muted-foreground ml-1">
              {timestamp}
            </span>
          </div>
          <div className="text-sm text-foreground mt-1">{message}</div>
        </div>
      </div>

      <Textarea
        placeholder="Reply to thread..."
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        className="text-sm resize-none"
      />
    </Card>
  );
}
