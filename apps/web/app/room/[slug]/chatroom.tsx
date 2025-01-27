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
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { RoomSchema, ChatMessageSchema } from "@repo/common/payloadSchemas";
import ChatMessage from "./chatmessage";
import { addMessageCallback, removeMessageCallback, sendChatMessage } from "@/websockets/websocketModule";

export default function ChatRoom({ slug }: { slug: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [chats, setChats] = useState<ChatMessageSchema[]>([]);
    const roomId = useRef(0);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const getChats = async () => {
            let response = await axios.get(`${BACKEND_URL}/rooms`);
            const rooms: RoomSchema[] = response.data.rooms;
            console.log(rooms);
            if (!Array.isArray(rooms)) {
                throw new Error('Expected rooms to be an array');
            }
            let currentRoom: RoomSchema | undefined = undefined;
            currentRoom = rooms.find((room) => room.slug === slug);
            if (!currentRoom) {
                return;
            }
            roomId.current = currentRoom.id;
            if (roomId.current > -1) {
                response = await axios.get(`${BACKEND_URL}/chats/${roomId.current}`);
                const chatData: ChatMessageSchema[] = response.data.chats;
                setChats(chatData);
            }
        };
        getChats();
        const chatNewMessage = (message: ChatMessageSchema) => {
            setChats((prevChats) => [...prevChats, message]);
            console.log(message);
        };
        addMessageCallback(chatNewMessage);
        console.log('added message callback');

        return () => {
            removeMessageCallback(chatNewMessage);
            console.log('removed message callback');
        };
    }, [])

    return (
        <Sheet defaultOpen={false} onOpenChange={
            (open) => {
                setIsOpen(open)
            }
        }>
            <SheetTrigger className={`fixed z-50 m-1 border-2 rounded-full`}>
                <Avatar className="w-[70px] h-[70px]">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
            </SheetTrigger>
            <SheetContent side={'topleft'} className={`rounded-3xl flex flex-col h-full ${isOpen && `pt-[40px] border`} bg-gray-950`}>

                {isOpen &&
                    <SheetHeader>
                        <SheetTitle className="text-gray-300 data-[state=closed]:collapse data-[state=open]:visible ml-20">Chat Room</SheetTitle>
                        <SheetDescription>
                            All chats for this room are shown here.
                        </SheetDescription>
                    </SheetHeader>}

                {isOpen &&
                    <ScrollArea className="flex-grow">
                        {chats.map((chat, index) => {
                            return (<ChatMessage key={index} message={chat.message} />);
                        })}
                    </ScrollArea>}

                {isOpen &&
                    <SheetFooter className="text-gray-300">
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input type='text' placeholder="Message" ref={inputRef} />
                            <Button type='submit' onClick={() => { sendChatMessage(inputRef.current?.value || '', roomId.current) }}>Send</Button>
                        </div>
                    </SheetFooter>}

            </SheetContent>
        </Sheet >
    );
}