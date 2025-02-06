import { Sidebar, SidebarHeader, SidebarGroup, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";

export default function RoomSidebar() {
    return (
        <Sidebar className="ml-16">
            <SidebarHeader className="bg-neutral-700">
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