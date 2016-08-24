# Convert SVG-cards to PNG

## Requirements

- [PhantomJS](http://phantomjs.org/)
- [http-server](https://github.com/indexzero/http-server)

## Usage

0.  Clone this repository and fetch the [SVG-cards](https://github.com/htdebeer/SVG-cards) submodule:

        git clone https://github.com/htdebeer/svg-cards-to-png.git
        cd svg-cards-to-png
        cd SVG-cards
        git fetch
        cd ..

1.  Start http-server in the root directory of this project:

        http-server .

2.  Run the PhantomJS script `phantom_svg_cards2png.js` with, optionally, the
    amount you want to scale the cards. For example:

        phantomjs phantom_svg_cards2png.js 2

    will generate cards (plus the back card) twice its natural size of
    169.075×244.64 pixels. So, these PNG files have a resolution of 338×489
    pixels.

3.  Wait till the conversion is finished. It will output an error or success
    line for each converted card. The PNG files are placed in the same
    directory as the PhantomJS script.

5.  You now can use the PNG cards! Note that as the original
    [SVG-cards](https://github.com/htdebeer/SVG-cards) are licenced under the
    [LGPLv3](https://www.gnu.org/licenses/lgpl-3.0.en.html), using the PNG
    cards means you have to adhere to that licence as well.

## Licence

The code of the converter is licenced under the
[GPLv3])https://www.gnu.org/licenses/gpl-3.0.en.html).
