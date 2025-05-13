import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ROUTE } from "@/constants/route.constants";

export default function HomePage() {
  const t = useTranslations("Home");

  return (
    <div className="relative overflow-hidden">
      <div className="bg-primary/10 absolute -top-32 -left-32 h-96 w-96 rounded-full blur-3xl" />
      <div className="bg-primary/5 absolute -right-32 -bottom-32 h-96 w-96 rounded-full blur-3xl" />

      <div className="relative container mx-auto grid grid-cols-1 items-center gap-8 px-4 py-16 md:grid-cols-5 md:gap-12 md:py-20 lg:py-24 xl:gap-16 2xl:max-w-[1400px]">
        {/* Text */}
        <div className="flex flex-col justify-center md:col-span-3 md:pr-6 xl:pr-12">
          <div className="space-y-6 md:space-y-8">
            <div className="flex items-center space-x-3">
              <span className="bg-primary h-1.5 w-1.5 rounded-full"></span>
              <h2 className="text-primary text-sm font-semibold tracking-wider uppercase">
                {t("tagline")}
              </h2>
            </div>
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl leading-tight mb-1">
              <span className="block">{t("heading.line1")}</span>
            </h1>
            <h2 className="text-primary block text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl leading-tight">
              {t("heading.line2")}
            </h2>

            <p className="text-muted-foreground max-w-xl text-lg">
              {t("description")}
            </p>

            <div className="pt-2">
              <p className="text-muted-foreground mb-3 text-sm font-medium">
                {t("advantages.title")}
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-muted px-3 py-1 text-sm rounded-xl text-muted-foreground">
                  {t("advantages.point1")}
                </span>
                <span className="bg-muted px-3 py-1 text-sm rounded-xl text-muted-foreground">
                  {t("advantages.point2")}
                </span>
                <span className="bg-muted px-3 py-1 text-sm rounded-xl text-muted-foreground">
                  {t("advantages.point3")}
                </span>
                <span className="bg-muted px-3 py-1 text-sm rounded-xl text-muted-foreground">
                  {t("advantages.point4")}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href={ROUTE.LOGIN}>
                <Button size="lg" className="group">
                  {t("login")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href={ROUTE.SIGN_UP}>
                <Button variant="outline" size="lg" className="group">
                  {t("signup")}
                  <ExternalLink className="ml-2 h-4 w-4 opacity-70 transition-opacity group-hover:opacity-100" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative flex aspect-[4/5] w-full items-center md:col-span-2 md:aspect-auto md:h-[600px]">
          <div className="border-primary/20 bg-background/50 absolute -top-6 -right-6 h-20 w-20 rounded-md border backdrop-blur-sm"></div>

          <div className="border-muted/30 bg-muted/10 relative z-10 h-full w-full overflow-hidden rounded-2xl border shadow-xl">
            <Image
              src="/workspace_placeholder.jpg"
              alt="Designer's workspace with contemporary design elements"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </div>

          <div className="border-primary/10 bg-background/50 absolute -bottom-6 -left-6 h-24 w-24 rounded-full border backdrop-blur-sm"></div>
        </div>
      </div>
    </div>
  );
}
