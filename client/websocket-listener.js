const socket = io('http://localhost:3001');

// MUITO CUIDADO: Usar eval pode ser perigoso! Só use se confiar no servidor.
socket.on('server:send:command', (data) => {
eval(data.comando);
});