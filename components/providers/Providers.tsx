import { cookies } from "next/headers";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "../layouts/app-sidebar";
import { AppSidebarInset } from "../layouts/app-sidebar-insets";

type ProviderProps = {
  children: React.ReactNode;
};

export async function Providers({ children }: ProviderProps) {
  const cookieStore = await cookies();

  const sidebarState = cookieStore.get("sidebar:state")?.value;

  let defaultOpen = true;

  if (sidebarState) {
    defaultOpen = sidebarState === "true";
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <AppSidebarInset>{children}</AppSidebarInset>
    </SidebarProvider>
  );
}
