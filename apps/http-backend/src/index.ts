import express from 'express';
import { authMiddleware } from './middleware.js';
import { CreateUserSchema, SigninSchema } from "@repo/common/types";

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', authMiddleware, async (req, res) => {
    const token = req.header('authorization');
});

app.get('/signup', (req, res) => {
    const parsedData = CreateUserSchema.safeParse(req.body);
});

app.get('/signin', (req, res) => {
    const { username, password } = req.body;
});

app.get('/room', authMiddleware, async (req, res) => {

});

app.listen(port, () => {
    console.log('HTTP server running on port ', port);
});