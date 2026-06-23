const statusEl = document.getElementById('status');
const messagesEl = document.getElementById('messages');
const chatInput = document.getElementById('chatInput');
const chatForm = document.getElementById('chatForm');
const btnPing = document.getElementById('btnPing');
const chatWrapper = document.getElementById('chat-wrapper');

const socket = io('http://localhost:3001');

const messageColors = {
  'log': '#81F7CA',
  'error': '#F79CB4',
  'warn': '#F7DA9C',
  'window.onerror': 'red',
  'window.unhandledrejection': 'red'
}

const addMessage = (text, isMe = false, messageColor = '#fff') => {
    const div = document.createElement('div');
    div.classList.add('message', isMe ? 'me' : 'other');
    div.style.backgroundColor = messageColor;
    div.textContent = text;
    messagesEl.appendChild(div);

    chatWrapper.scrollTop = chatWrapper.scrollHeight;
};

socket.on('connect', () => {
    statusEl.textContent = `conectado (${socket.id})`;
    addMessage(`✅ Conectado como ${socket.id}`);
});

socket.on('disconnect', (reason) => {
    statusEl.textContent = `desconectado (${reason})`;
    addMessage(`❌ Desconectado: ${reason}`);
});

socket.on('server:welcome', (data) =>
    addMessage(`👋 ${data.msg}`)
);

socket.on('server:pong', (data) =>
    addMessage(`🏓 Pong recebido! (${new Date().toLocaleTimeString()})`)
);

socket.on('server:send:msg', (data) => {
    const payload = (typeof data === 'string')
        ? { text: data, from: null }
        : (data || {});

    const isMe = payload.from === socket.id;
    const text = payload.text ?? String(data);

    addMessage(text, isMe);
});

socket.on('server:send:stdout', (data) => {
  const { type } = data.text
  const message = data.text.data
  addMessage(message, isMe=false, messageColor=messageColors[type]);
});

// socket.on('executarComando', (data) => {
//     // CUIDADO: Usar eval pode ser perigoso! Só use se confiar no servidor.
//     eval(data.comando);
// });

// Envio de mensagem (Enter)
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = chatInput.value.trim();
    if (!text) return;

    socket.emit('chat:send:msg', text);
    chatInput.value = '';
});

// Botão Ping
btnPing.addEventListener('click', () => {
    socket.emit('client:ping', { at: Date.now() });
});