import {GameStatuses} from "../core/constants/game-statuses.js";

export class GameProxy {
    #wsChannel = null
    #initialized
    #stateCache = {
        status: GameStatuses.SETTINGS,
        gridSize: {columnsCount: 4, rowsCount: 4},
        googlePosition: {x: 0, y: 0},
        player1Position: {x: 1, y: 1},
        player2Position: {x: 2, y: 2},
    }

    constructor(sthSimilarToNumberUtility) {
        this.#wsChannel = new WebSocket('ws://localhost:8080')

        this.#wsChannel.addEventListener('message', (event) => {
            this.#stateCache = JSON.parse(event.data)
            this.#notify()
        });
    }

    get initialized() {
        return !this.status === null
    }

    #status
    #observers = []

    subscribe(observerFunction) {
        this.#observers.push(observerFunction)
    }

    #notify() {
        this.#observers.forEach(o => o())
    }

    start() {
        const action = {type: 'start'}
        this.#wsChannel.send(JSON.stringify(action))
    }
    movePlayer(playerNumber, moveDirection) {
        const action = {type: 'movePlayer', payload: {playerNumber, moveDirection}}
        this.#wsChannel.send(JSON.stringify(action))
    }


    #startGoogleJumpInterval() {
        // this.#stopGoogle();
        // this.#makeGoogleJump();
        // this.#googleJumpIntervalId = setInterval(() => {
        //     this.#makeGoogleJump();
        // }, this.#settings.googleJumpInterval);
    }

    #stopGoogle() {
        // if (this.#googleJumpIntervalId) {
        //     clearInterval(this.#googleJumpIntervalId);
        //     this.#googleJumpIntervalId = null;
        // }
    }


    #getRandomPosition() {
        // return Position.createRandom(this.#settings.gridSize, this.#numberUtility);
    }

    #placePlayer1ToGrid() {
        // this.#positions.player1 = this.#getRandomPosition();
    }

    #placePlayer2ToGrid() {
        // const newPosition = this.#getRandomPosition();
        //
        // if (newPosition.equal(this.player1Position)) {
        //     this.#placePlayer2ToGrid();
        //     return;
        // }
        //
        // this.#positions.player2 = newPosition;
    }

    #scoringGoogle() {
        // ++this.#points.google
        // if (this.#points.google === this.pointsToWin.google) {
        //     this.#winner = 'Google'
        //     this.#status = GameStatuses.LOSE
        //     this.#stopGoogle()
        // }
        // this.#notify()
    }

    #makeGoogleJump() {
        // const newPosition = this.#getRandomPosition();
        // if (
        //     newPosition.equal(this.googlePosition) ||
        //     newPosition.equal(this.player1Position) ||
        //     newPosition.equal(this.player2Position)
        // ) {
        //     this.#makeGoogleJump();
        //     return;
        // }
        //
        // this.#positions.google = newPosition;
        // this.#notify()
    }

    get status() {
        return this.#stateCache.status
    }

    get gridSize() {
        return this.#stateCache.gridSize
    }

    get winner() {
        // return this.#winner
    }

    get pointsToWin() {
        // return this.#pointsToWin
    }

    get points() {
        // return this.#points
    }

    get googlePosition() {
        return this.#stateCache.googlePosition
    }

    get player1Position() {
        return this.#stateCache.player1Position ?
            {x: this.#stateCache.player1Position.x, y: this.#stateCache.player1Position.y} :
            null;
    }

    get player2Position() {
        return this.#stateCache.player2Position ?
            {x: this.#stateCache.player2Position.x, y: this.#stateCache.player2Position.y} :
            null;
    }

    set pointsToWin(value) {
        // this.#pointsToWin = value
        // this.#notify()
    }

    set gridSize(value) {
        return this.#stateCache.gridSize = value
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
        //     if (typeof newValue !== "number") {
        //         throw new TypeError('Arguments must be numbers')
        //     }
        //     if (newValue <= 0) {
        //         throw new Error('Interval must be more than 0')
        //     }
        //     this.#settings.googleJumpInterval = newValue
        //     this.#notify()
    }
}

