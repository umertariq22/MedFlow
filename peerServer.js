const { PeerServer } = require('peer');

const peerServer = PeerServer({
  port: 9000,
  path: '/myapp', 
  allow_discovery: true 
});

peerServer.on('connection',(client) => {
  console.log('client connected', client.id);
  peerServer.emit("newConnection", client.id);
});

peerServer.on('disconnect',(client) => {
  console.log('client disconnected', client.id);
});

module.exports =  { peerServer };
