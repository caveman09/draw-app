import { Sidebar, SidebarHeader, SidebarGroup, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import "@/globals.css";

export default function RoomSidebar() {
    return (
        <Sidebar className="ml-16 room-sidebar">
            <SidebarHeader>
                Room Sidebar
            </SidebarHeader>
            <SidebarGroup>

            </SidebarGroup>

            <SidebarContent>
                SidebarCONTENT
            </SidebarContent>

            <SidebarFooter>
                Footer
            </SidebarFooter>
        </Sidebar>
    );
}