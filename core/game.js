import {GameStatuses} from "./constants/game-statuses.js";
import {directions} from "./constants/directions.js";
import {Position} from "./position.js";
import {Settings} from "./settings.js";

export class Game {
    #numberUtility

    constructor(sthSimilarToNumberUtility) {
        this.#numberUtility = sthSimilarToNumberUtility
    }

    #status = GameStatuses.SETTINGS
    #settings = new Settings([4, 4], 1000)
    #positions = {
        google: null,
        player1: null,
        player2: null,
    }
    #points = {
        google: 0,
        player1: 0,
        player2: 0,
    }
    #pointsToWin = {
        google: 15,
        players: 2,
    }
    #winner = null
    #googleJumpIntervalId = null;

    #observers = []

    subscribe(observerFunction) {
        this.#observers.push(observerFunction)
    }

    #notify() {
        this.#observers.forEach(o => o())
    }

    start() {
        if (this.#status !== GameStatuses.SETTINGS) {
            throw new Error('Game must be in Settings before Start');
        }
        this.#status = GameStatuses.IN_PROGRESS;
        this.#placePlayer1ToGrid();
        this.#placePlayer2ToGrid();

        this.#startGoogleJumpInterval();

        this.#notify();
    }

    #startGoogleJumpInterval() {
        this.#stopGoogle();
        this.#makeGoogleJump();
        this.#googleJumpIntervalId = setInterval(() => {
            this.#makeGoogleJump();
        }, this.#settings.googleJumpInterval);
    }

    #stopGoogle() {
        if (this.#googleJumpIntervalId) {
            clearInterval(this.#googleJumpIntervalId);
            this.#googleJumpIntervalId = null;
        }
    }

    movePlayer(playerNumber, moveDirection) {
        const currentPlayer = 'player' + playerNumber;
        const otherPlayer = 'player' + (playerNumber === 1 ? 2 : 1);
        const position = this.#positions[currentPlayer];

        let newPosition;
        switch (moveDirection) {
            case directions.UP:
                newPosition = {x: position.x, y: position.y - 1};
                break;
            case directions.DOWN:
                newPosition = {x: position.x, y: position.y + 1};
                break;
            case directions.LEFT:
                newPosition = {x: position.x - 1, y: position.y};
                break;
            case directions.RIGHT:
                newPosition = {x: position.x + 1, y: position.y};
                break;
        }

        // Проверка границ игрового поля
        if (newPosition.x < 0 || newPosition.x >= this.gridSize.columnsCount ||
            newPosition.y < 0 || newPosition.y >= this.gridSize.rowsCount) {
            return;
        }

        // Проверка коллизии с другим игроком
        if (this.#positions[otherPlayer] &&
            newPosition.x === this.#positions[otherPlayer].x &&
            newPosition.y === this.#positions[otherPlayer].y) {
            return;
        }

        this.#positions[currentPlayer] = newPosition;

        // Проверка поймали ли Google
        if (this.#positions[currentPlayer].x === this.googlePosition?.x &&
            this.#positions[currentPlayer].y === this.googlePosition?.y) {
            ++this.#points[currentPlayer];

            this.#startGoogleJumpInterval();

            if (this.#points[currentPlayer] === this.pointsToWin.players) {
                this.#status = 'WIN';
                this.#stopGoogle();
            }
        }
        this.#notify();
    }

    #getRandomPosition() {
        return Position.createRandom(this.#settings.gridSize, this.#numberUtility);
    }

    #placePlayer1ToGrid() {
        this.#positions.player1 = this.#getRandomPosition();
    }

    #placePlayer2ToGrid() {
        const newPosition = this.#getRandomPosition();

        if (newPosition.equal(this.player1Position)) {
            this.#placePlayer2ToGrid();
            return;
        }

        this.#positions.player2 = newPosition;
    }

    #scoringGoogle() {
        ++this.#points.google
        if (this.#points.google === this.pointsToWin.google) {
            this.#winner = 'Google'
            this.#status = GameStatuses.LOSE
            this.#stopGoogle()
        }
        this.#notify()
    }

    #makeGoogleJump() {
        const newPosition = this.#getRandomPosition();
        if (
            newPosition.equal(this.googlePosition) ||
            newPosition.equal(this.player1Position) ||
            newPosition.equal(this.player2Position)
        ) {
            this.#makeGoogleJump();
            return;
        }

        this.#positions.google = newPosition;
        this.#notify()

    }

    get status() {
        return this.#status
    }

    get gridSize() {
        return this.#settings.gridSize
    }

    get winner() {
        return this.#winner
    }

    get pointsToWin() {
        return this.#pointsToWin
    }

    get points() {
        return this.#points
    }

    get googlePosition() {
        return this.#positions.google ?
            {x: this.#positions.google.x, y: this.#positions.google.y} :
            null;
    }

    get player1Position() {
        return this.#positions.player1 ?
            {x: this.#positions.player1.x, y: this.#positions.player1.y} :
            null;
    }

    get player2Position() {
        return this.#positions.player2 ?
            {x: this.#positions.player2.x, y: this.#positions.player2.y} :
            null;
    }

    set pointsToWin(value) {
        this.#pointsToWin = value
        this.#notify()
    }

    set gridSize(value) {
        this.#settings.gridSize = value

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
        this.#notify()
    }
}

