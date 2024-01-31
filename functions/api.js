// functions/api.js
const { createServer } = require('http');
const { createProxyServer } = require('http-proxy');

const proxy = createProxyServer({
  target: 'http://127.0.0.1:8000', // Your FastAPI server address
  ws: true,
});

createServer((req, res) => {
  proxy.web(req, res);
}).listen(3000);
