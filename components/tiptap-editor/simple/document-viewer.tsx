"use client";

import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { TextAlign } from "@tiptap/extension-text-align";
import { Underline } from "@tiptap/extension-underline";
import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";
import { Highlight } from "@tiptap/extension-highlight";
import { Typography } from "@tiptap/extension-typography";
import { Superscript } from "@tiptap/extension-superscript";
import { Subscript } from "@tiptap/extension-subscript";
import { Image } from "@tiptap/extension-image";
import { BulletList } from "@tiptap/extension-bullet-list";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { ListItem } from "@tiptap/extension-list-item";
import { CodeBlock } from "@tiptap/extension-code-block";
import { HorizontalRule } from "@tiptap/extension-horizontal-rule";

import { Link } from "@/components/tiptap-extension/link-extension";
import { TrailingNode } from "@/components/tiptap-extension/trailing-node-extension";
import { Selection } from "@/components/tiptap-extension/selection-extension";
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";

import { MAX_FILE_SIZE, handleImageUpload } from "@/lib/tiptap-utils";

// ✨ Import styles
import "@/components/tiptap-editor/simple/simple-editor.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

type Props = {
  content: JSONContent;
};

export default function DocumentViewer({ content }: Props) {
  const editor = useEditor({
    editable: false,
    content,
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
        codeBlock: false,
        horizontalRule: false,
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      TaskList,
      TaskItem,
      Highlight,
      Typography,
      Superscript,
      Subscript,
      Image,
      BulletList,
      OrderedList,
      ListItem,
      CodeBlock,
      HorizontalRule,
      Link,
      Selection,
      TrailingNode,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (err) => console.error("Viewer image upload error:", err),
      }),
    ],
  });

  return (
    <div className="content-wrapper h-full overflow-y-auto px-4 pb-4">
      <EditorContent
        editor={editor}
        role="presentation"
        className="simple-editor-content h-full"
      />
    </div>
  );
}
