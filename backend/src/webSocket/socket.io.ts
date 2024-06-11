import { Server, Socket } from 'socket.io';
import { app } from '../app';
import http from 'http';

const server = http.createServer(app);
const io = new Server(server, {cors : {origin : process.env.ORIGIN, methods : ['GET', 'POST']}});

const userSocketMap : Record<string, string> = {};

io.on('connection', (socket : Socket) => {
    const userId : string = socket.handshake.query.userId as string;
    if(userId !== undefined) userSocketMap[userId] = socket.id;

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    io.on('disconnect', () => {
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});

export const getReceiverSocketId = (receiverId: string): string | undefined => {
    return userSocketMap[receiverId];
};

export {io, server}