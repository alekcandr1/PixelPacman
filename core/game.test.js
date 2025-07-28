import {Game} from "./game";
import {GameStatuses} from "./game-statuses";
import expect from "expect";

describe('game', () => {
    it('game should be created and return status', () => {
        const game = new Game()
        expect(game.status).toBe(GameStatuses.SETTINGS)
    })
    it('', async () => {
        const game = new Game()
        await game.start()
        expect(game.status).toBe(GameStatuses.IN_PROGRESS)
    })
    it('google should be in the Grid after start', async () => {
        const game = new Game()
        expect(game.googlePosition).toBeNull()
        await game.start()
        expect(game.googlePosition.x).toBeLessThan(game.gridSize.columnCount)
        expect(game.googlePosition.x).toBeGreaterThanOrEqual(0)
        expect(game.googlePosition.y).toBeLessThan(game.gridSize.rowsCount)
        expect(game.googlePosition.y).toBeGreaterThanOrEqual(0)
    })
})