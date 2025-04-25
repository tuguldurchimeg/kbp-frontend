import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ROUTE } from "@/constants/route.constants";
import { CURRENT_USER } from "@/constants/kb-placeholder-data";

export default function Header() {
  const user = CURRENT_USER;
  return (
    <header className="border-b px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="text-xl font-bold text-purple-700">
          KBP
        </Link>
        <nav className="flex gap-6 text-sm font-medium">
          <Link href={ROUTE.WORKSPACES.ROOT} className="hover:underline">
            Workspaces
          </Link>
          <Link href="/employees" className="hover:underline">
            Employees
          </Link>
        </nav>
        <Avatar className="h-10 w-10 rounded-full">
          <AvatarImage
            src={user.attributes.avatar}
            alt={user.attributes.firstname}
          />
          <AvatarFallback className="rounded-full">
            {`${user.attributes.firstname?.[0] ?? ""}${
              user.attributes.lastname?.[0] ?? ""
            }`.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
