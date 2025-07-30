import {GridSize} from "./gridSize.js";

/**
 * Represents a grid dimension with columns and rows counts.
 *
 * @class
 * @property {number} columnsCount - Number of columns in the grid
 * @property {number} rowsCount - Number of rows in the grid
 */
export class Settings {
    #gridSize
    #googleJumpInterval

    constructor(gridSize, googleJumpInterval) {
        this.#gridSize = new GridSize(gridSize[0], gridSize[1])
        this.googleJumpInterval = googleJumpInterval
    }

    get gridSize(){return this.#gridSize}
    set gridSize(value) {
        this.#gridSize = value
    }

    get googleJumpInterval(){return this.#googleJumpInterval}
    set googleJumpInterval(value) {
        this.#googleJumpInterval = value
    }
}