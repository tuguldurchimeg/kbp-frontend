"use client";
import {
  CheckCircleIcon,
  FileIcon,
  LoaderIcon,
  HelpCircleIcon,
  CircleHelp,
  Flame,
} from "lucide-react";
import { useTranslations } from "next-intl";

export function useStatusAndPriorityMaps() {
  const t = useTranslations("SYSCOMMON");

  const STATUS_MAP = {
    open: { label: t("status.open"), color: "bg-blue-500", icon: FileIcon },
    in_progress: {
      label: t("status.in_progress"),
      color: "bg-yellow-500",
      icon: LoaderIcon,
    },
    closed: {
      label: t("status.closed"),
      color: "bg-green-600",
      icon: CheckCircleIcon,
    },
    default: {
      label: t("status.default"),
      color: "bg-muted",
      icon: HelpCircleIcon,
    },
  };

  const PRIORITY_MAP = {
    low: {
      label: t("priority.low"),
      color: "bg-green-100 text-green-800",
    },
    medium: {
      label: t("priority.medium"),
      color: "bg-yellow-100 text-yellow-800",
    },
    high: {
      label: t("priority.high"),
      color: "bg-red-100 text-red-800",
    },
  };

  const TYPE_MAP = {
    problem: {
      label: t("issue_type.problem"),
      color: "red-500",
      icon: Flame,
    },
    question: {
      label: t("issue_type.question"),
      color: "amber-400",
      icon: CircleHelp,
    },
  };

  return { STATUS_MAP, PRIORITY_MAP, TYPE_MAP };
}
