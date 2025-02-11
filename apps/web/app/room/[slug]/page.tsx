"use client"
import LeaveButton from "./leaveButton";
import { useParams, useRouter } from "next/navigation";
import RoomSidebar from "./roomSidebar";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = () => {
    const { slug } = useParams();
    const router = useRouter();

    return (
        <div className="text-white flex-grow bg-zinc-800 flex">
            <RoomSidebar />
            <div className="w-full">
                <NavigationMenu className="w-full max-w-full px-6 h-[53px] justify-between bg-[#303035]">
                    <span className="font-semibold min-w-[100px] flex">ROOM {slug}</span>
                    <NavigationMenuList className="w-full max-w-full">
                        <Tabs defaultValue="chat" className="border-none flex-grow mx-4">
                            <TabsList className="bg-transparent w-full justify-center">
                                <TabsTrigger value="chat">Chat</TabsTrigger>
                                <TabsTrigger value="canvas">Canvas</TabsTrigger>
                                <TabsTrigger value="files">Files</TabsTrigger>
                                <TabsTrigger value="history">History</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <LeaveButton slug={slug} />
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    );
}

export default Page;