# Convert SVG-cards to PNG

## Rationale

While developing a JavaScript playing card library using the nice
[SVG-cards](https://github.com/htdebeer/SVG-cards), I found that using
[`USE`](https://developer.mozilla.org/en/docs/Web/SVG/Element/use) elements to
show a lot of cards performed badly. To speed things up, bitmap
representations of the SVG cards seemed a good idea. 

I first tried converting the SVG cards to PNG in the web browser by drawing
the [SVG dom into the HTML
`CANVAS`](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Drawing_DOM_objects_into_a_canvas),
adding an event handler to the canvas to download the rendered bitmap. To my
surprise, however, this did not work out because of the `CANVAS` security
constraints regarding rendering external files. Next, I switched to the
command line and tried to convert the cards using
[rsvg](https://developer.gnome.org/rsvg/2.40/) and
[Inkscape](https://inkscape.org/en/). Again I was surprised: these programs do
not render external SVG elements at all! 

In the end I got the conversion working by using the
[Chromium](https://www.chromium.org/) web browser in headless mode via
[puppeteer](https://github.com/GoogleChrome/puppeteer). Each SVG card is
rendered in turn and saves to a PNG file. In this repository I publish the
scripts I used in this conversion.

## Requirements

- [PhantomJS](http://phantomjs.org/)
- [http-server](https://github.com/indexzero/http-server)

## Usage

0.  Clone this repository and fetch the
    [SVG-cards](https://github.com/htdebeer/SVG-cards) submodule:

        git clone https://github.com/htdebeer/svg-cards-to-png.git
        cd svg-cards-to-png
        cd SVG-cards
        git fetch
        cd ..
        npm install

1.  Start http-server in the root directory of this project:

        http-server .

2.  Run the `svg_cards2png.js` script with, optionally, the
    amount you want to scale the cards. For example:

        node svg_cards2png.js 2

    will generate cards (plus the back card) twice its natural size of
    169.075×244.64 pixels. So, these PNG files have a resolution of 338×489
    pixels.

3.  Wait till the conversion is finished. The PNG files are placed in the sub
    directory `png`.

5.  You now can use the PNG cards! Note that as the original
    [SVG-cards](https://github.com/htdebeer/SVG-cards) are licenced under the
    [LGPLv3](https://www.gnu.org/licenses/lgpl-3.0.en.html), using the PNG
    cards means you have to adhere to that licence as well.

## Licence

The code of the converter is licenced under the
[GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html).
