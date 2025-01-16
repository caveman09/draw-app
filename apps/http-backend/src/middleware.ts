import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';

interface TokenPayload {
    userId: string;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.header('authorization') ?? '';
    if (!token) {
        res.status(401).send('Access Denied');
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);
    if (decodedToken) {
        // @ts-ignore
        const userId = decodedToken.userId;
        console.log('middleware userid ', userId);
        // @ts-ignore
        req.userId = userId;
        next();
    } else {
        res.status(403).json({ message: 'Unauthorized' });
    }
}