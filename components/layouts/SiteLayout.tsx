import Header from "./header";
import Footer from "./footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full w-full max-w-5xl mx-auto px-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
