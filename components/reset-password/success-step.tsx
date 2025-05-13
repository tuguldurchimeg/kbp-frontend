import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTE } from "@/constants/route.constants";
import { useTranslations } from "next-intl";

export default function SuccessStep() {
  const t = useTranslations("ResetPassword");
  return (
    <>
      <Alert className="bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-300">
        <AlertDescription>{t("success")}</AlertDescription>
      </Alert>
      <Button className="w-full">
        <Link href={ROUTE.LOGIN} className="underline font-medium">
          {t("login")}
        </Link>
      </Button>
    </>
  );
}
