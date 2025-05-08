"use client";

import { ThemeToggle } from "../theme-toggle";
import LanguageSwitcher from "./header-controls/LanguageSwitcher";
import NotificationButton from "./header-controls/NotificationButton";
import UserDropdown from "./header-controls/UserDropdown";

export default function HeaderControls() {
  return (
    <div className="flex items-center gap-4">
      <div className="hidden md:block">
        <ThemeToggle />
      </div>
      <div className="hidden md:block">
        <LanguageSwitcher />
      </div>
      <NotificationButton />
      <UserDropdown />
    </div>
  );
}
