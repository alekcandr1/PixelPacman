import {GameStatuses} from "./game-statuses";

export class Game {
    #status = GameStatuses.SETTINGS
    #googlePosition = null

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
        this.#googlePosition = ShogunNumberUtility(0,4)
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
}