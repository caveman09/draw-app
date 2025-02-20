"use client"

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { RoomSchema, ChatMessageSchema } from "@repo/common/payloadSchemas";
import ChatMessage from "../../chatmessage";
import { addMessageCallback, removeMessageCallback, sendChatMessage } from "@/websockets/websocketModule";

export default function ChatPage() {
    const { slug } = useParams();
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
        //getChats();

        const chatNewMessage = (message: ChatMessageSchema) => {
            setChats((prevChats) => [...prevChats, message]);
            console.log(message);
        };
        addMessageCallback(chatNewMessage);
        //console.log('added message callback');

        return () => {
            removeMessageCallback(chatNewMessage);
            //console.log('removed message callback');
        };
    }, [slug])

    return (
        <div className="h-full bg-[#303035] rounded-none flex flex-col">
            <div className="flex-grow overflow-y-auto">
                {chats.map((chat, index) => (
                    <ChatMessage key={index} message={chat.message} />
                ))}
            </div>
            <div className="flex gap-2 p-4">
                <Input
                    ref={inputRef}
                    className="flex-grow bg-zinc-700"
                    placeholder="Message"
                    type="text"
                />
                <Button onClick={() => {
                    if (inputRef.current?.value) {
                        sendChatMessage(inputRef.current.value, roomId.current);
                        inputRef.current.value = '';
                    }
                }}>Send</Button>
            </div>
        </div>
    );
}