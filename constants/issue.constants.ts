"use client";
import {
  CheckCircleIcon,
  FileIcon,
  LoaderIcon,
  HelpCircleIcon,
  CircleHelp,
  Flame,
  SignalLow,
  SignalMedium,
  SignalHigh,
} from "lucide-react";
import { useTranslations } from "next-intl";

export function useStatusAndPriorityMaps() {
  const t = useTranslations("SYSCOMMON");

  const STATUS_MAP = {
    open: {
      label: t("status.open"),
      textColor: "text-blue-500",
      backColor: "bg-blue-100",
      icon: FileIcon,
      chartColor: "#3b82f6",
    },
    in_progress: {
      label: t("status.in_progress"),
      textColor: "text-yellow-500",
      backColor: "bg-yellow-100",
      icon: LoaderIcon,
      chartColor: "#facc15",
    },
    closed: {
      label: t("status.closed"),
      textColor: "text-green-600",
      backColor: "bg-green-100",
      icon: CheckCircleIcon,
      chartColor: "#10b981",
    },
    default: {
      label: t("status.default"),
      textColor: "text-gray-500",
      backColor: "bg-gray-100",
      icon: HelpCircleIcon,
      chartColor: "#6b7280",
    },
  };

  const PRIORITY_MAP = {
    low: {
      label: t("priority.low"),
      color: "bg-green-100 text-green-800",
      chartColor: "#10b981", // Tailwind emerald-500
      icon: SignalLow,
    },
    medium: {
      label: t("priority.medium"),
      color: "bg-yellow-100 text-yellow-800",
      chartColor: "#fbbf24", // Tailwind amber-400
      icon: SignalMedium,
    },
    high: {
      label: t("priority.high"),
      color: "bg-red-100 text-red-800",
      chartColor: "#ef4444", // Tailwind red-500
      icon: SignalHigh,
    },
  };

  const TYPE_MAP = {
    problem: {
      label: t("issue_type.problem"),
      color: "",
      icon: Flame,
      chartColor: "#ef4444", // Tailwind red-500
    },
    question: {
      label: t("issue_type.question"),
      color: "",
      icon: CircleHelp,
      chartColor: "#fbbf24", // Tailwind amber-400
    },
  };

  return { STATUS_MAP, PRIORITY_MAP, TYPE_MAP };
}
