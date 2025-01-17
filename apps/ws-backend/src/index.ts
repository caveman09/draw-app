import { WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";
import { joinRoomSchema, leaveRoomSchema, chatSchema, JoinRoomSchema, LeaveRoomSchema, ChatSchema } from "@repo/common/payloadSchemas";

const port = 3002;
const wss = new WebSocketServer({ port });

interface User {
    ws: WebSocket,
    rooms: Number[],
    userId: string
}

const users: User[] = [];

function checkUser(token: string): string | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (typeof decoded == "string") {
            return null;
        }
        if (!decoded || !decoded.userId) {
            return null;
        } else {
            return decoded.userId;
        }
    } catch (e) {
        return null;
    }
    return null;
}

wss.on('connection', (ws: WebSocket, req: Request) => {
    const url = req.url;
    if (!url) {
        return;
    }

    const queryParam = new URLSearchParams(url.split('?')[1]);
    const token = queryParam.get('token') || "";
    const userId = checkUser(token);

    if (!userId) {
        ws.close();
        return null;
    }

    users.push({
        ws,
        rooms: [],
        userId
    });

    ws.on('open', async () => {
        console.log('connection opened | new user ', users.at(users.length - 1)?.userId);
    });

    ws.on('close', async (code, reason) => {
        console.log('connection closed | removing user ', users.at(users.length - 1)?.userId);
        users.filter((value) => value.userId != userId);
    });

    ws.on('message', async (data, isBinary) => {
        const parsedData = JSON.parse(data as unknown as string);

        const joinRoomResult = joinRoomSchema.safeParse(parsedData);
        const leaveRoomResult = leaveRoomSchema.safeParse(parsedData);
        const chatResult = chatSchema.safeParse(parsedData);

        if (joinRoomResult.success) {

            const joinData: JoinRoomSchema = joinRoomResult.data;
            const user = users.find((value, index) => ws === value.ws);
            user?.rooms.push(joinData.roomId);

        } else if (leaveRoomResult.success) {

            const leaveData: LeaveRoomSchema = leaveRoomResult.data;
            const user = users.find((value) => ws === value.ws);
            if (!user) {
                return;
            }
            user.rooms = user.rooms.filter((value) => value != leaveData.roomId);

        } else if (chatResult.success) {

            const chatData: ChatSchema = chatResult.data;
            await prismaClient.chat.create({
                data: {
                    message: chatData.message,
                    roomId: chatData.roomId,
                    userId: userId
                }
            });

            users.forEach((value, index) => {
                if (value.rooms.includes(chatData.roomId)) {
                    value.ws.send(JSON.stringify({
                        type: "chat",
                        message: chatData.message,
                        roomId: chatData.roomId
                    }))
                }
            });

        }
    });
})

console.log('Websocket server running on port ', port);