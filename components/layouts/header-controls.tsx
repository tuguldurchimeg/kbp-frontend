"use client";

import { ThemeToggle } from "../tiptap-editor/simple/theme-toggle";
import LanguageSwitcher from "./header-controls/LanguageSwitcher";
import NotificationButton from "./header-controls/NotificationButton";
import UserDropdown from "./header-controls/UserDropdown";

export default function HeaderControls() {
  return (
    <div className="flex items-center gap-4">
      <ThemeToggle />
      <LanguageSwitcher />
      <NotificationButton />
      <UserDropdown />
    </div>
  );
}
