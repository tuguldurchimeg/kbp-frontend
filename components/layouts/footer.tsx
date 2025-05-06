import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-10 mt-16 text-sm text-muted-foreground">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
        {/* Help & Contact Section */}
        <div>
          <h3 className="font-bold mb-2">Help & Support</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/help" className="hover:underline">
                🧭 Help Center
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:underline">
                ❓ FAQs
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                📨 Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal & Policy */}
        <div>
          <h3 className="font-bold mb-2">Legal & Policies</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/terms" className="hover:underline">
                📄 Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline">
                🔒 Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="text-center sm:col-span-2 md:col-span-1 sm:text-left">
          © {new Date().getFullYear()} Knowledge Base.
        </div>
      </div>
    </footer>
  );
}
