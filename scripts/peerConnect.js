import Peer from 'peerjs';

async function generatePeerID() {
  const tokenType = await fetch('/api/validateToken', {
    method: "POST",
    body: JSON.stringify({ token: localStorage.getItem('token') }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const tokenT = await tokenType.json();
  return `${tokenT.type}_${tokenT.id}`;
}

let peer = null;

async function initPeer() {
  const id = await generatePeerID();
  peer = new Peer(id, {
    host: 'localhost',
    port: 9000,
    path: '/myapp',
    debug: 3,
  });
  return peer;
}

const peerPromise = new Promise(async (resolve) => {
  await initPeer();
  resolve(peer);
});

export {peerPromise,generatePeerID};
