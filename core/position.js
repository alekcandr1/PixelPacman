export class Position {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    static createRandom(gridSize, numberUtility) {
        return new Position(
            numberUtility.getRandomIntegerNumber(0, gridSize.columnsCount),
            numberUtility.getRandomIntegerNumber(0, gridSize.rowsCount)
        );
    }

    equal(other) {
        if (!other) return false;
        return this.#x === other.x && this.#y === other.y;
    }

    get x() { return this.#x; }
    get y() { return this.#y; }
}