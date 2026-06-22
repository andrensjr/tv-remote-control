const commandBox = document.getElementById('commandBox');
const playerElement = document.getElementById('player-wrapper');

const handleCommandKey = (event) => {
    event.preventDefault();

    const eventProperties = {
        key: event.key,
        code: event.code,
        bubbles: true,
        cancelable: true,
        keyCode: event.keyCode,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        metaKey: event.metaKey,
        isTrusted: true,
        type: 'keyboard',
    };

    const allowedKeys = [
        'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
        'Enter', 'Backspace', ' ',
        '0','1','2','3','4','5','6','7','8','9'
    ];

    const keyDownMessage = `
        player.core._mediaControl.show();
        const playerElement = document.querySelectorAll('#wp3-player-1')[0];
        const evento = new KeyboardEvent('keydown', ${JSON.stringify(eventProperties)});

        Object.defineProperty(evento, 'keyCode', {
            value: ${event.keyCode},
            writable: false,
            configurable: true
        });

        playerElement.dispatchEvent(evento);
    `
    // 3. Dispare o evento no documento
    // document.dispatchEvent(evento);

    // const eventKeyBoard = {event: text, keyCode: event.keyCode, uiVisible: true}
    // const keyboardEvent = new KeyboardEvent('keydown', JSON.stringify(eventKeyBoard))
    // const defineProperty = Object.defineProperty(evento, 'keyCode', {
    //     value: 38, writable: false, configurable: true });
    // const KeyDownCommandMessage = `document.dispatchEvent({${keyboardEvent})`

    if (allowedKeys.includes(event.key)) {
        socket.emit('chat:send:msg', keyDownMessage);
    }
};

commandBox.addEventListener('focus', () => {
    commandBox.addEventListener('keydown', handleCommandKey);
});

commandBox.addEventListener('blur', () => {
    commandBox.removeEventListener('keydown', handleCommandKey);
});
