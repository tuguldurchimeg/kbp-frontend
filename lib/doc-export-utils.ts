import * as htmlDocx from "html-docx-js/dist/html-docx";
import html2pdf from "html2pdf.js";

export const exportToDocx = (html: string, title: string) => {
  const fullHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${title}</title></head><body>${html}</body></html>`;
  const converted = htmlDocx.asBlob(fullHtml);
  const url = URL.createObjectURL(converted);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${title || "document"}.docx`;
  link.click();
  URL.revokeObjectURL(url);
};

export const exportToPdf = (html: string, title: string) => {
  const wrapper = document.createElement("div");
  wrapper.style.padding = "20px";
  wrapper.style.fontFamily = "Arial, sans-serif";
  wrapper.style.fontSize = "14px";
  wrapper.style.lineHeight = "1.6";
  wrapper.style.color = "#000";

  const titleElement = document.createElement("h2");
  titleElement.innerText = title || "Document";
  titleElement.style.marginBottom = "1em";

  wrapper.appendChild(titleElement);
  const contentContainer = document.createElement("div");
  contentContainer.innerHTML = html;
  wrapper.appendChild(contentContainer);

  html2pdf()
    .set({
      margin: 10,
      filename: `${title || "document"}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    })
    .from(wrapper)
    .save();
};
