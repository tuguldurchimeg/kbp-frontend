import { ROUTE } from "@/constants/route.constants";
import { HeartHandshake } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function FooterSimple() {
  const t = useTranslations();

  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left"></p>
        </div>
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-15">
          {/* <nav className="flex gap-4 md:gap-8"> */}
          <Link
            href={ROUTE.HELP}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground flex items-center gap-1"
          >
            <HeartHandshake className="size-4" />
            {t("SYSCOMMON.help")}
          </Link>
          {/* </nav> */}
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} {t("MENUS.knowledge_base")}
          </p>
        </div>
      </div>
    </footer>
  );
}
