import { SidebarInset } from "../ui/sidebar";
import HeaderControls from "./header-controls";
import { AppBreadcrumb } from "./app-breadcrumb";

export function AppSidebarInset({ children }: { children: React.ReactNode }) {
  return (
    <SidebarInset className="flex flex-col h-screen overflow-y-auto">
      {/* header */}
      <div className="flex justify-between shadow-sm items-center px-5 py-2">
        <AppBreadcrumb />
        <HeaderControls />
      </div>

      <div className="flex-1 px-4 py-4 flex justify-center">{children}</div>
    </SidebarInset>
  );
}
