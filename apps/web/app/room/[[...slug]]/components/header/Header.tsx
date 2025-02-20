"use client"
import { memo } from 'react';
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeaveButton from '../../leaveButton';
import { useRecoilValue } from 'recoil';
import { useRoomStore } from '../../store/store';

interface HeaderProps {
    onTabChange?: (value: string) => void;
}

const Header = memo(function Header({ onTabChange }: HeaderProps) {
    const currentChannel = useRoomStore((state) => state.currentChannel);
    const currentRoom = useRoomStore((state) => state.currentRoom);
    return (
        <NavigationMenu className="w-full max-w-full px-6 h-[53.5px] justify-between bg-[#303035] border-b border-zinc-900 shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            <span className="text-[0.800rem] font-semibold min-w-[100px] flex">
                {currentChannel ? `#${currentChannel} in ${currentRoom}` : `ROOM ${currentRoom}`}
            </span>
            <NavigationMenuList className="w-full max-w-full">
                <TabsList className="bg-transparent w-full justify-center">
                    <TabsTrigger className="text-[0.800rem]" value="chat">Chat</TabsTrigger>
                    <TabsTrigger className="text-[0.800rem]" value="canvas">Canvas</TabsTrigger>
                    <TabsTrigger className="text-[0.800rem]" value="files">Files</TabsTrigger>
                    <TabsTrigger className="text-[0.800rem]" value="history">History</TabsTrigger>
                </TabsList>
                <LeaveButton slug={currentRoom} />
            </NavigationMenuList>
        </NavigationMenu>
    );
});

export default Header;