import express from 'express';
import authMiddleware from "./middleware";

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', authMiddleware, (req, res) => {
    const token = req.header('authorization');
});

app.get('/signup', (req, res) => {
    const { username, password } = req.body;
});

app.get('/signin', (req, res) => {
    const { username, password } = req.body;
});

app.get('/room', authMiddleware, (req, res) => {

});

app.listen(port, () => {
    console.log('HTTP server running on port ', port);
});