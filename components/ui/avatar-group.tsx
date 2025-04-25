import React from "react";

type AvatarGroupProps = {
  children: React.ReactNode;
  max?: number;
  className?: string;
};

export function AvatarGroup({
  children,
  max,
  className = "",
}: AvatarGroupProps) {
  const avatarArray = React.Children.toArray(children);
  const avatars = avatarArray.slice(0, max ?? avatarArray.length);
  const extraCount = avatarArray.length - avatars.length;

  return (
    <div className={`flex -space-x-2 items-center ${className}`}>
      {avatars}
      {extraCount > 0 && (
        <div className="h-6 w-6 rounded-full bg-muted text-xs text-center text-foreground border border-background flex items-center justify-center">
          +{extraCount}
        </div>
      )}
    </div>
  );
}
