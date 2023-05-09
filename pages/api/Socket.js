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

      socket.on("callUser",(data) =>{
        let id = data.to;
        let from = data.from;
        socket.to(id).emit("callUser", data);
      })

      socket.on("answerCall",(data) =>{
        let id = data.to;
        socket.to(id).emit("callAccepted", data);
      })

      socket.on("disconnectCall",(data) =>{
        let id = data.to;
        socket.to(id).emit("callEnded", data);
      })

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
