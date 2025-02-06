import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <main className="flex grow">
                {children}
            </main>
        </SidebarProvider>
    )
}