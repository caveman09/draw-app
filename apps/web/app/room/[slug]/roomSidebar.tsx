import {
    Sidebar, SidebarHeader, SidebarGroup, SidebarContent, SidebarFooter
    , SidebarMenu, SidebarMenuItem
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import "@/globals.css";

export default function RoomSidebar() {
    return (
        <Sidebar className="ml-16 room-sidebar">
            <SidebarHeader className="">
                <SidebarMenu>
                    <SidebarMenuItem>
                        Menu Item
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarGroup>
            </SidebarGroup>

            <SidebarContent>
                SidebarCONTENT
            </SidebarContent>

            <SidebarFooter>
                User Info & Settings
            </SidebarFooter>
        </Sidebar>
    );
}