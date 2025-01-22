"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
    SheetFooter
} from "@/components/ui/sheetWindow"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { RoomSchema } from "@repo/common/payloadSchemas";

export default function ChatRoom({ slug }: { slug: string }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const getChats = async () => {
            let response = await axios.get(`${BACKEND_URL}/rooms`);
            const rooms: RoomSchema[] = response.data;

            const roomId = rooms.find((room) => room.slug === slug)?.id || -1;
            if (roomId > -1) {
                response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
                //const chats: ChatSchema[] = response.data;
            }
        };
        getChats();
    }, [])

    return (
        <Sheet defaultOpen={false} onOpenChange={
            (open) => {
                setIsOpen(open)
            }
        }>
            <SheetTrigger className="fixed z-50 m-1">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
            </SheetTrigger>
            <SheetContent side={'topleft'} className={`rounded-lg flex flex-col h-full ${isOpen && `pt-[50px] border`} bg-gray-950`}>

                {isOpen &&
                    <SheetHeader>
                        <SheetTitle className="text-gray-300 data-[state=closed]:collapse data-[state=open]:visible">Chat Room</SheetTitle>
                        <SheetDescription>
                            All chats for this room are shown here.
                        </SheetDescription>
                    </SheetHeader>}

                {isOpen &&
                    <ScrollArea className=" flex-grow">
                        Chats come here
                    </ScrollArea>}

                {isOpen &&
                    <SheetFooter className="text-gray-300">
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input type='text' placeholder="Message" />
                            <Button type='submit'>Send</Button>
                        </div>
                    </SheetFooter>}

            </SheetContent>
        </Sheet >
    );
}