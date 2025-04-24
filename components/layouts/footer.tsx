export default function Footer() {
  return (
    <footer className="border-t py-10 mt-16 text-sm text-muted-foreground">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
        {/* <div>
          <h3 className="font-bold mb-2">Бидэнтэй холбогдох</h3>
          <ul className="space-y-1">
            <li>📧 Gmail</li>
            <li>📸 Instagram</li>
            <li>📘 Facebook</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Тусламж үйлчилгээ</h3>
          <ul className="space-y-1">
            <li>❓ Асуулт хариулт</li>
            <li>💬 Санал хүсэлт</li>
            <li>📄 Үйлчилгээний нөхцөл</li>
          </ul>
        </div> */}
        <div className="text-center sm:col-span-2 md:col-span-1 sm:text-left">
          © {new Date().getFullYear()} Knowledge Base.
        </div>
      </div>
    </footer>
  );
}
