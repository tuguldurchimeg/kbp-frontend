import { ROUTE } from "@/constants/route.constants";
import { Copyright, HeartHandshake } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations();
  return (
    <footer className="border-t py-10 mt-16 text-sm text-muted-foreground">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
        <Link
          href={ROUTE.HELP}
          className="hover:underline flex items-center gap-2"
        >
          <HeartHandshake className="size-4 text-amber-400" />
          {t("SYSCOMMON.help")}
        </Link>
        <div className="flex items-center gap-2 text-muted">
          <Copyright className="size-4" /> {new Date().getFullYear()}{" "}
          {t("MENUS.knowledge_base")}
        </div>
      </div>
    </footer>
  );
}
