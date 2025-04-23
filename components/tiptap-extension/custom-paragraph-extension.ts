import { Node, mergeAttributes } from "@tiptap/core";
// import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

export const CustomParagraph = Node.create({
  name: "paragraph",
  group: "block",
  content: "inline*",
  draggable: false,

  parseHTML() {
    return [{ tag: "p" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["p", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return () => {
      const dom = document.createElement("div");
      dom.className = "custom-paragraph-wrapper";
      dom.setAttribute("draggable", "true");

      const dragHandle = document.createElement("span");
      dragHandle.className = "custom-drag-handle";
      dragHandle.innerText = "⋮⋮";

      const contentDOM = document.createElement("p");
      contentDOM.className = "custom-paragraph";

      dom.appendChild(dragHandle);
      dom.appendChild(contentDOM);

      // Let ProseMirror handle dragging the whole node
      dragHandle.addEventListener("mousedown", () => {
        dom.setAttribute("draggable", "true");
      });

      return {
        dom,
        contentDOM,
      };
    };
  },
});
