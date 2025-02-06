import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider style={{
            "--sidebar-width": "14rem"
        }}>
            <main className="flex grow">
                {children}
            </main>
        </SidebarProvider>
    )
}