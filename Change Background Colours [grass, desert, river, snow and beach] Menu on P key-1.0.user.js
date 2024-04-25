// ==UserScript==
// @name         Change Background Colours [grass, desert, river, snow and beach] Menu on P key
// @version      1.0
// @description  Press "P" to open the colour menu
// @namespace    tampermoney
// @author       fizzixww
// @match        https://sploop.io/
// @icon         https://i.postimg.cc/qMqNSYJK/profile-pic.jpg
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    let colorMappings = {
        "grass": localStorage.getItem("grass") || "#788f57",
        "desert": localStorage.getItem("desert") || "#b38354",
        "river": localStorage.getItem("river") || "#2a8b9b",
        "snow": localStorage.getItem("snow") || "#ece5db",
        "beach": localStorage.getItem("beach") || "#fcefbb"
    };

    const { fillRect } = CanvasRenderingContext2D.prototype;
    CanvasRenderingContext2D.prototype.fillRect = function(x, y, width, height) {
        const canvas = document.getElementById("game-canvas");
        const ctx = canvas.getContext("2d");

        if (this.fillStyle === "#788f57") {
            this.fillStyle = colorMappings["grass"];
        } else if (this.fillStyle === "#b38354") {
            this.fillStyle = colorMappings["desert"];
        } else if (this.fillStyle === "#2a8b9b") {
            this.fillStyle = colorMappings["river"];
        } else if (this.fillStyle === "#ece5db") {
            this.fillStyle = colorMappings["snow"];
        } else if (this.fillStyle === "#fcefbb") {
            this.fillStyle = colorMappings["beach"];
        }

        fillRect.call(this, ...arguments);
    };

    let menuOpen = false;

    document.addEventListener("keydown", function(event) {
        if (event.key === "p" || event.key === "P") {
            if (!menuOpen) {
                const menuDiv = document.createElement("div");
                menuDiv.id = "color-menu";
                menuDiv.style.position = "fixed";
                menuDiv.style.top = "50%";
                menuDiv.style.left = "50%";
                menuDiv.style.transform = "translate(-50%, -50%)";
                menuDiv.style.backgroundColor = "white";
                menuDiv.style.padding = "20px";
                menuDiv.style.border = "2px solid black";
                menuDiv.style.zIndex = "9999";

                for (const type in colorMappings) {
                    const label = document.createElement("label");
                    label.textContent = `${type}: `;
                    const input = document.createElement("input");
                    input.type = "color";
                    input.value = colorMappings[type];
                    input.addEventListener("change", function() {
                        colorMappings[type] = input.value;
                        localStorage.setItem(type, input.value);
                    });
                    menuDiv.appendChild(label);
                    menuDiv.appendChild(input);
                    menuDiv.appendChild(document.createElement("br"));
                }

                document.body.appendChild(menuDiv);
                menuOpen = true;
            } else {
                const menuDiv = document.getElementById("color-menu");
                menuDiv.remove();
                menuOpen = false;
            }
        }
    });
})(); // 4-0 tundra muahahaaha
/*
 const gridToggle = document.querySelector("#grid-toggle");
setInterval(() => {
            if (gridToggle.checked) gridToggle.click();
}, 0);
            const ttt = document.querySelector("#display-ping-toggle");
setInterval(() => {
            if (ttt.checked) {
            }
    else{
        ttt.click()};
}, 0);

(function() {
const { fillRect } = CanvasRenderingContext2D.prototype;
CanvasRenderingContext2D.prototype.fillRect = function(x, y, width, height) {
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  if (this.fillStyle === "#788f57") {
            this.fillStyle = "#324d35"; }//grass colour
  else if (this.fillStyle === "#b38354") {
      this.fillStyle = "#a6505b"; }//desert colour
  else if (this.fillStyle === "#2a8b9b") {
      this.fillStyle = "#b6b85f"; }//river colour
  else if (this.fillStyle === "#ece5db") {
      this.fillStyle = "#FFFFF0"; }//snow colour
  else if (this.fillStyle === "#fcefbb") {//
      this.fillStyle = "#a6505b"; }//beach to desert
  fillRect.call(this, ...arguments);
};
   const { fillText } = CanvasRenderingContext2D.prototype;
            var textElement = document.createElement('span');
var data = atob('YnkgZml6eml4d3c='); textElement.textContent = data;textElement.style.position = 'absolute';
    textElement.style.top = '0';
    textElement.style.left = '80px';
    textElement.style.zIndex = '9999';
    textElement.style.color = 'rgba(0, 0, 0, 0.03)';document.body.appendChild(textElement)
CanvasRenderingContext2D.prototype.fillText = function(text, x, y) {
    'use strict';
    const canvas = document.getElementById("game-canvas");
    var grd = this.createLinearGradient(20, 0, 220, 0);
grd.addColorStop(0, '#84ffc9');
grd.addColorStop(0.37, '#aab2ff');//https://www.eggradients.com/gradient/cute-bug
grd.addColorStop(1, '#affcaf');
            this.fillStyle = grd;
                var grrrd = this.createLinearGradient(20, 0, 220, 0);
            grrrd.addColorStop(0, '#000000');
            grrrd.addColorStop(1, '#000000');
    this.strokeStyle = grrrd;
    this.strokeText(text, x, y)
    fillText.call(this, ...arguments);
    };

})();*/



