import { Server } from 'socket.io';

export default function Socket(req, res) {
  if (!res.socket.server.io) {
    console.log('Initializing Socket.io');
    const io = new Server(res.socket.server);

    io.on('connection', (socket) => {
      console.log('a user connected');

      socket.on('sendMessage', (data) => {
        socket.broadcast.emit('message', data);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
