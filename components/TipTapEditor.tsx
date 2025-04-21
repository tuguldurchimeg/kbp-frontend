"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

export default function TiptapEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write your doc content here...",
      }),
    ],
    content: "",
  });

  return (
    <EditorContent editor={editor} className="border rounded-md p-4 bg-white" />
  );
}
