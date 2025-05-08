"use client";

import * as React from "react";

export function CommentSection({ issueId }: { issueId: string }) {
  const [comments, setComments] = React.useState<string[]>([]);
  const [newComment, setNewComment] = React.useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments((prev) => [...prev, newComment]);
      setNewComment(""); // Reset the comment input
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold">Stream</h3>
      <div className="my-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleAddComment}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Comment
        </button>
      </div>

      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="p-4 border rounded-md bg-gray-100">
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
