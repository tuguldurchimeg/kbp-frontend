"use client";

import * as React from "react";
import { useRef, useState } from "react";
import { UploadIcon, XIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FileCard } from "@/components/search-result-tabs/file-results";
import { placeholderData } from "@/constants/search-data";
import { FileItem } from "@/types/document";

export default function Page() {
  const t = useTranslations("MENUS");
  const params = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = React.useState<FileItem[]>(placeholderData.files);

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    console.log("Uploading files...", fileArray);
    // call api later
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleFileUpload(event.target.files);
  };

  const triggerFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <main className="relative w-full px-6 space-y-8">
      <h2 className="text-xl font-semibold">{t("files")}</h2>

      <section className="flex flex-wrap gap-6">
        {data.map((file) => (
          <div key={file.id} className="flex">
            <FileCard file={file} />
          </div>
        ))}
      </section>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileInputChange}
      />

      <Button
        variant="default"
        className="fixed bottom-10 right-10 z-50 shadow-lg"
        onClick={triggerFilePicker}
      >
        <UploadIcon className="h-4 w-4" />
      </Button>
    </main>
  );
}
