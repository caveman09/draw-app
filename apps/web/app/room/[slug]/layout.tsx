"use client"
import LeaveButton from "./leaveButton";
import { useParams, useRouter } from "next/navigation";
import RoomSidebar from "./roomSidebar";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RoomLayout({ children }: { children: React.ReactNode }) {
    const { slug } = useParams();
    const router = useRouter();

    const handleTabChange = (value: string) => {
        router.push(`/room/${slug}/${value}`);
    };

    return (
        <div className="text-white flex-grow bg-zinc-800 flex">
            <RoomSidebar />
            <div className="w-full">
                <NavigationMenu className="w-full max-w-full px-6 h-[53px] justify-between bg-[#303035]">
                    <span className="text-[0.800rem] font-semibold min-w-[100px] flex">ROOM {slug}</span>
                    <NavigationMenuList className="w-full max-w-full">
                        <Tabs
                            defaultValue="chat"
                            className="border-none flex-grow mx-4"
                            onValueChange={handleTabChange}
                        >
                            <TabsList className="bg-transparent w-full justify-center">
                                <TabsTrigger className="text-[0.800rem]" value="chat">Chat</TabsTrigger>
                                <TabsTrigger className="text-[0.800rem]" value="canvas">Canvas</TabsTrigger>
                                <TabsTrigger className="text-[0.800rem]" value="files">Files</TabsTrigger>
                                <TabsTrigger className="text-[0.800rem]" value="history">History</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <LeaveButton slug={typeof slug === 'string' ? slug : ''} />
                    </NavigationMenuList>
                </NavigationMenu>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}