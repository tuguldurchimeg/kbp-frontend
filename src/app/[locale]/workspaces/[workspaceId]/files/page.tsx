"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Loader2, UploadIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileCard } from "@/components/search-result-tabs/file-results";

import {
  getFiles,
  getPresignedUploadUrl,
  uploadFileToS3,
  createFile,
} from "@/src/app/lib/actions/file.actions";

import {
  FileItem,
  FileCreateParams,
  PresignedUrlRequest,
} from "@/types/document";

export default function Page() {
  const t = useTranslations();
  const params = useParams();
  const workspaceId = params.workspaceId as string;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFiles = async () => {
    try {
      const files = await getFiles({ workspace_id: workspaceId });
      setData(files);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;

    setLoading(true);
    try {
      const fileArray = Array.from(files);

      for (const file of fileArray) {
        const presignedParams: PresignedUrlRequest = {
          file_name: file.name,
          mime_type: file.type,
          content_type: "file",
          workspace_id: workspaceId,
        };

        const presigned = await getPresignedUploadUrl(presignedParams);

        await uploadFileToS3(file, presigned.url);

        const fileParams: FileCreateParams = {
          name: file.name,
          workspace_id: workspaceId,
          file_type: file.type,
          size: `${(file.size / 1024).toFixed(2)} KB`,
          url: presigned.file_url,
        };

        await createFile(fileParams);
      }

      await fetchFiles();
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
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
      <h2 className="text-xl font-semibold">{t("MENUS.files")}</h2>

      <section className="flex flex-wrap gap-6">
        {data.length > 0 ? (
          data.map((file) => (
            <div key={file.id} className="w-[180px]">
              <FileCard file={file} />
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-sm">
            {t("SYSCOMMON.empty")}
          </p>
        )}
      </section>

      <Input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileInputChange}
      />

      <Button
        disabled={loading}
        variant="default"
        className="fixed bottom-10 right-10 z-50 shadow-lg"
        onClick={triggerFilePicker}
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <UploadIcon className="size-4" />
        )}
      </Button>
    </main>
  );
}
