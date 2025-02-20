"use client"
import { memo, useEffect, useState, useMemo, Suspense } from 'react';
import {
    Sidebar, SidebarHeader, SidebarGroup, SidebarContent, SidebarFooter
    , SidebarMenu, SidebarMenuItem,
    SidebarMenuButton
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp, Hash, HeadphonesIcon, MessageSquareMoreIcon, MicIcon, Settings } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Channel from "@/room/[[...slug]]/components/channel/Channel";
import { useRoomStore } from "@/room/[[...slug]]/store/store";
import "@/globals.css";

const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

const RoomSidebarContent = memo(function RoomSidebarContent() {
    const [channels] = useState<string[]>(tags);
    const roomSlug: string = useRoomStore((state) => state.currentRoom);

    const channelProps = useMemo(() => {    // temporary
        console.log('channel props made');
        return channels.map((channel, index) => ({
            id: channel,
            name: channel
        }));
    }, [channels, roomSlug]);

    const memoizedChannels = useMemo(() => {    // temporary
        console.log('memoizedChannels');
        return channelProps.map((props, index) => (
            <Channel key={index} {...props} />
        ));
    }, [channelProps]);

    return (
        <Sidebar className="ml-16 room-sidebar">
            <SidebarHeader className="px-0 pt-[2.5px] pb-0 shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                <SidebarMenu>
                    <SidebarMenuItem className="font-medium">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton variant={"default"} className="py-[25px] pl-4 rounded-none">
                                    {roomSlug}
                                    <ChevronDown className="ml-auto mr-2" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <Separator orientation="horizontal" className="h-[1px] bg-zinc-900" />
                            <DropdownMenuContent className="w-[200px] bg-zinc-900 font-medium">
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

            <SidebarContent className="m-0 p-0">
                <ScrollArea className="h-full">
                    <div className="px-2">
                        <ToggleGroup type="single" className="flex flex-col" onValueChange={(value) => { console.log(value) }}>
                            {memoizedChannels}
                        </ToggleGroup>
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
                                    <div className="font-semibold text-[0.870rem]">
                                        caveman
                                    </div>
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
});

const RoomSidebar = memo(function RoomSidebar() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RoomSidebarContent />
        </Suspense>
    );
});

export default RoomSidebar;