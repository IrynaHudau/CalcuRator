import ColorSelector, { SHADE } from "../utils/ColorSelector";

const shades = [
    [SHADE.S50],
    [SHADE.S100],
    [SHADE.S100],
    [SHADE.S200],
    [SHADE.S300],
    [SHADE.S400],
    [SHADE.S500],
    [SHADE.S600],
    [SHADE.S700],
    [SHADE.S800],
    [SHADE.S900],
    [SHADE.A100],
    [SHADE.A200],
    [SHADE.A400],
    [SHADE.A700],
];

test.each(shades)('getColorByIndex' , (shade) => {
    for (let startIndex = 0; startIndex <= 20; startIndex++) {
        let colorSelector = new ColorSelector(shade, startIndex);
        for (let i = 0; i <= 20; i++) {
            expect(colorSelector.getColorByIndex(i)).toBeDefined();
        }
    }
});