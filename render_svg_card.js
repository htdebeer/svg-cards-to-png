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
const parse = function (str) {
  const parts = str.split("?");
  
  return {
    name: (parts[0] || "#back").slice(1),
    scale: (parts[1] || "scale=1").split("=")[1]
  };
};

const SVGNS = "http://www.w3.org/2000/svg";
const XLINK = "http://www.w3.org/1999/xlink";

const SVG_CARDS = "SVG-cards/svg-cards.svg";

const CARD_WIDTH = 169.075;
const CARD_HEIGHT = 244.64;

const render = function (config) {
  const name = config.name;
  const scale = config.scale;

  const svg = document.createElementNS(SVGNS, "svg");
  svg.setAttribute("width", CARD_WIDTH * scale);
  svg.setAttribute("height", CARD_HEIGHT * scale);

  const use = document.createElementNS(SVGNS, "use");
  use.setAttributeNS(XLINK, "xlink:href", SVG_CARDS + "#" + name);
  use.setAttribute("x", 0);
  use.setAttribute("y", 0);
  use.setAttribute("transform", "scale(" + scale + ")");
  
  svg.appendChild(use);
  document.body.appendChild(svg);
};

render(parse(window.location.hash));
