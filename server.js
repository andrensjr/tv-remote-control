const http = require('http');
const fs = require('fs');
const path = require('path');
const { Server } = require("socket.io");

// 1. Cria um servidor HTTP
const httpServer = http.createServer((req, res) => {
  // Define o caminho do arquivo solicitado, tratando a raiz como 'index.html'
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

  // Obtém a extensão do arquivo para definir o Content-Type correto
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
  };
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end(`File not found: ${req.url}`);
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  })
});

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {
  socket.emit('server:welcome', { msg: 'Bem vindo', id: socket.id });
  console.log('user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });

  socket.on('chat:send:msg', (text) => {
    console.log('sending message ...', text)
    io.emit('server:send:msg', {from: socket.id, text, at: Date.now()})
    io.emit('server:send:command', { comando: text });
  });

  socket.on('client:stdout', (text) => {
    console.log('printing stdouttttt: ', text)
    io.emit('server:send:stdout', {from: socket.id, text, at: Date.now()})
  })
});

httpServer.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
