import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@repo/backend-common/config";

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {

}
