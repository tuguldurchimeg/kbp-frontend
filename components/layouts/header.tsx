import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CURRENT_USER } from "@/constants/kb-placeholder-data";
import Image from "next/image";
import { Bell, Globe } from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../ui/select";

export default function Header() {
  const user = CURRENT_USER;
  return (
    <header className="border-b px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="text-xl font-bold text-purple-700 flex">
          <Image
            src="/login.png"
            alt="Logo"
            width={28}
            height={28}
            className="mr-2 rounded-lg"
          />
          <span>KBP</span>
        </Link>
        {/* <nav className="flex gap-6 text-sm font-medium">
          <Link href={ROUTE.WORKSPACES.ROOT} className="hover:underline">
            Workspaces
          </Link>
          <Link href="/employees" className="hover:underline">
            Employees
          </Link>
        </nav> */}
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <div className="flex items-center mr-4">
            <Globe className="mr-2 w-8 h-8" />
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="EN" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="mn">Монгол</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" className="rounded-full w-10 h-10 mr-4">
            <Bell className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage
              src={user.attributes.avatar}
              alt={user.attributes.firstname}
            />
            <AvatarFallback className="rounded-lg">
              {`${user.attributes?.firstname?.[0] ?? ""}${
                user.attributes?.lastname?.[0] ?? ""
              }`.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {user.attributes?.firstname}
            </span>
            <span className="truncate text-xs">{user.attributes?.email}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
