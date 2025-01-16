import express from 'express';
import { authMiddleware } from './middleware.js';
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/types";
import { prismaClient } from '@repo/db/client';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', authMiddleware, async (req, res) => {
    const token = req.header('authorization');
});

app.post('/signup', async (req, res) => {
    const parsedData = CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        console.log(parsedData.error);
        res.json({
            message: 'Incorrect inputs'
        });
        return;
    }
    try {
        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data?.username,
                password: parsedData.data.password,
                name: parsedData.data.name
            }
        });
        res.json({ userId: user.id });
    } catch (e) {
        res.status(411).json({ message: 'User already exists !' });
    }
});

app.post('/signin', async (req, res) => {
    const parsedData = SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
        console.log(parsedData.error);
        res.json({
            message: 'Incorrect inputs'
        });
        return;
    }
    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    });
    if (!user) {
        res.status(403).json({ message: 'Not authorized !' });
        return;
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.json({ token });
});

app.post('/room', authMiddleware, async (req, res) => {
    console.log(req.body);
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({ message: 'Incorrect inputs' });
        return;
    }
    // @ts-ignore
    const userId = req.userId;
    console.log(userId);
    try {
        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId
            }
        });
        res.json({ roomId: room.id });
    } catch (e) {
        res.status(411).json({ message: 'Room already exists!' });
    }
});

app.listen(port, () => {
    console.log('HTTP server running on port ', port);
});