/** 
 * Copyright 2016 Huub de Beer <Huub@heerdebeer.org>
 * 
 * This file is part of svg-cards-to-png.
 * 
 * svg-cards-to-png is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 * 
 * Foobar is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more
 * details.
 * 
 * You should have received a copy of the GNU General Public License along
 * with svg-cards-to-png. If not, see <http://www.gnu.org/licenses/>.
 */
const SUITS = ["club", "diamond", "spade", "heart"];
const RANKS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
const CARDS = SUITS.reduce(function (cards, suit) {
  return cards
    .concat(
        RANKS.map(function (rank) {
          return rank + "_" + suit;
        })
    );
}, []).concat("black_joker", "red_joker", "back");

const CARD_WIDTH = 169.075;
const CARD_HEIGHT = 244.64;
const WAIT = 500;

const toPNG = function (i, scale) {
  if (0 <= i) {
    const name = CARDS[i];
    const url = "http://localhost:8080/card.html#" + name + "?scale=" + scale;
    const page = require("webpage").create();

    page.viewportSize = {
      width: CARD_WIDTH * scale,
      height: CARD_HEIGHT * scale
    };

    page.open(url, function (status) {
      if ("success" === status) {
        page.render(name + ".png");
        console.log("Converted: " + name);
      } else {
        console.error("Error converting: " + name);
      }
    });

    setTimeout(function () {
      toPNG(i - 1, scale);
    }, WAIT);
  } else {
    phantom.exit();
  }
};

toPNG(CARDS.length - 1, require("system").args[1] || 1);
