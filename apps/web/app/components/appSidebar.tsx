import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarGroup } from "./ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import "@/globals.css";

export function AppSidebar() {
    return (
        <Sidebar variant="inset" className="px-0 dark py-0">
            <SidebarHeader className="mx-auto">
                <Avatar className="rounded-full size-12">
                    <AvatarImage src="https://github.com/shadcn.png" className="" />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                </SidebarGroup>

                <SidebarGroup>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <Avatar className="rounded-full size-12">
                    <AvatarImage src="https://github.com/shadcn.png" className="" />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
            </SidebarFooter>
        </Sidebar >
    );
}
