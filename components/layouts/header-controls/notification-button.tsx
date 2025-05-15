"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotificationButton() {
  return (
    <Button variant="ghost" className="rounded-full w-9 h-9 shadow-sm">
      <Bell className="w-4 h-4 text-muted-foreground" />
    </Button>
  );
}
