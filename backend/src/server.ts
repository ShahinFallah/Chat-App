import { server } from './webSocket/socket.io';
const PORT = process.env.PORT || 9810;

server.listen(PORT, () => console.log(`Started server http://localhost:${PORT}`));