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
    open: {
      label: t("status.open"),
      color: "bg-blue-500",
      icon: FileIcon,
      chartColor: "#3b82f6",
    },
    in_progress: {
      label: t("status.in_progress"),
      color: "bg-yellow-500",
      icon: LoaderIcon,
      chartColor: "#facc15",
    },
    closed: {
      label: t("status.closed"),
      color: "bg-green-600",
      icon: CheckCircleIcon,
      chartColor: "#16a34a",
    },
    default: {
      label: t("status.default"),
      color: "bg-muted",
      icon: HelpCircleIcon,
      chartColor: "#6b7280",
    },
  };

  const PRIORITY_MAP = {
    low: {
      label: t("priority.low"),
      color: "bg-green-100 text-green-800",
      chartColor: "#bbf7d0", // Tailwind green-100
    },
    medium: {
      label: t("priority.medium"),
      color: "bg-yellow-100 text-yellow-800",
      chartColor: "#fef9c3", // Tailwind yellow-100
    },
    high: {
      label: t("priority.high"),
      color: "bg-red-100 text-red-800",
      chartColor: "#fecaca", // Tailwind red-100
    },
  };

  const TYPE_MAP = {
    problem: {
      label: t("issue_type.problem"),
      color: "red-500",
      icon: Flame,
      chartColor: "#ef4444", // Tailwind red-500
    },
    question: {
      label: t("issue_type.question"),
      color: "green-500",
      icon: CircleHelp,
      chartColor: "#fbbf24", // Tailwind amber-400
    },
  };

  return { STATUS_MAP, PRIORITY_MAP, TYPE_MAP };
}
