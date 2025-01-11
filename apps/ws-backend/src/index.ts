import { WebSocket, WebSocketServer } from "ws";

const port = 3002;
const wss = new WebSocketServer({ port });

wss.on('connection', (ws: WebSocket) => {

})

console.log('Websocket server running on port ', port);