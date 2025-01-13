import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.header('authorization') ?? '';
    if (!token) {
        res.status(401).send('Access Denied');
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);
    if (decodedToken) {
        // have to fix the type error here
        //const userId = decodedToken.userId;
        next();
    } else {
        res.status(403).json({ message: 'Unauthorized' });
    }
}