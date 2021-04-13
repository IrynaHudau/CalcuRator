import {round, floatOrZero} from '../math/Helpers';

test('rounding the number to keep only some decimals', () => {
    expect(round(100,2)).toEqual(100);
    expect(round(0,2)).toEqual(0);
    expect(round(10.11411, 2)).toEqual(10.11);
    expect(round(10.11511, 2)).toEqual(10.12);
    expect(round(10.11611, 2)).toEqual(10.12);

    expect(round(-10.11411, 2)).toEqual(-10.11);
    expect(round(-10.11511, 2)).toEqual(-10.12);
    expect(round(-10.11611, 2)).toEqual(-10.12);

    expect(round(10.11499999999, 2)).toEqual(10.11);

    expect(round(NaN, 2)).toEqual(NaN);
    expect(round(Infinity, 2)).toEqual(Infinity);
    expect(round(-Infinity, 2)).toEqual(-Infinity);
});

test('returns float or 0', () => {
    expect(floatOrZero(0)).toEqual(0);
    expect(floatOrZero(2)).toEqual(2);
    expect(floatOrZero(-10.10)).toEqual(-10.10);
    expect(floatOrZero(10.00)).toEqual(10);
    expect(floatOrZero(10.33)).toEqual(10.33);
    expect(floatOrZero('He was 40')).toEqual(0);
    expect(floatOrZero(NaN)).toEqual(0);
    expect(floatOrZero(Infinity)).toEqual(Infinity);
});