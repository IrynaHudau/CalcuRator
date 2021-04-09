import RED from '@material-ui/core/colors/red';
import PINK from '@material-ui/core/colors/pink';
import PURPLE from '@material-ui/core/colors/purple';
import DEEPPURPLE from '@material-ui/core/colors/deepPurple';
import INDIGO from '@material-ui/core/colors/indigo';
import BLUE from '@material-ui/core/colors/blue';
import LIGHTBLUE from '@material-ui/core/colors/lightBlue';
import CYAN from '@material-ui/core/colors/cyan';
import TEAL from '@material-ui/core/colors/teal';
import GREEN from '@material-ui/core/colors/green';
import LIGHTGREEN from '@material-ui/core/colors/lightGreen';
import LIME from '@material-ui/core/colors/lime';
import YELLOW from '@material-ui/core/colors/yellow';
import AMBER from '@material-ui/core/colors/amber';
import ORANGE from '@material-ui/core/colors/orange';
import DEEPORANGE from '@material-ui/core/colors/deepOrange';
import BROWN from '@material-ui/core/colors/brown';
import GREY from '@material-ui/core/colors/grey';
import BLUEGREY from '@material-ui/core/colors/blueGrey';

const colors = [
    RED,
    PINK,
    PURPLE,
    DEEPPURPLE,
    INDIGO,
    BLUE,
    LIGHTBLUE,
    CYAN,
    TEAL,
    GREEN,
    LIGHTGREEN,
    LIME,
    YELLOW,
    AMBER,
    ORANGE,
    DEEPORANGE,
    BROWN,
    GREY,
    BLUEGREY,
];

/**
 * Shades of a color. Read more about shades here https://material-ui.com/customization/color/#color.
 */
export const SHADE = {
    "S50": 50,
    "S100": 100,
    "S200": 200,
    "S300": 300,
    "S400": 400,
    "S500": 500,
    "S600": 600,
    "S700": 700,
    "S800": 800,
    "S900": 900,
    "A100": "A100",
    "A200": "A200",
    "A400": "A400",
    "A700": "A700",
};

/**
 * Class which helps to select colors from Material UI supported color palette.
 * See https://material-ui.com/customization/color/ for details
 */
class ColorSelector {
    constructor(shade, startWith) {
        this._shade = shade ? shade : 600;
        this._startWith = startWith ? startWith : 0;
    }

    getColorByIndex(index) {
        return colors[(index + this._startWith) % colors.length][this._shade];
    }
}

export default ColorSelector;