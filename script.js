document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.input');
    const output = document.getElementById('output');
    const terminal = document.querySelector('.terminal');
    const welcomeMessage = `
__     __    _                       ____ _                         
\\ \\   / /__ | |_   _ _ __ ___   ___ / ___| |__   ___  ___  ___  ___ 
 \\ \\ / / _ \\| | | | | '_ \` _ \\ / _ \\ |   | '_ \\ / _ \\/ _ \\/ __|/ _ \\
  \\ V / (_) | | |_| | | | | | |  __/ |___| | | |  __/  __/\\__ \\  __/
   \\_/ \\___/|_|\\____|_| |_| |_|\\___|\\____|_| |_|\\___|\\___||___/\\___|
    Welcome root user for help use "system -h"
`;

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim();
            if (command) {
                const newLine = document.createElement('div');
                newLine.classList.add('line');
                newLine.innerHTML = `<span class="prompt">[root@volumecheese ~]$</span> ${command}`;
                output.appendChild(newLine);
                input.value = '';

                handleCommand(command);
            }
        }
    });

    function handleCommand(command) {
        const args = command.split(' ');
        const cmd = args[0];
        args.shift();

        switch (cmd) {
            case 'system':
                if (args[0] === '-p') {
                    displayMessage('');
                } else if (args[0] === '-h') {
                    displayMessage('Available commands:\n- system, clear, echo, date, display.');
                } else {
                    displayMessage(`system: bad usage.\nTry 'system -h' for more information`);
                }
                break;
            case 'clear':
                output.innerHTML = '';
                terminal.querySelector('pre').style.display = 'none';
                break;
            case 'echo':
                displayMessage(args.join(' '));
                break;
            case 'date':
                displayMessage(new Date().toString());
                break;
            case 'display':
                displayPreformattedMessage(welcomeMessage);
                break;
            default:
                displayMessage(`command not found: ${cmd}`);
                break;
        }

        // Scroll to bottom of the terminal
        window.scrollTo(0, document.body.scrollHeight);
    }

    function displayMessage(message) {
        const response = document.createElement('div');
        response.classList.add('line');
        response.textContent = message;
        output.appendChild(response);
    }

    function displayPreformattedMessage(message) {
        const response = document.createElement('pre');
        response.classList.add('line');
        response.textContent = message;
        output.appendChild(response);
    }

    // Set the welcome message
    terminal.querySelector('pre').innerHTML = welcomeMessage;
});
