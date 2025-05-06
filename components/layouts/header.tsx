import Link from "next/link";
import Image from "next/image";
import HeaderControls from "./header-controls";

export default function Header() {
  return (
    <header className="border-b bg-white px-6 py-3 shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 text-purple-700 font-bold text-xl"
        >
          <Image
            src="/login.png"
            alt="Logo"
            width={30}
            height={30}
            className="rounded-md"
          />
          <span>KBP</span>
        </Link>

        {/* Right-side controls */}
        <HeaderControls />
      </div>
    </header>
  );
}
