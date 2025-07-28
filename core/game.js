import {GameStatuses} from "./game-statuses";

export class Game {
    #status = GameStatuses.SETTINGS
    #googlePosition = null
    #numberUtility

    constructor(sthSimilarToNumberUtility) {
        this.#numberUtility = sthSimilarToNumberUtility
    }

    #settings = {
        gridSize: {
            columnCount: 4,
            rowsCount: 4,
        },
        googleJumpInterval: 1,
    }

    start() {
        if (this.#status !== GameStatuses.SETTINGS) {
            throw new Error('Game must be in Settings before Start')
        }
        this.#status = GameStatuses.IN_PROGRESS
        this.#makeGoogleJump()

        setInterval(() => {
            this.#makeGoogleJump()
        }, this.#settings.googleJumpInterval)
    }

    #makeGoogleJump() {
        const newPosition = {
            x: this.#numberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.columnCount),
            y: this.#numberUtility.getRandomIntegerNumber(0, this.#settings.gridSize.rowsCount),
        }
        if (newPosition.x === this.googlePosition?.x && newPosition.y === this.googlePosition?.y) {
            this.#makeGoogleJump()
            return
        }
        this.#googlePosition = newPosition
    }



    get status() {
        return this.#status
    }

    get gridSize() {
        return this.#settings.gridSize
    }

    get googlePosition() {
        return this.#googlePosition
    }

    /**
     * Sets the Google jump interval value.
     *
     * @param {number} newValue - The new interval value to set (must be a positive number).
     * @throws {TypeError} If the provided value is not a number.
     * @throws {Error} If the provided value is less than or equal to 0.
     * @example
     * // Set the Google jump interval to 5 seconds
     * instance.googleJumpInterval = 5;
     */
    set googleJumpInterval(newValue) {
        if (typeof newValue !== "number") {
            throw new TypeError('Arguments must be numbers')
        }
        if (newValue <= 0) {
            throw new Error('Interval must be more than 0')
        }
        this.#settings.googleJumpInterval = newValue
    }
}