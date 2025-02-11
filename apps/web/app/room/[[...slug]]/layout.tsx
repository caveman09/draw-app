"use client"
import LeaveButton from "./leaveButton";
import { useParams, useRouter } from "next/navigation";
import RoomSidebar from "./roomSidebar";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RoomLayout({ children }: { children: React.ReactNode }) {
    const params = useParams();
    const segments = params.slug as string[];
    const [roomSlug, channelId] = segments || [];
    const router = useRouter();

    const handleTabChange = (value: string) => {

    };

    return (
        <div className="text-white flex-grow bg-zinc-800 flex">
            <RoomSidebar />
            <Tabs
                defaultValue="chat"
                className="border-none flex-grow"
                onValueChange={handleTabChange}
            >
                <div className="w-full h-full">
                    <NavigationMenu className="w-full max-w-full px-6 h-[53.5px] justify-between bg-[#303035] border-b border-zinc-900 shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                        <span className="text-[0.800rem] font-semibold min-w-[100px] flex">
                            {channelId ? `#${channelId} in ${roomSlug}` : `ROOM ${roomSlug}`}
                        </span>
                        <NavigationMenuList className="w-full max-w-full">
                            <TabsList className="bg-transparent w-full justify-center">
                                <TabsTrigger className="text-[0.800rem]" value="chat">Chat</TabsTrigger>
                                <TabsTrigger className="text-[0.800rem]" value="canvas">Canvas</TabsTrigger>
                                <TabsTrigger className="text-[0.800rem]" value="files">Files</TabsTrigger>
                                <TabsTrigger className="text-[0.800rem]" value="history">History</TabsTrigger>
                            </TabsList>
                            <LeaveButton slug={roomSlug || ''} />
                        </NavigationMenuList>
                    </NavigationMenu>
                    {children}
                </div>
            </Tabs>
        </div >
    );
}