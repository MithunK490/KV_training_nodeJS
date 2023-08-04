import { when } from "jest-when";
import MathUtil from "../utils/math.util";

describe("Test average function", () => {
    describe('Test average success cases', () => {
        test('Test average success cases', () => {
            MathUtil.sum = jest.fn().mockReturnValueOnce(8);
            expect(MathUtil.average(4, 4)).toBe(4);
        })

        test('Test average success cases', () => {
            const mockedFuction = jest.fn()
            MathUtil.sum = mockedFuction;
            when(mockedFuction).calledWith(4, 4).mockReturnValueOnce(8)
            expect(MathUtil.average(4, 4)).toBe(4);
        })

    })

    test('Test average failure cases', () => {
        expect(MathUtil.average(4, 4)).not.toBe(3);
    })
})