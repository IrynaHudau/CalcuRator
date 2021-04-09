/**
 * Rounds a number to provided decimal points.
 * @function round
 * @param {number} num
 * @param {number} decimalPoints 
 */
export function round(num, decimalPoints) {
    return parseFloat(num.toFixed(decimalPoints));
}

/**
 * Takes a value and returns float or 0
 * @function floatOrZero 
 * @param  {type} value Any type which may be converted to float
 * @return {type} returns a float number to which value was converted or 0
 */
export function floatOrZero(value) {
    let flotValue = parseFloat(value);
    return isNaN(flotValue) ? 0 : flotValue;
}