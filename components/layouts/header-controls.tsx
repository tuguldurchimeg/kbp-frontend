"use client";

import { ThemeToggle } from "./header-controls/theme-toggle";
import LanguageSwitcher from "./header-controls/language-switcher";
// import NotificationButton from "./header-controls/NotificationButton";
import UserDropdown from "./header-controls/user-dropdown";

export default function HeaderControls() {
  return (
    <div className="flex items-center gap-4">
      <div className="hidden md:block">
        <ThemeToggle />
      </div>
      <div className="hidden md:block">
        <LanguageSwitcher />
      </div>
      {/* <NotificationButton /> */}
      <UserDropdown />
    </div>
  );
}
