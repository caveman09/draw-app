import { WS_URL } from "@/config";
import { JoinRoomSchema } from "@repo/common/payloadSchemas";

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

export function createRoom(roomSlug: string): void {

}

export function joinRoom(roomId: number): void {
    if (socket && socket.readyState === WebSocket.OPEN) {
        const payload: JoinRoomSchema = { type: 'join_room', roomId: roomId };
        socket.send(JSON.stringify(payload));
    }
}