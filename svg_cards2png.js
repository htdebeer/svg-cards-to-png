#!/usr/bin/env node
/** 
 * Copyright 2017 Huub de Beer <Huub@heerdebeer.org>
 * 
 * This file is part of svg-cards-to-png.
 * 
 * svg-cards-to-png is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation, either version 2 of the License, or (at your option)
 * any later version.
 * 
 * Foobar is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more
 * details.
 * 
 * You should have received a copy of the GNU Lesser General Public License along
 * with svg-cards-to-png. If not, see <http://www.gnu.org/licenses/>.
 */
const fs = require("fs");
const commandLineArgs = require("command-line-args");
const puppeteer = require("puppeteer");

const CARD_WIDTH = 169.075;
const CARD_HEIGHT = 244.64;

// Generate the cards.
const SUITS = ["club", "diamond", "spade", "heart"];
const RANKS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
const CARDS = SUITS.reduce((cards, suit) => {
    return cards
        .concat(
            RANKS.map((rank) => {
                return rank + "_" + suit;
            })
        );
}, []).concat("black_joker", "red_joker", "back", "card-base");

// Parse command line options
const optionDefinitions = [
    {name: "scale", alias: "s", type: Number, defaultValue: 1},
    {name: "directory", alias: "d", type: String, defaultValue: "./png"},
    {name: "color", alias: "c", type: String, defaultValue: "#0062ff"}
];
const options = commandLineArgs(optionDefinitions);

const directory = options["directory"];
const scale = options["scale"];
const color = options["color"];

// Create the output directory if it does not yet exist
if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
}

// Generate the cards
(async () => {
    const browser = await puppeteer.launch({headless: true});

    for (const cardName of CARDS) {
        const url = `http://localhost:8080/card.html#${cardName}?scale=${scale}&color=${color}`;
        const page = await browser.newPage();

        const width = CARD_WIDTH * scale;
        const height = CARD_HEIGHT * scale;

        await page.goto(url);
        await page.screenshot({
            path: `${directory}/${cardName}.png`,
            clip: {
                x: 0,
                y: 0,
                width: width,
                height: height
            },
            omitBackground: true
        });
    }

    await browser.close();
})();
