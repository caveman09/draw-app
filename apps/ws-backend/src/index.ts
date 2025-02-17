import { WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";
import { joinRoomSchema, leaveRoomSchema, chatSchema, JoinRoomSchema, LeaveRoomSchema, ChatSchema, ChatMessageSchema, chatMessageSchema } from "@repo/common/payloadSchemas";
import express from "express";
import cookieParser from "cookie-parser";
import { createServer } from 'http';

const app = express();
const server = createServer(app);

app.use(cookieParser());    // might remove this
app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:3000', 'http://192.168.1.40:3000'];
    const origin = req.headers.origin || '';
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

const port = 3002;
const wss = new WebSocketServer({ server });

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

    console.log('new ws connection');

    const queryParam = new URLSearchParams(url.split('?')[1]);
    const token = queryParam.get('token') || "";
    const userId = checkUser(token);

    console.log(userId);

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
            if (!user) {
                return;
            }

            const existingRoomUser = await prismaClient.roomUser.findFirst({
                where: {
                    userId: user.userId,
                    roomId: joinData.roomId
                }
            });

            if (!existingRoomUser) {
                user.rooms.push(joinData.roomId);
                if (user.userId && joinData.roomId) {
                    await prismaClient.roomUser.create({
                        data: {
                            userId: user.userId,
                            roomId: joinData.roomId
                        }
                    });
                }
            } else {
                user.rooms.push(joinData.roomId);
            }

        } else if (leaveRoomResult.success) {

            const leaveData: LeaveRoomSchema = leaveRoomResult.data;
            const user = users.find((value) => ws === value.ws);
            if (!user) {
                return;
            }
            user.rooms = user.rooms.filter((value) => value != leaveData.roomId);
            if (user.userId && leaveData.roomId) {
                await prismaClient.roomUser.delete({
                    where: {
                        userId_roomId: {
                            userId: user.userId,
                            roomId: leaveData.roomId
                        }
                    }
                })
            }

        } else if (chatResult.success) {

            const chatData: ChatSchema = chatResult.data;
            const messageData = await prismaClient.chat.create({
                data: {
                    message: chatData.message,
                    roomId: chatData.roomId,
                    userId: userId
                }
            });

            users.forEach((value, index) => {
                if (value.rooms.includes(chatData.roomId)) {
                    value.ws.send(JSON.stringify(messageData))
                }
                console.log(value.userId);
            });

        }
    });
})

server.listen(port);
console.log('Websocket server running on port ', port);