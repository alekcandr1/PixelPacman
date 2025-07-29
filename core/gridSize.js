/**
 * Represents a grid dimension with columns and rows counts.
 *
 * @class
 * @property {number} columnsCount - Number of columns in the grid
 * @property {number} rowsCount - Number of rows in the grid
 */
export class GridSize {
    constructor(columnsCount = 4, rowsCount = 4) {
        this.columnsCount = columnsCount
        this.rowsCount = rowsCount
    }
}