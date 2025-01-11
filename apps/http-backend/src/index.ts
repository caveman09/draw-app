import express from 'express';

const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {

});

app.listen(port, () => {
    console.log('HTTP server running on port ', port);
});