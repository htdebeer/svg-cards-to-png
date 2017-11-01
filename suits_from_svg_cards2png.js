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

const SUIT_WIDTH = 15.42;
const SUIT_HEIGHT = 15.88;

const SUITS = ["club", "diamond", "spade", "heart"];

// Parse command line options
const optionDefinitions = [
    {name: "scale", alias: "s", type: Number, defaultValue: 1},
    {name: "directory", alias: "d", type: String, defaultValue: "./png"}
];
const options = commandLineArgs(optionDefinitions);

const directory = options["directory"];
const scale = options["scale"];

// Create the output directory if it does not yet exist
if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
}

// Generate the cards
(async () => {
    const browser = await puppeteer.launch({headless: true});

    for (const suit of SUITS) {
        const url = `http://localhost:8080/card.html#suit-${suit}?scale=${scale}`;
        const page = await browser.newPage();

        const width = SUIT_WIDTH * scale;
        const height = SUIT_HEIGHT * scale;

        await page.goto(url);
        await page.screenshot({
            path: `${directory}/suit-${suit}.png`,
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
