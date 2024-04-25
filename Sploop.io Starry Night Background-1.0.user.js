// ==UserScript==
// @name         Sploop.io Starry Night Background
// @version      1.0
// @description  Replace forest with stars!
// @author       fizzixww
// @namespace    fizzixww
// @match        https://sploop.io/*
// @icon         https://i.postimg.cc/1RpjyHWy/fireball.png
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    function replaceRectWithImage() {
        const { fillRect } = CanvasRenderingContext2D.prototype;

        CanvasRenderingContext2D.prototype.fillRect = function(x, y, width, height) {
            const canvas = document.getElementById("game-canvas");
            const ctx = canvas.getContext("2d");
            if (this.fillStyle === "#788f57") {
                ctx.fillStyle = "black";
                ctx.fillRect(x, y, width, height);
                const starPositions = [];
                const numStarsX = Math.ceil(width / 90);
                const numStarsY = Math.ceil(height / 60);
                for (let i = 0; i < numStarsY; i++) {
                    for (let j = 0; j < numStarsX; j++) {
                        const offsetX = (i * numStarsX + j * i) % 60 * 3;
                        const offsetY = (i * numStarsY + j * j) % 60 * 3;
                        starPositions.push({ x: x + j * 90 + offsetX, y: y + i * 60 + offsetY });
                    }
                }
                ctx.fillStyle = "white";
                starPositions.forEach(star => {
                    ctx.fillRect(star.x, star.y, 2, 2);
                });
            }
            else {
                fillRect.call(this, x, y, width, height);
            }
        };
    }
    window.addEventListener('load', replaceRectWithImage);
})();

/* replace background with image, doesnt work because it flashes for some reason
(function() {
    'use strict';

    // Define the function to replace the rectangle with an image
    function replaceRectWithImage() {
        const { fillRect } = CanvasRenderingContext2D.prototype;

        CanvasRenderingContext2D.prototype.fillRect = function(x, y, width, height) {
            const canvas = document.getElementById("game-canvas");
            const ctx = canvas.getContext("2d");

            // Check if the fillStyle is the specific color you want to replace
            if (this.fillStyle === "#788f57") {
                // Replace the rectangle with an image
                const image = new Image();
                image.src = "https://images.unsplash.com/photo-1520034475321-cbe63696469a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // Specify the path to your image
                ctx.drawImage(image, x, y, width, height);
            } else {
                // If the fillStyle is not the specific color, draw the rectangle as usual
                fillRect.call(this, x, y, width, height);
            }
        };
    }

    // Call the function when the page loads
    window.addEventListener('load', replaceRectWithImage);
})();*/