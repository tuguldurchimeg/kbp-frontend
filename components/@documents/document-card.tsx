"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ROUTE } from "@/constants/route.constants";
import { DocumentItem } from "@/types/document";
import { Eye, FileText } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNowStrict } from "date-fns";
import { enUS, mn } from "date-fns/locale";

type DocumentCardProps = {
  document: DocumentItem;
};

export default function DocumentCard({ document }: DocumentCardProps) {
  const locale = useLocale();

  const updatedAt = document.attributes.updated_at
    ? formatDistanceToNowStrict(new Date(document.attributes.updated_at), {
        addSuffix: true,
        locale: locale === "mn" ? mn : enUS,
      })
    : "";

  const user = document.attributes.user?.data;
  const userFirstName = user?.attributes.firstname || "";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userAvatar = user?.attributes.avatar;

  return (
    <Link
      href={ROUTE.BASE.DOCUMENT.DETAIL(
        document.attributes.workspace_id,
        document.id
      )}
    >
      <Card className="border rounded-lg p-4 pb-2 h-[100px] overflow-hidden transition-shadow hover:shadow-md">
        <CardContent className="flex flex-col justify-between h-full p-0">
          {/* Top Section */}
          <div className="flex items-start gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-md">
              <FileText className="w-4 h-4" />
            </div>

            <div className="flex-1 min-w-0">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="font-semibold text-base truncate w-full cursor-default">
                      {document.attributes.title}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    {document.attributes.title}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {updatedAt && (
                <p className="text-sm text-muted-foreground">{updatedAt}</p>
              )}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex items-center justify-between mt-2 px-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Eye className="w-4 h-4" />
              <span>
                {(document.attributes.view_count ?? 0).toLocaleString()}{" "}
              </span>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="w-4 h-4">
                    <AvatarImage
                      src={userAvatar || "/avatar.jpg"}
                      alt={userFirstName}
                    />
                    <AvatarFallback>
                      {userFirstName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent side="left">{userFirstName}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
