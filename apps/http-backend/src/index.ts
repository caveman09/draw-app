import express from 'express';
import { authMiddleware } from './middleware.js';
import { CreateUserSchema, SigninSchema } from "@repo/common/types";
import { prismaClient } from '@repo/db/client';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', authMiddleware, async (req, res) => {
    const token = req.header('authorization');
});

app.get('/signup', async (req, res) => {
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

app.get('/signin', async (req, res) => {
    const parsedData = SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
        console.log(parsedData.error);
        res.json({
            message: 'Incorrect inputs'
        });
        return;
    }
    try {
        const user = await prismaClient.user.findFirst({
            where: {
                email: parsedData.data.username,
                password: parsedData.data.password
            }
        });
        if (!user) {
            throw new Error('User not found');
        }
        const token = jwt.sign({ userId: user.id }, JWT_SECRET);
        res.json({ token });
    } catch (e) {
        res.status(401).json({ message: e });
    }
});

app.get('/room', authMiddleware, async (req, res) => {

});

app.listen(port, () => {
    console.log('HTTP server running on port ', port);
});