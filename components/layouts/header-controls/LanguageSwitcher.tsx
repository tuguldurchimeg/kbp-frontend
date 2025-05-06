"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Language");

  const [selectedLang, setSelectedLang] = useState(locale);

  const handleLanguageChange = (lang: string) => {
    setSelectedLang(lang);
    const segments = pathname.split("/");
    segments[1] = lang;
    router.replace(segments.join("/") || "/");
  };

  const languages = [
    { code: "en", label: t("en") },
    { code: "mn", label: t("mn") },
  ];

  return (
    <Select value={selectedLang} onValueChange={handleLanguageChange}>
      <SelectTrigger
        className="flex items-center gap-1 border text-[#4B2E83] bg-white px-2 py-1 rounded-md h-8 text-xs w-[78px] shadow-sm"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4" />
        <SelectValue>{selectedLang.toUpperCase()}</SelectValue>
      </SelectTrigger>

      <SelectContent>
        {languages.map(({ code, label }) => (
          <SelectItem key={code} value={code}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
