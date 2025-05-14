"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CommentCard } from "./comment-card";
import { SendHorizonal } from "lucide-react";

export function CommentSection() {
  const [comments, setComments] = useState<{ message: string; user: string }[]>(
    []
  );
  const [input, setInput] = useState("");

  const handleAddComment = () => {
    if (!input.trim()) return;
    setComments((prev) => [
      ...prev,
      { user: "Tatum Paolo", message: input.trim() },
    ]);
    setInput("");
  };

  return (
    <div className="space-y-6">
      {comments.map((c, i) => (
        <CommentCard key={i} user={c.user} message={c.message} />
      ))}

      <div className="space-y-2">
        <Textarea
          placeholder="Write a comment…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="resize-none"
        />
        <Button onClick={handleAddComment} className="ml-auto block">
          <SendHorizonal />
        </Button>
      </div>
    </div>
  );
}
