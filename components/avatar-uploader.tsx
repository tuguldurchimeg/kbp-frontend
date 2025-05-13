"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRef } from "react";
import { Input } from "./ui/input";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";

interface AvatarUploaderProps {
  imageUrl: string;
  fallbackName?: string;
  onPickFile: (file: File) => void;
}

export function AvatarUploader({
  imageUrl,
  fallbackName = "",
  onPickFile,
}: AvatarUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("Account");
  const getInitials = (name: string) => {
    const [first = "", last = ""] = name.trim().split(" ");
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="flex items-center gap-4 relative">
      <Avatar
        className="size-16 shadow-sm"
        onClick={() => fileInputRef.current?.click()}
      >
        <AvatarImage src={imageUrl} alt="User avatar" />
        <AvatarFallback>{getInitials(fallbackName || "")}</AvatarFallback>
      </Avatar>
      <Button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="absolute bottom-0 left-12 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
        size="xs"
      >
        <Pencil className="size-3 text-gray-600" />
      </Button>
      <Input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onPickFile(file);
        }}
      />
      <div>
        <h1 className="text-2xl font-semibold">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("description")}</p>
      </div>
    </div>
  );
}
