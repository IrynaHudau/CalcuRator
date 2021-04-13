import { makeCypressId } from "../utils/cypressUtil";
import each from "jest-each";

each([
    [["one"], "cy-one"],
    [["one", "two"], "cy-one-two"],
    [[""], "cy-"],
    [["one two", "three"], "cy-one_two-three"],
    [[1, "2", 3], "cy-1-2-3"]
]).test("makeCypressId_validArgs", (parts, expectedCyId) => {
    expect(makeCypressId(...parts)).toEqual(expectedCyId);
});

each([
    [[]],
    [null],
    [undefined],
    [0],
    [""],
    [false]
]).test("makeCypressId_notValidArgs", (parts) => {
    expect(() => {
        makeCypressId(...parts);
    }).toThrowError();
});