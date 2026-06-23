// Captura erros globais de JS
// window.onerror = function(message, source, lineno, colno, error) {
//     debugger
//     if (socket?.connected) {
//         socket.emit('client:stdout', {
//             type: 'window.onerror',
//             data: JSON.stringify({
//                 message,
//                 source,
//                 lineno,
//                 colno,
//                 stack: error && error.stack ? error.stack : null,
//                 userAgent: navigator.userAgent,
//                 timestamp: new Date().toISOString()
//             })
//         });
//     }
//     return false;
// };

// // Captura erros não tratados em Promises
// window.addEventListener('unhandledrejection', function(event) {
//     debugger
//     if (socket?.connected) {
//         socket.emit('client:stdout', {
//             type: 'window.unhandledrejection',
//             data: JSON.stringify({
//                 reason: event.reason,
//                 userAgent: navigator.userAgent,
//                 timestamp: new Date().toISOString()
//             })
//         });
//     }
// });