import { ShogunNumberUtility } from './shogunNumberUtility';

describe('RandomNumberUtility', () => {
    let randomUtil;

    beforeEach(() => {
        randomUtil = new ShogunNumberUtility();
        // Mock Math.random for predictable tests
        jest.spyOn(Math, 'random').mockReturnValue(0.5);
    });

    afterEach(() => {
        // Restore original Math.random
        jest.spyOn(Math, 'random').mockRestore();
    });

    describe('getRandomIntegerNumber', () => {
        it('should generate a number within the specified range', () => {
            const result = randomUtil.getRandomIntegerNumber(1, 10);
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThan(10);
        });

        it('should return the lower bound when Math.random returns 0', () => {
            Math.random.mockReturnValue(0);
            const result = randomUtil.getRandomIntegerNumber(5, 15);
            expect(result).toBe(5);
        });

        it('should return just below upper bound when Math.random returns almost 1', () => {
            Math.random.mockReturnValue(0.999999);
            const result = randomUtil.getRandomIntegerNumber(5, 15);
            expect(result).toBe(14);
        });

        it('should handle negative ranges correctly', () => {
            const result = randomUtil.getRandomIntegerNumber(-10, -5);
            expect(result).toBeGreaterThanOrEqual(-10);
            expect(result).toBeLessThan(-5);
        });

        it('should handle ranges crossing zero correctly', () => {
            const result = randomUtil.getRandomIntegerNumber(-5, 5);
            expect(result).toBeGreaterThanOrEqual(-5);
            expect(result).toBeLessThan(5);
        });

        it('should throw error when fromInclusive is not a number', () => {
            expect(() => randomUtil.getRandomIntegerNumber('a', 10)).toThrow('Both parameters must be numbers');
        });

        it('should throw error when toExclusive is not a number', () => {
            expect(() => randomUtil.getRandomIntegerNumber(1, 'b')).toThrow('Both parameters must be numbers');
        });

        it('should throw error when parameters are not integers', () => {
            expect(() => randomUtil.getRandomIntegerNumber(1.5, 10)).toThrow('Both parameters must be integers');
            expect(() => randomUtil.getRandomIntegerNumber(1, 10.2)).toThrow('Both parameters must be integers');
        });

        it('should throw error when fromInclusive >= toExclusive', () => {
            expect(() => randomUtil.getRandomIntegerNumber(10, 5)).toThrow('fromInclusive must be less than toExclusive');
            expect(() => randomUtil.getRandomIntegerNumber(5, 5)).toThrow('fromInclusive must be less than toExclusive');
        });

        it('should return correct value for adjacent integers', () => {
            Math.random.mockReturnValue(0);
            const result = randomUtil.getRandomIntegerNumber(5, 6);
            expect(result).toBe(5);
        });

        it('should handle large ranges correctly', () => {
            const result = randomUtil.getRandomIntegerNumber(0, 1000000);
            expect(result).toBeGreaterThanOrEqual(0);
            expect(result).toBeLessThan(1000000);
        });

        it('should produce different values with different random seeds', () => {
            // Restore original Math.random for this test
            jest.spyOn(Math, 'random').mockRestore();

            const results = new Set();
            for (let i = 0; i < 100; i++) {
                results.add(randomUtil.getRandomIntegerNumber(1, 1000));
            }

            // Very high probability that we got different numbers
            expect(results.size).toBeGreaterThan(1);
        });
    });
});