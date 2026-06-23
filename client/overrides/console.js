// Salva referências para os métodos originais do console
const _privateLog = console.log;
const _privateError = console.error;
const _privateWarn = console.warn;

// Sobrescreve o console.log
console.log = function(...args) {
    if (socket?.connected) {
        args.splice(1,1)
        socket.emit('client:stdout', { type: 'log', data: JSON.stringify(args.join(' '))});
    }
    _privateLog.apply(console, arguments);
};

// Sobrescreve o console.error
console.error = function(...args) {
    if (socket?.connected) {
        args.splice(1,1)
        socket.emit('client:stdout', { type: 'error', data: JSON.stringify(args.join(' '))});
    }
    _privateError.apply(console, arguments);
};

// Sobrescreve o console.warn
console.warn = function(...args) {
    if (socket?.connected) {
        args.splice(1,1)
        socket.emit('client:stdout', { type: 'warn', data: JSON.stringify(args.join(' '))});
    }
    _privateWarn.apply(console, arguments);
};
