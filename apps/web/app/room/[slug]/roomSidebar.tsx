import {
    Sidebar, SidebarHeader, SidebarGroup, SidebarContent, SidebarFooter
    , SidebarMenu, SidebarMenuItem,
    SidebarMenuButton
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp, HeadphonesIcon, MicIcon, Settings } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Toggle } from "@/components/ui/toggle";

import "@/globals.css";

const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export default function RoomSidebar() {
    return (
        <Sidebar className="ml-16 room-sidebar">
            <SidebarHeader className="px-0 pt-[2.5px]">
                <SidebarMenu>
                    <SidebarMenuItem className="font-medium">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton variant={"default"} className="py-[25px] pl-4 rounded-none">
                                    cave
                                    <ChevronDown className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <Separator orientation="horizontal" className="h-[1px] bg-zinc-900" />
                            <DropdownMenuContent className="w-[250px] bg-zinc-900 font-medium">
                                <DropdownMenuItem className="text-[0.800rem]">
                                    Invite People
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-[0.800rem]" >
                                    Create Channel
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-[0.800rem]">
                                    Create Category
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>


            <SidebarContent className="">
                <ScrollArea className="h-full">
                    <div className="p-4">
                        {tags.map((tag) => (
                            <>
                                <div key={tag} className="text-sm">
                                    {tag}
                                </div>
                            </>
                        ))}
                    </div>
                </ScrollArea>
            </SidebarContent>

            <Separator orientation="horizontal" className="h-[1px] bg-zinc-900" />
            <SidebarFooter className="bg-zinc-800 p-1">
                <SidebarMenu className="flex flex-row justify-evenly">
                    <SidebarMenuItem className="flex-grow">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton variant={"default"} className="px-1 py-5 hover:bg-zinc-700">
                                    <Avatar className="rounded-full size-7">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <text className="font-semibold text-[0.870rem]">
                                        caveman
                                    </text>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                        </DropdownMenu>
                    </SidebarMenuItem>
                    <SidebarMenuItem className="my-auto">
                        <Toggle variant={"default"} size={"sm"} onPressedChange={(e) => { }} className="p-0 m-0 [&_svg]:size-[18px] hover:bg-zinc-700">
                            <MicIcon />
                        </Toggle>
                    </SidebarMenuItem>
                    <SidebarMenuItem className="my-auto">
                        <Toggle variant={"default"} size={"sm"} onPressedChange={(e) => { }} className="p-0 m-0 [&_svg]:size-[18px] hover:bg-zinc-700">
                            <HeadphonesIcon />
                        </Toggle>
                    </SidebarMenuItem>
                    <SidebarMenuItem className="my-auto">
                        <Toggle variant={"default"} size={"sm"} onPressedChange={(e) => { }} className="p-0 m-0 [&_svg]:size-[18px] hover:bg-zinc-700">
                            <Settings className="size-10" />
                        </Toggle>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter >
        </Sidebar >
    );
}