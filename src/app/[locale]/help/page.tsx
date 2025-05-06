import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function HelpPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Help Center</h1>
      <p className="text-muted-foreground mb-6">
        Find guides, support topics, and documentation below.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Getting Started",
            description: "Learn the basics to get up and running.",
            icon: "🚀",
          },
          {
            title: "FAQs",
            description: "Frequently asked questions answered.",
            icon: "❓",
          },
          {
            title: "Roles & Permissions",
            description: "Learn how access is managed.",
            icon: "👥",
          },
          {
            title: "Contact Support",
            description: "Get in touch with our team.",
            icon: "🛠️",
          },
        ].map(({ title, description, icon }) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <span className="text-2xl">{icon}</span> {title}
              </CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
