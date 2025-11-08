import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NavBar } from "@/modules/home/ui/components/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-1 w-full bg-[#f4f4f0]">
          <NavBar />
          <div className="px-4 lg:px-12 py-8 flex flex-col gap-4">
            <SidebarTrigger />
            {children}
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
