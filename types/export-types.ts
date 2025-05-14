declare module "html-docx-js/dist/html-docx" {
  const content: {
    asBlob: (html: string, options?: Record<string, unknown>) => Blob;
  };
  export = content;
}

declare module "html2pdf.js" {
  interface Html2PdfOptions {
    margin?: number | number[];
    filename?: string;
    image?: { type?: string; quality?: number };
    html2canvas?: object;
    jsPDF?: { unit?: string; format?: string | string[]; orientation?: string };
  }

  type Html2Pdf = {
    set: (options: Html2PdfOptions) => Html2Pdf;
    from: (element: HTMLElement | string) => Html2Pdf;
    save: () => void;
  };

  const html2pdf: () => Html2Pdf;
  export default html2pdf;
}
