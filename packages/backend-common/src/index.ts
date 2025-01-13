import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });
export const JWT_SECRET: string = process.env.JWT_SECRET || "123123";