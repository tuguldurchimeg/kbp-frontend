import {
  CheckCircleIcon,
  FileIcon,
  LoaderIcon,
  HelpCircleIcon,
} from "lucide-react";

export const STATUS_MAP = {
  open: { label: "Open", color: "bg-blue-500", icon: FileIcon },
  in_progress: {
    label: "In progress",
    color: "bg-yellow-500",
    icon: LoaderIcon,
  },
  closed: { label: "Closed", color: "bg-green-600", icon: CheckCircleIcon },
  default: { label: "Default", color: "bg-muted", icon: HelpCircleIcon }, // fallback
};

export const PRIORITY_MAP = {
  low: {
    label: "Low",
    color: "bg-green-100 text-green-800",
  },
  medium: {
    label: "Medium",
    color: "bg-yellow-100 text-yellow-800",
  },
  high: {
    label: "High",
    color: "bg-red-100 text-red-800",
  },
};
