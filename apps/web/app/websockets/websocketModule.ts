import { BACKEND_URL, WS_URL } from "@/config";
import { ChatSchema, JoinRoomSchema, LeaveRoomSchema, RoomSchema } from "@repo/common/payloadSchemas";
import { CreateRoomSchema } from "@repo/common/types";
import axios from "axios";
import { z } from 'zod';

let socket: WebSocket | null = null;

let messageCallbacks: Array<(data: any) => void> = [];

export function addMessageCallback(callback: (data: any) => void): void {
    messageCallbacks.push(callback);
}

export function removeMessageCallback(callback: (data: any) => void): void {
    messageCallbacks = messageCallbacks.filter(value => value != callback);
}

export function connect(token: string): void {
    if (!socket) {
        socket = new WebSocket(WS_URL + '?' + token);

        socket.onopen = (event) => {

        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
            messageCallbacks.forEach(callback => callback(data));
        };

        socket.onerror = (event) => {

        };

        socket.onclose = (event) => {
            socket = null;
        };
    }
}

export function sendMessage(message: string): void {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(message);
    } else {
        console.error('Websocket is not open. Unable to send message');
    }
}

export async function createRoom(roomSlug: string): Promise<String | undefined> {
    if (socket && socket.readyState === WebSocket.OPEN) {
        const requestBody: z.infer<typeof CreateRoomSchema> = {
            name: roomSlug
        };
        const response = await axios.post(`${BACKEND_URL}/room`, requestBody, { withCredentials: true });
        if (response.status === 200) {
            return roomSlug;
        } else {
            return undefined;
        }
    }
}

export async function joinRoom(roomId: number): Promise<String | undefined> {
    if (socket && socket.readyState === WebSocket.OPEN) {
        const payload: JoinRoomSchema = { type: 'join_room', roomId: roomId };
        socket.send(JSON.stringify(payload));
        const response = await axios.get(`${BACKEND_URL}/rooms`);
        if (response.status === 200) {
            const rooms: RoomSchema[] = response.data.rooms;
            const slug = rooms.find(item => item.id === roomId)?.slug;
            return slug;
        } else {
            return undefined;
        }
    }
}

export async function leaveRoom(slug: String): Promise<void> {
    if (socket && socket.readyState === WebSocket.OPEN) {
        try {
            const response = await axios.get(`/room/${slug}`);
            if (response.status != 200) {
                throw new Error('Invalid slug');
            }
            const data: RoomSchema = response.data;
            const roomId: number = data.id;
            const payload: LeaveRoomSchema = { type: 'leave_room', roomId: roomId };
            socket.send(JSON.stringify(payload));
        } catch (e) {
            console.error(e);
        }
    }
}

export function sendChatMessage(message: string, roomId: number): void {
    if (socket && socket.readyState === WebSocket.OPEN) {
        try {
            const payload: ChatSchema = {
                type: 'chat', message, roomId
            }
            socket.send(JSON.stringify(payload));
        } catch (e) {
            console.error(e);
        }
    }
}