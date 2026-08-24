const { PeerServer } = require('peer');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
const PORT = process.env.PORT || 9000;

const peerServer = PeerServer({
  port: PORT,
  path: '/peerjs',
  proxied: true,
  allow_discovery: false,
  alive_timeout: 60000,
  expire_timeout: 5000
});

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

peerServer.on('connection', (clientId) => {
  console.log("客户端接入：", clientId);
});
peerServer.on('disconnect', (clientId) => {
  console.log("客户端断开：", clientId);
});

console.log("PeerJS信令服务启动，端口", PORT);
