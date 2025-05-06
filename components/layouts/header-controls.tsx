"use client";

import LanguageSwitcher from "./header-controls/LanguageSwitcher";
import NotificationButton from "./header-controls/NotificationButton";
import UserDropdown from "./header-controls/UserDropdown";

export default function HeaderControls() {
  return (
    <div className="flex items-center gap-6">
      <LanguageSwitcher />
      <NotificationButton />
      <UserDropdown />
    </div>
  );
}
