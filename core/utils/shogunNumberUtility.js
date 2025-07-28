export class ShogunNumberUtility {
    /**
     * Generates a random integer between fromInclusive (inclusive) and toExclusive (exclusive)
     * @param {number} fromInclusive - The minimum value (inclusive)
     * @param {number} toExclusive - The maximum value (exclusive)
     * @returns {number} A random integer in the specified range
     * @throws {Error} If parameters are invalid
     */
    getRandomIntegerNumber(fromInclusive, toExclusive) {
        // Validate input parameters
        if (typeof fromInclusive !== 'number' || typeof toExclusive !== 'number') {
            throw new Error('Both parameters must be numbers');
        }

        if (!Number.isInteger(fromInclusive) || !Number.isInteger(toExclusive)) {
            throw new Error('Both parameters must be integers');
        }

        if (fromInclusive >= toExclusive) {
            throw new Error('fromInclusive must be less than toExclusive');
        }

        // Calculate the range and generate random number
        const range = toExclusive - fromInclusive;
        return Math.floor(Math.random() * range) + fromInclusive;
    }
}