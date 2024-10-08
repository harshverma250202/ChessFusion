import http from "http";
import express from "express";
import logger from "morgan";
import cors from "cors";
import { Server } from 'socket.io';
// mongo connection
import "./config/mongo.js";
// socket configuration
import connection from "./utils/WebSocket.js"

const app = express();

/** Get port from environment and store in Express. */
const port = process.env.PORT || "5020";
app.set("port", port);

app.use(logger("dev"));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('*', (req, res) => {
    return res.status(404).json({
        success: false,
        message: 'API endpoint doesnt exist'
    })
});

/** Create HTTP server. */
const server = http.createServer(app);
/** Create socket connection */
global.io = new Server(server, {
    cors: {
        origin: "*"
    }
});

global.io.on('connection', (socket) => {
    connection(socket)
})
/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
    console.log(`Listening on port:: http://localhost:${port}/`)
});