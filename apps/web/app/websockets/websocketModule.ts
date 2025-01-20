import { BACKEND_URL, WS_URL } from "@/config";
import { JoinRoomSchema, LeaveRoomSchema } from "@repo/common/payloadSchemas";
import { CreateRoomSchema } from "@repo/common/types";
import axios from "axios";
import { z } from 'zod';

let socket: WebSocket | null = null;

export function connect(token: string): void {
    if (!socket) {
        socket = new WebSocket(WS_URL + '?' + token);

        socket.onopen = (event) => {

        };

        socket.onmessage = (event) => {

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

export async function createRoom(roomSlug: string): Promise<void> {
    if (socket && socket.readyState === WebSocket.OPEN) {
        const requestBody: z.infer<typeof CreateRoomSchema> = {
            name: roomSlug
        };
        const response = await axios.post(`${BACKEND_URL}/room`, requestBody, { withCredentials: true });
        return;
    }
}

export function joinRoom(roomId: number): void {
    if (socket && socket.readyState === WebSocket.OPEN) {
        const payload: JoinRoomSchema = { type: 'join_room', roomId: roomId };
        socket.send(JSON.stringify(payload));
    }
}

export function leaveRoom(roomId: number): void {
    if (socket && socket.readyState === WebSocket.OPEN) {
        const payload: LeaveRoomSchema = { type: 'leave_room', roomId: roomId };
        socket.send(JSON.stringify(payload));
    }
} 