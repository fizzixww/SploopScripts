// ==UserScript==
// @name         OP Hat Menu
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Special hat menu that shows important hats
// @author       fizzixww
// @match        *://*.sploop.io/*
// @icon         https://pbs.twimg.com/profile_images/1345266594138750976/LahVpYPh_400x400.jpg
// @run-at document-start
// ==/UserScript==

(function() {
    'use strict';

    let Hatshp = null;

    // Function to create a square element with buttons
    function createHatshp() {
        Hatshp = document.createElement('div');
        Hatshp.style.width = '270px';
        Hatshp.style.height = '100px';
        Hatshp.style.backgroundColor = 'rgba(200, 200, 200, 0)';
        Hatshp.style.position = 'fixed';
        Hatshp.style.top = '50%';
        Hatshp.style.left = '50%';
        Hatshp.style.transform = 'translate(-50%, -50%)';
        Hatshp.style.display = 'flex';
        Hatshp.style.justifyContent = 'center';
        Hatshp.style.alignItems = 'center';
        // Create button 1
        const button1 = createButton('https://sploop.io/img/entity/hat_1.png?v=1923912', 1);
        const button2 = createButton('https://sploop.io/img/entity/hat_11.png?v=1923912', 2);
        const button3 = createButton('https://sploop.io/img/entity/hat_3.png?v=1923912', 3);

        // Append buttons to the div
        Hatshp.appendChild(button1);
        Hatshp.appendChild(button2);
        Hatshp.appendChild(button3);

        // Append the div to the body
        document.body.appendChild(Hatshp);
    }

    // Function to create a button with an image
    function createButton(imageSrc, index) {
        const button = document.createElement('button');
        button.style.width = '90px';
        button.style.height = '90px';
        button.style.background = `url(${imageSrc})`;
        button.style.backgroundSize = 'cover';
        button.style.border = 'none';
        button.addEventListener('mouseover', function() {
            button.style.border = '1px solid rgba(0, 0, 0, 1)';
        });
        button.addEventListener('mouseout', function() {
            button.style.border = 'none';
        });
        button.addEventListener('click', function(event) {
            // Retrieve the button index from the dataset
            const buttonIndex = index;

            // Perform different actions based on the button index
            switch (buttonIndex) {
                case 1:
                    removeHatshp();
                    equipHat(1);
                    break;
                case 2:
                    removeHatshp();
                    equipHat(10);
                    break;
                case 3:
                    removeHatshp();
                    equipHat(3);
                    break;
                default:
                    console.log('ok..');
            }
        });
        return button;
    }

    // Function to remove the square element
    function removeHatshp() {
        if (Hatshp) {
            document.body.removeChild(Hatshp);
            Hatshp = null;
        }
    }

    // Event listener for key press
    document.addEventListener('keydown', function(event) {
        if (event.key === 'q' || event.key === 'Q') {//////////////////////////////////////// Change q to whatever keybind you want////////////////////////////////////////
            if (!Hatshp) {
                createHatshp();
            } else {
                removeHatshp();
            }
        }
    });

    // Integration of the second IIFE content starts here

    const HATS = {
        BUSH_HAT: 0,
        BERSERKER: 1,
        JUNGLE_GEAR: 2,
        CRYSTAL_GEAR: 3,
        SPIKE_GEAR: 4,
        IMMUNITY_GEAR: 5,
        BOOST_HAT: 6,
        APPLE_HAT: 7,
        SCUBA_GEAR: 8,
        HOOD: 9,
        DEMOLIST: 10
    };

    // Change your keybinds if you need to, get list of the key codes here: https://keycode.info
    // Please use `event.code` to change keybind
    // If you don't need a keybind, leave the field empty ""

    const KEYBINDS = {
        [HATS.BUSH_HAT]: "",
        [HATS.BERSERKER]: "",
        [HATS.JUNGLE_GEAR]: "",
        [HATS.CRYSTAL_GEAR]: "",
        [HATS.SPIKE_GEAR]: "",
        [HATS.IMMUNITY_GEAR]: "",
        [HATS.BOOST_HAT]: "",
        [HATS.APPLE_HAT]: "",
        [HATS.SCUBA_GEAR]: "",
        [HATS.HOOD]: "",
        [HATS.DEMOLIST]: ""
    };

    const log = console.log;
    const storage = {
        get(key) {
            const value = localStorage.getItem(key);
            return value === null ? null : JSON.parse(value);
        },
        set(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    };

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function isInput() {
        return document.activeElement.tagName === "INPUT";
    }

    function inGame() {
        const homepage = document.querySelector("#homepage");
        return homepage && homepage.style.display !== "flex";
    }

    function canEquip() {
        return !isInput() && inGame();
    }

    function createKeyboardEvent(type, code) {
        return new Proxy(new KeyboardEvent(type), {
            get(target, prop) {
                if (prop === "isTrusted") return true;
                if (prop === "target") return document.body;
                if (prop === "code") return code;
                return target[prop];
            }
        })
    }

    function keypress(code) {
        const keydown = createKeyboardEvent("keydown", code);
        const keyup = createKeyboardEvent("keyup", code);
        window.onkeydown(keydown);
        window.onkeyup(keyup);
    }

    function mouseup(target) {
        target.onmouseup(new Proxy(new MouseEvent("mouseup"), {
            get(target, prop) {
                if (prop === "isTrusted") return true;
                if (prop === "target") return target;
                return target[prop];
            }
        }));
    }

    let equipToggle = false;
    async function equipHat(index) {
        if (!canEquip() || equipToggle) return;
        equipToggle = true;

        const hatActionButton = document.querySelectorAll(".hat_action_button")[index];
        if (!hatActionButton) throw new Error("Failed to find hat with index: " + index);

        const keybinds = storage.get("keybinds");
        const OpenShopKey = keybinds && keybinds[18] || "KeyN";

        keypress(OpenShopKey);
        await sleep(150);
        if (hatActionButton.textContent === "BUY") {
            mouseup(hatActionButton);
        }
        mouseup(hatActionButton);
        await sleep(150);
        keypress(OpenShopKey);

        await sleep(1500);
        equipToggle = false;
    }

    window.addEventListener("keydown", function(event) {
        if (event.repeat) return;

        for (const key in KEYBINDS) {
            if (event.code === KEYBINDS[key]) {
                equipHat(key);
                break;
            }
        }
    })

})();


