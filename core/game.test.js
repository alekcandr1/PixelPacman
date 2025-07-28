import {Game} from "./game";
import {GameStatuses} from "./game-statuses";
import expect from "expect";
import {ShogunNumberUtility} from "./utils/shogunNumberUtility";

describe('game', () => {
    it('game should be created and return status', () => {
        const numberUtil = new ShogunNumberUtility()
        const game = new Game(numberUtil)
        expect(game.status).toBe(GameStatuses.SETTINGS)
    })
    it('', async () => {
        const numberUtil = new ShogunNumberUtility()
        const game = new Game(numberUtil)
        await game.start()
        expect(game.status).toBe(GameStatuses.IN_PROGRESS)
    })
    it('google should be in the Grid after start', async () => {
        const numberUtil = new ShogunNumberUtility()
        for (let i = 0; i < 100; i++) {
            const game = new Game(numberUtil)
            expect(game.googlePosition).toBeNull()
            await game.start()
            expect(game.googlePosition.x).toBeLessThan(game.gridSize.columnCount)
            expect(game.googlePosition.x).toBeGreaterThanOrEqual(0)
            expect(game.googlePosition.y).toBeLessThan(game.gridSize.rowsCount)
            expect(game.googlePosition.y).toBeGreaterThanOrEqual(0)
        }
    })

    it('google should be in the Grid but in the new position after jump', async () => {
        const numberUtil = new ShogunNumberUtility()
        const game = new Game(numberUtil)
        game.googleJumpInterval = 1 // ms
        await game.start()

        for (let i = 0; i < 100; i++) {
            const prevGooglePosition = game.googlePosition
            await delay(1)
            const currentGooglePosition = game.googlePosition
            expect(prevGooglePosition).not.toEqual(currentGooglePosition)
        }
    })
})

const delay = (ms) => new Promise(res=>setTimeout(res,ms))