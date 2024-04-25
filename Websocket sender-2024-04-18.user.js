// ==UserScript==
// @name         Websocket sender
// @namespace    http://tampermonkey.net/
// @version      2024-04-18
// @description  Sends 30 websocket messages to allow users to know which message ids do what, the script is ass and i gotta fix it later
// @author       fizzixww
// @match        https://sploop.io/
// @icon         https://static-00.iconduck.com/assets.00/websocket-icon-512x384-sm7dfowk.png
// @grant        none
// ==/UserScript==
/*
    const hat = {
        Bush_Hat: 1,
        Berserker_Gear: 2,
        Jungle_Gear: 3,
        Crystal_Gear: 4,
        Spike_Gear: 5,
        Immunity_Gear: 6,
        Boost_Hat: 7,
        Apple_Hat: 8,
        Scuba_Gear: 9,
        Hood: 10,
        Demolist: 11
    };

    const item = {
        UNKNOWN: 0,
        UNKNOWN: 1,
        UNKNOWN: 2,
        UNKNOWN: 3,
        UNKNOWN: 4,
        Wall: 5,
        Boost: 6,
        Spike: 7,
        UNKNOWN: 8,
        Trap: 9,
        UNKNOWN: 10,
        UNKNOWN: 11,
        Cookie: 12,
        UNKNOWN: 13,
        UNKNOWN: 14,
        Hammer: 15,
        UNKNOWN: 16,
        UNKNOWN: 17,
        UNKNOWN: 18,
        UNKNOWN: 19,
        Hard_Spike: 20,
        UNKNOWN: 21,
        UNKNOWN: 22,
        UNKNOWN: 23,
        UNKNOWN: 24,
        UNKNOWN: 25,
        UNKNOWN: 26,
        UNKNOWN: 27,
        Naginata: 28,

        const FunctionId = {
        Hat: 5,
        Item: 2,
        DeleteClan: 24,
    }
    }*/

(function() {
    'use strict';

    // Create customDisplay div
    const customDisplay = document.createElement('div');
    customDisplay.id = 'customDisplay';
    customDisplay.textContent = 'Custom: 0';

    // Style customDisplay div
    customDisplay.style.position = 'fixed';
    customDisplay.style.top = '0';
    customDisplay.style.left = '50%';
    customDisplay.style.transform = 'translateX(-50%)';
    customDisplay.style.backgroundColor = 'lightgray';
    customDisplay.style.padding = '10px';
    customDisplay.style.border = '1px solid black';

    // Append customDisplay div to document body
    document.body.appendChild(customDisplay);

    // Create an object with item and value
    var killCount = 0;
    var sockets = new Map();
    window.SOCKETS = sockets;

    // Modify WebSocket prototype
    WebSocket.prototype.lastSend = WebSocket.prototype.send;
    WebSocket.prototype.id = Symbol();
    WebSocket.prototype.send = function(data) {
        this.lastSend(data);
        if (sockets.has(this.id)) return;
        sockets.set(this.id, this);
    };

    // Function to send WebSocket data with delay
    function sendWebSocketData(delay, custom) {
        setTimeout(() => {
            const encodedData = new Uint8Array([2, custom]);
            sockets.forEach(socket => {
                socket.send(encodedData);
                socket.send(new Uint8Array([7, ...new TextEncoder().encode(`Message sent`)]));
            });
            document.getElementById('customDisplay').textContent = `Custom: ${custom}`;
        }, delay);
    }

    // Delay execution by 5 seconds
    setTimeout(() => {
        for (let i = 0; i <= 30; i++) {
            sendWebSocketData(i * 5000, i);
        }
    }, 3000); // 5 seconds delay

})();
