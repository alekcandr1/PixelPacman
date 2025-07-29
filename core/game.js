import {GameStatuses} from "./constants/game-statuses";
import {GridSize} from "./gridSize";
import {directions} from "./constants/directions";
import {Position} from "./position";

export class Game {
    #numberUtility

    constructor(sthSimilarToNumberUtility) {
        this.#numberUtility = sthSimilarToNumberUtility
    }

    #status = GameStatuses.SETTINGS
    #settings = {
        gridSize: new GridSize(4, 4),
        googleJumpInterval: 1,
    }
    #positions = {
        google: new Position(null,null),
        player1: {x: null, y: null},
        player2: {x: null, y: null},
    }

    start() {
        if (this.#status !== GameStatuses.SETTINGS) {
            throw new Error('Game must be in Settings before Start')
        }
        this.#status = GameStatuses.IN_PROGRESS
        this.#placePlayer1ToGrid()
        this.#makeGoogleJump()

        setInterval(() => {
            this.#makeGoogleJump()
        }, this.#settings.googleJumpInterval)
    }

    movePlayer(playerNumber, moveDirection) {
        const position = this.#positions['player' + playerNumber]
        let newPosition
        switch (moveDirection) {
            case directions.UP: {
                newPosition = {
                    x: position.x,
                    y: position.y - 1
                }
                break
            }
            case directions.DOWN: {
                newPosition = {
                    x: position.x,
                    y: position.y + 1
                }
                break
            }
            case directions.LEFT: {
                newPosition = {
                    x: position.x - 1,
                    y: position.y
                }
                break
            }
            case directions.RIGHT: {
                newPosition = {
                    x: position.x + 1,
                    y: position.y
                }
                break
            }
        }

        if (
            newPosition.x > this.gridSize.columnsCount
            || newPosition.y > this.gridSize.rowsCount
            || newPosition.y < 0
            || newPosition.x < 0
        ) {
            return
        }
        this.#positions['player' + playerNumber] = newPosition
    }

    #getRandomPosition() {
        return Position.createRandom(this.#settings.gridSize, this.#numberUtility);
    }

    #placePlayer1ToGrid() {
        this.#positions.player1 = this.#getRandomPosition();
    }

    #makeGoogleJump() {
        const newPosition = this.#getRandomPosition();

        if (newPosition.equal(this.googlePosition)) {
            this.#makeGoogleJump();
            return;
        }

        this.#positions.google = newPosition;
    }


    get status() {
        return this.#status
    }

    get gridSize() {
        return this.#settings.gridSize
    }

    /**
     * Sets the grid size for the component.
     *
     * @param {number} value - The new grid size value to set. Must be a positive integer.
     */
    set gridSize(value) {
        this.#settings.gridSize = value
    }

    get googlePosition() {
        return this.#positions.google ?
            { x: this.#positions.google.x, y: this.#positions.google.y } :
            null;
    }

    get player1Position() {
        return this.#positions.player1 ?
            { x: this.#positions.player1.x, y: this.#positions.player1.y } :
            null;
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

